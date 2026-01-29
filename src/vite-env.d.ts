/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_WEB3FORMS_KEY: string
  readonly VITE_SCRAPINGDOG_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
