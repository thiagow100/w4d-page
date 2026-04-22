# W4Digital Landing Page — Instruções para Agentes

## Protocolo de início de sessão
Toda sessão nova deve começar confirmando:
```
pwd          → esperado: /Users/thiagoweirich/Documents/PROJETOS/w4d-page
ls .claude/skills/  → esperado: 7 skills (incluindo frontend-design)
git status
```
Se `pwd` retornar caminho diferente, pare e avise. As skills só funcionam se o projeto w4d-page for o workspace raiz da sessão.

## Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- Framer Motion (animações)
- Supabase (banco de dados para leads)
- TypeScript

## Nome da marca
- **W4Digital** → nome oficial. Usar em: títulos, footer, contexto formal, primeira menção em qualquer seção
- **W4D** → abreviação aceita. Usar em: contextos visuais (logos, ícones), URLs, hashtags, segunda menção em diante
- **Método W4D** → nome próprio do método. Usar sempre assim, nunca traduzir, nunca abreviar
- Nunca "W4 Digital" (separado)

## Público-alvo
Brasileiros empresários com empresa nos EUA. Sofisticado, ocupado, desconfiado. PT é a copy de origem. EN e ES virão como traduções de apoio.

## Cores da Marca (NUNCA alterar)
- Fundo primary: #171717
- Fundo secondary: #1C1C1C
- Fundo tertiary: #222222
- Vermelho CTA: #EC0000
- Vermelho hover (vinho): #7A0000 *(marcar para revisão futura)*
- Texto primary: #FFFFFF
- Texto secondary: #565656

**Por que não #000000:** Preto puro #000000 proibido — Geist Sans foi desenhada pra #171717. Sobre preto puro causa halation.

## Regra de cor
- Vermelho aparece APENAS em CTAs, linha de progresso do Método W4D, bordas de focus e hover
- Fundo é 95% grafite escuro. Sem fundos coloridos.

## Fontes oficiais
- **Títulos e corpo:** Geist Sans (via `font-sans` no Tailwind)
- **Números, códigos, detalhes técnicos:** Geist Mono (via `font-mono`)
- Proibido usar Inter, Roboto, Arial ou qualquer fonte genérica

## Tokens de espaçamento
- Seções grandes: `py-section` (128px)
- Seções menores: `py-section-sm` (80px)
- Nunca usar valores arbitrários tipo `py-[97px]`

## Conceito visual

### Filosofia: Apple-first
Apple-first é a filosofia visual da W4Digital. Significa:
- Minimalismo agressivo. Muito espaço negativo.
- Tipografia grande como protagonista da página.
- Uma ideia por seção — nunca empilhar mensagens.
- Movimento apenas com propósito (nunca decorativo, nunca em loop).
- Hierarquia visual fixa em todas as seções: eyebrow → título → subtítulo → corpo
- Grafite dominante (#171717, #1C1C1C, #222222). Vermelho (#EC0000) apenas em CTAs, focus e acentos pontuais.
- Nenhum elemento "enfeite". Se não serve à mensagem, não entra.

### Sistema técnico: Vercel/Geist
O sistema técnico (tipografia, espaçamento, sombras, componentes) é baseado no design system Vercel/Geist. Não confundir com a filosofia Apple-first — são camadas distintas.

**Regra de inversão:** O DESIGN.md raiz é white-first (Vercel). Ao aplicar seus padrões aqui, inverter o contexto de cor: a estrutura de tipografia, espaçamento e sombras se mantém; cores de fundo e texto invertem para o contexto dark do projeto.

## Hierarquia de referências de design
- **DESIGN.md** (raiz do projeto) → referência DOMINANTE. Em caso de conflito, ela prevalece.
- **_referencias-design/** → referências SECUNDÁRIAS, consultadas por contexto:
  - `apple/` → filosofia de hero sections, ritmo cinematográfico
  - `framer/` → padrões de animação
  - `stripe/` → formulários e componentes financeiros
  - `linear/` → dark-mode, bordas semi-transparentes
  - `notion/` → hierarquia de conteúdo
  - `intercom/` → copy e tom para plataformas de serviço
- Nunca mesclar arbitrariamente as 7 referências — isso gera Frankenstein visual.

## Skills por tarefa
- **frontend-design** → decisões visuais da landing page (skill principal para o W4D-page)
- **copywriting** → escrever ou reescrever copy
- **page-cro** → otimização de conversão
- **web-design-guidelines** → auditoria final antes de commit
- **react-best-practices** → qualidade e performance do código
- **interface-design** → RESERVADA para dashboards/admin. Não usar para a landing page.
- **find-skills** → descobrir novas skills no ecossistema

## Convenções
- Componentes em PascalCase (Hero.tsx, Dores.tsx)
- Um componente por seção da página
- Todas as animações via Framer Motion
- Sem travessões longos (—) nos textos
- Copy abrange produto E serviço (nunca limitar a um só)

## Internacionalização (i18n) — planejado
Página será multilíngue (PT/EN/ES) com rotas separadas (/pt, /en, /es). Implementação na Fase 11 do plano. Por enquanto trabalhar em PT. Manter strings preparadas para extração futura — evitar texto hardcoded em locais que não sejam componentes.

## Formulário
- 5 campos obrigatórios com validação
- Checkbox LGPD obrigatório
- Envia para Supabase tabela "leads"
- Automação de boas vindas configurada

## NUNCA fazer
- Alterar as cores da marca
- Usar #000000 como fundo (causa halation com Geist Sans)
- Remover seções sem autorização
- Usar fontes genéricas (Inter, Roboto, Arial)
- Adicionar parallax exagerado, partículas ou animações em loop
- Adicionar botão flutuante de WhatsApp
- Fazer deploy sem testar o formulário
- Alterar a estrutura de pastas sem autorização

Confirma antes de fazer.
