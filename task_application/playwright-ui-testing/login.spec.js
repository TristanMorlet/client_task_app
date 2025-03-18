import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
});

// test.describe('Login Tests', () => {

    test('Login as Work-Lead', async ({ page }) => {
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');
        await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
        await expect(page.getByRole('link', { name: "All Tasks" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Metrics" })).toBeVisible();
        await expect(page.getByRole('button', { name: "+" }).nth(3)).toBeVisible();
    });

    test('Login as Staff', async ({ page }) => {
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');

        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

        await page.getByRole('link', {name: "Staff"}).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard/staff');

        const staff = { name: "Staff One", email: "staffone@gmail.com", date: new Date().toLocaleDateString('en-GB')}
        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
        await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByText('Staff One')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');


        await page.getByRole('button', { name: 'Staff' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('staffone@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');
        await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
        await expect(page.getByRole('link', { name: "All Tasks" })).toBeVisible();
        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');

        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

        await page.getByRole('link', {name: "Staff"}).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard/staff');

        await expect(page.getByText(staff.name)).toBeVisible();
        await expect(page.getByText(staff.email)).toBeVisible();
        
        await page.locator('div').filter({ 
                hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`)
            }).getByRole('button').click();
        
        await expect(page.getByText(staff.name)).not.toBeVisible();
        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');

    });

    test('Logout as Work-Lead', async ({ page }) => {
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');
        await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
        await expect(page.getByRole('link', { name: "All Tasks" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Metrics" })).toBeVisible();

        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('Logout as Staff', async ({ page }) => {
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');

        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

        await page.getByRole('link', {name: "Staff"}).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard/staff');

        const staff = { name: "Staff One", email: "staffone@gmail.com", date: new Date().toLocaleDateString('en-GB')}
        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await page.getByRole('textbox', { name: 'Staff Name: Staff Email:' }).fill(staff.name);
        await page.getByRole('textbox', { name: 'Enter staff email' }).fill(staff.email);
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByText('Staff One')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');
        await page.getByRole('button', { name: 'Staff' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('staffone@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');
        
        await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
        await expect(page.getByRole('link', { name: "All Tasks" })).toBeVisible();

        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()    

        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('tm@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('http://localhost:3000/dashboard/alltasks');

        await expect(page.getByRole('link', { name: "Staff" })).toBeVisible();

        await page.getByRole('link', {name: "Staff"}).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard/staff');

        await expect(page.getByText(staff.name)).toBeVisible();
        await expect(page.getByText(staff.email)).toBeVisible();
        
        await page.locator('div').filter({ 
                hasText: new RegExp(`^Date Added: ${staff.date}Email: ${staff.email}Remove Staff Member$`)
            }).getByRole('button').click();
        
        await expect(page.getByText(staff.name)).not.toBeVisible();
        await page.locator('div').filter({ hasText: /^Task ApplicationAll TasksStaffMetricsAll TasksStaffMetrics$/ }).getByRole('button').click()
            
        await page.getByRole('button', { name: 'Log Out' }).click();        
        await expect(page).toHaveURL('http://localhost:3000/login');
    });

    test('Invalid Login Shows Error', async ({ page }) => {
        await page.getByRole('button', { name: 'Work-Lead' }).click();
        await page.getByRole('textbox', { name: 'enter email' }).fill('wrongemail@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Invalid Email')).toBeVisible();
    });

// });
