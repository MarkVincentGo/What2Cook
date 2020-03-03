const Promise = require('bluebird');
const Recipe = require('./connect.js');


const methods = {
  insertMany: (items, callback) => {
    Recipe.insertMany(items, (err) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'success!');
      }
    });
  },
  findAll: (callback) => {
    Recipe.find({}, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },
};

module.exports = {
  insertMany: Promise.promisify(methods.insertMany),
  findAll: Promise.promisify(methods.findAll),
};
