import { Row, Col, Spin, Typography } from "antd";
import React, { useState } from "react";
import RetrievalImageCrop from "../components/RetrievalImageCrop";
import RetrievalUpload from "../components/RetrievalUpload";
import RetrievalCarousel from "../components/RetrievalCarousel";
import "../css/retrievalview.css";

const { Title } = Typography;
//                             {retrievedImages.map((imgSrc, index) => <Image src={"http://34.91.142.201/img/In-shop/Img/" + imgSrc} key={index} />)}

export default function RetrievalView() {

    const [retrievedImages, setRetrievedImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(
        "https://i.stack.imgur.com/y9DpT.jpg"
    );
    const [fetchingImages, setFetchingImages] = useState(false);

    return (
        <Row>
            <Col span={18}>
                <div id="wrapper">
                    <div class="first">
                        <RetrievalImageCrop
                            previewImage={previewImage}
                            retrievedImages={retrievedImages}
                            setRetrievedImages={setRetrievedImages}
                            setFetchingImages={setFetchingImages}
                        />
                    </div>
                    {retrievedImages.length > 0 &&
                        <div class="second">
                            <Title level={2}>Similar Products</Title>
                            <RetrievalCarousel setFetchingImages={setFetchingImages} images={retrievedImages}/>
                        </div>
                    }
                </div>
            </Col>
            <Col span={6}>
                <RetrievalUpload
                    setPreviewImage={setPreviewImage}
                    setRetrievedImages={setRetrievedImages}
                    previewImage={previewImage}
                    retrievedImages={retrievedImages}
                    setFetchingImages={setFetchingImages}
                />
                {fetchingImages && <Spin tip="Searching similar products. This might take a while." size="large"/>}
            </Col>
        </Row>
    );
}
