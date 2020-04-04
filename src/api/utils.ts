const baseURL = "http://localhost:3333"

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
