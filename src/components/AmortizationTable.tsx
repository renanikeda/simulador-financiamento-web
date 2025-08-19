import { formatCurrency, type Installment } from '../utils';
import './Styles.css';

function AmortizationTable({ installments }: { installments: Installment[] }) {

    return (
        <>
            <h2>Simulação tabela SAC</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Parcela</th>
                            <th>Saldo Devedor Corrigido</th>
                            <th>Amortização</th>
                            <th>Juros</th>
                            <th>Prestação</th>
                            <th>Amortização Adicional</th>
                            <th>Prestação Total</th>
                            <th>Saldo Devedor Atualizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {installments.map((installment) => (
                            <tr key={installment.number}>
                                <td>{installment.number}</td>
                                <td>{formatCurrency(installment.adjustedOutstandingBalance)}</td>
                                <td>{formatCurrency(installment.principalRepayment)}</td>
                                <td>{formatCurrency(installment.interest)}</td>
                                <td>{formatCurrency(installment.installmentAmount)}</td>
                                <td>{formatCurrency(installment.additionalPrincipalRepayment)}</td>
                                <td>{formatCurrency(installment.totalPayment)}</td>
                                <td>{formatCurrency(installment.updatedOutstandingBalance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AmortizationTable;
