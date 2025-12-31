export type LearningGoal = 'Career Transition' | 'Skill Mastery' | 'Portfolio Review';

export type Industry = 'Fintech' | 'EdTech' | 'SaaS' | 'HealthTech' | 'E-commerce' | 'AI & ML';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Senior/Lead';

export type Language = 'English' | 'Spanish' | 'French' | 'Mandarin' | 'Hindi' | 'Arabic' | 'Portuguese';

export type BudgetRange = 'Free (Community)' | '$20 - $50' | '$50 - $100' | '$100+';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type TimeSlot = 
  | '8:00 AM' | '9:00 AM' | '10:00 AM' | '11:00 AM' 
  | '12:00 PM' | '1:00 PM' | '2:00 PM' | '3:00 PM' 
  | '4:00 PM' | '5:00 PM' | '6:00 PM' | '7:00 PM' 
  | '8:00 PM' | '9:00 PM';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: Industry;
  bio: string;
  successStories: string[];
  mentoringStyle: string[];
  avatar: string;
  rating: number;
  sessionCount: number;
  languages: string[];
  hourlyRate: string;
  availability: string[];
  timeSlots: TimeSlot[];
}

export interface Session {
  id: string;
  mentor: Mentor;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'canceled';
}

export type Step = 'WELCOME' | 'SEARCH' | 'RECOMMENDATIONS' | 'PROFILE_VIEW' | 'BOOKING_CONFIRMED' | 'WHY_MENTORSHIP' | 'DASHBOARD';
