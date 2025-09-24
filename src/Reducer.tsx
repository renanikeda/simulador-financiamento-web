import { formatCurrency, formatPercent, type actionsHeader, type optionsHeader } from "./utils";

import { createContext, useContext } from 'react';


export const initialOptions = {
    propertyValue: formatCurrency(555_000),
    downPayment: formatCurrency(200_000),
    interestRate: formatPercent(13.43/100),
    TRRate: formatPercent(1.5/100),
    termYears: 35,
    extraAmortization: formatCurrency(0),
    extraAmortizationType: 'Amortização Adicional' as const,
    totalPayment: formatCurrency(0)
};

export const OptionsContext = createContext<optionsHeader>(initialOptions);
export const OptionsDispatchContext = createContext<React.Dispatch<actionsHeader>>(() => {});

export function useOptions() {
    return useContext(OptionsContext);
}

export function useOptionsDispatch() {
    return useContext(OptionsDispatchContext);
}

export default function optionsReducer (state: optionsHeader, action: actionsHeader) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

