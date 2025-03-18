import db from '../src/lib/db/models'
import { DELETE } from "../src/app/api/userAPIs/[id]/route"
import { GET } from "../src/app/api/userAPIs/getUsers/route"
import { POST } from "../src/app/api/userAPIs/createUser/route"

jest.mock("../src/lib/db/models", () => ({
    Users: {
      findAll: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      save: jest.fn()
    }
  }));


describe("User API tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("GET API returns all users", async () => {
        const mockUsers = [
            {useremail: "staffone@gmail.com", role: "staff"},
            {useremail: "workleadone@gmail.com", role: "worklead"},
            {useremail: "stafftwo@gmail.com", role: "staff"},
            {useremail: "staffthree@gmail.com", role: "staff"},
            {useremail: "workleadtwo@gmail.com", role: "worklead"},
        ]

        db.Users.findAll.mockResolvedValue(mockUsers)

        const response = await GET()
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual(mockUsers)
    })

    test("POST API creates new user", async () => {
        const newUser = { useremail: "newuser@gmail.com", role: "staff" };

        db.Users.create.mockResolvedValue(newUser);

        const request = {
            json: async () => newUser
        };

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual(newUser);
    })
    
    test("DELETE API deletes user", async () => {
        const deleteUser = { useremail: "newuser@gmail.com", role: "staff", destroy: jest.fn() };

        db.Users.create.mockResolvedValue(deleteUser);

        const createRequest = {
            json: async () => deleteUser
        };

        const createResponse = await POST(createRequest);
        db.Users.findByPk.mockResolvedValue(deleteUser);

        const response = await DELETE({}, { params: { id: 1 } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({ message: "User Deleted" });
    })

    test("GET API handles errors gracefully", async () => {
        db.Users.findAll.mockRejectedValue(new Error("Database failure"));

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to fetch users" });
    })

    test("POST API handles errors gracefully", async () => {
        const invalidUser = {role: "staff"}; // Missing useremail & role

        db.Users.create.mockRejectedValue(new Error("Validation error"));

        const badRequest = {
            json: async () => invalidUser
        };

        const response = await POST(badRequest);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to create user" });
    })

    test("DELETE API fails if no user found", async () => {
        db.Users.findByPk.mockResolvedValue(null); 

        const response = await DELETE({}, { params: { id: 3232 } });
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "User not found" });
    })

    test("DELETE API fails if user ID is not found", async () => {
        db.Users.findByPk.mockResolvedValue(null)

        const response = await DELETE({}, { params: { id: null } });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data).toEqual({ error: "User ID not found" });
    })

    test("DELETE API handles errors gracefully", async () => {
        db.Users.findByPk.mockRejectedValue(new Error("DB error"));

        const response = await DELETE({}, { params: { id: 69420 } });
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "Failed to delete user" });
    })
})