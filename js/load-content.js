// Company Details Object (will be populated from JSON)
let companyDetails = {};

// Load Company Details
function loadCompanyDetails() {
    // Add cache-busting parameter to prevent browser caching
    const cacheBuster = '?v=' + new Date().getTime();
    return fetch('data/company/company.json' + cacheBuster, {
        cache: 'no-cache'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load company details');
            }
            return response.json();
        })
        .then(data => {
            companyDetails = data;
            populateCompanyDetails();
            return data;
        })
        .catch(error => {
            console.error('Error loading company details:', error);
            // Use fallback values if JSON fails to load
            companyDetails = {
                phone: "9509226208",
                whatsapp: "9509226208",
                email: "mrdcinfojpr@gmail.com",
                address: "B-5, Shiv Circle, Shiv Marg, Banipark, Jaipur-302016",
                addressLink: "https://maps.app.goo.gl/bLNoNQhFmHxTa8Eb9",
                facebook: "https://www.facebook.com/baniparksharmarthsansthan/",
                instagram: "https://www.instagram.com/baniparkdharmarthsansthan/",
                youtube: "https://www.youtube.com/@baniparkdharmarthsansthan",
                google: "https://maps.app.goo.gl/bLNoNQhFmHxTa8Eb9"
            };
            populateCompanyDetails();
        });
}

// Populate Company Details in HTML
function populateCompanyDetails() {
    // Phone Numbers
    document.querySelectorAll('[data-company="phone"]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = `tel:${companyDetails.phone}`;
            // Always update textContent - the data-company attribute indicates it should be dynamic
            el.textContent = companyDetails.phone;
        } else {
            el.textContent = companyDetails.phone;
        }
    });

    // WhatsApp Links - Auto-add country code if not present
    document.querySelectorAll('[data-company="whatsapp"]').forEach(el => {
        if (el.tagName === 'A') {
            // Convert WhatsApp number: if it doesn't start with country code, add 91 (India)
            let whatsappNumber = companyDetails.whatsapp || companyDetails.phone;
            
            // Remove any spaces, dashes, or plus signs
            whatsappNumber = whatsappNumber.replace(/[\s\-+]/g, '');
            
            // If number doesn't start with country code (91), add it
            if (!whatsappNumber.startsWith('91') && whatsappNumber.length === 10) {
                whatsappNumber = '91' + whatsappNumber;
            }
            
            // Always update the href
            el.href = `https://wa.me/${whatsappNumber}`;
            
            // Update textContent if element has no child elements (no icons)
            // If it has icons/children, preserve them and only update href
            const hasChildElements = el.children.length > 0;
            if (!hasChildElements) {
                el.textContent = companyDetails.whatsapp || companyDetails.phone;
            }
        }
    });

    // Email
    document.querySelectorAll('[data-company="email"]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = `mailto:${companyDetails.email}`;
            // Always update textContent - the data-company attribute indicates it should be dynamic
            el.textContent = companyDetails.email;
        } else {
            el.textContent = companyDetails.email;
        }
    });

    // Address
    document.querySelectorAll('[data-company="address"]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = companyDetails.addressLink;
            // Always update textContent - the data-company attribute indicates it should be dynamic
            el.textContent = companyDetails.address;
        } else {
            el.textContent = companyDetails.address;
        }
    });

    // Address Link (for buttons/links that only need the URL)
    document.querySelectorAll('[data-company="addressLink"]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = companyDetails.addressLink;
        }
    });

    // Facebook Link
    document.querySelectorAll('[data-company="facebook"]').forEach(el => {
        if (el.tagName === 'A' && companyDetails.facebook) {
            el.href = companyDetails.facebook;
        }
    });

    // Instagram Link
    document.querySelectorAll('[data-company="instagram"]').forEach(el => {
        if (el.tagName === 'A' && companyDetails.instagram) {
            el.href = companyDetails.instagram;
        }
    });

    // YouTube Link
    document.querySelectorAll('[data-company="youtube"]').forEach(el => {
        if (el.tagName === 'A' && companyDetails.youtube) {
            el.href = companyDetails.youtube;
        }
    });

    // Google/Maps Link
    document.querySelectorAll('[data-company="google"]').forEach(el => {
        if (el.tagName === 'A' && companyDetails.google) {
            el.href = companyDetails.google;
        }
    });

    // Update structured data in index.html if present
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
        try {
            const data = JSON.parse(structuredData.textContent);
            if (data.telephone) data.telephone = `+91-${companyDetails.phone}`;
            if (data.email) data.email = companyDetails.email;
            if (data.address && data.address.streetAddress) {
                data.address.streetAddress = companyDetails.address;
            }
            structuredData.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Error updating structured data:', e);
        }
    }
}

// Load Gallery Images
function loadGalleryImages() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    fetch('data/gallery/gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load gallery images');
            }
            return response.json();
        })
        .then(data => {
            // Handle both old array format and new object format
            const images = Array.isArray(data) ? data : (data.images || []);
            images.sort((a, b) => (a.order || 0) - (b.order || 0));
            container.innerHTML = '';
            
            images.forEach((item, index) => {
                const delay = (index + 1) * 50;
                const galleryItem = document.createElement('a');
                galleryItem.href = item.image;
                galleryItem.className = 'gallery-item glightbox';
                galleryItem.setAttribute('data-aos', 'zoom-in');
                galleryItem.setAttribute('data-aos-delay', delay);
                
                galleryItem.innerHTML = `
                    <div class="gallery-image-wrapper">
                        <img src="${item.image}" alt="${item.alt || 'Banipark Dharmarth Sansthan Facility'}" class="gallery-image" loading="lazy">
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus"></i>
                            <span class="gallery-overlay-text">View Full Size</span>
                        </div>
                    </div>
                `;
                
                container.appendChild(galleryItem);
            });
            
            if (typeof GLightbox !== 'undefined') {
                const lightbox = GLightbox({
                    touchNavigation: true,
                    touchFollowAxis: true,
                    loop: true,
                    autoplayVideos: false,
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    slideEffect: 'slide',
                    moreText: 'See more',
                    moreLength: 60,
                    closeButton: true,
                    keyboardNavigation: true,
                    closeOnOutsideClick: true,
                    width: '90%',
                    height: '90vh'
                });
            }
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading gallery images:', error);
            container.innerHTML = '<p class="error-message">Failed to load gallery images. Please try again later.</p>';
        });
}

