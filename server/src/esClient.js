import model from './models';

(function () {
  'use strict';
 
  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });


  const { Books } = model;


  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });

      bulkBody.push(item);
    });

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err);
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    Books.findAll().then(books => {
      bulkIndex('books_development', 'books', books);
    });
  };

  test();

  module.exports = {
    bulkIndex
  };
} ());
