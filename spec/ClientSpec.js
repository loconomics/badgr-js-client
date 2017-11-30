import jasmineHttpServerSpy from "jasmine-http-server-spy"

import Client from "../lib"

describe("Session", function() {

  beforeEach(function() {
    this.endpoint = "http://localhost:1234"
  })

  describe("constructor", function() {

    it("sets a correct endpoint", function() {
      const client = new Client(this.endpoint)
      expect(client.endpoint).toBe(this.endpoint)
    })

    it("sets a correct API endpoint", function() {
      const client = new Client(this.endpoint)
      expect(client.apiEndpoint).toBe(`${this.endpoint}/v2`)
    })

    it("sets a correct authentication endpoint", function() {
      const client = new Client(this.endpoint)
      expect(client.authEndpoint).toBe(`${this.endpoint}/api-auth`)
    })

  })

})
