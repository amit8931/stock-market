import Head from 'next/head';
import Link from 'next/link';

export default function Markets() {
  return (
    <>
      <Head>
        <title>Markets - Stock Intelligence Platform</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">📊 Stock Intelligence</Link>
              <div className="flex gap-4">
                <Link href="/markets" className="text-blue-600 hover:text-blue-800 font-semibold">Markets</Link>
                <Link href="/screener" className="text-blue-600 hover:text-blue-800">Screener</Link>
                <Link href="/portfolio" className="text-blue-600 hover:text-blue-800">Portfolio</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Markets Page */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">📊 Markets</h1>

          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">S&P 500</p>
              <p className="text-3xl font-bold">5,234.50</p>
              <p className="text-green-600">+0.4%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">NASDAQ</p>
              <p className="text-3xl font-bold">16,852.20</p>
              <p className="text-green-600">+1.2%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Dow Jones</p>
              <p className="text-3xl font-bold">41,234.00</p>
              <p className="text-red-600">-0.3%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">VIX</p>
              <p className="text-3xl font-bold">12.45</p>
              <p className="text-gray-600">Volatility Index</p>
            </div>
          </div>

          {/* Sector Heatmap */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-6">🌍 Sector Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded">
                <p className="font-semibold">Technology</p>
                <p className="text-xl font-bold">+2.1%</p>
              </div>
              <div className="bg-gradient-to-r from-green-300 to-green-500 text-white p-4 rounded">
                <p className="font-semibold">Healthcare</p>
                <p className="text-xl font-bold">+1.3%</p>
              </div>
              <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white p-4 rounded">
                <p className="font-semibold">Finance</p>
                <p className="text-xl font-bold">+0.2%</p>
              </div>
              <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded">
                <p className="font-semibold">Energy</p>
                <p className="text-xl font-bold">-1.8%</p>
              </div>
            </div>
          </div>

          {/* Stock List */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">📈 Top Stocks (US)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Symbol</th>
                    <th className="text-left py-3">Name</th>
                    <th className="text-right py-3">Price</th>
                    <th className="text-right py-3">Change</th>
                    <th className="text-right py-3">Signal Score</th>
                    <th className="text-left py-3">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { symbol: 'NVDA', name: 'NVIDIA', price: 925.45, change: 5.2, signal: 88 },
                    { symbol: 'AAPL', name: 'Apple', price: 191.25, change: 1.8, signal: 62 },
                    { symbol: 'MSFT', name: 'Microsoft', price: 413.87, change: 2.1, signal: 71 },
                    { symbol: 'GOOGL', name: 'Alphabet', price: 168.94, change: 1.5, signal: 65 },
                    { symbol: 'TSLA', name: 'Tesla', price: 178.42, change: -2.1, signal: 35 },
                  ].map((stock) => (
                    <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-semibold">{stock.symbol}</td>
                      <td className="py-4">{stock.name}</td>
                      <td className="py-4 text-right">${stock.price}</td>
                      <td className={`py-4 text-right font-semibold ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change}%
                      </td>
                      <td className="py-4 text-right">{stock.signal}/100</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          stock.signal >= 70 ? 'bg-green-100 text-green-800' :
                          stock.signal >= 40 ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {stock.signal >= 70 ? 'Bullish' : stock.signal >= 40 ? 'Neutral' : 'Bearish'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
