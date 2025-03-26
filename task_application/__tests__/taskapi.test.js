import db from '../src/lib/db/models'
import { DELETE, PATCH } from "../src/app/api/taskAPIs/[id]/route"
import { GET } from "../src/app/api/taskAPIs/getTasks/route"
import { POST } from "../src/app/api/taskAPIs/createTask/route"


jest.mock("../src/lib/db/models", () => ({
    Task: {
      findAll: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      save: jest.fn(),
      reload: jest.fn()
    },
    TaskTags: {
        bulkCreate: jest.fn()
    }
  }));


describe("Task API tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("GET API returns all tasks", async () => {
        const mockTasks = [
            {id: 1, name: "Task 1", assignedTo: "None", status: "To-Do", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 2, name: "Task 2", assignedTo: "None", status: "To-Do", tags: [], overdue: true, deadline: "14/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 3, name: "Task 3", assignedTo: "None", status: "To-Do", tags: ["Tag 1"], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 4, name: "Task 4", assignedTo: "None", status: "Started", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 5, name: "Task 5", assignedTo: "Joey Donuts", status: "To-Do", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')},
            {id: 6, name: "Task 6", assignedTo: "None", status: "To-Do", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')}
        ]
        db.Task.findAll.mockResolvedValue(mockTasks)

        const response = await GET();
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual(mockTasks)
    })

    test("POST API creates new task", async () => {
        const newTask = {id: 1, name: "Task 1", assignedTo: 2, status: "To-Do", overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB')}



        const mockTags = [
            { id: 1, tagName: "Tag 1", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB') }
        ];
    
        db.Task.create.mockResolvedValue(newTask);
    
        newTask.reload = jest.fn().mockResolvedValue({
            ...newTask,
            tags: mockTags
        });
    
        db.TaskTags.bulkCreate.mockResolvedValue(null); 

        const req = {
            json: async () => ({
                ...newTask,
                tags: mockTags
            })
        };

        const { reload, ...expectedResponse } = {
            ...newTask,
            tags: mockTags
        };

        

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(200)
        expect(data).toEqual(expectedResponse)
        expect(data).toMatchObject(expectedResponse)
    })

    test("DELETE API deletes task", async () => {
        const deleteTask = {id: 1, name: "Task 1", assignedTo: "None", status: "To-Do", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB'), destroy: jest.fn()}

        db.Task.create.mockResolvedValue(deleteTask)

        const createRequest = {
            json: async() => deleteTask
        }

        const createResponse = await POST(createRequest)

        db.Task.findByPk.mockResolvedValue(deleteTask);

        const response = await DELETE({}, {params: {id: 1}})
        const data = await response.json()


        expect(response.status).toBe(200)
        expect(data).toEqual({message: "Task Deleted"})
        expect(deleteTask.destroy).toHaveBeenCalled();


    })

    test("PATCH API updates task", async () => {
        const updateTask = {id: 1, name: "Task 1", assignedTo: 1, status: "To-Do", tags: [], overdue: false, deadline: "20/03/2025", createdAt: new Date().toLocaleDateString('en-GB'), updatedAt: new Date().toLocaleDateString('en-GB'), save: jest.fn(), setTags: jest.fn((tagIds) => {
            updateTask.tags = updates.tags;
        })}

        db.Task.create.mockResolvedValue(updateTask)

        const createRequest = {
            json: async() => updateTask
        }

        const createResponse = await POST(createRequest)


        db.Task.findByPk.mockResolvedValue(updateTask)

        const updates = { status: "Finished", deadline: "21/03/2025", tags: [{id: 1, tagName: "Tag 1", createdAt: new Date().toLocaleDateString("en-GB"), updatedAt: new Date().toLocaleDateString("en-GB")}, {id: 2, tagName: "Tag 2", createdAt: new Date().toLocaleDateString("en-GB"), updatedAt: new Date().toLocaleDateString("en-GB")}] }

        const request = {
            json: async() => updates
        }

        const response = await PATCH(request, {params: {id: 1}})
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({message: "Task updated successfully"})
        expect(updateTask.save).toHaveBeenCalled();
        expect(updateTask.status).toBe("Finished")
        expect(updateTask.deadline).toBe("21/03/2025")
        expect(updateTask.tags).toEqual([{id: 1, tagName: "Tag 1", createdAt: new Date().toLocaleDateString("en-GB"), updatedAt: new Date().toLocaleDateString("en-GB")}, {id: 2, tagName: "Tag 2", createdAt: new Date().toLocaleDateString("en-GB"), updatedAt: new Date().toLocaleDateString("en-GB")}])

    })

    test("GET API handles errors gracefully", async () => {
        db.Task.findAll.mockRejectedValue(new Error("Database failure"))

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to fetch tasks" });
    })

    test("POST API doesn't create task if task is invalid", async() => {
        const invalidTask = {name: "Task"}

        db.Task.create.mockRejectedValue(new Error("Validation Error"))

        const badRequest = {
            json: async () => invalidTask
        }

        const response = await POST(badRequest);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: "failed to create task" });
    })

    test("DELETE API fails if task not found", async () => {
        db.Task.findByPk.mockResolvedValue(null)
        
        const response = await DELETE({}, {params: {id: 100000}})

        const data = await response.json();

        expect(response.status).toBe(404)
        expect(data).toEqual({ error: "Task not found"})
    })

    test("PATCH API fails if task not found", async () => {
        db.Task.findByPk.mockResolvedValue(null)

        const badRequest = { 
            json: async () => ({ status: "Finished" })
        }

        const response = await PATCH(badRequest, {params: {id: 10000}})
        const data = await response.json()

        expect(response.status).toBe(404)
        expect(data).toEqual({ error: "could not find task"})
    })


    test("DELETE API handles errors gracefully", async() => {
        db.Task.findByPk.mockRejectedValue(new Error("DB error"))

        const response = await DELETE({}, {params: {id: 10101}})
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data).toEqual({ error: "Failed to delete task"})

    })

    test("DELETE API fails if task not found", async() => {
        db.Task.findByPk.mockResolvedValue(null); 

        const response = await DELETE({}, { params: { id: null } });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data).toEqual({ error: "Task ID not found" });
    })

    test("PATCH API handles errors gracefully", async() => {
        db.Task.findByPk.mockRejectedValue(new Error("DB error"))

        const badRequest = {
            json: async () => ({ deadline: "22/03/2026"})
        }

        const response = await PATCH(badRequest, {params: {id: 3}})
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data).toEqual({error: "Error updating task"})
    })
})