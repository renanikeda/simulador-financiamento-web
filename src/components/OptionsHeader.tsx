import './Styles.css';

function OptionsHeader({
    propertyValue,
    setPropertyValue,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    termYears,
    setTermYears,
    TRRate,
    setTRRate,
    extraAmortization,
    setExtraAmortization,
    totalPayment,
    setTotalPayment,
    calculateInstallments
} : {
    propertyValue: number;
    setPropertyValue: (value: number) => void;
    downPayment: number;
    setDownPayment: (value: number) => void;
    interestRate: number;
    setInterestRate: (value: number) => void;
    termYears: number;
    setTermYears: (value: number) => void;
    TRRate: number;
    setTRRate: (value: number) => void;
    extraAmortization: number;
    setExtraAmortization: (value: number) => void;
    totalPayment: number;
    setTotalPayment: (value: number) => void;
    calculateInstallments: (propertyValue: number, downPayment: number, interestRate: number, TRRate: number, termYears: number, extraAmortization: number, totalPayment: number) => void;
}) {

    const handleSubmit = () => {
        calculateInstallments(propertyValue, downPayment, interestRate, TRRate, termYears, extraAmortization, totalPayment);
    };

    return (
        <div className="options-container">
            <div className="input-group">
                <label htmlFor="propertyValue">Valor do Imóvel:</label>
                <input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="downPayment">Entrada:</label>
                <input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="interestRate">Taxa de Juros (% a.a.):</label>
                <input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    step="0.01"
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="termYears">Prazo (anos):</label>
                <input
                    id="termYears"
                    type="number"
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="TRRate">Taxa TR:</label>
                <input
                    id="TRRate"
                    type="number"
                    value={TRRate}
                    onChange={(e) => setTRRate(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="extraAmortization">Amortização Extra:</label>
                <input
                    id="extraAmortization"
                    type="number"
                    value={extraAmortization}
                    onChange={(e) => setExtraAmortization(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="totalPayment">Parcela Total:</label>
                <input
                    id="totalPayment"
                    type="number"
                    value={totalPayment}
                    onChange={(e) => setTotalPayment(Number(e.target.value))}
                />
            </div>
            <div className="submit-button">
                <button
                    id="submit"
                    onClick={handleSubmit}
                >
                    Calcular
                </button>
            </div>
        </div>
    );
}

export default OptionsHeader;