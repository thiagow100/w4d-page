# W4D Landing Page — Instruções para Agentes

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
- **W4D** → nome de marca em TODA comunicação pública: copy, títulos, headers, footer, meta tags, SEO, assinaturas, logos. É o único nome da marca.
- **W4Digital LLC** → razão social da entidade americana. Aparece APENAS em endereço legal no Footer. Nunca em copy de marketing.
- **W4D Negócios Digitais LTDA** → razão social da entidade brasileira. Aparece APENAS em endereços legais (Footer, páginas de CNPJ/contato jurídico).
- **Método W4D** → nome próprio do método. Usar sempre assim, nunca traduzir, nunca abreviar.
- Nunca "W4 Digital" (separado) nem "W4digital" como marca. O nome anterior "W4Digital" foi deprecado em abril/2026 como marca pública — só sobrevive como razão social da LLC.

## Público-alvo
Brasileiros empresários com empresa nos EUA. Sofisticado, ocupado, desconfiado. PT é a copy de origem. EN e ES virão como traduções de apoio.

## Cores da Marca (NUNCA alterar)

### Fundos (escala Entrepedia-like — preto ancora vermelho de marca)
- Fundo primary: `#0A0A0A` — canvas principal (Hero, FAQ, Footer). Off-black ancora acentos vermelhos
- Fundo secondary: `#111111` — seções alternadas (Dores, Serviços, Credibilidade, Formulário)
- Fundo tertiary: `#1A1A1A` — cards dentro das seções. Step visível mas discreto

### Texto (escala de 4 níveis, calibrada sobre #0A0A0A — #171717)
- Texto primary: `#FFFFFF` (contraste 16.9:1) — títulos, CTAs, frases-âncora
- Texto body: `#A1A1A1` (6.3:1 ✓ AA) — parágrafos, descrições longas
- Texto secondary: `#737373` (3.6:1 ✓ AA large) — eyebrows, labels mono, metadata
- Texto muted: `#525252` (2.4:1, large-text only) — copyright, legal, tooltips — uso restrito

### Vermelho (escala de 3 papéis)
- CTA (solid fills): `#EC0000` — botões, pulse dots, checkmarks, ícones sólidos, **todo texto vermelho** (eyebrows, labels, sub-labels)
- CTA hover: `#FF1F1F` — hover LIFTA (mais claro), não escurece. Padrão Apple/Vercel dark-mode
- CTA accent: `#FF3B3B` — vermelho mais claro, uso EXCLUSIVO em **camadas translúcidas com alpha ≤ 0.5** (arcos, glows, gradientes, bordas translúcidas, fundos translúcidos). Ao aplicar `/10` a `/40` ainda lê como vermelho, não como marrom
- Focus ring: `#EC0000` — alinhado à marca (nunca azul)

**Regra operacional crítica — não violar:**
- `text-cta-accent` em texto sólido → PROIBIDO. Vira rosa-choque/coral contra dark, rompendo a paleta. Se precisar mutar texto vermelho, use `text-cta/XX` (mesma matiz, só com alpha).
- `bg-cta-accent/40` em fundos → OK.
- `border-cta-accent/30` em bordas → OK.
- `from-cta-accent/15` em gradients → OK.
- Em resumo: `cta-accent` sempre acompanhado de `/XX`. Se você digitou `text-cta-accent` ou `bg-cta-accent` sem alpha, está errado.

### Estado
- Error: `#EF4444` — distinto do vermelho de marca pra não confundir estado com ação

**Por que não #000000:** Preto puro #000000 proibido — causa halation com texto branco (o olho "queima" a borda). `#0A0A0A` é off-black seguro: 10/255 de luminância, ainda preto visualmente mas sem o problema perceptivo do preto puro. Apple, Vercel e Linear operam nesta mesma faixa.

**Por que escurecer de #171717 pra #0A0A0A:** O vermelho de marca `#EC0000` precisa de fundo quase-preto pra ancorar. Em `#171717` (cinza grafite) o vermelho flutua; em `#0A0A0A` ele fixa. Decisão tomada após comparação direta com Entrepedia.

**Por que não #565656 como secondary:** Reprova WCAG AA até pra texto grande. Foi substituído pelo sistema de 4 níveis acima.

## Regra de cor
- Vermelho sólido (`cta`) aparece APENAS em CTAs, pulse dots, checkmarks e ícones de marca
- Vermelho translúcido usa SEMPRE `cta-accent` como base, nunca `cta` (que vira marrom em baixa opacidade)
- Focus é SEMPRE vermelho (`#EC0000`), nunca azul
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
Apple-first é a filosofia visual da W4D. Significa:
- Minimalismo agressivo. Muito espaço negativo.
- Tipografia grande como protagonista da página.
- Uma ideia por seção — nunca empilhar mensagens.
- Movimento apenas com propósito (nunca decorativo, nunca em loop).
- Hierarquia visual fixa em todas as seções: eyebrow → título → subtítulo → corpo
- Off-black dominante (#0A0A0A, #111111, #1A1A1A). Vermelho (#EC0000) apenas em CTAs, focus e acentos pontuais.
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
- Adicionar parallax exagerado ou partículas
- Adicionar botão flutuante de WhatsApp
- Fazer deploy sem testar o formulário
- Alterar a estrutura de pastas sem autorização

Confirma antes de fazer.
