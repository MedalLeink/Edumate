/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (body: any) => {
  try {
    const response = await axios.post("/user/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body: any) => {
  try {
    const response = await axios.post("user/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err: any) {
    console.log(err.message);
  }
};
