import { Row, Col, Divider, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ReactJson from "react-json-view";

export default function FilePreview({ previewImage, previewJSON }) {
  return (
    <div>
      <Row gutter={32}>
        <Col>
          <Image width={400} src={previewImage} />
        </Col>
        <Col>
          <Divider orientation="left">Results</Divider>
          <ReactJson src={previewJSON} />
        </Col>
      </Row>
    </div>
  );
}
