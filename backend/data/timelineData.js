// Timeline seed data (career + skill milestones and scholarships).
// `icon` is stored as a string name that the frontend maps to a lucide component.
const timeline = [
  // Career path
  { type: 'milestone', milestoneType: 'career', year: '2025', title: 'Full Stack Developer', company: 'NESAB Vehicle Oil', desc: 'Currently leading full stack development, designing database architectures and building responsive web tools to optimize company operations.', icon: 'Rocket', position: 'top', sortOrder: 1 },
  { type: 'milestone', milestoneType: 'career', year: '2025', title: 'Full Stack Developer Intern', company: 'JPII TVET Institute', desc: 'Assisted development team on the web project, integrating complex databases and optimizing site performance for users.', icon: 'Building2', position: 'bottom', sortOrder: 2 },
  { type: 'milestone', milestoneType: 'career', year: '2024', title: 'Web Development Certificate', company: 'St. John Paul II TVET Institute', desc: 'Completed intensive 160-hour technical program in web development.', icon: 'GraduationCap', position: 'top', sortOrder: 3 },
  { type: 'milestone', milestoneType: 'career', year: '2024', title: 'High School Diploma', company: 'Meweda General Secondary School', desc: 'Graduated with GPA 475/600. Gold Medal winner.', icon: 'GraduationCap', position: 'bottom', sortOrder: 4 },

  // Skills
  { type: 'milestone', milestoneType: 'skill', year: '2024', title: 'Medical Volunteer', company: 'Community Health', desc: 'Volunteered in medical outreach, supporting patients and health workers — learning empathy, discipline, and grace under pressure.', icon: 'HeartPulse', position: 'top', sortOrder: 10 },
  { type: 'milestone', milestoneType: 'skill', year: '2023', title: 'Automotive Technician', company: 'Learned & Worked', desc: 'Trained and worked hands-on in automotive repair and maintenance — where precision, diagnostics, and patient problem-solving became second nature.', icon: 'Wrench', position: 'bottom', sortOrder: 11 },
  { type: 'milestone', milestoneType: 'skill', year: '2023', title: 'Business Studies', company: 'Entrepreneurship', desc: 'Completed a business class covering fundamentals of management, markets, and entrepreneurship — the mindset behind building things people need.', icon: 'Briefcase', position: 'top', sortOrder: 12 },
  { type: 'milestone', milestoneType: 'skill', year: '2024', title: 'Python & Data Structures', company: 'Self-Taught', desc: 'Built a strong foundation in Python, data structures, and algorithms — solving 100+ coding challenges across multiple platforms.', icon: 'Award', position: 'bottom', sortOrder: 13 },
  { type: 'milestone', milestoneType: 'skill', year: '2024', title: 'JavaScript & React', company: 'Self-Taught', desc: 'Mastered modern JavaScript (ES6+) and React — building interactive UIs, managing state, and integrating RESTful APIs.', icon: 'Award', position: 'top', sortOrder: 14 },
  { type: 'milestone', milestoneType: 'skill', year: '2024', title: 'Web Design & UI/UX', company: 'Self-Taught', desc: 'Learned responsive design principles, Figma prototyping, and accessibility — crafting interfaces that are both beautiful and usable.', icon: 'Award', position: 'bottom', sortOrder: 15 },
  { type: 'milestone', milestoneType: 'skill', year: '2025', title: 'Full Stack Development', company: 'MERN Stack', desc: 'Built production-grade full stack applications with MongoDB, Express, React, Node.js — from authentication to deployment on Vercel.', icon: 'Award', position: 'top', sortOrder: 16 },
  { type: 'milestone', milestoneType: 'skill', year: '2025', title: 'Problem Solving & Algorithms', company: 'Ongoing', desc: 'Continuously sharpening analytical thinking and algorithmic problem-solving through real-world projects and coding practice.', icon: 'Award', position: 'bottom', sortOrder: 17 },

  // Scholarships
  { type: 'scholarship', title: 'Missouri University', place: 'United States', year: '2024', status: 'Declined', desc: 'Awarded a scholarship offer; respectfully declined due to personal circumstances.', sortOrder: 20 },
  { type: 'scholarship', title: 'University of Global Health Equity (UGHE)', place: 'Rwanda', year: '2025', status: 'Declined', desc: 'Accepted into a competitive program; declined to pursue a different path.', sortOrder: 21 },
  { type: 'scholarship', title: 'Russian Government Scholarship', place: 'education-in-russia.com', year: '2025', status: 'In Progress', desc: 'Passed the second stage of selection — currently awaiting the university invitation to begin the visa process.', sortOrder: 22 },
  { type: 'scholarship', title: 'DAAD Scholarship', place: 'Germany', year: '2025', status: 'Declined', desc: 'Invited to apply for the DAAD EPOS program; declined due to preference for Russian Government program.', sortOrder: 23 },
  { type: 'scholarship', title: 'Turkish Government Scholarship', place: 'Turkey', year: '2024', status: 'Declined', desc: 'Received an acceptance letter through the Türkiye Bursları program; declined due to personal reasons.', sortOrder: 24 },
  { type: 'scholarship', title: 'Ethiopian Ministry Scholarship', place: 'Ethiopia', year: '2023', status: 'Declined', desc: 'Awarded a national merit-based scholarship for university; declined to pursue international opportunities.', sortOrder: 25 },
  { type: 'scholarship', title: 'AFS Intercultural Exchange', place: 'USA', year: '2022', status: 'Declined', desc: 'Selected as a finalist for a year-long cultural exchange program in the United States; ultimately not placed.', sortOrder: 26 },
  { type: 'scholarship', title: 'Mastercard Foundation Scholarship', place: 'Multiple Countries', year: '2024', status: 'Declined', desc: 'Reached the final round of the competitive Mastercard Foundation scholars program; not selected for the final cohort.', sortOrder: 27 },
];

module.exports = timeline;
