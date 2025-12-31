export type LearningGoal = 'Career Transition' | 'Skill Mastery' | 'Portfolio Review';

export type Industry = 'Fintech' | 'EdTech' | 'SaaS' | 'HealthTech' | 'E-commerce' | 'AI & ML';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Senior/Lead';

export type Language = 'English' | 'Spanish' | 'French' | 'Mandarin' | 'Hindi' | 'Arabic' | 'Portuguese';

export type BudgetRange = 'Free (Community)' | '$20 - $50' | '$50 - $100' | '$100+';

export type PreferredDays = 'Weekdays' | 'Weekends' | 'Mon - Wed' | 'Thu - Fri' | 'Fully Flexible';

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
  availability: string[]; // Days of the week like ['Monday', 'Tuesday']
}

export type Step = 'WELCOME' | 'SEARCH' | 'RECOMMENDATIONS' | 'PROFILE_VIEW' | 'BOOKING_CONFIRMED' | 'WHY_MENTORSHIP';