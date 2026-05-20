const request = require("supertest");
const app = require("../app");

test("GET / should return API message", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe(
    "Smart Task Manager API is running"
  );
});

test("POST /register should create user", async () => {
  const response = await request(app)
    .post("/register")
    .send({
      username: "railey"
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.username).toBe("railey");
});

test("POST /tasks should create task", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({
      title: "Finish Jenkins assignment"
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe(
    "Finish Jenkins assignment"
  );
});

test("GET /health should return OK", async () => {
  const response = await request(app)
    .get("/health");

  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe("OK");
});