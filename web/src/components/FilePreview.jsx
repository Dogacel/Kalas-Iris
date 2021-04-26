import React from "react";
import { Divider, Col, Button } from 'antd';
import ImageCrop from "./ImageCrop";
import CheckBox from "./Checkbox";
import "../css/filepreview.css";

export default function FilePreview({ previewImage, previewJSON, setPreviewJSON }) {
  return (
    <div id="preview-wrapper">
      <div id="image-container">
        <Col>
          <ImageCrop previewImage={previewImage} setPreviewJSON={setPreviewJSON} />
        </Col>
      </div>
      <div id="annotation-container">
        <Col>
          <Divider orientation="left">Attributes</Divider>
          {previewJSON.attributes && <CheckBox values={previewJSON?.attributes} />}
        </Col>
        <Col>
          <Divider orientation="left">Categories</Divider>
          {previewJSON.attributes && <CheckBox values={previewJSON?.categories} />}
        </Col>
        <Col style={{marginBottom: 5}}>
          <Divider orientation="left">Colors</Divider>
          {previewJSON.attributes && <CheckBox values={previewJSON?.colors} />}
        </Col>
      <Button shape="round">Submit Suggestions</Button>
      </div>
    </div >
  );
}