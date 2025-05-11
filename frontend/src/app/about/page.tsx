import Link from 'next/link';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Our Platform</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            Our AI-powered chatbot platform is designed to revolutionize how businesses interact with their customers. 
            We combine cutting-edge artificial intelligence with intuitive design to create a seamless experience for both 
            businesses and their users.
          </p>
          <p className="text-lg mb-6">
            Our mission is to make AI accessible to businesses of all sizes, enabling them to provide 
            exceptional customer service, streamline operations, and gain valuable insights from their data.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <p className="text-lg mb-6">
            Built on AWS infrastructure, our platform leverages the latest advancements in natural language processing, 
            machine learning, and cloud computing to deliver a robust and scalable solution.
          </p>
          <p className="text-lg mb-6">
            Our document processing capabilities allow businesses to extract valuable information from various document types, 
            making it easier to manage and utilize their data effectively.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg mb-6">
            We are a team of passionate engineers, designers, and AI specialists dedicated to creating the best possible 
            chatbot experience. With decades of combined experience in AI and cloud technologies, we are committed to 
            pushing the boundaries of what's possible.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mt-10">
          <Link 
            href="/"
            className="btn-secondary"
          >
            Back to Home
          </Link>
          <Link 
            href="/features"
            className="btn-primary"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </main>
  );
}
