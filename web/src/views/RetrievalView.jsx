import { Row, Col, Carousel, Image } from "antd";
import React, { useState } from "react";
import RetrievalImageCrop from "../components/RetrievalImageCrop";
import RetrievalUpload from "../components/RetrievalUpload";
import "../css/retrievalview.css";

export default function RetrievalView() {

  const [retrievedImages, setRetrievedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    "https://i.stack.imgur.com/y9DpT.jpg"
  );

  return (
    <Row>
      <Col span={18}>
        <div id="wrapper">
          <div id="child">
            <RetrievalImageCrop previewImage={previewImage} retrievedImages={retrievedImages} setRetrievedImages={setRetrievedImages} />
          </div>
          <div id="child">
            {retrievedImages.length !== 0 &&
              <Carousel
                autoplay={true}
                centerMode={true}
                centerPadding={0}
              >
                  {retrievedImages.map((imgSrc, index) => <Image src={"http://34.91.142.201/img/In-shop/Img/" + imgSrc} key={index} />)}
              </Carousel>
            }
          </div>
        </div>
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
