import { Row, Col, Spin } from "antd";
import React, { useState } from "react";
import FilePreview from "../components/FilePreview";
import FileUpload from "../components/FileUpload";

export default function AnnotateView() {
  const dummyJSON = ["Upload an image to start the process."];

  // TODO: Filter shown annotations by count or confidence
  const [previewJSON, setPreviewJSON] = useState(dummyJSON);
  const [previewImage, setPreviewImage] = useState(
    "https://i.stack.imgur.com/y9DpT.jpg"
  );
  const [currentFileName, setCurrentFileName] = useState("");
  const [annotatingImages, setAnnotatingImages] = useState(false);

  return (
    <Row>
      <Col span={18}>
        <FilePreview 
          previewImage={previewImage} 
          previewJSON={previewJSON} 
          setPreviewJSON={setPreviewJSON} 
          setAnnotatingImages={setAnnotatingImages}
          currentFileName={currentFileName}
          />
      </Col>
      <Col span={6}>
        <FileUpload
          setPreviewImage={setPreviewImage}
          setPreviewJSON={setPreviewJSON}
          previewImage={previewImage}
          setAnnotatingImages={setAnnotatingImages}
          setCurrentFileName={setCurrentFileName}
        />
        {annotatingImages && <Spin tip="Annotating image. Please wait." size="large"/>}
      </Col>
    </Row>
  );
}
