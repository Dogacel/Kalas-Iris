import FileUpload from "./components/FileUpload";
import { Layout, Menu, Breadcrumb } from "antd";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  console.log(location.pathname);

  const menuLinks = [
    { to: "/", text: "Kalas-Iris" },
    { to: "/annotate", text: "Image Annotation" },
    { to: "/integrations", text: "Kalas-Iris" },
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
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <div className="App">
            <Route path="/annotate">
              <FileUpload />
            </Route>
            <Route path="/integrations"></Route>
            <Route path="/"></Route>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
