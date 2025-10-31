import React from 'react';
import { CareerPath } from '../types';
import CareerCard from './CareerCard';

interface ResultsDisplayProps {
  careerPaths: CareerPath[];
  onStartOver: () => void;
  onBack: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ careerPaths, onStartOver, onBack }) => {
  return (
    <div className="w-full max-w-7xl">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">Your Personalized Career Roadmap</h2>
        <p className="mt-3 text-lg text-gray-600">Here are 3 potential paths tailored just for you.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {careerPaths.map((path, index) => (
          <CareerCard key={index} careerPath={path} />
        ))}
      </div>

      <div className="text-center flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onStartOver}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;