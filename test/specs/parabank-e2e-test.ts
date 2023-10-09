import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login-page";
import RegisterPage from "../pageobjects/register-page";
import AccountOverviewPage from "../pageobjects/account-overview-page";
import ApiUtils from "../../utils/api-util";

describe("Parabank Account Overview", () => {
  it("should display account overview and transaction info", async () => {
    await LoginPage.open();

    // Login Page: Validate Login Page title
    const expectedPageTitle = "ParaBank | Welcome | Online Banking";
    const actualPageTitle = await LoginPage.waitForPageTitle();
    expect(actualPageTitle).toEqual(expectedPageTitle);

    // Cookie Alert : Accept if pops up
    // Cookie alert is not found

    await LoginPage.clickRegister();

    // Registration Page: Validate Register Page Header text
    const actualHeaderText = await RegisterPage.getHeaderText();
    expect(actualHeaderText).toEqual("Signing up is easy!");

    // Registration Page: Enter Registration details
    await RegisterPage.enterValuesForAllFields();
    await RegisterPage.clickRegisterButton();

    // Welcome Page
    const actualWelcomeText = await RegisterPage.getWelcomeText();
    expect(actualWelcomeText).toContain("Welcome");

    // Account Overview page
    await RegisterPage.clickAccountOverviewLink();
    const accountOverviewText = await AccountOverviewPage.getHeaderText();
    expect(accountOverviewText).toEqual("Accounts Overview");
    const accountNumber = await AccountOverviewPage.getAccountNumber();
    const currentAccountBalance = await AccountOverviewPage.getAccountBalance();

    // Deposit amount: POST Request
    const amountToDeposit = 1000;
    const response = await ApiUtils.depositAmount(
      Number(accountNumber),
      amountToDeposit
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual(
      `Successfully deposited $${amountToDeposit} to account #${accountNumber}`
    );

    // Validate Updated Balance
    await RegisterPage.clickAccountOverviewLink();
    const updatedAccountBalance = await AccountOverviewPage.getAccountBalance();
    expect(updatedAccountBalance).toBe(currentAccountBalance + amountToDeposit);

    /**
       * Verify if the deposited amount is displayed in the account
- Perform a transfer or pay bills from the account and verify if the transfer or bill payment is
successful.
- Using the account Number stored in the above step, perform a GET request on the API
&quot;https://parabank.parasoft.com/parabank/services/bank/accounts/{Account_Num}/transactions&quot;
- Store all the descriptions, transaction date and amount values from the API for the associated
account
- Navigate to the account overview and click on the {Account_Num}
- Validate the values of the descriptions, transaction date and amount stored from the above API
with the front end
 - Log Off from the application
- Close the browser
       */
  });
});
