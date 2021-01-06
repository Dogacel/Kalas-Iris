import React, { useState } from "react";
import { Carousel } from "antd";
import { Divider, Image } from "antd";

const contentStyle = {
    height: '600px',
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
            <Carousel autoplay style={contentStyle}>
                <div>
                    <Image 
                        width = {400}
                        src={process.env.PUBLIC_URL + '/Kalas-Iris-split-didot.jpg'}
                    />
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
            {/* <div>
                <img src={ProcessingInstruction.env.PUBLIC_URL + '/PATATA.jpeg'} />
                <h1>
                    Introducing
                </h1>
                <h1>
                    Clothing Retail Product Labeling Platform
                </h1>
            </div> */}
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