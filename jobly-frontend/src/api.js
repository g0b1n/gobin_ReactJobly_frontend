import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  // register new user
  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  // login user
  static async login(loginData) {
    let res = await this.request(`auth/token`, loginData, 'post');
    return res.token;
  }

  static async getJobs(searchTerm = "") {
    const params = searchTerm ? { title: searchTerm } : {};
    let res = await axios.get(`${BASE_URL}/jobs`, {
      params,
      headers: { Authorization: `Bearer ${JoblyApi.token}`}
    });
    return res.data.jobs;
  }

  static async getJobDetails(jobId) {
    const res = await this.request(`jobs/${jobId}`);
    return res.job;
  }

  // static async getCompanies() {
  //   let res = await this.request(`companies`, {}, "get");
  //   return res.companies;
  // }

  static async getCompanies(searchTerm = "") {
    const params = searchTerm ? { name: searchTerm } : {};
    let res = await this.request(`companies`, params, "get");
    return res.companies;
  }

  static async getCurrentUser(username) {
    console.log("Sending request with token:", JoblyApi.token)
    const res = await this.request(`users/${username}`);
    return res.user
  }

  static async updateProfile(username, userData) {
    console.log("updateProfile called with", username, userData);
    const endpoint = `users/${username}`;
    return await this.request(endpoint, userData, 'patch');
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;

// my token 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxlb21lc3NpIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjY3NzA1Mn0.f8PdGK4BUFHx07u7QvaXdVObIgGuJ1Rdq0y4TnNWPG0