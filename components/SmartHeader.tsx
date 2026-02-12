import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { canAddVehicle } from '../utils/billing';

interface SmartHeaderProps {
    title: string;
    currentVehicle?: any;
    garage: any[];
    onSwitchVehicle: (vehicle: any) => void;
}

const SmartHeader: React.FC<SmartHeaderProps> = ({ title, currentVehicle, garage, onSwitchVehicle }) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const iconMap: any = { 'car': 'directions_car', 'moto': 'two_wheeler' };

    const handleAddClick = () => {
        // Direct navigation, no payment check needed
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-[#f0f5f1] dark:border-[#2a3c30]">
            <div className="max-w-[960px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {currentVehicle ? (
                    <div 
                        className="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity select-none"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <span className="material-symbols-outlined text-2xl text-primary">{iconMap[currentVehicle.type]}</span>
                        <div className="flex flex-col leading-none">
                            <h1 className="text-sm font-bold tracking-tight capitalize">{currentVehicle.make} {currentVehicle.model}</h1>
                            <span className="text-[10px] text-text-muted">Cambiar vehículo ▼</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <span className="material-symbols-outlined text-text-muted hover:text-text-main dark:hover:text-white transition-colors">arrow_back</span>
                        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                    </div>
                )}

                <div className="flex gap-2">
                     <button 
                        onClick={() => navigate('/garage')}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-text-main dark:text-white" 
                        title="Mi Garaje"
                    >
                        <span className="material-symbols-outlined">garage_home</span>
                    </button>
                    <DarkModeToggle />
                </div>
            </div>

            {/* Dropdown Menu */}
            {showMenu && currentVehicle && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}></div>
                    <div className="absolute top-16 left-4 mt-2 w-72 bg-white dark:bg-[#1a2c20] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                        <div className="max-h-64 overflow-y-auto py-2">
                            <div className="px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Mis Vehículos</div>
                            {garage.map((v) => (
                                <button 
                                    key={v.id}
                                    onClick={() => { onSwitchVehicle(v); setShowMenu(false); }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${v.id === currentVehicle.id ? 'bg-primary/5 text-primary' : 'text-text-main dark:text-white'}`}
                                >
                                    <span className="material-symbols-outlined text-xl">{iconMap[v.type] || 'directions_car'}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate">{v.make} {v.model}</p>
                                    </div>
                                    {v.id === currentVehicle.id && <span className="material-symbols-outlined text-lg">check</span>}
                                </button>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-100 dark:border-gray-700 p-2 bg-gray-50/50 dark:bg-white/5">
                            <button 
                                onClick={handleAddClick}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-primary hover:shadow-sm transition-all"
                            >
                                <div className="h-6 w-6 rounded-full border border-current flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </div>
                                Añadir otro vehículo
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default SmartHeader;