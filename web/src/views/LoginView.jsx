import { Form, Input, Button, Checkbox, Col, Row, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { login, getCurrentUser } from "../api/api";
import { useState } from "react";

export default function LoginView() {
  const history = useHistory();

  const onFinish = values => {
    console.log("Sent values of form: ", values);
    login(values)
      .then(r => {
        message.success("Ok!");
        getCurrentUser(r.data.access_token).then(r => {
          history.push("/homepage", { message: "Logged in as " + r.data['logged_in_as'].username });
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

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
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
