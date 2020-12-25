import { Row, Col } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import FilePreview from "../components/FilePreview";
import FileUpload from "../components/FileUpload";

export default function AnnotateView() {
  const dummyJSON = ["Upload an image to start the process."];

  const [previewJSON, setPreviewJSON] = useState(dummyJSON);
  const [previewImage, setPreviewImage] = useState(
    "https://i.stack.imgur.com/y9DpT.jpg"
  );

  return (
    <Row>
      <Col span={18}>
        <FilePreview previewImage={previewImage} previewJSON={previewJSON} />
      </Col>
      <Col span={6}>
        <FileUpload
          setPreviewImage={setPreviewImage}
          setPreviewJSON={setPreviewJSON}
        />
      </Col>
    </Row>
  );
}
