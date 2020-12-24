import { Row, Col, Divider, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ReactJson from "react-json-view";

export default function FilePreview({ previewImage, annotation }) {
  return (
    <div>
      <Row gutter={32}>
        <Col>
          <Image
            width={400}
            src="https://assets.ajio.com/medias/sys_master/root/h2f/he2/15678454366238/-473Wx593H-461001523-multi-MODEL.jpg"
          />
        </Col>
        <Col>
          <Divider orientation="left">Results</Divider>
          <ReactJson src={annotation} />
        </Col>
      </Row>
    </div>
  );
}
