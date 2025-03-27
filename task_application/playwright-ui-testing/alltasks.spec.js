import { addStaff } from '@/app/state/staff/staffSlice';
import { test, expect } from '@playwright/test';

const loginPage = 'http://localhost:3000/login'
const allTasksPage = 'http://localhost:3000/dashboard/alltasks'
const staffPage = 'http://localhost:3000/dashboard/staff'



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
test.beforeEach(async ({ page }) => {;
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

});

test.afterEach(async ({ page }) => {
    await goToStaffPage(page)

    const staffList = [
        { name: 'Joey Donuts', email: 'jd@gmail.com', date: new Date().toLocaleDateString('en-GB')},
        { name: 'Mark Angus', email: 'ma@gmail.com', date: new Date().toLocaleDateString('en-GB')},
        { name: 'Albert Zan', email: 'az@gmail.com', date: new Date().toLocaleDateString('en-GB')}
    ];

    for (const staff of staffList) {
        await deleteStaffMember(page, staff.name, staff.email, staff.date)
    };
    await goToAllTasksPage(page)
    await LogOutAsWorkLead(page)

})

 // test.describe("Worklead All Task Page Tests", () => {
    

    test('Create Task no Tag', async ({ page }) => {
        await goToStaffPage(page)
        const staffOne = {name: "Staff One", email: "staffone@gmail.com", date: new Date().toLocaleDateString('en-GB')}
        await addStaffMember(page, staffOne.name, staffOne.email)
        await goToAllTasksPage(page)

        const task = {taskName: "Task 1", staffLabel: "Staff One", deadline: "28/03/2025", hasTag: false}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)

        await page.getByRole('button', { name: '...' }).click();
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts"
              - option "Mark Angus"
              - option "Albert Zan"
              - option "Staff One" [selected]
            `);
        await expect(page.getByRole('heading', { name: 'Reschedule' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toHaveValue('To-Do');

        await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();

        await page.getByRole('button', { name: '...' }).click();
        await page.getByRole('button', { name: '...' }).click();
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await goToStaffPage(page)
        await deleteStaffMember(page, staffOne.name, staffOne.email, staffOne.date)
        await goToAllTasksPage(page)

    });
    test('Create Tag', async ({ page }) => {
        const tag = "Tag 1"
        await createTag(page, tag)

        await page.getByRole('heading', { name: 'Tag 1 ▼' }).locator('span').click();
        await expect(page.getByText('Tag 1▲No tasks in Tag 1Delete')).toBeVisible();

        await deleteTag(page, tag)





    });
    test('Create Task with Tag', async ({ page }) => {
        const tag = "Tag 1"
        await createTag(page, tag)
        const task = {taskName: "Task 2", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: [tag]}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)

        await page.getByRole('button', { name: '...' }).first().click();
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" [selected]
              - option "Mark Angus"
              - option "Albert Zan"
            `);
        await expect(page.getByRole('heading', { name: 'Reschedule' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toBeVisible();

        await expect(page.getByRole('checkbox')).toBeVisible();
        await expect(page.getByText('Tag 1', { exact: true })).toBeVisible();
        await expect(page.getByRole('checkbox')).toBeChecked();

        await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toHaveValue('To-Do');

        await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();

        await page.getByRole('button', { name: '...' }).first().click();
        await expect(page.getByText('Tag 1▼Task 2...Delete Tag')).toBeVisible();
        

        await deleteTask(page, task.taskName)
        await page.getByRole('heading', { name: 'Tag 1 ▼' }).click();
        await deleteTag(page, tag)

    });
    test('Create Multiple Tags', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }

        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }
    });
    test('Create Multiple Tasks', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }
        
        const taskList = [
            {
            taskName: "Task 1",
            assign: "Joey Donuts",
            deadline: "08/03/2025",
            tags: ["Tag 1"],
            num: 0
            },
            {
            taskName: "Task 2",
            assign: "Mark Angus",
            deadline: "09/03/2025",
            tags: ["Tag 3", "Tag 2"],
            num: 1

            },
            {
            taskName: "Task 3",
            assign: "Albert Zan",
            deadline: "10/03/2025",
            tags: ["Tag 1", "Tag 2", "Tag 3"],
            num: 2

            }
        ]

        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        for (const task of taskList){
            await createTask(page, task.taskName, task.assign, task.deadline, task.tags)
            if (task.num === 0) {
                await page.getByRole('button', { name: '...' }).first().click();
            } else {
                await page.getByRole('button', { name: '...' }).nth(task.num).click();
            }


            await expect(page.getByRole('combobox').first()).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Reschedule' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toHaveValue(`${task.deadline}`);

            await expect(page.getByText('Tag 1', { exact: true })).toBeVisible();
            await expect(page.getByText('Tag 2', { exact: true })).toBeVisible();
            await expect(page.getByText('Tag 3', { exact: true })).toBeVisible();
            
            for (const tag of task.tags) {
                await expect(page.locator('div').filter({ hasText: RegExp(`^${tag}$`) }).getByRole('checkbox')).toBeChecked();
            }

            await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')).toHaveValue('To-Do');

            await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();

            if (task.num === 0) {
                await page.getByRole('button', { name: '...' }).first().click();
            } else {
                await page.getByRole('button', { name: '...' }).nth(task.num).click();
            }
        }

        for (const task of taskList) {
            await deleteTask(page, task.taskName)
        }
        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }
        
    });
    
    test('Update Task Assigned To', async ({ page }) => {
        const task = {taskName: "Task 3", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)

        await expect(page.getByText(`Task 3...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();
        await expect(page.getByRole('combobox').first()).toBeVisible();
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" [selected]
              - option "Mark Angus"
              - option "Albert Zan"
            `);

        await page.getByRole('combobox').first().selectOption({label: "Mark Angus"})
        await expect(page.getByRole("combobox").first()).toMatchAriaSnapshot(`
            - combobox:
              - option "Joey Donuts" 
              - option "Mark Angus" [selected]
              - option "Albert Zan"
            `);
        await page.getByRole('button', { name: '...' }).first().click();
        await deleteTask(page, task.taskName)
        
    });
    test('Update Task Deadline', async ({ page  }) => {
        const task = {taskName: "Task 4", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)
        await expect(page.getByText(`Task 4...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();

        await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toHaveValue('28/03/2025');
        await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).click();
        await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('30/03/2025');
        await expect(page.getByRole('textbox', { name: 'DD/MM/YYYY' })).toHaveValue('30/03/2025');
        await page.getByRole('button', { name: '...' }).first().click();
        await deleteTask(page, task.taskName)
    });
    test('Update Task Tags', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }
        const task = {taskName: "Task 5", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: ["Tag 1", "Tag 3"]}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)

        await expect(page.getByText(`Task 5...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();


        await expect(page.getByText('Tag 1', { exact: true })).toBeVisible();
        await expect(page.getByText('Tag 2', { exact: true })).toBeVisible();
        await expect(page.getByText('Tag 3', { exact: true })).toBeVisible();
        
        await page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox').check();
        await page.locator('div').filter({ hasText: /^Tag 3$/ }).getByRole('checkbox').check();
        await expect(page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox')).toBeChecked();
        await expect(page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox')).not.toBeChecked();
        await expect(page.locator('div').filter({ hasText: /^Tag 3$/ }).getByRole('checkbox')).toBeChecked();
        await page.getByRole('button', { name: '...' }).first().click();
        await deleteTask(page, task.taskName)
        
        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }

    });
    test('Update Task Status To-Do to Started', async ({ page }) => {
        const task = {taskName: "Task 6", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)
        await expect(page.getByText(`Task 6...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')
        await expect(statusbox).toBeVisible();
        await expect(statusbox).toHaveValue('To-Do');
        await expect(page.getByRole("combobox").nth(1)).toMatchAriaSnapshot(`
            - combobox:
              - option "To Do" [selected]
              - option "Started"
              - option "Finished"
            `);
        
        await statusbox.selectOption('Started');
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();
        await expect(page.getByText('Started▼Task 6...+')).toBeVisible();
        await page.getByRole('heading', { name: 'Started ▼' }).click();
        await expect(page.locator('body')).toMatchAriaSnapshot(`
            - heading "Started ▲" [level=4]
            - heading "Task 6" [level=3]
            - button "..."
            - button "+"
            `);
        await page.getByRole('button', { name: '...' }).first().click()
        await expect(statusbox).toBeVisible();
        await expect(page.getByRole("combobox").nth(1)).toMatchAriaSnapshot(`
            - combobox:
                - option "To Do" 
                - option "Started" [selected]
                - option "Finished"
            `);
        await page.getByRole('button', { name: '...' }).first().click()
        await deleteTask(page, task.taskName)
        

    });
    test('Update Task Status Started to Finished', async ({ page }) => {
        const task = {taskName: "Task 7", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)
        await expect(page.getByText(`Task 7...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')
        await statusbox.selectOption('Started');
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();
        await expect(page.getByText('Started▼Task 7...+')).toBeVisible();

        await page.getByRole('heading', { name: 'Started ▼' }).click();
        await page.getByRole('button', { name: '...' }).first().click()
        await expect(statusbox).toBeVisible();

        await statusbox.selectOption('Finished');
        await expect(page.getByText('Completion Rate: 100%')).toBeVisible();

        await page.getByRole('heading', { name: 'Finished ▼' }).locator('span').click();
        await expect(page.getByText('Started▲No tasks in Started+')).toBeVisible();

        await expect(page.locator('body')).toMatchAriaSnapshot(`
            - heading "Finished ▲" [level=4]
            - heading "Task 7" [level=3]
            - button "..."
            - button "+"
            `);
        await page.getByRole('button', { name: '...' }).first().click();
        await expect(statusbox).toBeVisible();
        await expect(statusbox).toHaveValue('Finished');
        await expect(page.getByRole("combobox").nth(1)).toMatchAriaSnapshot(`
            - combobox:
              - option "To Do"
              - option "Started"
              - option "Finished" [selected]
            `);

        await page.getByRole('button', { name: '...' }).first().click();
        await deleteTask(page, task.taskName)




    });
    test('Update Task Status To-Do to Finished', async ({ page }) => {
        const task = {taskName: "Task 8", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)
        await expect(page.getByText(`Task 8...`).first()).toBeVisible();
        await page.getByRole('button', { name: '...' }).first().click();
        const statusbox = page.locator('div').filter({ hasText: /^StatusTo DoStartedFinished$/ }).getByRole('combobox')


        
        await expect(statusbox).toBeVisible();
        await expect(statusbox).toHaveValue('To-Do');
        await expect(page.getByRole("combobox").nth(1)).toMatchAriaSnapshot(`
            - combobox:
              - option "To Do" [selected]
              - option "Started"
              - option "Finished"
            `);
        await statusbox.selectOption('Finished');
        await expect(page.getByText('Completion Rate: 100%')).toBeVisible();
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();
        await expect(page.getByText('Finished▼Task 8...+')).toBeVisible();
        await page.getByRole('heading', { name: 'Finished ▼' }).locator('span').click();
        
        await page.getByRole('button', { name: '...' }).first().click();
        await expect(statusbox).toBeVisible();
        await expect(statusbox).toHaveValue('Finished');
        await expect(page.getByRole("combobox").nth(1)).toMatchAriaSnapshot(`
          - combobox:
            - option "To Do"
            - option "Started"
            - option "Finished" [selected]
          `);
        await page.getByRole('button', { name: '...' }).first().click();
        await deleteTask(page, task.taskName)
        
    });
    
    test('Filter Tasks', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }
        
        const taskList = [
            {
            taskName: "Task 1",
            assign: "Joey Donuts",
            deadline: "08/03/2025",
            tags: ["Tag 1"],
            num: 0
            },
            {
            taskName: "Task 2",
            assign: "Mark Angus",
            deadline: "09/03/2025",
            tags: ["Tag 2"],
            num: 1

            },
            {
            taskName: "Task 3",
            assign: "Albert Zan",
            deadline: "10/03/2025",
            tags: ["Tag 2", "Tag 3"],
            num: 2

            }
        ]

        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        for (const task of taskList){
            await createTask(page, task.taskName, task.assign, task.deadline, task.tags)
        }

        await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();
        await page.getByRole('button', { name: 'Filter' }).click();
        await expect(page.getByRole('button', { name: 'Assigned To:' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Tags' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Overdue' })).toBeVisible();
        await expect(page.locator('.rs-picker-input-group')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();


        await page.getByRole('button', { name: 'Assigned To:' }).click();
        await page.getByRole('combobox').selectOption({label: "Joey Donuts"});
        await expect(page.getByText('To-Do▲Task 1...+')).toBeVisible();
        await page.getByRole('button', { name: 'Clear' }).click();
        await page.getByRole('button', { name: 'Assigned To:' }).click();
        await page.getByRole('combobox').selectOption({label: "Mark Angus"});
        await expect(page.getByText('To-Do▲Task 2...+')).toBeVisible();
        await page.getByRole('button', { name: 'Clear' }).click();
        await page.getByRole('button', { name: 'Assigned To:' }).click();
        await page.getByRole('combobox').selectOption({label: "Albert Zan"});
        await expect(page.getByText('To-Do▲Task 3...+')).toBeVisible();
        await page.getByRole('button', { name: 'Clear' }).click();

        await page.getByRole('button', { name: 'Tags' }).click();
        await expect(page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Tag 3$/ }).getByRole('checkbox')).toBeVisible();

        await page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox').check();
        await expect(page.getByText('To-Do▲Task 1...+')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox').uncheck();
        await page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox').check();
        await expect(page.getByText('To-Do▲Task 2...Task 3...+')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox').uncheck();
        await page.locator('div').filter({ hasText: /^Tag 3$/ }).getByRole('checkbox').check();
        await expect(page.getByText('To-Do▲Task 3...+')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox').check();
        await expect(page.getByText('To-Do▲Task 2...Task 3...+')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox').check();
        await expect(page.getByText('To-Do▲Task 1...Task 2...Task 3...+')).toBeVisible();
        await page.getByRole('button', { name: 'Clear' }).click();
        await page.getByRole('button', { name: 'Tags' }).click();
        await expect(page.locator('div').filter({ hasText: /^Tag 1$/ }).getByRole('checkbox')).not.toBeChecked();
        await expect(page.locator('div').filter({ hasText: /^Tag 2$/ }).getByRole('checkbox')).not.toBeChecked();
        await expect(page.locator('div').filter({ hasText: /^Tag 3$/ }).getByRole('checkbox')).not.toBeChecked();
        await page.getByRole('button', { name: 'Tags' }).click();
        await page.getByRole('button', { name: 'Filter' }).click();
        await expect(page.getByRole('button', { name: 'Assigned To:' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Tags' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Overdue' })).not.toBeVisible();
        await expect(page.locator('.rs-picker-input-group')).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Clear' })).not.toBeVisible();
        // date picker needs dynamic dates, will return to it




        

        for (const task of taskList) {
            await deleteTask(page, task.taskName)
        }
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();

        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }
    });

    test('Delete Task', async ({ page }) => {
        const task = {taskName: "Task 9", staffLabel: "Joey Donuts", deadline: "28/03/2025", hasTag: []}
        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        await createTask(page, task.taskName, task.staffLabel, task.deadline, task.hasTag)
        await expect(page.getByText(`Task 9...`).first()).toBeVisible();
        

        
        await deleteTask(page, task.taskName)
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();
        



    });
    test('Delete Multiple Tasks', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }
        
        const taskList = [
            {
            taskName: "Task 1",
            assign: "Joey Donuts",
            deadline: "08/03/2025",
            tags: ["Tag 1"],
            num: 0
            },
            {
            taskName: "Task 2",
            assign: "Mark Angus",
            deadline: "09/03/2025",
            tags: ["Tag 3", "Tag 2"],
            num: 1

            },
            {
            taskName: "Task 3",
            assign: "Albert Zan",
            deadline: "10/03/2025",
            tags: ["Tag 1", "Tag 2", "Tag 3"],
            num: 2

            }
        ]

        await page.getByRole('heading', { name: 'To-Do ▼' }).locator('span').click();
        for (const task of taskList){
            await createTask(page, task.taskName, task.assign, task.deadline, task.tags)
        }

        for (const task of taskList) {
            await deleteTask(page, task.taskName)
        }
        await expect(page.getByText('To-Do▲No tasks in To-Do+')).toBeVisible();

        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }
    });
    test('Delete Tag', async ({ page }) => {
        const tag = "Tag 1"
        await createTag(page, tag)

        await page.getByRole('heading', { name: 'Tag 1 ▼' }).locator('span').click();
        await expect(page.getByText('Tag 1▲No tasks in Tag 1Delete')).toBeVisible();

        await deleteTag(page, tag)
        await expect(page.getByRole('heading', { name: 'Tag 1 ▼' })).not.toBeVisible();

    });
    test('Delete Multiple Tags', async ({ page }) => {
        const tagList = ["Tag 1", "Tag 2", "Tag 3"]

        for (const tag of tagList) {
            await createTag(page, tag)
        }

        for (const tag of tagList) {
            await page.getByRole('heading', { name: `${tag} ▼` }).click();
            await deleteTag(page, tag)
        }
        await expect(page.getByRole('heading', { name: 'Tag 1 ▼' })).not.toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tag 2 ▼' })).not.toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tag 3 ▼' })).not.toBeVisible();

    });
    
// })