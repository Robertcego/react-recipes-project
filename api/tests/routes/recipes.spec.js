const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const recipeModel = require("../../src/controllers/recipe");

const agent = session(app);
const recipe = {
  name: "Milanesa a la napolitana",
  summary: "un ejemplo de description",
};

describe("recipes routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {
    it("should get 200", () => {
      return agent
        .get("/recipes") // hacemos un request HTTP: GET a '/recipes'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql([]); // testeamos la respuesta con el body
        });
    });

    //otros it
    it("GET responde con un array con las recetas encontradas", function () {
      recipeModel.add(recipe);
      //Recipe.addFamily('Gorgory');
      return agent
        .get("/recipes?name=milanesa")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body[0].name).to.eql("Milanesa a la napolitana");
          expect(res.body[0].summary).to.eql("un ejemplo de description");
        });
    });
  });

  //otros
  describe("/recipes/:name", function () {
    recipeModel.add(recipe);
    /*
    it("GET responde con un objeto vacío si la receta no existe", function () {
      return agent
        .get("/recipes/9")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql({});
        });
    });
    */
    it("GET responde con la receta encontrada", function () {
      return agent
        .get("/recipes/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.name).to.eql("Milanesa a la napolitana");
          expect(res.body.summary).to.eql("un ejemplo de description");
        });
    });
  });
  //describe gral
});
