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
      `https://vexio-production.up.railway.app/stores/getAllStores?email=${userDetails.email}`,
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

  login = async (formData) => {
    const postData = {
      email: formData.email,
      password: formData.password,
    };

    return fetch("https://vexio-production.up.railway.app/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      return response.json();
    });
  };
  // const queryClient = useQueryClient();

  // return
  //  useMutation(
  //   (formData) => {
  //     const postData = {
  //       email: formData.email,
  //       password: formData.password,
  //     };

  //     return fetch("https://vexio-production.up.railway.app/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(postData),
  //     }).then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to login");
  //       }
  //       return response.json();
  //     });
  //   },
  // {
  //   onSuccess: (data) => {
  //     // Handle successful login, e.g., store the access token in cookies
  //     console.log("Login successful", data);

  //     // Example: Store access token in cookies
  //     // setCookie("access_token", data.access_token);

  //     // Invalidate user-related queries
  //     queryClient.invalidateQueries("me");
  //   },
  // }
  // );
}

//}

export default new Service();
