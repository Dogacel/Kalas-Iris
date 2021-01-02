import React, { useState } from "react";
import { Carousel } from "antd";
import { Divider } from "antd";
import { Space } from "antd";

const contentStyle = {
    height: '160px',
    color: '#6B33A1',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#F1B236',
};

export default function HomepageView() {
    const onFinish = values => {
        console.log("Received values of form: ", values);
    };

    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <Divider />
            <h1 style={{ textAlign: 'center' }}>
                We are Kalas-Iris! Welcome...
            </h1>
            <Divider />
            <h1 style={{ textAlign: 'center' }}>
                Here will be info about our services.
            </h1>
        </>
    );
}