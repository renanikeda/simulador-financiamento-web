Este projeto implementa um simulador de financiamento imobiliário em Python que calcula as prestações pelos sistemas SAC (Sistema de Amortização Constante) e Price (Sistema Francês de Amortização).

## Funcionalidades

- Cálculo de financiamento pelo sistema SAC
- Cálculo de financiamento pelo sistema Price 
- Visualização das parcelas
- Comparativo entre os dois sistemas
- Configuração flexível de:
  - Valor do imóvel
  - Valor da entrada
  - Taxa de juros anual
  - Prazo em anos
  - Taxa TR anual
  - Amortização mensal adicional
  - Fixar prestação total (prestação + amortização adicional) - tem prioridade frente ao item anterior

## Como usar

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd simulacao-financiamento-web
```

2. Execute o script principal:
```bash
npm i && npm run dev
```

3. O programa irá:
   - Calcular as parcelas nos sistemas SAC e Price
   - Gerar uma visualização tabela web
   - Calcular amortização e abate no prazo total

## Requisitos

- Node versão 22 ou superior

## Detalhes técnicos

- Sistema SAC: mantém a amortização constante ao longo do financiamento (parcelas decrescentes)
- Sistema Price: mantém a prestação constante ao longo do financiamento (parcelas constantes)
- Os cálculos consideram:
  - Taxa de juros convertida de anual para mensal
  - Amortização do capital
  - Juros sobre o saldo devedor
  - Prestação total (amortização + juros)

## TODO
- Resolver tabela PRICE
- Amortização por redução de prestação
- Mover para Tailwind + melhorar design
## Licença

MIT
