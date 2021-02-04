import React, { useState } from "react";
import { Carousel, Row, Column } from "antd";
import { Divider, Image } from "antd";

const contentStyle = {
    height: '675px',
    witdh: '1200px',
    background: '#FFFFFF',
    lineHeight: '160px',
    textAlign: 'center',
};

export default function HomepageView() {
    const onFinish = values => {
        console.log("Received values of form: ", values);
    };

    return (

        <Carousel autoplay effect="fade" style={contentStyle}>
            <div>
                <Image 
                    width={1200}
                    height={675}
                    src={process.env.PUBLIC_URL + '/carousel-1-image.jpeg'}
                    preview={false}
                />
            </div>

            <div>
                <Image 
                    width={1200}
                    height={675}
                    src={process.env.PUBLIC_URL + '/carousel-2-image.jpeg'}
                    preview={false}
                />
            </div>
        </Carousel>
    );
}