import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | AWS Cloud Application',
  description: 'View your usage metrics and analytics',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Chat Statistics Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Chat Statistics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Conversations</p>
              <p className="text-2xl font-bold">124</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Duration</p>
              <p className="text-2xl font-bold">4m 12s</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Satisfaction Rate</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </div>

        {/* Daily Usage Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Daily Usage</h2>
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-gray-500">Usage Chart Placeholder</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">API Calls Today</p>
            <p className="text-2xl font-bold">1,248</p>
          </div>
        </div>

        {/* Popular Queries Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Queries</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">1</span>
              <span className="text-gray-700">Product pricing information</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">2</span>
              <span className="text-gray-700">Account troubleshooting</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">3</span>
              <span className="text-gray-700">Subscription upgrade options</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">4</span>
              <span className="text-gray-700">API documentation help</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">5</span>
              <span className="text-gray-700">Integration tutorials</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May {item}, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Document Processing</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2m 34s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}