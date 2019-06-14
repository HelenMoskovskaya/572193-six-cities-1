import React from 'react';

const PhotoGallery = (props) => {
  const {offer} = props;
  return <div className="property__gallery-container container">
    <div className="property__gallery">
      {offer.images.slice(0, 6).map((image) => {
        return <div key={image} className="property__image-wrapper">
          <img className="property__image" src={image} alt="Photo offer" />
        </div>;
      })}
    </div>
  </div>;
};

export default PhotoGallery;
