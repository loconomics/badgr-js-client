import jasmineHttpServerSpy from "jasmine-http-server-spy"

import {Client} from "../lib"

describe("Client", function() {

  beforeEach(function() {
    this.endpoint = "http://localhost:1234"
    this.credentials = {username: "username", password: "password"}
    this.token = "token"
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
      const client = new Client(this.credentials, this.endpoint)
      expect(client.authEndpoint).toBe(`${this.endpoint}/api-auth/token`)
    })

    it("sets a correct token when called with a username and password", function(done) {
      const client = new Client(this.credentials, this.endpoint)
      setTimeout(() => {
        expect(client.token).toBe(this.token)
        done()
      }, 200)
    })

  })

})
