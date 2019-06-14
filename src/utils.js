import {CalculateDistanceInfo} from './constans.js';

export const adaptToCamelCase = (obj) => {
  if (typeof (obj) !== `object`) {
    return obj;
  }
  // eslint-disable-next-line guard-for-in
  for (const oldName in obj) {
    const newName = oldName.replace(/([-_][a-z])/g,
    // eslint-disable-next-line indent
    (group) => group.toUpperCase().replace(`-`, ``).replace(`_`, ``));

    if (newName !== oldName) {

      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    // eslint-disable-next-line space-unary-ops
    if (typeof(obj[newName]) === `object`) {
      obj[newName] = adaptToCamelCase(obj[newName]);
    }
  }

  return obj;
};

export const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  } else {
    const radlat1 = Math.PI * lat1 / CalculateDistanceInfo.DEGREE;
    const radlat2 = Math.PI * lat2 / CalculateDistanceInfo.DEGREE;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / CalculateDistanceInfo.DEGREE;
    let dist = Math.sin(radlat1) * Math.sin(radlat2)
      + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * CalculateDistanceInfo.DEGREE / Math.PI;
    dist = dist * CalculateDistanceInfo.NUMBER_OF_MINUTES_IN_DEGREES *
      CalculateDistanceInfo.DEFAULT_MILES;
    if (unit === `K`) {
      dist = dist * CalculateDistanceInfo.CONVERTER_FOR_KM;
    }
    if (unit === `N`) {
      dist = dist * CalculateDistanceInfo.CONVERTER_FOR_NAUTICAL_MILES;
    }
    return dist;
  }
};
