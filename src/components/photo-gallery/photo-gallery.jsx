import React from 'react';
import {propTypesConstans} from '../../prop-types.js';
import {MAX_PHOTO_IN_GALLERY} from '../../constans.js';

const PhotoGallery = (props) => {
  const {offer} = props;
  return <div className="property__gallery-container container">
    <div className="property__gallery">
      {offer.images.slice(0, MAX_PHOTO_IN_GALLERY).map((image) => {
        return <div key={image} className="property__image-wrapper">
          <img className="property__image" src={image} alt="Photo offer" />
        </div>;
      })}
    </div>
  </div>;
};

PhotoGallery.propTypes = {
  offer: propTypesConstans.OFFER,
};

export default PhotoGallery;
