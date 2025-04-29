/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_TRELLO_API_KEY: string;
  readonly VITE_TRELLO_TOKEN: string;
  readonly VITE_TRELLO_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
