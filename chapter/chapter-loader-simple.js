/**
 * Red Hat Academy RH124 - Simple Chapter Content Loader (CSP Compliant)
 * 
 * This module handles content loading without dynamic script loading
 * to comply with Content Security Policy restrictions
 */

class SimpleChapterLoader {
    constructor() {
        this.contentRegistry = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the chapter loader and register all available content
     */
    init() {
        // Register all available content from global variables
        this.registerContent('section-a-1', window.SECTION_A1_CONTENT);
        this.registerContent('section-a-2', window.SECTION_A2_CONTENT);
        this.registerContent('section-a-3', window.SECTION_A3_CONTENT);
        
        // Register Chapter 1 content
        this.registerContent('section-1-1', window.SECTION_1_1_CONTENT);
        
        this.initialized = true;
        console.log('Simple Chapter Loader initialized with', this.contentRegistry.size, 'sections');
    }

    /**
     * Register content in the registry
     * @param {string} sectionId - Section identifier
     * @param {Object} contentData - Content data object
     */
    registerContent(sectionId, contentData) {
        if (contentData) {
            this.contentRegistry.set(sectionId, contentData);
            console.log(`Registered content for ${sectionId}`);
        } else {
            console.warn(`Content not available for ${sectionId}`);
        }
    }

    /**
     * Get content for a section (synchronous)
     * @param {string} sectionId - Section identifier
     * @returns {Object|null} Content data or null if not found
     */
    getContent(sectionId) {
        return this.contentRegistry.get(sectionId) || null;
    }

    /**
     * Render chapter content to the DOM
     * @param {Object} contentData - Chapter content data
     * @param {string} containerId - ID of container element
     */
    renderContent(contentData, containerId = 'course') {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element with ID '${containerId}' not found`);
        }

        // Build the complete content HTML
        const contentHTML = this._buildContentHTML(contentData);
        
        // Update container
        container.innerHTML = contentHTML;

        // Initialize interactive elements
        this._initializeContentInteractions(contentData);

        console.log(`Content rendered for ${contentData.meta.id}`);
    }

    /**
     * Build HTML content from content data
     * @param {Object} contentData - Chapter content data
     * @returns {string} Complete HTML content
     * @private
     */
    _buildContentHTML(contentData) {
        const { meta, video, navigation, content } = contentData;

        // Build chapter navigation
        const chapterNav = this._buildChapterNavigation(navigation);
        
        // Build video section if present
        const videoSection = video.hasVideo ? this._buildVideoSection(video, meta) : '';
        
        // Build main content sections
        const mainContent = this._buildMainContent(content, meta);

        return `
            <div class="content-area">
                ${chapterNav}
                ${videoSection}
                ${mainContent}
            </div>
        `;
    }

    /**
     * Build chapter navigation HTML
     * @param {Object} navigation - Navigation data
     * @returns {string} Navigation HTML
     * @private
     */
    _buildChapterNavigation(navigation) {
        const { currentChapter, chapters, hasPrevious, hasNext, previousSection, nextSection } = navigation;

        const chapterItems = chapters.map(chapter => {
            const isActive = chapter === currentChapter;
            return `<div class="chapter-item ${isActive ? 'active' : ''}" data-chapter="${chapter}">${chapter}</div>`;
        }).join('');

        // Build navigation links with proper content
        const prevLink = previousSection ? 
            `<a href="#course/${previousSection.id}" class="nav-btn prev">
                <span class="left-page-navigation">
                    <i class="fas fa-chevron-left"></i>Previous
                </span>
            </a>` :
            `<button class="nav-btn prev" disabled>
                <span class="left-page-navigation">
                    <i class="fas fa-chevron-left"></i>Previous
                </span>
            </button>`;

        const nextLink = nextSection ? 
            `<a href="#course/${nextSection.id}" class="nav-btn next">
                <span class="right-page-navigation">
                    Next<i class="fas fa-chevron-right"></i>
                </span>
            </a>` :
            `<button class="nav-btn next" disabled>
                <span class="right-page-navigation">
                    Next<i class="fas fa-chevron-right"></i>
                </span>
            </button>`;

        return `
            <div class="progress-map">
                ${chapterItems}
            </div>
            <div class="pf-v5-l-flex pf-m-justify-content-space-between">
                ${prevLink}
                ${nextLink}
            </div>
        `;
    }

    /**
     * Build video classroom section HTML
     * @param {Object} video - Video configuration
     * @param {Object} meta - Section metadata
     * @returns {string} Video section HTML
     * @private
     */
    _buildVideoSection(video, meta) {
        return `
            <div class="video-classroom-section">
                <div class="video-header">
                    <h2>VIDEO CLASSROOM</h2>
                    <button class="video-expand-btn">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                </div>
                <div class="video-container">
                    <video 
                        class="course-video" 
                        ${video.controls ? 'controls' : ''}
                        ${video.autoplay ? 'autoplay' : ''}
                        ${video.videoPoster ? `poster="${video.videoPoster}"` : ''}
                        data-src="${video.videoPath}">
                        <source src="${video.videoPath}" type="${video.videoType}">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-overlay">
                        <div class="video-info">
                            <img src="asset/image/logo-hat.png" alt="Red Hat" class="video-logo">
                            <div class="video-text">
                                <h3>Red Hat</h3>
                                <p>Training and Certification</p>
                            </div>
                        </div>
                        <div class="play-button-large">
                            <i class="fas fa-play"></i>
                        </div>
                        <h4 class="video-title">${video.videoTitle}</h4>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Build main content section HTML
     * @param {Object} content - Content sections
     * @param {Object} meta - Section metadata
     * @returns {string} Main content HTML
     * @private
     */
    _buildMainContent(content, meta) {
        // Build all content sections dynamically
        const contentSections = Object.keys(content)
            .filter(key => key !== 'header') // Skip header section
            .map(key => this._buildContentSection(content[key]))
            .join('');

        return `
            <div class="section-content">
                <header class="content-header">
                    <h1>${content.header.title}</h1>
                    <div class="chapter-info">
                        <span class="chapter-number">${meta.section}</span>
                        <span class="estimated-time"><i class="fas fa-clock"></i> ${meta.duration}</span>
                    </div>
                </header>
                
                <div class="content-body">
                    ${contentSections}
                </div>
            </div>
        `;
    }

    /**
     * Build individual content section HTML
     * @param {Object} section - Content section data
     * @returns {string} Section HTML
     * @private
     */
    _buildContentSection(section) {
        if (!section || !section.title) return '';

        let contentHTML = '';

        if (section.type === 'list' && section.items) {
            contentHTML = `
                <ul>
                    ${section.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        } else if (section.content) {
            contentHTML = section.content;
        }

        return `
            <div class="content-section">
                <h2>${section.title}</h2>
                ${contentHTML}
            </div>
        `;
    }

    /**
     * Initialize interactive elements in the content
     * @param {Object} contentData - Chapter content data
     * @private
     */
    _initializeContentInteractions(contentData) {
        // Initialize video player if present
        if (contentData.video && contentData.video.hasVideo) {
            this._initializeVideoPlayer();
        }

        // Initialize chapter navigation
        this._initializeChapterNavigation(contentData.navigation);
    }

    /**
     * Initialize video player interactions
     * @private
     */
    _initializeVideoPlayer() {
        const playButton = document.querySelector('.play-button-large');
        const video = document.querySelector('.course-video');
        const overlay = document.querySelector('.video-overlay');

        if (playButton && video && overlay) {
            playButton.addEventListener('click', function() {
                overlay.style.display = 'none';
                video.play().catch(e => {
                    console.error('Error playing video:', e);
                    if (typeof window.showToast === 'function') {
                        window.showToast('Error loading video. Please check your connection.');
                    }
                });
            });

            video.addEventListener('pause', function() {
                overlay.style.display = 'flex';
            });

            video.addEventListener('ended', function() {
                overlay.style.display = 'flex';
            });
        }
    }

    /**
     * Initialize chapter navigation interactions
     * @param {Object} navigation - Navigation data
     * @private
     */
    _initializeChapterNavigation(navigation) {
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');

        if (prevBtn && !prevBtn.disabled) {
            prevBtn.addEventListener('click', () => {
                console.log('Navigate to previous section');
                // TODO: Implement navigation
            });
        }

        if (nextBtn && !nextBtn.disabled) {
            nextBtn.addEventListener('click', () => {
                console.log('Navigate to next section');
                // TODO: Implement navigation
            });
        }
    }

    /**
     * Get loading statistics
     * @returns {Object} Loading statistics
     */
    getStats() {
        return {
            registeredSections: this.contentRegistry.size,
            availableSections: Array.from(this.contentRegistry.keys())
        };
    }
}

// Initialize global simple chapter loader instance
let simpleChapterLoader = null;

/**
 * Initialize the simple chapter loader system
 */
function initializeSimpleChapterLoader() {
    simpleChapterLoader = new SimpleChapterLoader();
    simpleChapterLoader.init();
}

/**
 * Load and render a section by ID (synchronous)
 * @param {string} sectionId - Section identifier
 * @returns {Object} Content data that was rendered
 */
function loadAndRenderSectionSimple(sectionId) {
    if (!simpleChapterLoader) {
        initializeSimpleChapterLoader();
    }

    console.log('Simple loader - Loading section:', sectionId);
    
    const contentData = simpleChapterLoader.getContent(sectionId);
    if (!contentData) {
        throw new Error(`Content not found for section: ${sectionId}`);
    }

    simpleChapterLoader.renderContent(contentData);
    console.log('Simple loader - Content rendered for:', sectionId);
    
    return contentData;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSimpleChapterLoader);
} else {
    initializeSimpleChapterLoader();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleChapterLoader, initializeSimpleChapterLoader, loadAndRenderSectionSimple };
} else {
    window.SimpleChapterLoader = SimpleChapterLoader;
    window.initializeSimpleChapterLoader = initializeSimpleChapterLoader;
    window.loadAndRenderSectionSimple = loadAndRenderSectionSimple;
    window.simpleChapterLoader = simpleChapterLoader;
}