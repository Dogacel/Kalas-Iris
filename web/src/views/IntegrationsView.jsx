import React, { useEffect, useState } from "react";
import Title from "antd/lib/typography/Title";
import { Button, Col, Menu, Row } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Route, Routes, Link } from "react-router-dom";
import { createIntegration, getIntegrations } from "../api/api";
import { useUserContext } from "../components/UserContext";
import ReactJson from "react-json-view";
import  WooIntegration from "./WooIntegration";

const { SubMenu } = Menu;

export default function IntegrationsView() {
  const { accessToken } = useUserContext();

  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    getIntegrations(accessToken).then(r => {
      console.log(r.data);
      setIntegrations(r.data);
    });
  }, [accessToken]);

  return (
    <Row>
      <Col>
        <Menu
          mode="inline"
          defaultOpenKeys={["subcred", "subapp"]}
          style={{ width: 256, marginRight: 32 }}
        >
          <SubMenu key="subcred" icon={<MailOutlined />} title="Credentials">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            key="subapp"
            icon={<AppstoreOutlined />}
            title="Apps & Platforms"
          >
            <Menu.Item key="woo">
              <Link to="woo">WooCommerce</Link>
            </Menu.Item>
            <Menu.Item key="nop">
              <Link to="nop">NopCommerce</Link>
            </Menu.Item>
            <Menu.Item key="wix">
              <Link to="wix">Wix</Link>
            </Menu.Item>
            <Menu.Item key="shopyify">
              <Link to="shopify">Shopify</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Custom Integrations"
          >
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
      <Col>
        <Title>Server Integrations</Title>
        <Button
          onClick={() => createIntegration(accessToken, { name: new Date() })}
        >
          Create random integration.
        </Button>
        <ReactJson src={{ integrations }} />
        <Routes>
          <Route path="woo" element={<WooIntegration/>} />
          <Route path="nop" element={<div>Nop</div>} />
          <Route path="wix" element={<div>Wix</div>} />
          <Route path="shopify" element={<div>Shopify</div>} />
        </Routes>
      </Col>
    </Row>
  );
}
