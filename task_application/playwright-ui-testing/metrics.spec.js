import { test, expect } from '@playwright/test';
const loginPage = 'http://localhost:3000/login'
const allTasksPage = 'http://localhost:3000/dashboard/alltasks'
const staffPage = 'http://localhost:3000/dashboard/staff'
const metricsPage = 'http://localhost:3000/dashboard/metrics'


async function loginAsWorkLead(page) {
    await page.goto(loginPage);
    await page.getByRole('button', { name: 'Work-Lead' }).click();
    await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(allTasksPage);
}

async function LogOutAsWorkLead(page) {
    await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
    await page.getByRole('button', { name: 'Log Out' }).click();        
    await expect(page).toHaveURL(loginPage);
}
async function goToStaffPage(page) {
    await page.getByRole('link', { name: "Staff" }).click();
    await expect(page).toHaveURL(staffPage);
}
async function goToAllTasksPage(page) {
    await page.getByRole('link', {name: "All Tasks"}).click()
    await expect(page).toHaveURL(allTasksPage)
}
async function goToMetricsPage(page) {
    await expect(page.getByRole('link', { name: "Metrics" })).toBeVisible();
    await page.getByRole('link', {name: "Metrics"}).click();
    await expect(page).toHaveURL(metricsPage);
}
async function addStaffMember(page, name, email) {
    await page.getByRole('button', { name: 'Add Staff Member' }).click();
    await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(name);
    await page.getByRole('textbox', { name: 'Enter staff email' }).fill(email);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.getByText(name)).toBeVisible();
}

