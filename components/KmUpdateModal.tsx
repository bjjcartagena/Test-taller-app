import React, { useState } from 'react';

interface KmUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicleName: string;
    currentKm: string;
    onSave: (newKm: string) => void;
}

const KmUpdateModal: React.FC<KmUpdateModalProps> = ({ isOpen, onClose, vehicleName, currentKm, onSave }) => {
    const [km, setKm] = useState(currentKm);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSave(km);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-[#1a2c20] w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200 p-6">
                <div className="text-center mb-6">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                        <span className="material-symbols-outlined text-2xl">speed</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Actualizar Kilometraje</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿Cuántos KM tiene ahora tu <span className="font-bold text-gray-700 dark:text-gray-300">{vehicleName}</span>?
                    </p>
                </div>

                <div className="relative mb-6">
                    <input 
                        type="number" 
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        className="block w-full text-center text-2xl font-bold bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"
                        autoFocus
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">KM</span>
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="flex-1 py-2.5 text-sm font-bold bg-primary hover:bg-primary-hover text-[#052912] rounded-lg shadow-sm transition-colors">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KmUpdateModal;
