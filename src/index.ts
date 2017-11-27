import "isomorphic-fetch"

interface HttpMethod {
  readonly method: string
}

const GET = <HttpMethod>{ method: "GET" }

const POST = <HttpMethod>{ method: "POST" }

const PUT = <HttpMethod>{ method: "PUT" }

const DELETE = <HttpMethod>{ method: "DELETE" }

export default class {

  private async fetch(endpoint: string, args: object, method: HttpMethod = GET) {
    const r = await fetch(
      endpoint,
      Object.assign(
        {
          ...method
        }, args
      )
    )
    if(r.ok)
      return r.json()
    else
      throw new Error(r.statusText)
  }

  private async get(endpoint: string, args: object) {
    return this.fetch(endpoint, args, GET)
  }

  private async post(endpoint: string, args: object) {
    return this.fetch(endpoint, args, POST)
  }

  private async put(endpoint: string, args: object) {
    return this.fetch(endpoint, args, PUT)
  }

  private async delete(endpoint: string, args: object) {
    return this.fetch(endpoint, args, DELETE)
  }

  constructor(readonly apiBase = "https://api.badgr.io/v2") { }

}
