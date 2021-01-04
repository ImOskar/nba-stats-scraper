const scraper = require('./scraper');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getstats = (event, context, callback) => {
  const allthestats = [];

  // Get all stats from scraper and add to array
  scraper.statScraper(process.env.scores, 'scores')
    .then(function(data) {
      allthestats.push(data)
      return scraper.statScraper(process.env.players, 'players');
    })
    .then(function(data) {
      allthestats.push(data)
      return scraper.statScraper(process.env.teams, 'teams');
    })
    .then(function(data) {
      allthestats.push(data)

      // Fetch from db
      return dynamo.scan({
        TableName: process.env.STATS_TABLE
      }).promise();
    })
    .then(response => {
      // Get the ID of yesterday's stats and delete from table
      const statsToDelete = response.Items[0] ? response.Items[0].statId : null;
      if (statsToDelete) {
        return dynamo.delete({
          TableName: process.env.STATS_TABLE,
          Key: {
            listingId: statsToDelete
          }
        }).promise();
      } else return;
    })
    .then(() => {
      // Save today's stats to db
      return dynamo.put({
        TableName: process.env.STATS_TABLE,
          Item: {
            statId: new Date().toString(),
            stats: allthestats
          }
      }).promise();
    })
    .then(() => {
      callback(null, { stats: allthestats });
    })
    .catch(callback);
};
