import { Row, Col } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import FilePreview from "../components/FilePreview";
import FileUpload from "../components/FileUpload";

export default function AnnotateView() {
  const dummyJSON = {
    type: "image/*",
    category: "Dress",
    attributes: ["colorful", "long", "no-sleeve", "rainbow", "women"],
    landmarks: [124, 435, 325, 543, 345, 333, 435, 127],
  };

  return (
    <Row>
      <Col span={18}>
        <FilePreview annotation={dummyJSON} />
      </Col>
      <Col span={6}>
        <FileUpload />
      </Col>
    </Row>
  );
}
