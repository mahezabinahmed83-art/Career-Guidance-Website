import React, { useState } from 'react';
import { UserData, LearningStyle } from '../types';

interface AssessmentFormProps {
  onSubmit: (data: Partial<UserData>) => void;
  onBack: () => void;
  initialData: Partial<UserData>;
  error: string | null;
}

const SkillsIllustration: React.FC = () => (
    <div className="hidden lg:flex items-center justify-center p-8">
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#f472b6', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity:1}} />
                </linearGradient>
            </defs>
            <path d="M150,50 Q200,20 250,50 T350,50" stroke="url(#grad1)" fill="none" strokeWidth="10" strokeLinecap="round"/>
            <path d="M50,150 Q80,100 150,120 T250,150" stroke="url(#grad2)" fill="none" strokeWidth="10" strokeLinecap="round"/>
            <path d="M100,250 Q150,220 200,250 T300,250" stroke="url(#grad1)" fill="none" strokeWidth="10" strokeLinecap="round"/>
            <path d="M70,350 Q120,300 200,320 T330,350" stroke="url(#grad2)" fill="none" strokeWidth="10" strokeLinecap="round"/>
            <circle cx="100" cy="80" r="15" fill="url(#grad1)"/>
            <circle cx="300" cy="120" r="20" fill="url(#grad2)"/>
            <circle cx="80" cy="220" r="10" fill="url(#grad2)"/>
            <circle cx="320" cy="280" r="25" fill="url(#grad1)"/>
        </svg>
    </div>
);


const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, onBack, initialData, error }) => {
  const [interests, setInterests] = useState(initialData.interests || '');
  const [skills, setSkills] = useState(initialData.skills || '');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(initialData.learningStyle || LearningStyle.VISUAL);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests.trim() || !skills.trim()) {
      setFormError('Please fill out your interests and skills.');
      return;
    }
    setFormError('');
    onSubmit({ interests, skills, learningStyle });
  };

  return (
    <div className="w-full max-w-5xl bg-white/70 rounded-2xl shadow-2xl p-4 md:p-8 backdrop-blur-lg border border-gray-200 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Tell Us About Your Skills</h2>
        <p className="text-center text-gray-600 mb-8">This helps us understand where you shine.</p>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">{error}</div>}
        {formError && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6 text-center">{formError}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">What are your interests & passions?</label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              rows={4}
              className="w-full bg-gray-100/70 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400 text-gray-800"
              placeholder="e.g., building web applications, data science, creative design, problem-solving"
              required
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">What are your current skills?</label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={4}
              className="w-full bg-gray-100/70 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400 text-gray-800"
              placeholder="e.g., JavaScript, Python, UI/UX design, communication"
              required
            />
          </div>
          <div>
            <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700 mb-2">What is your preferred learning style?</label>
            <select
              id="learningStyle"
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
              className="w-full bg-gray-100/70 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800"
            >
              {Object.values(LearningStyle).map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                  Back
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg"
              >
                Generate My Path
              </button>
          </div>
        </form>
      </div>
      <SkillsIllustration />
    </div>
  );
};

export default AssessmentForm;