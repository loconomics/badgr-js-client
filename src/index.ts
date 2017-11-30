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

async function myFetch(endpoint: string, args: object = {}, method: HttpMethod = HttpMethod.Get, token?: string) {
  const headers = new Headers()
  if(token)
    headers.append("Authorization", `Token ${token}`)
  let fetchArgs = {headers, method, ...args}
  debug(`fetch("${endpoint}", ${JSON.stringify(fetchArgs)})`)
  let r = await fetch(endpoint, fetchArgs)
  if(r.ok)
    return await r.json()
  else
    throw new Error(r.statusText)
}

async function get(endpoint: string, args: object, token?: string) {
  return myFetch(endpoint, args, HttpMethod.Get, token)
}

async function post(endpoint: string, args: object, token?: string) {
  return myFetch(endpoint, args, HttpMethod.Post, token)
}

async function put(endpoint: string, args: object, token?: string) {
  return myFetch(endpoint, args, HttpMethod.Put, token)
}

async function del(endpoint: string, args: object, token?: string) {
  return myFetch(endpoint, args, HttpMethod.Delete, token)
}

export class Backpack {

  get apiEndpoint() {
    return `${this.client.apiEndpoint}/backpack`
  }

  get collections() {
    return get(`${this.apiEndpoint}/collections`, {}, this.client.token)
      .then((r) => r.result)
  }

  constructor(readonly client: Client) { }

}

export default class Client {

  get apiEndpoint() {
    return `${this.endpoint}/v2`
  }

  get authEndpoint() {
    return `${this.endpoint}/api-auth/token`
  }

  token: string

  readonly backpack: Backpack

  constructor(credentials: UsernamePassword, readonly endpoint = "https://api.badgr.io") {
    const credentialsForm = new FormData()
    credentialsForm.append("username", credentials.username)
    credentialsForm.append("password", credentials.password)
    this.backpack = new Backpack(this)
    post(this.authEndpoint, {body: credentialsForm})
      .then((r) => {
        const token = r["token"]
        this.token = token
      })
      .catch((e) => { throw e })
  }

}
