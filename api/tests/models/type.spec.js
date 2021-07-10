const { conn } = require("../../src/db.js");
const { expect } = require("chai");
const typeModel = require("../../src/controllers/recipe");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => conn.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        typeModel
          .add({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        typeModel.add({ name: "carnivoro" });
      });
    });
  });
});
