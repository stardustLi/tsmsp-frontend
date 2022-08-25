import { JacksonSerializable } from 'models/types/JacksonSerializable';

export async function request(url: URL | RequestInfo, options?: RequestInit) {
  const response = await fetch(url, options);
  if (response.status === 200) return await response.json();
  try {
    return await response.json();
  } catch {
    throw new Error(
      `Request failed (status: ${response.status} ${response.statusText})`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { cause: <any>response }
    );
  }
}

export function GET(url: URL | RequestInfo) {
  return request(url, {});
}

export function POST(url: URL | RequestInfo, data: JacksonSerializable) {
  return request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  });
}
