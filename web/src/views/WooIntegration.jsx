import React from 'react';
import { Form, Input, Button } from 'antd';
import { createIntegration } from '../api/api';
import { useUserContext } from "../components/UserContext";

export default function WooIntegration() {
    const { accessToken } = useUserContext();

    const onFinish = values => {
        console.log("Received values: ", values)
        // Send request to backend
        const data = {
            "type": "woo",
            "websiteURL": values["websiteURL"],
            "consumerKey": values["consumerKey"],
            "consumerSecret": values["consumerSecret"]
        }
        createIntegration(accessToken, data);
    }

    return (
        <div className="WooCommerce">
            <Form 
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                  }}>
                <Form.Item name="websiteURL">
                    <Input type="url" placeholder="Website URL" />
                </Form.Item>
                <Form.Item name="consumerKey">
                    <Input type="text" placeholder="Consumer Key" />
                </Form.Item>
                <Form.Item name="consumerSecret">
                    <Input type="text" placeholder="Consumer Secret" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
