import db from '../src/lib/db/models'
import { DELETE } from "../src/app/api/tagAPIs/[id]/route"
import { GET } from "../src/app/api/tagAPIs/getTags/route"
import { POST } from "../src/app/api/tagAPIs/createTag/route"

jest.mock("../src/lib/db/models", () => ({
    Tag: {
      findAll: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      save: jest.fn()
    }
  }));


describe("Tag API tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("GET API returns all tags", async () => {
        const mockTags = [
            {id: 1, tagName: "Tag 1", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 2, tagName: "Tag 2", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 3, tagName: "Tag 3", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
       ]

       db.Tag.findAll.mockResolvedValue(mockTags)

       const response = await GET()
       const data = await response.json()

       expect(response.status).toBe(200)
       expect(data).toEqual(mockTags)
    })

    test("POST API creates new tag", async () => {
        const mockTag = "Tag 1"

        db.Tag.create.mockResolvedValue(mockTag)

        const createRequest = {
            json: async () => mockTag
        }

        const response = await POST(createRequest)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual(mockTag)
    })
    test("DELETE API deletes tag", async () => {
        const mockTag = {tagName: "Tag 1", destroy: jest.fn()}

        db.Tag.create.mockResolvedValue(mockTag)

        const createRequest = {
            json: async () => mockTag
        }
        const createResponse = await POST(createRequest)


        db.Tag.findByPk.mockResolvedValue(mockTag)

        const deleteResponse = await DELETE({}, {params: {id: 1}})
        const data = await deleteResponse.json()

        expect(deleteResponse.status).toBe(200)
        expect(data).toEqual({message: "Tag Deleted"})
    })

    test("GET API handles errors gracefully", async() => {
        db.Tag.findAll.mockRejectedValue(new Error("Big Error!!"))

        const response = await GET()
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data).toEqual({error: "failed to fetch tags"})
    })

    test("POST API fails when creating invalid tag", async() => {
        const invalidTag = {tagName: 2, randomfield: "random"}

        db.Tag.create.mockRejectedValue(new Error("Validation Error"))

        const badRequest = {
            json: async() => invalidTag
        }

        const badResponse = await POST(badRequest)
        const data = await badResponse.json()

        expect(badResponse.status).toBe(500)
        expect(data).toEqual({error: "failed to create tag"})
    })

    test("DELETE API fails when tag ID not found", async() => {
        db.Tag.findByPk.mockResolvedValue(null)

        const response = await DELETE({}, {params: {id: null}})
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data).toEqual({error: "Tag ID not found"})
    })

    test("DELETE API fails when tag is not found", async() => {
        db.Tag.findByPk.mockResolvedValue(null)

        const response = await DELETE({}, {params: {id: 100}})
        const data = await response.json()

        expect(response.status).toBe(404)
        expect(data).toEqual({error: "Tag not found"})
    })
    
    test("DELETE API handles errors gracefully", async() => {
        db.Tag.findByPk.mockResolvedValue(new Error("Error Error !!!!"))

        const response = await DELETE({}, {params: {id: 100}})
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data).toEqual({error: "Failed to delete tag"})
    })
})