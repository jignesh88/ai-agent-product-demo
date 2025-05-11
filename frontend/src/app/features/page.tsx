import Link from 'next/link';

export default function Features() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Platform Features</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Chatbot</h2>
            <p className="text-lg mb-4">
              Our advanced chatbot uses natural language processing to understand and respond to user queries in a human-like manner.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Context-aware conversations</li>
              <li className="mb-2">Multi-language support</li>
              <li className="mb-2">Sentiment analysis</li>
              <li className="mb-2">Personalized responses</li>
            </ul>
          </div>
          
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Document Processing</h2>
            <p className="text-lg mb-4">
              Extract valuable information from documents automatically with our advanced document processing capabilities.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">OCR technology</li>
              <li className="mb-2">Multiple file format support</li>
              <li className="mb-2">Data extraction and analysis</li>
              <li className="mb-2">Secure document storage</li>
            </ul>
          </div>
          
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Voice Integration</h2>
            <p className="text-lg mb-4">
              Seamlessly integrate voice capabilities into your applications with our voice API.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Text-to-speech conversion</li>
              <li className="mb-2">Speech recognition</li>
              <li className="mb-2">Voice authentication</li>
              <li className="mb-2">Call center integration</li>
            </ul>
          </div>
          
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <p className="text-lg mb-4">
              Gain insights into user interactions and chatbot performance with our comprehensive analytics dashboard.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Real-time metrics</li>
              <li className="mb-2">User engagement tracking</li>
              <li className="mb-2">Conversation analysis</li>
              <li className="mb-2">Custom reports</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Enterprise-Grade Security</h2>
          <p className="text-lg mb-6">
            Our platform is built with security in mind, ensuring that your data is protected at all times.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">End-to-end encryption</li>
            <li className="mb-2">AWS security best practices</li>
            <li className="mb-2">GDPR compliance</li>
            <li className="mb-2">Regular security audits</li>
          </ul>
        </div>

        <div className="flex justify-center space-x-6 mt-10">
          <Link 
            href="/about"
            className="btn-secondary"
          >
            About Us
          </Link>
          <Link 
            href="/pricing"
            className="btn-primary"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