// Load Trustee Images
function loadTrusteeImages() {
    const container = document.getElementById('trustee-container');
    if (!container) return;

    fetch('data/trustee/trustee.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load trustee images');
            }
            return response.json();
        })
        .then(data => {
            const trustees = data.images || data; // Support both new and old structure
            if (!trustees || trustees.length === 0) {
                throw new Error('No trustee images found');
            }
            
            trustees.sort((a, b) => (a.order || 0) - (b.order || 0));
            container.innerHTML = '';
            
            trustees.forEach((item, index) => {
                const delay = (index + 1) * 100;
                const trusteeCard = document.createElement('div');
                trusteeCard.className = 'team-member-card';
                trusteeCard.setAttribute('data-aos', 'zoom-in');
                trusteeCard.setAttribute('data-aos-delay', delay);
                
                trusteeCard.innerHTML = `
                    <div class="team-member-image-wrapper trustee-image-wrapper">
                        <img src="${item.image}" alt="${item.alt || 'Trustee Member'}" class="team-member-image" loading="lazy">
                    </div>
                `;
                
                container.appendChild(trusteeCard);
            });
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading trustee images:', error);
            container.innerHTML = '<p class="error-message">Failed to load trustee images. Please try again later.</p>';
        });
}

// Load Faculty Images
function loadFacultyImages() {
    const container = document.getElementById('faculty-container');
    if (!container) return;

    fetch('data/faculty/faculty.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load faculty images');
            }
            return response.json();
        })
        .then(data => {
            const faculty = data.images || data; // Support both new and old structure
            if (!faculty || faculty.length === 0) {
                throw new Error('No faculty images found');
            }
            
            faculty.sort((a, b) => (a.order || 0) - (b.order || 0));
            container.innerHTML = '';
            
            faculty.forEach((item, index) => {
                const delay = (index + 1) * 100;
                const facultyCard = document.createElement('div');
                facultyCard.className = 'team-member-card';
                facultyCard.setAttribute('data-aos', 'zoom-in');
                facultyCard.setAttribute('data-aos-delay', delay);
                
                facultyCard.innerHTML = `
                    <div class="team-member-image-wrapper faculty-image-wrapper">
                        <img src="${item.image}" alt="${item.alt || 'Faculty Member'}" class="team-member-image" loading="lazy">
                    </div>
                `;
                
                container.appendChild(facultyCard);
            });
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading faculty images:', error);
            container.innerHTML = '<p class="error-message">Failed to load faculty images. Please try again later.</p>';
        });
}

// Extract YouTube Video ID from various URL formats
function extractYouTubeId(url) {
    if (!url) return null;
    
    // Handle different YouTube URL formats including Shorts
    // Supports: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, youtube.com/embed/
    // Also handles www. prefix automatically
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
        /(?:www\.)?youtube\.com\/shorts\/([^&\n?#]+)/,  // YouTube Shorts format (with optional www.)
        /youtu\.be\/([^&\n?#]+)/  // Short youtu.be links
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Load Video Gallery
function loadVideoGallery() {
    const container = document.getElementById('video-gallery-container');
    if (!container) return;

    fetch('data/video-gallery/video-gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load video gallery');
            }
            return response.json();
        })
        .then(data => {
            const videos = data.videos || [];
            videos.sort((a, b) => (a.order || 0) - (b.order || 0));
            container.innerHTML = '';
            
            if (videos.length === 0) {
                container.innerHTML = '<p class="error-message">No videos available at the moment.</p>';
                return;
            }
            
            videos.forEach((item, index) => {
                const videoId = extractYouTubeId(item.url);
                if (!videoId) {
                    console.warn('Invalid YouTube URL:', item.url);
                    return;
                }
                
                const delay = (index + 1) * 100;
                const videoItem = document.createElement('div');
                videoItem.className = 'video-gallery-item';
                videoItem.setAttribute('data-aos', 'zoom-in');
                videoItem.setAttribute('data-aos-delay', delay);
                
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                
                videoItem.innerHTML = `
                    <div class="video-wrapper">
                        <iframe 
                            src="${embedUrl}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy"
                            title="${item.title || 'Banipark Dharmarth Sansthan Video'}"
                        ></iframe>
                    </div>
                    ${item.title ? `<h3 class="video-title">${item.title}</h3>` : ''}
                `;
                
                container.appendChild(videoItem);
            });
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading video gallery:', error);
            container.innerHTML = '<p class="error-message">Failed to load videos. Please try again later.</p>';
        });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Always load company details first
    loadCompanyDetails().then(() => {
        // Load based on presence of containers, so clean URLs (/gallery) also work
        if (document.getElementById('gallery-container')) {
            loadGalleryImages();
        }

        if (document.getElementById('video-gallery-container')) {
            loadVideoGallery();
        }

        if (document.getElementById('trustee-container')) {
            loadTrusteeImages();
        }

        if (document.getElementById('faculty-container')) {
            loadFacultyImages();
        }
    });
});
