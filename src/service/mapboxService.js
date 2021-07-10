import debounce from 'lodash/debounce';
import {MAP_BOX_ACCESS_TOKEN} from '../config/index';

export function searchPlaces({searchText, country = 'vn'}) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    searchText,
  )}.json?access_token=${MAP_BOX_ACCESS_TOKEN}&country=${country}`;
  const fetchPlaces = async () => {
    const result = await fetch(url);
    return result;
  };
  return debounce(fetchPlaces, 1500);
}
