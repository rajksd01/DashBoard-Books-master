import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  return await api.post("/api/v1/login", data);
};


export const register= async(data:{name:string,email:string,password:string})=>{
    return await api.post("/api/v1/register",data)
}