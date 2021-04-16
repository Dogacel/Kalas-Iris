import React from "react";
import { Divider, Col, Row } from 'antd';
import ReactJson from 'react-json-view'
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
          <ReactJson src={previewJSON.attributes} />
          {previewJSON.attributes && <CheckBox values={previewJSON.attributes} />}
        </Col>
        <Col>
          <Divider orientation="left">Categories</Divider>
          <ReactJson src={previewJSON.categories} />
          {previewJSON.attributes && <CheckBox values={previewJSON.categories} />}
        </Col>
        <Col>
          <Divider orientation="left">Colors</Divider>
          <ReactJson src={previewJSON.colors} />
          {previewJSON.attributes && <CheckBox values={previewJSON.colors} />}
        </Col>
      </div>
    </div >
  );
}