import Head from 'next/head';
import Link from 'next/link';

export default function ScreenerPage() {
  return (
    <>
      <Head>
        <title>Screener - Stock Intelligence</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Screener</h1>
            <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          </div>

          <p className="mt-3 text-gray-700">
            This is a stub page for now. Next step is to wire filters to an instruments + signals query API.
          </p>

          <div className="mt-8 bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Market cap</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>Any</option>
                  <option>Large</option>
                  <option>Mid</option>
                  <option>Small</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Signal score</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>Any</option>
                  <option>80+</option>
                  <option>60+</option>
                  <option>40+</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sector</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>Any</option>
                  <option>Technology</option>
                  <option>Energy</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800">Run screen</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
