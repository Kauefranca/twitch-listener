const { twTvConnection } = require('./index');

(async() => {
    const client = new twTvConnection('gaules');
    await client.connect();

    var todo0 = '@badge-info=subscriber/0;badges=subscriber/0,premium/1;color=;display-name=hasta3;emotes=;flags=;id=51cba6e9-256c-465b-b430-a1a6ea0bfa46;login=hasta3;mod=0;msg-id=sub;msg-param-cumulative-months=1;msg-param-months=0;msg-param-multimonth-duration=0;msg-param-multimonth-tenure=0;msg-param-should-share-streak=0;msg-param-sub-plan-name=Guerreiro\s(gaules);msg-param-sub-plan=Prime;msg-param-was-gifted=false;room-id=181077473;subscriber=1;system-msg=hasta3\ssubscribed\swith\sPrime.;tmi-sent-ts=1636235929353;user-id=63440507;user-type= :tmi.twitch.tv USERNOTICE #gaules';
    var todo1 = '@badge-info=subscriber/0;badges=subscriber/0,premium/1;color=#FF0000;display-name=kaiosg_;emotes=;flags=;id=bdd1094c-7076-438b-9d4b-fe656f8442cd;login=kaiosg_;mod=0;msg-id=sub;msg-param-cumulative-months=1;msg-param-months=0;msg-param-multimonth-duration=0;msg-param-multimonth-tenure=0;msg-param-should-share-streak=0;msg-param-sub-plan-name=Guerreiro\s(gaules);msg-param-sub-plan=Prime;msg-param-was-gifted=false;room-id=181077473;subscriber=1;system-msg=kaiosg_\ssubscribed\swith\sPrime.;tmi-sent-ts=1636235927235;user-id=409937319;user-type= :tmi.twitch.tv USERNOTICE #gaules';

    // client.on('chat-message', obj => console.log(`${obj.user}: ${obj.message}`));
})();