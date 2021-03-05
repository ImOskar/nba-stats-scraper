const scraper = require("./scraper");
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getstats = (event, context, callback) => {
  scraper.getBatch().then((res) => {
    dynamo.batchWrite(res, function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.Items);
      }
    });
  });
};
