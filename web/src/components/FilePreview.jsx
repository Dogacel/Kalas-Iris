import React from "react";
import { Divider, Col, Row } from 'antd';
import ReactJson from 'react-json-view'
import ImageCrop from "./ImageCrop";
import { useAnnotationContext } from "./AnnotationContext";


export default function FilePreview({ previewImage, previewJSON, previewVisible }) {

  const {
    imageAnnotation,
  } = useAnnotationContext();

  return (
    <div>
      <Row gutter={32}>
        <Col>
          <ImageCrop previewImage={previewImage} />
        </Col>
        <Col>
          <Divider orientation="left">Results</Divider>
          <ReactJson src={imageAnnotation} />
        </Col>
      </Row>
    </div>
  );
}