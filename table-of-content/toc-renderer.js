/**
 * Red Hat Academy RH124 - Table of Contents Renderer
 * 
 * This module handles the rendering and functionality of the course table of contents
 * It creates the HTML structure from the TOC data and manages user interactions
 */

class TOCRenderer {
    constructor(containerId = 'table-of-contents') {
        this.containerId = containerId;
        this.tocData = null;
        this.initialized = false;
    }

    /**
     * Initialize the TOC renderer with data
     * @param {Object} data - TOC data structure
     */
    init(data) {
        this.tocData = data;
        this.render();
        this.attachEventListeners();
        this.initialized = true;
        console.log('TOC Renderer initialized successfully');
    }

    /**
     * Render the complete table of contents
     */
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`TOC container with ID '${this.containerId}' not found`);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Create TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';

        // Render all chapters
        this.tocData.chapters.forEach(chapter => {
            const chapterElement = this.renderChapter(chapter);
            tocContainer.appendChild(chapterElement);
        });

        // Add to main container
        container.appendChild(tocContainer);
    }

    /**
     * Render a single chapter with its sections
     * @param {Object} chapter - Chapter data
     * @returns {HTMLElement} Chapter DOM element
     */
    renderChapter(chapter) {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'toc-chapter';
        chapterDiv.setAttribute('data-chapter-id', chapter.id);

        // Chapter title
        const titleElement = document.createElement('h3');
        titleElement.className = 'toc-chapter-title';
        titleElement.textContent = chapter.title;
        chapterDiv.appendChild(titleElement);

        // Sections list
        if (chapter.sections && chapter.sections.length > 0) {
            const sectionsList = document.createElement('ul');
            sectionsList.className = 'toc-list';

            chapter.sections.forEach(section => {
                const sectionItem = this.renderSection(section);
                sectionsList.appendChild(sectionItem);
            });

            chapterDiv.appendChild(sectionsList);
        }

        return chapterDiv;
    }

    /**
     * Render a single section
     * @param {Object} section - Section data
     * @returns {HTMLElement} Section DOM element
     */
    renderSection(section) {
        const listItem = document.createElement('li');
        
        const link = document.createElement('a');
        // Use proper href with section ID for better navigation and SEO
        link.href = section.hasContent ? `#course/${section.id}` : '#';
        link.className = 'toc-link';
        link.textContent = section.title;
        
        // Add data attributes for functionality
        if (section.hasContent) {
            link.setAttribute('data-section', section.id);
        }
        
        link.setAttribute('data-section-id', section.id);
        link.setAttribute('data-duration', section.duration);
        
        // Add visual indicators for content type
        if (section.hasVideo) {
            const videoIcon = document.createElement('i');
            videoIcon.className = 'fas fa-video toc-video-icon';
            videoIcon.title = 'Contains video content';
            link.appendChild(videoIcon);
        }
        
        if (!section.hasContent && !section.hasVideo) {
            link.classList.add('toc-link-disabled');
            link.title = 'Content coming soon';
        }

        listItem.appendChild(link);
        return listItem;
    }

    /**
     * Attach event listeners to TOC elements
     */
    attachEventListeners() {
        const tocLinks = document.querySelectorAll('.toc-link');
        console.log(`Attaching event listeners to ${tocLinks.length} TOC links`);
        
        tocLinks.forEach((link, index) => {
            console.log(`Attaching listener to link ${index}:`, link.textContent.substring(0, 30));
            link.addEventListener('click', this.handleSectionClick.bind(this));
            
            // Add visual debugging - change cursor to indicate clickable
            link.style.cursor = 'pointer';
        });

        // Add chapter collapse/expand functionality
        const chapterTitles = document.querySelectorAll('.toc-chapter-title');
        chapterTitles.forEach(title => {
            title.addEventListener('click', this.handleChapterToggle.bind(this));
        });
        
        console.log('All TOC event listeners attached successfully');
    }

    /**
     * Handle section link clicks
     * @param {Event} event - Click event
     */
    handleSectionClick(event) {
        console.log('=== CLICK HANDLER CALLED ===');
        
        // Prevent default navigation behavior
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Event prevented and stopped');
        
        const link = event.currentTarget;
        const sectionId = link.getAttribute('data-section');
        const sectionIdFromDataset = link.getAttribute('data-section-id');
        
        console.log('=== TOC CLICK DEBUG ===');
        console.log('Link clicked:', link);
        console.log('data-section:', sectionId);
        console.log('data-section-id:', sectionIdFromDataset);
        console.log('All attributes:', Array.from(link.attributes).map(attr => `${attr.name}="${attr.value}"`));
        
        // Remove active class from all links
        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');

        // Use sectionId if available, otherwise fall back to sectionIdFromDataset
        const actualSectionId = sectionId || sectionIdFromDataset;
        
        if (actualSectionId) {
            // Check if section has content using TOC data
            const sectionData = this.getSectionData(actualSectionId);
            console.log('TOC Click - Actual Section ID:', actualSectionId, 'Section Data:', sectionData);
            
            if (sectionData && sectionData.hasContent) {
                console.log('Section has content, loading...');
                
                // Switch to Course tab
                const courseTab = document.querySelector('[data-tab="course"]');
                if (courseTab) {
                    console.log('Switching to Course tab...');
                    courseTab.click();
                }
                
                // Load section content using new chapter loader system
                if (typeof window.loadSectionContent === 'function') {
                    console.log('Calling loadSectionContent for:', actualSectionId);
                    window.loadSectionContent(actualSectionId);
                } else {
                    console.warn('loadSectionContent function not available');
                }
            } else {
                console.log('Section has no content or not found. SectionData:', sectionData);
                // Show coming soon message
                this.showComingSoonMessage(link.textContent);
            }
        } else {
            console.log('No section ID found in either data-section or data-section-id');
            // Section has no content yet
            this.showComingSoonMessage(link.textContent);
        }

        // Track section selection for analytics
        this.trackSectionSelection(actualSectionId, link.textContent);
    }

    /**
     * Handle chapter title clicks for collapse/expand
     * @param {Event} event - Click event
     */
    handleChapterToggle(event) {
        const chapterTitle = event.currentTarget;
        const chapter = chapterTitle.parentElement;
        const sectionsList = chapter.querySelector('.toc-list');
        
        if (sectionsList) {
            const isCollapsed = sectionsList.style.display === 'none';
            sectionsList.style.display = isCollapsed ? 'block' : 'none';
            
            // Toggle expand/collapse icon
            const hasIcon = chapterTitle.querySelector('.fa-chevron-down, .fa-chevron-right');
            if (!hasIcon) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-chevron-down chapter-toggle-icon';
                chapterTitle.appendChild(icon);
            } else {
                hasIcon.className = isCollapsed ? 
                    'fas fa-chevron-down chapter-toggle-icon' : 
                    'fas fa-chevron-right chapter-toggle-icon';
            }
        }
    }

    /**
     * Show coming soon message for sections without content
     * @param {string} sectionTitle - Title of the section
     */
    showComingSoonMessage(sectionTitle) {
        // Use existing toast function if available, otherwise create simple alert
        if (typeof window.showToast === 'function') {
            window.showToast(`${sectionTitle} - Content coming soon!`);
        } else {
            alert(`${sectionTitle}\n\nContent coming soon!`);
        }
    }

    /**
     * Track section selection for analytics
     * @param {string} sectionId - Section identifier
     * @param {string} sectionTitle - Section title
     */
    trackSectionSelection(sectionId, sectionTitle) {
        // Log for debugging
        console.log('Section selected:', { id: sectionId, title: sectionTitle });
        
        // Add analytics tracking here if needed
        if (window.gtag) {
            gtag('event', 'toc_section_click', {
                section_id: sectionId,
                section_title: sectionTitle
            });
        }
    }

    /**
     * Get section data by ID
     * @param {string} sectionId - Section identifier
     * @returns {Object|null} Section data or null if not found
     */
    getSectionData(sectionId) {
        if (!this.tocData) return null;
        
        for (const chapter of this.tocData.chapters) {
            const section = chapter.sections.find(s => s.id === sectionId);
            if (section) {
                return { ...section, chapterTitle: chapter.title };
            }
        }
        return null;
    }

    /**
     * Highlight active section in TOC
     * @param {string} sectionId - Section to highlight
     */
    setActiveSection(sectionId) {
        // Remove all active classes
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to specified section
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Ensure parent chapter is expanded
            const parentChapter = activeLink.closest('.toc-chapter');
            if (parentChapter) {
                const sectionsList = parentChapter.querySelector('.toc-list');
                if (sectionsList) {
                    sectionsList.style.display = 'block';
                }
            }

            // Scroll into view if needed
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Filter TOC by search term
     * @param {string} searchTerm - Term to search for
     */
    filterTOC(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const chapters = document.querySelectorAll('.toc-chapter');

        chapters.forEach(chapter => {
            const chapterTitle = chapter.querySelector('.toc-chapter-title').textContent.toLowerCase();
            const sections = chapter.querySelectorAll('.toc-link');
            let hasVisibleSections = false;

            sections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                const isMatch = sectionText.includes(searchLower);
                
                section.parentElement.style.display = isMatch ? 'block' : 'none';
                if (isMatch) hasVisibleSections = true;
            });

            // Show/hide chapter based on matches
            const isChapterMatch = chapterTitle.includes(searchLower);
            chapter.style.display = (hasVisibleSections || isChapterMatch) ? 'block' : 'none';
        });
    }

    /**
     * Clear search filter and show all content
     */
    clearFilter() {
        const elements = document.querySelectorAll('.toc-chapter, .toc-chapter li');
        elements.forEach(element => {
            element.style.display = 'block';
        });
    }

    /**
     * Get TOC statistics
     * @returns {Object} Statistics about the TOC
     */
    getStats() {
        if (!this.tocData) return null;

        const stats = {
            totalChapters: this.tocData.chapters.length,
            totalSections: 0,
            sectionsWithContent: 0,
            sectionsWithVideo: 0
        };

        this.tocData.chapters.forEach(chapter => {
            stats.totalSections += chapter.sections.length;
            chapter.sections.forEach(section => {
                if (section.hasContent) stats.sectionsWithContent++;
                if (section.hasVideo) stats.sectionsWithVideo++;
            });
        });

        return stats;
    }
}

