import { $, browser } from "@wdio/globals";
import Page from "./base-page";

class LoginPage extends Page {
  public get registerLink() {
    return $("//a[contains(text(),'Register')]");
  }

  public get headerTitle() {
    return $("//div[@id='rightPanel']/h1[1]");
  }

  public open() {
    return super.open();
  }

  public async waitForPageTitle() {
    return await browser.getTitle();
  }

  public async clickRegister() {
    await this.registerLink.click();
  }
}

export default new LoginPage();
