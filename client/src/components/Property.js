import React from "react";
import '../utils/Property.css'; // CSS for individual properties

export default function Property({ property }) {
  const {
    title,
    price,
    beds,
    baths,
    sqft,
    image_url,
    viewing_option,
  } = property;

  return (
    <article className="property">
      <div className="img-container">
        <img src={image_url} alt="property" />
        <div className="price-top">
          <h6>${price}</h6>
        </div>
        {viewing_option === 'get code now' && (
          <div className="get-code-btn">Get Code Now</div>
        )}
      </div>
      <div className="property-info">
        <h3>{title}</h3>
        <p>{beds} Beds, {baths} Baths</p>
        <p>{sqft} SQ FT</p>
      </div>
    </article>
  );
}