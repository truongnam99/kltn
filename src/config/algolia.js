import algoliasearch from 'algoliasearch';
const applicationId = 'RDSGMPECF2';
const adminApiKey = 'd8c448aef5b18d6a0094f4f4e6a5dadd';
const indexName = 'dev_inn';
const client = algoliasearch(applicationId, adminApiKey);
const clientIndex = client.initIndex(indexName);
export {clientIndex};
