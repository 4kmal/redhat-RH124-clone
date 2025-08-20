document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProgressTracking();
    initializeProgressMap();
    initializeVideoClassroom();
    initializeContentFeatures();
    initializeTabs();
    // TOC is now initialized by toc-renderer.js
});

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const nextBtn = document.querySelector('.nav-btn.next');
    const prevBtn = document.querySelector('.nav-btn.prev');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (!item.classList.contains('current')) {
                navigateToModule(index);
            }
        });
    });
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const currentIndex = Array.from(navItems).findIndex(item => 
                item.classList.contains('current')
            );
            if (currentIndex < navItems.length - 1) {
                navigateToModule(currentIndex + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const currentIndex = Array.from(navItems).findIndex(item => 
                item.classList.contains('current')
            );
            if (currentIndex > 0) {
                navigateToModule(currentIndex - 1);
            }
        });
    }
}

function navigateToModule(index) {
    const navItems = document.querySelectorAll('.nav-item');
    const moduleContent = getModuleContent(index);
    
    navItems.forEach(item => item.classList.remove('current'));
    navItems[index].classList.add('current');
    
    updateContent(moduleContent);
    updateNavigationButtons(index, navItems.length);
    updateBreadcrumb(moduleContent.title, index + 1);
    updateProgressMap(index);
    
    const progressPercentage = Math.round(((index + 1) / navItems.length) * 100);
    updateProgress(progressPercentage);
}

