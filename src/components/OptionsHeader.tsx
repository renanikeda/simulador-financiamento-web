import { useOptions, useOptionsDispatch } from '../Reducer';
import type { optionsHeader } from '../utils';
import './Styles.css';

export default function OptionsHeader({
    calculateInstallments
} : {
    calculateInstallments: (options: optionsHeader) => void;
}) {
    const options = useOptions();
    const dispatch = useOptionsDispatch();
    const handleChange = (name: keyof optionsHeader, value: number) => {
        dispatch({ type: 'change', name, value });
    };

    return (
        <div className="options-container">
            <div className="input-group">
                <label htmlFor="propertyValue">Valor do Imóvel:</label>
                <input
                    id="propertyValue"
                    type="number"
                    value={options.propertyValue}
                    onChange={(e) => handleChange('propertyValue', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="downPayment">Entrada:</label>
                <input
                    id="downPayment"
                    type="number"
                    value={options.downPayment}
                    onChange={(e) => handleChange('downPayment', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="interestRate">Taxa de Juros (% a.a.):</label>
                <input
                    id="interestRate"
                    type="number"
                    value={options.interestRate}
                    step="0.01"
                    onChange={(e) => handleChange('interestRate', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="termYears">Prazo (anos):</label>
                <input
                    id="termYears"
                    type="number"
                    value={options.termYears}
                    onChange={(e) => handleChange('termYears', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="TRRate">Taxa TR:</label>
                <input
                    id="TRRate"
                    type="number"
                    value={options.TRRate}
                    onChange={(e) => handleChange('TRRate', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="extraAmortization">Amortização Extra:</label>
                <input
                    id="extraAmortization"
                    type="number"
                    value={options.extraAmortization}
                    onChange={(e) => handleChange('extraAmortization', Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="totalPayment">Parcela Total:</label>
                <input
                    id="totalPayment"
                    type="number"
                    value={options.totalPayment}
                    onChange={(e) => handleChange('totalPayment', Number(e.target.value))}
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
