import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  language: 'tr' | 'en';
  views: number;
}

const BlogManagement: React.FC = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'İklim Değişikliğinin Türkiye\'ye Etkileri',
      excerpt: 'Son araştırmalar iklim değişikliğinin Türkiye üzerindeki etkilerinin...',
      author: 'Dr. Ahmet Yılmaz',
      publishDate: '2024-06-10',
      category: 'Bilim',
      tags: ['İklim', 'Türkiye', 'Araştırma'],
      status: 'published',
      featured: true,
      language: 'tr',
      views: 1254
    },
    {
      id: '2',
      title: 'Gençler İçin İklim Eylemi Rehberi',
      excerpt: 'İklim değişikliği ile mücadelede gençlerin yapabileceği pratik adımlar...',
      author: 'Kemal Arslan',
      publishDate: '2024-06-08',
      category: 'Rehber',
      tags: ['Gençlik', 'Eylem', 'Rehber'],
      status: 'published',
      featured: false,
      language: 'tr',
      views: 892
    },
    {
      id: '3',
      title: 'Paris İklim Anlaşması Güncellemesi',
      excerpt: 'Paris Anlaşması\'nın son gelişmeleri ve ülkelerin taahhütleri...',
      author: 'Prof. Dr. Ayşe Yalçın',
      publishDate: '2024-06-05',
      category: 'Politika',
      tags: ['Paris Anlaşması', 'Politik'],
      status: 'draft',
      featured: false,
      language: 'tr',
      views: 0
    }
  ]);

  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    language: 'all',
    featured: 'all'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const categories = [
    { value: 'science', label: 'Bilim' },
    { value: 'lifestyle', label: 'Yaşam' },
    { value: 'technology', label: 'Teknoloji' },
    { value: 'politics', label: 'Politika' },
    { value: 'activism', label: 'Aktivizm' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesStatus = filter.status === 'all' || post.status === filter.status;
    const matchesCategory = filter.category === 'all' || post.category === filter.category;
    const matchesLanguage = filter.language === 'all' || post.language === filter.language;
    const matchesFeatured = filter.featured === 'all' || 
      (filter.featured === 'featured' && post.featured) ||
      (filter.featured === 'not-featured' && !post.featured);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesLanguage && matchesFeatured && matchesSearch;
  });

  const handleDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter(post => post.id !== postToDelete));
      setPostToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const toggleFeatured = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, featured: !post.featured } : post
    ));
  };

  const updateStatus = (postId: string, newStatus: 'draft' | 'published' | 'archived') => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ));
  };

  return (
    <AdminLayout title="Blog Yazıları Yönetimi">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Yazıları</h1>
            <p className="text-gray-600">{filteredPosts.length} yazı bulundu</p>
          </div>
          <Link 
            href="/admin/blog/create"
            className="admin-btn-primary"
          >
            📝 Yeni Yazı Oluştur
          </Link>
        </div>

        {/* Filters */}
        <div className="admin-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtreler</h3>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Yazı başlığı veya yazar ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-form-input w-full max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="admin-form-label">Durum</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                className="admin-form-select"
              >
                <option value="all">Tümü</option>
                <option value="published">Yayınlanan</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlenen</option>
              </select>
            </div>

            <div>
              <label className="admin-form-label">Kategori</label>
              <select
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
                className="admin-form-select"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-form-label">Dil</label>
              <select
                value={filter.language}
                onChange={(e) => setFilter({...filter, language: e.target.value})}
                className="admin-form-select"
              >
                <option value="all">Tüm Diller</option>
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="admin-form-label">Öne Çıkan</label>
              <select
                value={filter.featured}
                onChange={(e) => setFilter({...filter, featured: e.target.value})}
                className="admin-form-select"
              >
                <option value="all">Tümü</option>
                <option value="featured">Öne Çıkan</option>
                <option value="not-featured">Normal</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button 
              onClick={() => setFilter({status: 'all', category: 'all', language: 'all', featured: 'all'})}
              className="admin-btn-secondary"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="admin-card">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Yazar</th>
                  <th>Kategori</th>
                  <th>Durum</th>
                  <th>Dil</th>
                  <th>Görüntüleme</th>
                  <th>Tarih</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                          {post.featured && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              ⭐ Öne Çıkan
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{post.author}</td>
                    <td>
                      <span className="admin-badge info">{post.category}</span>
                    </td>
                    <td>
                      <select
                        value={post.status}
                        onChange={(e) => updateStatus(post.id, e.target.value as any)}
                        className={`text-xs rounded-full px-2 py-1 border-0 ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="published">Yayınlanan</option>
                        <option value="draft">Taslak</option>
                        <option value="archived">Arşivlenen</option>
                      </select>
                    </td>
                    <td>
                      <span className="admin-badge">
                        {post.language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
                      </span>
                    </td>
                    <td>{post.views.toLocaleString()}</td>
                    <td>{new Date(post.publishDate).toLocaleDateString('tr-TR')}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin/blog/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-800"
                          title="Düzenle"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => toggleFeatured(post.id)}
                          className={`${post.featured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-800`}
                          title={post.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                        >
                          ⭐
                        </button>
                        <Link 
                          href={`/blog/${post.id}`}
                          target="_blank"
                          className="text-green-600 hover:text-green-800"
                          title="Görüntüle"
                        >
                          👁️
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Hiç yazı bulunamadı.</p>
            </div>
          )}
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{posts.filter(p => p.status === 'published').length}</p>
              <p className="text-sm text-gray-600">Yayınlanan</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{posts.filter(p => p.status === 'draft').length}</p>
              <p className="text-sm text-gray-600">Taslak</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.featured).length}</p>
              <p className="text-sm text-gray-600">Öne Çıkan</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{posts.reduce((total, post) => total + post.views, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Toplam Görüntüleme</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yazıyı Sil</h3>
            <p className="text-gray-600 mb-6">
              Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="admin-btn-secondary"
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="admin-btn-danger"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BlogManagement;
