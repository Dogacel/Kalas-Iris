import { Layout, Menu } from "antd";

import { Route, Link, useLocation } from "react-router-dom";
import AnnotateView from "./views/AnnotateView";
import IntegrationsView from "./views/IntegrationsView";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  console.log(location.pathname);

  const menuLinks = [
    { to: "/", text: "Kalas-Iris" },
    { to: "/annotate", text: "Image Annotation" },
    { to: "/integrations", text: "Integrations" },
  ];

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
