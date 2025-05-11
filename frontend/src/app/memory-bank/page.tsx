import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Bank | AWS Cloud Application',
  description: 'Upload and manage your documents for AI processing',
};

export default function MemoryBankPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Memory Bank</h1>
      
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
        <p className="text-gray-600 mb-4">
          Upload your documents to enhance your AI chatbot's knowledge. Supported formats: PDF, DOCX.
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-500 mb-2">Drag and drop files here, or</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out">
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
      
      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Documents</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Document Card 1 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-150 ease-in-out">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium truncate">Product Specification.pdf</h3>
                    <p className="text-sm text-gray-500">PDF • 2.4 MB • May 5, 2023</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pages: 24</span>
                <span className="text-blue-600 font-medium">View</span>
              </div>
            </div>
          </div>
          
          {/* Document Card 2 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-150 ease-in-out">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium truncate">User Manual.docx</h3>
                    <p className="text-sm text-gray-500">DOCX • 3.8 MB • Apr 28, 2023</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pages: 42</span>
                <span className="text-blue-600 font-medium">View</span>
              </div>
            </div>
          </div>
          
          {/* Document Card 3 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-150 ease-in-out">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium truncate">Technical Whitepaper.pdf</h3>
                    <p className="text-sm text-gray-500">PDF • 5.2 MB • Apr 15, 2023</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pages: 18</span>
                <span className="text-blue-600 font-medium">View</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm text-gray-500">Showing 1-3 of 12 documents</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">4</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}