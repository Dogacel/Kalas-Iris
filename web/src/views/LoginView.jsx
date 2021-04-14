import { Form, Input, Button, Checkbox, Col, Row, Image, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../api/api";
import { useUserContext } from "../components/UserContext";

export default function LoginView() {
  const navigate = useNavigate();

  const {
    username,
    setUsername,
    setAccessToken,
    setRefreshToken
  } = useUserContext();

  useEffect(() => {
    if (username) {
      navigate("/", { message: "Logged in as " + username });
    }
  }, [])

  const onFinish = values => {
    console.log("Sent values of form: ", values);
    login(values)
      .then(r => {
        message.success("Ok!");

        setAccessToken(r.data.access_token);
        setRefreshToken(r.data.refresh_token);

        localStorage.setItem('accessToken', r.data.access_token);
        localStorage.setItem('refreshToken', r.data.refresh_token);

        getCurrentUser(r.data.access_token).then(r => {
          console.log("Received " + r.data['logged_in_as']);
          setUsername(r.data['logged_in_as']);
          localStorage.setItem('username', r.data['logged_in_as'])
          navigate("/", { message: "Logged in as " + username });
        }).catch(r => {
          if (r.response) message.error(r.response.data)
        })
      })
      .catch(r => {
        if (r.response) message.error(r.response.data);
      });
  };




  return (
    <Row type="flex" align="center">
      <Col md={18} lg={6}>
        <div>
          <Image
            width={380}
            height={110}
            src={process.env.PUBLIC_URL + '/ki-black-on-white-logo.jpeg'}
            preview={false}
          />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          id="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Link to="/forgotPassword">Forgot Password</Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              id="login-button"
            >
              Log in
            </Button>
            Or <Link to="/signup"> register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
