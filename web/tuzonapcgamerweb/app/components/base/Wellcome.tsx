import React from 'react';

export default function Wellcome(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bienvenido al Sistema de Inventarios
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-400">
                Tuzona PC Gamer
            </h2>
        </div>
    );
}