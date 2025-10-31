import React from 'react';
import { CareerPath, LearningStep, LearningResource } from '../types';

const ArrowRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const BookOpenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const ResourceLink: React.FC<{ resource: LearningResource }> = ({ resource }) => (
    <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition-colors"
    >
        <BookOpenIcon />
        <span className="flex-grow truncate text-gray-600 hover:text-indigo-600">{resource.title} ({resource.type})</span>
        <ArrowRightIcon />
    </a>
);

const SkillTag: React.FC<{ skill: string; isGap?: boolean }> = ({ skill, isGap = false }) => (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${isGap ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {skill}
    </span>
);

const CareerCard: React.FC<{ careerPath: CareerPath }> = ({ careerPath }) => {
  return (
    <div className="bg-white/80 rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10 hover:border-indigo-300">
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-3">{careerPath.careerTitle}</h3>
        <p className="text-gray-600 text-sm mb-6">{careerPath.justification}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Skill Gaps</h4>
          <div className="flex flex-wrap gap-2">
            {careerPath.skillGaps.length > 0 ? (
                careerPath.skillGaps.map(skill => <SkillTag key={skill} skill={skill} isGap />)
            ) : (
                <p className="text-sm text-green-600">No skill gaps identified! Great fit.</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {careerPath.requiredSkills.map(skill => <SkillTag key={skill} skill={skill} />)}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Your Learning Roadmap</h4>
          <div className="space-y-4">
            {careerPath.learningRoadmap.map((step: LearningStep) => (
              <div key={step.step} className="bg-gray-50/70 p-4 rounded-lg border border-gray-200">
                <h5 className="font-bold text-gray-900">Step {step.step}: {step.title}</h5>
                <p className="text-sm text-gray-600 mt-1 mb-3">{step.description}</p>
                <div className="space-y-2">
                    {step.resources.map(res => <ResourceLink key={res.url} resource={res} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;