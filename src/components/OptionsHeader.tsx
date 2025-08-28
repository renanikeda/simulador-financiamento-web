import { useOptions, useOptionsDispatch } from '../Reducer';
import { checkBackspace, formatCurrency, parseToNumber, formatPercent, type  optionsHeader, removePrefixSuffix } from '../utils';
import './Styles.css';

export default function OptionsHeader({
    calculateInstallments
} : {
    calculateInstallments: (options: optionsHeader) => void;
}) {
    const options = useOptions();
    const dispatch = useOptionsDispatch();

    const handleCurrencyChange = (name: keyof optionsHeader, value: string) => {
        let newValue = parseToNumber(value)
        console.log(value)
        if (removePrefixSuffix(value).length === 1) {
            newValue = newValue / 100
        } else if (checkBackspace(value)) {
            newValue = newValue / 10
        } else if (value.length <= String(options[name]).length) {
            newValue = newValue
        } else if (value.slice(0, -1) !== String(options[name])) {
            newValue = newValue
        } else {
            newValue = newValue * 10;
        }
        dispatch({ type: 'change', name, value: formatCurrency(newValue) });
    };

    const handleInterestChange = (name: keyof optionsHeader, value: string) => {
        let newValue = parseToNumber(value)
        if (removePrefixSuffix(value).length === 1) {
            newValue = newValue / 100
        } else if (!value.includes('%') || checkBackspace(value)) {
            newValue = newValue / 10
        } else if (value.length <= String(options[name]).length) {
            newValue = newValue
        } else if (value.slice(0, -1) !== String(options[name])) {
            newValue = newValue
        } else {
            newValue = newValue * 10;
        }
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
                <select id="extra-amortization" defaultValue={options.extraAmortizationType} onChange={(e) => handleGenralChange('extraAmortizationType', e.target.value)}>
                    <option value="Amortização Adicional">Amortização Adicional</option>
                    <option value="Parcela Total">Parcela Total</option>
                </select>
                <input
                    id="extraAmortization"
                    type="text"
                    value={options.extraAmortization}
                    onChange={(e) => handleCurrencyChange('extraAmortization', (e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="placholder" className="placeholder">Taxa TR:</label>
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
