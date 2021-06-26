import debounce from 'lodash/debounce';
import {MAP_BOX_ACCESS_TOKEN} from '../config/index';

export function searchPlaces({searchText, country = 'vn'}) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    searchText,
  )}.json?access_token=${MAP_BOX_ACCESS_TOKEN}&country=${country}`;
  console.log('url: ', url);
  const fetchPlaces = async () => {
    const result = await fetch(url);
    console.log('result: ', result);
    return result;
  };
  return debounce(fetchPlaces, 1500);
}
