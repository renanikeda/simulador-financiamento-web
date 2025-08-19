import { useReducer, useState } from 'react'
import './App.css'
import './components/AmortizationTable'
import AmortizationTable from './components/AmortizationTable'
import Loan from './engine/Engine'
import optionsReducer, { initialOptions, OptionsContext, OptionsDispatchContext } from './Reducer'
import type { Installment, optionsHeader } from './utils'
import OptionsHeader from './components/OptionsHeader'


function App() {
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);
  const [installments, setInstallments] = useState<Installment[]>([]);
  
  const calculateInstallments = (options: optionsHeader) => {
    const loan = new Loan(options.propertyValue, options.downPayment, options.interestRate, options.TRRate, options.termYears, options.extraAmortization, options.totalPayment);
    setInstallments(loan.calculateSAC());
  }
  
  return (
    <>
      <OptionsContext value={options}>
        <OptionsDispatchContext value={dispatch}>
          <OptionsHeader calculateInstallments={calculateInstallments}/>
          <AmortizationTable installments={installments} />
        </OptionsDispatchContext>
      </OptionsContext>
    </>
  )
}

export default App
