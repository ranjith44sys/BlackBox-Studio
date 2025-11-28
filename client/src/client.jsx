
import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Save, Lock, Settings, X, Camera, Eye, ChevronRight, Sparkles, Grid, ArrowLeft, Palette, Type } from 'lucide-react';
import './client2.css';

// API Base URL - Update this to your Flask server URL
const API_BASE_URL = 'http://localhost:5000';

const Client = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('home');
  const [uploadProgress, setUploadProgress] = useState(null);

  // Fetch galleries from Flask API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gallery`);
        const result = await response.json();
        
        if (result.success) {
          const galleriesWithFullUrls = result.data.map(gallery => ({
            ...gallery,
            images: gallery.images.map(img => {
              let fullUrl = img.url;
              if (!fullUrl.startsWith('http')) {
                if (!fullUrl.startsWith('/api')) {
                  fullUrl = `/api${fullUrl}`;
                }
                fullUrl = `${API_BASE_URL}${fullUrl}`;
              }
              console.log('Image URL:', fullUrl);
              return { ...img, url: fullUrl };
            })
          }));
          setSections(galleriesWithFullUrls);
          console.log('Loaded galleries:', galleriesWithFullUrls);
        } else {
          console.log('No galleries found');
        }
      } catch (error) {
        console.error('Error loading galleries:', error);
      }
      setTimeout(() => setIsLoading(false), 1200);
    };
    loadData();
  }, []);

  // Save or Update gallery
  const saveSections = async (sectionData) => {
    try {
      setUploadProgress('Uploading images...');
      
      const method = sectionData._id ? 'PUT' : 'POST';
      const url = sectionData._id 
        ? `${API_BASE_URL}/api/gallery/${sectionData._id}` 
        : `${API_BASE_URL}/api/gallery`;
      
      // Remove API_BASE_URL from image URLs before sending
      const dataToSend = {
        ...sectionData,
        images: sectionData.images.map(img => ({
          ...img,
          url: img.url.replace(API_BASE_URL, '')
        }))
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        setUploadProgress('Upload successful!');
        
        // Reload all galleries after save
        const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
        const allResult = await allResponse.json();
        if (allResult.success) {
          const galleriesWithFullUrls = allResult.data.map(gallery => ({
            ...gallery,
            images: gallery.images.map(img => {
              let fullUrl = img.url;
              if (!fullUrl.startsWith('http')) {
                if (!fullUrl.startsWith('/api')) {
                  fullUrl = `/api${fullUrl}`;
                }
                fullUrl = `${API_BASE_URL}${fullUrl}`;
              }
              return { ...img, url: fullUrl };
            })
          }));
          setSections(galleriesWithFullUrls);
        }
        
        setTimeout(() => setUploadProgress(null), 2000);
        return true;
      } else {
        setUploadProgress(null);
        alert(result.error || 'Failed to save gallery');
        return false;
      }
    } catch (error) {
      console.error('Failed to save:', error);
      setUploadProgress(null);
      alert('Failed to save data. Please try again.');
      return false;
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === '@Blackbox23') {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const createNewSection = () => {
    setEditingSection({
      name: '',
      title: '',
      description: '',
      collageFormat: 'grid',
      fontStyle: 'sans',
      colorTheme: 'elegant',
      images: []
    });
    setIsEditing(true);
  };

  const saveSection = async () => {
    if (!editingSection.name || !editingSection.title) {
      alert('Please fill in section name and title');
      return;
    }

    if (editingSection.images.length === 0) {
      alert('Please add at least one image');
      return;
    }

    const success = await saveSections(editingSection);
    
    if (success) {
      setIsEditing(false);
      setEditingSection(null);
    }
  };

  const deleteSection = async (id) => {
    if (!window.confirm('Delete this section?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Reload all galleries after delete
        const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
        const allResult = await allResponse.json();
        if (allResult.success) {
          const galleriesWithFullUrls = allResult.data.map(gallery => ({
            ...gallery,
            images: gallery.images.map(img => {
              let fullUrl = img.url;
              if (!fullUrl.startsWith('http')) {
                if (!fullUrl.startsWith('/api')) {
                  fullUrl = `/api${fullUrl}`;
                }
                fullUrl = `${API_BASE_URL}${fullUrl}`;
              }
              return { ...img, url: fullUrl };
            })
          }));
          setSections(galleriesWithFullUrls);
        }
      } else {
        alert('Failed to delete gallery');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB per image
    const oversizedFiles = files.filter(f => f.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large. Maximum size: 5MB per image.\nOversized files: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random().toString(),
          url: event.target.result, // Base64 data URL
          name: file.name
        };
        setEditingSection(prev => ({
          ...prev,
          images: [...prev.images, newImage]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (imageId) => {
    setEditingSection(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const getFontClass = (style) => {
    const fonts = {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
      elegant: 'font-elegant',
      modern: 'font-modern'
    };
    return fonts[style] || fonts.sans;
  };

  const getCollageClass = (format) => {
    const formats = {
      grid: 'gallery-grid',
      'grid-asymmetric': 'gallery-grid-asymmetric',
      'grid-magazine': 'gallery-grid-magazine',
      'grid-pinterest': 'gallery-grid-pinterest',
      masonry: 'gallery-masonry',
      single: 'gallery-single',
      horizontal: 'gallery-horizontal',
      vertical: 'gallery-vertical'
    };
    return formats[format] || formats.grid;
  };

  const getColorTheme = (theme) => {
    return `theme-${theme}`;
  };

  const openGallery = (sectionId) => {
    setSelectedSection(sectionId);
    setViewMode('gallery');
  };

  const backToCollections = () => {
    setSelectedSection(null);
    setViewMode('collections');
  };

  const backToHome = () => {
    setViewMode('home');
    setSelectedSection(null);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-icon">
            <Camera size={64} />
            <div className="loading-pulse">
              <Camera size={64} />
            </div>
          </div>
          <div className="loading-text">LOADING GALLERY</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel
  if (isAdmin) {
    if (isEditing) {
      return (
        <div className="admin-panel">
          <div className="admin-bg-gradient"></div>
          
          {uploadProgress && (
            <div className="upload-notification">
              {uploadProgress}
            </div>
          )}
          
          <div className="admin-container fade-in">
            <div className="admin-card glass-effect">
              <div className="admin-header">
                <h2 className="admin-title">
                  <Sparkles className="icon-gradient" />
                  {editingSection._id ? 'Edit Section' : 'Create New Section'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="btn-icon">
                  <X size={28} />
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Section Name</label>
                  <input
                    type="text"
                    value={editingSection.name}
                    onChange={(e) => setEditingSection({...editingSection, name: e.target.value})}
                    className="input-field"
                    placeholder="Wedding Portfolio 2024"
                  />
                </div>

                <div className="form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    value={editingSection.title}
                    onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                    className="input-field"
                    placeholder="Capturing Your Beautiful Moments"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={editingSection.description || ''}
                    onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
                    className="input-field textarea-field"
                    placeholder="Tell a story about this collection..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label><Grid size={16} className="inline mr-2" />Layout Style</label>
                  <select
                    value={editingSection.collageFormat}
                    onChange={(e) => setEditingSection({...editingSection, collageFormat: e.target.value})}
                    className="select-field"
                  >
                    <optgroup label="Grid Layouts">
                      <option value="grid">Classic Grid</option>
                      <option value="grid-asymmetric">Asymmetric Grid</option>
                      <option value="grid-magazine">Magazine Grid</option>
                      <option value="grid-pinterest">Pinterest Style</option>
                    </optgroup>
                    <optgroup label="Other Layouts">
                      <option value="masonry">Masonry Layout</option>
                      <option value="single">Single Column</option>
                      <option value="horizontal">Horizontal Scroll</option>
                      <option value="vertical">Vertical Gallery</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label><Type size={16} className="inline mr-2" />Typography</label>
                  <select
                    value={editingSection.fontStyle}
                    onChange={(e) => setEditingSection({...editingSection, fontStyle: e.target.value})}
                    className="select-field"
                  >
                    <option value="sans">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="mono">Monospace</option>
                    <option value="elegant">Elegant Script</option>
                    <option value="modern">Modern Bold</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label><Palette size={16} className="inline mr-2" />Color Theme</label>
                  <div className="color-theme-grid">
                    {['elegant', 'warm', 'cool', 'dark', 'vintage', 'minimal'].map(theme => (
                      <div
                        key={theme}
                        onClick={() => setEditingSection({...editingSection, colorTheme: theme})}
                        className={`color-theme-option ${editingSection.colorTheme === theme ? 'active' : ''}`}
                      >
                        <div className={`theme-preview theme-${theme}`}></div>
                        <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="upload-section">
                <label>Upload Images (Max 5MB per image)</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="upload-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <Upload className="upload-icon" size={56} />
                    <p className="upload-text-main">Drop images here or click to browse</p>
                    <p className="upload-text-sub">Support multiple files • JPG, PNG, WebP • Max 5MB each</p>
                  </label>
                </div>
              </div>

              {editingSection.images.length > 0 && (
                <div className="images-preview">
                  <p className="images-count">{editingSection.images.length} images uploaded</p>
                  <div className="images-grid">
                    {editingSection.images.map((img, idx) => (
                      <div key={img.id} className="image-preview-card stagger-in" style={{animationDelay: `${idx * 50}ms`}}>
                        <img src={img.url} alt={img.name} />
                        <button onClick={() => deleteImage(img.id)} className="btn-delete-image">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="admin-actions">
                <button onClick={saveSection} className="btn-primary btn-gradient">
                  <Save size={20} />
                  Save Section
                </button>
                <button onClick={() => setIsEditing(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="admin-panel">
        <div className="admin-bg-gradient"></div>
        
        <div className="admin-container">
          <div className="admin-dashboard-header fade-in">
            <div>
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">Manage your photography collections</p>
            </div>
            <button onClick={() => setIsAdmin(false)} className="btn-secondary">
              Logout
            </button>
          </div>

          <button onClick={createNewSection} className="btn-create-gallery slide-up">
            <Plus size={22} />
            Create New Gallery
          </button>

          <div className="sections-grid">
            {sections.map((section, idx) => (
              <div key={section._id} className="section-card glass-effect stagger-in" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="section-header">
                  <div>
                    <h3 className="section-name">{section.name}</h3>
                    <p className="section-title">{section.title}</p>
                    <div className="section-meta">
                      <span>{section.images.length} photos</span>
                      <span>•</span>
                      <span>{section.collageFormat}</span>
                      <span>•</span>
                      <span>{section.fontStyle}</span>
                      <span>•</span>
                      <span>{section.colorTheme}</span>
                    </div>
                  </div>
                  <div className="section-actions">
                    <button
                      onClick={() => {
                        setEditingSection(section);
                        setIsEditing(true);
                      }}
                      className="btn-icon btn-icon-blue"
                    >
                      <Settings size={20} />
                    </button>
                    <button onClick={() => deleteSection(section._id)} className="btn-icon btn-icon-red">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="section-preview-grid">
                  {section.images.slice(0, 6).map(img => (
                    <img 
                      key={img.id} 
                      src={img.url} 
                      alt="" 
                      className="preview-image"
                      onError={(e) => {
                        console.error('Failed to load image:', img.url);
                        e.target.style.background = '#ff000033';
                        e.target.alt = 'Failed to load';
                      }}
                      onLoad={() => console.log('Image loaded:', img.url)}
                    />
                  ))}
                  {section.images.length > 6 && (
                    <div className="preview-more">+{section.images.length - 6}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Gallery View (User can only view)
  if (viewMode === 'gallery' && selectedSection) {
    const section = sections.find(s => s._id === selectedSection);
    if (!section) return null;
    
    return (
      <div className={`gallery-view ${getFontClass(section.fontStyle)} ${getColorTheme(section.colorTheme)}`}>
        <div className="gallery-gradient-bg"></div>
        
        <div className="gallery-container">
          <div className="gallery-hero">
            <div className="gallery-hero-bg">
              {section.images[0] && (
                <img src={section.images[0].url} alt="" className="hero-bg-image" />
              )}
            </div>
            <div className="gallery-hero-content fade-in">
              <button onClick={backToCollections} className="btn-back">
                <ArrowLeft size={20} />
                Back to Collections
              </button>
              <h1 className="gallery-hero-title slide-down">{section.title}</h1>
              <p className="gallery-hero-subtitle slide-up">
                {section.description || `${section.images.length} Captured Moments`}
              </p>
              <div className="scroll-indicator bounce">
                <ChevronRight className="rotate-90" size={32} />
              </div>
            </div>
          </div>

          <div className="gallery-content">
            <div className={getCollageClass(section.collageFormat)} onContextMenu={(e) => e.preventDefault()}>
              {section.images.map((img, idx) => (
                <div 
                  key={img.id} 
                  className="gallery-image-card stagger-in"
                  style={{animationDelay: `${idx * 80}ms`}}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="gallery-image protected-image"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="gallery-image-overlay">
                    <Eye size={48} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedImage && (
          <div className="lightbox fade-in" onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="lightbox-close">
              <X size={36} />
            </button>
            <img
              src={selectedImage.url}
              alt=""
              className="lightbox-image scale-in protected-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="lightbox-badge">
              <Lock size={16} />
              <span>Protected Content</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Collections Page (User can view all collections)
  if (viewMode === 'collections') {
    return (
      <div className="collections-page theme-elegant">
        <div className="elegant-gradient-bg"></div>
        
        <div className="collections-container">
          <button onClick={backToHome} className="btn-back-home fade-in">
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="collections-header fade-in">
            <h1 className="collections-title">Our Collections</h1>
            <p className="collections-subtitle">Explore our curated photography galleries</p>
          </div>

          {sections.length === 0 ? (
            <div className="empty-state fade-in">
              <Camera className="empty-icon" size={80} />
              <p className="empty-text">No galleries available yet</p>
            </div>
          ) : (
            <div className="collections-grid">
              {sections.map((section, idx) => (
                <div
                  key={section._id}
                  onClick={() => openGallery(section._id)}
                  className="collection-card stagger-in"
                  style={{animationDelay: `${idx * 100}ms`}}
                >
                  <div className="collection-card-inner">
                    <div className="collection-image-wrapper">
                      {section.images[0] && (
                        <img src={section.images[0].url} alt="" className="collection-image" />
                      )}
                      <div className="collection-overlay"></div>
                    </div>
                    <div className="collection-content">
                      <h3 className="collection-name">{section.name}</h3>
                      <p className="collection-description">{section.title}</p>
                      <div className="collection-meta">
                        <span>{section.images.length} photos</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Home/Landing Page (User view)
  return (
    <div className="home-page theme-elegant">
      <div className="elegant-gradient-bg"></div>
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="home-container">
        <div className="home-hero">
          <div className="hero-content">
            <div className="hero-icon float">
              <Camera size={80} />
            </div>
            <h1 className="hero-title slide-down">
              <span className="elegant-text">Studio Gallery</span>
            </h1>
            <p className="hero-subtitle slide-up">Where Moments Become Timeless</p>
            
            {sections.length > 0 && (
              <button onClick={() => setViewMode('collections')} className="btn-explore scale-in">
                <Grid size={20} />
                Explore Collections
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {sections.length > 0 && (
          <div className="featured-section fade-in">
            <h2 className="featured-title">Featured Collections</h2>
            <div className="featured-grid">
              {sections.slice(0, 3).map((section, idx) => (
                <div
                  key={section._id}
                  onClick={() => openGallery(section._id)}
                  className="featured-card stagger-in"
                  style={{animationDelay: `${idx * 150}ms`}}
                >
                  {section.images[0] && (
                    <>
                      <img src={section.images[0].url} alt="" className="featured-image" />
                      <div className="featured-overlay"></div>
                    </>
                  )}
                  <div className="featured-content">
                    <h3>{section.name}</h3>
                    <p>{section.images.length} photos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="admin-login-section slide-up">
          <div className="admin-login-card glass-effect">
            <h3 className="admin-login-title">
              <Lock size={24} />
              Admin Access
            </h3>
            <div className="admin-password-input">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Enter admin password"
                className="input-field"
              />
            </div>
            <button onClick={handleAdminLogin} className="btn-primary btn-elegant">
              Enter Dashboard
            </button>
            <p className="admin-login-hint"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;

//------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Upload, Trash2, Plus, Save, Lock, Settings, X, Camera, Eye, ChevronRight, Sparkles, Grid, ArrowLeft, Palette, Type, Instagram, Youtube, Twitter } from 'lucide-react';
// import './client.css';

// // API Base URL - Update this to your Flask server URL
// const API_BASE_URL = 'http://localhost:5000';

// const Client = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [adminPassword, setAdminPassword] = useState('');
//   const [sections, setSections] = useState([]);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('home');
//   const [uploadProgress, setUploadProgress] = useState(null);

//   // Logo URL - Replace with your actual logo
//   const logoUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23d4a574' width='100' height='100'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3EB%3C/text%3E%3C/svg%3E";

//   // Fetch galleries from Flask API
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/gallery`);
//         const result = await response.json();
        
//         if (result.success) {
//           const galleriesWithFullUrls = result.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               console.log('Image URL:', fullUrl);
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//           console.log('Loaded galleries:', galleriesWithFullUrls);
//         } else {
//           console.log('No galleries found');
//         }
//       } catch (error) {
//         console.error('Error loading galleries:', error);
//       }
//       setTimeout(() => setIsLoading(false), 1200);
//     };
//     loadData();
//   }, []);

//   // Save or Update gallery
//   const saveSections = async (sectionData) => {
//     try {
//       setUploadProgress('Uploading images...');
      
//       const method = sectionData._id ? 'PUT' : 'POST';
//       const url = sectionData._id 
//         ? `${API_BASE_URL}/api/gallery/${sectionData._id}` 
//         : `${API_BASE_URL}/api/gallery`;
      
//       // Remove API_BASE_URL from image URLs before sending
//       const dataToSend = {
//         ...sectionData,
//         images: sectionData.images.map(img => ({
//           ...img,
//           url: img.url.replace(API_BASE_URL, '')
//         }))
//       };
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setUploadProgress('Upload successful!');
        
//         // Reload all galleries after save
//         const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
//         const allResult = await allResponse.json();
//         if (allResult.success) {
//           const galleriesWithFullUrls = allResult.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//         }
        
//         setTimeout(() => setUploadProgress(null), 2000);
//         return true;
//       } else {
//         setUploadProgress(null);
//         alert(result.error || 'Failed to save gallery');
//         return false;
//       }
//     } catch (error) {
//       console.error('Failed to save:', error);
//       setUploadProgress(null);
//       alert('Failed to save data. Please try again.');
//       return false;
//     }
//   };

//   const handleAdminLogin = () => {
//     if (adminPassword === 'admin123') {
//       setIsAdmin(true);
//       setAdminPassword('');
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const createNewSection = () => {
//     setEditingSection({
//       name: '',
//       title: '',
//       description: '',
//       collageFormat: 'grid',
//       fontStyle: 'sans',
//       colorTheme: 'elegant',
//       images: []
//     });
//     setIsEditing(true);
//   };

//   const saveSection = async () => {
//     if (!editingSection.name || !editingSection.title) {
//       alert('Please fill in section name and title');
//       return;
//     }

//     if (editingSection.images.length === 0) {
//       alert('Please add at least one image');
//       return;
//     }

//     const success = await saveSections(editingSection);
    
//     if (success) {
//       setIsEditing(false);
//       setEditingSection(null);
//     }
//   };

//   const deleteSection = async (id) => {
//     if (!window.confirm('Delete this section?')) return;

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Reload all galleries after delete
//         const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
//         const allResult = await allResponse.json();
//         if (allResult.success) {
//           const galleriesWithFullUrls = allResult.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//         }
//       } else {
//         alert('Failed to delete gallery');
//       }
//     } catch (error) {
//       console.error('Failed to delete:', error);
//       alert('Failed to delete. Please try again.');
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Check file sizes
//     const maxSize = 5 * 1024 * 1024; // 5MB per image
//     const oversizedFiles = files.filter(f => f.size > maxSize);
    
//     if (oversizedFiles.length > 0) {
//       alert(`Some files are too large. Maximum size: 5MB per image.\nOversized files: ${oversizedFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const newImage = {
//           id: Date.now() + Math.random().toString(),
//           url: event.target.result, // Base64 data URL
//           name: file.name
//         };
//         setEditingSection(prev => ({
//           ...prev,
//           images: [...prev.images, newImage]
//         }));
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const deleteImage = (imageId) => {
//     setEditingSection(prev => ({
//       ...prev,
//       images: prev.images.filter(img => img.id !== imageId)
//     }));
//   };

//   const getFontClass = (style) => {
//     const fonts = {
//       sans: 'font-sans',
//       serif: 'font-serif',
//       mono: 'font-mono',
//       elegant: 'font-elegant',
//       modern: 'font-modern'
//     };
//     return fonts[style] || fonts.sans;
//   };

//   const getCollageClass = (format) => {
//     const formats = {
//       grid: 'gallery-grid',
//       'grid-asymmetric': 'gallery-grid-asymmetric',
//       'grid-magazine': 'gallery-grid-magazine',
//       'grid-pinterest': 'gallery-grid-pinterest',
//       masonry: 'gallery-masonry',
//       single: 'gallery-single',
//       horizontal: 'gallery-horizontal',
//       vertical: 'gallery-vertical'
//     };
//     return formats[format] || formats.grid;
//   };

//   const getColorTheme = (theme) => {
//     return `theme-${theme}`;
//   };

//   const openGallery = (sectionId) => {
//     setSelectedSection(sectionId);
//     setViewMode('gallery');
//   };

//   const backToCollections = () => {
//     setSelectedSection(null);
//     setViewMode('collections');
//   };

//   const backToHome = () => {
//     setViewMode('home');
//     setSelectedSection(null);
//   };

//   // Header Component
//   const Header = () => (
//     <header className="header">
//       <div className="header-container">
//         <div className="logo">
//           <img src={logoUrl} className="logo1" alt="Logo" />
//           BLACK<br/>BOX
//         </div>
//         <nav className="nav">
//           <a href="/" className="nav-link">HOME</a>
//           <a href="/Gallery" className="nav-link active">GALLERY</a>
//           <a href="/services" className="nav-link">PACKAGES</a>
//           <a href="/about" className="nav-link">ABOUT</a>
//           <a href="/contact" className="nav-link">CONTACT</a>
//         </nav>
//         <div className="social-icons">
//           <a href="#" className="social-link"><Instagram size={16} /></a>
//           <a href="#" className="social-link"><Youtube size={16} /></a>
//           <a href="#" className="social-link"><Twitter size={16} /></a>
//         </div>
//       </div>
//     </header>
//   );

//   // Loading Screen
//   if (isLoading) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-content">
//           <div className="loading-icon">
//             <Camera size={64} />
//             <div className="loading-pulse">
//               <Camera size={64} />
//             </div>
//           </div>
//           <div className="loading-text">LOADING GALLERY</div>
//           <div className="loading-bar">
//             <div className="loading-progress"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Admin Panel
//   if (isAdmin) {
//     if (isEditing) {
//       return (
//         <div className="admin-panel">
//           <div className="admin-bg-gradient"></div>
          
//           {uploadProgress && (
//             <div className="upload-notification">
//               {uploadProgress}
//             </div>
//           )}
          
//           <div className="admin-container fade-in">
//             <div className="admin-card glass-effect">
//               <div className="admin-header">
//                 <h2 className="admin-title">
//                   <Sparkles className="icon-gradient" />
//                   {editingSection._id ? 'Edit Section' : 'Create New Section'}
//                 </h2>
//                 <button onClick={() => setIsEditing(false)} className="btn-icon">
//                   <X size={28} />
//                 </button>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Section Name</label>
//                   <input
//                     type="text"
//                     value={editingSection.name}
//                     onChange={(e) => setEditingSection({...editingSection, name: e.target.value})}
//                     className="input-field"
//                     placeholder="Wedding Portfolio 2024"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Section Title</label>
//                   <input
//                     type="text"
//                     value={editingSection.title}
//                     onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
//                     className="input-field"
//                     placeholder="Capturing Your Beautiful Moments"
//                   />
//                 </div>

//                 <div className="form-group full-width">
//                   <label>Description</label>
//                   <textarea
//                     value={editingSection.description || ''}
//                     onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
//                     className="input-field textarea-field"
//                     placeholder="Tell a story about this collection..."
//                     rows="3"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label><Grid size={16} className="inline mr-2" />Layout Style</label>
//                   <select
//                     value={editingSection.collageFormat}
//                     onChange={(e) => setEditingSection({...editingSection, collageFormat: e.target.value})}
//                     className="select-field"
//                   >
//                     <optgroup label="Grid Layouts">
//                       <option value="grid">Classic Grid</option>
//                       <option value="grid-asymmetric">Asymmetric Grid</option>
//                       <option value="grid-magazine">Magazine Grid</option>
//                       <option value="grid-pinterest">Pinterest Style</option>
//                     </optgroup>
//                     <optgroup label="Other Layouts">
//                       <option value="masonry">Masonry Layout</option>
//                       <option value="single">Single Column</option>
//                       <option value="horizontal">Horizontal Scroll</option>
//                       <option value="vertical">Vertical Gallery</option>
//                     </optgroup>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label><Type size={16} className="inline mr-2" />Typography</label>
//                   <select
//                     value={editingSection.fontStyle}
//                     onChange={(e) => setEditingSection({...editingSection, fontStyle: e.target.value})}
//                     className="select-field"
//                   >
//                     <option value="sans">Sans Serif</option>
//                     <option value="serif">Serif</option>
//                     <option value="mono">Monospace</option>
//                     <option value="elegant">Elegant Script</option>
//                     <option value="modern">Modern Bold</option>
//                   </select>
//                 </div>

//                 <div className="form-group full-width">
//                   <label><Palette size={16} className="inline mr-2" />Color Theme</label>
//                   <div className="color-theme-grid">
//                     {['elegant', 'warm', 'cool', 'dark', 'vintage', 'minimal'].map(theme => (
//                       <div
//                         key={theme}
//                         onClick={() => setEditingSection({...editingSection, colorTheme: theme})}
//                         className={`color-theme-option ${editingSection.colorTheme === theme ? 'active' : ''}`}
//                       >
//                         <div className={`theme-preview theme-${theme}`}></div>
//                         <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="upload-section">
//                 <label>Upload Images (Max 5MB per image)</label>
//                 <div className="upload-area">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageUpload}
//                     className="upload-input"
//                     id="image-upload"
//                   />
//                   <label htmlFor="image-upload" className="upload-label">
//                     <Upload className="upload-icon" size={56} />
//                     <p className="upload-text-main">Drop images here or click to browse</p>
//                     <p className="upload-text-sub">Support multiple files • JPG, PNG, WebP • Max 5MB each</p>
//                   </label>
//                 </div>
//               </div>

//               {editingSection.images.length > 0 && (
//                 <div className="images-preview">
//                   <p className="images-count">{editingSection.images.length} images uploaded</p>
//                   <div className="images-grid">
//                     {editingSection.images.map((img, idx) => (
//                       <div key={img.id} className="image-preview-card stagger-in" style={{animationDelay: `${idx * 50}ms`}}>
//                         <img src={img.url} alt={img.name} />
//                         <button onClick={() => deleteImage(img.id)} className="btn-delete-image">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="admin-actions">
//                 <button onClick={saveSection} className="btn-primary btn-gradient">
//                   <Save size={20} />
//                   Save Section
//                 </button>
//                 <button onClick={() => setIsEditing(false)} className="btn-secondary">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="admin-panel">
//         <div className="admin-bg-gradient"></div>
        
//         <div className="admin-container">
//           <div className="admin-dashboard-header fade-in">
//             <div>
//               <h1 className="dashboard-title">Admin Dashboard</h1>
//               <p className="dashboard-subtitle">Manage your photography collections</p>
//             </div>
//             <button onClick={() => setIsAdmin(false)} className="btn-secondary">
//               Logout
//             </button>
//           </div>

//           <button onClick={createNewSection} className="btn-create-gallery slide-up">
//             <Plus size={22} />
//             Create New Gallery
//           </button>

//           <div className="sections-grid">
//             {sections.map((section, idx) => (
//               <div key={section._id} className="section-card glass-effect stagger-in" style={{animationDelay: `${idx * 100}ms`}}>
//                 <div className="section-header">
//                   <div>
//                     <h3 className="section-name">{section.name}</h3>
//                     <p className="section-title">{section.title}</p>
//                     <div className="section-meta">
//                       <span>{section.images.length} photos</span>
//                       <span>•</span>
//                       <span>{section.collageFormat}</span>
//                       <span>•</span>
//                       <span>{section.fontStyle}</span>
//                       <span>•</span>
//                       <span>{section.colorTheme}</span>
//                     </div>
//                   </div>
//                   <div className="section-actions">
//                     <button
//                       onClick={() => {
//                         setEditingSection(section);
//                         setIsEditing(true);
//                       }}
//                       className="btn-icon btn-icon-blue"
//                     >
//                       <Settings size={20} />
//                     </button>
//                     <button onClick={() => deleteSection(section._id)} className="btn-icon btn-icon-red">
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="section-preview-grid">
//                   {section.images.slice(0, 6).map(img => (
//                     <img 
//                       key={img.id} 
//                       src={img.url} 
//                       alt="" 
//                       className="preview-image"
//                       onError={(e) => {
//                         console.error('Failed to load image:', img.url);
//                         e.target.style.background = '#ff000033';
//                         e.target.alt = 'Failed to load';
//                       }}
//                       onLoad={() => console.log('Image loaded:', img.url)}
//                     />
//                   ))}
//                   {section.images.length > 6 && (
//                     <div className="preview-more">+{section.images.length - 6}</div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Gallery View (User can only view)
//   if (viewMode === 'gallery' && selectedSection) {
//     const section = sections.find(s => s._id === selectedSection);
//     if (!section) return null;
    
//     return (
//       <>
//         <Header />
//         <div className={`gallery-view ${getFontClass(section.fontStyle)} ${getColorTheme(section.colorTheme)}`}>
//           <div className="gallery-gradient-bg"></div>
          
//           <div className="gallery-container">
//             <div className="gallery-hero">
//               <div className="gallery-hero-bg">
//                 {section.images[0] && (
//                   <img src={section.images[0].url} alt="" className="hero-bg-image" />
//                 )}
//               </div>
//               <div className="gallery-hero-content fade-in">
//                 <button onClick={backToCollections} className="btn-back">
//                   <ArrowLeft size={20} />
//                   Back to Collections
//                 </button>
//                 <h1 className="gallery-hero-title slide-down">{section.title}</h1>
//                 <p className="gallery-hero-subtitle slide-up">
//                   {section.description || `${section.images.length} Captured Moments`}
//                 </p>
//                 <div className="scroll-indicator bounce">
//                   <ChevronRight className="rotate-90" size={32} />
//                 </div>
//               </div>
//             </div>

//             <div className="gallery-content">
//               <div className={getCollageClass(section.collageFormat)} onContextMenu={(e) => e.preventDefault()}>
//                 {section.images.map((img, idx) => (
//                   <div 
//                     key={img.id} 
//                     className="gallery-image-card stagger-in"
//                     style={{animationDelay: `${idx * 80}ms`}}
//                     onClick={() => setSelectedImage(img)}
//                   >
//                     <img
//                       src={img.url}
//                       alt=""
//                       className="gallery-image protected-image"
//                       draggable="false"
//                       onContextMenu={(e) => e.preventDefault()}
//                     />
//                     <div className="gallery-image-overlay">
//                       <Eye size={48} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {selectedImage && (
//             <div className="lightbox fade-in" onClick={() => setSelectedImage(null)}>
//               <button onClick={() => setSelectedImage(null)} className="lightbox-close">
//                 <X size={36} />
//               </button>
//               <img
//                 src={selectedImage.url}
//                 alt=""
//                 className="lightbox-image scale-in protected-image"
//                 draggable="false"
//                 onContextMenu={(e) => e.preventDefault()}
//               />
//               <div className="lightbox-badge">
//                 <Lock size={16} />
//                 <span>Protected Content</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }

//   // Collections Page (User can view all collections)
//   if (viewMode === 'collections') {
//     return (
//       <>
//         <Header />
//         <div className="collections-page theme-elegant">
//           <div className="elegant-gradient-bg"></div>
          
//           <div className="collections-container">
//             <button onClick={backToHome} className="btn-back-home fade-in">
//               <ArrowLeft size={20} />
//               Back to Home
//             </button>

//             <div className="collections-header fade-in">
//               <h1 className="collections-title">Our Collections</h1>
//               <p className="collections-subtitle">Explore our curated photography galleries</p>
//             </div>

//             {sections.length === 0 ? (
//               <div className="empty-state fade-in">
//                 <Camera className="empty-icon" size={80} />
//                 <p className="empty-text">No galleries available yet</p>
//               </div>
//             ) : (
//               <div className="collections-grid">
//                 {sections.map((section, idx) => (
//                   <div
//                     key={section._id}
//                     onClick={() => openGallery(section._id)}
//                     className="collection-card stagger-in"
//                     style={{animationDelay: `${idx * 100}ms`}}
//                   >
//                     <div className="collection-card-inner">
//                       <div className="collection-image-wrapper">
//                         {section.images[0] && (
//                           <img src={section.images[0].url} alt="" className="collection-image" />
//                         )}
//                         <div className="collection-overlay"></div>
//                       </div>
//                       <div className="collection-content">
//                         <h3 className="collection-name">{section.name}</h3>
//                         <p className="collection-description">{section.title}</p>
//                         <div className="collection-meta">
//                           <span>{section.images.length} photos</span>
//                           <ChevronRight size={16} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Home/Landing Page (User view)
//   return (
//     <>
//       <Header />
//       <div className="home-page theme-elegant">
//         <div className="elegant-gradient-bg"></div>
//         <div className="floating-particles">
//           <div className="particle particle-1"></div>
//           <div className="particle particle-2"></div>
//           <div className="particle particle-3"></div>
//           <div className="particle particle-4"></div>
//         </div>

//         <div className="home-container">
//           <div className="home-hero">
//             <div className="hero-content">
//               <div className="hero-icon float">
//                 <Camera size={80} />
//               </div>
//               <h1 className="hero-title slide-down">
//                 <span className="elegant-text">Studio Gallery</span>
//               </h1>
//               <p className="hero-subtitle slide-up">Where Moments Become Timeless</p>
              
//               {sections.length > 0 && (
//                 <button onClick={() => setViewMode('collections')} className="btn-explore scale-in">
//                   <Grid size={20} />
//                   Explore Collections
//                   <ChevronRight size={20} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {sections.length > 0 && (
//             <div className="featured-section fade-in">
//               <h2 className="featured-title">Featured Collections</h2>
//               <div className="featured-grid">
//                 {sections.slice(0, 3).map((section, idx) => (
//                   <div
//                     key={section._id}
//                     onClick={() => openGallery(section._id)}
//                     className="featured-card stagger-in"
//                     style={{animationDelay: `${idx * 150}ms`}}
//                   >
//                     {section.images[0] && (
//                       <>
//                         <img src={section.images[0].url} alt="" className="featured-image" />
//                         <div className="featured-overlay"></div>
//                       </>
//                     )}
//                     <div className="featured-content">
//                       <h3>{section.name}</h3>
//                       <p>{section.images.length} photos</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="admin-login-section slide-up">
//             <div className="admin-login-card glass-effect">
//               <h3 className="admin-login-title">
//                 <Lock size={24} />
//                 Admin Access
//               </h3>
//               <div className="admin-password-input">
//                 <input
//                   type="password"
//                   value={adminPassword}
//                   onChange={(e) => setAdminPassword(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
//                   placeholder="Enter admin password"
//                   className="input-field"
//                 />
//               </div>
//               <button onClick={handleAdminLogin} className="btn-primary btn-elegant">
//                 Enter Dashboard
//               </button>
//               <p className="admin-login-hint">Demo: admin123</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Client;

// ----------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Upload, Trash2, Plus, Save, Lock, Settings, X, Camera, Eye, ChevronRight, Sparkles, Grid, ArrowLeft, Palette, Type, Instagram, Youtube, Twitter } from 'lucide-react';
// import './client.css';

// // API Base URL - Update this to your Flask server URL
// const API_BASE_URL = 'http://localhost:5000';

// const Client = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [adminPassword, setAdminPassword] = useState('');
//   const [sections, setSections] = useState([]);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('home');
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [headerVisible, setHeaderVisible] = useState(true);

//   // Logo URL - Replace with your actual logo
//   const logoUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23d4a574' width='100' height='100'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3EB%3C/text%3E%3C/svg%3E";

//   // Scroll behavior for navbar
//   useEffect(() => {
//     let lastScrollTop = 0;
//     const scrollThreshold = 5;

//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
//       if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
//         if (scrollTop > lastScrollTop && scrollTop > 100) {
//           // Scrolling down & past 100px
//           setHeaderVisible(false);
//         } else {
//           // Scrolling up
//           setHeaderVisible(true);
//         }
//         lastScrollTop = scrollTop;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Fetch galleries from Flask API
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/gallery`);
//         const result = await response.json();
        
//         if (result.success) {
//           const galleriesWithFullUrls = result.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               console.log('Image URL:', fullUrl);
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//           console.log('Loaded galleries:', galleriesWithFullUrls);
//         } else {
//           console.log('No galleries found');
//         }
//       } catch (error) {
//         console.error('Error loading galleries:', error);
//       }
//       setTimeout(() => setIsLoading(false), 1200);
//     };
//     loadData();
//   }, []);

//   // Save or Update gallery
//   const saveSections = async (sectionData) => {
//     try {
//       setUploadProgress('Uploading images...');
      
//       const method = sectionData._id ? 'PUT' : 'POST';
//       const url = sectionData._id 
//         ? `${API_BASE_URL}/api/gallery/${sectionData._id}` 
//         : `${API_BASE_URL}/api/gallery`;
      
//       const dataToSend = {
//         ...sectionData,
//         images: sectionData.images.map(img => ({
//           ...img,
//           url: img.url.replace(API_BASE_URL, '')
//         }))
//       };
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setUploadProgress('Upload successful!');
        
//         const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
//         const allResult = await allResponse.json();
//         if (allResult.success) {
//           const galleriesWithFullUrls = allResult.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//         }
        
//         setTimeout(() => setUploadProgress(null), 2000);
//         return true;
//       } else {
//         setUploadProgress(null);
//         alert(result.error || 'Failed to save gallery');
//         return false;
//       }
//     } catch (error) {
//       console.error('Failed to save:', error);
//       setUploadProgress(null);
//       alert('Failed to save data. Please try again.');
//       return false;
//     }
//   };

//   const handleAdminLogin = () => {
//     if (adminPassword === 'admin123') {
//       setIsAdmin(true);
//       setAdminPassword('');
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const createNewSection = () => {
//     setEditingSection({
//       name: '',
//       title: '',
//       description: '',
//       collageFormat: 'grid',
//       fontStyle: 'sans',
//       colorTheme: 'elegant',
//       images: []
//     });
//     setIsEditing(true);
//   };

//   const saveSection = async () => {
//     if (!editingSection.name || !editingSection.title) {
//       alert('Please fill in section name and title');
//       return;
//     }

//     if (editingSection.images.length === 0) {
//       alert('Please add at least one image');
//       return;
//     }

//     const success = await saveSections(editingSection);
    
//     if (success) {
//       setIsEditing(false);
//       setEditingSection(null);
//     }
//   };

//   const deleteSection = async (id) => {
//     if (!window.confirm('Delete this section?')) return;

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();

//       if (result.success) {
//         const allResponse = await fetch(`${API_BASE_URL}/api/gallery`);
//         const allResult = await allResponse.json();
//         if (allResult.success) {
//           const galleriesWithFullUrls = allResult.data.map(gallery => ({
//             ...gallery,
//             images: gallery.images.map(img => {
//               let fullUrl = img.url;
//               if (!fullUrl.startsWith('http')) {
//                 if (!fullUrl.startsWith('/api')) {
//                   fullUrl = `/api${fullUrl}`;
//                 }
//                 fullUrl = `${API_BASE_URL}${fullUrl}`;
//               }
//               return { ...img, url: fullUrl };
//             })
//           }));
//           setSections(galleriesWithFullUrls);
//         }
//       } else {
//         alert('Failed to delete gallery');
//       }
//     } catch (error) {
//       console.error('Failed to delete:', error);
//       alert('Failed to delete. Please try again.');
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     const maxSize = 5 * 1024 * 1024;
//     const oversizedFiles = files.filter(f => f.size > maxSize);
    
//     if (oversizedFiles.length > 0) {
//       alert(`Some files are too large. Maximum size: 5MB per image.\nOversized files: ${oversizedFiles.map(f => f.name).join(', ')}`);
//       return;
//     }
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const newImage = {
//           id: Date.now() + Math.random().toString(),
//           url: event.target.result,
//           name: file.name
//         };
//         setEditingSection(prev => ({
//           ...prev,
//           images: [...prev.images, newImage]
//         }));
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const deleteImage = (imageId) => {
//     setEditingSection(prev => ({
//       ...prev,
//       images: prev.images.filter(img => img.id !== imageId)
//     }));
//   };

//   const getFontClass = (style) => {
//     const fonts = {
//       sans: 'font-sans',
//       serif: 'font-serif',
//       mono: 'font-mono',
//       elegant: 'font-elegant',
//       modern: 'font-modern'
//     };
//     return fonts[style] || fonts.sans;
//   };

//   const getCollageClass = (format) => {
//     const formats = {
//       grid: 'gallery-grid',
//       'grid-asymmetric': 'gallery-grid-asymmetric',
//       'grid-magazine': 'gallery-grid-magazine',
//       'grid-pinterest': 'gallery-grid-pinterest',
//       masonry: 'gallery-masonry',
//       single: 'gallery-single',
//       horizontal: 'gallery-horizontal',
//       vertical: 'gallery-vertical'
//     };
//     return formats[format] || formats.grid;
//   };

//   const getColorTheme = (theme) => {
//     return `theme-${theme}`;
//   };

//   const openGallery = (sectionId) => {
//     setSelectedSection(sectionId);
//     setViewMode('gallery');
//   };

//   const backToCollections = () => {
//     setSelectedSection(null);
//     setViewMode('collections');
//   };

//   const backToHome = () => {
//     setViewMode('home');
//     setSelectedSection(null);
//   };

//   // Header Component
//   const Header = () => (
//     <header className={`header ${!headerVisible ? 'header-hidden' : ''}`}>
//       <div className="header-container">
//         <div className="logo">
//           <img src={logoUrl} className="logo1" alt="Logo" />
//           BLACK<br/>BOX
//         </div>
//         <nav className="nav">
//           <a href="/" className="nav-link">HOME</a>
//           <a href="/Gallery" className="nav-link active">GALLERY</a>
//           <a href="/services" className="nav-link">PACKAGES</a>
//           <a href="/about" className="nav-link">ABOUT</a>
//           <a href="/contact" className="nav-link">CONTACT</a>
//         </nav>
//         <div className="social-icons">
//           <a href="#" className="social-link"><Instagram size={16} /></a>
//           <a href="#" className="social-link"><Youtube size={16} /></a>
//           <a href="#" className="social-link"><Twitter size={16} /></a>
//         </div>
//       </div>
//     </header>
//   );

//   // Loading Screen
//   if (isLoading) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-content">
//           <div className="loading-icon">
//             <Camera size={64} />
//             <div className="loading-pulse">
//               <Camera size={64} />
//             </div>
//           </div>
//           <div className="loading-text">LOADING GALLERY</div>
//           <div className="loading-bar">
//             <div className="loading-progress"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Admin Panel
//   if (isAdmin) {
//     if (isEditing) {
//       return (
//         <div className="admin-panel">
//           <div className="admin-bg-gradient"></div>
          
//           {uploadProgress && (
//             <div className="upload-notification">
//               {uploadProgress}
//             </div>
//           )}
          
//           <div className="admin-container fade-in">
//             <div className="admin-card glass-effect">
//               <div className="admin-header">
//                 <h2 className="admin-title">
//                   <Sparkles className="icon-gradient" />
//                   {editingSection._id ? 'Edit Section' : 'Create New Section'}
//                 </h2>
//                 <button onClick={() => setIsEditing(false)} className="btn-icon">
//                   <X size={28} />
//                 </button>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Section Name</label>
//                   <input
//                     type="text"
//                     value={editingSection.name}
//                     onChange={(e) => setEditingSection({...editingSection, name: e.target.value})}
//                     className="input-field"
//                     placeholder="Wedding Portfolio 2024"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Section Title</label>
//                   <input
//                     type="text"
//                     value={editingSection.title}
//                     onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
//                     className="input-field"
//                     placeholder="Capturing Your Beautiful Moments"
//                   />
//                 </div>

//                 <div className="form-group full-width">
//                   <label>Description</label>
//                   <textarea
//                     value={editingSection.description || ''}
//                     onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
//                     className="input-field textarea-field"
//                     placeholder="Tell a story about this collection..."
//                     rows="3"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label><Grid size={16} className="inline mr-2" />Layout Style</label>
//                   <select
//                     value={editingSection.collageFormat}
//                     onChange={(e) => setEditingSection({...editingSection, collageFormat: e.target.value})}
//                     className="select-field"
//                   >
//                     <optgroup label="Grid Layouts">
//                       <option value="grid">Classic Grid</option>
//                       <option value="grid-asymmetric">Asymmetric Grid</option>
//                       <option value="grid-magazine">Magazine Grid</option>
//                       <option value="grid-pinterest">Pinterest Style</option>
//                     </optgroup>
//                     <optgroup label="Other Layouts">
//                       <option value="masonry">Masonry Layout</option>
//                       <option value="single">Single Column</option>
//                       <option value="horizontal">Horizontal Scroll</option>
//                       <option value="vertical">Vertical Gallery</option>
//                     </optgroup>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label><Type size={16} className="inline mr-2" />Typography</label>
//                   <select
//                     value={editingSection.fontStyle}
//                     onChange={(e) => setEditingSection({...editingSection, fontStyle: e.target.value})}
//                     className="select-field"
//                   >
//                     <option value="sans">Sans Serif</option>
//                     <option value="serif">Serif</option>
//                     <option value="mono">Monospace</option>
//                     <option value="elegant">Elegant Script</option>
//                     <option value="modern">Modern Bold</option>
//                   </select>
//                 </div>

//                 <div className="form-group full-width">
//                   <label><Palette size={16} className="inline mr-2" />Color Theme</label>
//                   <div className="color-theme-grid">
//                     {['elegant', 'warm', 'cool', 'dark', 'vintage', 'minimal'].map(theme => (
//                       <div
//                         key={theme}
//                         onClick={() => setEditingSection({...editingSection, colorTheme: theme})}
//                         className={`color-theme-option ${editingSection.colorTheme === theme ? 'active' : ''}`}
//                       >
//                         <div className={`theme-preview theme-${theme}`}></div>
//                         <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="upload-section">
//                 <label>Upload Images (Max 5MB per image)</label>
//                 <div className="upload-area">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageUpload}
//                     className="upload-input"
//                     id="image-upload"
//                   />
//                   <label htmlFor="image-upload" className="upload-label">
//                     <Upload className="upload-icon" size={56} />
//                     <p className="upload-text-main">Drop images here or click to browse</p>
//                     <p className="upload-text-sub">Support multiple files • JPG, PNG, WebP • Max 5MB each</p>
//                   </label>
//                 </div>
//               </div>

//               {editingSection.images.length > 0 && (
//                 <div className="images-preview">
//                   <p className="images-count">{editingSection.images.length} images uploaded</p>
//                   <div className="images-grid">
//                     {editingSection.images.map((img, idx) => (
//                       <div key={img.id} className="image-preview-card stagger-in" style={{animationDelay: `${idx * 50}ms`}}>
//                         <img src={img.url} alt={img.name} />
//                         <button onClick={() => deleteImage(img.id)} className="btn-delete-image">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="admin-actions">
//                 <button onClick={saveSection} className="btn-primary btn-gradient">
//                   <Save size={20} />
//                   Save Section
//                 </button>
//                 <button onClick={() => setIsEditing(false)} className="btn-secondary">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="admin-panel">
//         <div className="admin-bg-gradient"></div>
        
//         <div className="admin-container">
//           <div className="admin-dashboard-header fade-in">
//             <div>
//               <h1 className="dashboard-title">Admin Dashboard</h1>
//               <p className="dashboard-subtitle">Manage your photography collections</p>
//             </div>
//             <button onClick={() => setIsAdmin(false)} className="btn-secondary">
//               Logout
//             </button>
//           </div>

//           <button onClick={createNewSection} className="btn-create-gallery slide-up">
//             <Plus size={22} />
//             Create New Gallery
//           </button>

//           <div className="sections-grid">
//             {sections.map((section, idx) => (
//               <div key={section._id} className="section-card glass-effect stagger-in" style={{animationDelay: `${idx * 100}ms`}}>
//                 <div className="section-header">
//                   <div>
//                     <h3 className="section-name">{section.name}</h3>
//                     <p className="section-title">{section.title}</p>
//                     <div className="section-meta">
//                       <span>{section.images.length} photos</span>
//                       <span>•</span>
//                       <span>{section.collageFormat}</span>
//                       <span>•</span>
//                       <span>{section.fontStyle}</span>
//                       <span>•</span>
//                       <span>{section.colorTheme}</span>
//                     </div>
//                   </div>
//                   <div className="section-actions">
//                     <button
//                       onClick={() => {
//                         setEditingSection(section);
//                         setIsEditing(true);
//                       }}
//                       className="btn-icon btn-icon-blue"
//                     >
//                       <Settings size={20} />
//                     </button>
//                     <button onClick={() => deleteSection(section._id)} className="btn-icon btn-icon-red">
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="section-preview-grid">
//                   {section.images.slice(0, 6).map(img => (
//                     <img 
//                       key={img.id} 
//                       src={img.url} 
//                       alt="" 
//                       className="preview-image"
//                       onError={(e) => {
//                         console.error('Failed to load image:', img.url);
//                         e.target.style.background = '#ff000033';
//                         e.target.alt = 'Failed to load';
//                       }}
//                       onLoad={() => console.log('Image loaded:', img.url)}
//                     />
//                   ))}
//                   {section.images.length > 6 && (
//                     <div className="preview-more">+{section.images.length - 6}</div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Gallery View (User can only view)
//   if (viewMode === 'gallery' && selectedSection) {
//     const section = sections.find(s => s._id === selectedSection);
//     if (!section) return null;
    
//     return (
//       <>
//         <Header />
//         <div className={`gallery-view ${getFontClass(section.fontStyle)} ${getColorTheme(section.colorTheme)}`}>
//           <div className="gallery-gradient-bg"></div>
          
//           <div className="gallery-container">
//             <div className="gallery-hero">
//               <div className="gallery-hero-bg">
//                 {section.images[0] && (
//                   <img src={section.images[0].url} alt="" className="hero-bg-image" />
//                 )}
//               </div>
//               <div className="gallery-hero-content fade-in">
//                 <button onClick={backToCollections} className="btn-back">
//                   <ArrowLeft size={20} />
//                   Back to Collections
//                 </button>
//                 <h1 className="gallery-hero-title slide-down">{section.title}</h1>
//                 <p className="gallery-hero-subtitle slide-up">
//                   {section.description || `${section.images.length} Captured Moments`}
//                 </p>
//                 <div className="scroll-indicator bounce">
//                   <ChevronRight className="rotate-90" size={32} />
//                 </div>
//               </div>
//             </div>

//             <div className="gallery-content">
//               <div className={getCollageClass(section.collageFormat)} onContextMenu={(e) => e.preventDefault()}>
//                 {section.images.map((img, idx) => (
//                   <div 
//                     key={img.id} 
//                     className="gallery-image-card stagger-in"
//                     style={{animationDelay: `${idx * 80}ms`}}
//                     onClick={() => setSelectedImage(img)}
//                   >
//                     <img
//                       src={img.url}
//                       alt=""
//                       className="gallery-image protected-image"
//                       draggable="false"
//                       onContextMenu={(e) => e.preventDefault()}
//                     />
//                     <div className="gallery-image-overlay">
//                       <Eye size={48} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {selectedImage && (
//             <div className="lightbox fade-in" onClick={() => setSelectedImage(null)}>
//               <button onClick={() => setSelectedImage(null)} className="lightbox-close">
//                 <X size={36} />
//               </button>
//               <img
//                 src={selectedImage.url}
//                 alt=""
//                 className="lightbox-image scale-in protected-image"
//                 draggable="false"
//                 onContextMenu={(e) => e.preventDefault()}
//               />
//               <div className="lightbox-badge">
//                 <Lock size={16} />
//                 <span>Protected Content</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }

//   // Collections Page (User can view all collections)
//   if (viewMode === 'collections') {
//     return (
//       <>
//         <Header />
//         <div className="collections-page theme-elegant">
//           <div className="elegant-gradient-bg"></div>
          
//           <div className="collections-container">
//             <button onClick={backToHome} className="btn-back-home fade-in">
//               <ArrowLeft size={20} />
//               Back to Home
//             </button>

//             <div className="collections-header fade-in">
//               <h1 className="collections-title">Our Collections</h1>
//               <p className="collections-subtitle">Explore our curated photography galleries</p>
//             </div>

//             {sections.length === 0 ? (
//               <div className="empty-state fade-in">
//                 <Camera className="empty-icon" size={80} />
//                 <p className="empty-text">No galleries available yet</p>
//               </div>
//             ) : (
//               <div className="collections-grid">
//                 {sections.map((section, idx) => (
//                   <div
//                     key={section._id}
//                     onClick={() => openGallery(section._id)}
//                     className="collection-card stagger-in"
//                     style={{animationDelay: `${idx * 100}ms`}}
//                   >
//                     <div className="collection-card-inner">
//                       <div className="collection-image-wrapper">
//                         {section.images[0] && (
//                           <img src={section.images[0].url} alt="" className="collection-image" />
//                         )}
//                         <div className="collection-overlay"></div>
//                       </div>
//                       <div className="collection-content">
//                         <h3 className="collection-name">{section.name}</h3>
//                         <p className="collection-description">{section.title}</p>
//                         <div className="collection-meta">
//                           <span>{section.images.length} photos</span>
//                           <ChevronRight size={16} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Home/Landing Page (User view)
//   return (
//     <>
//       <Header />
//       <div className="home-page theme-elegant">
//         <div className="elegant-gradient-bg"></div>
//         <div className="floating-particles">
//           <div className="particle particle-1"></div>
//           <div className="particle particle-2"></div>
//           <div className="particle particle-3"></div>
//           <div className="particle particle-4"></div>
//         </div>

//         <div className="home-container">
//           <div className="home-hero">
//             <div className="hero-content">
//               <div className="hero-icon float">
//                 <Camera size={80} />
//               </div>
//               <h1 className="hero-title slide-down">
//                 <span className="elegant-text">Studio Gallery</span>
//               </h1>
//               <p className="hero-subtitle slide-up">Where Moments Become Timeless</p>
              
//               {sections.length > 0 && (
//                 <button onClick={() => setViewMode('collections')} className="btn-explore scale-in">
//                   <Grid size={20} />
//                   Explore Collections
//                   <ChevronRight size={20} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {sections.length > 0 && (
//             <div className="featured-section fade-in">
//               <h2 className="featured-title">Featured Collections</h2>
//               <div className="featured-grid">
//                 {sections.slice(0, 3).map((section, idx) => (
//                   <div
//                     key={section._id}
//                     onClick={() => openGallery(section._id)}
//                     className="featured-card stagger-in"
//                     style={{animationDelay: `${idx * 150}ms`}}
//                   >
//                     {section.images[0] && (
//                       <>
//                         <img src={section.images[0].url} alt="" className="featured-image" />
//                         <div className="featured-overlay"></div>
//                       </>
//                     )}
//                     <div className="featured-content">
//                       <h3>{section.name}</h3>
//                       <p>{section.images.length} photos</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="admin-login-section slide-up">
//             <div className="admin-login-card glass-effect">
//               <h3 className="admin-login-title">
//                 <Lock size={24} />
//                 Admin Access
//               </h3>
//               <div className="admin-password-input">
//                 <input
//                   type="password"
//                   value={adminPassword}
//                   onChange={(e) => setAdminPassword(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
//                   placeholder="Enter admin password"
//                   className="input-field"
//                 />
//               </div>
//               <button onClick={handleAdminLogin} className="btn-primary btn-elegant">
//                 Enter Dashboard
//               </button>
//               <p className="admin-login-hint">Demo: admin123</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Client;