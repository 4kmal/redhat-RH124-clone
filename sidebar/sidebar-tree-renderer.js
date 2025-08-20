/**
 * Red Hat Academy RH124 - Dynamic Sidebar Tree Renderer
 * 
 * This module creates a collapsible tree navigation system for the course sidebar
 * Integrates with TOC data and provides context-aware navigation
 */

class SidebarTreeRenderer {
    constructor() {
        this.currentSection = 'section-a-1'; // Default to first section
        this.expandedChapters = new Set(['preface-a']); // Keep track of expanded chapters
        this.tocData = null;
        this.initialized = false;
    }

    /**
     * Initialize the sidebar tree renderer
     * @param {Object} tocData - Table of contents data
     * @param {string} currentSection - Current active section ID
     */
    init(tocData, currentSection = 'section-a-1') {
        this.tocData = tocData;
        this.currentSection = currentSection;
        
        // Auto-expand chapter containing current section
        this.autoExpandCurrentChapter();
        
        this.renderCourseInfo();
        this.renderNavigationTree();
        this.attachEventListeners();
        
        this.initialized = true;
        console.log('Sidebar Tree Renderer initialized successfully');
    }

    /**
     * Auto-expand the chapter containing the current section
     */
    autoExpandCurrentChapter() {
        if (!this.tocData) return;
        
        for (const chapter of this.tocData.chapters) {
            const hasCurrentSection = chapter.sections.some(section => section.id === this.currentSection);
            if (hasCurrentSection) {
                this.expandedChapters.add(chapter.id);
                break;
            }
        }
    }

    /**
     * Render the course info header
     */
    renderCourseInfo() {
        const courseInfoContainer = document.getElementById('courseInfo');
        if (!courseInfoContainer || !this.tocData) return;

        // Calculate progress based on sections with content
        const totalSections = this.getTotalSectionsCount();
        const completedSections = this.getCompletedSectionsCount();
        const progressPercentage = Math.round((completedSections / totalSections) * 100);

        // Get current chapter and section info
        const currentChapterInfo = this.getCurrentChapterInfo();

        courseInfoContainer.innerHTML = `
            <h2>${this.tocData.courseInfo.courseCode} - ${currentChapterInfo.chapterTitle}</h2>
            <div class="current-location">
                <div class="location-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="current-chapter">${currentChapterInfo.chapterTitle}</span>
                </div>
                <div class="location-info">
                    <i class="fas fa-play-circle"></i>
                    <span class="current-section">${currentChapterInfo.sectionTitle}</span>
                </div>
            </div>
            <div class="progress-overview">
                <ul id="progress-map-container" class="progress-map"></ul>
                <span class="progress-text">${progressPercentage}% Complete</span>
            </div>
        `;

        // Initialize progress map
        this.initializeProgressMap();
    }

    /**
     * Get current chapter and section information
     */
    getCurrentChapterInfo() {
        if (!this.tocData) return { chapterTitle: 'Loading...', sectionTitle: 'Loading...' };

        for (const chapter of this.tocData.chapters) {
            const currentSection = chapter.sections.find(section => section.id === this.currentSection);
            if (currentSection) {
                return {
                    chapterTitle: chapter.title,
                    sectionTitle: currentSection.title,
                    chapter: chapter
                };
            }
        }

        // Fallback
        return {
            chapterTitle: this.tocData.chapters[0]?.title || 'Course Content',
            sectionTitle: 'Select a section',
            chapter: this.tocData.chapters[0]
        };
    }

    /**
     * Render the collapsible navigation tree
     */
    renderNavigationTree() {
        const sidebarNavContainer = document.getElementById('sidebarNav');
        if (!sidebarNavContainer || !this.tocData) return;

        const treeHTML = this.tocData.chapters.map(chapter => this.renderChapterNode(chapter)).join('');
        
        sidebarNavContainer.innerHTML = `
            <div class="nav-section">
                <h3>
                    <i class="fas fa-sitemap"></i>
                    Course Navigation
                </h3>
                <div class="nav-tree">
                    ${treeHTML}
                </div>
            </div>
        `;
    }

