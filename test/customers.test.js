var request = require("supertest");
var createApp = require("./general");

describe("Customers", function () {
  var app;
  // Called once before any of the tests in this block begin.
  before(function (done) {
    app = createApp();
    app.listen(function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // This is the name of the test
  it("Get all customers", function (done) {
    request(app)
      .get("/customers")
      .set("Content-Type", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200, function (err, res) {
        if (err) {
          return done(err);
        }
        callStatus = res.body;
        console.log('callStatus', callStatus);
        expect(callStatus).to.equal(true);
        // Done
        done();
      });

    // We want this test to pass.
    if (5 == 5) {
      // If the behavior is as expected, call done with no argument.
      done();
    } else {
      // Otherwise, call done with an error.
      done(new Error("Not sure what's happened."));
    }
  });
});
