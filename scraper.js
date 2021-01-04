const axios = require('axios');

const helper = require('./helpers');
const {standings, statlines, scores} = require('./paths');

const statScraper = (url, category) => {
    const statUrl = url;
    return axios(statUrl)
        .then(response => {
            const html = response.data;

            let stats = [];
            switch (category) {
                case 'teams':
                    stats = standings.map(obj => ({
                        id: obj.id,
                        items: helper.getStandings(html, obj.html)}));
                  break;
                case 'players':
                    stats = statlines.map(stat => ({
                        id: stat.id,
                        items: helper.getPlayerStats(html, stat.html)}));
                  break;
                case 'scores':
                    stats = [{
                        id: 'Scores',
                        items: helper.getGames(html, scores)
                    }];
              }
            
            return stats;
        })
        .catch(console.error);
}

module.exports = {
    statScraper
  }