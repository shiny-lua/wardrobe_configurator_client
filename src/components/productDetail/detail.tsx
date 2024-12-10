import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/grid';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import { Grid, Pagination } from 'swiper/modules';
interface DetailImagProps {
    img: string[];
}

const DetailImag: React.FC<DetailImagProps> = ({ img }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    // console.log(img)
    const detailImg = [
        "/images/productimage/detail/1.png",
        "/images/productimage/detail/2.png",
        "/images/productimage/detail/3.png",
        "/images/productimage/detail/4.png",
        "/images/productimage/detail/5.png",
        "/images/productimage/detail/6.png",
        "/images/productimage/detail/7.png",
        "/images/productimage/detail/8.png",
    ];

    return (
        <>
            <main className="main-swiper-content grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="image-container">
                            <img src={img[0] ? img[0] : detailImg[0]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                    </div>
                    <div className="col-span-1 grid gap-4">
                        <div className="image-container1">
                            <img src={img[1] ? img[1] : detailImg[1]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                        <div className="image-container">
                            <img src={img[2] ? img[2] : detailImg[2]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="image-container">
                            <img src={img[3] ? img[3] : detailImg[3]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                        <div className="image-container">
                            <img src={img[4] ? img[4] : detailImg[4]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                        <div className="image-container">
                            <img src={img[5] ? img[5] : detailImg[5]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                        <div className="image-container">
                            <img src={img[6] ? img[6] : detailImg[6]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                    </div>
                    <div>
                        <div className="image-container">
                            <img src={img[7] ? img[7] : detailImg[7]} alt={`Thumbnail`} className="zoom-image object-cover"/>
                        </div>
                    </div>
                </div>
            </main>
            <main className="sub-swiper-content">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    // navigation={true}
                    thumbs={{ swiper: thumbsSwiper ? thumbsSwiper : undefined }}
                    modules={[FreeMode,  Thumbs]}
                    className="mySwiper2"
                >
                    {detailImg.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="image-container">
                                <img src={src} alt={`Thumbnail ${index + 1}`} className="zoom-image"/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    // onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {detailImg.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="image-container">
                                <img src={img[index] ? img[index] : src} alt={`Thumbnail ${index + 1}`} className="zoom-image"/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </>
    );
};

export default DetailImag;
