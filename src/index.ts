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

async function myFetch(endpoint: string, args: object, method: HttpMethod = HttpMethod.Get) {
  let fetchArgs = {method, ...args}
  debug(`fetch("${endpoint}", ${JSON.stringify(fetchArgs)})`)
  let r = await fetch(endpoint, fetchArgs)
  if(r.ok)
    return await r.json()
  else
    throw new Error(r.statusText)
}

async function get(endpoint: string, args: object) {
  return myFetch(endpoint, args, HttpMethod.Get)
}

async function post(endpoint: string, args: object) {
  return myFetch(endpoint, args, HttpMethod.Post)
}

async function put(endpoint: string, args: object) {
  return myFetch(endpoint, args, HttpMethod.Put)
}

async function del(endpoint: string, args: object) {
  return myFetch(endpoint, args, HttpMethod.Delete)
}

export default class {

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
    post(this.authEndpoint, {body: credentialsForm})
      .then((token) => this.token = token["token"])
      .catch((e) => { throw e })
  }

}
