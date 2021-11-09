const webSocket = require('ws');
const events = require('events');

class twTvConnection extends events.EventEmitter {
    constructor (user) {
        super(...arguments);
        this.user = user;
        this.state = 'close';
    }

    async connect() {
        this.state = 'connecting';
        this.emit('connecting');
        this.conn = new webSocket('wss://irc-ws.chat.twitch.tv/');
        this.conn.on('message', data => this.onMessageRecieved(data));
        this.conn.once('open', async () => {
            this.conn.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
            this.conn.send('PASS SCHMOOPIIE');
            this.conn.send('NICK justinfan1234');
            this.conn.send('USER justinfan1234 8 * :justinfan1234');
            this.conn.send(`PART #${this.user}`);
            this.conn.send(`JOIN #${this.user}`);
            this.state = 'connected';
            this.emit('connected');
        });
    }

    onMessageRecieved(data) {
        data = data.toString();
        if (data.startsWith('PING')) return this.conn.send('PONG'); this.emit('ping');
        if (data.startsWith('@')) {
            if (data.startsWith('@emote-only')) {
                try {
                    var str = str.slice(1).split(' ')[0];
                    this.roomState = {
                        emoteOnly: str.split('emote-only=')[1].split(';')[0] == 1,
                        followersOnly: str.split('followers-only=')[1].split(';')[0] == 1,
                        subsOnly: str.split('subs-only=')[1].split(';')[0] == 1,
                        r9k: str.split('r9k=')[1].split(';')[0] == 1,
                        rituals: str.split('rituals=')[1].split(';')[0] == 1,
                        slow: str.split('slow=')[1].split(';')[0]
                    }
                }
                catch {
                    console.log(data);
                }
            }
            if (data.startsWith('@badge-info')) {
                var msg = data.slice(1);
                var badges = msg.split('badges=')[1].split(';')[0].split(',');
                if (msg.trim().endsWith(`USERNOTICE #${this.user}`)) return console.log(data);
                return this.emit('chat-message', {
                    user: msg.split('display-name=')[1].split(';')[0],
                    badges: badges == '' ? [] : badges,
                    color: msg.split('color=')[1].split(';')[0],
                    isMod: msg.split('mod=')[1].split(';')[0] == 1,
                    message: msg.split(`PRIVMSG #${this.user} :`)[1],
                });
            }
            return;
        }
        // Ignore server logs;
        if (data.startsWith(':tmi.twitch.tv')) return;
    }
}

exports.twTvConnection = twTvConnection;