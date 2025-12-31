import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { 
  WelcomeView, 
  SearchView,
  RecommendationsView, 
  ProfileView, 
  ConfirmedView,
  WhyMentorshipView
} from './components/StepViews';
import { Step, LearningGoal, Industry, Mentor, ExperienceLevel, Language, BudgetRange, PreferredDays } from './types';
import { generateMentors } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('WELCOME');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | null>(null);
  const [selectedDays, setSelectedDays] = useState<PreferredDays | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoalSelect = (goal: LearningGoal) => {
    setSelectedGoal(goal);
    setStep('SEARCH');
  };

  const handleSearch = async (industry: Industry, level: ExperienceLevel, lang: Language, budget: BudgetRange, days: PreferredDays) => {
    setSelectedIndustry(industry);
    setSelectedExperience(level);
    setSelectedLanguage(lang);
    setSelectedBudget(budget);
    setSelectedDays(days);
    
    setStep('RECOMMENDATIONS');
    setIsLoading(true);
    
    try {
      if (selectedGoal) {
        const results = await generateMentors(
          selectedGoal, 
          industry, 
          level, 
          lang,
          budget,
          days
        );
        setMentors(results);
      }
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
    setStep('BOOKING_CONFIRMED');
  };

  const handleReset = () => {
    setStep('WELCOME');
    setSelectedGoal(null);
    setSelectedIndustry(null);
    setSelectedExperience(null);
    setSelectedLanguage(null);
    setSelectedBudget(null);
    setSelectedDays(null);
    setMentors([]);
    setSelectedMentor(null);
  };

  const getStepNumber = (): number => {
    switch(step) {
      case 'WELCOME': return 1;
      case 'WHY_MENTORSHIP': return 1;
      case 'SEARCH': return 2;
      case 'RECOMMENDATIONS': return 3;
      case 'PROFILE_VIEW': return 4;
      case 'BOOKING_CONFIRMED': return 5;
      default: return 1;
    }
  };

  return (
    <Layout step={getStepNumber()} onLogoClick={handleReset}>
      {step === 'WELCOME' && (
        <WelcomeView 
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
          mentor={selectedMentor} 
          onReset={handleReset} 
        />
      )}
    </Layout>
  );
};

export default App;