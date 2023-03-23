/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AZURE_TENANT_ID: string;
  readonly VITE_AZURE_CLIENT_ID: string;
  readonly VITE_AZUREAD_REDIRECTURL: string;
  readonly VITE_AZUREAD_POSTLOGOUT_REDIRECTURL: string;
  readonly VITE_AZURE_AD_GROUPNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
