import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
          Smart Career Guidance Assistant
        </h1>
      </div>
    </header>
  );
};

export default Header;