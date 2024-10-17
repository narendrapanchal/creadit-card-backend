require('dotenv').config();
const backend_url = process.env.BACKEND_URL;
const axios = require("axios");

describe("Post /admin/login/", () => {
  test("Login success", async() => {
   const  response = await axios.post(backend_url + "/admin/login/", {
        email: "narendrapanchal020@gmail.com",
        password: "123456",
      });
    expect(response.status).toBe(200);
  });
});

describe("Post /admin/login/ - Wrong Password", () => {
  test("Login should fail due to incorrect password (400)", async () => {
    let response = await axios
      .post(backend_url + "/admin/login/", {
        email: "narendrapanchal020@gmail.com", // Correct email
        password: "12456", // Incorrect password
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
  });
});

describe("Post /admin/login/ - Email Not Found", () => {
  test("Login should fail because the email does not exist (404)", async () => {
    const response = await axios
      .post(backend_url + "/admin/login/", {
        email: "narendrapchal020@gmail.com", // Non-existent email
        password: "123456", // Any password
      })
      .catch((err) => err.response); // Catch the error and store the response
    expect(response.status).toBe(404); // Expect status code 404
  });
});


