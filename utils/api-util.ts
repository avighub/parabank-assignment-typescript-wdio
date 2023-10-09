import axios from "axios";

class ApiUtils {
  public async depositAmount(accountId: number, amount: number) {
    const options = {
      method: "POST",
      url: `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      console.log(response.status);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new ApiUtils();
