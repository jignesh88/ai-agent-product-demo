import Link from 'next/link';

export default function Terms() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to AWS Cloud Application. These Terms of Service ("Terms") govern your access to and use of our website, 
            products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>
          <p className="mb-4">
            Please read these Terms carefully. If you do not agree with these Terms, you may not access or use our Services.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>"We," "us," and "our" refer to AWS Cloud Application.</li>
            <li>"You" and "your" refer to the individual or entity using our Services.</li>
            <li>"Content" refers to any text, data, information, images, or other material that is uploaded, transmitted, or otherwise made available through our Services.</li>
            <li>"User Content" refers to Content that you upload, transmit, or otherwise make available through our Services.</li>
          </ul>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
          <p className="mb-4">
            To use certain features of our Services, you may need to create an account. You agree to provide accurate, 
            current, and complete information during the registration process and to update such information to keep it 
            accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials and for all activities that occur under your account. 
            You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
          <p className="mb-4">
            You retain ownership of any User Content you submit through our Services. By submitting User Content, 
            you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create derivative works based on, 
            distribute, publicly display, publicly perform, and otherwise use the User Content for the purpose of operating, 
            developing, providing, and improving our Services.
          </p>
          <p className="mb-4">
            You represent and warrant that you have all rights necessary to grant the licenses in this section and that your 
            User Content does not violate any law or the rights of any third party.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Prohibited Conduct</h2>
          <p className="mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use our Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying our Services.</li>
            <li>Use our Services in any way that could damage, disable, overburden, or impair the functioning of our Services.</li>
            <li>Attempt to circumvent any filtering, security measures, or other features designed to protect our Services or third parties.</li>
            <li>Upload or transmit any Content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
            <li>Use our Services for any illegal or unauthorized purpose.</li>
          </ul>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, 
            and with or without notice.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
          <p className="mb-4">
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
            INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, 
            AND NON-INFRINGEMENT.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, 
            SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM 
            YOUR USE OF OUR SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. If we make changes to these Terms, we will provide notice 
            of such changes, such as by sending an email, providing a notice through our Services, or updating the date at the 
            top of these Terms. Your continued use of our Services following such notice constitutes your acceptance of the 
            modified Terms.
          </p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at legal@awscloudapp.com.
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
