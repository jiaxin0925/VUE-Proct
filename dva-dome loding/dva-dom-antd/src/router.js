import React from 'react';
import { Route, Switch,Redirect,routerRedux } from 'dva/router';
import dynamic from "dva/dynamic"
import App from "./routes/App"
const {ConnectedRouter}=routerRedux;
// //配置路由(按需加载)
let router=[{
  path:"/login",
  models:()=>[import("./models/Login/Login.js")],
  component:()=>import("./routes/Login/Login.js")
},{
  path:"/home/list",
  models:()=>[import("./models/List/List.js")],
  component:()=>import("./routes/List/List.js")
}]

function RouterConfig({ history,app}) {
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route path="/" exact render={()=>{return <Redirect to="/login"/>}} />
          {
            router.map((item,key)=>{
              return (
                  <Route key={key} path={item.path} component={dynamic({
                    app,
                    models:item.models,
                    component:item.component,
                  })} />
                
              )
            })
          }
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;
