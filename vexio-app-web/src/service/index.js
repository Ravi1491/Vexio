import { getCookie } from "../utils/helpers";

class Service {
  getAllUserDetails = async () => {
    console.log("qqqqqqq", getCookie("access_token"));
    const response = await fetch(
      `https://vexio-production.up.railway.app/user/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("access_token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    console.log("wwwwwww", response);

    return response.json(); // No response body for DELETE requests from this API
  };
  getAllStores = async () => {
    const userDetails = await this.getAllUserDetails();
    console.log("qqqqqqq", getCookie("access_token"), userDetails);
    const response = await fetch(
      `http://localhost:4000/stores/getAllStores?email=${userDetails.email}`,
      //ravi149185@gmail.com`,
      //${result.user.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    console.log("wwwwwww", response);

    return response.json(); // No response body for DELETE requests from this API
  };
}

export default new Service();
