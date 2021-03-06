import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
export default function FileModal({ previewVisible, onCancel, previewImage }) {
  return (
    <Modal
      visible={previewVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
      ]}
    >
      <img alt="example" style={{ width: "100%" }} src={previewImage} />
    </Modal>
  );
}