async function deleteStaffMember(page, name, email, date) {
    await expect(page.getByText(name)).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();

    await page.locator('div').filter({ 
        hasText: new RegExp(`^Date Added: ${date}Email: ${email}Remove Staff Member$`)
    }).getByRole('button').click();

    await expect(page.getByText(name)).not.toBeVisible();
}
async function createTag(page, tagName) {
    await expect(page.getByRole('button', { name: '+' }).nth(3)).toBeVisible();
    await page.getByRole('button', { name: '+' }).nth(3).click();

    await expect(page.getByRole('textbox', { name: 'Tag Name:' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Tag Name:' }).click();
    await page.getByRole('textbox', { name: 'Tag Name:' }).fill(tagName);

    await expect(page.getByText('AddCancel')).toBeVisible();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText(`${tagName}▼`)).toBeVisible();
}

async function deleteTag(page, tagName) {
    await expect(page.locator('div').filter({ hasText: new RegExp(`^No tasks in ${tagName}Delete Tag$`)}).getByRole('button')).toBeVisible();
    await page.locator('div').filter({hasText: new RegExp(`^No tasks in ${tagName}Delete Tag$`)}).getByRole('button').click();
}

async function createTask(page, taskName, staffLabel, deadline, hasTag) {
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('textbox', { name: 'Task Name:' }).fill(taskName);
    await page.getByRole('combobox').first().selectOption({ label: staffLabel });
    await page.getByRole('textbox', { name: 'Deadline:' }).fill(deadline);

    if (hasTag && Array.isArray(hasTag) && hasTag.length > 0) {
        for (const tag of hasTag) {
            await expect(page.locator('div').filter({ hasText: new RegExp(`^${tag}$`)}).getByRole('checkbox')).toBeVisible();
            await page.locator('div').filter({ hasText: RegExp(`^${tag}$`) }).getByRole('checkbox').check();
            await expect(page.locator('div').filter({ hasText: RegExp(`^${tag}$`) }).getByRole('checkbox')).toBeChecked();
        }
    }

    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText(`${taskName}...`).first()).toBeVisible();
}

async function deleteTask(page, taskName) {
    await page.locator('div').filter({ hasText: new RegExp(`^${taskName}...$`)}).getByRole('button').first().click();
    await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
}
test.beforeEach(async ({ page }) => {
    await page.goto(loginPage);
    await loginAsWorkLead(page);


    await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

    await goToStaffPage(page)

    const staffList = [
        { name: 'Joey Donuts', email: 'jd@gmail.com' },
        { name: 'Mark Angus', email: 'ma@gmail.com' },
        { name: 'Albert Zan', email: 'az@gmail.com' }
    ];

    for (const staff of staffList) {
        await addStaffMember(page, staff.name, staff.email)
    }

    for (const staff of staffList) {
        await expect(page.getByText(staff.name)).toBeVisible();
    }

    await goToAllTasksPage(page)



    const taskList = [
        {
        taskName: "Task 1",
        assign: "Joey Donuts",
        deadline: "17/03/2025",
        num: 1
        },
        {
        taskName: "Task 2",
        assign: "Mark Angus",
        deadline: "16/03/2025",
        num: 2

        },
        {
        taskName: "Task 3",
        assign: "Albert Zan",
        deadline: "15/03/2025",
        num: 3
        },
        {
        taskName: "Task 4",
        assign: "Joey Donuts",
        deadline: "12/03/2025",
        num: 4
        },
        {
        taskName: "Task 5",
        assign: "Mark Angus",
        deadline: "11/03/2025",
        num: 5

        },
        {
        taskName: "Task 6",
        assign: "Albert Zan",
        deadline: "10/03/2025",
        num: 6
        }
    ]
    await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();

    for (const task of taskList){
        await createTask(page, task.taskName, task.assign, task.deadline, [])
    }
    await goToMetricsPage(page);
});

test.afterEach( async ({ page }) => {
    await goToAllTasksPage(page)

    const taskList = [
        {
        taskName: "Task 1",
        assign: "Joey Donuts",
        deadline: "17/03/2025",
        num: 1
        },
        {
        taskName: "Task 2",
        assign: "Mark Angus",
        deadline: "16/03/2025",
        num: 2

        },
        {
        taskName: "Task 3",
        assign: "Albert Zan",
        deadline: "15/03/2025",
        num: 3
        },
        {
        taskName: "Task 4",
        assign: "Joey Donuts",
        deadline: "12/03/2025",
        num: 4
        },
        {
        taskName: "Task 5",
        assign: "Mark Angus",
        deadline: "11/03/2025",
        num: 5

        },
        {
        taskName: "Task 6",
        assign: "Albert Zan",
        deadline: "10/03/2025",
        num: 6
        }
    ]
    for (const task of taskList) {
        await deleteTask(page, task.taskName)
    }
    await goToStaffPage(page)
    const staffList = [
        { name: 'Joey Donuts', email: 'jd@gmail.com', date: new Date().toLocaleDateString('en-GB')},
        { name: 'Mark Angus', email: 'ma@gmail.com', date: new Date().toLocaleDateString('en-GB')},
        { name: 'Albert Zan', email: 'az@gmail.com', date: new Date().toLocaleDateString('en-GB')}
    ];

    for (const staff of staffList) {
        await deleteStaffMember(page, staff.name, staff.email, staff.date)

    };
    await LogOutAsWorkLead(page);

})
// test.describe("Metrics Page Tests", () => {
    test("Tasks Assigned Correctly", async ({ page }) => {

        

        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').first()).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(1)).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(2)).toBeVisible()
    })

    test("Moving Task to Finished adds 1 task completed", async ({ page }) => {
        await goToAllTasksPage(page)
        await page.getByRole('button', { name: '...' }).first().click();
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')
        await statusbox.selectOption('Finished');
        await page.getByRole('heading', { name: 'Finished ▼' }).locator('span').click();
        await goToMetricsPage(page)

        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 1Completion Rate: 50%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').first()).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(1)).toBeVisible()

    })
    test("Reassign Tasks Updates Correctly on Metrics Page", async ({ page }) => {
        await goToAllTasksPage(page)
        await page.getByRole('button', { name: '...' }).first().click();
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await page.getByRole('button', { name: '...' }).first().click();
        await goToMetricsPage(page)

        await expect(page.getByText('Tasks Assigned: 1Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 3Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        

    })
    test("Reassign 2 tasks from 1 staff to another, clearing one staffs tasks", async ({ page }) => {
        await goToAllTasksPage(page)
        await page.getByRole('button', { name: '...' }).first().click();
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await page.getByRole('button', { name: '...' }).first().click();
        await page.locator('div').filter({ hasText: /^Task 4\.\.\.$/ }).getByRole("button", {name: "..."}).first().click()
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await page.locator('div').filter({ hasText: /^Task 4\.\.\.$/ }).getByRole("button", {name: "..."}).first().click()
        await goToMetricsPage(page)

        await expect(page.getByText('Tasks Assigned: 0Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 4Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%')).toBeVisible()

    })
    test("Reassign all tasks to one staff member", async ({ page }) => {
        const taskNames = ["Task 3", "Task 4", "Task 6"]
        await goToAllTasksPage(page)
        await page.getByRole('button', { name: '...' }).first().click();
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await page.getByRole('button', { name: '...' }).first().click();
        for (const task of taskNames) {
            await page.locator('div').filter({ hasText: new RegExp(`^${task}...$`)}).getByRole("button", {name: "..."}).first().click()
            await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
            await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
                - combobox:
                  - option "Joey Donuts" 
                  - option "Mark Angus" [selected]
                  - option "Albert Zan"
                `);
            await page.locator('div').filter({ hasText: new RegExp(`^${task}...$`) }).getByRole("button", {name: "..."}).first().click()
        }
        await goToMetricsPage(page)
        await expect(page.getByText('Tasks Assigned: 0Tasks Completed: 0Completion Rate: 0%').first()).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 0Tasks Completed: 0Completion Rate: 0%').nth(1)).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 6Tasks Completed: 0Completion Rate: 0%')).toBeVisible()


        
    })
    test("Reassign 1 task from each staff to another staff member,mark 3/4 as complete and complete 1 of the other staff members", async ({ page }) => {
        await goToAllTasksPage(page)
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')
        await page.getByRole('button', { name: '...' }).first().click();
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await statusbox.selectOption('Finished');

        await page.getByRole('button', { name: '...' }).first().click();
        await page.locator('div').filter({ hasText: new RegExp(`^Task 3...$`)}).getByRole("button", {name: "..."}).first().click()
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
                - option "Joey Donuts" 
                - option "Mark Angus" [selected]
                - option "Albert Zan"
            `);
        await statusbox.selectOption('Finished');

        await page.locator('div').filter({ hasText: new RegExp(`^Task 3...$`) }).getByRole("button", {name: "..."}).first().click()
        await page.locator('div').filter({ hasText: new RegExp(`^Task 4...$`)}).getByRole("button", {name: "..."}).first().click()
        await statusbox.selectOption('Finished');
        await page.locator('div').filter({ hasText: new RegExp(`^Task 4...$`)}).getByRole("button", {name: "..."}).first().click()
        await page.locator('div').filter({ hasText: new RegExp(`^Task 2...$`)}).getByRole("button", {name: "..."}).first().click()
        await statusbox.selectOption('Finished');
        await page.locator('div').filter({ hasText: new RegExp(`^Task 2...$`)}).getByRole("button", {name: "..."}).first().click()
        await page.getByRole('heading', { name: 'Finished ▼' }).locator('span').click();
        await goToMetricsPage(page)
        await expect(page.getByText('Tasks Assigned: 4Tasks Completed: 3Completion Rate: 75%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 1Tasks Completed: 1Completion Rate: 100%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 1Tasks Completed: 0Completion Rate: 0%')).toBeVisible()




    })
    test("Deleted Task no longer shows up on Metrics page", async ({ page }) => {
        await goToAllTasksPage(page)
        await deleteTask(page, "Task 1");
        await goToMetricsPage(page)

        await expect(page.getByText('Tasks Assigned: 1Tasks Completed: 0Completion Rate: 0%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').first()).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(1)).toBeVisible()
        
        await goToAllTasksPage(page)
        await createTask(page, "Task 1", "Joey Donuts", "17/03/2025", [])
        await goToMetricsPage(page)

    })
    test("Triangular Reassignment doesn't cause any unexpected behavior", async ({ page }) => {
        await goToAllTasksPage(page)
        await page.getByRole('button', { name: '...' }).first().click();
        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await page.getByRole('button', { name: '...' }).first().click();

        await page.locator('div').filter({ hasText: new RegExp(`^Task 2...$`)}).getByRole("button", {name: "..."}).first().click()
        await page.getByRole('combobox').first().selectOption({label: "Albert Zan"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
                - option "Joey Donuts" 
                - option "Mark Angus" 
                - option "Albert Zan" [selected]
            `);

        await page.locator('div').filter({ hasText: new RegExp(`^Task 2...$`) }).getByRole("button", {name: "..."}).first().click()

        await page.locator('div').filter({ hasText: new RegExp(`^Task 3...$`)}).getByRole("button", {name: "..."}).first().click()
        await page.getByRole('combobox').first().selectOption({label: "Joey Donuts"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
                - option "Joey Donuts" [selected]
                - option "Mark Angus" 
                - option "Albert Zan" 
            `);

        await page.locator('div').filter({ hasText: new RegExp(`^Task 3...$`) }).getByRole("button", {name: "..."}).first().click()
        
        await goToMetricsPage(page)
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').first()).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(1)).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%').nth(2)).toBeVisible()


        
    })
    test("Test Sort on Metrics Page, have 4 tasks 3 tasks 2 tasks on staff and 3 complete 2 complete 0 complete", async ({ page }) => {
        await goToAllTasksPage(page)
        const tasks = [
            {
            taskName: "Task 7",
            assign: "Joey Donuts",
            deadline: "28/03/2025",
            },
            {
            taskName: "Task 8",
            assign: "Joey Donuts",
            deadline: "28/03/2025",
            },
            {
            taskName: "Task 9",
            assign: "Mark Angus",
            deadline: "28/03/2025",
            }
        ]
        const taskNameToFinished = ["Task 1", "Task 2", "Task 5", "Task 7", "Task 8"]
        for (const task of tasks) {
            await createTask(page, task.taskName, task.assign, task.deadline, [])
        }
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')
        for (const task of taskNameToFinished) {
            await page.locator('div').filter({ hasText: new RegExp(`^${task}...$`)}).getByRole("button", {name: "..."}).first().click()

            await statusbox.selectOption("Finished")

            await page.locator('div').filter({ hasText: new RegExp(`^${task}...$`)}).getByRole("button", {name: "..."}).first().click()
        }
        await page.getByRole('heading', { name: 'Finished ▼' }).locator('span').click();
        await goToMetricsPage(page)
        await expect(page.getByText('Tasks Assigned: 4Tasks Completed: 3Completion Rate: 75%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 3Tasks Completed: 2Completion Rate: 67%')).toBeVisible()
        await expect(page.getByText('Tasks Assigned: 2Tasks Completed: 0Completion Rate: 0%')).toBeVisible()

        await expect(page.getByRole('button', { name: 'Sort' })).toBeVisible();

        await page.getByRole('button', { name: 'Sort' }).click();
        await expect(page.getByRole('button', { name: 'Most Tasks Assigned' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Least Tasks Assigned' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Most Tasks Completed' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Least Tasks Completed' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Highest Completion Rate' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Lowest Completion Rate' })).toBeVisible();

        const staffList = [
            { name: "Joey Donuts", tasksAssigned: 4, tasksCompleted: 3},
            { name: "Mark Angus", tasksAssigned: 3, tasksCompleted: 2},
            { name: "Albert Zan", tasksAssigned: 2, tasksCompleted: 0},
        ]

        await page.getByRole('button', { name: 'Most Tasks Assigned' }).click();     
        await page.waitForTimeout(100);
   
        let displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByAssigned = staffList
            .sort((a, b) => b.tasksAssigned - a.tasksAssigned)
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByAssigned);
    
        await page.getByRole('button', { name: 'Least Tasks Assigned' }).click();
        await page.waitForTimeout(500);
    
        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByLeastAssigned = staffList
            .sort((a, b) => a.tasksAssigned - b.tasksAssigned)
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByLeastAssigned);
    
        await page.getByRole('button', { name: 'Most Tasks Completed' }).click();
        await page.waitForTimeout(500);
    
        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByMostCompleted = staffList
            .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByMostCompleted);

        await page.getByRole('button', { name: 'Least Tasks Completed' }).click();
        await page.waitForTimeout(500);
    
        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByLeastCompleted = [...staffList]
            .sort((a, b) => a.tasksCompleted - b.tasksCompleted)
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByLeastCompleted);

        await page.getByRole('button', { name: 'Lowest Completion Rate' }).click();
        await page.waitForTimeout(500);
    
        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByLowestRate = staffList
            .sort((a, b) => (a.tasksCompleted / a.tasksAssigned) - (b.tasksCompleted / b.tasksAssigned))
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByLowestRate);

        await page.getByRole('button', { name: 'Highest Completion Rate' }).click();
        await page.waitForTimeout(500);
    
        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())
        let sortedByHighestRate = [...staffList]
            .sort((a, b) => (b.tasksCompleted / b.tasksAssigned) - (a.tasksCompleted / a.tasksAssigned))
            .map(staff => staff.name);
    
        expect(displayedNames).toEqual(sortedByHighestRate);

        await goToAllTasksPage(page)
        for (const task of tasks) {
            await deleteTask(page, task.taskName)
        }
        await goToMetricsPage(page)

    })

// })