import { formatter } from "../util/investment"

export default function Result({ investmentResults }) {
    return (
        <table id="result">
            <thead className="center">
                <tr>
                    <th>Year</th>
                    <th>Investment value</th>
                    <th>Interest (year)</th>
                    <th>Total interest</th>
                </tr>
            </thead>
            <tbody>
                {investmentResults.map((result) => (
                    <tr key={result.year}>
                        <td>{result.year}</td>
                        <td>{formatter.format(result.annualInvestment)}</td>
                        <td>{formatter.format(result.valueEndOfYear)}</td>
                        <td>{formatter.format(result.interest)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}