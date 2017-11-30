import FormData = require("form-data")
import "es6-promise"
import "isomorphic-fetch"
import {debug, setLevel} from "loglevel"

setLevel("DEBUG")

const enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

export interface UsernamePassword {
  username: string
  password: string
}

export default class {

  private async fetch(endpoint: string, args: object, method: HttpMethod = HttpMethod.Get) {
    let fetchArgs = {method, ...args}
    debug(`fetch("${endpoint}", ${JSON.stringify(fetchArgs)})`)
    let r = await fetch(endpoint, fetchArgs)
    if(r.ok) {
      let rv = await r.json()
      return rv
    } else
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

  get apiEndpoint() {
    return `${this.endpoint}/v2`
  }

  get authEndpoint() {
    return `${this.endpoint}/api-auth/token`
  }

  private token: string;

  constructor(credentials: UsernamePassword, readonly endpoint = "https://api.badgr.io") {
    const credentialsForm = new FormData()
    credentialsForm.append("username", credentials.username)
    credentialsForm.append("password", credentials.password)
    this.post(this.authEndpoint, {body: credentialsForm})
      .then((token) => this.token = token["token"])
      .catch((e) => { throw e })
  }

}
