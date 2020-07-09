const defaultLimit = 10;
const firstToThirdEmojis = { 1: '\u{1F947}', 2: '\u{1F948}', 3: '\u{1F949}' };
const hof = ctx => async () => {
  const { id } = ctx.chat;
  const users = ctx.db.get(['leaderboard', id]).value();
  const orderedUsers = Object.entries(users).sort(([, dataA], [, dataB]) => {
    const scoreA = dataA.rights - dataA.wrongs;
    const scoreB = dataB.rights - dataB.wrongs;
    return scoreB - scoreA;
  });
  const leaderboard = orderedUsers
    .slice(0, defaultLimit)
    .map(([username, { rights, wrongs, name }], index) => {
      let rank = index - 1;
      if (rank in firstToThirdEmojis) {
        rank = firstToThirdEmojis[rank];
      }
      return `${rank}. @${username} (aka: ${name}) rights: ${rights} wrongs: ${wrongs}`;
    })
    .join('\n');

  ctx.reply(`**leaderboard**\n\n${leaderboard}`);
};

module.exports = hof;
