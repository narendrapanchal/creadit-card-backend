//https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0
require('dotenv').config();
const backend_url = process.env.BACKEND_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
// "https://credit-card-backend-hy1u.onrender.com";
const axios = require("axios");
let cardId; // Variable to store the card ID
let response; // Variable to store the response


describe("Post /user/apply", () => {
  test("A list of cards", async () => {
    const cardList = await axios.get(backend_url + "/public/cards");
    cardId = cardList.data[0]._id;
    const response = await axios.post(backend_url + "/user/apply", {
      cardId,
      personalInfo: {
        name: "Panchal",
        income: "10000",
        email: "narendrapanchal020@gmail.com",
        phone: "9899082992",
        aadhar: "291308002904",
        pancard: "ESDPP1232G",
        address: "Bakhtal Alwar Rajasthan",
        pincode: "121232",
      },
    });
    expect(response.status).toBe(201);// Ensure there's at least one card
  });
});

describe("GET /admin/application/:id", () => {
  test("A single card", async () => {
    const  loginResponse = await axios.post(backend_url + "/admin/login/", {
        email,
        password,
      });
    const  token = loginResponse.data.token;
    const applications=await axios.get(backend_url+"/admin/applications/",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
    })
    const applicationId=applications.data[0]._id;

    const singleCardResponse = await axios.put(
      backend_url + "/admin/applications/" + applicationId,{
        status:"approved"
      },
      {
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
      }
    );
    expect(singleCardResponse.status).toBe(200);
  });
});
