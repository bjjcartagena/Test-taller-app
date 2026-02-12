import React, { useState } from 'react';
import { simulatePurchaseFamily, simulatePurchaseExtraSlot } from '../utils/billing';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'family' | 'extra';
    onSuccess: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, type, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handlePurchase = () => {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            if (type === 'family') {
                simulatePurchaseFamily();
            } else {
                simulatePurchaseExtraSlot();
            }
            setIsLoading(false);
            onSuccess();
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-[#1a2c20] w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200 text-center">
                
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <span className="material-symbols-outlined text-3xl">
                        {type === 'family' ? 'workspace_premium' : 'garage_home'}
                    </span>
                </div>

                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                    {type === 'family' ? 'Pack Familiar' : 'Vehículo Extra'}
                </h2>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                    {type === 'family' 
                        ? 'Gestiona hasta 5 vehículos y activa todas las funciones premium.' 
                        : 'Añade un espacio permanente para un nuevo vehículo en tu garaje.'}
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handlePurchase}
                        disabled={isLoading}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-[#052912] font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <span>Desbloquear (Simulación)</span>
                        )}
                    </button>
                    <button onClick={onClose} className="text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaywallModal;