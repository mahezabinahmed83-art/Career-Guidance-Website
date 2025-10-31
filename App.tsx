import React, { useState, useCallback } from 'react';
import { AppState, UserData, CareerPath } from './types';
import { generateCareerGuidance } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import AssessmentForm from './components/AssessmentForm';
import QuizForm from './components/QuizForm';
import LoadingState from './components/LoadingState';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.QUIZ);
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleQuizNext = useCallback((data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
    setAppState(AppState.ASSESSMENT);
  }, []);

  const handleAssessmentSubmit = useCallback(async (assessmentData: Partial<UserData>) => {
    const finalUserData = { ...userData, ...assessmentData } as UserData;
    setUserData(finalUserData);
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const paths = await generateCareerGuidance(finalUserData);
      setCareerPaths(paths);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('Sorry, we encountered an error while generating your career path. Please try again.');
      setAppState(AppState.QUIZ); // Go back to the first page on error
    }
  }, [userData]);
  
  const handleBackToQuiz = useCallback(() => {
    setAppState(AppState.QUIZ);
  }, []);

  const handleBackToAssessment = useCallback(() => {
    setAppState(AppState.ASSESSMENT);
  }, []);

  const handleStartOver = useCallback(() => {
    setUserData({});
    setCareerPaths([]);
    setError(null);
    setAppState(AppState.QUIZ);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingState />;
      case AppState.RESULTS:
        return <ResultsDisplay careerPaths={careerPaths} onStartOver={handleStartOver} onBack={handleBackToAssessment} />;
      case AppState.ASSESSMENT:
        return <AssessmentForm onSubmit={handleAssessmentSubmit} onBack={handleBackToQuiz} initialData={userData} error={error} />;
      case AppState.QUIZ:
      default:
        return <QuizForm onNext={handleQuizNext} initialData={userData} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;