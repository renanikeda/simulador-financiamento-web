import { formatCurrency, type Parcela } from "../utils";

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
        this.taxaJurosMensal = parseFloat(((1 + this.taxaJurosAnual) ** (1 / 12) - 1).toFixed(4));
        this.taxaTR = taxaTR / 100;
        this.taxaTRMensal = parseFloat(((1 + this.taxaTR) ** (1 / 12) - 1).toFixed(4));
        this.prazoMeses = termYears * 12;
        this.amortizacaoAdicional = amortizacaoAdicional;
        this.parcelaTotal = parcelaTotal;
    }

    private deveAplicarAmortizacaoExtra(): boolean {
        return this.parcelaTotal > 0 || this.amortizacaoAdicional > 0;
    }

    private calcularNovoPrazo(saldoDevedor: number, parcelaIdeal: number): number {
        return Math.floor(saldoDevedor / (parcelaIdeal - saldoDevedor * this.taxaJurosMensal));
    }

    private calculateNewAmortization(saldoDevedorAjustado: number, currentTerm: number): number {
        const amortizacaoIdeal = this.valorFinanciado / this.prazoMeses;
        const saldoDevedorIdeal = this.valorFinanciado - amortizacaoIdeal * currentTerm;
        const parcelaIdeal = amortizacaoIdeal + saldoDevedorIdeal * this.taxaJurosMensal;
        const newTerm = this.calcularNovoPrazo(saldoDevedorAjustado, parcelaIdeal);
        return newTerm > 0
            ? parseFloat((saldoDevedorAjustado / newTerm).toFixed(2))
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
        let amortizacao = parseFloat((this.valorFinanciado / this.prazoMeses).toFixed(2));
        let saldoDevedor = this.valorFinanciado;

        for (let i = 1; i <= this.prazoMeses; i++) {
            const saldoDevedorAjustado = parseFloat(
                (saldoDevedor * (1 + this.taxaTRMensal)).toFixed(2)
            );

            if (this.deveAplicarAmortizacaoExtra() && i > 1) {
                amortizacao = this.calculateNewAmortization(saldoDevedorAjustado, i);
            }

            const interest = parseFloat((saldoDevedorAjustado * this.taxaJurosMensal).toFixed(2));
            const parcela = amortizacao + interest;
            const totalPayment =
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
                parcelaTotal: totalPayment
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
            const totalPayment = parcela + this.amortizacaoAdicional;
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
                parcelaTotal: totalPayment
            });
        }

        return parcelas;
    }
}
