import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "../css/imagecrop.css";
import "../api/api";
import { annotateImage } from '../api/api';


function generateAnnotation(canvas, crop, callback) {
    if (!crop || !canvas) {
        return;
    }

    return canvas.toBlob(
        (blob) => {
            console.log(blob);
            callback(blob);
        },
        'image/png',
        1
    );
}

export default function ImageCrop({ previewImage, setPreviewJSON }) {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({});
    const [completedCrop, setCompletedCrop] = useState(null);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <div className="App" id="wrapper">
            <div id="left">
                <ReactCrop
                    src={previewImage}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
            </div>
            {completedCrop?.width !== 0 &&
                <div id="right">
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                        }}
                    />
                    <button
                        type="button"
                        disabled={!completedCrop?.width || !completedCrop?.height}
                        onClick={() =>
                            generateAnnotation(previewCanvasRef.current, completedCrop, blob => {
                                console.log(blob)
                                annotateImage(blob).then(annotation => {
                                    const data = annotation.data

                                    data.attributes = Object.entries(data.attributes)
                                        .sort(([, a], [, b]) => b - a)
                                        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                                    data.categories = Object.entries(data.categories)
                                        .sort(([, a], [, b]) => b - a)
                                        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                                    console.log(data)
                                    setPreviewJSON(data);
                                })
                            })
                        }
                    >
                        Annotate cropped image
                    </button>
                </div>
            }
        </div>
    );
}
