import { Row, Col, Spin, Typography } from "antd";
import React, { useState } from "react";
import RetrievalImageCrop from "../components/RetrievalImageCrop";
import RetrievalUpload from "../components/RetrievalUpload";
import RetrievalCarousel from "../components/RetrievalCarousel";
import "../css/retrievalview.css";

const { Title } = Typography;

export default function RetrievalView() {

    const [retrievedImages, setRetrievedImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(
        "https://i.stack.imgur.com/y9DpT.jpg"
    );
    const [fetchingImages, setFetchingImages] = useState(false);

    return (
        <Row>
            <Col span={retrievedImages.length > 0 ? 10 : 18}>

                        <RetrievalImageCrop
                            previewImage={previewImage}
                            retrievedImages={retrievedImages}
                            setRetrievedImages={setRetrievedImages}
                            setFetchingImages={setFetchingImages}
                        />
                    
            </Col>
            {retrievedImages.length > 0 &&
                        <Col class="second" span={8}>
                            <Title level={2}>Similar Products</Title>
                            <RetrievalCarousel setFetchingImages={setFetchingImages} images={retrievedImages} />
                        </Col>
                    }
            <Col span={6}>
                <RetrievalUpload
                    setPreviewImage={setPreviewImage}
                    setRetrievedImages={setRetrievedImages}
                    previewImage={previewImage}
                    retrievedImages={retrievedImages}
                    setFetchingImages={setFetchingImages}
                />
                {fetchingImages && <Spin tip="Searching similar products. This might take a while." size="large" />}
            </Col>
        </Row>
    );
}