    /**
     * Render a single chapter node with its sections
     */
    renderChapterNode(chapter) {
        const isExpanded = this.expandedChapters.has(chapter.id);
        const hasCurrentSection = chapter.sections.some(section => section.id === this.currentSection);
        const chapterProgress = this.getChapterProgress(chapter);
        
        const sectionsHTML = chapter.sections.map(section => this.renderSectionNode(section, chapter)).join('');
        
        return `
            <div class="nav-chapter ${hasCurrentSection ? 'current-chapter' : ''}" data-chapter-id="${chapter.id}">
                <div class="chapter-header" data-chapter-id="${chapter.id}">
                    <div class="chapter-toggle">
                        <i class="fas fa-chevron-${isExpanded ? 'down' : 'right'} chapter-arrow"></i>
                        <i class="fas fa-${chapter.type === 'preface' ? 'info-circle' : 'book'} chapter-icon"></i>
                    </div>
                    <div class="chapter-content">
                        <span class="chapter-title">${chapter.title}</span>
                        <div class="chapter-meta">
                            <span class="section-count">${chapter.sections.length} sections</span>
                            <span class="chapter-progress">${chapterProgress.completed}/${chapterProgress.total}</span>
                        </div>
                    </div>
                    <div class="chapter-status">
                        ${this.getChapterStatusIcon(chapter)}
                    </div>
                </div>
                <div class="chapter-sections ${isExpanded ? 'expanded' : 'collapsed'}">
                    ${sectionsHTML}
                </div>
            </div>
        `;
    }

