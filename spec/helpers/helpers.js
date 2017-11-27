import jasmineHttpServerSpy from "jasmine-http-server-spy"
import "isomorphic-fetch"

beforeAll(async function() {
  this.endpoint = "http://localhost:1234/"
  /*this.httpSpy = jasmineHttpServerSpy.createSpyObj("mockServer", [
  ])*/
  //return this.httpSpy.server.start(8088)
})

afterAll(async function() {
  // return this.httpSpy.server.stop()
})

beforeEach(function() {
  spyOn(global, "fetch").and.callThrough()
})
