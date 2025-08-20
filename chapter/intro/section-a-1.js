/**
 * Red Hat Academy RH124 - Section A.1: Red Hat System Administration I
 * 
 * This file contains the complete content structure for Section A.1
 * including video, text content, objectives, and metadata
 */

const SECTION_A1_CONTENT = {
    // Section metadata
    meta: {
        id: "section-a-1",
        title: "Red Hat System Administration I",
        section: "Section A.1",
        chapter: "Preface A",
        chapterTitle: "Introduction",
        duration: "15 minutes",
        courseCode: "RH124",
        courseVersion: "9.3"
    },

    // Video configuration
    video: {
        hasVideo: true,
        videoPath: "asset/video/RH124 - pr01.ts",
        videoTitle: "Course Introduction",
        videoPoster: "asset/image/video-poster.png",
        videoType: "video/mp2t",
        autoplay: false,
        controls: true
    },

    // Chapter navigation configuration
    navigation: {
        currentChapter: "P",
        chapters: ["P", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        hasPrevious: false,
        hasNext: true,
        nextSection: "section-a-2",
        previousSection: null
    },

    // Main content sections
    content: {
        // Page header/title section
        header: {
            title: "Red Hat System Administration I",
            subtitle: null,
            description: "Course introduction and overview for RH124"
        },

        // Introduction section
        introduction: {
            title: "Introduction",
            content: `
                <p>Red Hat System Administration I (RH124) is designed for IT professionals without previous Linux system administration experience. The course provides students with Linux administration "survival skills" by focusing on core administration tasks. Red Hat System Administration I also provides a foundation for students who plan to become full-time Linux system administrators by introducing key command-line concepts and enterprise-level tools. These concepts are further developed in the follow-on course, Red Hat System Administration II (RH134).</p>
            `
        },

        // Course objectives section
        objectives: {
            title: "Course Objectives",
            type: "list",
            items: [
                "Gain sufficient skill to perform core system administration tasks on Red Hat Enterprise Linux.",
                "Build foundational skills that an RHCSA-certified Red Hat Enterprise Linux system administrator needs."
            ]
        },

        // Target audience section
        audience: {
            title: "Audience",
            type: "paragraph",
            content: `
                <p>IT professionals across a broad range of disciplines who need to perform essential Linux administration tasks, including installation, establishing network connectivity, managing physical storage, and basic security administration.</p>
            `
        },

        // Prerequisites section
        prerequisites: {
            title: "Prerequisites", 
            type: "paragraph",
            content: `
                <p>This course has no formal prerequisites; however, previous system administration experience on other operating systems is beneficial.</p>
            `
        }
    },

    // Additional resources and notes
    resources: {
        relatedCourses: [
            {
                code: "RH134",
                title: "Red Hat System Administration II",
                description: "Follow-on course that builds on RH124 concepts"
            }
        ],
        
        certification: {
            name: "RHCSA",
            fullName: "Red Hat Certified System Administrator",
            description: "This course provides foundational skills for RHCSA certification"
        },

        notes: [
            "This is an introductory course designed for beginners",
            "Hands-on lab exercises are included throughout the course",
            "Course materials are updated regularly to reflect current practices"
        ]
    },

    // Styling and presentation options
    presentation: {
        showVideoFirst: true,
        enableChapterNavigation: true,
        showDuration: true,
        highlightObjectives: true,
        theme: "red-hat-academy"
    },

    // Analytics and tracking
    analytics: {
        trackVideoViews: true,
        trackTimeSpent: true,
        trackCompletion: true,
        category: "introduction",
        tags: ["rhel", "system-administration", "introduction", "rh124"]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SECTION_A1_CONTENT;
} else {
    window.SECTION_A1_CONTENT = SECTION_A1_CONTENT;
}