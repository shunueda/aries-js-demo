import fetch from 'node-fetch'

export default async function fetchJson<T>(
  url: Parameters<typeof fetch>[0],
  options?: Parameters<typeof fetch>[1]
) {
  return (await (await fetch(url, options)).json()) as T
}

export async function fetchText<T>(url: string): Promise<string> {
  const response = await fetch(url)
  return response.text()
}