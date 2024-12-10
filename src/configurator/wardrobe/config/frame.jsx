import React from "react";
import DetailImag from "../../../components/productDetail/detail";
import { Link } from "react-router-dom";

export default function Frame(props) {
  const { imagesIndex, setImagesIndex, detailImg } = props;
  const productImages = Array.from(
    { length: 15 },
    (_, index) => `/images/productimage/${index + 1}.png`
  );
  return (
    <div className="p-4 bg-[#F6F6F6]">
      <div className="flex my-2 mb-8">
        <div className="w-1/3 flex items-center font-">
        <ul className="flex text-[#456779] h-[35px]">
          <li
            className="mr-8 text-lg nav_link text-[35px] "
          >
            <a href="#root">
            Designen
            </a>
          </li>
          <li
            className="mr-8 text-lg nav_link text-[35px]"
          >
            <a href="#galery">
            Galerie
            </a>
          </li>
          <li
            className="mr-8 text-lg nav_link text-[35px]"
          >
            <a href="#detail">
            Details
            </a>
          </li>
        </ul>
        </div>
        <div className="w-2/3 flex justify-end items-center">
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`shadow-lg mr-1 ml-1 rounded-[10px] cursor-pointer ${
                imagesIndex === index
                  ? "box-border border-black border-[2px]"
                  : null
              }`}
              onClick={(e) => setImagesIndex(index)}
            >
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <DetailImag img={detailImg} />
    </div>
  );
}