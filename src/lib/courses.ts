
export type Lesson = {
    title: string;
    time: string;
}

export type CourseSection = {
    title: string;
    lessons: Lesson[];
}

export type Course = {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    videoUrl: string;
    price: string;
    resources: { name: string; url: string; }[];
    instructor: string;
    avatarUrl: string;
    courseContent: CourseSection[];
    imageUrl?: string;
    categoryUrl: string;
};


const careerCourses: Course[] = [
    {
        id: "cp1",
        icon: "NotepadText" as any,
        title: "best resume templet",
        description: "Learn to create a professional, eye-catching resume that stands out to recruiters using the powerful and easy-to-use design tool, Canva.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/13GjXXgR/career-course-1.png",
        price: "Free",
        resources: [{ name: "Resume Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Understanding the Basics of Resume Design", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Advanced Canva Techniques", time: "12:15" },
                    { title: "Tailoring Your Resume for Different Jobs", time: "8:45" },
                ]
            }
        ],
        categoryUrl: "/courses/career-and-professional"
    },
    {
        id: "cp2",
        icon: "Target" as any,
        title: "LinkedIn Setup & Branding",
        description: "Optimize your LinkedIn profile to attract recruiters, build a strong personal brand, and expand your professional network effectively.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/tJnQkG0r/career-course-2.png",
        price: "Free",
        resources: [{ name: "LinkedIn Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction",
                lessons: [
                    { title: "Why LinkedIn is Crucial for Your Career", time: "2:30" },
                    { title: "Setting Up Your Profile", time: "7:00" },
                ]
            }
        ],
        categoryUrl: "/courses/career-and-professional"
    },
    {
        id: "cp3",
        icon: "Mic" as any,
        title: "Interview Practice & Dress Tips",
        description: "Gain confidence by practicing common interview questions and learning essential tips on how to dress professionally for success.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/9M9B2Gz8/career-course-3.png",
        price: "Free",
        resources: [{ name: "Common Questions PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Nailing the Interview",
                lessons: [
                    { title: "Common Questions & How to Answer Them", time: "15:00" },
                    { title: "Dressing for Success", time: "5:00" },
                ]
            }
        ],
        categoryUrl: "/courses/career-and-professional"
    },
    {
        id: "cp5",
        icon: "Presentation" as any,
        title: "Public Speaking for Interviews",
        description: "Master the art of public speaking to communicate your ideas clearly and confidently in interviews and professional settings.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/g0K5tSjK/career-course-5.png",
        price: "Free",
        resources: [{ name: "Speech Outline", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Art of Public Speaking",
                lessons: [
                    { title: "Overcoming Stage Fright", time: "8:00" },
                    { title: "Structuring Your Speech", time: "11:00" },
                ]
            }
        ],
        categoryUrl: "/courses/career-and-professional"
    }
];

