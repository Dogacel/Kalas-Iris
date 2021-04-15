import React from "react";
import { Divider,Col, Row} from 'antd';
import ReactJson from 'react-json-view'
import ImageCrop from "./ImageCrop";


export default function FilePreview({ previewImage, previewJSON, previewVisible }) {
  return (
    <div>
      <Row gutter={32}>
        <Col>
          <ImageCrop previewImage={previewImage}/>
        </Col>
        <Col>
          <Divider orientation="left">Results</Divider>
          <ReactJson src={previewJSON} />
        </Col>
      </Row>
    </div>
  );
}