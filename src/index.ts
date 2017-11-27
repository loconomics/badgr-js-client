import "isomorphic-fetch"

const enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

export default class {

  private async fetch(endpoint: string, args: object, method: HttpMethod = HttpMethod.Get) {
    const r = await fetch(
      endpoint,
      Object.assign(
        {
          method,
        }, args
      )
    )
    if(r.ok)
      return r.json()
    else
      throw new Error(r.statusText)
  }

  private async get(endpoint: string, args: object) {
    return this.fetch(endpoint, args, HttpMethod.Get)
  }

  private async post(endpoint: string, args: object) {
    return this.fetch(endpoint, args, HttpMethod.Post)
  }

  private async put(endpoint: string, args: object) {
    return this.fetch(endpoint, args, HttpMethod.Put)
  }

  private async delete(endpoint: string, args: object) {
    return this.fetch(endpoint, args, HttpMethod.Delete)
  }

  constructor(readonly apiBase = "https://api.badgr.io/v2") { }

}
