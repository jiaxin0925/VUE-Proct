import React from 'react';
import { connect } from 'dva';
import {withRouter} from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import './App.css'
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    
    if(this.props.location.pathname==="/login"){
      return this.props.children;
    }
    return (
      <div className='mine'>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              {
                localStorage.getItem('user')
              }
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {
              this.props.children
            }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}


App.propTypes = {
};

export default withRouter(connect()(App));
