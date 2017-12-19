import jasmineHttpServerSpy from "jasmine-http-server-spy"

import {Client} from "../lib"

describe("Client", function() {

  beforeEach(function() {
    this.endpoint = "http://localhost:1234"
    this.usernamePasswordCredentials = {username: "username", password: "password"}
    this.bearerCredentials = "token"
  })

  describe("constructor", function() {

    it("sets a correct endpoint", function() {
      const client = new Client(this.credentials, this.endpoint)
      expect(client.endpoint).toBe(this.endpoint)
    })

    it("sets a correct API endpoint", function() {
      const client = new Client(this.credentials, this.endpoint)
      expect(client.apiEndpoint).toBe(`${this.endpoint}/v2`)
    })

    it("sets a correct authentication endpoint", function() {
      const client = new Client(this.usernamePasswordCredentials, this.endpoint)
      expect(client.authEndpoint).toBe(`${this.endpoint}/api-auth/token`)
    })

    it("sets a correct token when called with a username and password", function(done) {
      const client = new Client(this.usernamePasswordCredentials, this.endpoint)
      setTimeout(() => {
        expect(client.token).toEqual({kind: "v1", token: "token"})
        done()
      }, 200)
    })

    it("sets a correct token when called with a bearer token", function(done) {
      const client = new Client(this.bearerCredentials, this.endpoint)
      setTimeout(() => {
        expect(client.token).toEqual({kind: "oauth", token: "token"})
        done()
      }, 200)
    })

  })

})
