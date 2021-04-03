import { Divider, Layout, Menu, message, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { WarningOutlined, CheckOutlined } from "@ant-design/icons";
import { Route, Link, useLocation, Routes, Navigate, useNavigate } from "react-router-dom";
import AnnotateView from "./views/AnnotateView";
import IntegrationsView from "./views/IntegrationsView";
import { isServerUp, upServer, downServer } from "./api/api";
import "./css/app.css";
import "./css/menuBarStyle.css";
import LoginView from "./views/LoginView";
import RegistrationForm from "./views/SignupView";
import HomepageView from "./views/HomepageView";
import DashboardView from "./views/DashboardView";
import FashionAnnotationInfoView from "./views/FashionAnnotationInfoView";
import { UserProvider } from "./components/UserContext";
import MenuItem from "antd/lib/menu/MenuItem";
import { logout, logout2 } from "./api/api";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuLinks = [
    { to: "/annotate", text: "Image Annotation" },
    { to: "/integrations", text: "Integrations" },
    // { to: "/login", text: "Login" },
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

  const [isShown] = useState(false);

  function onLogout(e) {
    logout(UserProvider.access_token)
      .then(
        r => {
          message.success("Logged out.");
          UserProvider.setAccessToken(null);
          UserProvider.setRefreshToken(null);
          // navigate("/", {message: "Logged out from " + UserProvider.username});
          // UserProvider.setUsername(null);
        }).catch(r => {
          if (r.response) message.error(r.response.data);
        });
    logout2()
      .then(r => {
        message.success("Logged out.");
        navigate("/", {message: "Logged out from " + UserProvider.username});
          UserProvider.setUsername(null);
      }).catch(r => {
        if (r.response) message.error(r.response.data);
      });
  };

  let username = UserProvider.username; 

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
              <Menu.Item id="menuBarStyle" key="menuBarStyle">
                <Link to={"/homepage"}>
                  <img
                    width={189}
                    height={43}
                    src={process.env.PUBLIC_URL + "/ki-logo-white.png"}
                    alt="logo"
                    style={{ width: 190, height: 55 }}
                  />
                </Link>
              </Menu.Item>
            </>
            <>
              {menuLinks.map(e => (
                <Menu.Item key={e.to}>
                  <Link to={e.to} id="Link" key="Link">
                    {e.text}
                    {isShown}
                  </Link>
                </Menu.Item>
              ))}
            </>
            <>
            <MenuItem>
            {
              username = UserProvider.username
            }
            {
                (username === null) ? <Link to="/login">Login</Link> : <a onClick={onLogout}>Logout</a>
            }
            </MenuItem>
            </>
            <Menu.SubMenu
              title={
                <>
                  <span>Fashion Annotation </span>
                  <DownOutlined />
                </>
              }
            >
              <Menu.Item>
                <Link to="/annotation-info">What is Fashion Annotation?</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/annotation-info">How it works</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item
              id="cloud-menu-item"
              key="cloud-menu-item"
              disabled={true}
            >
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
          <Routes>
            <Route path="/annotate" element={<AnnotateView />} />
            <Route path="/integrations/*" element={<IntegrationsView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/" element={<HomepageView />} />
            <Route path="/homepage" element={<HomepageView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route
              path="/annotation-info"
              element={<FashionAnnotationInfoView />}
            />
          </Routes>
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
