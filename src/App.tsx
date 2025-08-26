import { useReducer, useState } from 'react'
import './App.css'
import './components/AmortizationTable'
import AmortizationTable from './components/AmortizationTable'
import ClipLoader from "react-spinners/ClipLoader";
import Financiamento from './engine/Engine'
import optionsReducer, { initialOptions, OptionsContext, OptionsDispatchContext } from './Reducer'
import type { optionsHeader, Parcela } from './utils'
import OptionsHeader from './components/OptionsHeader'


function App() {
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);
  const [installments, setInstallments] = useState<Parcela[]>([]);
  const [loading, setLoading] = useState(false);
  
  const calculateInstallments = (options: optionsHeader) => {
    setLoading(true);
    setInstallments([]);

    setTimeout(() => {
      const loan = new Financiamento(options.propertyValue, options.downPayment, options.interestRate, options.TRRate, options.termYears, options.extraAmortization, options.totalPayment);
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
