import Link from 'next/link';

export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
        <p className="text-xl text-center mb-12">
          Choose the plan that fits your business needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Basic Plan */}
          <div className="card border-t-4 border-t-blue-400 flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">Basic</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For small businesses</p>
            <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal">/month</span></div>
            
            <ul className="mb-8 flex-grow">
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>5,000 chatbot interactions</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>100 document uploads</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Email support</span>
              </li>
            </ul>
            
            <Link 
              href="/auth/signup?plan=basic"
              className="btn-secondary w-full text-center"
            >
              Get Started
            </Link>
          </div>
          
          {/* Professional Plan */}
          <div className="card border-t-4 border-t-blue-600 flex flex-col transform scale-105 shadow-lg">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h2 className="text-2xl font-semibold mb-2">Professional</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For growing businesses</p>
            <div className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal">/month</span></div>
            
            <ul className="mb-8 flex-grow">
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>25,000 chatbot interactions</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>500 document uploads</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Priority support</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Voice integration</span>
              </li>
            </ul>
            
            <Link 
              href="/auth/signup?plan=professional"
              className="btn-primary w-full text-center"
            >
              Get Started
            </Link>
          </div>
          
          {/* Enterprise Plan */}
          <div className="card border-t-4 border-t-blue-800 flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For large organizations</p>
            <div className="text-4xl font-bold mb-6">Custom</div>
            
            <ul className="mb-8 flex-grow">
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Unlimited chatbot interactions</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Unlimited document uploads</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Custom analytics & reporting</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>24/7 dedicated support</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center mb-3">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>SLA guarantees</span>
              </li>
            </ul>
            
            <Link 
              href="/contact-sales"
              className="btn-secondary w-full text-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Need a custom solution?</h2>
          <p className="text-lg mb-6">
            We offer tailored solutions for businesses with specific requirements. Contact our sales team to discuss your needs.
          </p>
          <Link 
            href="/contact-sales"
            className="btn-primary inline-block"
          >
            Contact Sales
          </Link>
        </div>

        <div className="flex justify-center space-x-6 mt-10">
          <Link 
            href="/features"
            className="btn-secondary"
          >
            Explore Features
          </Link>
          <Link 
            href="/"
            className="btn-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
