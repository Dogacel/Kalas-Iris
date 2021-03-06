import { Upload, Progress } from "antd";
import React, { useState } from "react";
import "../api/api";
import { annotateImage, uploadImage } from "../api/api";

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function FileUpload({ previewImage, setPreviewImage, setPreviewJSON, setAnnotatingImages, setCurrentFileName }) {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [annotationResult, setAnnotationResult] = useState({})
  const [previewImages, setPreviewImages] = useState({})

  const uploadImageToServer = async options => {
    const { onSuccess, onError, file } = options;

    const config = {
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
      },
    };

    uploadImage(file, config)
      .then(f => {
        onSuccess(f);
        setAnnotatingImages(true);
        setCurrentFileName(file.name)
        getBase64(file).then(e => setPreviewImage(e));
        getBase64(file).then(e => setPreviewImages(prevState => ({
          ...prevState,
          [file.uid]: e
        })))
      })
      .catch(e => onError(e));

    annotateImage(file, config)
      .then(f => {
        const data = f.data;

        data.attributes = Object.entries(data.attributes)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        data.categories = Object.entries(data.categories)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
          setPreviewJSON(data);
          setAnnotatingImages(false);
        setAnnotationResult(prevState => ({
          ...prevState,
          [file.uid]: data
        }));
      })
      .catch(e => onError(e));
  };

  const handleOnChange = ({ file, fileList }) => {
    setDefaultFileList(fileList);
  };

  const handlePreview = async file => {
    setPreviewImage(previewImages[file.originFileObj.uid])
    setPreviewJSON(annotationResult[file.originFileObj.uid])
    setCurrentFileName(file.originFileObj.name)
  };

  const handleRemove = async file => {
    if (file.originFileObj.uid !== previewImage.uid) {
      if (defaultFileList.length > 1) {
        if (file.uid !== defaultFileList[0].uid) {
          setPreviewImage(previewImages[defaultFileList[0].originFileObj.uid])
          setPreviewJSON(annotationResult[defaultFileList[0].originFileObj.uid])
          setCurrentFileName(defaultFileList[0].originFileObj.name)
        }
        else {
          setPreviewImage(previewImages[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
          setPreviewJSON(annotationResult[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
          setCurrentFileName(defaultFileList[defaultFileList.length -1].originFileObj.name)
        }
      }
      else {
        setPreviewImage("https://i.stack.imgur.com/y9DpT.jpg")
        setPreviewJSON([""])
        setAnnotatingImages(false);
        setCurrentFileName("")
      }
    }
  }

  return (
    <div className="container">
        <Upload
          accept="image/*"
          listType="picture-card"
          customRequest={uploadImageToServer}
          onChange={handleOnChange}
          onPreview={handlePreview}
          fileList={defaultFileList}
          onRemove={handleRemove}
        >
          {defaultFileList.length >= 8 ? null : <div>Upload Image</div>}
        </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
}
