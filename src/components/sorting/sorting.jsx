import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {ActionCreatorData} from '../../reducer/data/data.js';
import {getActiveSort} from '../../reducer/data/selectors.js';
import withSortMenuToggle from '../../hocs/with-sort-menu-toggle.jsx';

const OPTIONS = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

const Sorting = (props) => {
  const {isMenuOpen, changeToggle, activeSort, sortOffers} = props;

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" onClick={changeToggle}>
      {activeSort}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isMenuOpen ? `places__options--opened` : ``}`}>
      {OPTIONS.map((option, index) => {
        return <li
          key={`${index} - options`}
          className="places__option"
          id={option}
          onClick={() => {
            sortOffers(option);
            changeToggle();
          }}
          tabIndex={index}>
          {option}
        </li>;
      })}
    </ul>
  </form>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeSort: getActiveSort(state)
});

const mapDispatchToProps = (dispatch) => ({
  sortOffers: (activeSort) => {
    dispatch(ActionCreatorData.sortOffers(activeSort));
  }
});

Sorting.propTypes = {
  isMenuOpen: PropTypes.bool,
  changeToggle: PropTypes.func,
  activeSort: PropTypes.string,
  sortOffers: PropTypes.func,
};

export {Sorting};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withSortMenuToggle
)(Sorting);

