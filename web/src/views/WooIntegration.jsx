import React from 'react';
import { Form, Input, Button } from 'antd';

export default function WooIntegration() {

    const onFinish = (values) => {
        console.log('Received values: ', values)
        // Send request to backend
    }

    return (
        <div className="WooCommerce">
            <Form 
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                  }}>
                <Form.Item label="consumer-key">
                    <Input type="text" placeholder="Consumer Key" />
                </Form.Item>
                <Form.Item label="consumer-secret">
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
