/**
 * Red Hat Academy RH124 - Chapter Content Loader
 * 
 * This module handles dynamic loading and rendering of chapter content
 * It provides a unified system for loading modular chapter content files
 */

class ChapterLoader {
    constructor() {
        this.loadedContent = new Map();
        this.loadingPromises = new Map();
        this.baseChapterPath = 'chapter/';
        this.initialized = false;
    }

    /**
     * Initialize the chapter loader
     */
    init() {
        this.initialized = true;
        console.log('Chapter Loader initialized successfully');
    }

    /**
     * Load chapter content by section ID
     * @param {string} sectionId - Section identifier (e.g., 'section-a-1')
     * @returns {Promise<Object>} Chapter content data
     */
    async loadChapterContent(sectionId) {
        // Check if already loaded
        if (this.loadedContent.has(sectionId)) {
            return this.loadedContent.get(sectionId);
        }

        // Check if currently loading
        if (this.loadingPromises.has(sectionId)) {
            return this.loadingPromises.get(sectionId);
        }

        // Start loading
        const loadingPromise = this._loadContentFile(sectionId);
        this.loadingPromises.set(sectionId, loadingPromise);

        try {
            const content = await loadingPromise;
            this.loadedContent.set(sectionId, content);
            this.loadingPromises.delete(sectionId);
            return content;
        } catch (error) {
            this.loadingPromises.delete(sectionId);
            throw error;
        }
    }

    /**
     * Load content file for a specific section
     * @param {string} sectionId - Section identifier
     * @returns {Promise<Object>} Content data
     * @private
     */
    async _loadContentFile(sectionId) {
        const contentPath = this._getContentPath(sectionId);
        
        try {
            // Load the script dynamically
            await this._loadScript(contentPath);
            
            // Get the content from the global variable
            const content = this._extractContentFromGlobal(sectionId);
            
            if (!content) {
                throw new Error(`Content not found for section: ${sectionId}`);
            }

            console.log(`Successfully loaded content for ${sectionId}`);
            return content;

        } catch (error) {
            console.error(`Failed to load chapter content for ${sectionId}:`, error);
            throw new Error(`Unable to load content for ${sectionId}: ${error.message}`);
        }
    }

    /**
     * Get the file path for a section's content
     * @param {string} sectionId - Section identifier
     * @returns {string} File path
     * @private
     */
    _getContentPath(sectionId) {
        // Map section IDs to their file paths
        const pathMap = {
            'section-a-1': 'intro/section-a-1.js',
            'section-a-2': 'intro/section-a-2.js', 
            'section-a-3': 'intro/section-a-3.js',
            // Add more mappings as needed
        };

        const relativePath = pathMap[sectionId];
        if (!relativePath) {
            throw new Error(`No content path mapped for section: ${sectionId}`);
        }

        return `${this.baseChapterPath}${relativePath}`;
    }

    /**
     * Dynamically load a JavaScript file
     * @param {string} scriptPath - Path to the script file
     * @returns {Promise} Promise that resolves when script is loaded
     * @private
     */
    _loadScript(scriptPath) {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = scriptPath;
            script.type = 'text/javascript';

            script.onload = () => {
                console.log(`Script loaded: ${scriptPath}`);
                resolve();
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${scriptPath}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Extract content from global variables set by loaded scripts
     * @param {string} sectionId - Section identifier
     * @returns {Object|null} Content data or null if not found
     * @private
     */
    _extractContentFromGlobal(sectionId) {
        // Map section IDs to their global variable names
        const globalMap = {
            'section-a-1': 'SECTION_A1_CONTENT',
            'section-a-2': 'SECTION_A2_CONTENT',
            'section-a-3': 'SECTION_A3_CONTENT',
            // Add more mappings as needed
        };

        const globalVarName = globalMap[sectionId];
        if (!globalVarName || !window[globalVarName]) {
            return null;
        }

        return window[globalVarName];
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
        const { currentChapter, chapters, hasPrevious, hasNext } = navigation;

        const chapterItems = chapters.map(chapter => {
            const isActive = chapter === currentChapter;
            return `<div class="chapter-item ${isActive ? 'active' : ''}" data-chapter="${chapter}">${chapter}</div>`;
        }).join('');

        return `
            <div class="chapter-navigation">
                <div class="progress-bar-container">
                    <div class="progress-chapters">
                        ${chapterItems}
                    </div>
                </div>
                <div class="chapter-nav-buttons">
                    <button class="nav-btn prev" ${!hasPrevious ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    <button class="nav-btn next" ${!hasNext ? 'disabled' : ''}>
                        Next <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
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
                    ${this._buildContentSection(content.introduction)}
                    ${this._buildContentSection(content.objectives)}
                    ${this._buildContentSection(content.audience)}
                    ${this._buildContentSection(content.prerequisites)}
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

        // Track analytics if enabled
        if (contentData.analytics && contentData.analytics.trackViews) {
            this._trackContentView(contentData);
        }
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
                // Handle previous navigation
                console.log('Navigate to previous section');
            });
        }

        if (nextBtn && !nextBtn.disabled) {
            nextBtn.addEventListener('click', () => {
                // Handle next navigation
                console.log('Navigate to next section');
            });
        }
    }

    /**
     * Track content view for analytics
     * @param {Object} contentData - Chapter content data
     * @private
     */
    _trackContentView(contentData) {
        const { meta, analytics } = contentData;
        
        console.log('Content view tracked:', {
            section: meta.id,
            title: meta.title,
            timestamp: new Date().toISOString()
        });

        // Add analytics integration here
        if (window.gtag) {
            gtag('event', 'content_view', {
                content_id: meta.id,
                content_title: meta.title,
                content_category: analytics.category
            });
        }
    }

    /**
     * Get loading statistics
     * @returns {Object} Loading statistics
     */
    getStats() {
        return {
            loadedSections: this.loadedContent.size,
            currentlyLoading: this.loadingPromises.size,
            loadedSectionIds: Array.from(this.loadedContent.keys())
        };
    }

    /**
     * Clear loaded content cache
     */
    clearCache() {
        this.loadedContent.clear();
        console.log('Chapter content cache cleared');
    }
}

// Initialize global chapter loader instance
let chapterLoader = null;

/**
 * Initialize the chapter loader system
 */
function initializeChapterLoader() {
    chapterLoader = new ChapterLoader();
    chapterLoader.init();
}

/**
 * Load and render a section by ID
 * @param {string} sectionId - Section identifier
 * @returns {Promise} Promise that resolves when content is loaded and rendered
 */
async function loadAndRenderSection(sectionId) {
    if (!chapterLoader) {
        initializeChapterLoader();
    }

    try {
        const contentData = await chapterLoader.loadChapterContent(sectionId);
        chapterLoader.renderContent(contentData);
        return contentData;
    } catch (error) {
        console.error('Failed to load and render section:', error);
        throw error;
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChapterLoader);
} else {
    initializeChapterLoader();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChapterLoader, initializeChapterLoader, loadAndRenderSection };
} else {
    window.ChapterLoader = ChapterLoader;
    window.initializeChapterLoader = initializeChapterLoader;
    window.loadAndRenderSection = loadAndRenderSection;
    window.chapterLoader = chapterLoader;
}