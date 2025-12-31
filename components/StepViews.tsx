import React, { useState } from 'react';
import { LearningGoal, Industry, Mentor, ExperienceLevel, Language, BudgetRange, PreferredDays } from '../types';

const GoalIcon = ({ type }: { type: LearningGoal }) => {
  const paths = {
    'Career Transition': "M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745V6.745C5.78 5.62 8.817 5 12 5c3.183 0 6.22.62 9 1.745v6.51Z M3 10.5h18",
    'Skill Mastery': "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3",
    'Portfolio Review': "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
  };
  return (
    <svg className="w-10 h-10 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type]} />
    </svg>
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="flex items-center text-indigo-600 font-medium mb-4 hover:underline transition-all hover:-translate-x-1"
  >
    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>
);

const AvailabilityCalendar: React.FC<{ availableDays: string[] }> = ({ availableDays }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  // Simple calendar logic for the current month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isAvailable = (dayNum: number | null) => {
    if (!dayNum) return false;
    const date = new Date(today.getFullYear(), today.getMonth(), dayNum);
    const dayName = fullDays[date.getDay()];
    return availableDays.includes(dayName);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold text-gray-900">{month} {year}</h4>
        <div className="flex gap-2">
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
             <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Available</span>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map(d => (
          <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const available = isAvailable(day);
          return (
            <div 
              key={i} 
              className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all
                ${!day ? 'bg-transparent' : ''}
                ${day && available ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-105 cursor-pointer hover:bg-indigo-700' : 'text-gray-400'}
                ${day && !available ? 'bg-gray-50/50' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WelcomeView: React.FC<{ 
  onSelect: (g: LearningGoal) => void,
  onLearnMore: () => void 
}> = ({ onSelect, onLearnMore }) => (
  <div className="flex-1 flex flex-col items-center text-center">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome to Mentorfy</h2>
    <p className="text-lg text-gray-500 mb-12">First things first, what's your primary learning goal today?</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
      {(['Career Transition', 'Skill Mastery', 'Portfolio Review'] as LearningGoal[]).map((goal) => (
        <button
          key={goal}
          onClick={() => onSelect(goal)}
          className="group p-8 border-2 border-gray-100 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-left flex flex-col items-center md:items-start"
        >
          <GoalIcon type={goal} />
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700">{goal}</h3>
          <p className="text-sm text-gray-500 text-center md:text-left line-clamp-2">
            {goal === 'Career Transition' && "Get guidance on changing paths, industries, or landing a new role."}
            {goal === 'Skill Mastery' && "Deep dive into specific technical or soft skills with an expert."}
            {goal === 'Portfolio Review' && "Get expert feedback on your projects, case studies, or resume."}
          </p>
        </button>
      ))}
    </div>

    <button 
      onClick={onLearnMore}
      className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-2 group transition-all"
    >
      <span>New to mentorship? Learn why it matters</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
);

export const WhyMentorshipView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex-1 flex flex-col">
    <BackButton onClick={onBack} />
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why Mentorship?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Accelerated Growth</h3>
          <p className="text-gray-600">A mentor provides the "shortcut" to success by sharing lessons from their own failures and triumphs.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Expanded Network</h3>
          <p className="text-gray-600">Gain access to communities and professionals you might not reach on your own.</p>
        </div>
      </div>
      <button 
        onClick={onBack}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
      >
        Got it, let's find my mentor
      </button>
    </div>
  </div>
);

export const SearchView: React.FC<{ 
  onSearch: (industry: Industry, level: ExperienceLevel, lang: Language, budget: BudgetRange, days: PreferredDays) => void,
  onBack: () => void 
}> = ({ onSearch, onBack }) => {
  const [industry, setIndustry] = useState<Industry>('Fintech');
  const [level, setLevel] = useState<ExperienceLevel>('Beginner');
  const [lang, setLang] = useState<Language>('English');
  const [budget, setBudget] = useState<BudgetRange>('$20 - $50');
  const [days, setDays] = useState<PreferredDays>('Fully Flexible');

  const industries: Industry[] = ['Fintech', 'EdTech', 'SaaS', 'HealthTech', 'E-commerce', 'AI & ML'];
  const levels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Senior/Lead'];
  const languages: Language[] = ['English', 'Spanish', 'French', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese'];
  const budgets: BudgetRange[] = ['Free (Community)', '$20 - $50', '$50 - $100', '$100+'];
  const preferredDays: PreferredDays[] = ['Weekdays', 'Weekends', 'Mon - Wed', 'Thu - Fri', 'Fully Flexible'];

  return (
    <div className="flex-1 flex flex-col">
      <BackButton onClick={onBack} />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Customize your search</h2>
      <p className="text-gray-500 mb-8">Refine the criteria to find the best match for your needs.</p>
      
      <div className="space-y-8 max-w-2xl">
        <section>
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Target Industry</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {industries.map(i => (
              <button
                key={i}
                onClick={() => setIndustry(i)}
                className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${industry === i ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
              >
                {i}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Your Experience Level</label>
          <div className="grid grid-cols-2 gap-3">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${level === l ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <section>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Preferred Language</label>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-indigo-600 focus:ring-0 outline-none transition-colors"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </section>

          <section>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Hourly Budget</label>
            <select 
              value={budget} 
              onChange={(e) => setBudget(e.target.value as BudgetRange)}
              className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-indigo-600 focus:ring-0 outline-none transition-colors"
            >
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </section>
        </div>

        <section>
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Preferred Days</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {preferredDays.map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${days === d ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={() => onSearch(industry, level, lang, budget, days)}
          className="w-full mt-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5"
        >
          Discover Mentors
        </button>
      </div>
    </div>
  );
};

export const RecommendationsView: React.FC<{ 
  mentors: Mentor[], 
  onSelect: (m: Mentor) => void,
  isLoading: boolean,
  onBack: () => void
}> = ({ mentors, onSelect, isLoading, onBack }) => (
  <div className="flex-1 flex flex-col">
    {!isLoading && <BackButton onClick={onBack} />}
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        {isLoading ? "Finding your matches..." : "Top Recommended Mentors"}
      </h2>
      {!isLoading && (
        <p className="text-lg text-gray-500">Based on your goals and criteria, we found {mentors.length} perfect matches.</p>
      )}
    </div>

    {isLoading ? (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-500 font-medium">Curating your personalized mentor shortlist...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full bg-white relative hover:shadow-lg transition-shadow">
            <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-black uppercase">
              {mentor.hourlyRate} / hr
            </div>
            <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-indigo-50" />
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-indigo-600 font-semibold mb-2">{mentor.role} at {mentor.company}</p>
            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{mentor.bio}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {mentor.mentoringStyle.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase rounded tracking-wider">{tag}</span>
              ))}
            </div>
            <button 
              onClick={() => onSelect(mentor)}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const ProfileView: React.FC<{ mentor: Mentor, onBook: () => void, onBack: () => void }> = ({ mentor, onBook, onBack }) => (
  <div className="flex-1 flex flex-col">
    <BackButton onClick={onBack} />
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <div className="w-full md:w-1/3 space-y-6">
        <img src={mentor.avatar} alt={mentor.name} className="w-full aspect-square rounded-2xl object-cover shadow-lg" />
        <div className="bg-indigo-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">Hourly Rate</span>
            <span className="text-indigo-700 font-black">{mentor.hourlyRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">Rating</span>
            <span className="text-indigo-700 font-bold">{mentor.rating} ★</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">Sessions</span>
            <span className="text-indigo-700 font-bold">{mentor.sessionCount}+</span>
          </div>
        </div>
        
        <section>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Availability</h3>
          <AvailabilityCalendar availableDays={mentor.availability} />
        </section>
      </div>
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-1">{mentor.name}</h2>
          <p className="text-xl text-indigo-600 font-medium">{mentor.role} at {mentor.company}</p>
        </div>
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About Me</h3>
          <p className="text-gray-600 leading-relaxed text-lg">{mentor.bio}</p>
        </section>
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Success Stories</h3>
          <ul className="space-y-4">
            {mentor.successStories.map((story, i) => (
              <li key={i} className="flex items-start">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mt-1 mr-3 shrink-0">{i+1}</span>
                <p className="text-gray-600 italic">"{story}"</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Mentoring Style</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.mentoringStyle.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold uppercase rounded-lg border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </section>
        <button 
          onClick={onBook}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-xl transition-all hover:scale-[1.02] active:scale-95"
        >
          Book 1:1 Intro Session
        </button>
      </div>
    </div>
  </div>
);

export const ConfirmedView: React.FC<{ mentor: Mentor, onReset: () => void }> = ({ mentor, onReset }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
      <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">You're all set!</h2>
    <p className="text-xl text-gray-600 mb-8 max-w-md">
      Your session with <span className="font-bold text-indigo-600">{mentor.name}</span> has been booked.
    </p>
    <button onClick={onReset} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black">
      Start New Discovery
    </button>
  </div>
);