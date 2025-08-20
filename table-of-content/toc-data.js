/**
 * Red Hat Academy RH124 - Table of Contents Data Structure
 * 
 * This file contains the complete course structure for RH124 System Administration I
 * Each chapter contains sections with unique identifiers for dynamic content loading
 */

const TOC_DATA = {
    courseInfo: {
        title: "Red Hat System Administration I 9.3",
        courseCode: "RH124",
        version: "9.3"
    },
    
    chapters: [
        {
            id: "preface-a",
            title: "Preface A: Introduction",
            type: "preface",
            sections: [
                {
                    id: "section-a-1",
                    title: "Section A.1: Red Hat System Administration I",
                    hasContent: true,
                    hasVideo: true,
                    duration: "15 minutes"
                },
                {
                    id: "section-a-2", 
                    title: "Section A.2: Orientation to the Classroom Environment",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-a-3",
                    title: "Section A.3: Performing Lab Exercises", 
                    hasContent: false,
                    hasVideo: false,
                    duration: "15 minutes"
                }
            ]
        },
        {
            id: "chapter-1",
            title: "Chapter 1: Get Started with Red Hat Enterprise Linux",
            type: "chapter",
            sections: [
                {
                    id: "section-1-1",
                    title: "Section 1.1: What Is Linux?",
                    hasContent: false,
                    hasVideo: false,
                    duration: "20 minutes"
                },
                {
                    id: "section-1-2",
                    title: "Section 1.2: Quiz: Get Started with Red Hat Enterprise Linux",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-1-3",
                    title: "Section 1.3: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-2",
            title: "Chapter 2: Access the Command Line",
            type: "chapter", 
            sections: [
                {
                    id: "section-2-1",
                    title: "Section 2.1: Access the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-2-2",
                    title: "Section 2.2: Quiz: Access the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-2-3",
                    title: "Section 2.3: Access the Command Line with the Desktop",
                    hasContent: false,
                    hasVideo: false,
                    duration: "20 minutes"
                },
                {
                    id: "section-2-4",
                    title: "Section 2.4: Guided Exercise: Access the Command Line with the Desktop",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-2-5",
                    title: "Section 2.5: Execute Commands with the Bash Shell",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-2-6",
                    title: "Section 2.6: Quiz: Execute Commands with the Bash Shell",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-2-7",
                    title: "Section 2.7: Lab: Access the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-2-8",
                    title: "Section 2.8: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-3",
            title: "Chapter 3: Manage Files from the Command Line",
            type: "chapter",
            sections: [
                {
                    id: "section-3-1",
                    title: "Section 3.1: Describe Linux File System Hierarchy Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "20 minutes"
                },
                {
                    id: "section-3-2",
                    title: "Section 3.2: Quiz: Describe Linux File System Hierarchy Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-3-3",
                    title: "Section 3.3: Specify Files by Name",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-3-4",
                    title: "Section 3.4: Quiz: Specify Files by Name", 
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-3-5",
                    title: "Section 3.5: Manage Files with Command-line Tools",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-3-6",
                    title: "Section 3.6: Guided Exercise: Manage Files with Command-line Tools",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-3-7",
                    title: "Section 3.7: Make Links Between Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "20 minutes"
                },
                {
                    id: "section-3-8",
                    title: "Section 3.8: Guided Exercise: Make Links Between Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-3-9",
                    title: "Section 3.9: Match File Names with Shell Expansions",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-3-10",
                    title: "Section 3.10: Quiz: Match File Names with Shell Expansions",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-3-11",
                    title: "Section 3.11: Lab: Manage Files from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-3-12",
                    title: "Section 3.12: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-4",
            title: "Chapter 4: Get Help in Red Hat Enterprise Linux",
            type: "chapter",
            sections: [
                {
                    id: "section-4-1",
                    title: "Section 4.1: Read Manual Pages",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-4-2",
                    title: "Section 4.2: Guided Exercise: Read Manual Pages",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-4-3",
                    title: "Section 4.3: Lab: Get Help in Red Hat Enterprise Linux",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-4-4",
                    title: "Section 4.4: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-5",
            title: "Chapter 5: Create, View, and Edit Text Files",
            type: "chapter",
            sections: [
                {
                    id: "section-5-1",
                    title: "Section 5.1: Redirect Output to a File or Program",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-5-2",
                    title: "Section 5.2: Quiz: Redirect Output to a File or Program",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-5-3",
                    title: "Section 5.3: Edit Text Files from the Shell Prompt",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-5-4",
                    title: "Section 5.4: Guided Exercise: Edit Text Files from the Shell Prompt",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-5-5",
                    title: "Section 5.5: Change the Shell Environment",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-5-6",
                    title: "Section 5.6: Guided Exercise: Change the Shell Environment",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-5-7",
                    title: "Section 5.7: Lab: Create, View, and Edit Text Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-5-8",
                    title: "Section 5.8: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-6",
            title: "Chapter 6: Manage Local Users and Groups",
            type: "chapter",
            sections: [
                {
                    id: "section-6-1",
                    title: "Section 6.1: Describe User and Group Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-6-2",
                    title: "Section 6.2: Quiz: Describe User and Group Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-6-3",
                    title: "Section 6.3: Gain Superuser Access",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-6-4",
                    title: "Section 6.4: Guided Exercise: Gain Superuser Access",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-6-5",
                    title: "Section 6.5: Manage Local User Accounts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-6-6",
                    title: "Section 6.6: Guided Exercise: Manage Local User Accounts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-6-7",
                    title: "Section 6.7: Manage Local Group Accounts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-6-8",
                    title: "Section 6.8: Guided Exercise: Manage Local Group Accounts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-6-9",
                    title: "Section 6.9: Manage User Passwords",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-6-10",
                    title: "Section 6.10: Guided Exercise: Manage User Passwords",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-6-11",
                    title: "Section 6.11: Lab: Manage Local Users and Groups",
                    hasContent: false,
                    hasVideo: false,
                    duration: "75 minutes"
                },
                {
                    id: "section-6-12",
                    title: "Section 6.12: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-7",
            title: "Chapter 7: Control Access to Files",
            type: "chapter",
            sections: [
                {
                    id: "section-7-1",
                    title: "Section 7.1: Interpret Linux File System Permissions",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-7-2",
                    title: "Section 7.2: Quiz: Interpret Linux File System Permissions",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-7-3",
                    title: "Section 7.3: Manage File System Permissions from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-7-4",
                    title: "Section 7.4: Guided Exercise: Manage File System Permissions from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-7-5",
                    title: "Section 7.5: Manage Default Permissions and File Access",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-7-6",
                    title: "Section 7.6: Guided Exercise: Manage Default Permissions and File Access",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-7-7",
                    title: "Section 7.7: Lab: Control Access to Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-7-8",
                    title: "Section 7.8: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-8",
            title: "Chapter 8: Monitor and Manage Linux Processes",
            type: "chapter",
            sections: [
                {
                    id: "section-8-1",
                    title: "Section 8.1: Process States and Lifecycle",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-8-2",
                    title: "Section 8.2: Quiz: Process States and Lifecycle",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-8-3",
                    title: "Section 8.3: Control Jobs",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-8-4",
                    title: "Section 8.4: Guided Exercise: Control Jobs",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-8-5",
                    title: "Section 8.5: Kill Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-8-6",
                    title: "Section 8.6: Guided Exercise: Kill Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-8-7",
                    title: "Section 8.7: Monitor Process Activity",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-8-8",
                    title: "Section 8.8: Guided Exercise: Monitor Process Activity",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-8-9",
                    title: "Section 8.9: Lab: Monitor and Manage Linux Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "75 minutes"
                },
                {
                    id: "section-8-10",
                    title: "Section 8.10: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-9",
            title: "Chapter 9: Control Services and Daemons",
            type: "chapter",
            sections: [
                {
                    id: "section-9-1",
                    title: "Section 9.1: Identify Automatically Started System Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-9-2",
                    title: "Section 9.2: Guided Exercise: Identify Automatically Started System Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-9-3",
                    title: "Section 9.3: Control System Services",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-9-4",
                    title: "Section 9.4: Guided Exercise: Control System Services",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-9-5",
                    title: "Section 9.5: Lab: Control Services and Daemons",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-9-6",
                    title: "Section 9.6: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-10",
            title: "Chapter 10: Configure and Secure SSH",
            type: "chapter",
            sections: [
                {
                    id: "section-10-1",
                    title: "Section 10.1: Access the Remote Command Line with SSH",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-10-2",
                    title: "Section 10.2: Guided Exercise: Access the Remote Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-10-3",
                    title: "Section 10.3: Configure SSH Key-based Authentication",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-10-4",
                    title: "Section 10.4: Guided Exercise: Configure SSH Key-based Authentication",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-10-5",
                    title: "Section 10.5: Customize OpenSSH Service Configuration",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-10-6",
                    title: "Section 10.6: Guided Exercise: Customize OpenSSH Service Configuration",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-10-7",
                    title: "Section 10.7: Lab: Configure and Secure SSH",
                    hasContent: false,
                    hasVideo: false,
                    duration: "75 minutes"
                },
                {
                    id: "section-10-8",
                    title: "Section 10.8: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-11",
            title: "Chapter 11: Manage Networking",
            type: "chapter",
            sections: [
                {
                    id: "section-11-1",
                    title: "Section 11.1: Describe Networking Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-11-2",
                    title: "Section 11.2: Quiz: Describe Networking Concepts",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-11-3",
                    title: "Section 11.3: Validate Network Configuration",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-11-4",
                    title: "Section 11.4: Guided Exercise: Validate Network Configuration",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-11-5",
                    title: "Section 11.5: Configure Networking from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-11-6",
                    title: "Section 11.6: Guided Exercise: Configure Networking from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-11-7",
                    title: "Section 11.7: Edit Network Configuration Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-11-8",
                    title: "Section 11.8: Guided Exercise: Edit Network Configuration Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-11-9",
                    title: "Section 11.9: Configure Hostnames and Name Resolution",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-11-10",
                    title: "Section 11.10: Guided Exercise: Configure Hostnames and Name Resolution",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-11-11",
                    title: "Section 11.11: Lab: Manage Networking",
                    hasContent: false,
                    hasVideo: false,
                    duration: "75 minutes"
                },
                {
                    id: "section-11-12",
                    title: "Section 11.12: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-12",
            title: "Chapter 12: Install and Update Software Packages",
            type: "chapter",
            sections: [
                {
                    id: "section-12-1",
                    title: "Section 12.1: Register Systems for Red Hat Support",
                    hasContent: false,
                    hasVideo: false,
                    duration: "20 minutes"
                },
                {
                    id: "section-12-2",
                    title: "Section 12.2: Quiz: Register Systems for Red Hat Support",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-12-3",
                    title: "Section 12.3: Explain and Investigate RPM Software Packages",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-12-4",
                    title: "Section 12.4: Guided Exercise: Explain and Investigate RPM Software Packages",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-12-5",
                    title: "Section 12.5: Install and Update Software Packages with DNF",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-12-6",
                    title: "Section 12.6: Guided Exercise: Install and Update Software Packages with DNF",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-12-7",
                    title: "Section 12.7: Enable DNF Software Repositories",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-12-8",
                    title: "Section 12.8: Guided Exercise: Enable DNF Software Repositories",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-12-9",
                    title: "Section 12.9: Lab: Install and Update Software Packages",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-12-10",
                    title: "Section 12.10: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-13",
            title: "Chapter 13: Access Linux File Systems",
            type: "chapter",
            sections: [
                {
                    id: "section-13-1",
                    title: "Section 13.1: Identify File Systems and Devices",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-13-2",
                    title: "Section 13.2: Quiz: Identify File Systems and Devices",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-13-3",
                    title: "Section 13.3: Mount and Unmount File Systems",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-13-4",
                    title: "Section 13.4: Guided Exercise: Mount and Unmount File Systems",
                    hasContent: false,
                    hasVideo: false,
                    duration: "40 minutes"
                },
                {
                    id: "section-13-5",
                    title: "Section 13.5: Locate Files on the System",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-13-6",
                    title: "Section 13.6: Guided Exercise: Locate Files on the System",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-13-7",
                    title: "Section 13.7: Lab: Access Linux File Systems",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                },
                {
                    id: "section-13-8",
                    title: "Section 13.8: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-14",
            title: "Chapter 14: Analyze Servers and Get Support",
            type: "chapter",
            sections: [
                {
                    id: "section-14-1",
                    title: "Section 14.1: Analyze and Manage Remote Servers",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-14-2",
                    title: "Section 14.2: Guided Exercise: Analyze and Manage Remote Servers",
                    hasContent: false,
                    hasVideo: false,
                    duration: "45 minutes"
                },
                {
                    id: "section-14-3",
                    title: "Section 14.3: Create a Diagnostics Report",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-14-4",
                    title: "Section 14.4: Guided Exercise: Create a Diagnostics Report",
                    hasContent: false,
                    hasVideo: false,
                    duration: "35 minutes"
                },
                {
                    id: "section-14-5",
                    title: "Section 14.5: Detect and Resolve Issues with Red Hat Insights",
                    hasContent: false,
                    hasVideo: false,
                    duration: "25 minutes"
                },
                {
                    id: "section-14-6",
                    title: "Section 14.6: Quiz: Detect and Resolve Issues with Red Hat Insights",
                    hasContent: false,
                    hasVideo: false,
                    duration: "10 minutes"
                },
                {
                    id: "section-14-7",
                    title: "Section 14.7: Summary",
                    hasContent: false,
                    hasVideo: false,
                    duration: "5 minutes"
                }
            ]
        },
        {
            id: "chapter-15",
            title: "Chapter 15: Comprehensive Review",
            type: "chapter",
            sections: [
                {
                    id: "section-15-1",
                    title: "Section 15.1: Comprehensive Review",
                    hasContent: false,
                    hasVideo: false,
                    duration: "30 minutes"
                },
                {
                    id: "section-15-2",
                    title: "Section 15.2: Lab: Manage Files from the Command Line",
                    hasContent: false,
                    hasVideo: false,
                    duration: "90 minutes"
                },
                {
                    id: "section-15-3",
                    title: "Section 15.3: Lab: Manage Users and Groups, Permissions, and Processes",
                    hasContent: false,
                    hasVideo: false,
                    duration: "90 minutes"
                },
                {
                    id: "section-15-4",
                    title: "Section 15.4: Lab: Configure and Manage a Server",
                    hasContent: false,
                    hasVideo: false,
                    duration: "90 minutes"
                },
                {
                    id: "section-15-5",
                    title: "Section 15.5: Lab: Manage Networks",
                    hasContent: false,
                    hasVideo: false,
                    duration: "75 minutes"
                },
                {
                    id: "section-15-6",
                    title: "Section 15.6: Lab: Mount File Systems and Find Files",
                    hasContent: false,
                    hasVideo: false,
                    duration: "60 minutes"
                }
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TOC_DATA;
} else {
    window.TOC_DATA = TOC_DATA;
}