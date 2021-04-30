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
          <SubMenu
            key="subapp"
            icon={<AppstoreOutlined />}
            title="Apps & Platforms"
          >
            <Menu.Item key="woo">
              <Link to="woo">WooCommerce</Link>
            </Menu.Item>
            <Menu.Item key="nop">
              <div>NopCommerce - Coming Soon</div>
            </Menu.Item>
            <Menu.Item key="wix">
              <div>Wix - Coming Soon</div>
            </Menu.Item>
            <Menu.Item key="shopyify">
              <div>Shopify - Coming Soon</div>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Custom Integrations"
          >
            <Menu.Item key="9">Coming Soon</Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
      <Col>
        <Title>Server Integrations</Title>
        <Routes>
          <Route path="woo" element={<WooIntegration/>} />
          <Route path="nop"/>
          <Route path="wix"/>
          <Route path="shopify"/>
        </Routes>
      </Col>
    </Row>
  );
}
