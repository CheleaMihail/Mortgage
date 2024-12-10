class ApiService {
  static async simulateApiDelay() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Simulate a GET request
  static async get(endpoint: string) {
    await this.simulateApiDelay();
    
    // Mock data for specific endpoints
    if (endpoint === "/mortgage") {
      return {
        status: 200,
        data: {
        price: 500000,
        situation: "Practicing Hospitalist",
        property: "Single Family Home",
        purchase_date:"2024-12-10T20:28:27.067Z",
        },
      };
    }
    return {
      status: 404,
      message: "Endpoint not found",
    };
  }

  // Simulate a POST request
  static async post(endpoint: string, payload: any) {
    await this.simulateApiDelay();

    // Mock response for specific endpoints
    if (endpoint === "/submitForm") {
      if (payload) {
        return {
          status: 200,
          message: "Form submitted successfully",
          data: payload,
        };
      }
      return {
        status: 400,
        message: "Bad request, form data missing",
      };
    }

    return {
      status: 404,
      message: "Endpoint not found",
    };
  }
}

export default ApiService;
