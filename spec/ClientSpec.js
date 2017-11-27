import jasmineHttpServerSpy from "jasmine-http-server-spy"

import Client from "../lib"

describe("Session", function() {

  beforeEach(function() {
    this.apiBase = "http://localhost:1234"
  })

  describe("constructor", function() {

    it("sets a correct API base", function() {
      const client = new Client(this.apiBase)
      expect(client.apiBase).toBe(this.apiBase)
    })

  })

})
