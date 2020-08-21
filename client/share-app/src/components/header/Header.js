import React from 'react';
import { Layout, Menu } from 'antd';
import './HeaderUSer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const { Header} = Layout;

HeaderStart=()=>{
  let href=window.location.href.split('/');
  href=href[3];
    return (
        <Layout className="layout">
    <Header>
      {/* <div className="logo" /> */}
      {/* {
            href=window.location.href.split('/');
            href=href[3];
      } */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/'+href]} selectedKeys={['/'+href]} >
        <Menu.Item key="/" ><Link  exact to='/'>Login</Link></Menu.Item>
        <Menu.Item key="/userRegister" ><Link  to='/userRegister'>User Register</Link></Menu.Item>
        <Menu.Item key="/busRegister" ><Link  to='/busRegister'>Bus Driver Register</Link></Menu.Item>
        <Menu.Item key="/rickRegister" ><Link  to='/rickRegister'>E-Rick Driver Register</Link></Menu.Item>
      </Menu>
    </Header>
    </Layout>
    )
}