const handler = (ctx,next) => {
    if(!ctx.isGroup){
        return ctx.reply("this action must be done from a group chat")
    }
    return next()
}
module.exports = handler