//发送请求
import request from "../utils/request"

const fetchUser=(url,options)=>{
    return request(url,options)
}
export {
    fetchUser,
}