# W4Digital Landing Page — Instruções para Agentes

## Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- Framer Motion (animações)
- Supabase (banco de dados para leads)
- TypeScript

## Nome da marca
- Sempre "W4Digital" (junto, D maiúsculo)
- Nunca "W4D", nunca "W4 Digital" separado

## Cores da Marca (NUNCA alterar)
- Fundo: #000000
- Fundo alternado: #0A0A0A / #111111
- Vermelho CTA: #EC0000
- Vermelho hover (vinho): #7A0000
- Texto: #FFFFFF
- Texto secundário: #565656

## Regra de cor
- Vermelho aparece APENAS em CTAs, linha de progresso do Método W4, bordas de focus e hover
- Fundo é 95% preto. Sem fundos coloridos.

## Fontes oficiais
- **Títulos e corpo:** Geist Sans (via `font-sans` no Tailwind)
- **Números, códigos, detalhes técnicos:** Geist Mono (via `font-mono`)
- Proibido usar Inter, Roboto, Arial ou qualquer fonte genérica

## Tokens de espaçamento
- Seções grandes: `py-section` (128px)
- Seções menores: `py-section-sm` (80px)
- Nunca usar valores arbitrários tipo `py-[97px]`

## Conceito visual: Apple-first
Apple-first é o termo oficial da identidade visual da W4D. Significa:
- Minimalismo agressivo. Muito espaço negativo.
- Tipografia grande como protagonista da página.
- Uma ideia por seção — nunca empilhar mensagens.
- Movimento apenas com propósito (nunca decorativo, nunca em loop).
- Hierarquia visual fixa em todas as seções: eyebrow → título → subtítulo → corpo
- Preto dominante (#000000, #0A0A0A, #111111). Vermelho (#EC0000) apenas em CTAs, focus e acentos pontuais.
- Nenhum elemento "enfeite". Se não serve à mensagem, não entra.

## Convenções
- Componentes em PascalCase (Hero.tsx, Dores.tsx)
- Um componente por seção da página
- Todas as animações via Framer Motion
- Referência visual: Apple. Poucos elementos, muito espaço, movimento com propósito.
- Sem travessões longos (—) nos textos
- Copy abrange produto E serviço (nunca limitar a um só)

## Formulário
- 5 campos obrigatórios com validação
- Checkbox LGPD obrigatório
- Envia para Supabase tabela "leads"
- Automação de boas vindas configurada

## NUNCA fazer
- Alterar as cores da marca
- Remover seções sem autorização
- Usar fontes genéricas (Inter, Roboto, Arial)
- Adicionar parallax exagerado, partículas ou animações em loop
- Adicionar botão flutuante de WhatsApp
- Fazer deploy sem testar o formulário
- Alterar a estrutura de pastas sem autorização
- Usar o nome "W4D" em vez de "W4Digital"

Confirma antes de fazer.
