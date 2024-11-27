const baseURL = "http://localhost:8080";

// Função para requisições GET
export async function get<T>(endpoint: string, params?: string): Promise<T> {
  const fullUrl =
    params != null
      ? `${baseURL}/${endpoint}/${params}`
      : `${baseURL}/${endpoint}`;
  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Desativa cache para obter dados mais recentes em Server Components
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Erro ao fazer GET: ${response.statusText}`);
  }
  return response.json();
}

// Função para requisições POST
export async function post<T>(endpoint: string, params: object): Promise<T> {
  const response = await fetch(`${baseURL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error(`Erro ao fazer POST: ${response.statusText}`);
  }
  return response.json();
}

// Função para requisições PUT
export async function put<T>(endpoint: string, params?: object): Promise<T> {
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (params) {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(`${baseURL}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Erro ao fazer PUT: ${response.statusText}`);
  }
  return response.json();
}
