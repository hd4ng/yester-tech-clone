let baseURL: string

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  baseURL = "http://localhost:3333"
} else {
  baseURL = "https://my-json-server.typicode.com/hd4ng/yester-tech-data"
}

export function get(path: string) {
  return fetch(`${baseURL}${path}`).then((res) => res.json())
}

export function getRaw(path: string) {
  return fetch(`${baseURL}${path}`)
}

export function post(path: string, data: { [key: string]: any } = {}) {
  return fetch(`${baseURL}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}
