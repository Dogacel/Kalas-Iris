import React, { useState } from "react";
import { Carousel } from "antd";
import { Divider, Image } from "antd";

const contentStyle = {
    height: '675px',
    witdh:'1200px',
    background: '#FFFFFF',
    lineHeight: '160px',
    textAlign: 'center',
    // alignment: 'center'
    // background: '#F1B236',
};

export default function HomepageView() {
    const onFinish = values => {
        console.log("Received values of form: ", values);
    };



    return (
        <>
            <Carousel autoplay effect="fade" style={contentStyle}>
                <div>
                    <Image 
                        width={1200}
                        height={675}
                        src={process.env.PUBLIC_URL + '/carousel-1-image.jpeg'}
                        preview={false}
                    />
                    {/* <h1>Retail Image Annotation and Retail Product Search API</h1> */}
                </div>
                
                <div>
                    <Image 
                        width={1200}
                        height={675}
                        src={process.env.PUBLIC_URL + '/carousel-2-image.jpeg'}
                        preview={false}
                    />
                </div>
                
                {/* <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div> */}
            </Carousel>
            <Divider />
        </>
    );
}