    /**
     * Render a single section node
     */
    renderSectionNode(section, chapter) {
        const isCurrentSection = section.id === this.currentSection;
        const sectionStatus = this.getSectionStatus(section);
        
        // Create either a link or a div based on content availability
        if (section.hasContent) {
            return `
                <a href="#course/${section.id}" 
                   class="nav-section-item ${isCurrentSection ? 'current-section' : ''} ${sectionStatus}" 
                   data-section-id="${section.id}"
                   data-chapter-id="${chapter.id}">
                    <div class="section-content">
                        <div class="section-icon">
                            ${this.getSectionStatusIcon(section, sectionStatus)}
                        </div>
                        <div class="section-info">
                            <span class="section-title">${section.title}</span>
                            <div class="section-meta">
                                <span class="section-duration">
                                    <i class="fas fa-clock"></i>
                                    ${section.duration}
                                </span>
                                ${section.hasVideo ? '<i class="fas fa-video section-video-icon" title="Has video"></i>' : ''}
                            </div>
                        </div>
                    </div>
                </a>
            `;
        } else {
            return `
                <div class="nav-section-item ${isCurrentSection ? 'current-section' : ''} ${sectionStatus}" 
                     data-section-id="${section.id}"
                     data-chapter-id="${chapter.id}">
                    <div class="section-content">
                        <div class="section-icon">
                            ${this.getSectionStatusIcon(section, sectionStatus)}
                        </div>
                        <div class="section-info">
                            <span class="section-title">${section.title}</span>
                            <div class="section-meta">
                                <span class="section-duration">
                                    <i class="fas fa-clock"></i>
                                    ${section.duration}
                                </span>
                                ${section.hasVideo ? '<i class="fas fa-video section-video-icon" title="Has video"></i>' : ''}
                                <span class="coming-soon">Coming Soon</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Get chapter progress (completed/total sections)
     */
    getChapterProgress(chapter) {
        const totalSections = chapter.sections.length;
        const completedSections = chapter.sections.filter(section => 
            this.getSectionStatus(section) === 'completed'
        ).length;
        
        return { completed: completedSections, total: totalSections };
    }

    /**
     * Get section status (completed, current, pending)
     */
    getSectionStatus(section) {
        if (section.id === this.currentSection) {
            return 'current';
        }
        
        // Simple logic: sections before current are completed if they have content
        const currentSectionIndex = this.getCurrentSectionIndex();
        const sectionIndex = this.getSectionIndex(section.id);
        
        if (sectionIndex < currentSectionIndex && section.hasContent) {
            return 'completed';
        }
        
        return 'pending';
    }

    /**
     * Get section status icon
     */
    getSectionStatusIcon(section, status) {
        switch (status) {
            case 'completed':
                return '<i class="fas fa-check-circle"></i>';
            case 'current':
                return '<i class="fas fa-play-circle"></i>';
            case 'pending':
            default:
                return section.hasContent ? '<i class="far fa-circle"></i>' : '<i class="fas fa-lock"></i>';
        }
    }

    /**
     * Get chapter status icon
     */
    getChapterStatusIcon(chapter) {
        const progress = this.getChapterProgress(chapter);
        const hasCurrentSection = chapter.sections.some(section => section.id === this.currentSection);
        
        if (hasCurrentSection) {
            return '<i class="fas fa-play-circle current-icon"></i>';
        } else if (progress.completed === progress.total && progress.total > 0) {
            return '<i class="fas fa-check-circle completed-icon"></i>';
        } else if (progress.completed > 0) {
            return '<i class="fas fa-clock in-progress-icon"></i>';
        } else {
            return '<i class="far fa-circle pending-icon"></i>';
        }
    }

    /**
     * Initialize progress map visualization
     */
    initializeProgressMap() {
        const progressMapContainer = document.getElementById('progress-map-container');
        if (!progressMapContainer || !this.tocData) return;

        // Create simplified progress indicators for main chapters
        const mainChapters = this.tocData.chapters.filter(chapter => chapter.type === 'chapter');
        const prefaceChapters = this.tocData.chapters.filter(chapter => chapter.type === 'preface');
        
        let progressHTML = '';
        
        // Add preface indicator
        if (prefaceChapters.length > 0) {
            const prefaceStatus = prefaceChapters.some(chapter => 
                chapter.sections.some(section => section.id === this.currentSection)
            ) ? 'active' : 'completed';
            
            progressHTML += `<li class="progress-map-bar preface ${prefaceStatus}" data-chapter="P" title="Preface">P</li>`;
        }
        
        // Add chapter indicators
        mainChapters.forEach((chapter, index) => {
            const chapterNumber = index + 1;
            const hasCurrentSection = chapter.sections.some(section => section.id === this.currentSection);
            const progress = this.getChapterProgress(chapter);
            
            let status = 'pending';
            if (hasCurrentSection) {
                status = 'active';
            } else if (progress.completed === progress.total && progress.total > 0) {
                status = 'completed';
            } else if (progress.completed > 0) {
                status = 'in-progress';
            }
            
            progressHTML += `<li class="progress-map-bar chapter ${status}" data-chapter="${chapterNumber}" title="${chapter.title}">${chapterNumber}</li>`;
        });
        
        progressMapContainer.innerHTML = progressHTML;
    }

    /**
     * Attach event listeners for tree functionality
     */
    attachEventListeners() {
        // Chapter toggle functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.chapter-header')) {
                const chapterHeader = e.target.closest('.chapter-header');
                const chapterId = chapterHeader.dataset.chapterId;
                this.toggleChapter(chapterId);
            }
        });

        // Section click functionality - handle both links and divs
        document.addEventListener('click', (e) => {
            const sectionItem = e.target.closest('.nav-section-item');
            if (sectionItem) {
                // If it's a link with href, let the URL routing handle it
                if (sectionItem.tagName === 'A' && sectionItem.href && sectionItem.href.includes('#course/')) {
                    // Don't prevent default - let the hash change happen
                    return;
                }
                
                // For non-link items (coming soon sections)
                e.preventDefault();
                const sectionId = sectionItem.dataset.sectionId;
                this.navigateToSection(sectionId);
            }
        });
    }

    /**
     * Toggle chapter expanded/collapsed state
     */
    toggleChapter(chapterId) {
        const chapterElement = document.querySelector(`[data-chapter-id="${chapterId}"]`);
        const sectionsElement = chapterElement?.querySelector('.chapter-sections');
        const arrowElement = chapterElement?.querySelector('.chapter-arrow');
        
        if (this.expandedChapters.has(chapterId)) {
            this.expandedChapters.delete(chapterId);
            sectionsElement?.classList.remove('expanded');
            sectionsElement?.classList.add('collapsed');
            arrowElement?.classList.remove('fa-chevron-down');
            arrowElement?.classList.add('fa-chevron-right');
        } else {
            this.expandedChapters.add(chapterId);
            sectionsElement?.classList.remove('collapsed');
            sectionsElement?.classList.add('expanded');
            arrowElement?.classList.remove('fa-chevron-right');
            arrowElement?.classList.add('fa-chevron-down');
        }
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(sectionId) {
        if (!this.tocData) return;
        
        // Find section data
        const sectionData = this.findSectionData(sectionId);
        if (!sectionData || !sectionData.hasContent) {
            if (typeof window.showToast === 'function') {
                window.showToast('This section is not yet available.');
            }
            return;
        }

        // Update current section
        this.setCurrentSection(sectionId);
        
        // Load section content
        if (typeof window.loadSectionContent === 'function') {
            window.loadSectionContent(sectionId);
        }
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 767) {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.querySelector('.mobile-backdrop');
            if (sidebar && sidebar.classList.contains('mobile-visible')) {
                sidebar.classList.remove('mobile-visible');
                if (backdrop) {
                    backdrop.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }
        
        console.log('Navigated to section:', sectionId);
    }

    /**
     * Set current section and update UI
     */
    setCurrentSection(sectionId) {
        this.currentSection = sectionId;
        this.autoExpandCurrentChapter();
        this.renderCourseInfo();
        this.renderNavigationTree();
    }

    /**
     * Find section data by ID
     */
    findSectionData(sectionId) {
        if (!this.tocData) return null;
        
        for (const chapter of this.tocData.chapters) {
            const section = chapter.sections.find(s => s.id === sectionId);
            if (section) {
                return { ...section, chapter };
            }
        }
        return null;
    }

    /**
     * Get current section index (for progress calculation)
     */
    getCurrentSectionIndex() {
        return this.getSectionIndex(this.currentSection);
    }

    /**
     * Get section index by ID
     */
    getSectionIndex(sectionId) {
        if (!this.tocData) return 0;
        
        let index = 0;
        for (const chapter of this.tocData.chapters) {
            for (const section of chapter.sections) {
                if (section.id === sectionId) {
                    return index;
                }
                index++;
            }
        }
        return 0;
    }

    /**
     * Get total sections count
     */
    getTotalSectionsCount() {
        if (!this.tocData) return 0;
        return this.tocData.chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
    }

    /**
     * Get completed sections count
     */
    getCompletedSectionsCount() {
        if (!this.tocData) return 0;
        
        const currentIndex = this.getCurrentSectionIndex();
        let completedCount = 0;
        let index = 0;
        
        for (const chapter of this.tocData.chapters) {
            for (const section of chapter.sections) {
                if (index < currentIndex && section.hasContent) {
                    completedCount++;
                }
                index++;
            }
        }
        
        return completedCount;
    }

    /**
     * Get statistics about the sidebar tree
     */
    getStats() {
        if (!this.tocData) return null;

        return {
            totalChapters: this.tocData.chapters.length,
            totalSections: this.getTotalSectionsCount(),
            currentSection: this.currentSection,
            expandedChapters: Array.from(this.expandedChapters),
            completedSections: this.getCompletedSectionsCount()
        };
    }
}

// Initialize global sidebar tree renderer instance
let sidebarTreeRenderer = null;

/**
 * Initialize the sidebar tree system
 */
function initializeSidebarTree(currentSection = 'section-a-1') {
    console.log('=== INITIALIZING SIDEBAR TREE ===');
    
    if (typeof window.TOC_DATA === 'undefined') {
        console.error('TOC_DATA not loaded. Make sure toc-data.js is included first.');
        return;
    }

    if (sidebarTreeRenderer) {
        console.log('Sidebar Tree Renderer already exists, re-initializing...');
    }

    sidebarTreeRenderer = new SidebarTreeRenderer();
    sidebarTreeRenderer.init(window.TOC_DATA, currentSection);
    
    console.log('Sidebar Tree initialization complete');
}

/**
 * Update current section in sidebar
 */
function updateSidebarCurrentSection(sectionId) {
    if (sidebarTreeRenderer) {
        sidebarTreeRenderer.setCurrentSection(sectionId);
    }
}

// Auto-initialize if DOM is ready and data is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeSidebarTree());
} else {
    // DOM is already loaded
    if (typeof window.TOC_DATA !== 'undefined') {
        initializeSidebarTree();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SidebarTreeRenderer, initializeSidebarTree, updateSidebarCurrentSection };
} else {
    window.SidebarTreeRenderer = SidebarTreeRenderer;
    window.initializeSidebarTree = initializeSidebarTree;
    window.updateSidebarCurrentSection = updateSidebarCurrentSection;
    window.sidebarTreeRenderer = sidebarTreeRenderer;
}