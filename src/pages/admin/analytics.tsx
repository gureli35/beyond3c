import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalPosts: number;
    totalStories: number;
    totalViews: number;
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    conversionRate: number;
    bounceRate: number;
  };
  growth: {
    usersGrowth: number;
    postsGrowth: number;
    storiesGrowth: number;
    viewsGrowth: number;
  };
  traffic: {
    totalVisits: number;
    uniqueVisitors: number;
    pageViews: number;
    avgSessionDuration: string;
    topPages: Array<{ page: string; views: number; }>;
    topReferrers: Array<{ source: string; visitors: number; }>;
  };
  content: {
    mostViewedPosts: Array<{ title: string; views: number; date: string; }>;
    mostSharedStories: Array<{ title: string; shares: number; author: string; }>;
    topCategories: Array<{ category: string; posts: number; views: number; }>;
  };
  demographics: {
    ageGroups: Array<{ range: string; percentage: number; }>;
    topCountries: Array<{ country: string; percentage: number; }>;
    deviceTypes: Array<{ device: string; percentage: number; }>;
  };
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user: currentUser, isLoading: authLoading } = useAdminAuth();
  
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock analytics data - replace with actual API call
  useEffect(() => {
    const mockAnalytics: AnalyticsData = {
      overview: {
        totalUsers: 12547,
        totalPosts: 342,
        totalStories: 1823,
        totalViews: 45632,
        dailyActiveUsers: 1247,
        monthlyActiveUsers: 8934,
        conversionRate: 3.2,
        bounceRate: 42.3
      },
      growth: {
        usersGrowth: 12.5,
        postsGrowth: 8.3,
        storiesGrowth: 15.7,
        viewsGrowth: 23.1
      },
      traffic: {
        totalVisits: 34521,
        uniqueVisitors: 23456,
        pageViews: 67890,
        avgSessionDuration: '3m 24s',
        topPages: [
          { page: '/stories', views: 12543 },
          { page: '/blog', views: 8932 },
          { page: '/about', views: 5432 },
          { page: '/contact', views: 3210 },
          { page: '/careers', views: 2156 }
        ],
        topReferrers: [
          { source: 'Google', visitors: 15432 },
          { source: 'Direct', visitors: 8765 },
          { source: 'Facebook', visitors: 4321 },
          { source: 'Twitter', visitors: 2134 },
          { source: 'LinkedIn', visitors: 1876 }
        ]
      },
      content: {
        mostViewedPosts: [
          { title: 'Beyond2C Success Stories', views: 5432, date: '2024-06-20' },
          { title: 'Career Development Tips', views: 4321, date: '2024-06-18' },
          { title: 'Industry Insights 2024', views: 3876, date: '2024-06-15' },
          { title: 'Networking Best Practices', views: 3210, date: '2024-06-12' },
          { title: 'Future of Work Trends', views: 2987, date: '2024-06-10' }
        ],
        mostSharedStories: [
          { title: 'My Journey from Intern to Manager', shares: 234, author: 'Ahmet Y.' },
          { title: 'Breaking Gender Barriers in Tech', shares: 198, author: 'Ayşe D.' },
          { title: 'Starting a Business at 40', shares: 167, author: 'Mehmet K.' },
          { title: 'Remote Work Success Story', shares: 143, author: 'Fatma Ş.' },
          { title: 'Career Change at 35', shares: 128, author: 'Ali Ö.' }
        ],
        topCategories: [
          { category: 'Career Development', posts: 89, views: 15432 },
          { category: 'Technology', posts: 76, views: 12876 },
          { category: 'Business', posts: 65, views: 10234 },
          { category: 'Personal Growth', posts: 54, views: 8765 },
          { category: 'Industry News', posts: 43, views: 6543 }
        ]
      },
      demographics: {
        ageGroups: [
          { range: '18-24', percentage: 22.5 },
          { range: '25-34', percentage: 35.8 },
          { range: '35-44', percentage: 24.3 },
          { range: '45-54', percentage: 12.7 },
          { range: '55+', percentage: 4.7 }
        ],
        topCountries: [
          { country: 'Turkey', percentage: 45.6 },
          { country: 'Germany', percentage: 18.3 },
          { country: 'United States', percentage: 12.7 },
          { country: 'United Kingdom', percentage: 8.9 },
          { country: 'France', percentage: 6.2 }
        ],
        deviceTypes: [
          { device: 'Mobile', percentage: 67.8 },
          { device: 'Desktop', percentage: 25.4 },
          { device: 'Tablet', percentage: 6.8 }
        ]
      }
    };
    
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? '↑' : '↓';
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  if (!currentUser) {
    router.push('/admin/login');
    return null;
  }

  if (loading || !analytics) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Statistics</h1>
              <p className="text-gray-600">Track performance and user behavior</p>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="3m">Last 3 Months</option>
                <option value="1y">Last Year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Metric Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'traffic', name: 'Traffic' },
              { id: 'content', name: 'Content' },
              { id: 'demographics', name: 'Demographics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedMetric === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedMetric === 'overview' && (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalUsers)}</p>
                    <p className={`text-sm ${getGrowthColor(analytics.growth.usersGrowth)}`}>
                      {getGrowthIcon(analytics.growth.usersGrowth)} {Math.abs(analytics.growth.usersGrowth)}%
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalPosts)}</p>
                    <p className={`text-sm ${getGrowthColor(analytics.growth.postsGrowth)}`}>
                      {getGrowthIcon(analytics.growth.postsGrowth)} {Math.abs(analytics.growth.postsGrowth)}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Stories</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalStories)}</p>
                    <p className={`text-sm ${getGrowthColor(analytics.growth.storiesGrowth)}`}>
                      {getGrowthIcon(analytics.growth.storiesGrowth)} {Math.abs(analytics.growth.storiesGrowth)}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalViews)}</p>
                    <p className={`text-sm ${getGrowthColor(analytics.growth.viewsGrowth)}`}>
                      {getGrowthIcon(analytics.growth.viewsGrowth)} {Math.abs(analytics.growth.viewsGrowth)}%
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.dailyActiveUsers)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Monthly Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.monthlyActiveUsers)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.conversionRate}%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.bounceRate}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {selectedMetric === 'traffic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.traffic.totalVisits)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.traffic.uniqueVisitors)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.traffic.pageViews)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <p className="text-sm font-medium text-gray-600">Avg Session Duration</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.traffic.avgSessionDuration}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Pages */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
                <div className="space-y-3">
                  {analytics.traffic.topPages.map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{page.page}</span>
                      <span className="text-sm font-medium text-gray-900">{formatNumber(page.views)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Referrers */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h3>
                <div className="space-y-3">
                  {analytics.traffic.topReferrers.map((referrer, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{referrer.source}</span>
                      <span className="text-sm font-medium text-gray-900">{formatNumber(referrer.visitors)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {selectedMetric === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Viewed Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed Posts</h3>
                <div className="space-y-4">
                  {analytics.content.mostViewedPosts.map((post, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{post.date}</span>
                        <span className="text-sm font-medium text-blue-600">{formatNumber(post.views)} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Shared Stories */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Shared Stories</h3>
                <div className="space-y-4">
                  {analytics.content.mostSharedStories.map((story, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900">{story.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">by {story.author}</span>
                        <span className="text-sm font-medium text-green-600">{story.shares} shares</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.content.topCategories.map((category, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">{category.category}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm text-gray-600">{category.posts} posts</div>
                      <div className="text-sm text-gray-600">{formatNumber(category.views)} views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demographics Tab */}
        {selectedMetric === 'demographics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Age Groups */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Groups</h3>
                <div className="space-y-3">
                  {analytics.demographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{group.range}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
                <div className="space-y-3">
                  {analytics.demographics.topCountries.map((country, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{country.country}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Types */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
                <div className="space-y-3">
                  {analytics.demographics.deviceTypes.map((device, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{device.device}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
