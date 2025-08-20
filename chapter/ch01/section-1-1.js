/**
 * Chapter 1: Get Started with Red Hat Enterprise Linux
 * Section 1.1: What Is Linux?
 */

window.SECTION_1_1_CONTENT = {
    meta: {
        id: 'section-1-1',
        chapter: 'chapter-1',
        title: 'What Is Linux?',
        section: 'Section 1.1',
        duration: '30 minutes'
    },
    navigation: {
        currentChapter: '1',
        chapters: ['P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        hasPrevious: true,
        hasNext: true
    },
    video: {
        hasVideo: true,
        videoPath: 'asset/video/ch01/section-1-1.ts',
        videoType: 'video/mp2t',
        videoPoster: 'asset/image/video-poster.png',
        videoTitle: 'RH124_9.0_VC_01_01_What Is Linux',
        controls: true,
        autoplay: false
    },
    content: {
        header: {
            title: 'What Is Linux?'
        },
        introduction: {
            title: 'Introduction',
            content: `<p>Linux is a family of open-source Unix-like operating systems based on the Linux kernel, first released by Linus Torvalds on September 17, 1991. The Linux kernel is the core component that manages hardware resources and provides essential services for all other parts of the operating system.</p>
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <div class="info-content">
                    <strong>Did You Know?</strong> Linux powers everything from smartphones (Android) to supercomputers. As of 2023, all of the world's 500 fastest supercomputers run on Linux-based operating systems.
                </div>
            </div>`
        },
        objectives: {
            title: 'Learning Objectives',
            type: 'list',
            items: [
                'Define open source software and understand its principles',
                'Explain what Linux is and its relationship to Unix',
                'Describe the concept of Linux distributions',
                'Understand the role of the Linux kernel',
                'Identify common uses of Linux in enterprise environments'
            ]
        },
        openSource: {
            title: 'Understanding Open Source',
            content: `<p>Open source software is software with source code that anyone can inspect, modify, and enhance. The open source model encourages collaboration and transparency, leading to more secure, stable, and innovative software.</p>
            <h3>Key Principles of Open Source:</h3>
            <ul>
                <li><strong>Transparency:</strong> Source code is publicly available</li>
                <li><strong>Collaboration:</strong> Anyone can contribute improvements</li>
                <li><strong>Freedom:</strong> Users can modify and distribute the software</li>
                <li><strong>Community:</strong> Development is driven by community needs</li>
            </ul>`
        },
        linuxHistory: {
            title: 'Brief History of Linux',
            content: `<p>Linux began in 1991 as a personal project by Finnish student Linus Torvalds. He wanted to create a free operating system kernel that could run on commodity PC hardware.</p>
            <div class="timeline">
                <div class="timeline-item">
                    <strong>1991:</strong> Linus Torvalds announces Linux 0.01
                </div>
                <div class="timeline-item">
                    <strong>1992:</strong> Linux adopts the GPL license
                </div>
                <div class="timeline-item">
                    <strong>1993:</strong> First Linux distributions emerge
                </div>
                <div class="timeline-item">
                    <strong>1994:</strong> Linux 1.0 released
                </div>
                <div class="timeline-item">
                    <strong>Today:</strong> Linux powers billions of devices worldwide
                </div>
            </div>`
        },
        distributions: {
            title: 'Linux Distributions',
            content: `<p>A Linux distribution (or "distro") is a complete operating system built around the Linux kernel. It includes:</p>
            <ul>
                <li>The Linux kernel</li>
                <li>System libraries and utilities</li>
                <li>Package management system</li>
                <li>Desktop environment (for desktop distributions)</li>
                <li>Pre-installed applications</li>
            </ul>
            <h3>Popular Enterprise Linux Distributions:</h3>
            <ul>
                <li><strong>Red Hat Enterprise Linux (RHEL):</strong> Commercial distribution with enterprise support</li>
                <li><strong>Ubuntu Server:</strong> Popular in cloud environments</li>
                <li><strong>SUSE Linux Enterprise:</strong> Strong in European markets</li>
                <li><strong>CentOS/Rocky Linux:</strong> RHEL-compatible community distributions</li>
            </ul>`
        },
        rhel: {
            title: 'Red Hat Enterprise Linux',
            content: `<p>Red Hat Enterprise Linux (RHEL) is a commercial Linux distribution developed by Red Hat for the enterprise market. RHEL is known for:</p>
            <ul>
                <li><strong>Stability:</strong> Extensive testing and long support cycles</li>
                <li><strong>Security:</strong> Regular security updates and compliance certifications</li>
                <li><strong>Support:</strong> Professional support from Red Hat</li>
                <li><strong>Ecosystem:</strong> Large partner ecosystem and certified applications</li>
                <li><strong>Predictability:</strong> Consistent release cycles and lifecycle</li>
            </ul>
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <div class="info-content">
                    <strong>Note:</strong> RHEL follows a major release cycle approximately every 3 years, with each major version supported for 10 years through various lifecycle phases.
                </div>
            </div>`
        }
    }
};

console.log('Chapter 1 Section 1.1 content loaded');