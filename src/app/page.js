import React from 'react';
import LoginForm from './components/Login_Form';

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <main>
        <div className="flex flex-col w-full items-center">
           <h1 className="text-4xl font-bold text-black w-auto mx-auto">Pokédex</h1>
           <img alt='Usuario_Pokedex' className="h-30 w-30 m-5" src='https://cdn-icons-png.flaticon.com/512/362/362003.png'></img>
           <LoginForm />
        </div>

      </main>
    </div>
  );
}

