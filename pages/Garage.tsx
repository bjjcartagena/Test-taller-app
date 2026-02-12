import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const Garage: React.FC = () => {
    const navigate = useNavigate();
    const [garage, setGarage] = useState<any[]>([]);

    useEffect(() => {
        const garageStr = localStorage.getItem('autominder_garage');
        if (garageStr) setGarage(JSON.parse(garageStr));
    }, []);

    const handleAddVehicle = () => {
        navigate('/');
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        
        if (window.confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
            const newGarage = garage.filter(v => v.id !== id);
            setGarage(newGarage);
            localStorage.setItem('autominder_garage', JSON.stringify(newGarage));

            // Clean up active ID
            const activeId = localStorage.getItem('autominder_active_id');
            if (activeId === id) {
                if (newGarage.length > 0) {
                    localStorage.setItem('autominder_active_id', newGarage[0].id);
                } else {
                    localStorage.removeItem('autominder_active_id');
                }
            }
        }
    };

    const handleSelect = (id: string) => {
        localStorage.setItem('autominder_active_id', id);
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-text-light antialiased">
            <header className="sticky top-0 z-40 w-full bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-[#f0f5f1] dark:border-[#2a3c30]">
                <div className="max-w-[960px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                     <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
                        <h1 className="text-xl font-bold tracking-tight">Mi Garaje</h1>
                    </div>
                    <div className="flex gap-2">
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[640px] mx-auto px-4 py-8 pb-24">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-black">Tus Vehículos</h2>
                </div>

                <div className="grid gap-4">
                    {garage.map((vehicle) => (
                        <div 
                            key={vehicle.id} 
                            onClick={() => handleSelect(vehicle.id)}
                            className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
                        >
                            <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-300">
                                    {vehicle.type === 'moto' ? 'two_wheeler' : 'directions_car'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">{vehicle.make} {vehicle.model}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{vehicle.mileage} km</p>
                            </div>
                            <button 
                                type="button"
                                onClick={(e) => handleDelete(e, vehicle.id)} 
                                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                                title="Eliminar vehículo"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    ))}

                    <button 
                        onClick={handleAddVehicle}
                        className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 hover:border-primary hover:text-primary transition-colors font-bold group"
                    >
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">add</span>
                        </div>
                        Añadir vehículo
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Garage;