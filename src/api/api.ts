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
   follow(userId:number) {
      return instance.post(`follow/${userId}`)
          .then(response=>response.data)
   },
   unfollow(userId:number) {
      return instance.delete(`follow/${userId}`)
          .then(response=>response.data)
   },
   getProfile(userId:number){
         return instance.get('profile/' + userId )
             .then(response=>response.data)
      }

}



export const authAPI = {
   me(){
      return instance.get('auth/me')
          .then(response=>response.data)
   }
}
