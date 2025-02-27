import { Fragment, useState } from "react"
import Header from './components/Header'
import UserInput from "./components/UserInput"
import Result from './components/Result'
import { calculateInvestmentResults } from './util/investment'

const INITIAL_INVESTMENT = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
}

function App() {
  const [investment, setInvestment] = useState({ ...INITIAL_INVESTMENT });
  const investmentResults = calculateInvestmentResults(investment);

  function changeInvestmentHandler(property, propertyValue) {
    setInvestment(oldInvestment => {
      const newInvestment = { ...oldInvestment, [property]: +propertyValue };

      return newInvestment;
    })
  }

  const isInputValid = investment.duration && investment.duration >= 1;

  return (
    <Fragment>
      <Header />
      <UserInput onInvestmentChange={changeInvestmentHandler} {...investment} />
      {isInputValid ? <Result investmentResults={investmentResults} /> : <p className="center">Duration must be at least 1 year.</p>}
    </Fragment>
  )
}

export default App