const communicationCourses: Course[] = [
    {
        id: "c1",
        icon: "Mic" as any,
        title: "Spoken English Basics",
        description: "Improve your conversational English with fundamental lessons on greetings, introductions, vocabulary, and common phrases.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/rpYxVvB9/comm-course-1.png",
        price: "Free",
        resources: [{ name: "Pronunciation Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Basic Greetings & Introductions", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Building Vocabulary", time: "12:15" },
                    { title: "Common Phrases", time: "8:45" },
                ]
            }
        ],
        categoryUrl: "/courses/communication"
    },
    {
        id: "c2",
        icon: "Mail" as any,
        title: "Email & WhatsApp Etiquette",
        description: "Learn the do's and don'ts of professional and effective communication on digital platforms like email and WhatsApp.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/Hks22nLg/comm-course-2.png",
        price: "Free",
        resources: [{ name: "Email Templates", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Professional Communication",
                lessons: [
                    { title: "Writing Professional Emails", time: "10:00" },
                    { title: "WhatsApp Business Etiquette", time: "7:30" },
                ]
            }
        ],
        categoryUrl: "/courses/communication"
    },
    {
        id: "c3",
        icon: "Presentation" as any,
        title: "Public Speaking & Debate",
        description: "Build confidence and master the skills needed to deliver compelling speeches and participate effectively in debates.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/d11T3w6h/comm-course-3.png",
        price: "Free",
        resources: [{ name: "Debate Topics", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Mastering the Stage",
                lessons: [
                    { title: "Structuring a Compelling Speech", time: "12:00" },
                    { title: "Debating Techniques", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/communication"
    },
    {
        id: "c4",
        icon: "Handshake" as any,
        title: "Teamwork & Leadership",
        description: "Develop essential collaboration skills for working in a team and learn about different leadership styles to lead with impact.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/WbN1M21j/comm-course-4.png",
        price: "Free",
        resources: [{ name: "Leadership Styles Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Leading with Impact",
                lessons: [
                    { title: "Understanding Different Leadership Styles", time: "9:00" },
                    { title: "Effective Collaboration in Teams", time: "11:30" },
                ]
            }
        ],
        categoryUrl: "/courses/communication"
    },
    {
        id: "c5",
        icon: "Users" as any,
        title: "Role Plays & Peer Feedback",
        description: "Practice your communication skills in real-world scenarios through role-playing and learn how to give and receive constructive feedback.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/B6Hk6YmB/comm-course-5.png",
        price: "Free",
        resources: [{ name: "Role Play Scenarios", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Practice Makes Perfect",
                lessons: [
                    { title: "Simulating Real-World Interactions", time: "14:00" },
                    { title: "Giving and Receiving Constructive Feedback", time: "8:00" },
                ]
            }
        ],
        categoryUrl: "/courses/communication"
    }
];

const digitalCourses: Course[] = [
    {
        id: "dt1",
        icon: "Brush" as any,
        title: "Canva for Beginners",
        description: "Learn the basics of Canva to create stunning graphics for social media, presentations, and other projects with no prior design experience.",
        videoUrl: "https://www.youtube.com/embed/rXLvN1FEkOE?si=B91IX-m8wBB3Fy8w",
        imageUrl: "https://i.postimg.cc/NfK5qg1j/digital-course-1.png",
        price: "Free",
        resources: [{ name: "Canva Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Understanding the Canva Interface", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Creating Your First Design", time: "12:15" },
                    { title: "Using Templates and Elements", time: "8:45" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    },
    {
        id: "dt2",
        icon: "FileText" as any,
        title: "Google Docs, Sheets, Forms",
        description: "Master the essential Google Workspace suite for improved productivity, data management, and seamless collaboration.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/6p9vjRN5/digital-course-2.png",
        price: "Free",
        resources: [{ name: "Keyboard Shortcuts", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Google Suite Essentials",
                lessons: [
                    { title: "Advanced Google Docs Formatting", time: "10:00" },
                    { title: "Formulas and Functions in Google Sheets", time: "15:30" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    },
    {
        id: "dt3",
        icon: "Code" as any,
        title: "Basic Coding (Scratch/Python)",
        description: "Get a friendly introduction to the fundamentals of programming using visual tools like Scratch and a popular language like Python.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/zXmhycM7/digital-course-3.png",
        price: "Free",
        resources: [{ name: "Python Starter Code", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Introduction to Programming",
                lessons: [
                    { title: "Your First Scratch Project", time: "11:00" },
                    { title: "Python Basics: Variables and Data Types", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    },
    {
        id: "dt4",
        icon: "Bot" as any,
        title: "AI Tools (ChatGPT/Notion)",
        description: "Learn how to leverage popular AI tools like ChatGPT and Notion AI to boost your productivity, creativity, and organization skills.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/DydGfT1c/digital-course-4.png",
        price: "Free",
        resources: [{ name: "Prompting Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Leveraging AI",
                lessons: [
                    { title: "Effective Prompting with ChatGPT", time: "13:00" },
                    { title: "Organizing Your Life with Notion AI", time: "10:30" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    },
    {
        id: "dt5",
        icon: "ShieldCheck" as any,
        title: "Digital Safety & Citizenship",
        description: "Understand how to stay safe online, protect your personal information, and practice responsible and ethical digital citizenship.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/mkG2H9Pz/digital-course-5.png",
        price: "Free",
        resources: [{ name: "Safety Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Staying Safe Online",
                lessons: [
                    { title: "Identifying Scams and Phishing", time: "9:00" },
                    { title: "Managing Your Digital Footprint", time: "7:00" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    },
    {
        id: "dt6",
        icon: "Bot" as any,
        title: "Prompt Engineering",
        description: "Learn how to write effective prompts to get the best results from AI models like ChatGPT. Unlock the power of generative AI.",
        videoUrl: "https://www.youtube.com/embed/-c0Jw7s1J0Y?si=7X744DRoPkklba_w",
        imageUrl: "https://i.postimg.cc/HxFvYp0y/digital-course-6.png",
        price: "Free",
        resources: [{ name: "Advanced Prompting Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: The Art of the Prompt",
                lessons: [
                    { title: "Introduction to Prompt Engineering", time: "8:00" },
                    { title: "Key Principles of Effective Prompts", time: "12:00" },
                ]
            }
        ],
        categoryUrl: "/courses/digital-and-tech"
    }
];

const entrepreneurshipCourses: Course[] = [
    {
        id: "e1",
        icon: "Lightbulb" as any,
        title: "Idea to Product Basics",
        description: "Learn the fundamental steps of turning a great business idea into a tangible product, including validation and lean business planning.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/tJnN7pB4/ent-course-1.png",
        price: "Free",
        resources: [{ name: "Business Plan Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Ideation",
                lessons: [
                    { title: "Validating Your Business Idea", time: "8:00" },
                    { title: "Creating a Lean Business Plan", time: "12:00" },
                ]
            }
        ],
        categoryUrl: "/courses/entrepreneurship"
    },
    {
        id: "e2",
        icon: "Camera" as any,
        title: "Instagram/Meesho Selling",
        description: "Master the art of selling products on popular social commerce platforms like Instagram and Meesho to reach more customers.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/0jN3Z1d6/ent-course-2.png",
        price: "Free",
        resources: [{ name: "Content Calendar", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Social Selling",
                lessons: [
                    { title: "Setting Up Your Store on Instagram", time: "9:30" },
                    { title: "Marketing Your Products on Meesho", time: "11:00" },
                ]
            }
        ],
        categoryUrl: "/courses/entrepreneurship"
    },
    {
        id: "e3",
        icon: "ShoppingCart" as any,
        title: "Product Photos & Descriptions",
        description: "Learn how to take compelling product photos and write persuasive, sales-driven descriptions that convert viewers into buyers.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/Dwx0Kx4j/ent-course-3.png",
        price: "Free",
        resources: [{ name: "Photo Editing Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Visual Merchandising",
                lessons: [
                    { title: "DIY Product Photography", time: "13:00" },
                    { title: "Writing Descriptions That Sell", time: "8:30" },
                ]
            }
        ],
        categoryUrl: "/courses/entrepreneurship"
    },
    {
        id: "e4",
        icon: "BrainCircuit" as any,
        title: "Design Thinking for Students",
        description: "Apply the five stages of the design thinking process (Empathize, Define, Ideate, Prototype, Test) to solve complex problems and create innovative solutions.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/gJ07H2Gk/ent-course-4.png",
        price: "Free",
        resources: [{ name: "Design Thinking Workbook", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Design Thinking Process",
                lessons: [
                    { title: "Empathize, Define, Ideate", time: "15:00" },
                    { title: "Prototype and Test", time: "18:00" },
                ]
            }
        ],
        categoryUrl: "/courses/entrepreneurship"
    },
    {
        id: "e5",
        icon: "Presentation" as any,
        title: "Pitching & Funding for Beginners",
        description: "Learn how to craft a compelling elevator pitch for your business idea and understand the basics of securing funding from investors.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/mD3qPbhz/ent-course-5.png",
        price: "Free",
        resources: [{ name: "Pitch Deck Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Getting Funded",
                lessons: [
                    { title: "Crafting Your Elevator Pitch", time: "7:00" },
                    { title: "Understanding Funding Options", time: "10:00" },
                ]
            }
        ],
        categoryUrl: "/courses/entrepreneurship"
    }
];

const lifeSkillsCourses: Course[] = [
    {
        id: "ls1",
        icon: "Map" as any,
        title: "Memory Techniques & Mind Maps",
        description: "Enhance your memory and learning efficiency by mastering powerful memory techniques and the art of creating effective mind maps.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/yNZZg1mJ/life-course-1.png",
        price: "Free",
        resources: [{ name: "Mind Map Templates", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Boosting Your Brain",
                lessons: [
                    { title: "The Loci Method", time: "10:00" },
                    { title: "Creating Effective Mind Maps", time: "12:30" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
    {
        id: "ls2",
        icon: "Clock" as any,
        title: "Time Management",
        description: "Learn to beat procrastination and boost your productivity using the Pomodoro Technique, a proven method for improving focus and managing your time.",
        videoUrl: "https://www.youtube.com/embed/7ax4Tb5G1P4?si=lHNQwITADwD14_wD",
        imageUrl: "https://i.postimg.cc/L5n4xN2C/life-course-2.png",
        price: "Free",
        resources: [{ name: "Pomodoro Tracker", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Mastering Your Time",
                lessons: [
                    { title: "Understanding the Pomodoro Technique", time: "5:00" },
                    { title: "Advanced Time Management Strategies", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
    {
        id: "ls3",
        icon: "NotebookPen" as any,
        title: "Study Plans & Exam Strategy",
        description: "Learn how to create personalized, effective study plans and develop winning strategies for exam success and stress-free preparation.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/k4WqC3Cg/life-course-3.png",
        price: "Free",
        resources: [{ name: "Study Plan Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Study Smarter",
                lessons: [
                    { title: "Creating a Personalized Study Plan", time: "11:00" },
                    { title: "Effective Exam-Taking Strategies", time: "9:30" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
    {
        id: "ls5",
        icon: "Waves" as any,
        title: "Stress Relief & Focus",
        description: "Learn practical mindfulness, meditation, and breathing techniques to effectively manage stress and significantly improve your focus.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/sXv0Y8yL/life-course-5.png",
        price: "Free",
        resources: [{ name: "Meditation Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Finding Your Calm",
                lessons: [
                    { title: "Mindfulness and Meditation Basics", time: "12:00" },
                    { title: "Breathing Exercises for Stress Relief", time: "7:00" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
    {
        id: "ls11",
        icon: "Flag" as any,
        title: "The Most Powerful Goal Setting Technique",
        description: "Learn a powerful technique to set and achieve your most ambitious goals.",
        videoUrl: "https://www.youtube.com/embed/hGqlLmFvOlM?si=gZp8JgVEnxhK0gMO",
        imageUrl: "https://img.youtube.com/vi/hGqlLmFvOlM/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Setting Mastery",
                lessons: [
                    { title: "Understanding Powerful Goal Setting", time: "10:00" },
                    { title: "Implementing the Technique", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
    {
        id: "ls12",
        icon: "Flag" as any,
        title: "Mastering Goal Setting & Achievement by Amit kumarr",
        description: "Learn from Amit Kumarr how to effectively set and achieve your goals.",
        videoUrl: "https://www.youtube.com/embed/pytM_lG6jPU?si=gpE2O8bh3JgSkqU8",
        imageUrl: "https://img.youtube.com/vi/pytM_lG6jPU/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Amit Kumarr",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Achievement",
                lessons: [
                    { title: "Principles of Goal Setting", time: "10:00" },
                    { title: "Strategies for Achievement", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/life-skills"
    },
];

const bookCourses: Course[] = [
    {
        id: "ls6",
        icon: "BookOpen" as any,
        title: "Laws of Human Nature",
        description: "Get a summary of Robert Greene's 'The Laws of Human Nature' to understand the hidden patterns of human behavior and navigate social situations effectively.",
        videoUrl: "https://www.youtube.com/embed/R-iIQ0kQni0?si=T_cedBYzZpqy_pgr",
        imageUrl: "https://i.postimg.cc/Y9r4tXjG/life-course-6.png",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding People",
                lessons: [
                    { title: "Introduction to Human Nature", time: "10:00" },
                    { title: "The Law of Irrationality", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/books"
    },
    {
        id: "ls7",
        icon: "BookOpen" as any,
        title: "Rich Dad Poor Dad by Robert Kiyosaki",
        description: "An animated summary of the key financial lessons from the best-selling book 'Rich Dad Poor Dad', focusing on financial literacy and building wealth.",
        videoUrl: "https://www.youtube.com/embed/eDa1U9qJKxo?si=Qpk5ne9VE8fgElbM",
        imageUrl: "https://i.postimg.cc/s2qR2Jk6/life-course-7.png",
        price: "Free",
        resources: [{ name: "Book Summary PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Financial Mindset",
                lessons: [
                    { title: "The Difference Between Assets and Liabilities", time: "10:00" },
                    { title: "Why the Rich Don't Work for Money", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/books"
    },
    {
        id: "ls9",
        icon: "BookOpen" as any,
        title: "Atomic Habits",
        description: "An easy and proven way to build good habits and break bad ones, based on the best-selling book by James Clear.",
        videoUrl: "https://www.youtube.com/embed/PZ7lDrwYdZc?si=sjQBLb-UI1ih9pHz",
        imageUrl: "https://img.youtube.com/vi/PZ7lDrwYdZc/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Habit Tracker Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "The Four Laws of Behavior Change", time: "12:00" },
                    { title: "How to Make Habits Obvious and Attractive", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/books"
    },
    {
        id: "ms8",
        icon: "DollarSign" as any,
        title: "The Psychology of Money in 20 minutes",
        description: "A concise summary of key lessons from Morgan Housel's 'The Psychology of Money', exploring how our biases and emotions affect our financial decisions.",
        videoUrl: "https://www.youtube.com/embed/_5ecgEXLoCA?si=fqUPMHYzrkZrtPMw",
        imageUrl: "https://img.youtube.com/vi/_5ecgEXLoCA/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "No One's Crazy", time: "8:00" },
                    { title: "Luck & Risk", time: "12:00" },
                ]
            }
        ],
        categoryUrl: "/courses/books"
    },
];

const motivationCourses: Course[] = [
    {
        id: "m1",
        icon: "Flame" as any,
        title: "Everything is possible, just believe in yourself",
        description: "A powerful motivational video to inspire you to believe in your potential and overcome any obstacle.",
        videoUrl: "https://www.youtube.com/embed/vrZlO3pX9Q4?si=Dj2NsXXrryJsZx-I",
        imageUrl: "https://img.youtube.com/vi/vrZlO3pX9Q4/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Message",
                lessons: [
                    { title: "The Power of Belief", time: "5:00" },
                    { title: "Overcoming Limitations", time: "8:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "m2",
        icon: "Brain" as any,
        title: "The power of your subconscious mind-1",
        description: "Discover a simple yet powerful Japanese technique to overcome procrastination and build momentum towards your goals.",
        videoUrl: "https://www.youtube.com/embed/XJjB2U6OkcE?si=OEFtALH1dpeEY9HI",
        imageUrl: "https://img.youtube.com/vi/XJjB2U6OkcE/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Action Plan Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Kaizen Philosophy",
                lessons: [
                    { title: "The Power of Small Steps", time: "7:00" },
                    { title: "Applying the One-Minute Principle", time: "9:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
     {
        id: "m3",
        icon: "Brain" as any,
        title: "power of subconscious mind by joseph murphy",
        description: "An exploration of Joseph Murphy's teachings on the power of the subconscious mind to transform your life.",
        videoUrl: "https://www.youtube.com/embed/7xIGybLtmN4?si=gOsSWoYDHRsEtiHO",
        imageUrl: "https://img.youtube.com/vi/7xIGybLtmN4/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "Introduction to the Subconscious", time: "6:00" },
                    { title: "The Law of Belief", time: "9:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "m4",
        icon: "BookOpen" as any,
        title: "the secret animated book summary | rhonda byrne",
        description: "An animated summary of 'The Secret' by Rhonda Byrne, exploring the law of attraction and how to use it to achieve your goals.",
        videoUrl: "https://www.youtube.com/embed/9cRktx1UV6A?si=9RG0OX3qaQi7SKv-",
        imageUrl: "https://img.youtube.com/vi/9cRktx1UV6A/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Law of Attraction",
                lessons: [
                    { title: "Understanding The Secret", time: "8:00" },
                    { title: "How to Use The Secret", time: "10:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "cp4",
        icon: "Handshake" as any,
        title: "Finding your purpose (ikigai art of living)",
        description: "Discover your 'reason for being' with the Japanese concept of Ikigai. This guide helps you find purpose at the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.",
        videoUrl: "https://www.youtube.com/embed/4LE5bel_GvU?si=E07k3l4PbNJjP1YT",
        imageUrl: "https://i.postimg.cc/FKk0q9Lq/career-course-4.png",
        price: "Free",
        resources: [{ name: "Proposal Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Freelancing Fundamentals",
                lessons: [
                    { title: "Setting Up Your Freelance Profile", time: "10:00" },
                    { title: "Crafting Winning Proposals", time: "12:30" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "ls4",
        icon: "BookUser" as any,
        title: "self realization (the strangest secret)",
        description: "Unlock your potential and change your life by understanding the powerful message in Earl Nightingale's 'The Strangest Secret'.",
        videoUrl: "https://www.youtube.com/embed/l1gXZu1i8TM?si=_ZhI-iTxy0_yo3wF",
        imageUrl: "https://i.postimg.cc/fyyq0wLh/life-course-4.png",
        price: "Free",
        resources: [{ name: "Journaling Prompts", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Power of Reflection",
                lessons: [
                    { title: "Getting Started with Journaling", time: "6:00" },
                    { title: "Techniques for Deep Reflection", time: "10:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "ls10",
        icon: "Flag" as any,
        title: "How to achieve your most ambitious goals",
        description: "Learn a simple, science-backed method for setting and achieving your most ambitious goals by focusing on what's important.",
        videoUrl: "https://www.youtube.com/embed/TQMbvJNRpLE?si=X-JB8JEP32lAwJKw",
        imageUrl: "https://img.youtube.com/vi/TQMbvJNRpLE/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Setting Mastery",
                lessons: [
                    { title: "The Science of Goal Achievement", time: "10:00" },
                    { title: "Creating Actionable Steps", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
    {
        id: "ls8",
        icon: "Brain" as any,
        title: "How to Build a Brain That Doesn't Get Distracted",
        description: "Learn a science-based, four-step process to improve your focus, overcome digital distractions, and achieve deep work in a noisy world.",
        videoUrl: "https://www.youtube.com/embed/sAHlZMDHYhY?si=L2AmfrB_6GKCEhyX",
        imageUrl: "https://img.youtube.com/vi/sAHlZMDHYhY/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Focus Techniques PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Mastering Focus",
                lessons: [
                    { title: "Understanding the Distraction Loop", time: "10:00" },
                    { title: "Techniques for Deep Work", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/motivation"
    },
];

const moneySkillsCourses: Course[] = [
    {
        id: "ms1",
        icon: "Banknote" as any,
        title: "How to manage your money so you may never go broke",
        description: "Learn a simple yet powerful 5-step rule for money management to help you create a budget, save effectively, and secure your financial future.",
        videoUrl: "https://www.youtube.com/embed/VaiqGsot5ws?si=Dn5qPttqB7Vryke7",
        imageUrl: "https://i.postimg.cc/0Q3S0ypr/money-course-1.png",
        price: "Free",
        resources: [{ name: "Budgeting Spreadsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Financial Foundations",
                lessons: [
                    { title: "The 50/30/20 Budgeting Rule", time: "8:00" },
                    { title: "Tools for Tracking Spending", time: "9:30" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms2",
        icon: "ShieldCheck" as any,
        title: "15 Assets That Are Making People Rich",
        description: "Explore 15 different types of assets, from traditional stocks and real estate to modern digital assets, that have the potential to build wealth.",
        videoUrl: "https://www.youtube.com/embed/BKoTLf_D4xo?si=407pM8g7eTuCrcz-",
        imageUrl: "https://i.postimg.cc/kG8wM3M1/money-course-2.png",
        price: "Free",
        resources: [{ name: "15 Assets That Are Making People Rich pdf", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Secure Transactions",
                lessons: [
                    { title: "Common UPI Scams and How to Avoid Them", time: "7:00" },
                    { title: "Best Practices for Digital Wallets", time: "6:30" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms3",
        icon: "CandlestickChart" as any,
        title: "Intro to Saving & Mutual Funds",
        description: "Get a clear, beginner-friendly introduction to the world of saving and investing, with a special focus on understanding mutual funds.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/prpW1pS3/money-course-3.png",
        price: "Free",
        resources: [{ name: "Investment Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Building Wealth",
                lessons: [
                    { title: "The Power of Compounding", time: "10:00" },
                    { title: "Understanding Mutual Funds", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms4",
        icon: "DollarSign" as any,
        title: "15 Lessons Rich Parents Teach Their Kids",
        description: "Learn the crucial financial lessons and mindsets that wealthy parents often teach their children about money, assets, and investing.",
        videoUrl: "https://www.youtube.com/embed/WqA4PgRDvtY?si=KFHC7flWYLkMm8qB",
        imageUrl: "https://i.postimg.cc/WbFPhFv2/money-course-4.png",
        price: "Free",
        resources: [{ name: "Glossary of Terms", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Your First Investment",
                lessons: [
                    { title: "Stocks, Bonds, and ETFs Explained", time: "12:00" },
                    { title: "How to Start Investing with Small Amounts", time: "9:00" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms5",
        icon: "HandCoins" as any,
        title: "How to Earn Online (Side Hustles)",
        description: "Explore various practical and popular ways for students and beginners to start earning money online through side hustles.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/C1Q1b7hV/money-course-5.png",
        price: "Free",
        resources: [{ name: "List of Side Hustle Ideas", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Monetize Your Skills",
                lessons: [
                    { title: "Top 5 Online Side Hustles for Students", time: "11:00" },
                    { title: "Marketing Your Side Hustle", time: "8:30" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms6",
        icon: "DollarSign" as any,
        title: "40 Eye-opening MONEY lessons",
        description: "This video shares 40 powerful and eye-opening lessons about money that can reshape your financial mindset and habits for the better.",
        videoUrl: "https://www.youtube.com/embed/MHmDw6pJ1UM?si=Qy9zL1hMfvjoc-qa",
        imageUrl: "https://i.postimg.cc/fTdG4Y12/money-course-6.png",
        price: "Free",
        resources: [{ name: "Key Lessons PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Eye-opening Lessons",
                lessons: [
                    { title: "Understanding Assets vs. Liabilities", time: "10:00" },
                    { title: "The Mindset of Wealth", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms7",
        icon: "Landmark" as any,
        title: "Indian Tax System Explained",
        description: "A clear and simple explanation of the Indian tax system, covering direct vs. indirect taxes, GST, and income tax slabs.",
        videoUrl: "https://www.youtube.com/embed/MQpbxF_RngI?si=raxJvpACcfzGtsGX",
        imageUrl: "https://i.postimg.cc/L8yR1xZJ/money-course-7.png",
        price: "Free",
        resources: [{ name: "Tax System Overview PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding Indian Taxes",
                lessons: [
                    { title: "Direct vs. Indirect Taxes", time: "10:00" },
                    { title: "Introduction to Income Tax", time: "14:00" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    },
];

// Combine all courses into one array, this will be used on the achievements page.
export const allCourses: Course[] = [
    ...careerCourses,
    ...communicationCourses,
    ...digitalCourses,
    ...entrepreneurshipCourses,
    ...lifeSkillsCourses,
    ...moneySkillsCourses,
    ...bookCourses,
    ...motivationCourses,
];

    

    
