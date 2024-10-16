//https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0
const backend_url="http://localhost:8000"
// "https://credit-card-backend-hy1u.onrender.com";  
const axios = require('axios');
let cardId; // Variable to store the card ID
let response; // Variable to store the response

describe('GET /public/cards', () => {
  beforeAll(async () => {
    response = await axios.get(backend_url + "/public/cards");
    cardId = response.data[0]._id; // Store the ID of the first card
  });

  test('returns a list of cards', () => {
    expect(response.status).toBe(200);
    // Additional assertions if needed
    expect(response.data).toBeInstanceOf(Array); // Example assertion
    expect(response.data.length).toBeGreaterThan(0); // Ensure there's at least one card
  });
});

describe('GET /public/cards/:id', () => {
  test('returns a single card', async () => {
    const singleCardResponse = await axios.get(backend_url + "/public/cards/" + cardId);
    expect(singleCardResponse.status).toBe(200);
    expect(singleCardResponse.data._id).toBe(cardId); // Ensure the returned card matches the ID
  });
});