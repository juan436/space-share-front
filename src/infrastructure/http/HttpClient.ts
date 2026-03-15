export interface HttpClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  getAccessToken?: () => string | undefined;
  onUnauthorized?: () => Promise<boolean>;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private timeoutMs: number;
  private getAccessToken?: () => string | undefined;
  private onUnauthorized?: () => Promise<boolean>;
  private sessionAccessToken?: string;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    this.timeoutMs = config.timeoutMs ?? 15_000;
    this.getAccessToken = config.getAccessToken;
    this.onUnauthorized = config.onUnauthorized;
  }

  setAuthToken(token: string): void {
    this.sessionAccessToken = token;
  }

  removeAuthToken(): void {
    this.sessionAccessToken = undefined;
  }

  private resolveAccessToken(): string | undefined {
    return this.getAccessToken?.() ?? this.sessionAccessToken;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    customHeaders?: Record<string, string>,
    didRetry?: boolean
  ): Promise<HttpResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = this.resolveAccessToken();
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const options: RequestInit = {
      method,
      headers,
      credentials: "include",
      signal: controller.signal,
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options).finally(() => clearTimeout(timeoutId));

    if (response.status === 401 && !didRetry && this.onUnauthorized) {
      const handled = await this.onUnauthorized();
      if (handled) {
        return this.request<T>(method, endpoint, body, customHeaders, true);
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new HttpError(response.status, response.statusText, errorData);
    }

    const data = await response.json().catch(() => null);

    return {
      data: data as T,
      status: response.status,
      statusText: response.statusText,
    };
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>("GET", endpoint, undefined, headers);
  }

  async post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>("POST", endpoint, body, headers);
  }

  async put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>("PUT", endpoint, body, headers);
  }

  async patch<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>("PATCH", endpoint, body, headers);
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>("DELETE", endpoint, undefined, headers);
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<HttpResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = this.resolveAccessToken();
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new HttpError(response.status, response.statusText, errorData);
    }

    const data = await response.json().catch(() => null);
    return { data: data as T, status: response.status, statusText: response.statusText };
  }
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly data?: unknown
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}
