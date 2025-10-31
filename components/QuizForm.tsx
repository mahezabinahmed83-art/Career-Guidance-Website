import React, { useState } from 'react';
import { UserData } from '../types';
import { SplineSceneBasic } from './ui/demo';

interface QuizFormProps {
    onNext: (data: Partial<UserData>) => void;
    initialData: Partial<UserData>;
}

const workEnvironmentOptions = ['Fast-paced Startup', 'Stable Corporate', 'Flexible Remote'];
const techPreferenceOptions = ['Building UIs', 'Managing Data', 'Automating Systems'];

const QuizForm: React.FC<QuizFormProps> = ({ onNext, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        age: initialData.age || '',
        dreamCareer: initialData.dreamCareer || '',
        collegePreference: initialData.collegePreference || '',
        degreeGoals: initialData.degreeGoals || '',
        abroadGoals: initialData.abroadGoals || 'Maybe',
        percentage: initialData.percentage || '',
        techPreference: initialData.techPreference || [] as string[],
        workEnvironment: initialData.workEnvironment || [] as string[],
    });
    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field: 'techPreference' | 'workEnvironment', value: string) => {
        setFormData(prev => {
            const currentValues = prev[field];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            if (newValues.length > 2) {
                return prev; 
            }

            return { ...prev, [field]: newValues };
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.age.trim()) {
            setFormError('Please fill out at least your name and age.');
            return;
        }
        if (formData.workEnvironment.length === 0 || formData.techPreference.length === 0) {
            setFormError('Please select at least one option for work environment and tech preference.');
            return;
        }
        setFormError('');
        onNext(formData as Partial<UserData>);
    };

    return (
        <div className="w-full max-w-5xl bg-white/70 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200 transition-all duration-300 overflow-hidden">
             <SplineSceneBasic />
            <div className="p-6 md:p-8">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">A Little More About You</h2>
                <p className="text-center text-gray-600 mb-8">This helps us tailor your results perfectly.</p>

                {formError && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6 text-center">{formError}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="e.g., Alex Doe" required />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                            <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="form-input" placeholder="e.g., 21" required />
                        </div>
                        <div>
                            <label htmlFor="dreamCareer" className="block text-sm font-medium text-gray-700 mb-2">Dream Career (if any)</label>
                            <input type="text" name="dreamCareer" id="dreamCareer" value={formData.dreamCareer} onChange={handleChange} className="form-input" placeholder="e.g., AI Researcher" />
                        </div>
                        <div>
                            <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-2">Recent Percentage/GPA</label>
                            <input type="text" name="percentage" id="percentage" value={formData.percentage} onChange={handleChange} className="form-input" placeholder="e.g., 85% or 3.8/4.0" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="collegePreference" className="block text-sm font-medium text-gray-700 mb-2">College Preferences</label>
                        <textarea name="collegePreference" id="collegePreference" value={formData.collegePreference} onChange={handleChange} rows={2} className="form-textarea" placeholder="e.g., Top-tier universities, specific location, online courses"></textarea>
                    </div>
                     <div>
                        <label htmlFor="degreeGoals" className="block text-sm font-medium text-gray-700 mb-2">Multiple Degree Goals</label>
                        <textarea name="degreeGoals" id="degreeGoals" value={formData.degreeGoals} onChange={handleChange} rows={2} className="form-textarea" placeholder="e.g., Masters in CS, MBA, PhD in Physics"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="abroadGoals" className="block text-sm font-medium text-gray-700 mb-2">Study Abroad Goals?</label>
                            <select name="abroadGoals" id="abroadGoals" value={formData.abroadGoals} onChange={handleChange} className="form-input">
                                <option>Yes</option>
                                <option>No</option>
                                <option>Maybe</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Environment <span className="text-gray-500">(select up to 2)</span></label>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
                                {workEnvironmentOptions.map(option => (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer custom-checkbox">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={formData.workEnvironment.includes(option)}
                                            onChange={() => handleCheckboxChange('workEnvironment', option)}
                                            disabled={formData.workEnvironment.length >= 2 && !formData.workEnvironment.includes(option)}
                                            className="hidden"
                                        />
                                        <span className="checkbox-visual"></span>
                                        <span className="text-gray-800">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Which area excites you most? <span className="text-gray-500">(select up to 2)</span></label>
                         <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
                            {techPreferenceOptions.map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer custom-checkbox">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={formData.techPreference.includes(option)}
                                        onChange={() => handleCheckboxChange('techPreference', option)}
                                        disabled={formData.techPreference.length >= 2 && !formData.techPreference.includes(option)}
                                        className="hidden"
                                    />
                                    <span className="checkbox-visual"></span>
                                    <span className="text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg"
                    >
                        Next
                    </button>
                </form>
            </div>
            <style>{`
                .form-input, .form-textarea {
                    width: 100%;
                    background-color: rgb(243 244 246 / 0.7);
                    border: 1px solid rgb(209 213 219);
                    border-radius: 0.5rem;
                    padding: 0.75rem;
                    color: #1f2937;
                    transition: all 0.2s;
                }
                .form-input::placeholder, .form-textarea::placeholder {
                    color: #9ca3af;
                }
                .form-input:focus, .form-textarea:focus {
                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                    border-color: #6366f1;
                    --tw-ring-color: #6366f1;
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                }
                .custom-checkbox .checkbox-visual {
                    display: inline-block;
                    width: 1.25rem;
                    height: 1.25rem;
                    border: 2px solid #d1d5db;
                    border-radius: 0.25rem;
                    background-color: #f3f4f6;
                    transition: all 0.2s;
                    position: relative;
                }
                .custom-checkbox input:checked + .checkbox-visual {
                    background-color: #6366f1;
                    border-color: #818cf8;
                }
                .custom-checkbox input:checked + .checkbox-visual::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 1rem;
                    line-height: 1;
                }
                .custom-checkbox input:disabled + .checkbox-visual {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default QuizForm;