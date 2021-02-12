import { Divider, Layout, Menu, Switch, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { WarningOutlined, CheckOutlined } from "@ant-design/icons";
import { Route, Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom"; ////added new
import AnnotateView from "./views/AnnotateView";
import IntegrationsView from "./views/IntegrationsView";
import { isServerUp, upServer, downServer } from "./api/api";
import "./css/app.css";
import LoginView from "./views/LoginView";
import RegistrationForm from "./views/SignupView";
import HomepageView from "./views/HomepageView";
import DashboardView from "./views/DashboardView";
import FashionAnnotationInfoView from "./views/FashionAnnotationInfoView";
import MenuItem from "antd/lib/menu/MenuItem";
import { UserProvider } from "./components/UserContext";


const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  const menuLinks = [
    { to: "/annotate", text: "Image Annotation" },
    { to: "/integrations", text: "Integrations" },
    { to: "/login", text: "Login" },
    { to: "/dashboard", text: "Dashboard" },
  ];

  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stall, setStall] = useState(false);

  useEffect(() => {
    const intervalCheck = () => {
      setLoading(true);
      if (!stall) {
        isServerUp().then(r => {
          setSwitchState(r);
          setLoading(false);
        });
      }
    };

    setLoading(true);
    isServerUp().then(r => {
      setLoading(false);
      setSwitchState(r);
      setInterval(intervalCheck, 30000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuBarStyle = {
    color: '#434343',
    textColor: '#434343',
    backgroundColor: "#001529"
  };

  const [isShown] = useState(false);

  const dropdown1 = (
    <Menu>
      <Menu.Item>
        <Link to="/annotation-info">
          What is Fashion Annotation?
        </Link>
      </Menu.Item>
      <MenuItem>
        <Link to="/annotation-info">
          How it works
        </Link>
      </MenuItem>
    </Menu>
  );


  return (

    <UserProvider>
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          <>
            <Menu.Item style={menuBarStyle}>
              <Link to={"/homepage"}>
                <img
                  width={189}
                  height={43}
                  src={process.env.PUBLIC_URL + '/ki-logo-white.png'}
                  alt="logo"
                  style={{ width: 190, height: 55 }}
                />
              </Link>
            </Menu.Item>
          </>
          <>
            {menuLinks.map(e => (
              <Menu.Item
                key={e.to}
              >
                <Link to={e.to} id="Link" key="Link">{e.text}{isShown}</Link>
              </Menu.Item>
            ))}
          </>
          <>
          <Dropdown overlay={dropdown1} placement="bottomCenter">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="/homepage">
                Fashion Annotation <DownOutlined/>
              </a>
          </Dropdown>
          </>
          <Menu.Item id="cloud-menu-item" key="cloud-menu-item" disabled={true}>
            Server Status{" "}
            <Switch
              loading={loading}
              style={{ margin: "0px 4px 4px 4px" }}
              onChange={() => {
                setLoading(true);
                setStall(true);
                isServerUp().then(r => {
                  if (!r) upServer().then(setStall(false));
                  else downServer().then(setStall(false));
                });
              }}
              checked={switchState}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<WarningOutlined />}
              defaultChecked
            />
            (Server shuts down every hour at xx:00)
          </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "25px 50px" }}>
          <Route path="/annotate">
            <AnnotateView />
          </Route>
          <Route path="/integrations">
            <IntegrationsView />
          </Route>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/dashboard">
            <DashboardView />
          </Route>
          <Route path="/signup">
            <RegistrationForm />
          </Route>
          <Route path="/homepage">
            <HomepageView />
          </Route>
          <Route path="/">
            <Redirect to="/homepage" />
          </Route>
          <Route path="/"></Route>
        </Content>
        <Divider />
        <Footer style={{ textAlign: "center" }}>
          Kalas Iris ©2021 Created by Kalas Iris Team
      </Footer>
      </Layout>
    </UserProvider>
  );
}

export default App;
