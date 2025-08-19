import { useReducer, useState } from 'react'
import './App.css'
import './components/AmortizationTable'
import AmortizationTable from './components/AmortizationTable'
import Loan from './engine/Engine'
import optionsReducer from './Reducer'
import type { Installment, optionsHeader } from './utils'
import OptionsHeader from './components/OptionsHeader'


function App() {
  const initialOptions = {
    propertyValue: 350_000,
    downPayment: 200_000,
    interestRate: 12.61,
    TRRate: 2,
    termYears: 30,
    extraAmortization: 0,
    totalPayment: 5_000
  };
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);
  const [installments, setInstallments] = useState<Installment[]>([]);
  
  const calculateInstallments = (options: optionsHeader) => {
    const loan = new Loan(options.propertyValue, options.downPayment, options.interestRate, options.TRRate, options.termYears, options.extraAmortization, options.totalPayment);
    setInstallments(loan.calculateSAC());
  }
  
  return (
    <>
      <OptionsHeader options={options} dispatch={dispatch} calculateInstallments={calculateInstallments}/>
      <AmortizationTable installments={installments} />
    </>
  )
}

export default App
