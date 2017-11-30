import jasmineHttpServerSpy from "jasmine-http-server-spy"
import "isomorphic-fetch"

beforeAll(async function() {
  this.endpoint = "http://localhost:1234/"
  this.httpSpy = jasmineHttpServerSpy.createSpyObj("mockServer", [
    {
      method: "post",
      url: "/api-auth/token",
      handlerName: "authHandler"
    }
  ])
  this.httpSpy.authHandler.and.returnValue({
    body: {
      token: "token"
    }
  })
  return this.httpSpy.server.start(1234)
})

afterAll(async function() {
  return this.httpSpy.server.stop()
})

beforeEach(function() {
  spyOn(global, "fetch").and.callThrough()
})
