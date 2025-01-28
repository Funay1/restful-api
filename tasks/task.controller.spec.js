const request = require("supertest");
const app = require("../app");

const MOCK_TASKS = [
  { completed: true, id: 1, title: "Title 1" },
  { completed: true, id: 2, title: "Title 2" },
  { completed: true, id: 3, title: "Title 3" },
  { completed: false, id: 4, title: "Title 4" },
  { completed: true, id: 5, title: "Title 5" },
  { completed: false, id: 6, title: "Title 6" },
];

describe("Tasks controller", () => {
  describe("getAll", () => {
    it("should get all tasks", async () => {
      return request(app)
        .get("/tasks")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(MOCK_TASKS);
        });
    });
  });

  describe("create", () => {
    it("should return 400 when title is missing", async () => {
      return request(app)
        .post("/tasks")
        .send({
            completed: true,
            title: ""
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
    });
  });
  it.each([[undefined], ["abc"]])("should return 400 when completed is missing or wrong format", async (completed) => {
    return request(app)
      .post("/tasks")
      .send({
          completed,
          title: "abc"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
  });

  it('should create a task', async () => {
    return request(app)
      .post("/tasks")
      .set("Accept", "application/json")
      .send({
          completed: true,
          title: "abc"
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual({
            title: "abc",
            completed: true,
            id: expect.any(Number)
        })
      })
  })
  
});
