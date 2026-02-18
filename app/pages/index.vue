<template>
  <div class="py-10 max-w-2xl mx-auto space-y-8">
    <section>
      <h1 class="text-4xl font-bold text-brand-primary mb-4">
        Valz eClass — Teste Técnico
      </h1>
      <p class="text-text-secondary">
        Esta é a porta de entrada do projeto. Aqui você encontra a stack utilizada e as instruções para acessar as próximas telas.
      </p>
    </section>

    <section class="p-6 bg-brand-surface border border-brand-border rounded-xl">
      <h2 class="text-xl font-semibold text-text-primary mb-3">
        Stack do projeto
      </h2>
      <ul class="text-text-secondary space-y-1 list-disc list-inside">
        <li>Nuxt 4</li>
        <li>Vue 3</li>
        <li>Tailwind CSS</li>
        <li>TypeScript</li>
        <li>@nuxt/icon</li>
        <li>PWA (Vite PWA)</li>
        <li>Design gerado pelo Stitch Design AI</li>
      </ul>
    </section>

    <section class="p-6 bg-brand-surface border border-brand-border rounded-xl">
      <h2 class="text-xl font-semibold text-text-primary mb-3">
        Como acessar as próximas telas
      </h2>
      <p class="text-text-secondary mb-4">
        A primeira tela após esta é o <strong class="text-text-primary">login</strong>. Use o botão abaixo para abrir a tela de login em uma nova aba. As credenciais aceitas são as configuradas no arquivo <code class="px-1.5 py-0.5 rounded bg-brand-dark border border-brand-border text-text-primary text-sm">.env</code> (variáveis <code class="px-1.5 py-0.5 rounded bg-brand-dark border border-brand-border text-text-primary text-sm">NUXT_PUBLIC_LOGIN_EMAIL</code>, <code class="px-1.5 py-0.5 rounded bg-brand-dark border border-brand-border text-text-primary text-sm">NUXT_PUBLIC_LOGIN_PASSWORD</code> e <code class="px-1.5 py-0.5 rounded bg-brand-dark border border-brand-border text-text-primary text-sm">NUXT_EMPTY_STATE</code>).
      </p>

      <div class="mb-6 p-4 rounded-lg bg-brand-dark border border-brand-border">
        <p class="text-sm font-medium text-text-primary mb-2">
          Credenciais configuradas no .env
        </p>
        <dl class="space-y-2 text-sm">
          <div>
            <dt class="text-text-secondary">Email</dt>
            <dd class="text-text-primary font-mono break-all">
              {{ config.public.loginEmail || '(não configurado)' }}
            </dd>
          </div>
          <div>
            <dt class="text-text-secondary">Senha</dt>
            <dd class="text-text-primary font-mono break-all">
              {{ config.public.loginPassword || '(não configurado)' }}
            </dd>
          </div>
          <div>
            <dt class="text-text-secondary">Empty State</dt>
            <dd class="text-text-primary font-mono break-all">
              {{ config.emptyState ? 'Ativo' : 'Desativado' || 'Desativado' }}
            </dd>
          </div>
        </dl>
      </div>

      <a
        href="/login"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-white bg-brand-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 focus:ring-offset-brand-dark transition-opacity"
      >
        Acessar login
        <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 ml-2" aria-hidden="true" />
      </a>

      <a
        :href="'/materials/material1.pdf'"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center px-5 py-2.5 ml-4 rounded-lg font-medium text-white bg-brand-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 focus:ring-offset-brand-dark transition-opacity"
      >
        Conferir Teste Técnico
        <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 ml-2" aria-hidden="true" />
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>