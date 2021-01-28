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

        // <>
        //     <Row align="center">
        //         <div>
        //             <header>
        //                 <h1>Kalas-Iris</h1>
        //                 <h2>Image-based Annotation and Semantic Search Service for E-commerce Clothing</h2>
        //             </header>
        //         </div>
        //     </Row>
        //     <Divider />
        //     <Row align="center">
        //         <div >
        //             <header>
        //                 <h1>Retail Image Annotation and Retail Product Search API</h1>
        //                 <h2>Kalas-Iris is an image-based annotation and semantic search based
        //                 solution for e-commerce clothing websites. Our product works with the
        //                 e-commerce website that integrates the API and helps both the
        //                 retailer and their customer. Kalas-Iris can be integrated to any e-
        //                 commerce website and it provides a very simple API. The annotation
        //                 and search process is automized with our solution to provide the
        //                 customers with the possible best experience.
        //                 </h2>
        //             </header>
        //         </div>
        //     </Row>
        // </>


    );
}