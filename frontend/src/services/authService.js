import axios from "axios";
import API_BASE_URL from "../config";

export const signup = async (datos) => {
    return await axios.post(`${API_BASE_URL}/auth/signup`, datos);
};

export const login = async (datos) => {
    return await axios.post(`${API_BASE_URL}/auth/login`, datos);
};
