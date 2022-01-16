declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      readonly CONTS_TYPE: string;
      readonly CONTS_PROJECT_ID: string;
      readonly CONTS_PRIVATE_KEY_ID: string;
      readonly CONTS_PRIVATE_KEY: string;
      readonly CONTS_CLIENT_EMAIL: string;
      readonly CONTS_CLIENT_ID: string;
      readonly CONTS_AUTH_URI: string;
      readonly CONTS_TOKEN_URI: string;
      readonly CONTS_AUTH_PROVIDER_X509_CERT_URL: string;
      readonly CONTS_CLIENT_X509_CERT_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
