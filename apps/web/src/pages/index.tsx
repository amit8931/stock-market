import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Stock Intelligence Platform</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">📊 Stock Intelligence</h1>
              <div className="flex gap-4">
                <Link href="/markets" className="text-blue-600 hover:text-blue-800">Markets</Link>
                <Link href="/screener" className="text-blue-600 hover:text-blue-800">Screener</Link>
                <Link href="/portfolio" className="text-blue-600 hover:text-blue-800">Portfolio</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - AI Market Brief */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">🧠 AI Market Brief</h2>
            <p className="text-lg mb-4">Markets are mixed today. Tech leads gains due to AI demand, while energy sector faces headwinds.</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-700 p-4 rounded">
                <p className="text-sm">📈 Market Direction</p>
                <p className="text-xl font-bold">Neutral</p>
              </div>
              <div className="bg-blue-700 p-4 rounded">
                <p className="text-sm">🔥 Top Driver</p>
                <p className="text-xl font-bold">AI Demand</p>
              </div>
              <div className="bg-blue-700 p-4 rounded">
                <p className="text-sm">⚠️ Risk Level</p>
                <p className="text-xl font-bold">Medium</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Movers Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">📈 Top Movers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample mover card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">NVDA</h3>
                  <p className="text-gray-600">NVIDIA Corporation</p>
                </div>
                <span className="text-2xl font-bold text-green-600">+5.2%</span>
              </div>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Why it moved:</strong> AI chip demand surge + analyst upgrade
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Signal Score: 88/100</span>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Strong Bullish</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">AAPL</h3>
                  <p className="text-gray-600">Apple Inc.</p>
                </div>
                <span className="text-2xl font-bold text-gray-600">+1.8%</span>
              </div>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Why it moved:</strong> Positive analyst coverage, services revenue strength
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Signal Score: 62/100</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Neutral</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">TSLA</h3>
                  <p className="text-gray-600">Tesla Inc.</p>
                </div>
                <span className="text-2xl font-bold text-red-600">-2.1%</span>
              </div>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Why it moved:</strong> Delivery numbers below expectations, margin concerns
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Signal Score: 35/100</span>
                <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">Bearish</span>
              </div>
            </div>
          </div>
        </section>

        {/* Signal Dashboard */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
          <h2 className="text-2xl font-bold mb-6">🎯 Signal Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-green-800 mb-2">🟢 Bullish Momentum</h3>
              <p className="text-gray-700">NVDA, AMD, AVGO showing strong bullish signals</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
              <h3 className="text-lg font-bold text-red-800 mb-2">🔴 Bearish Pressure</h3>
              <p className="text-gray-700">Energy sector showing weakness, XOM, CVX under pressure</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">⚡ Unusual Volume</h3>
              <p className="text-gray-700">3 stocks detected with 2x+ volume spikes</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-blue-800 mb-2">📊 News Impact</h3>
              <p className="text-gray-700">Fed announcement shifting sentiment across indices</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <p>&copy; 2026 Stock Intelligence Platform. Decision clarity for retail investors.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
