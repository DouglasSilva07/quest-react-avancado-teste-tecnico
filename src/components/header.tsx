import React from 'react';


export const Header: React.FC = () => {
  return (
    <header className="flex flex-col justify-center items-center m-3
    max-lg:mt-12">
      <h1 className="flex items-center mb-3">
        <img
          src="../International_Pokémon_logo.svg"
          alt="Pokemon Logo"
          className="h-auto w-72"
        />
      </h1>
    </header>
  );
};