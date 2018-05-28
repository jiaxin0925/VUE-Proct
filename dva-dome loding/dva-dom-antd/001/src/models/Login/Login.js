import {fetchUser} from "../../services/login"
export default {
  namespace: 'Login',
  state: {},
  reducers: {
    save(state,action){
      console.log(action)
      return {
        ...state,
        ...action.payLoad
      }
    }
  },
  effects: {
    *fetchUser({payLoad},{call,put}){   //action {call,put}
       const json=yield call(fetchUser,"http://localhost:8080/api/checkUser",{
            method:"POST",
            headers:{
              "Content-Type":"application/x-www-form-urlencoded",
              token:localStorage.getItem("token") || ""
            },
            body:`username=${payLoad.username}&password=${payLoad.password}`
       })
         console.log(json)
       //发送给reducer
       yield put({
         type:"save",
         payLoad:json.data
       })
       return Promise.resolve(json)
      
    }
  },
  subscriptions: {
    setup(){
      console.log("login")
    }
  },
};
