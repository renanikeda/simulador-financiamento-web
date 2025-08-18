export type Installment = {
    number: number;
    adjustedOutstandingBalance: number;
    principalRepayment: number;
    additionalPrincipalRepayment: number;
    interest: number;
    installmentAmount: number;
    updatedOutstandingBalance: number;
    totalPayment: number;
};

export default class Loan {
    propertyValue: number;
    downPayment: number;
    financedAmount: number;
    annualInterestRate: number;
    monthlyInterestRate: number;
    trRate: number;
    monthlyTrRate: number;
    termMonths: number;
    additionalPrincipalRepayment: number;
    totalInstallment: number;

    constructor(
        propertyValue: number,
        downPayment: number,
        annualInterestRate: number,
        trRate: number = 0,
        termYears: number = 30,
        additionalPrincipalRepayment: number = 0,
        totalInstallment: number = 0
    ) {
        this.propertyValue = propertyValue;
        this.downPayment = downPayment;
        this.financedAmount = propertyValue - downPayment;
        this.annualInterestRate = annualInterestRate / 100;
        this.monthlyInterestRate = parseFloat(((1 + this.annualInterestRate) ** (1 / 12) - 1).toFixed(4));
        this.trRate = trRate / 100;
        this.monthlyTrRate = parseFloat(((1 + this.trRate) ** (1 / 12) - 1).toFixed(4));
        this.termMonths = termYears * 12;
        this.additionalPrincipalRepayment = additionalPrincipalRepayment;
        this.totalInstallment = totalInstallment;
    }

    private shouldApplyExtraRepayment(): boolean {
        return this.totalInstallment > 0 || this.additionalPrincipalRepayment > 0;
    }

    private calculateNewTerm(outstandingBalance: number, idealInstallment: number): number {
        return Math.floor(outstandingBalance / (idealInstallment - outstandingBalance * this.monthlyInterestRate));
    }

    private calculateNewAmortization(adjustedOutstandingBalance: number, currentTerm: number): number {
        const idealPrincipalRepayment = this.financedAmount / this.termMonths;
        const idealOutstandingBalance = this.financedAmount - idealPrincipalRepayment * currentTerm;
        const idealInstallment = idealPrincipalRepayment + idealOutstandingBalance * this.monthlyInterestRate;
        const newTerm = this.calculateNewTerm(adjustedOutstandingBalance, idealInstallment);
        return newTerm > 0
            ? parseFloat((adjustedOutstandingBalance / newTerm).toFixed(2))
            : adjustedOutstandingBalance;
    }

    calculateSAC(): Installment[] {
        const firstIdealInstallment =
            this.propertyValue * this.monthlyInterestRate + this.financedAmount / this.termMonths;

        if (this.totalInstallment > 0 && this.totalInstallment < firstIdealInstallment) {
            throw new Error(
                `Total installment cannot be less than the first SAC payment (${firstIdealInstallment.toFixed(2)}).`
            );
        }

        const installments: Installment[] = [];
        let principalRepayment = parseFloat((this.financedAmount / this.termMonths).toFixed(2));
        let outstandingBalance = this.financedAmount;

        for (let i = 1; i <= this.termMonths; i++) {
            const adjustedOutstandingBalance = parseFloat(
                (outstandingBalance * (1 + this.monthlyTrRate)).toFixed(2)
            );

            if (this.shouldApplyExtraRepayment() && i > 1) {
                principalRepayment = this.calculateNewAmortization(adjustedOutstandingBalance, i);
            }

            const interest = parseFloat((adjustedOutstandingBalance * this.monthlyInterestRate).toFixed(2));
            const installmentAmount = principalRepayment + interest;
            const totalPayment =
                this.totalInstallment > 0 ? this.totalInstallment : installmentAmount + this.additionalPrincipalRepayment;

            let additionalPrincipalRepayment =
                this.totalInstallment === 0 ? this.additionalPrincipalRepayment : this.totalInstallment - installmentAmount;

            outstandingBalance = adjustedOutstandingBalance - principalRepayment - additionalPrincipalRepayment;

            if (outstandingBalance < 0) {
                additionalPrincipalRepayment += outstandingBalance;
                outstandingBalance = 0;
            }

            installments.push({
                number: i,
                adjustedOutstandingBalance,
                principalRepayment,
                additionalPrincipalRepayment,
                interest,
                installmentAmount,
                updatedOutstandingBalance: outstandingBalance,
                totalPayment
            });

            if (outstandingBalance === 0) break;
        }

        return installments;
    }

    calculatePRICE(): Installment[] {
        const installments: Installment[] = [];
        const priceFactor =
            (1 - (1 + this.monthlyInterestRate) ** -this.termMonths) / this.monthlyInterestRate;
        const installmentAmount = parseFloat((this.financedAmount / priceFactor).toFixed(2));
        let outstandingBalance = this.financedAmount;

        for (let i = 1; i <= this.termMonths; i++) {
            const interest = parseFloat((outstandingBalance * this.monthlyInterestRate).toFixed(2));
            const principalRepayment = installmentAmount - interest;
            const totalPayment = installmentAmount + this.additionalPrincipalRepayment;
            outstandingBalance = outstandingBalance - principalRepayment - this.additionalPrincipalRepayment;

            if (outstandingBalance < 0) {
                this.additionalPrincipalRepayment += outstandingBalance;
                outstandingBalance = 0;
            }

            installments.push({
                number: i,
                adjustedOutstandingBalance: outstandingBalance,
                principalRepayment,
                additionalPrincipalRepayment: this.additionalPrincipalRepayment,
                interest,
                installmentAmount,
                updatedOutstandingBalance: outstandingBalance,
                totalPayment
            });
        }

        return installments;
    }
}
