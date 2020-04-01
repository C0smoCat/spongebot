const VkBot = require("node-vk-bot-api");
const Markup = require('node-vk-bot-api/lib/markup');
const config = require('./config');
const bot = new VkBot(config.bot);
let progress = {};

async function Main() {
    await bot.use(async (ctx, next) => {
        console.log(`vkLongPoll ${ctx.message.type} ${JSON.stringify(ctx.message)} ${JSON.stringify(ctx.client_info)} ${JSON.stringify(ctx.auth)}`);
        next();
    });
    await bot.event('message_new', async (ctx, next) => {
        await CalcMessage(ctx);
        next();
    });
    await bot.event('message_reply', async (ctx, next) => {
        if (ctx.message.out === 1 && (!ctx.message.attachments || ctx.message.attachments.length <= 0) && (ctx.message.text.trim() === "")) {
            console.log(`messages.delete: ${ctx.message.id}`);
            await bot.execute('messages.delete', {
                message_id: ctx.message.id,
                delete_for_all: 1
            });
        }
        next();
    });
    await bot.event('message_edit', async (ctx, next) => {
        if (ctx.message.out !== 1)
            await CalcMessage(ctx);
        next();
    });

    bot.startPolling(() => {
        console.log('vkLongPoll started');
    });
}

async function CalcMessage(ctx, db) {
    try {
        ctx.from_id = (ctx.message.peer_id || ctx.message.from_id || ctx.message.user_id || -1);
        ctx.is_multi = ctx.from_id >= 2000000000;
        if (progress[ctx.from_id] === undefined) {
            progress[ctx.from_id] = {lyricId: 0};
            console.log(`new chat: ${ctx.from_id}`);
        }

        let text = ctx.message.text;
        let is_call = config.call_test.test(text.toLowerCase());
        if (is_call)
            text = text.replace(config.call_test, "");

        if (ctx.message.action !== undefined)
            await CalcMessageAction(ctx, db);
        else if (config.start_test.test(text.toLowerCase())) {
            let lyric = config.song.lyrics[0];
            if (progress[ctx.from_id].timeout)
                clearTimeout(progress[ctx.from_id].timeout);
            ReplyLyrics(ctx, lyric);
            if (lyric.answers && lyric.answers.length > 0) {
                progress[ctx.from_id].timeout = setTimeout(
                    (lc) => ctx.reply("&#13;", null, GetKeyboard(lc.answers)),
                    10 * 1000, lyric);
            }
            progress[ctx.from_id].lyricId = 1;
        } else if (progress[ctx.from_id].lyricId > 0 && progress[ctx.from_id].lyricId < config.song.lyrics.length) {
            let cycle = 0;
            let lyric = config.song.lyrics[progress[ctx.from_id].lyricId];
            while (lyric && (!lyric.trigger || (text && lyric.trigger.test(text.toLowerCase())))) {
                if (progress[ctx.from_id].timeout)
                    clearTimeout(progress[ctx.from_id].timeout);
                setTimeout((lc) => ReplyLyrics(ctx, lc), cycle * 2000, lyric);
                if (lyric.answers && lyric.answers.length > 0) {
                    progress[ctx.from_id].timeout = setTimeout(
                        (lc) => ctx.reply("&#13;", null, GetKeyboard(lc.answers)),
                        cycle * 2000 + 10 * 1000, lyric);
                }
                progress[ctx.from_id].lyricId++;
                cycle++;
                if (progress[ctx.from_id].lyricId >= config.song.lyrics.length)
                    break;
                lyric = config.song.lyrics[progress[ctx.from_id].lyricId];
                text = undefined;
            }
        }
    } catch (e) {
        Reply(ctx, `⛔ Error`);
        console.error(e);
    }
}

function ReplyLyrics(ctx, lyric) {
    ctx.reply(lyric.text, lyric.attachments, null);
}

async function CalcMessageAction(ctx, db) {
    switch (ctx.message.action.type) {
        case "chat_photo_update":
            break;
        case "chat_photo_remove":
            break;
        case "chat_create":
            break;
        case "chat_title_update":
            break;
        case "chat_invite_user":
            Reply(ctx, '✅ Бот добавлен в беседу');
            break;
        case "chat_kick_user":
            break;
        case "chat_pin_message":
            break;
        case "chat_unpin_message":
            break;
        case "chat_invite_user_by_link ":
            break;
    }
}

function Reply(ctx, text) {
    ctx.reply(text, null, GetKeyboard());
}

/**
 * @return {null}
 */
function GetKeyboard(answers) {
    return answers !== undefined ? Markup.keyboard(
        answers.map(value => [Markup.button(value, 'primary')])
    ).oneTime() : null;
}

module.exports = {Main};