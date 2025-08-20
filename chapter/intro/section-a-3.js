/**
 * Red Hat Academy RH124 - Section A.3: Performing Lab Exercises
 * 
 * This file contains the complete content structure for Section A.3
 * covering lab activity types and lab commands
 */

const SECTION_A3_CONTENT = {
    // Section metadata
    meta: {
        id: "section-a-3",
        title: "Performing Lab Exercises",
        section: "Section A.3",
        chapter: "Preface A",
        chapterTitle: "Introduction",
        duration: "15 minutes",
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
        nextSection: "section-1-1",
        previousSection: "section-a-2"
    },

    // Main content sections
    content: {
        // Page header/title section
        header: {
            title: "Performing Lab Exercises",
            subtitle: null,
            description: "Understanding lab activity types and commands"
        },

        // Introduction section
        introduction: {
            title: "Lab Activity Types",
            content: `<p>You might see the following lab activity types in this course:</p>`
        },

        // Guided Exercise section
        guidedExercise: {
            title: "Guided Exercise",
            type: "paragraph",
            content: `<p>A <strong>guided exercise</strong> is a hands-on practice exercise that follows a presentation section. It walks you through a procedure to perform, step by step.</p>
                <div class="info-box">
                    <i class="fas fa-hands-helping"></i>
                    <div class="info-content">
                        <strong>Hands-on Practice:</strong> Guided exercises provide detailed instructions for each step, ensuring you understand the concepts while practicing them in a real environment.
                    </div>
                </div>`
        },

        // Quiz section
        quiz: {
            title: "Quiz",
            type: "paragraph",
            content: `<p>A <strong>quiz</strong> is typically used when checking knowledge-based learning, or when a hands-on activity is impractical for some other reason.</p>
                <div class="info-box">
                    <i class="fas fa-question-circle"></i>
                    <div class="info-content">
                        <strong>Knowledge Check:</strong> Quizzes help reinforce theoretical concepts and verify your understanding before moving to practical exercises.
                    </div>
                </div>`
        },

        // End-of-Chapter Lab section
        endOfChapterLab: {
            title: "End-of-Chapter Lab",
            type: "paragraph",
            content: `<p>An <strong>end-of-chapter lab</strong> is a gradable hands-on activity to help you to check your learning. You work through a set of high-level steps, based on the guided exercises in that chapter, but the steps do not walk you through every command. A solution is provided with a step-by-step walk-through.</p>
                <div class="lab-features">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>Gradable activity with pass/fail criteria</li>
                        <li>High-level instructions requiring independent problem-solving</li>
                        <li>Based on concepts from the chapter's guided exercises</li>
                        <li>Complete solution provided for reference</li>
                    </ul>
                </div>`
        },

        // Comprehensive Review Lab section
        comprehensiveReview: {
            title: "Comprehensive Review Lab",
            type: "paragraph",
            content: `<p>A <strong>comprehensive review lab</strong> is used at the end of the course. It is also a gradable hands-on activity, and might cover content from the entire course. You work through a specification of what to accomplish in the activity, without receiving the specific steps to do so. Again, a solution is provided with a step-by-step walk-through that meets the specification.</p>
                <div class="lab-features">
                    <h4>Characteristics:</h4>
                    <ul>
                        <li>Covers material from the entire course</li>
                        <li>Provides only specifications, not step-by-step instructions</li>
                        <li>Tests your ability to independently solve complex problems</li>
                        <li>Includes comprehensive solution for learning</li>
                    </ul>
                </div>`
        },

        // Lab Commands section
        labCommands: {
            title: "Lab Environment Commands",
            type: "paragraph",
            content: `<p>To prepare your lab environment at the start of each hands-on activity, run the <code>lab start</code> command with a specified activity name from the activity's instructions. Likewise, at the end of each hands-on activity, run the <code>lab finish</code> command with that same activity name to clean up after the activity. Each hands-on activity has a unique name within a course.</p>
                
                <h3>Command Syntax</h3>
                <p>The syntax for running an exercise script is as follows:</p>
                
                <div class="code-block">
                    <code>[student@workstation ~]$ lab action exercise</code>
                </div>
                
                <p>The <code>action</code> is a choice of <code>start</code>, <code>grade</code>, or <code>finish</code>. All exercises support <code>start</code> and <code>finish</code>. Only end-of-chapter labs and comprehensive review labs support <code>grade</code>.</p>`
        },

        // Lab Actions section
        labActions: {
            title: "Lab Actions Explained",
            type: "custom",
            content: `<div class="lab-exercise">
                <h3><i class="fas fa-terminal"></i> Available Lab Actions</h3>
                
                <div class="lab-action-card">
                    <h4><i class="fas fa-play-circle"></i> start</h4>
                    <p>The <code>start</code> action verifies the required resources to begin an exercise. It might include configuring settings, creating resources, checking prerequisite services, and verifying necessary outcomes from previous exercises.</p>
                    <p class="note">You can take an exercise at any time, even without taking preceding exercises.</p>
                </div>
                
                <div class="lab-action-card">
                    <h4><i class="fas fa-check-circle"></i> grade</h4>
                    <p>For gradable activities, the <code>grade</code> action directs the lab command to evaluate your work, and shows a list of grading criteria with a <span class="pass">PASS</span> or <span class="fail">FAIL</span> status for each. To achieve a PASS status for all criteria, fix the failures and rerun the grade action.</p>
                </div>
                
                <div class="lab-action-card">
                    <h4><i class="fas fa-stop-circle"></i> finish</h4>
                    <p>The <code>finish</code> action cleans up resources that were configured during the exercise. You can take an exercise as many times as you want.</p>
                </div>
            </div>`
        },

        // Tab Completion section
        tabCompletion: {
            title: "Tab Completion",
            type: "paragraph",
            content: `<p>The <code>lab</code> command supports tab completion. For example, to list all exercises that you can start, enter <code>lab start</code> and then press the <kbd>Tab</kbd> key twice.</p>
                
                <div class="lab-exercise">
                    <h3><i class="fas fa-keyboard"></i> Example: Using Tab Completion</h3>
                    <div class="exercise-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <p>Type the beginning of the command:</p>
                                <div class="code-block"><code>[student@workstation ~]$ lab start</code></div>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <p>Press <kbd>Tab</kbd> twice to see available exercises:</p>
                                <div class="code-block"><code>intro-install     users-manage     files-manage
services-control  network-config   ssh-configure</code></div>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <p>Continue typing to complete the command:</p>
                                <div class="code-block"><code>[student@workstation ~]$ lab start intro-install</code></div>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SECTION_A3_CONTENT;
} else {
    window.SECTION_A3_CONTENT = SECTION_A3_CONTENT;
}