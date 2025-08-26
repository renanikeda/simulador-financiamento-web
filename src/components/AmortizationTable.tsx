import { formatCurrency, type Parcela } from '../utils';
import './Styles.css';

function AmortizationTable({ installments }: { installments: Parcela[] }) {

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
                            <tr key={installment.numero}>
                                <td>{installment.numero}</td>
                                <td>{formatCurrency(installment.saldoDevedorCorrigido)}</td>
                                <td>{formatCurrency(installment.amortizacao)}</td>
                                <td>{formatCurrency(installment.juros)}</td>
                                <td>{formatCurrency(installment.parcela)}</td>
                                <td>{formatCurrency(installment.amortizacaoAdicional)}</td>
                                <td>{formatCurrency(installment.parcelaTotal)}</td>
                                <td>{formatCurrency(installment.saldoDevedorAtualizado)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AmortizationTable;
