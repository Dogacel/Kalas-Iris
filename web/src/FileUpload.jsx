import { Upload, Progress, Modal } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

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
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('')

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    fmData.append("image", file);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5001/uploadProductImage",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList }) => {
    //Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //console.log(fileList)

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleCancel = () => {
    setPreviewVisible(false)
  }

  const handlePreview = async file => {
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj);
    }
  }

  return (
    <div class="container">
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        onPreview={handlePreview}
        listType="picture-card"
        defaultFileList={defaultFileList}
        fileList={defaultFileList}
      >
        {defaultFileList.length >= 8 ? null : <div>Upload Button</div>}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
}
