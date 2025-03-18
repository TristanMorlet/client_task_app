import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('button', { name: 'Work-Lead' }).click();
    await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');

    await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

    await page.getByRole('link', {name: "Staff"}).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard/staff');


});

// test.describe('Staff Page Tests', () => {
    test('Create Staff', async ({ page }) => {
        const staff = { name: "Test Staff", email: "teststaff@gmail.com", date: new Date().toLocaleDateString('en-GB')}
        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
        await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByText('Test Staff')).toBeVisible();

        await page.locator('div').filter({ hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`) }).getByRole('button').click()

        await expect(page.getByText(staff.name)).not.toBeVisible();

    })
    test('Create multiple staff members', async ({ page }) => {
        const staffList = [
            { name: 'Joey Donuts', email: 'jd@gmail.com', date: new Date().toLocaleDateString('en-GB') },
            { name: 'Mark Angus', email: 'ma@gmail.com', date: new Date().toLocaleDateString('en-GB') },
            { name: 'Albert Zan', email: 'az@gmail.com', date: new Date().toLocaleDateString('en-GB'),  }
        ];

        for (const staff of staffList) {
            await page.getByRole('button', { name: 'Add Staff Member' }).click();
            await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
            await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
            await page.getByRole('button', { name: 'Add', exact: true }).click();
        }

        for (const staff of staffList) {
            await expect(page.getByText(staff.name)).toBeVisible();
        }

        for (const staff of staffList) {
            await expect(page.getByText(staff.name)).toBeVisible();
            await expect(page.getByText(staff.email)).toBeVisible();

            await page.locator('div').filter({ 
                hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`)
            }).getByRole('button').click();
        }
    });

    test('Sort staff members', async ({ page }) => {

        const staffList = [
            { name: 'Joey Donuts', email: 'jd@gmail.com', date: new Date().toLocaleDateString('en-GB') },
            { name: 'Mark Angus', email: 'ma@gmail.com', date: new Date().toLocaleDateString('en-GB') },
            { name: 'Albert Zan', email: 'az@gmail.com', date: new Date().toLocaleDateString('en-GB'),  }
        ];

        for (const staff of staffList) {
            await page.getByRole('button', { name: 'Add Staff Member' }).click();
            await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
            await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
            await page.getByRole('button', { name: 'Add', exact: true }).click();
        }

        await page.getByRole('button', { name: 'Sort' }).click();
        await page.getByRole('button', { name: 'First Name (A-Z)' }).click();
        await page.waitForTimeout(500); 

        let displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())

        let firstNames = displayedNames.map((name) => name.split(' ')[0]);

        let sortedNames = [...firstNames].sort(); 

        expect(firstNames).toEqual(sortedNames);

        await page.getByRole('button', { name: 'Last Name (A-Z)' }).click();
        await page.waitForTimeout(500); 

        displayedNames = await page.getByRole('heading').allTextContents();
        displayedNames = displayedNames.slice(2)
        displayedNames = displayedNames.map((name) => name.trim())

        let lastNames = displayedNames.map((name) => name.split(' ')[1]);

        let sortedLastNames = [...lastNames].sort(); 

        expect(lastNames).toEqual(sortedLastNames);

        await page.getByRole('button', { name: 'Date Added (Newest)' }).click();
        await page.waitForTimeout(500); 

        let staffDates = await page.getByRole("paragraph").allTextContents();

        staffDates = staffDates.filter((piece) => piece.startsWith("Date"))
        staffDates = staffDates.map((date) => date.split(' ')[2])


        let sortedDatesNewest = [...staffDates].sort((a, b) => new Date(b) - new Date(a)); 

        expect(staffDates).toEqual(sortedDatesNewest);

        await page.getByRole('button', { name: 'Date Added (Oldest)' }).click();
        await page.waitForTimeout(500); 

        staffDates = await page.getByRole("paragraph").allTextContents();

        staffDates = staffDates.filter((piece) => piece.startsWith("Date"))
        staffDates = staffDates.map((date) => date.split(' ')[2])

        let sortedDatesOldest = [...staffDates].sort((a, b) => new Date(a) - new Date(b));

        expect(staffDates).toEqual(sortedDatesOldest);
        await page.getByRole('button', { name: 'Sort' }).click();

        for (const staff of staffList) {
            await expect(page.getByText(staff.name)).toBeVisible();
            await expect(page.getByText(staff.email)).toBeVisible();

            await page.locator('div').filter({ 
                hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`)
            }).getByRole('button').click();
        }

        
    });

    test('Delete a staff member', async ({ page }) => {
        const staffToDelete = {name: 'Delete Me', email: 'deleteme@gmail.com', date: new Date().toLocaleDateString('en-GB')};

        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await page.getByRole('textbox', { name: 'Staff Name:' }).fill(staffToDelete.name);
        await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staffToDelete.email);
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByText(staffToDelete.name)).toBeVisible();

        await page.locator('div').filter({ hasText: new RegExp(`^Date Added: ${staffToDelete.date}Email: ${staffToDelete.email}Remove Staff Member$`) }).getByRole('button').click()

        await expect(page.getByText(staffToDelete.name)).not.toBeVisible();
    });
    test('Delete multiple staff members', async ({ page }) => {
        const staffList = [
            { name: 'Joey Donuts', email: 'jd@gmail.com', date: new Date().toLocaleDateString('en-GB')},
            { name: 'Mark Angus', email: 'ma@gmail.com', date: new Date().toLocaleDateString('en-GB')},
            { name: 'Albert Zan', email: 'az@gmail.com', date: new Date().toLocaleDateString('en-GB')}
        ];
        for (const staff of staffList) {
            await page.getByRole('button', { name: 'Add Staff Member' }).click();
            await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
            await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
            await page.getByRole('button', { name: 'Add', exact: true }).click();
        }

        for (const staff of staffList) {
            await expect(page.getByText(staff.name)).toBeVisible();
            await expect(page.getByText(staff.email)).toBeVisible();

            await page.locator('div').filter({ 
                hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`)
            }).getByRole('button').click();

            await expect(page.getByText(staff.name)).not.toBeVisible();
            await expect(page.getByText(staff.email)).not.toBeVisible();
        };
    });
// });