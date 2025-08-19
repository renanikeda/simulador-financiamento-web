import type { actionsHeader, optionsHeader } from "./utils";

import { createContext, useContext } from 'react';


export const initialOptions = {
    propertyValue: 350_000,
    downPayment: 200_000,
    interestRate: 12.61,
    TRRate: 2,
    termYears: 30,
    extraAmortization: 0,
    totalPayment: 5_000
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

