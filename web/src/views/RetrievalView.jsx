import { Row, Col, Carousel, Image } from "antd";
import React, { useState } from "react";
import RetrievalUpload from "../components/FileUpload";
import RetrievalImageCrop from "../components/ImageCrop";


export default function RetrievalView() {

    // TODO: Filter shown annotations by count or confidence
  const [previewGallery, setPreviewGallery] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    "https://i.stack.imgur.com/y9DpT.jpg"
  );

  return (
     <Row>
      <Col span={18}>
        <RetrievalImageCrop previewImage={previewImage} setPreviewGallery={setPreviewGallery}/>
        <Carousel>
            {previewGallery.map((imgSrc) => (<Image src={imgSrc.src} />))}
        </Carousel>
      </Col>
      <Col span={6}>
        <RetrievalUpload
          setPreviewImage={setPreviewImage}
          setPreviewJSON={setPreviewGallery}
          previewImage={previewImage}
        />
      </Col>
    </Row>
  );
}
