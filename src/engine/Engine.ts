import { formatCurrency, roundNumber, type Parcela } from "../utils";

export default class Financiamento {
    valorImovel: number;
    valorEntrada: number;
    valorFinanciado: number;
    taxaJurosAnual: number;
    taxaJurosMensal: number;
    taxaTR: number;
    taxaTRMensal: number;
    prazoMeses: number;
    amortizacaoAdicional: number;
    parcelaTotal: number;

    constructor(
        valorImovel: number,
        valorEntrada: number,
        taxaJurosAnual: number,
        taxaTR: number = 0,
        termYears: number = 30,
        amortizacaoAdicional: number = 0,
        parcelaTotal: number = 0
    ) {
        this.valorImovel = valorImovel;
        this.valorEntrada = valorEntrada;
        this.valorFinanciado = valorImovel - valorEntrada;
        this.taxaJurosAnual = taxaJurosAnual / 100;
        this.taxaJurosMensal = roundNumber((1 + this.taxaJurosAnual) ** (1 / 12) - 1, 8);
        this.taxaTR = taxaTR / 100;
        this.taxaTRMensal = roundNumber((1 + this.taxaTR) ** (1 / 12) - 1, 8);
        this.prazoMeses = termYears * 12;
        this.amortizacaoAdicional = amortizacaoAdicional;
        this.parcelaTotal = parcelaTotal;
    }

    private deveCalcularNovaAmortizacao(): boolean {
        return this.existeAmortizacaoAdicional()|| this.taxaTRMensal > 0;
    }

    private existeAmortizacaoAdicional(): boolean {
        return this.parcelaTotal > 0 || this.amortizacaoAdicional > 0;
    }

    private calcularNovoPrazo(saldoDevedor: number, parcelaIdeal: number): number {
        return Math.floor(saldoDevedor / (parcelaIdeal - saldoDevedor * this.taxaJurosMensal));
    }

    private calcularSaldoDevedorIdeal(prazoAtual: number): number {
        return Array.from({ length: prazoAtual }, (_, i) => i + 1).reduce((saldo, _) => {
            return saldo * (1 + this.taxaTRMensal) - (saldo/(this.prazoMeses - prazoAtual + 1));
        }, this.valorFinanciado);
    }

    private calcularNovaAmortizacao(saldoDevedorAjustado: number, prazoAtual: number): number {
        const amortizacaoIdeal = saldoDevedorAjustado / (this.prazoMeses - prazoAtual + 1);
        if (prazoAtual == 1 || !this.existeAmortizacaoAdicional()) return amortizacaoIdeal;
            
        const saldoDevedorIdeal = this.calcularSaldoDevedorIdeal(prazoAtual) // this.valorFinanciado - amortizacaoIdeal * prazoAtual;
        const parcelaIdeal = amortizacaoIdeal + saldoDevedorIdeal * this.taxaJurosMensal;
        const novoPrazo = this.calcularNovoPrazo(saldoDevedorAjustado, parcelaIdeal);
        return novoPrazo > 0
            ? roundNumber(saldoDevedorAjustado / novoPrazo)
            : saldoDevedorAjustado;
    }

    calcularSAC(): Parcela[] {
        const primeiraParcelaIdeal =
            this.valorFinanciado * this.taxaJurosMensal + this.valorFinanciado / this.prazoMeses;
        if (this.parcelaTotal > 0 && this.parcelaTotal < primeiraParcelaIdeal) {
            const message = `Total installment cannot be less than the first SAC payment ${formatCurrency(primeiraParcelaIdeal)}.`
            alert(message)
            throw new Error(message);
        }

        const parcelas: Parcela[] = [];
        let amortizacao = roundNumber(this.valorFinanciado / this.prazoMeses);
        let saldoDevedor = this.valorFinanciado;

        for (let i = 1; i <= this.prazoMeses; i++) {    
            const saldoDevedorAjustado = roundNumber(saldoDevedor * (1 + this.taxaTRMensal));

            if (this.deveCalcularNovaAmortizacao()) {
                amortizacao = this.calcularNovaAmortizacao(saldoDevedorAjustado, i);
            }
            // if (this.taxaJurosMensal > 0) {
            //     amortizacao = roundNumber(amortizacao * (1 + this.taxaTRMensal));
            // }

            const interest = roundNumber(saldoDevedorAjustado * this.taxaJurosMensal)   ;
            const parcela = amortizacao + interest;
            const parcelaTotal =
                this.parcelaTotal > 0 ? this.parcelaTotal : parcela + this.amortizacaoAdicional;

            let amortizacaoAdicional =
                this.parcelaTotal === 0 ? this.amortizacaoAdicional : this.parcelaTotal - parcela;

            saldoDevedor = saldoDevedorAjustado - amortizacao - amortizacaoAdicional;

            if (saldoDevedor < 0) {
                amortizacaoAdicional += saldoDevedor;
                saldoDevedor = 0;
            }

            parcelas.push({
                numero: i,
                saldoDevedorCorrigido: saldoDevedorAjustado,
                amortizacao: amortizacao,
                amortizacaoAdicional,
                juros: interest,
                parcela: parcela,
                saldoDevedorAtualizado: saldoDevedor,
                parcelaTotal: parcelaTotal
            });

            if (saldoDevedor === 0) break;
        }

        return parcelas;
    }

    calcularPRICE(): Parcela[] {
        const parcelas: Parcela[] = [];
        const priceFactor =
            (1 - (1 + this.taxaJurosMensal) ** -this.prazoMeses) / this.taxaJurosMensal;
        const parcela = parseFloat((this.valorFinanciado / priceFactor).toFixed(2));
        let saldoDevedor = this.valorFinanciado;

        for (let i = 1; i <= this.prazoMeses; i++) {
            const interest = parseFloat((saldoDevedor * this.taxaJurosMensal).toFixed(2));
            const amortizacao = parcela - interest;
            const parcelaTotal = parcela + this.amortizacaoAdicional;
            saldoDevedor = saldoDevedor - amortizacao - this.amortizacaoAdicional;

            if (saldoDevedor < 0) {
                this.amortizacaoAdicional += saldoDevedor;
                saldoDevedor = 0;
            }

            parcelas.push({
                numero: i,
                saldoDevedorCorrigido: saldoDevedor,
                amortizacao: amortizacao,
                amortizacaoAdicional: this.amortizacaoAdicional,
                juros: interest,
                parcela: parcela,
                saldoDevedorAtualizado: saldoDevedor,
                parcelaTotal: parcelaTotal
            });
        }

        return parcelas;
    }
}
