import React from "react";

import { Link, useLocation } from "react-router-dom";

import { Menu } from "antd";
const { SubMenu } = Menu;
export default function NavBar({ routes }) {
  const location = useLocation();
  return (
    <Menu
      selectedKeys={[
        routes.reduce(
          (acc, { path }, index) =>
            acc !== false ? acc : path === location.pathname && path,
          false
        ),
      ]}
      mode="horizontal"
    >
      {routes.map(({ title, icon: Icon, path }) => (
        <Menu.Item key={path}>
          <Icon />
          <span>{title}</span>
          <Link to={path}></Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}
