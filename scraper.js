const axios = require("axios");

const helper = require("./helpers");
const { standings, statlines, scores } = require("./paths");

const statScraper = async (url, category) => {
  const statUrl = url;
  return axios(statUrl)
    .then((response) => {
      const html = response.data;

      let stats = [];
      switch (category) {
        case "teams":
          stats = standings.map((obj) => ({
            id: obj.id,
            items: helper.getStandings(html, obj.html),
          }));
          break;
        case "players":
          stats = statlines.map((stat) => ({
            id: stat.id,
            items: helper.getPlayerStats(html, stat.html),
          }));
          break;
        case "scores":
          stats = [
            {
              id: "Scores",
              items: helper.getGames(html, scores),
            },
          ];
      }

      return stats;
    })
    .catch(console.error);
};

async function getBatch() {
  const scoreData = await statScraper(process.env.scores, "scores");
  const standingData = await statScraper(process.env.teams, "teams");
  const playerData = await statScraper(process.env.players, "players");

  let batchItems = [
    {
      PutRequest: {
        Item: {
          statId: "scores",
          stats: scoreData,
        },
      },
    },
    {
      PutRequest: {
        Item: {
          statId: "standings",
          stats: standingData,
        },
      },
    },
    {
      PutRequest: {
        Item: {
          statId: "players",
          stats: playerData,
        },
      },
    },
  ];

  let dbrequest = {
    RequestItems: {
      "nbastats-dev": batchItems,
    },
  };
  return dbrequest;
}

module.exports = {
  statScraper,
  getBatch,
};
