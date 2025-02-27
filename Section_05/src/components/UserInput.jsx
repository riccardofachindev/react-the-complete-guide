export default function UserInput({ onInvestmentChange, initialInvestment, annualInvestment, expectedReturn, duration }) {
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initialInvestment">Initial investment</label>
                    <input type="number" id="initialInvestment" required defaultValue={initialInvestment} onChange={(event) => onInvestmentChange('initialInvestment', event.target.value)} />
                </p>
                <p>
                    <label htmlFor="annualInvestment">Annual investment</label>
                    <input type="number" id="annualInvestment" required defaultValue={annualInvestment} onChange={(event) => onInvestmentChange('annualInvestment', event.target.value)} />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expectedReturn">Expected return</label>
                    <input type="number" id="expectedReturn" required defaultValue={expectedReturn} onChange={(event) => onInvestmentChange('expectedReturn', event.target.value)} />
                </p>
                <p>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" id="duration" required defaultValue={duration} onChange={(event) => onInvestmentChange('duration', event.target.value)} />
                </p>
            </div>
        </section>
    )
}