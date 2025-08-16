import Loan from '../engine/Engine';
import './Styles.css';

function AmortizationTable() {
    const valor_imovel = 350_000
    const entrada = 200_000
    const taxa_juros_anual = 12.61 
    const prazo_anos = 30
    const amortizacao_adicional = 0
    const parcela_total = 0
    const taxa_tr = 0 

    const loan = new Loan(valor_imovel, entrada, taxa_juros_anual, taxa_tr, prazo_anos, amortizacao_adicional, parcela_total);
    const installments = loan.calculateSAC();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

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
