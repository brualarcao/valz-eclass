# Valz eClass

<p align="center">
  <img src="public/valz-icon.png" alt="Valz eClass" width="80" />
</p>

**Valz eClass** é uma plataforma de vídeo-aulas para visualização de cursos e aulas em vídeo. Oferece login, dashboard de cursos com busca e filtros, e páginas de detalhe de curso com player de vídeo, sidebar de lições e materiais para download.

---

## Stack

- **Nuxt 4** — Framework full-stack
- **Vue 3** — Interface reativa
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização (via `@nuxtjs/tailwindcss`)
- **@nuxt/icon** — Ícones (Heroicons)
- **PWA** — Progressive Web App (`@vite-pwa/nuxt`)
- **Vitest** + **@nuxt/test-utils** — Testes unitários e de integração Nuxt

Recomenda-se **Node.js 20+** (LTS).

---

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial: apresentação do projeto, stack e link para login. |
| `/login` | Tela de login; credenciais validadas conforme variáveis de ambiente (email/senha). |
| `/dashboard` | Após login: listagem de cursos com busca e filtros (em progresso, concluídos, não iniciados, etc.). |
| `/courses/[id]` | Detalhe do curso: aulas, player de vídeo, sidebar de lições e materiais. |

---

## Instalação e configuração

### 1. Instalar dependências

```bash
npm install
```

Ou com pnpm, yarn ou bun: `pnpm install`, `yarn install`, `bun install`.

### 2. Variáveis de ambiente

Copie o arquivo de exemplo e edite com seus valores:

```bash
cp .env.example .env
```

| Variável | Uso |
|----------|-----|
| `NUXT_LOGIN_EMAIL` | Email aceito no login (ambiente de desenvolvimento, server-side). |
| `NUXT_LOGIN_PASSWORD` | Senha aceita no login (ambiente de desenvolvimento, server-side). |
| `NUXT_PUBLIC_LOGIN_EMAIL` | Email para login no **build estático** (SSG). Usado pelo script que gera `public/data/auth.json`. |
| `NUXT_PUBLIC_LOGIN_PASSWORD` | Senha para login no **build estático** (SSG). Usado pelo script que gera `public/data/auth.json`. |
| `NUXT_EMPTY_STATE` | Se `true`, a API de cursos retorna lista vazia; útil para testar o estado vazio no dashboard. |

Em desenvolvimento você pode usar apenas `NUXT_LOGIN_EMAIL` e `NUXT_LOGIN_PASSWORD`. Para o build estático (`npm run generate`), o script `copy-courses-to-public.mjs` lê `NUXT_PUBLIC_LOGIN_EMAIL` e `NUXT_PUBLIC_LOGIN_PASSWORD` e gera `public/data/auth.json` — defina essas duas variáveis para o SSG funcionar corretamente.

---

## Desenvolvimento e build

### Por que rodar `predev` antes de tudo

O script `npm run predev` popula a pasta `public/data/` a partir de `server/mocks/courses.json`: gera `courses.json`, `auth.json` e um arquivo por curso em `public/data/courses/<id>.json`. Sem isso, a aplicação em dev (e o generate) não terá dados para listar cursos nem credenciais para o login. Execute pelo menos uma vez antes de `npm run dev`; o `generate` já inclui esse passo.

### Rodar em desenvolvimento

```bash
npm run predev   # uma vez (ou sempre que quiser atualizar os dados)
npm run dev      # servidor em http://localhost:3000
```

### Gerar build estático (SSG)

```bash
npm run generate
```

Isso executa o script de cópia de cursos e em seguida `nuxt generate`. A saída fica em **`.output/public`**.

### Servir a pasta de saída

O conteúdo a ser servido em produção é a pasta **`.output/public`**. Não é necessário Node em produção; basta um servidor de arquivos estáticos.

**Opção rápida (Node):**

```bash
npx serve .output/public
```

Instale o pacote `serve` globalmente se preferir: `npm install -g serve`, depois `serve .output/public`.

**Outras opções:** Apache, Nginx ou qualquer hospedagem estática com document root apontando para `.output/public`.

---

## Testes

| Comando | Descrição |
|---------|-----------|
| `npm run test` | Inicia o Vitest em modo **watch** (todos os projetos). |
| `npm run test:unit` | Apenas testes **unitários**: `test/unit/**/*.{test,spec}.ts`, ambiente Node — composables e lógica pura. |
| `npm run test:nuxt` | Apenas testes **Nuxt**: `test/nuxt/**/*.{test,spec}.ts`, ambiente Nuxt — composables que dependem do contexto Nuxt. |
| `npm run test:run` | Executa **todos** os testes uma vez (sem watch). **Priorize este comando** para CI e para garantir que unit + nuxt passam antes de commit ou push. |

---

## Deploy (SSG)

O projeto está configurado para **SSG** (`nuxt generate`, `nitro.static: true`).

1. **Variáveis de ambiente:** Configure no painel da hospedagem `NUXT_PUBLIC_LOGIN_EMAIL`, `NUXT_PUBLIC_LOGIN_PASSWORD` e, se quiser, `NUXT_EMPTY_STATE`.
2. **Build:** `npm ci && npm run generate` (ou o equivalente na plataforma).
3. **Diretório de publicação:** Defina como **`.output/public`** (em algumas plataformas: "Publish directory", "Output directory").

Hospedagens adequadas para Nuxt SSG: **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages** (com workflow que rode `generate` e publique `.output/public`). Consulte a [documentação oficial de deploy do Nuxt](https://nuxt.com/docs/getting-started/deployment).

---

## Versão disponibilizada em host gratuito

Foi realizado o deploy utilizando a branch `main` na Vercel e pode ser acessado no link:
[Valz eClass](https://valz-eclass.vercel.app/)


**Feito por:** Bruno Alarcão.
