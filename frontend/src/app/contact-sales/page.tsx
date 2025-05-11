import Link from 'next/link';

export default function ContactSales() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Our Sales Team</h1>
        <p className="text-xl text-center mb-12">
          Get in touch with our sales team to discuss your specific requirements and how we can help your business.
        </p>
        
        <div className="card mb-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="label">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  className="input" 
                  placeholder="Enter your first name"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="label">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  className="input" 
                  placeholder="Enter your last name"
                  required 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="input" 
                placeholder="Enter your email address"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="company" className="label">Company Name</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                className="input" 
                placeholder="Enter your company name"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="label">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="input" 
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="employees" className="label">Number of Employees</label>
              <select id="employees" name="employees" className="input">
                <option value="">Select an option</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="label">How can we help you?</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                className="input" 
                placeholder="Tell us about your requirements and how we can help"
                required
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacy" className="font-medium text-gray-700 dark:text-gray-300">
                  I agree to the <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to being contacted about AWS Cloud Application services.
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Need immediate assistance?</h2>
          <p className="text-lg mb-6">
            Our sales team is available Monday through Friday, 9am to 5pm EST.
          </p>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>sales@awscloudapp.com</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-10">
          <Link 
            href="/pricing"
            className="btn-secondary"
          >
            Back to Pricing
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
