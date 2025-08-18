import { useState } from 'react'
import './App.css'
import './components/AmortizationTable'
import AmortizationTable from './components/AmortizationTable'
import OptionsHeader from './components/OptionsHeader'
import Loan, { type Installment } from './engine/Engine'

function App() {
  const [propertyValue, setPropertyValue] = useState(350_000);
  const [downPayment, setDownPayment] = useState(200_000);
  const [interestRate, setInterestRate] = useState(12.61);
  const [termYears, setTermYears] = useState(30);
  const [extraAmortization, setExtraAmortization] = useState(0);
  const [totalPayment, setTotalPayment] = useState(5_000);
  const [TRRate, setTRRate] = useState(12);

  const [installments, setInstallments] = useState([] as Installment[]);

  const calculateInstallments = (propertyValue: number, downPayment: number, interestRate: number, TRRate: number, termYears: number, extraAmortization: number, totalPayment: number) => {
    const loan = new Loan(propertyValue, downPayment, interestRate, TRRate, termYears, extraAmortization, totalPayment);
    setInstallments(loan.calculateSAC());
  }
  
  return (
    <>
      <OptionsHeader propertyValue={propertyValue} setPropertyValue={setPropertyValue} downPayment={downPayment} setDownPayment={setDownPayment} interestRate={interestRate} setInterestRate={setInterestRate} termYears={termYears} setTermYears={setTermYears} TRRate={TRRate} setTRRate={setTRRate} extraAmortization={extraAmortization} setExtraAmortization={setExtraAmortization} totalPayment={totalPayment} setTotalPayment={setTotalPayment} calculateInstallments={calculateInstallments}/>
      <AmortizationTable installments={installments} />
    </>
  )
}

export default App
