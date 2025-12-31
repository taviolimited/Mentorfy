import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { 
  WelcomeView, 
  SearchView,
  RecommendationsView, 
  ProfileView, 
  ConfirmedView,
  WhyMentorshipView,
  DashboardView
} from './components/StepViews';
import { Step, LearningGoal, Industry, Mentor, ExperienceLevel, Language, BudgetRange, DayOfWeek, TimeSlot, Session } from './types';
import { generateMentors } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('WELCOME');
  const [menteeName, setMenteeName] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | null>(null);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dashboard specific state
  const [bookedSessions, setBookedSessions] = useState<Session[]>([]);
  const [hasVisitedDashboard, setHasVisitedDashboard] = useState(false);

  const handleNameSubmit = (name: string) => {
    setMenteeName(name);
  };

  const handleGoalSelect = (goal: LearningGoal) => {
    setSelectedGoal(goal);
    setStep('SEARCH');
  };

  const handleSearch = async (industry: Industry, level: ExperienceLevel, lang: Language, budget: BudgetRange, days: DayOfWeek[], slots: TimeSlot[]) => {
    setSelectedIndustry(industry);
    setSelectedExperience(level);
    setSelectedLanguage(lang);
    setSelectedBudget(budget);
    setSelectedDays(days);
    setSelectedSlots(slots);
    
    setStep('RECOMMENDATIONS');
    setIsLoading(true);
    
    try {
      const results = await generateMentors(
        selectedGoal || 'Career Transition', 
        industry, 
        level, 
        lang,
        budget,
        days,
        slots
      );
      setMentors(results);
    } catch (error) {
      console.error("Error generating mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMentorSelect = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setStep('PROFILE_VIEW');
  };

  const handleBooking = () => {
    if (selectedMentor) {
      const newSession: Session = {
        id: Math.random().toString(36).substr(2, 9),
        mentor: selectedMentor,
        date: "Monday, Oct 12", // Mocked date
        time: selectedMentor.timeSlots[0] || "10:00 AM",
        status: 'upcoming'
      };
      setBookedSessions(prev => [newSession, ...prev]);
      setStep('BOOKING_CONFIRMED');
    }
  };

  const handleReset = () => {
    setStep('WELCOME');
    setSelectedMentor(null);
  };

  const goToDashboard = () => {
    setStep('DASHBOARD');
    setHasVisitedDashboard(true);
  };

  const getStepNumber = (): number => {
    switch(step) {
      case 'WELCOME': return 1;
      case 'WHY_MENTORSHIP': return 1;
      case 'SEARCH': return 2;
      case 'RECOMMENDATIONS': return 3;
      case 'PROFILE_VIEW': return 4;
      case 'BOOKING_CONFIRMED': return 5;
      case 'DASHBOARD': return 5;
      default: return 1;
    }
  };

  return (
    <Layout 
      step={getStepNumber()} 
      onLogoClick={handleReset}
      onDashboardClick={goToDashboard}
      showDashboardLink={bookedSessions.length > 0}
    >
      {step === 'WELCOME' && (
        <WelcomeView 
          menteeName={menteeName}
          onNameSubmit={handleNameSubmit}
          onSelect={handleGoalSelect} 
          onLearnMore={() => setStep('WHY_MENTORSHIP')}
        />
      )}

      {step === 'WHY_MENTORSHIP' && (
        <WhyMentorshipView onBack={() => setStep('WELCOME')} />
      )}
      
      {step === 'SEARCH' && (
        <SearchView 
          onSearch={handleSearch} 
          onBack={() => setStep('WELCOME')}
        />
      )}
      
      {step === 'RECOMMENDATIONS' && (
        <RecommendationsView 
          mentors={mentors} 
          onSelect={handleMentorSelect} 
          isLoading={isLoading} 
          onBack={() => setStep('SEARCH')}
        />
      )}
      
      {step === 'PROFILE_VIEW' && selectedMentor && (
        <ProfileView 
          mentor={selectedMentor} 
          onBook={handleBooking} 
          onBack={() => setStep('RECOMMENDATIONS')} 
        />
      )}
      
      {step === 'BOOKING_CONFIRMED' && selectedMentor && (
        <ConfirmedView 
          menteeName={menteeName}
          mentor={selectedMentor} 
          onGoToDashboard={goToDashboard}
          onReset={handleReset} 
        />
      )}

      {step === 'DASHBOARD' && (
        <DashboardView 
          menteeName={menteeName}
          sessions={bookedSessions}
          goal={selectedGoal}
          recommendedMentors={mentors.filter(m => !bookedSessions.find(s => s.mentor.id === m.id))}
          onFindMore={handleReset}
          onViewMentor={handleMentorSelect}
        />
      )}
    </Layout>
  );
};

export default App;