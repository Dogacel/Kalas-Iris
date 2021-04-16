import React from "react";
import { Divider, Col } from 'antd';
import ReactJson from 'react-json-view'
import ImageCrop from "./ImageCrop";
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
        </Col>
        <Col>
          <Divider orientation="left">Categories</Divider>
          <ReactJson src={previewJSON.categories} />
        </Col>
        <Col>
          <Divider orientation="left">Colors</Divider>
          <ReactJson src={previewJSON.colors} />
        </Col>
      </div>
    </div >
  );
}