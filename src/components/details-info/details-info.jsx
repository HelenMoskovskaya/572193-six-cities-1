import React from 'react';

const DetailsInfo = (props) => {
  const {offer} = props;
  return <React.Fragment>
    {offer.isPremium && <div className="property__mark">
      <span>Premium</span>
    </div>}
    <div className="property__name-wrapper">
      <h1 className="property__name">
        {offer.title}
      </h1>
      <button className={`property__bookmark-button button
									${offer.isFavorite && `property__bookmark-button--active`}`}
      type="button">
        <svg className="property__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">
          {offer.isFavorite ? `In bookmarks` : `To bookmarks`}
        </span>
      </button>
    </div>
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <span style={{width: `${Math.round(offer.rating) / 5 * 100}` + `%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="property__rating-value rating__value">{offer.rating}</span>
    </div>
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {offer.type}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {offer.bedrooms}
      </li>
      <li className="property__feature property__feature--adults">
        {offer.maxAdults}
      </li>
    </ul>
    <div className="property__price">
      <b className="property__price-value">&euro;{offer.price}</b>
      <span className="property__price-text">&nbsp;night</span>
    </div>
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {offer.goods.map((good) => {
          return <li key={good} className="property__inside-item">{good}</li>;
        })}
      </ul>
    </div>
  </React.Fragment>;
};

export default DetailsInfo;
