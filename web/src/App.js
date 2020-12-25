import { Layout, Menu, Switch } from "antd";
import { useEffect, useState } from "react";
import { WarningOutlined, CheckOutlined } from "@ant-design/icons";
import { Route, Link, useLocation } from "react-router-dom";
import AnnotateView from "./views/AnnotateView";
import IntegrationsView from "./views/IntegrationsView";
import { isServerUp, upServer, downServer } from "./api/api";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  const menuLinks = [
    { to: "/", text: "Kalas-Iris" },
    { to: "/annotate", text: "Image Annotation" },
    { to: "/integrations", text: "Integrations" },
  ];

  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    isServerUp().then(r => {
      setLoading(false);
      setSwitchState(r);
    });
    setInterval(() => {
      setLoading(true);
      isServerUp().then(r => {
        setSwitchState(r);
        setLoading(false);
      });
    }, 30000);
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          {menuLinks.map(e => (
            <Menu.Item key={e.to}>
              <Link to={e.to}>{e.text}</Link>
            </Menu.Item>
          ))}
          <div style={{ float: "right", backgroundColor: "rgba(0,0,0,0.5);" }}>
            Server Status{" "}
            <Switch
              loading={loading}
              style={{ margin: "0px 4px 4px 4px" }}
              onChange={() => {
                setLoading(true);
                isServerUp().then(r => {
                  if (!r) upServer();
                  else downServer();
                });
              }}
              checked={switchState}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<WarningOutlined />}
              defaultChecked
            />
            (Server shuts down every hour at xx:00)
          </div>
        </Menu>
      </Header>
      <Content style={{ padding: "25px 50px" }}>
        <Route path="/annotate">
          <AnnotateView />
        </Route>
        <Route path="/integrations">
          <IntegrationsView />
        </Route>
        <Route path="/"></Route>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
