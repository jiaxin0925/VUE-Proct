import React from 'react';
import style from './Login.css';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
            type:"Login/fetchUser",
            payLoad:values,
        }).then(res=>{
          // const obj = obj.toString(res)
          // console.log(obj + '登陆时')
          if(res.data.code===1){  //登陆成功
            localStorage.setItem("token",res.data.token )   //存储
            this.props.history.push("/home/list")   //跳转
          }
          // else{
            // alert('账号/密码不正确');
          // }
        })
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.Lodin_wrap}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

function mapStateToProps(state) {

  return {
    dataStatus:state.Login
  };
}

export default connect(mapStateToProps)(Login);
