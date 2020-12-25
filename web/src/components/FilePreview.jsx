import React, { useState } from "react";
import { Carousel } from 'antd';


export default function FilePreview({ previewImage, annotation }) {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <img alt="" src={previewImage}/>
        </div>
      </Carousel>
    </div>
  );
}