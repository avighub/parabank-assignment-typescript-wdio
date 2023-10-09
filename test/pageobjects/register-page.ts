import { $ } from "@wdio/globals";
import Page from "./base-page";
import { faker } from "@faker-js/faker";

class RegisterPage extends Page {
  public get headerTitle() {
    return $("//div[@id='rightPanel']/h1[1]");
  }

  public get firstName() {
    return $("//input[@id='customer.firstName']");
  }
  public get lastName() {
    return $("//input[@id='customer.lastName']");
  }

  public get address() {
    return $("//input[@id='customer.address.street']");
  }

  public get city() {
    return $("//input[@id='customer.address.city']");
  }

  public get state() {
    return $("//input[@id='customer.address.state']");
  }

  public get zipCode() {
    return $("//input[@id='customer.address.zipCode']");
  }

  public get phoneNumber() {
    return $("//input[@id='customer.phoneNumber']");
  }

  public get ssn() {
    return $("//input[@id='customer.ssn']");
  }

  public get userName() {
    return $("//input[@id='customer.username']");
  }

  public get password() {
    return $("//input[@id='customer.password']");
  }

  public get repeatedPassword() {
    return $("//input[@id='repeatedPassword']");
  }

  public get registerButton() {
    return $("//input[@value='Register']");
  }

  public get welcomeText() {
    return $("//div[@id='rightPanel']//h1[1]");
  }

  public get accountOverviewLink() {
    return $("//a[contains(text(),'Accounts Overview')]");
  }

  public async getHeaderText() {
    return await this.headerTitle.getText();
  }

  public async enterValuesForAllFields() {
    await this.firstName.setValue(faker.person.firstName());
    await this.lastName.setValue(faker.person.lastName());
    await this.address.setValue(faker.location.streetAddress());
    await this.city.setValue(faker.location.city());
    await this.state.setValue(faker.location.state());
    await this.zipCode.setValue(faker.location.zipCode("#####"));
    await this.phoneNumber.setValue(faker.string.numeric(10));
    await this.ssn.setValue(faker.string.numeric(10));
    await this.userName.setValue(
      faker.string.alpha({ length: 8, casing: "lower" })
    );
    const password = faker.string.alpha(10);
    await this.password.setValue(password);
    await this.repeatedPassword.setValue(password);
  }

  public async clickRegisterButton() {
    await this.registerButton.click();
  }

  public async getWelcomeText() {
    return await this.welcomeText.getText();
  }

  public async clickAccountOverviewLink() {
    return await this.accountOverviewLink.click();
  }
}

export default new RegisterPage();
