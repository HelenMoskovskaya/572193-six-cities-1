import React from 'react';
import PropTypes from 'prop-types';
import {BookmarkSize} from '../../constans.js';


const BookMark = (props) => {
  const {changeFavorites, isFavorite, small, className} = props;
  return <button className={`${className} button ${isFavorite ? `place-card__bookmark-button--active` : null}`}
    type="button"
    onClick={changeFavorites}>
    <svg className="place-card__bookmark-icon"
      width={small ? BookmarkSize.SMALL.width : BookmarkSize. BIG.width}
      height={small ? BookmarkSize.SMALL.height : BookmarkSize. BIG.height}
    >
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">
      {isFavorite ? `In bookmarks` : `To bookmarks`}
    </span>
  </button>;
};

BookMark.propTypes = {
  changeFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string
};

export default BookMark;


