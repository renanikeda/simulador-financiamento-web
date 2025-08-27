
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

export type optionsHeader = {
    propertyValue: string,
    downPayment: string,
    interestRate: string,
    TRRate: string,
    termYears: number,
    extraAmortization: string,
    extraAmortizationType: 'Parcela Total' | 'Amortização Adicional'
    totalPayment: string
}

export type actionsHeader = {
    type: 'change',
    name: keyof optionsHeader,
    value: string
}

export const parseToNumber = (str: string) => {
    const cleaned = str.replace(/\./g, '').replace(/\,/g, '.').replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const roundNumber = (value: number, decimals = 2) => {
    return parseFloat(value.toFixed(decimals));    
};

export const checkBackspace = (value: string) => {
    return value.replace(/[^\d.,]/g, '').split(',').slice(-1)[0].length < 2;
}
