import { useOptions, useOptionsDispatch } from '../Reducer';
import { checkBackspace, formatCurrency, parseToNumber, formatPercent, type  optionsHeader } from '../utils';
import './Styles.css';

export default function OptionsHeader({
    calculateInstallments
} : {
    calculateInstallments: (options: optionsHeader) => void;
}) {
    const options = useOptions();
    const dispatch = useOptionsDispatch();
    const handleCurrencyChange = (name: keyof optionsHeader, value: string) => {
        const newValue = checkBackspace(value) ? parseToNumber(value) / 10 : parseToNumber(value) * 10;
        dispatch({ type: 'change', name, value: formatCurrency(newValue) });
    };

    const handleInterestChange = (name: keyof optionsHeader, value: string) => {
        const newValue = (!value.includes('%') || checkBackspace(value)) ? parseToNumber(value) / 10 : parseToNumber(value) * 10;
        console.log(value)
        console.log(newValue)
        dispatch({ type: 'change', name, value: formatPercent(newValue/100) });
    };
    
    const handleGenralChange = (name: keyof optionsHeader, value: string) => {
        dispatch({ type: 'change', name, value });
    };

    return (
        <div className="options-container">
            <div className="input-group">
                <label htmlFor="propertyValue">Valor do Imóvel:</label>
                <input
                    id="propertyValue"
                    type="text"
                    value={options.propertyValue}
                    onChange={(e) => handleCurrencyChange('propertyValue', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="downPayment">Entrada:</label>
                <input
                    id="downPayment"
                    type="text"
                    value={options.downPayment}
                    onChange={(e) => handleCurrencyChange('downPayment', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="interestRate">Taxa de Juros (% a.a.):</label>
                <input
                    id="interestRate"
                    type="text"
                    value={options.interestRate}
                    step="0.01"
                    onChange={(e) => handleInterestChange('interestRate', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="termYears">Prazo (anos):</label>
                <input
                    id="termYears"
                    type="text"
                    value={options.termYears}
                    onChange={(e) => handleGenralChange('termYears', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="TRRate">Taxa TR:</label>
                <input
                    id="TRRate"
                    type="text"
                    value={options.TRRate}
                    onChange={(e) => handleInterestChange('TRRate', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="extraAmortization">Amortização Extra:</label>
                <input
                    id="extraAmortization"
                    type="text"
                    value={options.extraAmortization}
                    onChange={(e) => handleCurrencyChange('extraAmortization', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="totalPayment">Parcela Total:</label>
                <input
                    id="totalPayment"
                    type="text"
                    value={options.totalPayment}
                    onChange={(e) => handleCurrencyChange('totalPayment', (e.target.value))}
                />
            </div>
            <div className="submit-button">
                <button
                    id="submit"
                    onClick={() => calculateInstallments(options)}
                >
                    Calcular
                </button>
            </div>
        </div>
    );
}
