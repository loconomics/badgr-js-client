import jasmineHttpServerSpy from "jasmine-http-server-spy"

import Client, {Backpack} from "../lib"

describe("Backpack", function() {

  beforeEach(function() {
    this.endpoint = "http://localhost:1234"
    const credentials = {username: "username", password: "password"}
    this.client = new Client(credentials, this.endpoint)
  })

  describe("constructor", function() {

    it("sets a correct API endpoint", function() {
      expect(this.client.backpack.apiEndpoint).toBe(`${this.endpoint}/v2/backpack`)
    })

  })

})
