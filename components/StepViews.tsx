
import React, { useState } from 'react';
import { LearningGoal, Industry, Mentor, ExperienceLevel, Language, BudgetRange, DayOfWeek, TimeSlot, Session } from '../types';

const GoalIcon = ({ type }: { type: LearningGoal }) => {
  const paths = {
    'Career Transition': "M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745V6.745C5.78 5.62 8.817 5 12 5c3.183 0 6.22.62 9 1.745v6.51Z M3 10.5h18",
    'Skill Mastery': "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3",
    'Portfolio Review': "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
  };
  return (
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[type]} />
      </svg>
    </div>
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="inline-flex items-center text-slate-500 font-bold text-sm uppercase tracking-wider mb-6 hover:text-indigo-600 transition-all hover:-translate-x-1"
  >
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Go Back
  </button>
);

const AvailabilityCalendar: React.FC<{ availableDays: string[] }> = ({ availableDays }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  // Fix: added parentheses to today.getMonth() to fix the addition error
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
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold text-slate-900">{month} {year}</h4>
        <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slots Open</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-3">
        {daysOfWeek.map(d => (
          <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
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
                ${day && available ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105 cursor-pointer hover:bg-indigo-700' : 'text-slate-400'}
                ${day && !available ? 'bg-white border border-slate-100' : ''}
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
  menteeName: string | null,
  onNameSubmit: (name: string) => void,
  onSelect: (g: LearningGoal) => void,
  onLearnMore: () => void 
}> = ({ menteeName, onNameSubmit, onSelect, onLearnMore }) => {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onNameSubmit(nameInput.trim());
    }
  };

  if (!menteeName) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn max-w-lg mx-auto">
        <div className="mb-6 inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Let's start with you.</h2>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed">Personalized mentorship begins with a name. Tell us yours to tailor your experience.</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="What's your name?"
              className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xl font-semibold text-slate-900 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!nameInput.trim()}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-extrabold text-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
          >
            Get Started
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center text-center animate-fadeIn">
      <div className="mb-2 uppercase tracking-widest text-xs font-black text-indigo-500">Mentorship Journey</div>
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome, <span className="text-indigo-600">{menteeName}</span>!</h2>
      <p className="text-lg text-slate-500 mb-14">Choose your primary focus to find the perfect mentor match.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
        {(['Career Transition', 'Skill Mastery', 'Portfolio Review'] as LearningGoal[]).map((goal) => (
          <button
            key={goal}
            onClick={() => onSelect(goal)}
            className="group relative p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300 text-left flex flex-col h-full"
          >
            <GoalIcon type={goal} />
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700">{goal}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              {goal === 'Career Transition' && "Get expert guidance on switching paths or landing that dream role."}
              {goal === 'Skill Mastery' && "Master specific tech stacks or soft skills with hands-on coaching."}
              {goal === 'Portfolio Review' && "Polished projects and resumes with direct feedback from pros."}
            </p>
            <div className="flex items-center text-indigo-600 font-bold text-sm">
              Explore Mentors
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={onLearnMore}
        className="inline-flex items-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-full font-bold text-base hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-50/50 transition-all group scale-100 active:scale-95 shadow-sm"
      >
        <span>Not sure yet? See how it works</span>
        <svg className="w-5 h-5 ml-3 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export const WhyMentorshipView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex-1 flex flex-col max-w-4xl mx-auto">
    <BackButton onClick={onBack} />
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">The Power of Mentorship</h2>
        <p className="text-xl text-slate-500 leading-relaxed">Don't just learn. Evolve with someone who's been there.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "Shortcut to Success", desc: "Skip the trial-and-error. Mentors provide blueprints for growth and help you avoid common industry pitfalls.", icon: "🚀" },
          { title: "Network Multiplier", desc: "Gain access to hidden job markets and industry circles that are often unreachable on your own.", icon: "🌐" },
          { title: "Confidence Boost", desc: "Regular feedback from an expert validates your skills and provides clarity in your career decisions.", icon: "⚡" },
          { title: "Real-World Context", desc: "Go beyond tutorials. Learn how things actually work inside top-tier companies.", icon: "🏢" }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <span className="text-4xl shrink-0">{item.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onBack}
        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-extrabold text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
      >
        Ready to Find a Mentor
      </button>
    </div>
  </div>
);

export const SearchView: React.FC<{ 
  onSearch: (industry: Industry, level: ExperienceLevel, lang: Language, budget: BudgetRange, days: DayOfWeek[], slots: TimeSlot[]) => void,
  onBack: () => void 
}> = ({ onSearch, onBack }) => {
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [level, setLevel] = useState<ExperienceLevel | ''>('');
  const [lang, setLang] = useState<Language | ''>('');
  const [budget, setBudget] = useState<BudgetRange | ''>('');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const industries: Industry[] = ['Fintech', 'EdTech', 'SaaS', 'HealthTech', 'E-commerce', 'AI & ML'];
  const levels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Senior/Lead'];
  const languages: Language[] = ['English', 'Spanish', 'French', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese'];
  const budgets: BudgetRange[] = ['Free (Community)', '$20 - $50', '$50 - $100', '$100+'];
  const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hourlySlots: TimeSlot[] = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];

  const toggleDay = (day: DayOfWeek) => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  const toggleSlot = (slot: TimeSlot) => setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  
  const isFormValid = industry !== '' && level !== '' && lang !== '' && budget !== '' && selectedDays.length > 0 && selectedSlots.length > 0;

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto">
      <BackButton onClick={onBack} />
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Fine-tune your search</h2>
      <p className="text-slate-500 font-medium mb-12">Tell us about your preferences to get the most accurate recommendations.</p>
      
      <div className="space-y-12">
        <section>
          <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Target Industry</label>
          <div className="flex flex-wrap gap-3">
            {industries.map(i => (
              <button
                key={i}
                onClick={() => setIndustry(i)}
                className={`px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm ${industry === i ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-slate-100'}`}
              >
                {i}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Your Experience Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${level === l ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <section>
            <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Primary Language</label>
            <div className="relative">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className={`w-full p-4 border-2 rounded-2xl bg-slate-50 appearance-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold ${lang === '' ? 'border-slate-100 text-slate-400' : 'border-indigo-600 text-slate-900'}`}
              >
                <option value="" disabled>Choose Language</option>
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </section>

          <section>
            <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Investment (Per Hour)</label>
            <div className="relative">
              <select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value as BudgetRange)}
                className={`w-full p-4 border-2 rounded-2xl bg-slate-50 appearance-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold ${budget === '' ? 'border-slate-100 text-slate-400' : 'border-indigo-600 text-slate-900'}`}
              >
                <option value="" disabled>Select Budget Range</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </section>
        </div>

        <section>
          <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-4">When are you free?</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {daysOfWeek.map(d => (
              <button
                key={d}
                onClick={() => toggleDay(d)}
                className={`px-5 py-2.5 rounded-full border-2 transition-all font-bold text-xs ${selectedDays.includes(d) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {hourlySlots.map(s => (
              <button
                key={s}
                onClick={() => toggleSlot(s)}
                className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-[11px] ${selectedSlots.includes(s) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={() => isFormValid && onSearch(industry as Industry, level as ExperienceLevel, lang as Language, budget as BudgetRange, selectedDays, selectedSlots)}
          disabled={!isFormValid}
          className={`w-full py-5 text-white rounded-2xl font-extrabold text-xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95 ${!isFormValid ? 'bg-slate-200 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
        >
          Find My Matches
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
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
        {isLoading ? "Finding your matches..." : "Top Recommended Mentors"}
      </h2>
      {!isLoading && (
        <p className="text-lg text-slate-500">Based on your goals and criteria, we found {mentors.length} perfect matches.</p>
      )}
    </div>

    {isLoading ? (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 font-medium">Curating your personalized mentor shortlist...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-full bg-white relative hover:shadow-lg transition-shadow">
            <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-black uppercase">
              {mentor.hourlyRate} / hr
            </div>
            <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-indigo-50" />
            <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
            <p className="text-sm text-indigo-600 font-semibold mb-2">{mentor.role} at {mentor.company}</p>
            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{mentor.bio}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {mentor.mentoringStyle.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded tracking-wider">{tag}</span>
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
  <div className="flex-1 flex flex-col max-w-5xl mx-auto">
    <BackButton onClick={onBack} />
    
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-[380px] space-y-8 shrink-0">
        <div className="relative">
          <img src={mentor.avatar} alt={mentor.name} className="w-full aspect-[4/5] rounded-[3rem] object-cover shadow-2xl" />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center">
             <span className="text-amber-400 text-2xl mb-1">★</span>
             <span className="text-xl font-black text-slate-900">{mentor.rating}</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-center">
            <span className="block text-2xl font-black text-indigo-600 mb-1">{mentor.sessionCount}+</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students</span>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 text-center">
            <span className="block text-xl font-black text-slate-900 mb-1">{mentor.hourlyRate}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</span>
          </div>
        </div>
        
        <AvailabilityCalendar availableDays={mentor.availability} />
      </div>

      <div className="flex-1 pt-4">
        <header className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full border border-indigo-100">Top Verified Mentor</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase rounded-full border border-slate-100">{mentor.industry} Expert</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-3 tracking-tight leading-none">{mentor.name}</h2>
          <p className="text-2xl text-indigo-600 font-semibold">{mentor.role} @ {mentor.company}</p>
        </header>

        <div className="space-y-12">
          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">About the Mentor</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">{mentor.bio}</p>
          </section>

          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Impact Stories</h3>
            <div className="space-y-4">
              {mentor.successStories.map((story, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-3xl shrink-0 opacity-40">“</span>
                  <p className="text-slate-600 italic font-medium leading-relaxed">{story}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Expertise Chips</h3>
            <div className="flex flex-wrap gap-3">
              {mentor.mentoringStyle.map(tag => (
                <span key={tag} className="px-5 py-2.5 bg-white text-slate-600 text-xs font-bold uppercase rounded-2xl border-2 border-slate-100 hover:border-indigo-600 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="sticky bottom-6 pt-10 lg:static">
            <button 
              onClick={onBook}
              className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-extrabold text-xl hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Book Discovery Call</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const DashboardView: React.FC<{ 
  menteeName: string | null,
  sessions: Session[], 
  goal: LearningGoal | null,
  recommendedMentors: Mentor[],
  onFindMore: () => void,
  onViewMentor: (m: Mentor) => void
}> = ({ menteeName, sessions, goal, recommendedMentors, onFindMore, onViewMentor }) => {
  return (
    <div className="flex-1 space-y-12 animate-fadeIn max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Hello, <span className="text-indigo-600">{menteeName}</span>.</h2>
          <p className="text-lg text-slate-500 font-medium">Tracking your progress in <span className="text-slate-900 font-bold">{goal}</span>.</p>
        </div>
        <button 
          onClick={onFindMore}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 shrink-0"
        >
          Discover Mentors
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Learning Momentum</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-300">Milestone reached</span>
                  <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-black">✓</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Overall Progress</span>
                    <span>32%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[32%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </div>

          <div className="bg-indigo-50 rounded-[2.5rem] p-8 border border-indigo-100">
            <span className="block text-4xl mb-4">💡</span>
            <h4 className="text-lg font-extrabold text-indigo-900 mb-2">Pro Tip</h4>
            <p className="text-indigo-800/70 font-medium leading-relaxed">Prepare 3 specific questions before your next session to maximize learning value.</p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Sessions</h3>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-full">{sessions.length} Scheduled</span>
            </div>
            
            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map(session => (
                  <div key={session.id} className="group flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-indigo-100 hover:shadow-xl transition-all">
                    <img src={session.mentor.avatar} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{session.mentor.name}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          {session.date}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                      Join Meet
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">🗓️</div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">No sessions found</p>
                <button onClick={onFindMore} className="text-indigo-600 font-extrabold text-lg hover:underline decoration-2 underline-offset-8">Find your first mentor</button>
              </div>
            )}
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Personalized Shortlist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedMentors.slice(0, 2).map(mentor => (
                <div key={mentor.id} onClick={() => onViewMentor(mentor)} className="p-6 bg-white border border-slate-100 rounded-3xl cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all group flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={mentor.avatar} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-50 group-hover:ring-indigo-100" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600">{mentor.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest line-clamp-1">{mentor.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-6">{mentor.bio}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{mentor.hourlyRate} /hr</span>
                    <span className="text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform">View →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const ConfirmedView: React.FC<{ 
  menteeName: string | null,
  mentor: Mentor, 
  onGoToDashboard: () => void, 
  onReset: () => void 
}> = ({ menteeName, mentor, onGoToDashboard, onReset }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center py-16 animate-fadeIn max-w-2xl mx-auto">
    <div className="w-32 h-32 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-lg shadow-green-100 relative">
      <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20 scale-125"></div>
      <svg className="w-16 h-16 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none">Excellent, {menteeName}!</h2>
    <p className="text-2xl text-slate-500 font-medium mb-12 leading-relaxed">
      Your session with <span className="font-extrabold text-indigo-600">{mentor.name}</span> is confirmed. Check your email for the meeting invite.
    </p>
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      <button onClick={onGoToDashboard} className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-extrabold text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
        Go to Dashboard
      </button>
      <button onClick={onReset} className="flex-1 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-extrabold text-xl hover:bg-slate-50 transition-all active:scale-95">
        Explore Others
      </button>
    </div>
  </div>
);
