import { HttpClient, type HttpClientConfig } from "./HttpClient";

let accessTokenGetter: () => string | undefined = () => undefined;
let refreshHandler: () => Promise<boolean> = async () => false;
let baseUrl = "/api";
let isConfigured = false;

export function configureHttpClient(options: {
  baseUrl: string;
  getAccessToken: () => string | undefined;
  onUnauthorized: () => Promise<boolean>;
}) {
  baseUrl = options.baseUrl;
  accessTokenGetter = options.getAccessToken;
  refreshHandler = options.onUnauthorized;
  isConfigured = true;
}

export function createHttpClient(): HttpClient {
  if (!isConfigured) {
    throw new Error(
      "[httpClientFactory] createHttpClient() llamado antes de configureHttpClient(). Llama configureHttpClient() primero en bootstrap."
    );
  }

  const cfg: HttpClientConfig = {
    baseUrl,
    timeoutMs: 15_000,
    getAccessToken: () => accessTokenGetter?.(),
    onUnauthorized: () => refreshHandler?.(),
  };

  return new HttpClient(cfg);
}
