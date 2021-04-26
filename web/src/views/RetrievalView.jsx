import { Row, Col, Carousel, Image } from "antd";
import React, { useState } from "react";
import RetrievalImageCrop from "../components/RetrievalImageCrop";
import RetrievalUpload from "../components/RetrievalUpload";
import "../css/retrievalview.css";

//                             {retrievedImages.map((imgSrc, index) => <Image src={"http://34.91.142.201/img/In-shop/Img/" + imgSrc} key={index} />)}

export default function RetrievalView() {

    const [retrievedImages, setRetrievedImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(
        "https://i.stack.imgur.com/y9DpT.jpg"
    );

    return (
        <Row>
            <Col span={18}>
                <div class="first">
                    <RetrievalImageCrop previewImage={previewImage} retrievedImages={retrievedImages} setRetrievedImages={setRetrievedImages} />
                </div>
                {retrievedImages.length !== 0 &&
                <div class="second">
                        <Carousel
                            autoplay={true}
                            centerPadding={-20}
                            centerMode={true}
                        >
                            {retrievedImages.map((imgSrc, index) => <div style={{textAlign: "left"}}><Image src={"https://via.placeholder.com/25x50"} key={index} /> </div>)}
                        </Carousel>
                </div>
                }
            </Col>
            <Col span={6}>
                <RetrievalUpload
                    setPreviewImage={setPreviewImage}
                    setRetrievedImages={setRetrievedImages}
                    previewImage={previewImage}
                    retrievedImages={retrievedImages}
                />
            </Col>
        </Row>
    );
}
