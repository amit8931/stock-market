const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local'), override: true });

const [, , targetDirectory, historyTable] = process.argv;
const shouldListOnly = process.argv.includes('--list');

if (!targetDirectory || !historyTable) {
  console.error('Usage: node scripts/run-sql.js <migrations|seeds> <history_table> [--list]');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const sqlDirectory = path.join(rootDir, targetDirectory);

if (!fs.existsSync(sqlDirectory)) {
  console.error(`Directory not found: ${sqlDirectory}`);
  process.exit(1);
}

const sqlFiles = fs
  .readdirSync(sqlDirectory)
  .filter((file) => file.endsWith('.sql'))
  .sort((a, b) => a.localeCompare(b));

if (shouldListOnly) {
  console.log(sqlFiles.join('\n'));
  process.exit(0);
}

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'stock_platform',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function ensureHistoryTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${historyTable} (
      file_name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAppliedFiles() {
  const result = await client.query(`SELECT file_name FROM ${historyTable}`);
  return new Set(result.rows.map((row) => row.file_name));
}

async function applyFile(fileName) {
  const filePath = path.join(sqlDirectory, fileName);
  const sql = fs.readFileSync(filePath, 'utf8');

  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query(`INSERT INTO ${historyTable} (file_name) VALUES ($1)`, [fileName]);
    await client.query('COMMIT');
    console.log(`Applied ${targetDirectory}/${fileName}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main() {
  await client.connect();
  await ensureHistoryTable();

  const appliedFiles = await getAppliedFiles();
  const pendingFiles = sqlFiles.filter((file) => !appliedFiles.has(file));

  if (pendingFiles.length === 0) {
    console.log(`No pending ${targetDirectory}.`);
    return;
  }

  for (const fileName of pendingFiles) {
    await applyFile(fileName);
  }
}

main()
  .catch((error) => {
    console.error(`Failed to apply ${targetDirectory}:`, error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end().catch(() => undefined);
  });
