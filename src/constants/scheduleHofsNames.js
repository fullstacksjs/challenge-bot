const { sendLeaderboardHof, sendQuizHof } = require("../hof");

const scheduleHofsNames = {
  leaderboard: sendLeaderboardHof,
  quiz: sendQuizHof,
};

module.exports = scheduleHofsNames;
