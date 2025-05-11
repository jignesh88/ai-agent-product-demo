import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At AWS Cloud Application, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, 
            products, and services ("Services").
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, 
            please do not access or use our Services.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">2.1 Personal Data</h3>
          <p className="mb-4">
            We may collect personal data that you provide to us, such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contact information (such as name, email address, mailing address, and phone number)</li>
            <li>Account credentials (such as username and password)</li>
            <li>Profile information (such as profile picture and job title)</li>
            <li>Payment information (such as credit card details and billing address)</li>
            <li>Communication information (such as emails and chat messages)</li>
            <li>Any other information you choose to provide</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">2.2 Usage Data</h3>
          <p className="mb-4">
            We may also collect information about how you access and use our Services, such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Device information (such as IP address, browser type, and operating system)</li>
            <li>Usage information (such as pages visited, time spent on pages, and links clicked)</li>
            <li>Location information (such as general geographic location based on IP address)</li>
          </ul>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            We may use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Providing, maintaining, and improving our Services</li>
            <li>Processing transactions and sending related information</li>
            <li>Responding to your comments, questions, and requests</li>
            <li>Sending technical notices, updates, security alerts, and administrative messages</li>
            <li>Communicating with you about products, services, offers, promotions, and events</li>
            <li>Monitoring and analyzing trends, usage, and activities in connection with our Services</li>
            <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
            <li>Personalizing and improving your experience with our Services</li>
            <li>Complying with legal obligations</li>
          </ul>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
          <p className="mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>With service providers who perform services on our behalf</li>
            <li>With business partners with whom we jointly offer products or services</li>
            <li>In connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
            <li>If we believe disclosure is necessary to comply with applicable laws, regulations, or legal processes</li>
            <li>To protect the rights, property, and safety of AWS Cloud Application, our users, and the public</li>
            <li>With your consent or at your direction</li>
          </ul>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to help protect your personal data from loss, theft, misuse, unauthorized access, 
            disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of 
            electronic storage is 100% secure.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal data, such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate or incomplete personal data</li>
            <li>The right to erase your personal data</li>
            <li>The right to restrict the processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to the processing of your personal data</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us using the information provided in the "Contact Information" section below.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            Our Services are not intended for children under the age of 13. We do not knowingly collect personal data from 
            children under 13. If you are a parent or guardian and believe that your child has provided us with personal data, 
            please contact us.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date 
            at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement 
            to our website or sending you a notification).
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            AWS Cloud Application<br />
            123 Tech Street<br />
            San Francisco, CA 94105<br />
            privacy@awscloudapp.com
          </p>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Last updated: May 5, 2025
          </p>
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
