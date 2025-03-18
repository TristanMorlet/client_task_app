import db from '../src/lib/db/models'
import { DELETE, PATCH } from "../src/app/api/staffAPIs/[id]/route"
import { GET } from "../src/app/api/staffAPIs/getStaff/route"
import { POST } from "../src/app/api/staffAPIs/createStaff/route"

jest.mock("../src/lib/db/models", () => ({
    Staff: {
      findAll: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      save: jest.fn()
    }
  }));
describe("Staff API tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("GET api returns staff members", async () => {
        const mockStaff = [
            {id: 1, name: "Joey Donuts", role: "staff", userId: 1, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: [], createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB') },
            {id: 2, name: "Josh Jones", role: "staff", userId: 2, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: [], createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 3, name: "Jeremy James", role: "staff", userId: 3, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: [], createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')}
        ]

        db.Staff.findAll.mockResolvedValue(mockStaff)

        const response = await GET()
        const data = await response.json()
        
        expect(response.status).toBe(200)
        expect(data).toEqual(mockStaff)
    })
    test("POST api creates staff member", async () => {
        const mockStaffMember = {id: 1, name: "Joey Donuts", role: "staff", userId: 1, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: []}

        db.Staff.create.mockResolvedValue(mockStaffMember)

        const response = await POST({
            json: async () => mockStaffMember
        })

        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data).toEqual(mockStaffMember);

    })
    test("DELETE api deletes staff member", async () => {
        const mockStaffMember = {id: 1, name: "Joey Donuts", role: "staff", userId: 1, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: [], destroy: jest.fn()}


        db.Staff.create.mockResolvedValue(mockStaffMember)
        const createRequest = {
            json: async () => mockStaffMember
        }
        const createresponse = await POST(createRequest)


        db.Staff.findByPk.mockResolvedValue(mockStaffMember)

        const deleteresponse = await DELETE({}, { params: {id: 1}})
        const data = await deleteresponse.json()

        expect(deleteresponse.status).toBe(200)
        expect(data).toEqual({message: "Staff Deleted"})
    })
    test("PATCH api updates staff member", async () => {
        const mockStaffMember = {id: 1, name: "Joey Donuts", role: "staff", userId: 1, dateAdded: new Date().toLocaleDateString('en-GB'), tasksAssigned: 0, tasksCompleted: 0, taskList: [], completeList: [], save: jest.fn()}
        db.Staff.create.mockResolvedValue(mockStaffMember)

        const createRequest = {
            json: async () => mockStaffMember
        }

        const createresponse = await POST(createRequest)


        const newTaskList = [1, 3, 6, 10]
        const newCompleteList = [2, 4, 9]

        db.Staff.findByPk.mockResolvedValue(mockStaffMember)
        
        const updates = {taskList: newTaskList, completeList: newCompleteList, tasksAssigned: newTaskList.length + newCompleteList.length, tasksCompleted: newCompleteList.length}
        const request = {
            json: async () => updates
        }
        const patchResponse = await PATCH(request, {params: {id: 1}})

        const data = await patchResponse.json()
        expect(patchResponse.status).toBe(200);
        expect(mockStaffMember.taskList).toEqual(newTaskList)
        expect(mockStaffMember.completeList).toEqual(newCompleteList)
        expect(mockStaffMember.tasksAssigned).toEqual(7)
        expect(mockStaffMember.tasksCompleted).toEqual(3)
    })

    test("GET API handles errors gracefully", async () => {
        db.Staff.findAll.mockRejectedValue(new Error("Database failure"));

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to fetch staff" });
    })

    test("POST API fails to create invalid staff member", async () => {
        const invalidStaff = {name: "Invalid Guy"};

        db.Staff.create.mockRejectedValue(new Error("Validation error"));

        const badRequest = {
            json: async () => invalidStaff
        };

        const response = await POST(badRequest);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to create staff" });
    })

    test("DELETE API fails if no staff found", async () => {
        db.Staff.findByPk.mockResolvedValue(null); 

        const response = await DELETE({}, { params: { id: 9999 } });
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "Staff not found" });
    })

    test("DELETE API fails if no ID is invalid", async () => {
        db.Staff.findByPk.mockResolvedValue(null); 

        const response = await DELETE({}, { params: { id: null } });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data).toEqual({ error: "Staff ID not found" });
    })

    test("PATCH API fails if no staff found", async () => {
        db.Staff.findByPk.mockResolvedValue(null);

        const badRequest = {
            json: async () => ({ name: "No Name" })
        };
    
        const response = await PATCH(badRequest, { params: { id: 2 } });
        const data = await response.json();


        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "could not find staff" });
    })

    test("DELETE API handles errors gracefully", async () => {
        db.Staff.findByPk.mockRejectedValue(new Error("idk")); 

        const response = await DELETE({}, { params: { id: 9999 } });
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "Failed to delete Staff" });
    })

    test("PATCH API handles errors gracefully", async () => {
        db.Staff.findByPk.mockRejectedValue(new Error("omg error time!"));

        const badRequest = {
            json: async () => ({ name: "No Name" })
        };
    
        const response = await PATCH(badRequest, { params: { id: 2 } });
        const data = await response.json();


        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "Error updating staff" });
    })
})