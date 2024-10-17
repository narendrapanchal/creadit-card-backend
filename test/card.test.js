//https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0
require('dotenv').config();
const backend_url = process.env.BACKEND_URL;
// "https://credit-card-backend-hy1u.onrender.com";
const axios = require("axios");
let cardId; // Variable to store the card ID
let response; // Variable to store the response

let token = "";

describe("GET /public/cards", () => {
  beforeAll(async () => {
    response = await axios.get(backend_url + "/public/cards");
    cardId = response.data[0]._id; // Store the ID of the first card
    loginResponse = await axios.post(backend_url + "/admin/login/", {
      email: "narendrapanchal020@gmail.com",
      password: "123456",
    });
    token = loginResponse.data.token;
  });

  test("A list of cards", () => {
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array); // Example assertion
    expect(response.data.length).toBeGreaterThan(0); // Ensure there's at least one card
  });
});

describe("GET /public/cards/:id", () => {
  test("A single card", async () => {
    const singleCardResponse = await axios.get(
      backend_url + "/public/cards/" + cardId
    );
    expect(singleCardResponse.status).toBe(200);
  });
});

describe("post /admin/add-card/", () => {
  test("A single card", async () => {
    const singleCardResponse = await axios.post(
      backend_url + "/admin/add-card/",{
        name:"Cashback Card",
          src:"https://www.credithita.com/images/cards/citi-cash-back-card.jpg",//It should have jpg/png/jpeg/gif in the end
          limit:10000,
          category:"Premium Cards",
          bank:"Citibank",
          pros:["No annual fee.","No annual fee."],
          cons:["No cost emi not available.","No cost emi not available."]
      },{
         headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,  // Example of an Authorization header
        }
      }
    ).catch((err)=>err.response);
    expect(singleCardResponse.status).toBe(201);
  });
});


describe("GET /public/cards", () => {
  beforeAll(async () => {
    response = await axios.get(backend_url + "/public/cards");
    cardId = response.data[0]._id; // Store the ID of the first card
  });

  test("A list of cards", () => {
    expect(response.status).toBe(200);
  });
});


describe("Put /admin/edit-card", () => {
  test("A list of cards", async() => {
    const  response = await axios.put(backend_url + "/admin/edit-card/"+cardId,{
      "name":"Cashback Card",
      "src":"https://www.credithita.com/images/cards/citi-cash-back-card.jpg",//It should have jpg/png/jpeg/gif in the end
      "limit":10000,
      "category":"Premium Cards",
      "bank":"Citibank",
      "pros":["No annual fee."],
      "cons":["No cost emi not available.","No cost emi not available."]
  },{
     headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,  // Example of an Authorization header
    }
  }).catch((err)=>err.response)
    expect(response.status).toBe(200);
  });
});


describe("Put /admin/edit-card", () => {
  test("A list of cards", async() => {
    const  response = await axios.put(backend_url + "/admin/edit-card/"+cardId,{
      "name":"Cashback Card",
      "src":"https://www.credithita.com/images/cards/citi-cash-back-card.jpg",//It should have jpg/png/jpeg/gif in the end
      "limit":10000,
      "category":"Premium Cards",
      "bank":"",
      "pros":["No annual fee."],
      "cons":["No cost emi not available.","No cost emi not available."]
  },{
     headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,  // Example of an Authorization header
    }
  }).catch((err)=>err.response)
    expect(response.status).toBe(500);
  });
});



describe("Delete /admin/delete-card/id", () => {
  test("A list of cards", async() => {
    const  response = await axios.delete(backend_url + "/admin/delete-card/"+cardId,{
     headers : {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,  // Example of an Authorization header
    }
  }).catch((err)=>err.response)
    expect(response.status).toBe(200);
  });
});