function updateContent(content) {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <header class="content-header">
            <h1>${content.title}</h1>
            <div class="chapter-info">
                <span class="chapter-number">Chapter ${content.chapter}</span>
                <span class="estimated-time"><i class="fas fa-clock"></i> ${content.duration}</span>
            </div>
        </header>
        
        <section class="content-body">
            ${content.learningObjectives ? `
                <div class="learning-objectives">
                    <h3>Learning Objectives</h3>
                    <ul>
                        ${content.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${content.sections.map(section => `
                <div class="content-section">
                    <h2>${section.title}</h2>
                    ${section.content}
                    ${section.infoBox ? `
                        <div class="info-box">
                            <i class="fas fa-info-circle"></i>
                            <div class="info-content">
                                <strong>Note:</strong> ${section.infoBox}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
            
            ${content.exercise ? `
                <div class="lab-exercise">
                    <h3><i class="fas fa-laptop-code"></i> ${content.exercise.title}</h3>
                    <div class="exercise-steps">
                        ${content.exercise.steps.map((step, index) => `
                            <div class="step">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-content">
                                    <p>${step.description}</p>
                                    ${step.code ? `<div class="code-block"><code>${step.code}</code></div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </section>
    `;
}

function updateNavigationButtons(currentIndex, totalItems) {
    const nextBtn = document.querySelector('.nav-btn.next');
    const prevBtn = document.querySelector('.nav-btn.prev');
    
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentIndex === totalItems - 1;
    }
}

function updateBreadcrumb(title, chapterNumber) {
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `
        <span>RH124</span> > 
        <span>Chapter ${chapterNumber}</span> > 
        <span class="current">${title}</span>
    `;
}

function updateProgress(percentage) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '% Complete';
}

function initializeProgressTracking() {
    const currentIndex = Array.from(document.querySelectorAll('.nav-item'))
        .findIndex(item => item.classList.contains('current'));
    const totalItems = document.querySelectorAll('.nav-item').length;
    const progressPercentage = Math.round(((currentIndex + 1) / totalItems) * 100);
    
    updateProgress(progressPercentage);
}

function initializeProgressMap() {
    const progressMapContainer = document.getElementById('progress-map-container');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Official Red Hat RH124 course structure matching the screenshot
    const courseChapters = [
        { id: 'P', title: 'Course Introduction', className: 'preface' },
        { id: '1', title: 'Introduction to Red Hat Enterprise Linux', className: 'chapter' },
        { id: '2', title: 'Accessing the Command Line', className: 'chapter' },
        { id: '3', title: 'Managing Files from the Command Line', className: 'chapter' },
        { id: '4', title: 'Getting Help in Red Hat Enterprise Linux', className: 'chapter' },
        { id: '5', title: 'Creating, Viewing, and Editing Text Files', className: 'chapter' },
        { id: '6', title: 'Managing Local Users and Groups', className: 'chapter' },
        { id: '7', title: 'Controlling Access to Files', className: 'chapter' },
        { id: '8', title: 'Monitoring and Managing Processes', className: 'chapter' },
        { id: '9', title: 'Controlling Services and Daemons', className: 'chapter' },
        { id: '10', title: 'Configuring and Securing SSH', className: 'chapter' },
        { id: '11', title: 'Analyzing and Storing Logs', className: 'chapter' },
        { id: '12', title: 'Managing Networking', className: 'chapter' },
        { id: '13', title: 'Archiving and Transferring Files', className: 'chapter' },
        { id: '14', title: 'Installing and Updating Software', className: 'chapter' },
        { id: '15', title: 'Accessing Linux File Systems', className: 'chapter' }
    ];
    
    courseChapters.forEach((chapter, index) => {
        const barItem = document.createElement('li');
        barItem.className = `progress-map-bar ${chapter.className}`;
        barItem.textContent = chapter.id;
        barItem.dataset.index = index;
        barItem.dataset.tooltip = chapter.title;
        
        // Set initial state - P is active as shown in screenshot
        if (index === 0) {
            barItem.classList.add('is-active', 'visited');
        }
        
        progressMapContainer.appendChild(barItem);
    });
    
    progressMapContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('progress-map-bar')) {
            const chapterIndex = parseInt(event.target.dataset.index, 10);
            
            // Map progress bar index to course module index
            let moduleIndex = chapterIndex;
            if (chapterIndex === 0) {
                // P = Preface, show introduction module
                moduleIndex = 0;
            } else {
                // 1-15 map to modules 0-14 (since we have 17 modules total but only showing 16 in progress bar)
                moduleIndex = Math.min(chapterIndex - 1, navItems.length - 1);
            }
            
            navigateToModule(moduleIndex);
            updateProgressMap(chapterIndex);
        }
    });
}

function updateProgressMap(activeIndex) {
    const allBars = document.querySelectorAll('.progress-map-bar');
    allBars.forEach((bar, index) => {
        bar.classList.remove('is-active');
        if (index <= activeIndex) {
            bar.classList.add('visited');
        }
        if (index === activeIndex) {
            bar.classList.add('is-active');
        }
    });
}

function initializeVideoClassroom() {
    const playButton = document.querySelector('.play-button-large');
    const video = document.querySelector('.video-container video');
    const overlay = document.querySelector('.video-overlay');
    
    if (playButton && video && overlay) {
        playButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            video.play();
        });
        
        video.addEventListener('pause', function() {
            overlay.style.display = 'flex';
        });
        
        video.addEventListener('ended', function() {
            overlay.style.display = 'flex';
        });
        
        // Hide overlay when video starts playing
        video.addEventListener('play', function() {
            overlay.style.display = 'none';
        });
    }
}

function initializeContentFeatures() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const code = block.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    showToast('Code copied to clipboard!');
                });
            }
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, '#' + targetTab);
            } else {
                location.hash = '#' + targetTab;
            }
        });
    });
    
    // Handle initial tab from URL hash
    const hash = window.location.hash.substr(1);
    if (hash) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substr(1);
        if (hash) {
            const targetButton = document.querySelector(`[data-tab="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        } else {
            // Default to first tab
            const firstTab = document.querySelector('.tab-btn');
            if (firstTab) {
                firstTab.click();
            }
        }
    });
}

// initializeTOCLinks function removed - now handled by toc-renderer.js

// Make loadSectionContent globally available for TOC renderer
window.loadSectionContent = async function loadSectionContent(sectionId) {
    try {
        // Use the new modular chapter loader system
        if (typeof window.loadAndRenderSection === 'function') {
            await window.loadAndRenderSection(sectionId);
            console.log(`Successfully loaded section: ${sectionId}`);
        } else {
            // Fallback to old system if new loader isn't available
            console.warn('Chapter loader not available, using fallback');
            loadSectionContentFallback(sectionId);
        }
    } catch (error) {
        console.error('Failed to load section content:', error);
        
        // Show error message to user
        const courseTabContent = document.getElementById('course');
        if (courseTabContent) {
            courseTabContent.innerHTML = `
                <div class="content-area">
                    <div class="error-message">
                        <h2>Content Loading Error</h2>
                        <p>Unable to load content for ${sectionId}. Please try again later.</p>
                        <button onclick="window.location.reload()" class="retry-btn">
                            <i class="fas fa-refresh"></i> Retry
                        </button>
                    </div>
                </div>
            `;
        }
        
        if (typeof window.showToast === 'function') {
            window.showToast('Failed to load section content. Please try again.');
        }
    }
}

// Fallback function for backward compatibility
function loadSectionContentFallback(sectionId) {
    const section = courseContent[sectionId];
    if (!section) {
        console.warn(`No fallback content available for ${sectionId}`);
        return;
    }
    
    const courseTabContent = document.getElementById('course');
    if (!courseTabContent) return;
    
    // Build chapter navigation
    const chapterNav = buildChapterNavigation();
    
    // Build video classroom if section has video
    const videoSection = section.hasVideo ? buildVideoClassroom(section) : '';
    
    // Build content sections
    const contentSections = buildContentSections(section);
    
    // Update course tab content
    courseTabContent.innerHTML = `
        <div class="content-area">
            ${chapterNav}
            ${videoSection}
            ${contentSections}
        </div>
    `;
    
    // Initialize video player if present
    if (section.hasVideo) {
        initializeVideoPlayer();
    }
}

function buildChapterNavigation() {
    return `
        <div class="chapter-navigation">
            <div class="progress-bar-container">
                <div class="progress-chapters">
                    <div class="chapter-item active" data-chapter="P">P</div>
                    <div class="chapter-item" data-chapter="1">1</div>
                    <div class="chapter-item" data-chapter="2">2</div>
                    <div class="chapter-item" data-chapter="3">3</div>
                    <div class="chapter-item" data-chapter="4">4</div>
                    <div class="chapter-item" data-chapter="5">5</div>
                    <div class="chapter-item" data-chapter="6">6</div>
                    <div class="chapter-item" data-chapter="7">7</div>
                    <div class="chapter-item" data-chapter="8">8</div>
                    <div class="chapter-item" data-chapter="9">9</div>
                    <div class="chapter-item" data-chapter="10">10</div>
                    <div class="chapter-item" data-chapter="11">11</div>
                    <div class="chapter-item" data-chapter="12">12</div>
                    <div class="chapter-item" data-chapter="13">13</div>
                    <div class="chapter-item" data-chapter="14">14</div>
                    <div class="chapter-item" data-chapter="15">15</div>
                </div>
            </div>
            <div class="chapter-nav-buttons">
                <button class="nav-btn prev" disabled>
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <button class="nav-btn next">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

function buildVideoClassroom(section) {
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
                    controls 
                    poster="asset/image/video-poster.png"
                    data-src="${section.videoPath}">
                    <source src="${section.videoPath}" type="video/mp2t">
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
                    <h4 class="video-title">${section.videoTitle}</h4>
                </div>
            </div>
        </div>
    `;
}

function buildContentSections(section) {
    const content = section.content;
    
    return `
        <div class="section-content">
            <header class="content-header">
                <h1>${section.title}</h1>
                <div class="chapter-info">
                    <span class="chapter-number">${section.section}</span>
                    <span class="estimated-time"><i class="fas fa-clock"></i> ${section.duration}</span>
                </div>
            </header>
            
            <div class="content-body">
                <div class="content-section">
                    <h2>Introduction</h2>
                    ${content.introduction}
                </div>
                
                <div class="content-section">
                    <h2>${content.objectives.title}</h2>
                    <ul>
                        ${content.objectives.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="content-section">
                    <h2>${content.audience.title}</h2>
                    ${content.audience.content}
                </div>
                
                <div class="content-section">
                    <h2>${content.prerequisites.title}</h2>
                    ${content.prerequisites.content}
                </div>
            </div>
        </div>
    `;
}

function initializeVideoPlayer() {
    const playButton = document.querySelector('.play-button-large');
    const video = document.querySelector('.course-video');
    const overlay = document.querySelector('.video-overlay');
    
    if (playButton && video && overlay) {
        playButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            video.play().catch(e => {
                console.error('Error playing video:', e);
                showToast('Error loading video. Please check your connection.');
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

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Legacy courseContent for backward compatibility - will be removed in future version
// Content is now loaded dynamically via the modular chapter system
const courseContent = {
    // Kept for fallback compatibility only
};

function getModuleContent(index) {
    const modules = [
        {
            title: "Introduction to Red Hat Enterprise Linux",
            chapter: 1,
            duration: "30 minutes",
            learningObjectives: [
                "Describe and define open source, Linux, and Linux distributions",
                "Describe the Red Hat Enterprise Linux distribution and business model",
                "Explain Red Hat Enterprise Linux major version and support lifecycle",
                "Install Red Hat Enterprise Linux using local media"
            ],
            sections: [
                {
                    title: "What is Linux?",
                    content: `<p>Linux is an open-source operating system kernel created by Linus Torvalds in 1991. It forms the foundation of numerous Linux distributions, including Red Hat Enterprise Linux.</p>`
                },
                {
                    title: "Red Hat Enterprise Linux Overview",
                    content: `<p>Red Hat Enterprise Linux (RHEL) is a commercial Linux distribution developed by Red Hat for enterprise environments. It provides enterprise-class support, security, and reliability.</p>`,
                    infoBox: "RHEL follows a predictable release cycle with long-term support for enterprise stability."
                }
            ]
        },
        {
            title: "Accessing the Command Line",
            chapter: 2,
            duration: "45 minutes",
            learningObjectives: [
                "Log in to a Linux system and run simple commands using the shell",
                "Use the bash shell to execute commands",
                "Identify the purpose of various shell types",
                "Start an interactive shell"
            ],
            sections: [
                {
                    title: "Introduction",
                    content: `<p>The Linux command line is accessed through a terminal, which provides a text-based interface to the operating system. The shell is the command line interpreter that processes commands. This chapter introduces basic concepts for accessing and using the command line interface on Red Hat Enterprise Linux systems.</p>`,
                    infoBox: "The default shell in Red Hat Enterprise Linux is bash (Bourne Again Shell), which is compatible with the original Bourne shell but includes many additional features."
                },
                {
                    title: "What is a Shell?",
                    content: `<p>A shell is a program that takes commands from the keyboard and gives them to the operating system to perform. On most modern Linux systems, the shell is bash. The shell provides:</p>
                    <ul>
                        <li>Command line editing capabilities</li>
                        <li>Command history</li>
                        <li>Job control</li>
                        <li>Programming features</li>
                    </ul>`
                }
            ],
            exercise: {
                title: "Guided Exercise: Accessing the Command Line",
                steps: [
                    {
                        description: "Access your Red Hat Enterprise Linux system and open a terminal.",
                        code: "Applications → Utilities → Terminal"
                    },
                    {
                        description: "Verify your current shell by running:",
                        code: "echo $SHELL"
                    },
                    {
                        description: "Display the current working directory:",
                        code: "pwd"
                    }
                ]
            }
        },
        {
            title: "Managing Files from the Command Line",
            chapter: 3,
            duration: "60 minutes",
            learningObjectives: [
                "Describe how Linux organizes files, and the purpose of various directories",
                "Specify the location of files relative to the current working directory and by absolute path",
                "Use command-line tools to explore and manage files and directories",
                "Use shell pattern matching to specify multiple files with similar names"
            ],
            sections: [
                {
                    title: "Linux File System Hierarchy",
                    content: `<p>Linux organizes files in a hierarchical directory structure, starting from the root directory (/). Understanding this structure is essential for effective system administration.</p>`
                },
                {
                    title: "File and Directory Operations",
                    content: `<p>Basic file operations include creating, copying, moving, and deleting files and directories. The following commands are fundamental:</p>
                    <ul>
                        <li><code>ls</code> - List directory contents</li>
                        <li><code>cd</code> - Change directory</li>
                        <li><code>cp</code> - Copy files and directories</li>
                        <li><code>mv</code> - Move/rename files and directories</li>
                        <li><code>rm</code> - Remove files and directories</li>
                        <li><code>mkdir</code> - Create directories</li>
                    </ul>`
                }
            ],
            exercise: {
                title: "Guided Exercise: File Operations",
                steps: [
                    {
                        description: "List the contents of your home directory:",
                        code: "ls -la ~"
                    },
                    {
                        description: "Create a new directory called 'practice':",
                        code: "mkdir practice"
                    },
                    {
                        description: "Change to the practice directory:",
                        code: "cd practice"
                    }
                ]
            }
        }
    ];
    
    return modules[index] || modules[0];
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .code-block {
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .code-block:hover {
        background: #1a202c !important;
    }
`;
document.head.appendChild(style);