
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

export type Parcela = {
    numero: number;
    saldoDevedorCorrigido: number;
    amortizacao: number;
    amortizacaoAdicional: number;
    juros: number;
    parcela: number;
    saldoDevedorAtualizado: number;
    parcelaTotal: number;
};


export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const roundNumber = (value: number, decimals = 2) => {
    return parseFloat(value.toFixed(decimals));    
};

export type optionsHeader = {
    propertyValue: number,
    downPayment: number,
    interestRate: number,
    TRRate: number,
    termYears: number,
    extraAmortization: number,
    totalPayment: number
}

export type actionsHeader = {
    type: 'change',
    name: keyof optionsHeader,
    value: number
}