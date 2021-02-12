import React from "react";
import { Carousel } from "antd";
import { Image } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "antd";
import { Divider, Image, message } from "antd";


const contentStyle = {
    height: '675px',
    witdh: '1200px',
    background: '#FFFFFF',
    lineHeight: '160px',
    textAlign: 'center',
};

export default function HomepageView() {
    const location = useLocation();
    useEffect(() => {
      if (location.state && location.state.message) {
        message.info(location.state.message);
      }
    }, [location])

    return (
        <Carousel autoplay effect="fade" style={contentStyle}>
            <div>
                <Image 
                    style={contentStyle}
                    src={process.env.PUBLIC_URL + '/carousel-1-image.jpeg'}
                    preview={false}
                />
            </div>

            <div>
                <Image 
                    style={contentStyle}
                    src={process.env.PUBLIC_URL + '/carousel-2-image.jpeg'}
                    preview={false}
                />
            </div>
        </Carousel>
    );
}