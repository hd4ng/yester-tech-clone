export function getGitHubUser(username: string): Promise<any> {
  return fetch(`https://api.github.com/users/${username}`).then((res) =>
    res.json()
  )
}
