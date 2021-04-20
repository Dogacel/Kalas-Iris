import { Upload, Progress } from "antd";
import React, { useState } from "react";
import "../api/api";
import { annotateImage, uploadImage } from "../api/api";
import ImgCrop from "antd-img-crop";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function FileUpload({ previewImage, setPreviewImage, setPreviewJSON }) {
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
  };

  const handleRemove = async file => {
    if (file.originFileObj.uid !== previewImage.uid) {
      if (defaultFileList.length > 1) {
        if (file.uid !== defaultFileList[0].uid) {
          setPreviewImage(previewImages[defaultFileList[0].originFileObj.uid])
          setPreviewJSON(annotationResult[defaultFileList[0].originFileObj.uid])
        }
        else {
          setPreviewImage(previewImages[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
          setPreviewJSON(annotationResult[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
        }
      }
      else {
        setPreviewImage("https://i.stack.imgur.com/y9DpT.jpg")
        setPreviewJSON([""])
      }
    }
  }

  return (
    <div className="container">
      <ImgCrop aspect={4/3} rotate={true} grid={true} quality={1}>
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
      </ImgCrop>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
}
