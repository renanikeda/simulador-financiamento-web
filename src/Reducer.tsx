import type { actionsHeader, optionsHeader } from "./utils";

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

