import algoliasearch from 'algoliasearch';
import {algolia as adminApiKey} from '../../secretkey';
const applicationId = 'RDSGMPECF2';
const indexName = 'dev_inn';
const client = algoliasearch(applicationId, adminApiKey);
const clientIndex = client.initIndex(indexName);
const housewareIndex = client.initIndex('dev_houseware');
export {clientIndex, housewareIndex};
