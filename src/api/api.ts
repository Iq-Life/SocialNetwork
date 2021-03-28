import axios from "axios";



const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   withCredentials: true,
   headers: {
      "API-KEY": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
   }
})

export const userAPI = {
   getUsers(currentPage=1, pageSize= 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
          .then(response=>response.data)
   },
   postUsers(id:number) {
      return instance.post(`follow/${id}`)
          .then(response=>response.data)
   },
   deleteUsers(id:number) {
      return instance.delete(`follow/${id}`)
          .then(response=>response.data)
   }
}

