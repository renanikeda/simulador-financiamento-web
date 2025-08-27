import { useReducer, useState } from 'react'
import './App.css'
import './components/AmortizationTable'
import AmortizationTable from './components/AmortizationTable'
import ClipLoader from "react-spinners/ClipLoader";
import Financiamento from './engine/Engine'
import optionsReducer, { initialOptions, OptionsContext, OptionsDispatchContext } from './Reducer'
import { parseToNumber, type optionsHeader, type Parcela } from './utils'
import OptionsHeader from './components/OptionsHeader'


function App() {
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);
  const [installments, setInstallments] = useState<Parcela[]>([]);
  const [loading, setLoading] = useState(false);
  
  const calculateInstallments = (options: optionsHeader) => {
    setLoading(true);
    setInstallments([]);

    setTimeout(() => {
      const loan = new Financiamento(parseToNumber(options.propertyValue), parseToNumber(options.downPayment), parseToNumber(options.interestRate), parseToNumber(options.TRRate), options.termYears, options.extraAmortizationType === 'Amortização Adicional' ? parseToNumber(options.extraAmortization) : 0, options.extraAmortizationType === 'Parcela Total' ? parseToNumber(options.extraAmortization): 0);
      setLoading(false);
      setInstallments(loan.calcularSAC());
    }, 250)
  }
  
  return (
    <>
      <OptionsContext value={options}>
        <OptionsDispatchContext value={dispatch}>
          <OptionsHeader calculateInstallments={calculateInstallments}/>
          <AmortizationTable installments={installments} />
          {loading && (
            <ClipLoader size={50} color="primary" />
          )}
        </OptionsDispatchContext>
      </OptionsContext>
    </>
  )
}

export default App
