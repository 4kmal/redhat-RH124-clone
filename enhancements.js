document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarToggle();
    initializeVideoPlaceholders();
    initializeResponsiveFeatures();
});

function initializeSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-hidden');
            
            if (sidebar.classList.contains('mobile-hidden')) {
                sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                sidebarToggle.setAttribute('aria-label', 'Show navigation');
            } else {
                sidebarToggle.innerHTML = '<i class="fas fa-times"></i>';
                sidebarToggle.setAttribute('aria-label', 'Hide navigation');
            }
        });
        
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 1024) {
                const isClickInSidebar = sidebar.contains(event.target);
                const isClickOnToggle = sidebarToggle.contains(event.target);
                
                if (!isClickInSidebar && !isClickOnToggle && !sidebar.classList.contains('mobile-hidden')) {
                    sidebar.classList.add('mobile-hidden');
                    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    sidebarToggle.setAttribute('aria-label', 'Show navigation');
                }
            }
        });
    }
}

function initializeVideoPlaceholders() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        player.addEventListener('click', function() {
            showVideoModal(this);
        });
    });
}

function showVideoModal(videoElement) {
    const videoTitle = videoElement.querySelector('span').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${videoTitle}</h3>
                <button class="close-modal" aria-label="Close video">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-body">
                <div class="video-embed-placeholder">
                    <p>🎥 Video content would be embedded here</p>
                    <p>In a real implementation, this would contain:</p>
                    <ul>
                        <li>Kaltura or other video player</li>
                        <li>Progress tracking</li>
                        <li>Playback controls</li>
                        <li>Subtitles/transcripts</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .video-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 90%;
            overflow: auto;
        }
        
        .video-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 1px solid #e5e5e5;
        }
        
        .video-modal-header h3 {
            margin: 0;
            color: #151515;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
            padding: 8px;
            border-radius: 4px;
        }
        
        .close-modal:hover {
            background: #f5f5f5;
            color: #cc0000;
        }
        
        .video-modal-body {
            padding: 24px;
        }
        
        .video-embed-placeholder {
            text-align: center;
            padding: 40px 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 2px dashed #dee2e6;
        }
        
        .video-embed-placeholder p {
            margin: 16px 0;
            font-size: 18px;
            color: #495057;
        }
        
        .video-embed-placeholder ul {
            text-align: left;
            display: inline-block;
            margin: 20px 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

function initializeResponsiveFeatures() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth > 1024) {
                if (sidebar) {
                    sidebar.classList.remove('mobile-hidden');
                }
                if (sidebarToggle) {
                    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            } else {
                if (sidebar && !sidebar.classList.contains('mobile-hidden')) {
                    sidebar.classList.add('mobile-hidden');
                }
            }
        }, 250);
    });
    
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.add('mobile-hidden');
        }
    }
}

function addProgressMarker(moduleElement) {
    if (!moduleElement.classList.contains('completed')) {
        moduleElement.classList.add('completed');
        const icon = moduleElement.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-check-circle';
        }
        
        updateOverallProgress();
    }
}

function updateOverallProgress() {
    const totalModules = document.querySelectorAll('.nav-item').length;
    const completedModules = document.querySelectorAll('.nav-item.completed').length;
    const progressPercentage = Math.round((completedModules / totalModules) * 100);
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = progressPercentage + '%';
        progressText.textContent = progressPercentage + '% Complete';
    }
}