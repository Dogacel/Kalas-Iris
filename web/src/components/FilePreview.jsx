import React, { useState } from "react";
import { Divider, Col, Row, Button, Spin, notification } from 'antd';
import ImageCrop from "./ImageCrop";
import "../css/filepreview.css";
import { sendAnnotationSuggestion } from "../api/api";
import CheckBox from "./Checkbox";

export default function FilePreview({ previewImage, previewJSON, setPreviewJSON, setAnnotatingImages, currentFileName }) {
  const [selectedResults, setSelectedResults] = useState([])
  const [submittingSuggestions, setSubmittingSuggestions] = useState(false);
  const [attributeCheckboxArray, setAttributeCheckboxArray] = useState([false, false, false, false, false]); 
  const [categoryCheckboxArray, setCategoryCheckboxArray] = useState([false, false, false, false, false]); 
  const [colorCheckboxArray, setColorCheckboxArray] = useState([false, false, false, false, false]); 

  const submitSuggestions = () => {
    setSubmittingSuggestions(true);
    console.log("Current file name: ", currentFileName);
    console.log("Selected results: ", selectedResults);
    setAttributeCheckboxArray([false, false, false, false, false]);
    setCategoryCheckboxArray([false, false, false, false, false]);
    setColorCheckboxArray([false, false, false, false, false]);
    
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
          <ImageCrop 
            previewImage={previewImage}
            setPreviewJSON={setPreviewJSON} 
            setAnnotatingImages={setAnnotatingImages} 
            setAttributeCheckboxArray={setAttributeCheckboxArray}
            setCategoryCheckboxArray={setCategoryCheckboxArray}
            setColorCheckboxArray={setColorCheckboxArray} 
            />
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
                        index={index}
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
                      <CheckBox    index={index}
                      key={index} 
                      keyValue={keyValue}
                      val={val} 
                      setAnnotatingImages={setAnnotatingImages} 
                      selectedResults={selectedResults} 
                      setSelectedResults={setSelectedResults} 
                      setCheckboxArray={setCategoryCheckboxArray}
                      checkboxArray={categoryCheckboxArray}/>
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
                    const val = d.toString().substring(d.toString().indexOf(",") + 1);
                    return (
                      <CheckBox    index={index}
                      key={index} 
                      keyValue={keyValue}
                      val={val} 
                      setAnnotatingImages={setAnnotatingImages} 
                      selectedResults={selectedResults} 
                      setSelectedResults={setSelectedResults} 
                      setCheckboxArray={setColorCheckboxArray}
                      checkboxArray={colorCheckboxArray}/>
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