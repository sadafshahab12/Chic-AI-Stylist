import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2 tracking-tight">
        <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-rose-500 to-purple-600 drop-shadow-sm italic">
          ChicAI Stylist 
        </span>
        <span className="ml-2 inline-block animate-bounce-slow not-italic">✨</span>
      </h1>
      <p className="text-slate-500 text-lg font-medium mt-2">
        Curate your closet, elevate your style.
      </p>
    </header>
  );
};

export default Header;