import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ServiceCard = ({ service }) => {
  const { title, img, rating, price, description } = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <PhotoProvider>
          <PhotoView src={img}>
            <img src={img} alt="" />
          </PhotoView>
        </PhotoProvider>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Price: ${price}</p>
        <p>Rating: {rating}</p>
        <p>
          {description.length >= 100
            ? `${description.slice(0, 100)}...more`
            : description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View details</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;