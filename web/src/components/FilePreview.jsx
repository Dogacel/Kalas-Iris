import React from "react";
import { Divider, Image, Col, Row} from 'antd';
import ReactJson from 'react-json-view'


export default function FilePreview({ previewImage, previewJSON, previewVisible }) {
  return (
    <div>
      <Row gutter={32}>
        <Col>
          <Image width={400} src={previewImage} visible={previewVisible}/>
        </Col>
        <Col>
          <Divider orientation="left">Results</Divider>
          <ReactJson src={previewJSON} />
        </Col>
      </Row>
    </div>
  );
}