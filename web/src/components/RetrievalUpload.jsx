import { Upload, Progress } from "antd";
import React, { useState } from "react";
import "../api/api";
import { uploadImageRetrieval, uploadImage } from "../api/api";

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function RetrievalUpload({ previewImage, setPreviewImage, retrievedImages, setRetrievedImages, setFetchingImages }) {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [retrievalResult, setRetrievalResult] = useState({})
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
        setRetrievedImages([]);
        setFetchingImages(true);
        getBase64(file).then(e => setPreviewImage(e));
        getBase64(file).then(e => setPreviewImages(prevState => ({
          ...prevState,
          [file.uid]: e
        })))
      })
      .catch(e => onError(e));

    uploadImageRetrieval(file, config)
      .then(f => {
        const paths = f.data["paths"]
        console.log("paths: ", paths);
        f.data["paths"].map(element => setRetrievedImages(state => [...state, element]))
        setRetrievalResult(prevState => ({
          ...prevState,
          [file.uid]: paths
        })
      )
    })
      .catch(e => onError(e));
  };

  const handleOnChange = ({ file, fileList }) => {
    setDefaultFileList(fileList);
  };

  const handlePreview = async file => {
    setPreviewImage(previewImages[file.originFileObj.uid])
    setRetrievedImages(retrievalResult[file.originFileObj.uid])
  };

  const handleRemove = async file => {
    if (file.originFileObj.uid !== previewImage.uid) {
      if (defaultFileList.length > 1) {
        if (file.uid !== defaultFileList[0].uid) {
          setPreviewImage(previewImages[defaultFileList[0].originFileObj.uid])
          setRetrievedImages(retrievalResult[defaultFileList[0].originFileObj.uid])
        }
        else {
          setPreviewImage(previewImages[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
          setRetrievedImages(retrievalResult[defaultFileList[defaultFileList.length - 1].originFileObj.uid])
        }
      }
      else {
        setPreviewImage("https://i.stack.imgur.com/y9DpT.jpg")
        setRetrievedImages([""])
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
