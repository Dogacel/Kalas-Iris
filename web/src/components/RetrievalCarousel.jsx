import React, { useEffect } from "react";
import { Carousel, Image } from "antd";

export default function RetrievalCarousel({ images, setFetchingImages }) {
    useEffect(() => {
        setFetchingImages(false);
    }, [])

    return (
        <Carousel
            autoplay={true}
            centerPadding={0}
            centerMode={true}
            dots={false}
        >
            {images.map((imgSrc, index) => <Image src={"http://34.91.142.201/img/In-shop/Img/" + imgSrc} key={index} />)}
        </Carousel>
    )
}