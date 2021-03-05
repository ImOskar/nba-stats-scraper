const statlines = [
  {
    id: "Points per game",
    html: 'div[id="leaders_pts_per_g"] > table > tbody > tr',
  },
  {
    id: "Assists per game",
    html: 'div[id="leaders_ast_per_g"] > table > tbody > tr',
  },
  {
    id: "Rebounds per game",
    html: 'div[id="leaders_trb_per_g"] > table > tbody > tr',
  },
  {
    id: "Steals per game",
    html: 'div[id="leaders_stl_per_g"] > table > tbody > tr',
  },
  {
    id: "Blocks per game",
    html: 'div[id="leaders_blk_per_g"] > table > tbody > tr',
  },
  {
    id: "Player Efficiency Rating",
    html: 'div[id="leaders_per"] > table > tbody > tr',
  },
];

const standings = [
  {
    id: "Eastern Conference",
    html: "table[id=confs_standings_E] > tbody > tr",
  },
  {
    id: "Western Conference",
    html: "table[id=confs_standings_W] > tbody > tr",
  },
];

const scores = 'div[class="game_summaries"] > div';
//const allplayerstats = 'div[class="data_grid"] > div > table > tbody > tr';

module.exports = {
  standings,
  statlines,
  scores,
};
