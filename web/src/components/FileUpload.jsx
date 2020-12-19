import { Upload, Progress, Modal, Button } from "antd";
import React, { useState } from "react";
import axios from "axios";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function FileUpload() {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    fmData.append("image", file);

    const config = {
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    axios
      .post("http://localhost:5000/uploadProductImage", fmData, config)
      .then(f => console.log(f))
      .catch(e => console.error(e));
  };

  const handleOnChange = ({ file, fileList }) => {
    setDefaultFileList(fileList);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    setPreviewVisible(true);
    getBase64(file.originFileObj).then(f => setPreviewImage(f));
  };

  return (
    <div className="container">
      <Upload
        accept="image/*"
        listType="picture-card"
        customRequest={uploadImage}
        onChange={handleOnChange}
        onPreview={handlePreview}
        fileList={defaultFileList}
      >
        {defaultFileList.length >= 8 ? null : <div>Upload Button</div>}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
}
