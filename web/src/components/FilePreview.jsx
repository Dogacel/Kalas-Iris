import React, { useState } from "react";
import { Divider, Col, Row, Button, Spin, notification } from 'antd';
import ImageCrop from "./ImageCrop";
import "../css/filepreview.css";
import { sendAnnotationSuggestion } from "../api/api";
import CheckBox from "./Checkbox";

export default function FilePreview({ previewImage, previewJSON, setPreviewJSON, setAnnotatingImages, currentFileName }) {
  const [selectedResults, setSelectedResults] = useState([])
  const [submittingSuggestions, setSubmittingSuggestions] = useState(false);
  // "checked" attribute of each checkbox will be set according to the attributeCheckBoxArray[index]
  // The value for each checbox is filled according to the "index" value in the map function -> attributeCheckBoxArray[i] = ith AttributeCheckbox.checked 
  // The value at each index will be updated at the onChange prop in the Checkbox component
  // The issue is: the attributeCheckboxArray and key value are undefined at the checkbox component.
  const [attributeCheckboxArray, setAttributeCheckboxArray] = useState(new Array(5).fill(false)); 

  const submitSuggestions = () => {
    setSubmittingSuggestions(true);
    console.log("Current file name: ", currentFileName);
    console.log("Selected results: ", selectedResults);
    
    sendAnnotationSuggestion(currentFileName, selectedResults).then(r => {
      setSubmittingSuggestions(false);
      notification['success']({
        message: "Success.",
        description: "Annotation suggestion saved.",
        placement: "bottomRight"
      });
    }).catch(e => {
      notification['error']({
        message: "Error.",
        description: e,
        placement: "bottomRight"
      });
    })
    setSelectedResults([]);
  }

  return (
    <div id="preview-wrapper">
      <div id="image-container">
        <Col>
          <ImageCrop previewImage={previewImage} setPreviewJSON={setPreviewJSON} setAnnotatingImages={setAnnotatingImages} />
        </Col>
      </div>
      <Col>
        <Row id="annotation-container">
          <Col style={{ "paddingRight": "32px" }}>
            <Divider orientation="left">Attributes</Divider>
            {previewJSON.attributes &&
              <div>
                {
                  Object.keys(previewJSON?.attributes).map((key) => [key, previewJSON?.attributes[key]]).slice(0, 5).map(function (d, index) {
                    const keyValue = d.toString().substring(0, d.toString().indexOf(",")).toUpperCase();
                    const val = d.toString().substring(d.toString().indexOf(",") + 1).substring(0, 5);
                    return (
                      <CheckBox 
                        key={index} 
                        keyValue={keyValue}
                        val={val} 
                        setAnnotatingImages={setAnnotatingImages} 
                        selectedResults={selectedResults} 
                        setSelectedResults={setSelectedResults} 
                        setCheckboxArray={setAttributeCheckboxArray}
                        checkboxArray={attributeCheckboxArray}
                        />
                    )
                  })}
              </div>
            }
          </Col>
          <Col style={{ "paddingRight": "32px" }}>
            <Divider orientation="left">Categories</Divider>
            {previewJSON.attributes &&
              <div>
                {
                  Object.keys(previewJSON?.categories).map((key) => [key, previewJSON?.categories[key]]).slice(0, 5).map(function (d, index) {
                    const keyValue = d.toString().substring(0, d.toString().indexOf(",")).toUpperCase();
                    const val = d.toString().substring(d.toString().indexOf(",") + 1).substring(0, 5);
                    return (
                      <CheckBox key={index} keyValue={keyValue} val={val} setAnnotatingImages={setAnnotatingImages} selectedResults={selectedResults} setSelectedResults={setSelectedResults} />
                    )
                  })}
              </div>
            }
          </Col>
          <Col style={{ "paddingRight": "32px" }}>
            <Divider orientation="left">Colors</Divider>
            {previewJSON.attributes &&
              <div>
                {
                  Object.keys(previewJSON?.colors).map((key) => [key, previewJSON?.colors[key]]).slice(0, 5).map(function (d, index) {
                    const keyValue = d.toString().substring(0, d.toString().indexOf(",")).toUpperCase();
                    const val = d.toString().substring(d.toString().indexOf(",") + 1).substring(0, 5);
                    return (
                      <CheckBox key={index} keyValue={keyValue} val={val} setAnnotatingImages={setAnnotatingImages} selectedResults={selectedResults} setSelectedResults={setSelectedResults} />
                    )
                  })}
              </div>
            }
          </Col>
        </Row>
        <Row style={{ "paddingTop": "64px" }}>
          <Button shape="round" onClick={submitSuggestions}>Submit Suggestions</Button>
          {submittingSuggestions && <Spin size="large" tip="Submitting suggestions."/>}
        </Row>
      </Col>
    </div >
  );
}