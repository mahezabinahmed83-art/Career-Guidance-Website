import React, { useState, useEffect } from 'react';

const LoadingState: React.FC = () => {
    const messages = [
        "Analyzing your unique profile...",
        "Scanning real-time market trends...",
        "Mapping skills to opportunities...",
        "Crafting your personalized roadmap...",
        "Finalizing your career paths..."
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <svg className="animate-spin h-12 w-12 text-indigo-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Building Your Future...</h2>
            <p className="text-gray-600 transition-opacity duration-500">{messages[currentMessageIndex]}</p>
        </div>
    );
};

export default LoadingState;