// Initialize global TOC renderer instance
let tocRenderer = null;

/**
 * Initialize the TOC system
 * Call this function after both TOC data and DOM are loaded
 */
function initializeTOC() {
    console.log('=== INITIALIZING TOC ===');
    
    if (typeof window.TOC_DATA === 'undefined') {
        console.error('TOC_DATA not loaded. Make sure toc-data.js is included first.');
        return;
    }

    if (tocRenderer) {
        console.log('TOC Renderer already exists, re-initializing...');
    }

    tocRenderer = new TOCRenderer();
    tocRenderer.init(window.TOC_DATA);
    
    console.log('TOC initialization complete');
    
    // Debug: Verify links are set up correctly
    setTimeout(() => {
        const links = document.querySelectorAll('.toc-link');
        console.log('=== TOC LINK VERIFICATION ===');
        console.log(`Found ${links.length} TOC links`);
        links.forEach((link, index) => {
            const hasDataSection = link.hasAttribute('data-section');
            const hasDataSectionId = link.hasAttribute('data-section-id');
            const hasClickListener = link.onclick !== null || link.addEventListener !== null;
            console.log(`Link ${index}: "${link.textContent.substring(0, 30)}" - data-section: ${hasDataSection}, data-section-id: ${hasDataSectionId}`);
        });
    }, 100);
}

// Auto-initialize if DOM is ready and data is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTOC);
} else {
    // DOM is already loaded
    if (typeof window.TOC_DATA !== 'undefined') {
        initializeTOC();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOCRenderer, initializeTOC };
} else {
    window.TOCRenderer = TOCRenderer;
    window.initializeTOC = initializeTOC;
    window.tocRenderer = tocRenderer;
}