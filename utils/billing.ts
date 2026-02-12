export interface BillingState {
    plan: 'family'; // Default to family/premium
    familyExpiresAt?: number;
    extraSlots: number;
}

const BILLING_KEY = 'autominder_billing';

// Always return a premium state
export const getBillingState = (): BillingState => {
    return { plan: 'family', extraSlots: 999 };
};

export const saveBillingState = (state: BillingState) => {
    localStorage.setItem(BILLING_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('billing-update'));
};

// Always allow adding vehicles
export const canAddVehicle = (currentCount: number): boolean => {
    return true; 
};

// Always allow premium features
export const canUsePremiumFeatures = (): boolean => {
    return true;
};

// Keep these as no-ops to prevent breaking imports if used elsewhere, 
// though they won't really be needed anymore.
export const simulatePurchaseFamily = () => {
    const state = getBillingState();
    saveBillingState(state);
};

export const simulatePurchaseExtraSlot = () => {
    const state = getBillingState();
    saveBillingState(state);
};