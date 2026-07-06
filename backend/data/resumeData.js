// Starting résumé content (from Amar's CV). Editable afterwards via the admin panel.
module.exports = {
  title: 'Full Stack Developer & Medical Advocate',
  summary:
    "An adaptable professional bridging community health, software development, and refugee advocacy. As an alumnus of Kepler Iteme, I mentor displaced youth and facilitate access to higher education — building high-impact digital tools, securing funding for entrepreneurial ventures, and providing clinical and logistical support in medical outreach programs.",
  contact: {
    email: 'amarshisheno@gmail.com',
    phone: '+251 93 368 0059',
    location: 'Addis Ababa, Ethiopia',
    website: 'amar-shesheno-luxury.vercel.app',
  },
  photo: '/profile.png',
  pdfUrl: '/Amar-Hassen-Mohammednur-Resume.pdf',
  technical: ['MERN Stack', 'Python (OOP)', 'PHP', 'HTML / CSS', 'E-Commerce'],
  medical: ['Clinical Intake', 'Vital Measurement', 'BP & FBS', 'Health Education', 'Medical Interpretation'],
  languages: [
    { name: 'English', level: 'Fluent', pct: 100 },
    { name: 'Amharic', level: 'Fluent', pct: 100 },
    { name: 'Arabic', level: 'Fluent · Interpreter', pct: 95 },
    { name: 'Korean', level: 'Intermediate', pct: 55 },
    { name: 'Russian', level: 'Beginner', pct: 25 },
  ],
  leadership: [
    {
      title: 'Clinical Volunteer & Intake Specialist',
      org: 'Tesfa Medical Care Team & Rotaract Clubs',
      date: '2024 — Present',
      points: [
        'Managed logistics and clinical intake for large-scale Breast Cancer Screening events.',
        'Measured patient vitals, including Blood Pressure and Fasting Blood Sugar (FBS).',
        'Consulted elderly community members on minimizing risks of diabetes and strokes.',
        'Shadowed senior physicians during surgical procedures for womb cancer removal.',
      ],
    },
    {
      title: 'Refugee Education Advocate',
      org: 'Independent / Kepler Iteme Alumni',
      date: '2024 — Present',
      points: [
        'Mentored fellow refugees through the Kepler Iteme application and onboarding processes.',
        'Founded a Telegram channel providing academic materials to high-school students for ESSLCE.',
        "Designed and built 'The Learning Launchpad', a custom educational website for mentoring.",
      ],
    },
  ],
  experience: [
    {
      title: 'Co-Founder & Full Stack Developer',
      org: 'NESAB — Vehicle Lubricants Startup',
      date: '2024 — 2025',
      points: [
        'Co-founded a vehicle oil reseller company, competing in a national startup competition.',
        'Pitched and secured 400,700 ETB in startup funding.',
        "Designed, developed, and launched the company's e-commerce platform on the MERN stack and Python.",
      ],
    },
  ],
  education: [
    { school: 'Kepler', detail: 'Iteme Program Alumnus · Intensive 2-Month Program', date: '2024', note: 'Web Development — Gold' },
    { school: 'St. John Paul II TVET', detail: 'Automotive Technician · TVET Program', date: '2024', note: '6-Month Program' },
    { school: 'Meweda General Secondary', detail: 'High School Diploma', date: '2024', note: 'ESSLCE: 475 / 600' },
  ],
};
