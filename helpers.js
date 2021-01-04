const cheerio = require('cheerio');

const getPlayerStats = (html, category) => {

    const $ = cheerio.load(html);
    const statLeaders = $(category);
    const playerLeaderBoard = [];

    statLeaders.each(function() {
        const rank = $(this).find('.rank').text();
        const playerName = $(this).find('.who > a').text();
        const teamName = $(this).find('.who > .desc').text();
        const value = $(this).find('.value').text();

        playerLeaderBoard.push({
            rank,
            name: playerName,
            team: teamName,
            stat: value,
        });
    });      
    return playerLeaderBoard;
}

const getStandings = (html, conference) => {
    
    const $ = cheerio.load(html);
    const standings = $(conference);
    const teamStandings = [];

    standings.each(function() {
        const teamName = $(this).find('.left > a').text();
        const seed = $(this).find('.left > .seed').text().replace(/[()]/g,"");
        const wins = $(this).find('[data-stat="wins"]').text();
        const losses = $(this).find('[data-stat="losses"]').text();
        const winLossPct = $(this).find('[data-stat="win_loss_pct"]').text();
        const gb = $(this).find('[data-stat="gb"]').text();
        const ppg = $(this).find('[data-stat="pts_per_g"]').text();
        const oPpg = $(this).find('[data-stat="opp_pts_per_g"]').text();
        const srs = $(this).find('[data-stat="srs"]').text();

        teamStandings.push({
            name: teamName,
            seed,
            wins,
            losses,
            winLossPct,
            gb,
            ppg,
            oPpg,
            srs
        });
    });
    return teamStandings;
}

const getGames = (html, path) => {

    const $ = cheerio.load(html);
    const scores = $(path);
    const games = [];

    scores.each(function() {
        const winner = $(this).find('.teams > tbody > .winner > td > a').first().text();
        const winnerPts = $(this).find('.teams > tbody > .winner > .right').first().text();
        const loser = $(this).find('.teams > tbody > .loser > td > a').first().text();
        const loserPts = $(this).find('.teams > tbody > .loser > .right').first().text();

    games.push({
        winner,
        winnerPts,
        loser,
        loserPts,
    });
    });
    return games;
}
      
module.exports = {
    getPlayerStats,
    getStandings,
    getGames
}