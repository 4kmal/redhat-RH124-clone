/**
 * Red Hat Academy RH124 - Section A.2: Orientation to the Classroom Environment
 * 
 * This file contains the complete content structure for Section A.2
 * covering classroom environment orientation and setup
 */

const SECTION_A2_CONTENT = {
    // Section metadata
    meta: {
        id: "section-a-2",
        title: "Orientation to the Classroom Environment",
        section: "Section A.2",
        chapter: "Preface A",
        chapterTitle: "Introduction",
        duration: "10 minutes",
        courseCode: "RH124",
        courseVersion: "9.3"
    },

    // Video configuration
    video: {
        hasVideo: false,
        videoPath: null,
        videoTitle: null,
        videoPoster: null,
        videoType: null,
        autoplay: false,
        controls: false
    },

    // Chapter navigation configuration
    navigation: {
        currentChapter: "P",
        chapters: ["P", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        hasPrevious: true,
        hasNext: true,
        nextSection: "section-a-3",
        previousSection: "section-a-1"
    },

    // Main content sections
    content: {
        // Page header/title section
        header: {
            title: "Orientation to the Classroom Environment",
            subtitle: null,
            description: "Understanding the classroom environment and available resources"
        },

        // Introduction section
        introduction: {
            title: "Introduction",
            content: `
                <p>This section provides an orientation to the Red Hat Academy classroom environment. Understanding your learning environment is essential for making the most of your training experience. You'll learn about the available resources, tools, and support systems that will help you succeed in this course.</p>
            `
        },

        // Classroom environment overview
        environment: {
            title: "Classroom Environment",
            type: "paragraph",
            content: `
                <p>The Red Hat Academy learning environment includes both physical and virtual components designed to provide hands-on experience with Red Hat Enterprise Linux systems. Your classroom setup includes access to dedicated lab environments, documentation, and instructor support.</p>
            `
        },

        // Available resources section
        resources: {
            title: "Available Resources",
            type: "list",
            items: [
                "Virtual lab environment with Red Hat Enterprise Linux 9.3 systems",
                "Course materials and documentation",
                "Red Hat Customer Portal access for additional resources",
                "Instructor and peer support through discussion forums",
                "Practice environments for hands-on exercises"
            ]
        },

        // Lab access information
        labAccess: {
            title: "Lab Environment Access",
            type: "paragraph",
            content: `
                <p>Your lab environment is accessible 24/7 during your course enrollment period. Each student has access to dedicated virtual machines pre-configured with Red Hat Enterprise Linux 9.3. The lab environment includes reset capabilities, allowing you to start fresh if needed during exercises.</p>
            `
        }
    },

    // Additional resources and notes
    resources: {
        supportChannels: [
            {
                name: "Instructor Support",
                description: "Direct access to certified Red Hat instructors"
            },
            {
                name: "Student Forums",
                description: "Peer-to-peer learning and discussion"
            },
            {
                name: "Technical Support",
                description: "Lab environment and technical assistance"
            }
        ],
        
        notes: [
            "Lab environments are reset daily for fresh start opportunities",
            "All course materials are available for download",
            "Additional practice time can be purchased if needed"
        ]
    },

    // Styling and presentation options
    presentation: {
        showVideoFirst: false,
        enableChapterNavigation: true,
        showDuration: true,
        highlightObjectives: false,
        theme: "red-hat-academy"
    },

    // Analytics and tracking
    analytics: {
        trackVideoViews: false,
        trackTimeSpent: true,
        trackCompletion: true,
        category: "orientation",
        tags: ["classroom", "environment", "resources", "rh124"]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SECTION_A2_CONTENT;
} else {
    window.SECTION_A2_CONTENT = SECTION_A2_CONTENT;
}