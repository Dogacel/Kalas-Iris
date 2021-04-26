import { Divider, Layout, Menu, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { WarningOutlined, CheckOutlined } from "@ant-design/icons";
import { Route, Link, useLocation, Routes, useNavigationState} from "react-router-dom";
import AnnotateView from "./views/AnnotateView";
import IntegrationsView from "./views/IntegrationsView";
import { isServerUp, upServer, downServer } from "./api/api";
import "./css/app.css";
import "./css/menuBarStyle.css";
import LoginView from "./views/LoginView";
import Logout from "./components/Logout";
import RegistrationForm from "./views/SignupView";
import HomepageView from "./views/HomepageView";
import ReviewView from "./views/ReviewView";
import ReviewHistoryView from "./views/ReviewHistoryView";
import RetrivalView from "./views/RetrievalView";
import { useUserContext } from "./components/UserContext";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  const {
    username
  } = useUserContext();

  const menuLinks = [
    { to: "/annotate", text: "Image Annotation" },
    { to: "/review", text: "Review" },
    { to: "/past_reviews", text: "Past Reviews" },
    { to: "/retrieval", text: "Image Retrieval"}
  ];

  if (username) {
    menuLinks.splice(1, 0, { to: "/integrations", text: "Integrations" });
  }

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


  if (location.state && location.state.message) {
    message.success(location.message);
  }

  const [isShown] = useState(false);

  return (
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
              <Link to={"/"}>
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


          <Menu.Item
            id="login-logout-item"
            key={"/login"}>
            <Link to={username ? "/logout" : "/login"} id="Link" key="Link">
              {username ? "Logout" : "Login"}
              {isShown}
            </Link>
          </Menu.Item>
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
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/" element={<HomepageView />} />
          <Route path="/review" element={<ReviewView />} />
          <Route path="/past_reviews" element={<ReviewHistoryView />} />
          <Route path="/retrieval" element={<RetrivalView />} />
        </Routes>
      </Content>
      <Divider />
      <Footer style={{ textAlign: "center" }}>
        Kalas Iris ©2021 Created by Kalas Iris Team
        </Footer>
    </Layout>
  );
}

export default App;
