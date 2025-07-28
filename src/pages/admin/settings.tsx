import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface SiteSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    supportEmail: string;
    defaultLanguage: string;
    timezone: string;
    dateFormat: string;
    maintenanceMode: boolean;
  };
  content: {
    postsPerPage: number;
    storiesPerPage: number;
    autoApproveStories: boolean;
    allowGuestComments: boolean;
    moderateComments: boolean;
    maxFileSize: number;
    allowedFileTypes: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    googleAnalyticsId: string;
    facebookPixelId: string;
    enableSitemap: boolean;
    enableRobotsTxt: boolean;
  };
  social: {
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    enableSocialLogin: boolean;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
    enableEmailNotifications: boolean;
  };
  security: {
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    enableCaptcha: boolean;
    enableSsl: boolean;
    allowedDomains: string[];
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user: currentUser, isLoading: authLoading } = useAdminAuth();
  
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [successMessage, setSuccessMessage] = useState('');

  // Mock settings data - replace with actual API call
  useEffect(() => {
    const mockSettings: SiteSettings = {
      general: {
        siteName: 'Beyond2C Platform',
        siteDescription: 'Empowering individuals to share their stories and connect with opportunities',
        contactEmail: 'contact@beyond2c.com',
        supportEmail: 'support@beyond2c.com',
        defaultLanguage: 'en',
        timezone: 'Europe/Istanbul',
        dateFormat: 'DD/MM/YYYY',
        maintenanceMode: false
      },
      content: {
        postsPerPage: 10,
        storiesPerPage: 12,
        autoApproveStories: false,
        allowGuestComments: true,
        moderateComments: true,
        maxFileSize: 5,
        allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx']
      },
      seo: {
        metaTitle: 'Beyond2C - Share Your Story, Shape Your Future',
        metaDescription: 'Join Beyond2C to share your professional journey, connect with opportunities, and inspire others with your success stories.',
        keywords: ['career', 'stories', 'professional development', 'networking', 'job opportunities'],
        googleAnalyticsId: '',
        facebookPixelId: '',
        enableSitemap: true,
        enableRobotsTxt: true
      },
      social: {
        facebookUrl: 'https://facebook.com/beyond2c',
        twitterUrl: 'https://twitter.com/beyond2c',
        linkedinUrl: 'https://linkedin.com/company/beyond2c',
        instagramUrl: 'https://instagram.com/beyond2c',
        youtubeUrl: '',
        enableSocialLogin: true
      },
      email: {
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: 'noreply@beyond2c.com',
        fromName: 'Beyond2C Platform',
        enableEmailNotifications: true
      },
      security: {
        enableTwoFactor: false,
        sessionTimeout: 1440,
        maxLoginAttempts: 5,
        enableCaptcha: true,
        enableSsl: true,
        allowedDomains: ['beyond2c.com', 'gmail.com', 'outlook.com']
      }
    };
    
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = async (section: keyof SiteSettings) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (section: keyof SiteSettings, field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const addToArray = (section: keyof SiteSettings, field: string, value: string) => {
    if (!settings) return;
    
    const currentArray = (settings[section] as any)[field] as string[];
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: [...currentArray, value]
      }
    });
  };

  const removeFromArray = (section: keyof SiteSettings, field: string, index: number) => {
    if (!settings) return;
    
    const currentArray = (settings[section] as any)[field] as string[];
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: currentArray.filter((_, i) => i !== index)
      }
    });
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  if (!currentUser) {
    router.push('/admin/login');
    return null;
  }

  if (loading || !settings) {
    return (
      <AdminLayout title="Settings">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <div className="p-0 sm:p-2 md:p-4 w-full max-w-full">
        {/* Header */}
        <div className="mb-4 px-4 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your platform settings</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 px-4 sm:px-0 py-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="px-2">{successMessage}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-full h-full">
          {/* Sidebar */}
          <div className="w-full lg:w-56 xl:w-64 bg-white rounded-lg shadow-sm border sticky top-0 lg:top-4 self-start z-10">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible py-2 px-2 space-x-1 lg:space-x-0 lg:space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-none lg:w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-3 sm:p-4 md:p-5">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSettings('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSettings('general', 'contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                    <textarea
                      value={settings.general.siteDescription}
                      onChange={(e) => updateSettings('general', 'siteDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                    <select
                      value={settings.general.defaultLanguage}
                      onChange={(e) => updateSettings('general', 'defaultLanguage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="tr">Turkish</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => updateSettings('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Europe/Istanbul">Europe/Istanbul</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => updateSettings('general', 'maintenanceMode', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700">
                    Enable Maintenance Mode
                  </label>
                </div>
                
                <button
                  onClick={() => handleSave('general')}
                  disabled={saving}
                  className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Content Settings */}
            {activeTab === 'content' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Content Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posts Per Page</label>
                    <input
                      type="number"
                      value={settings.content.postsPerPage}
                      onChange={(e) => updateSettings('content', 'postsPerPage', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stories Per Page</label>
                    <input
                      type="number"
                      value={settings.content.storiesPerPage}
                      onChange={(e) => updateSettings('content', 'storiesPerPage', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                    <input
                      type="number"
                      value={settings.content.maxFileSize}
                      onChange={(e) => updateSettings('content', 'maxFileSize', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allowed File Types</label>
                    <div className="flex flex-wrap gap-2 p-2 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
                      {settings.content.allowedFileTypes.map((type, index) => (
                        <div key={index} className="bg-white px-2 py-1 rounded border flex items-center space-x-1">
                          <span className="text-sm">{type}</span>
                          <button 
                            onClick={() => removeFromArray('content', 'allowedFileTypes', index)} 
                            className="text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <div className="flex-1 min-w-[180px]">
                        <input 
                          type="text" 
                          placeholder="Add file type (e.g. pdf)"
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              addToArray('content', 'allowedFileTypes', e.currentTarget.value.trim());
                              e.currentTarget.value = '';
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoApproveStories"
                      checked={settings.content.autoApproveStories}
                      onChange={(e) => updateSettings('content', 'autoApproveStories', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="autoApproveStories" className="ml-2 text-sm text-gray-700">
                      Auto-approve stories
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowGuestComments"
                      checked={settings.content.allowGuestComments}
                      onChange={(e) => updateSettings('content', 'allowGuestComments', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="allowGuestComments" className="ml-2 text-sm text-gray-700">
                      Allow guest comments
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="moderateComments"
                      checked={settings.content.moderateComments}
                      onChange={(e) => updateSettings('content', 'moderateComments', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="moderateComments" className="ml-2 text-sm text-gray-700">
                      Moderate comments
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSave('content')}
                  disabled={saving}
                  className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={(e) => updateSettings('seo', 'metaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={settings.seo.metaDescription}
                      onChange={(e) => updateSettings('seo', 'metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                    <input
                      type="text"
                      value={settings.seo.googleAnalyticsId}
                      onChange={(e) => updateSettings('seo', 'googleAnalyticsId', e.target.value)}
                      placeholder="GA-XXXXXXXXX-X"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
                    <input
                      type="text"
                      value={settings.seo.facebookPixelId}
                      onChange={(e) => updateSettings('seo', 'facebookPixelId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {settings.seo.keywords.map((keyword, index) => (
                      <div key={index} className="bg-white px-3 py-1 rounded border flex items-center space-x-2">
                        <span>{keyword}</span>
                        <button 
                          onClick={() => removeFromArray('seo', 'keywords', index)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <div className="flex-1 min-w-[200px]">
                      <input 
                        type="text" 
                        placeholder="Add keyword and press Enter"
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            addToArray('seo', 'keywords', e.currentTarget.value.trim());
                            e.currentTarget.value = '';
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableSitemap"
                      checked={settings.seo.enableSitemap}
                      onChange={(e) => updateSettings('seo', 'enableSitemap', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="enableSitemap" className="ml-2 text-sm text-gray-700">
                      Enable XML Sitemap
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableRobotsTxt"
                      checked={settings.seo.enableRobotsTxt}
                      onChange={(e) => updateSettings('seo', 'enableRobotsTxt', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="enableRobotsTxt" className="ml-2 text-sm text-gray-700">
                      Enable Robots.txt
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSave('seo')}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Social Media Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={settings.social.facebookUrl}
                      onChange={(e) => updateSettings('social', 'facebookUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                    <input
                      type="url"
                      value={settings.social.twitterUrl}
                      onChange={(e) => updateSettings('social', 'twitterUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settings.social.linkedinUrl}
                      onChange={(e) => updateSettings('social', 'linkedinUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={settings.social.instagramUrl}
                      onChange={(e) => updateSettings('social', 'instagramUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableSocialLogin"
                    checked={settings.social.enableSocialLogin}
                    onChange={(e) => updateSettings('social', 'enableSocialLogin', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="enableSocialLogin" className="ml-2 text-sm text-gray-700">
                    Enable Social Media Login
                  </label>
                </div>
                
                <button
                  onClick={() => handleSave('social')}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Email Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={settings.email.smtpHost}
                      onChange={(e) => updateSettings('email', 'smtpHost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <input
                      type="number"
                      value={settings.email.smtpPort}
                      onChange={(e) => updateSettings('email', 'smtpPort', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <input
                      type="text"
                      value={settings.email.smtpUsername}
                      onChange={(e) => updateSettings('email', 'smtpUsername', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <input
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) => updateSettings('email', 'smtpPassword', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                    <input
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={(e) => updateSettings('email', 'fromEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                    <input
                      type="text"
                      value={settings.email.fromName}
                      onChange={(e) => updateSettings('email', 'fromName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableEmailNotifications"
                    checked={settings.email.enableEmailNotifications}
                    onChange={(e) => updateSettings('email', 'enableEmailNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="enableEmailNotifications" className="ml-2 text-sm text-gray-700">
                    Enable Email Notifications
                  </label>
                </div>
                
                <button
                  onClick={() => handleSave('email')}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSettings('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Domains</label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {settings.security.allowedDomains.map((domain, index) => (
                      <div key={index} className="bg-white px-3 py-1 rounded border flex items-center space-x-2">
                        <span>{domain}</span>
                        <button 
                          onClick={() => removeFromArray('security', 'allowedDomains', index)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <div className="flex-1 min-w-[200px]">
                      <input 
                        type="text" 
                        placeholder="Add domain and press Enter"
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            addToArray('security', 'allowedDomains', e.currentTarget.value.trim());
                            e.currentTarget.value = '';
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableTwoFactor"
                      checked={settings.security.enableTwoFactor}
                      onChange={(e) => updateSettings('security', 'enableTwoFactor', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="enableTwoFactor" className="ml-2 text-sm text-gray-700">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableCaptcha"
                      checked={settings.security.enableCaptcha}
                      onChange={(e) => updateSettings('security', 'enableCaptcha', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="enableCaptcha" className="ml-2 text-sm text-gray-700">
                      Enable CAPTCHA
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableSsl"
                      checked={settings.security.enableSsl}
                      onChange={(e) => updateSettings('security', 'enableSsl', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="enableSsl" className="ml-2 text-sm text-gray-700">
                      Force SSL/HTTPS
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSave('security')}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
