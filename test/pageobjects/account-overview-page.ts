import { $ } from "@wdio/globals";
import Page from "./base-page";
import { faker } from "@faker-js/faker";

class AccountOverviewPage extends Page {
  public get headerTitle() {
    return $("//h1[text()='Accounts Overview']");
  }

  public get accountNumber() {
    return $("//table[@id='accountTable']/tbody/tr/td/a");
  }

  public get accountBalance() {
    return $(
      "//table[@id='accountTable']/tbody/tr[@ng-repeat='account in accounts']/td[2]"
    );
  }
  public async getHeaderText() {
    return await this.headerTitle.getText();
  }

  public async getAccountNumber() {
    return await this.accountNumber.getText();
  }

  public async getAccountBalance() {
    const accountBalanceAsString = await this.accountBalance.getText();
    const accountBalanceWithoutSymbols = accountBalanceAsString.replace(
      /[$,]/g,
      ""
    );
    return parseFloat(accountBalanceWithoutSymbols);
  }
}

export default new AccountOverviewPage();
