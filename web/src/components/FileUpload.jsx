import { Upload, Progress } from "antd";
import React, { useState } from "react";
import FileModal from "./FileModal";
import "../api/api";
import { annotateImage, uploadImage } from "../api/api";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function FileUpload({ setPreviewImage, setPreviewJSON }) {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [miniPreviewImage, setMiniPreviewImage] = useState("");

  const uploadImageToServer = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        // What does this do?
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    uploadImage(file, config)
      .then(f => {
        onSuccess(f);
        getBase64(file).then(e => setPreviewImage(e));
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
      })
      .catch(e => onError(e));
  };

  // Do we need those 2 functions? Can't we use anonymous functions for one liners?
  const handleOnChange = ({ file, fileList }) => {
    setDefaultFileList(fileList);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    setPreviewVisible(true);
    getBase64(file.originFileObj).then(f => setMiniPreviewImage(f));
  };

  return (
    <div className="container">
      <Upload
        accept="image/*"
        listType="picture-card"
        customRequest={uploadImageToServer}
        onChange={handleOnChange}
        onPreview={handlePreview}
        fileList={defaultFileList}
      >
        {defaultFileList.length >= 8 ? null : <div>Upload Image</div>}
      </Upload>
      <FileModal
        onCancel={handleCancel}
        previewImage={miniPreviewImage}
        previewVisible={previewVisible}
      />
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
}
