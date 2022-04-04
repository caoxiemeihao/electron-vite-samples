
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'

    /** from vite-plugin-electron */
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}
