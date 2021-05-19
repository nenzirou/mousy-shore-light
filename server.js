////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                  命令表
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for→ゼミ順を一つ先へ。`
// back→ゼミ順を一つ前へ。
// next→ゼミ順を表示。
// add→積み残しリストへ追加。[add][add 浅野][add 浅野 稲守]
// take→積み残しリスト削除。
// join→BOTがボイスチャンネルに接続。
// leave→BOTがボイスチャンネルから切断。
// !z→ゼミ開始フラグをリセットする。もう一度ゼミ開始を行えるようになる。
// teach→BOTの読み上げ教育。[teach 浅野 なめこ]→浅野をなめこと読み上げる
// clear→BOTの読み上げ教育削除。[clear 浅野]→浅野をなめこと読み上げなくなる
// set→お知らせに文章を追加。[set 書類は9月17日までに提出してください。 9 17]→9月17日まで毎朝のお知らせに文章を追加
// len→文章の文字数をカウント。[len おはようございます。]
// sel→ゼミ順から名前をランダムに選んで出力。[sel][sel 数値]
// weather→天気情報を出力。

// ディスコードに入っている人の一覧です。
// idにはディスコードのメンバーリストを右クリック→「IDをコピー」でコピーしたものを入れてください。
// nameにはその人の苗字を入れてください。
// zOrderにはその人のゼミ発表順を入れてください。発表が無い人には-1を入れてください。
// Gには、share販売を使用する人には0,使用しない人に-1を入れてください。読み込まれたお金がここに入ります。
// gradeには、M2:2 M1:1 B4:4 B3:3 教授:9 それ以外:-1を入力してください　share販売の表示やゼミの参加者の表示に使用します。
const zOrderNum = 5; //ゼミ周期の個数を入れてください。
const member = [
  { id: "758946932210008085", name: "BOT", zOrder: -1, G: 0, grade: -1 },
  { id: "744759519011143730", name: "研究室", zOrder: -1, G: 0, grade: -1 },
  { id: "702413329691443270", name: "木島", zOrder: -1, G: 0, grade: 9 },
  { id: "730939586620031007", name: "木島A", zOrder: -1, G: 0, grade: -1 },
  { id: "807689067663327274", name: "メンテ", zOrder: -1, G: 0, grade: -1 },
  { id: "243312886049406979", name: "浅野", zOrder: 0, G: 0, grade: 2 },
  { id: "694443025287610408", name: "稲守", zOrder: 3, G: 0, grade: 2 },
  { id: "337439445269741568", name: "髙岡", zOrder: 4, G: 0, grade: 2 },
  { id: "694899614201020448", name: "松野", zOrder: 2, G: 0, grade: 2 },
  { id: "838561035115036693", name: "白木", zOrder: 1, G: 0, grade: 1 },
  { id: "694560220730359890", name: "野ツ俣", zOrder: 0, G: 0, grade: 1 },
  { id: "336031337452666880", name: "虫鹿", zOrder: 2, G: 0, grade: 1 },
  { id: "771287651818143755", name: "大橋", zOrder: 1, G: 0, grade: 4 },
  { id: "600210954503979010", name: "谷口", zOrder: 3, G: 0, grade: 4 },
  { id: "706476736467959818", name: "新良", zOrder: 4, G: 0, grade: 4 },
  { id: "749561829558321182", name: "平野", zOrder: 0, G: 0, grade: 4 }
];
// ゼミをいつやるか記述します。
// weekには0~6を入れます。0:日曜日　1:月曜日　～　6:土曜日
// timeには開始時刻を入れます。例)"`16時30分`"
const zemiInfo = [
  { week: 1, time: "`16時30分`" },
  { week: 3, time: "`16時30分`" },
  { week: 4, time: "`14時45分`" }
];
// 今年の祝日を記述します。2021年
const holiday = [
  { month: 1, day: 1, name: "元日" },
  { month: 1, day: 11, name: "成人の日" },
  { month: 2, day: 11, name: "建国記念日" },
  { month: 2, day: 23, name: "天皇誕生日" },
  { month: 3, day: 20, name: "春分の日" },
  { month: 4, day: 29, name: "昭和の日" },
  { month: 5, day: 3, name: "憲法記念日" },
  { month: 5, day: 4, name: "みどりの日" },
  { month: 5, day: 5, name: "こどもの日" },
  { month: 7, day: 22, name: "海の日" },
  { month: 7, day: 23, name: "スポーツの日" },
  { month: 8, day: 8, name: "山の日" },
  { month: 8, day: 9, name: "振替休日" },
  { month: 9, day: 20, name: "敬老の日" },
  { month: 9, day: 23, name: "秋分の日" },
  { month: 11, day: 3, name: "文化の日" },
  { month: 11, day: 23, name: "勤労感謝の日" }
];
// share販売の商品と価格を設定します
const product = [
  { name: "ドリンク", price: 100 },
  { name: "ピュアの森", price: 50 },
  { name: "１００円ゾーン", price: 100 },
  { name: "１２０円ゾーン", price: 120 },
  { name: "２００円ゾーン", price: 200 }
];
// お知らせに追加する期限　month:0,day:0で表示しない
const deadline = [
  { name: "修論提出", month: 0, day: 0 },
  { name: "卒論提出", month: 0, day: 0 },
  { name: "修論発表", month: 0, day: 0 },
  { name: "卒論発表", month: 0, day: 0 },
  { name: "駐車場書類〆切", month: 0, day: 0 }
];
// 効果音の設定
const assets = "https://cdn.glitch.com/6e76084a-6d4e-44e8-b116-fe0e363bcc7a%2F";

const SE = [
  { URL: assets + "hand.mp3?v=1612702206754", icon: "✋" },
  { URL: assets + "message.mp3?v=1621423574330", icon: "💬" },
  { URL: assets + "ovation.mp3?v=1621423120154", icon: "👏" },
  { URL: assets + "ovation.mp3?v=1621423120154", icon: "👏" },
  { URL: assets + "wait.mp3?v=1621429967068", icon: "🙏" },
  { URL: assets + "thankyou.mp3?v=1621425553347", icon: "👋" },
  //{ URL: assets + "karaoke.mp3?v=1621422375866", icon: "🎤" }
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//プログラム始まり
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//必要モジュールのインストール
const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");
const unirest = require("unirest"); // OpenWeatherMapと通信するために必要
const { writeFileSync } = require("fs"); // ファイル関係
const { VoiceText } = require("voice-text"); // 音声を読み上げてくれるやつをラップして処理してくれるやつ
const voicetext = new VoiceText("d03x68wro08w7mz7"); // 音声を読み上げてくれるやつ
const cron = require("node-cron"); // 定期的にプログラムを実行してくれるやつ
const client = new discord.Client();
const fs = require("fs");

// チャンネルID記述
const TEACHER_CHANNEL = "732522915832266834"; // #先生の部屋ID
const NOTICE_CHANNEL = "716879387072528384"; // #お知らせID
const LIVING_CHANNEL = "694442027248648224";//#研究室ID
const DOCUMENT_CHANNEL = "790490207228788776"; // #資料ID
const BOT_CHANNEL = "758946751830163477"; // #Bot開発ID
const GAME_CHANNEL = "768724791141990461"; // #gameID
const ANONY_CHANNEL = "768723934966841355"; // #匿名掲示板ID
const SHARE_CHANNEL = "803967819402051624"; // #share販売ID
const SE_CHANNEL = "716877202645450794"; // #説明書ID
const WEATHER_CHANNEL = "811959513568903198"; //#天気予報ID
const CHAT_CHANNEL = "811541043459653632"; // #通話チャットID
const INST_TEXT = "786125903460958230"; // ゲーム説明書のメッセージID
const RANK_TEXT = "786232811207917599"; // ランキングのメッセージID
const DISP_TEXT = "788263576594153472"; // ディスプレイのメッセージID
const BANK_TEXT = "807929349562826783"; //預金の表示メッセージID
const BINS_TEXT = "807926652243410955"; // 預金の説明メッセージID
const SE_TEXT = "844506362359578634"; // 効果音のリアクションを持つメッセージID
const WEAT_TEXT = "811961505066123284"; //天気予報のメッセージID
const GUILD_ID = "694442026762240090"; // 木島研サーバーのID
const DELAY = 5000; //命令が消えるまでの時間
const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 各月の日数
const week = ["日", "月", "火", "水", "木", "金", "土"];
let noticeList = []; // ユーザのお知らせを格納するリスト
// 読み上げ関係
const voiceTable = ["hikari", "haruka", "takeru", "santa", "show"]; // ボイスの種類 bearは聞き取りずらいので除外
let sayQueue = []; // 発言を記憶しておくキュー
let teach = []; // 読み上げに教育したリスト
let sayFlag = false; // BOTが発言中かどうかを判定する
const numIcon = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯"]; //share販売の絵文字
const gameIcon = [
  "⬅",
  "⬆",
  "⬇",
  "➡",
  "💣",
  "⏱",
  "⏸",
  "<:death:767774739195494480>"
];
let bankMoney = 0; // shareの総額
let bankText; // 預金のメッセージオブジェクトを保存する
let weatText; //天気予報のメッセージオブジェクトを保存する
let gameText; // ゲームディスプレイのメッセージオブジェクトを保存する
let noticeText; //お知らせのメッセージオブジェクトを保存する
let zemiText; // ゼミ開始のメッセージオブジェクトを保存する
let orderText; //ゼミ発表順のメッセージオブジェクトを保存する
let zemiMax = 0; //ゼミに参加した最大数を保存する
let zemiID = 0; // 発表順の番号
let zemiMode = 0; //ゼミをやったかどうか
let addName = [""]; // 積み残しの人をぶち込むリスト
let preAddName = [""]; //前回の積み残しの人をぶち込むリスト
let attendList = []; //ゼミに参加した人のリスト
let handList = []; // ゼミで挙手している人のリスト
let startTimeStamp; //ゼミ開始時の時間を保存
let anonyId = 0; // 匿名掲示板の番号
let ranking = []; // ゲームチャンネルのランキング
load(); // データをロードする

// サーバーを作成する
http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          res.end("No post data");
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//コンストラクタ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("ready", message => {
  console.log("Ready!");
  changeState("！を文頭に付けて読み上げ");
  //ゲームチャンネルのテキストを読み込み、説明とディスプレイとランキング以外を削除
  client.channels.cache
    .get(GAME_CHANNEL)
    .messages.fetch({ after: "0", limit: 5 })
    .then(messages =>
      messages.forEach(m => {
        if (m.id != INST_TEXT && m.id != RANK_TEXT && m.id != DISP_TEXT)
          m.delete();
        else if (m.id == DISP_TEXT) {
          for (let i = 0; i < gameIcon.length; i++) {
            m.react(gameIcon[i]);
          }
          gameText = m;
        }
      })
    );
  //share販売チャンネルを読み込み、預金と説明以外のメッセージを削除する
  client.channels.cache
    .get(SHARE_CHANNEL)
    .messages.fetch({ after: "0", limit: 3 })
    .then(messages => {
      messages.forEach(m => {
        if (m.id != BANK_TEXT && m.id != BINS_TEXT) m.delete();
        else bankText = m;
        loadBank(); //預金データをロードする
      });
    });
  //SEリアクションの付与
  client.channels.cache
    .get(CHAT_CHANNEL)
    .messages.fetch({ after: "0", limit: 1 })
    .then(messages => {
      messages.forEach(m => {
        if (m.id == SE_TEXT) {
          for (let i = 1; i < SE.length; i++) {
            m.react(SE[i].icon);
          }
        }
      });
    });
  //天気予報チャンネル
  client.channels.cache
    .get(WEATHER_CHANNEL)
    .messages.fetch({ after: "0", limit: 2 })
    .then(messages => {
      messages.forEach(m => {
        if (m.id == WEAT_TEXT) {
          weatText = m;
        }
      });
    });
  //お知らせチャンネル
  client.channels.cache
    .get(NOTICE_CHANNEL)
    .messages.fetch({ limit: 10 })
    .then(messages => {
      messages.forEach(m => {
        if (m.author.id == client.user.id) {
          if (noticeText === undefined && m.content.match(/^今日は.+です。/)) {
            noticeText = m;
            noticeText.react("✋");
            noticeText.react("✊");
            noticeText.react("<:nyanz:762647337461874709>");
          }
          if (orderText === undefined && m.content.match(/日後`：/)) {
            orderText = m;
          }
        }
      });
    });
  setTimeout(() => {
    display(H, W, field, "");
    weather();
  }, 1000);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//定期実行
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 定時お知らせ　"秒　分　時間　日　月　曜日"を表す　*で毎回行う 0 21 * * * で毎朝6時に実行 時差9時間
cron.schedule("30 30 21 * * *", () => {
  // お知らせのメッセージを削除
  client.channels.cache
    .get(NOTICE_CHANNEL)
    .messages.fetch({ limit: 100 })
    .then(messages => {
      messages.forEach(m => {
        if (m.author.id == client.user.id) {
          if (m.content.match(/^今日は.+です。|日後/)) {
            m.delete();
          }
        }
      });
    });
  // 通話チャットのメッセージを削除
  client.channels.cache
    .get(CHAT_CHANNEL)
    .messages.fetch({ limit: 100 })
    .then(messages => {
      messages.forEach(m => {
        if (!m.content.match(/#|＃/)) {
          m.delete();
        }
      });
    });
  notice(NOTICE_CHANNEL); // 毎朝のお知らせの送信
  orderText = client.channels.cache.get(NOTICE_CHANNEL).send(returnOrder()); //発表順の送信
  zemiMode = 0; // ゼミモードリセット
  attendList = []; // 参加者リストリセット
  save(); // セーブ
});
// 毎分実行
cron.schedule("0 * * * * *", () => {
  // ゼミの時間をカウントして更新する
  if (zemiMode == 1) {
    if (zemiText !== undefined) {
      const timeStamp = Date.now();
      const time = Math.floor((timeStamp - startTimeStamp) / 1000 / 60) + "分";
      zemiText.edit(zemiText.content.replace(/時間　：.*/, "時間　：" + time));
    }
  }
});
// 毎時実行
cron.schedule("0 * * * *", () => {
  displayBank("いらっしゃいませ！"); // お店表示リセット
  weather(); // 天気予報取得
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ボイスチャンネル更新時の処理
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ボイスチャンネルが更新されたとき、参加者の人数によってBOTが接続したり切断したりする処理
client.on("voiceStateUpdate", (oldMember, newMember) => {
  const conn = client.voice.connections.get(GUILD_ID);
  // 誰かがボイスチャンネルに接続したらbotもそのチャンネルに接続する
  if (newMember.channel !== null && newMember.id != client.user.id) {
    newMember.channel.join();
    console.log("接続　：　" + newMember.channel.name);
  } else if (conn && conn.channel && conn.channel.members.array().length < 2) {
    // ボイスチャンネルにbotしかいなくなった場合に切断する
    if (zemiMode == 1) {
      if (zemiText !== undefined) {
        const endTimeStamp = Date.now();
        const time =
          Math.floor((endTimeStamp - startTimeStamp) / 1000 / 60) + "分";
        let text = zemiText.content.replace(/時間　：.*/, "時間　：" + time); // 時間を確定
        text = text.replace(/\n司会　：.*/, ""); // 司会メッセージを削除
        text = text.replace(/\n挙手　：.*/, ""); // 挙手メッセージを削除
        zemiText.edit(text); // メッセージを編集
        zemiText.reactions.removeAll(); // リアクションを削除
        handList = []; //挙手リストをリフレッシュ
      }
      zemiMode = 2;
    }
    console.log("切断　：　" + conn.channel.name);
    disconnect();
  }
  // 参加者を記録する
  if (zemiMode == 1 && zemiText !== undefined && newMember !== null) {
    if (newMember.channel !== null) {
      const attendee = member.find(v => v.id == newMember.id);
      if (attendee !== undefined) {
        if (
          attendList.indexOf(attendee.name) == -1 &&
          attendee.grade != -1 &&
          attendee.grade != 9
        ) {
          attendList.push(attendee.name);
          zemiText.edit(
            zemiText.content.replace(
              /参加者：.*/,
              "参加者：" + attendList.join("、")
            )
          );
        }
      }
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//メッセージ処理
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ユーザがメッセージを投稿するとここが呼ばれる
client.on("message", message => {
  // 自分のコメントや他のbotに反応して無限ループしないようにする
  if (message.author.id == client.user.id || message.author.bot) return;
  // DMを匿名掲示板に投稿する
  if (message.channel.type === "dm") {
    sendAnony(message);
    return;
  }
  // ゲームチャンネルの処理
  if (message.channel.id == GAME_CHANNEL) {
    game(message);
    return;
  }
  // 匿名チャンネルの処理
  if (message.channel.id == ANONY_CHANNEL) {
    anony(message);
    return;
  }
  // share販売チャンネルの処理
  if (message.channel.id == SHARE_CHANNEL) {
    share(message);
    return;
  }
  //特定のチャンネルにメッセージが送信された場合、効果音を再生する
  if (message.channel.id==LIVING_CHANNEL||message.channel.id===CHAT_CHANNEL) {
    playSE(1);
  }
  // 資料チャンネルの処理
  if (message.channel.id == DOCUMENT_CHANNEL) {
    return;
  }
  // 特定のメッセージが含まれる文章は処理しない
  if (message.content.match(/http/)) return;
  // 各種反応
  react(message);
  // ゼミ順を前に移動する @back
  back(message);
  // ゼミ順を後に移動する @for
  forward(message);
  // 発表順の確認をする @next
  next(message);
  // ゼミ順に積み残しの人を追加する @add
  add(message);
  // ゼミ順の積み残しの人を削除する @take
  take(message);
  // 発言者のいるボイスチャンネルに接続する @join
  join(message);
  // ボイスチャンネルから切断する @leave
  leave(message);
  // 読み上げに教育する @teach
  teachVoice(message);
  // 教育を削除する @clear
  clearVoice(message);
  // カスタムお知らせを追加する @set
  setNoticeList(message);
  // 文章の文字数をカウントする @len
  len(message);
  // メンバーをランダムで選択する @sel
  sel(message);
  // デバッグ用 @db
  debug(message);
  // デバッグ用!zemi
  debug2(message);
  if (
    message.channel.id === CHAT_CHANNEL ||
    message.channel.id === BOT_CHANNEL
  ) {
    if (!message.content.match(/^!|^！/)) {
      return;
    }
    // ボイスチャンネルに接続しているとき、入力されたメッセージを流す voiceTable[message.member.id%voiceTable.length] 'hikari', 'haruka', 'takeru', 'santa', 'bear', 'show'
    if (client.voice.connections.get(GUILD_ID) !== undefined) {
      sayQueue.push(message);
      say();
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//リアクション処理
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("messageReactionAdd", (reaction, user) => {
  // share販売へリアクションが行われたとき
  if (reaction.message.id == BANK_TEXT) {
    const userInfo = member.find(v => v.id === user.id); // リアクションを付けたユーザー情報を検索する
    // shareの利用権限がない人の場合、リアクションを削除して処理終了
    if (userInfo === undefined) {
      reaction.users.remove(user);
      return;
    }
    if (userInfo.grade != -1) {
      // ユーザー情報に登録されていて、かつshare販売の利用権限がある人の場合の処理
      const emojiID = numIcon.indexOf(reaction.emoji.name);
      if (product.length >= emojiID + 1) {
        // 商品数以下の数字を指定されたときのみ処理
        opeBank(userInfo, -1 * product[emojiID].price, 1);
      }
      reaction.users.remove(user);
    }
  }
  // 効果音テキストにリアクションが行われたとき
  if (reaction.message.id == SE_TEXT && user.id != client.user.id) {
    if (!sayFlag) {
      const sound = SE.find(v => v.icon.match(reaction.emoji.name));
      if (sound !== undefined) {
        const voiceC = client.voice.connections.get(GUILD_ID);
        if (voiceC !== undefined) voiceC.play(sound.URL);
      }
    }
    reaction.users.remove(user);
  }
  // お知らせテキストにリアクションが行われたとき
  if (user.id != client.user.id) {
    if (reaction.message.id == noticeText.id) {
      if (reaction.emoji.name === "✋") {
        const Member = member.find(v => v.id === user.id);
        addAddName(Member.name); // 自分を発表者に追加
        save();
      } else if (reaction.emoji.name === "✊") {
        const Member = member.find(v => v.id === user.id);
        const ID = addName.indexOf(Member.name);
        if (ID != -1) {
          addName.splice(ID, 1);
          save();
        }
      } else if (reaction.emoji.name.match("nyanz")) {
        if (zemiMode == 0) {
          zemi(NOTICE_CHANNEL);
          noticeText.edit(
            noticeText.content.replace(
              /ゼミは.+。\n発表者は.+です。/,
              "次回の発表者は**" +
                combiName(getLastNamesFromID(zemiID), addName) +
                "**です。"
            )
          );
        }
      }
      // お知らせテキストの編集
      if (reaction.emoji.name === "✋" || reaction.emoji.name === "✊") {
        if (zemiMode > 0) {
          //お知らせテキストの編集
          noticeText.edit(
            noticeText.content.replace(
              /(次回の)?発表者.+です。/,
              "次回の発表者は**" +
                combiName(getLastNamesFromID(zemiID), addName) +
                "**です。"
            )
          );
        } else {
          let nameList = combiName(getLastNamesFromID(zemiID), addName);
          //お知らせテキストの編集
          noticeText.edit(
            noticeText.content.replace(
              /発表者は.+です。/,
              "発表者は**" + nameList + "**です。"
            )
          );
          //発表者順テキストの編集
          orderText.edit(orderText.content.replace(/：.+/, "：" + nameList));
        }
        reaction.users.remove(user);
      }
    } else if (zemiText !== undefined) {
      if (reaction.message.id == zemiText.id) {
        const Member = member.find(v => v.id === user.id); // ユーザーを取得
        const index = handList.indexOf(Member.name); // ユーザーのリストの位置
        if (reaction.emoji.name === "✋") {
          if (index === -1) {
            //リストにいないとき
            handList.push(Member.name);
            playSE(0);
          }
        } else if (reaction.emoji.name === "✊") {
          if (index !== -1) {
            //リストにいるとき
            handList.splice(index, 1);
          }
        }
        zemiText.edit(
          zemiText.content.replace(
            /挙手　：.*/,
            "挙手　：" + handList.join("、")
          )
        );
        reaction.users.remove(user);
      }
    }
  }
});

// トークンが設定されていない場合　.envにてDISCORD_BOT_TOKENを設定しておく必要あり
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN); // ログインする
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                Main Function                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 定時連絡のテキストを生成する関数
async function notice(channel) {
  const today = getTime(0); // 西暦(0),月(1),日(2),曜日(3),時間(4),分(5),和暦(6)の順の配列を返す
  let nextZemiInfoID = getNextZemiInfoID(today[3]); // 次のゼミのID
  let text = "";
  //誕生日の人を教える
  const birth = birthday.filter(v => v.m == today[1] && v.d == today[2]);
  text += "\n今日は" + formatTime([today[1], today[2], today[3]]) + "です。\n";
  if (birth.length > 0) {
    let btext = "@everyone\n今日は";
    for (let i = 0; i < birth.length; i++) {
      btext += birth[i].name + "の誕生日。おめでとう！:tada:\n";
    }
    const bmsg = await client.channels.cache.get(channel).send(btext);
    bmsg.react("🎉");
  }
  let holidayName = judgeHoliday(today[1], today[2]);
  //ゼミがある日の処理
  if (
    zemiInfo.find(v => v.week === today[3]) !== undefined &&
    holidayName === "none"
  ) {
    if (zemiInfo.length > 0) {
      text +=
        "ゼミは本日" +
        zemiInfo[nextZemiInfoID].time +
        "から。\n発表者は" +
        returnMention(getLastNamesFromID(zemiID).concat(addName)) +
        "です。\n";
    } else {
      text += "ゼミはしばらくおやすみです。\n";
    }
  } else {
    //ゼミがあるが祝日の場合の処理
    if (
      zemiInfo.find(v => v.week === today[3]) !== undefined &&
      holidayName !== "none"
    ) {
      text += "**今日のゼミはお休み。**\n";
      nextZemiInfoID = getNextZemiInfoID(today[3] + 1);
    }
    // ゼミが無い日の処理
    if (zemiInfo.length > 0) {
      let nextZemiWeek = zemiInfo[nextZemiInfoID].week; //次のゼミの曜日
      let diff = diffWeek(today[3], nextZemiWeek); //今日から次のゼミまでの日数
      let nextZemiDay = getTime(diff * 24); //次のゼミの日
      holidayName = judgeHoliday(nextZemiDay[1], nextZemiDay[2]); //次のゼミの日が祝日かどうか判定
      // 次のゼミの日が祝日だった場合の処理
      if (holidayName !== "none") {
        nextZemiWeek = zemiInfo[getNextZemiInfoID(nextZemiDay[3] + 1)].week; //次のゼミの曜日
        diff = diffWeek(today[3], nextZemiWeek); //今日から次のゼミまでの日数
        nextZemiDay = getTime(diff * 24); //次のゼミの日
      }
      text +=
        "ゼミは" +
        formatTime([nextZemiDay[1], nextZemiDay[2], nextZemiDay[3]]) +
        "の" +
        zemiInfo[nextZemiInfoID].time +
        "から。\n発表者は**" +
        combiName(getLastNamesFromID(zemiID), addName) +
        "**です。\n"; // ゼミが無い日
    } else {
      text += "ゼミはしばらくおやすみです。\n";
    }
  }
  // 期限の追加
  for (let i = 0; i < deadline.length; i++) {
    // 期限が設定されていたら
    if (deadline[i].month != 0 || deadline[i].day != 0) {
      const remain = remainingDays(
        today[1],
        today[2],
        deadline[i].month,
        deadline[i].day
      );
      // 残り日数が30日を切ったら明示
      if (remain < 30) {
        text +=
          ":stopwatch: " +
          deadline[i].name +
          "(" +
          formatTime([deadline[i].month, deadline[i].day]) +
          ")まで**残り`" +
          makeEmpty(remain, 2, -1) +
          "日`**\n";
      }
    }
  }
  if (today[3] == 4 && today[2] <= 6) text += ":bell:明日は段ボール回収の日\n"; // 第一木曜日
  if (today[3] == 5 && today[2] <= 7) text += ":bell:段ボール回収の日\n"; // 第一金曜日
  holidayName = judgeHoliday(today[1], today[2]);
  if (holidayName !== "none") text += ":calendar_spiral:" + holidayName;
  // みんなのお知らせ
  if (noticeList.length > 0) {
    text += "\n";
    for (var i = 0; i < noticeList.length; i += 2) {
      text += ":clipboard:" + noticeList[i] + "\n";
      noticeList[i + 1] = Number(noticeList[i + 1]) - 1;
    }
  }
  judgeNoticeList(); // 期限が切れたお知らせを削除する
  save();
  const msg = await client.channels.cache.get(channel).send(text);
  msg.react("✋");
  msg.react("✊");
  msg.react("<:nyanz:762647337461874709>");
  if (channel == NOTICE_CHANNEL) {
    noticeText = msg;
  }
}
// メッセージに対する反応を行う
function react(message) {
  if (
    message.channel.id != NOTICE_CHANNEL &&
    message.channel.id != TEACHER_CHANNEL
  ) {
    const REACTION = "762647337461874709"; // ニャンちゅうスタンプID
    if (message.content.match(/にゃん|ニャン|ちゅう|チュウ/)) {
      sendMsg(
        message.channel.id,
        " " + res[Math.round(Math.random() * (res.length - 1))]
      );
      message.react(REACTION);
      return;
    }
    if (message.content.match(/ありが|あざ|サン|さんきゅ|さんくす/)) {
      sendMsg(
        message.channel.id,
        " " + thanks[Math.round(Math.random() * (thanks.length - 1))]
      );
      message.react(REACTION);
      return;
    }
    if (message.content.match(/すみません|ごめん|すまん|申し訳/)) {
      sendMsg(
        message.channel.id,
        " " + apo[Math.round(Math.random() * (apo.length - 1))]
      );
      message.react(REACTION);
      return;
    }
    if (message.content.match(/うるさい|だま|黙|しずかに|静かに|やっぱり/)) {
      sendMsg(message.channel.id, "ぃや″っぱりぃ″！？");
      message.react(REACTION);
      return;
    }
    if (message.content.match(/なんで|どうして/)) {
      sendMsg(message.channel.id, "にゃ″んでぇ！？にゃ″～んでぇ！？");
      message.react(REACTION);
      return;
    }
    if (
      message.content.match(
        /すご|やば|素晴し|すばらし|すげ|やべ|凄|いいね|やる|流石/
      )
    ) {
      sendMsg(
        message.channel.id,
        "こぉ″れを芸術と呼ばずしてにゃ″んと申しましょうか～！"
      );
      message.react(REACTION);
      return;
    }
    if (message.content.match(/正解|違|合って|どうですか|ちが|その通り/)) {
      sendMsg(message.channel.id, "ちっがぁいあ″りませ～ん″！");
      message.react(REACTION);
      return;
    }
  }
}
// ゼミ開始の処理
function zemi(channel) {
  if (zemiMode == 0) {
    const now = getTime(0);
    const time = formatTime([now[1], now[2], now[3]]);
    const conn = client.voice.connections.get(GUILD_ID);
    startTimeStamp = Date.now();
    if (conn !== undefined) {
      const vc = client.channels.cache.get(conn.channel.id).members.array();
      for (let i = 0; i < vc.length; i++) {
        const mb = member.find(v => v.id == vc[i].user.id);
        if (mb !== undefined) {
          if (mb.grade != -1 && mb.grade != 9) attendList.push(mb.name);
        }
      }
    }
    let text =
      time +
      "<@&765858073608060929>\n**発表者：" +
      combiName(getLastNamesFromID(zemiID), addName) +
      "**\n司会　：" +
      returnName(getLastNamesFromID((zemiID + 2) % zOrderNum)) +
      "\n挙手　：" +
      "\n時間　：0分" +
      "\n参加者：" +
      attendList.join("、");
    speak(
      "発表者、" +
        combiName(getLastNamesFromID(zemiID), addName) +
        "、" +
        "司会、" +
        returnName(getLastNamesFromID((zemiID + 2) % zOrderNum)),
      "takeru"
    );
    if (channel == BOT_CHANNEL) {
      text.replace("@", "");
      sendMsg(BOT_CHANNEL, text);
    } else {
      client.channels.cache
        .get(NOTICE_CHANNEL)
        .send(text)
        .then(m => {
          zemiText = m;
          m.react("✋");
          m.react("✊");
        });
      opeZemi(1);
      preAddName = addName.slice();
      clearAddName();
    }
    zemiMode = 1;
    save();
    return;
  }
}
// ゼミ順を前に移動する for
function back(message) {
  if (message.content.match(/^back$/)) {
    opeZemi(-1);
    save();
    sendMsg(message.channel.id, returnOrder());
    message.delete({ timeout: DELAY });
    return;
  }
}
// ゼミ順を後ろに移動する back
function forward(message) {
  if (message.content.match(/^for$/)) {
    opeZemi(1);
    save();
    sendMsg(message.channel.id, returnOrder());
    message.delete({ timeout: DELAY });
    return;
  }
}
// ゼミ順を確認する next
function next(message) {
  if (message.content.match(/^next$/)) {
    let text = returnOrder();
    sendMsg(message.channel.id, text);
    message.delete({ timeout: DELAY });
    return;
  }
}
// 積み残しの人を追加する add
function add(message) {
  if (message.content.match(/^add/)) {
    const str = splitSpace(message.content); //命令を分けて配列に入れる
    //名前を指定してリストに追加する場合
    if (str.length > 1) {
      for (let i = 1; i < str.length; i++) {
        addAddName(str[i]);
      }
    } else {
      //自分を追加する場合
      const msgMember = member.find(v => v.id === message.member.id);
      addAddName(msgMember.name);
    }
    save();
    sendMsg(
      message.channel.id,
      "次のゼミ発表者：" + combiName(getLastNamesFromID(zemiID), addName)
    );
    message.delete({ timeout: DELAY });
    return;
  }
}
// 積み残しリストを削除する take
function take(message) {
  if (message.content.match(/^take$/)) {
    clearAddName();
    let text = "積み残しリストを削除しました。";
    save();
    sendMsg(message.channel.id, text);
    message.delete({ timeout: DELAY });
    return;
  }
}
// メッセージを送った人のいるボイスチャンネルに接続する join
function join(message) {
  if (message.content.match(/^join$/)) {
    let ch = message.member.voice.channel;
    if (ch == null)
      sendMsg(
        message.channel.id,
        "ボイスチャンネルに入室してからjoinと命令してください。"
      );
    else message.member.voice.channel.join();
    console.log(ch + "に接続");
    message.delete({ timeout: DELAY });
    return;
  }
}
// ボイスチャンネルから切断する leave
function leave(message) {
  if (message.content.match(/^leave$/)) {
    if (client.voice.connections.get(GUILD_ID) == null)
      sendMsg(message.channel.id, "botがボイスチャンネルに入室していません。");
    else disconnect();
    console.log("ボイスチャンネルから退出");
    message.delete({ timeout: DELAY });
    return;
  }
}
// 読み上げに教育する teach
function teachVoice(message) {
  if (message.content.match(/^teach/)) {
    const str = splitSpace(message.content);
    if (str.length == 3) {
      teach.push(str[1]);
      teach.push(str[2]);
      sendMsg(message.channel.id, teachText());
      save();
    } else {
      sendMsg(
        message.channel.id,
        "「teach 読み方を変更する文字列 読み方」のように入力してください。"
      );
    }
    message.delete({ timeout: DELAY });
    return;
  }
}
// 教育を削除する clear
function clearVoice(message) {
  if (message.content.match(/^clear/)) {
    const str = splitSpace(message.content);
    if (str.length == 2) {
      var loop = teach.length;
      for (var i = 0; i < loop; i += 2) {
        if (teach[i] === str[1]) teach.splice(i, 2);
      }
      sendMsg(message.channel.id, teachText());
      save();
    } else {
      sendMsg(
        message.channel.id,
        "「clear 削除したい文字列」のように入力してください。"
      );
    }
    message.delete({ timeout: DELAY });
    return;
  }
}
// カスタムお知らせを追加する　set
function setNoticeList(message) {
  if (message.content.match(/^set/)) {
    const str = splitSpace(message.content.replace(/,|\n/g, ""));
    if (str.length == 3 && !isNaN(str[2])) {
      noticeList.push(str[1]);
      noticeList.push(Number(str[2]));
      sendMsg(
        message.channel.id,
        "「" +
          str[1] +
          "」を毎朝のお知らせに追加しました。\n残り" +
          str[2] +
          "日間表示されます。"
      );
    } else if (str.length == 4 && !isNaN(str[2]) && !isNaN(str[3])) {
      const time = getTime(0);
      const remain = remainingDays(time[1], time[2], str[2], str[3]);
      let text = str[1];
      noticeList.push(text);
      noticeList.push(remain);
      sendMsg(
        message.channel.id,
        "「" +
          text +
          "」を毎朝のお知らせに追加しました。\n残り" +
          remain +
          "日間表示されます。"
      );
      save();
    } else {
      sendMsg(
        message.channel.id,
        "「set 文章 日数」or「set 文章 月 日」のように入力してください。"
      );
    }
    message.delete({ timeout: DELAY });
    return;
  }
}
// 文字数を計測する len
function len(message) {
  if (message.content.match(/^len/)) {
    let str = message.content.split(" ");
    let sum = str.length - 2;
    let space = 0;
    let line = 0;
    for (let i = 1; i < str.length; i++) {
      sum += str[i].length;
      space += (str[i].match(/　/g) || []).length;
      line += (str[i].match(/\n/g) || []).length;
    }
    let text =
      "文字数(全角スペース込み)：" +
      (sum - line) +
      "文字\n文字数(全角スペース抜き)：" +
      (sum - line - space - str.length + 2) +
      "文字\n行数：" +
      (line + 1) +
      "行";
    sendMsg(message.channel.id, text);
    message.delete({ timeout: DELAY });
    return;
  }
}
// ランダムセレクト sel
function sel(message) {
  if (message.content.match(/^sel/)) {
    const str = splitSpace(message.content);
    let sN = Number(str[1]);
    if (str[1] == null) sN = 1;
    const list = member.filter(v => v.zOrder !== -1); // メンバーリストを複製する
    const loop = list.length - sN; // リストの長さ-指定回数分メンバーリストからランダムに削除する
    for (let i = 0; i < loop; i++) {
      list.splice(parseInt(Math.random() * list.length), 1);
    }
    const memberList = [];
    for (let i = 0; i < list.length; i++) {
      memberList.push(list[i].name);
    }
    sendMsg(
      message.channel.id,
      "選ばれたのは" + returnName(memberList) + "でした。"
    );
    speak(
      returnName(memberList),
      voiceTable[Math.floor(Math.random() * voiceTable.length)]
    );
    message.delete({ timeout: DELAY });
    return;
  }
}
//天気予報表示
function weather() {
  weatherForecast().then(res => {
    weatText.edit(res[1] + res[0]);
  });
}
// デバッグ用 @db
function debug(message) {
  if (message.content.match(/^@db$/)) {
    notice(message.channel.id);
    message.delete({ timeout: DELAY });
  }
}
// デバッグ用
function debug2(message) {
  if (message.content.match(/^!z$/)) {
    zemiMode = 0;
    attendList = [];
    save();
    message.delete({ timeout: DELAY });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Function                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// リプを飛ばす
function sendReply(message, text) {
  message
    .reply(text)
    .then(console.log("リプライ送信"))
    .catch(console.error);
}
// 指定したチャンネルにメッセージを送る
function sendMsg(channelId, text, option = {}) {
  client.channels.cache
    .get(channelId)
    .send(text, option)
    .then(
      console.log(
        "メッセージ送信{\n" + text.length + text.substr(0, 50) + "\n}"
      )
    )
    .catch(console.error);
}
// BOTをボイスチャンネルから退出させる
function disconnect() {
  client.voice.connections.get(GUILD_ID).disconnect();
  sayFlag = false;
  sayQueue = [];
}
// 提示お知らせリストを条件を見て削除する
function judgeNoticeList() {
  let loop = noticeList.length;
  for (let i = 0; i < loop; i += 2) {
    if (noticeList[i + 1] <= 0) {
      noticeList.splice(i, 2);
      i -= 2;
    }
  }
}
// 通常の発表者と積み残しの発表者名を結合して返す
function combiName(zemi, add) {
  let text = returnName(zemi);
  if (add.length > 1) text += returnName(add);
  console.log(zemi);
  console.log(add);
  return text;
}
// 名前の配列を渡すと、テキストの形に連結してくれる
function returnName(name) {
  return name.join("、");
}

// 指定した発表者番号渡すと、発表者グループをメンションする文字列を返す
function returnMention(nameArray) {
  let text = "";
  for (let i = 0; i < nameArray.length; i++) {
    text += returnMentionText(nameArray[i]);
  }
  return text;
}
// 苗字を渡すと、その人をメンションする文字列を返す
function returnMentionText(name) {
  const memberInfo = member.find(v => v.name === name); //指定した苗字のメンバーの情報を取得する
  if (memberInfo !== undefined) return "<@" + memberInfo.id + ">"; //メンバーが存在する場合、メンションする文字列を返す
  return name; //メンバーが存在しない場合、メンションしない文字列を返す
}
//ゼミIDから発表者の苗字リストを作成する
function getLastNamesFromID(zemiID) {
  const memberInfos = member.filter(v => v.zOrder === zemiID); //指定したゼミIDの発表者を探して配列に追加する
  const names = [];
  for (let i = 0; i < memberInfos.length; i++) {
    names.push(memberInfos[i].name);
  }
  return names;
}

// ゼミ順を移動する
function opeZemi(num) {
  zemiID += num;
  if (zemiID < 0) zemiID = zOrderNum - 1;
  else if (zemiID > zOrderNum - 1) zemiID = 0;
}
// 一周期分のゼミ順を返す
function returnOrder() {
  const today = getTime(0); //今日の日付
  let tmpWeek = today[3];
  const dayList = []; //残り日数を格納する
  let sum = 0; // 合計日数
  let flag = false; //祝日に無限ループを回避するためのフラグ
  if (zemiInfo.length > 0) {
    for (let i = 0; i < zOrderNum; i++) {
      let nextZemi = zemiInfo[getNextZemiInfoID(tmpWeek)].week; //次のゼミの曜日
      let diff = diffWeek(
        nextZemi,
        zemiInfo[getNextZemiInfoID(nextZemi + 1)].week
      );
      if (i == 0 && !flag) {
        diff = diffWeek(today[3], nextZemi);
      }
      sum += diff;
      let next = getTime(sum * 24);
      // 祝日の処理
      const holidayName = judgeHoliday(next[1], next[2]);
      if (holidayName !== "none") {
        i--;
        tmpWeek = next[3];
        flag = true;
        continue;
      }
      tmpWeek = next[3];
      const remain = remainingDays(today[1], today[2], next[1], next[2]);
      if (remain == 0) dayList.push("`  今日`：");
      else if (remain == 1) dayList.push("`  明日`：");
      else dayList.push("`" + makeEmpty(remain, 2, -1) + "日後`：");
    }
    let text = dayList[0];
    text += "**" + combiName(getLastNamesFromID(zemiID), addName) + "**\n";
    for (var i = 1; i < zOrderNum; i++) {
      text +=
        dayList[i] +
        returnName(getLastNamesFromID((zemiID + i) % zOrderNum)) +
        "\n";
    }
    return text;
  } else {
    return "";
  }
}
// 積み残しリストに追加する
function addAddName(str) {
  let text = "";
  if (str !== "") {
    if (addName.indexOf(str) == -1) addName.push(str);
    text += str + " ";
  }
  return text;
}
// 積み残しリストを初期化する
function clearAddName() {
  addName = [""];
}
// botにボイスチャンネルで発言させる
function say() {
  if (sayQueue.length && !sayFlag) {
    // キューにメッセージがあり、BOTが発言中でない場合
    var msg = sayQueue.shift(); // メッセージをリストから取り出す
    var speaker = voiceTable[msg.member.id % voiceTable.length]; // 読み上げる声をIDから決定する
    var sayText = msg.content.substring(0, 50); // 読み上げる内容を決定する
    speak(sayText, speaker);
  }
}
// テキストとスピーカーを指定してボイスチャンネルで発言する
function speak(text, speaker) {
  for (var i = 0; i < teach.length; i += 2) {
    text = text.split(teach[i]).join(teach[i + 1]);
  }
  sayFlag = true;
  voicetext
    .fetchBuffer(text, {
      speaker: speaker,
      format: "ogg",
      speed: 140,
      volume: 50
    })
    .then(buffer => {
      writeFileSync("data/voice.ogg", buffer);
      if (client.voice.connections.get(GUILD_ID) !== undefined) {
        var dispatcher = client.voice.connections
          .get(GUILD_ID)
          .play("data/voice.ogg");
        dispatcher.once("finish", () => {
          sayFlag = false;
          say();
        });
      }
    });
}
// ファイルに書き込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function save() {
  let text;
  text = zemiMode + "," + zemiID + "," + anonyId + ",";
  if (addName.length == 1) text += "none\n";
  else text += addName.join(",") + "\n";
  if (teach.length == 0) text += "none\n";
  else text += teach.join(",") + "\n";
  if (noticeList.length == 0) text += "none\n";
  else text += noticeList.join(",") + "\n";
  text += ranking.join(",") + "\n";
  fs.writeFile("data/data.data", text, err => {
    if (err) throw err;
  });
}
// ファイルを読み込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function load() {
  fs.readFile("data/data.data", "utf-8", (err, data) => {
    if (err) throw err;
    let d = data.split("\n");
    let str = d[0].split(",");
    let td = d[1].split(",");
    let nd = d[2].split(",");
    let rd = d[3].split(",");
    zemiMode = Number(str[0]);
    zemiID = Number(str[1]);
    anonyId = str[2];
    if (str[3] !== "none") {
      for (var i = 1; i < str.length - 3; i++) {
        addName.push(str[i + 3]);
      }
    }
    if (td[0] !== "none") teach = td;
    if (nd[0] !== "none") noticeList = nd;
    ranking = rd;
  });
}

// 預金データを保存する
function saveBank() {
  let text = bankMoney + "\n";
  for (let i = 0; i < member.length; i++) {
    if (member[i].grade != -1) {
      text += member[i].id + "," + member[i].G + "," + member[i].name + "\n";
    }
  }
  fs.writeFile("data/bank.txt", text, err => {
    if (err) throw err;
  });
}
// 預金データを読み込む
function loadBank() {
  fs.readFile("data/bank.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let d = data.split("\n");
    bankMoney = Number(d[0]);
    for (let i = 1; i < d.length - 1; i++) {
      const nameMoney = d[i].split(",");
      const memberInfo = member.find(v => v.id == nameMoney[0]);
      if (memberInfo !== undefined) {
        memberInfo.G = Number(nameMoney[1]);
      }
    }
    displayBank("いらっしゃいませ！");
  });
}
// 預金ログを保存する
function addLog(str) {
  fs.readFile("data/log.txt", "utf-8", (err, data) => {
    const time = getTime(0);
    data +=
      time[0] +
      "/" +
      makeZero(time[1], 2) +
      "/" +
      makeZero(time[2], 2) +
      "-" +
      makeZero(time[4], 2) +
      "時" +
      makeZero(time[5], 2) +
      "分：" +
      str +
      "\n";
    fs.writeFile("data/log.txt", data, err => {
      if (err) throw err;
    });
  });
}
// 預金データ表示を更新する
function displayBank(str) {
  let text = "share総額：`" + makeEmpty(bankMoney, 6, -1) + "円`\n";
  const bankText = client.channels.cache
    .get(SHARE_CHANNEL)
    .messages.cache.get(BANK_TEXT);
  const icons = [
    { grade: 9, icon: ":purple_circle:`" },
    { grade: 2, icon: ":green_circle:`" },
    { grade: 1, icon: ":blue_circle:`" },
    { grade: 4, icon: ":orange_circle:`" },
    { grade: 3, icon: ":yellow_circle:`" }
  ];
  let preGrade = 9;
  let sum = 0;
  for (let i = 0; i < member.length; i++) {
    if (member[i].grade != -1) {
      if (preGrade != member[i].grade) {
        if (sum % 2 == 1) text += "\n";
        sum = 0;
      }
      if (sum % 2 == 1) text += "　";
      text += icons.find(v => v.grade == member[i].grade).icon;
      text +=
        makeEmpty(member[i].name.substring(0, 2), 2, 1) +
        "|" +
        makeEmpty(member[i].G + "円", 6, -1) +
        "`";
      preGrade = member[i].grade;
      if (sum % 2 == 1) text += "\n";
      sum++;
    }
  }
  text += "\n> " + str + "\n";
  for (let i = 0; i < product.length; i++) {
    text +=
      numIcon[i] +
      "`" +
      makeEmpty(product[i].name, 7, 1) +
      " | " +
      makeEmpty(product[i].price + "円", 4, -1) +
      "`\n";
    bankText.react(numIcon[i]);
  }
  bankText.edit(text); // ディスプレイ更新
}
// ステータスをランダムに変更する
function changeState(str) {
  client.user.setPresence({
    activity: { name: str, type: "PLAYING" }
  });
}
// テキストを指定した文字列で囲んだものを生成する
function makeSurText(str, kind) {
  var text = "";
  for (var i = 0; i < str.length + 2; i++) text += kind;
  text += "\n" + kind + str + kind + "\n";
  for (var i = 0; i < str.length + 2; i++) text += kind;
  return text;
}
// 指定した文字列に結合したときに指定した文字数になるように空白をつけて返す
function makeEmpty(str, n, mode) {
  str = str + "";
  const loop = n - str.length;
  for (var i = 0; i < loop; i++) {
    if (mode == 0) str += " ";
    else if (mode == -1) str = " " + str;
    else if (mode == 1) str += "　";
    else if (mode == 2) str = "　" + str;
  }
  return str;
}
// 指定した数値に指定した文字数になるように0を付けて返す
function makeZero(str, n) {
  str = str + "";
  const loop = n - str.length;
  for (let i = 0; i < loop; i++) {
    str = "0" + str;
  }
  return str;
}
// 全角スペースと半角スペースの区別なしに文字列を分割する
function splitSpace(str) {
  return str.replace(/　/g, " ").split(" ");
}
// 西暦,月,日,曜日,時間,分,和歴を日本時間になおして返す
function getTime(compensate) {
  const now = getTimeObj(compensate);
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let todayWeek = now.getDay();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let era = year - 2018;
  let output = [year, month + 1, day, todayWeek, hour, minutes, era];
  return output;
}
//補正したDateオブジェクトを返す
function getTimeObj(compensate) {
  const now = new Date();
  now.setTime(now.getTime() + (9 + compensate) * 3600 * 1000); // 日本時間に補正
  return now;
}
// 指定した日にちが祝日であるかどうか判定する
function judgeHoliday(month, day) {
  for (let i = 0; i < holiday.length; i++) {
    if (holiday[i].month == month && holiday[i].day == day) {
      return holiday[i].name;
    }
  }
  return "none";
}
// 指定した日にち(month1,day1)から指定した日にち(month2,day2)までの残りの日数を返す
function remainingDays(month1, day1, month2, day2) {
  if (month1 == month2 && day1 <= day2) return day2 - day1;
  else {
    let thisMonthRemainingDays = monthDay[month1 - 1] - day1;
    let thatMonthRemainingDays = day2;
    let monthDifference = month2 - month1 - 1;
    if (monthDifference < 0) monthDifference += 12;
    let sumDays = 0;
    for (var i = 0; i < monthDifference; i++) {
      sumDays += monthDay[(month1 + i) % 12];
    }
    return thisMonthRemainingDays + thatMonthRemainingDays + sumDays;
  }
}
// 指定した曜日と指定した曜日の差を返す
function diffWeek(week1, week2) {
  let diff = 0;
  if (week1 <= week2) diff = Math.abs(week1 - week2);
  else diff = 6 - week1 + week2 + 1;
  return diff;
}
// 指定した曜日から、次のzemiInfoIDを探す
function getNextZemiInfoID(week) {
  let nextZemiInfoID = 0;
  // 次のゼミがzemiInfoの何番目に当たるか探る
  for (var i = 0; i < zemiInfo.length; i++) {
    if (week > zemiInfo[i].week) nextZemiInfoID = i + 1;
    if (nextZemiInfoID == zemiInfo.length) nextZemiInfoID = 0;
  }
  return nextZemiInfoID;
}
// 月日曜を整形して返す
function formatTime(array) {
  let text = "";
  if (array.length == 2)
    text +=
      "`" +
      makeEmpty(array[0], 2, -1) +
      "月" +
      makeEmpty(array[1], 2, -1) +
      "日`";
  else
    text +=
      "`" +
      makeEmpty(array[0], 2, -1) +
      "月" +
      makeEmpty(array[1], 2, -1) +
      "日(" +
      week[array[2]] +
      ")`";
  return text;
}
// 今日の天気予報の文字列をpromiseで返す
function weatherForecast() {
  var text1 = "\n**☆今日の岐阜市の天気予報☆**\n";
  var text2 = "\n**☆岐阜市の週間天気予報☆**\n";
  var req = unirest(
    "GET",
    "http://api.openweathermap.org/data/2.5/onecall?lat=35.4232&lon=136.7606&units=metric&lang=ja&appid=7f9fb408b66bcb820ef71aa80ab569cd"
  ); // 岐阜市の天気をもらってくる
  return new Promise((resolve, reject) => {
    req.end(function(res) {
      let hourName = [];
      for (let i = 0; i < 24; i++) {
        const now = getTime(i);
        if (now[4] >= 7 && now[4] <= 20) {
          text1 +=
            formatTime([now[1], now[2]]).slice(0, -1) +
            makeEmpty(now[4], 2, -1) +
            "時`" +
            "：" +
            returnWeatherIcon(res.body.hourly[i].weather[0].icon) +
            " " +
            makeEmpty(res.body.hourly[i].weather[0].description, 5, 1);
          text1 +=
            "`" +
            makeEmpty(Math.round(res.body.hourly[i].temp) + "℃", 3, -1) +
            "`\n";
        }
      }
      let time = getTime(0);
      let tw = time[3];
      for (var i = 0; i < 7; i++) {
        const today = getTime(i * 24);
        text2 += "**" + formatTime([today[1], today[2], today[3]]) + "**　";
        text2 += returnWeatherIcon(res.body.daily[i].weather[0].icon);
        text2 +=
          "　:red_square:`" +
          makeEmpty(Math.round(res.body.daily[i].temp.max), 2, -1) +
          "℃` :blue_square:`" +
          makeEmpty(Math.round(res.body.daily[i].temp.min), 2, -1) +
          "℃`\n";
      }
      var text = [text1, text2];
      return resolve(text);
    });
  });
}
// iconの値から天気の絵文字を返す
function returnWeatherIcon(iconName) {
  const iconStr = [
    ":sunny:",
    ":white_sun_small_cloud:",
    ":white_sun_cloud:",
    ":cloud:",
    ":cloud_rain:",
    ":umbrella:",
    ":thunder_cloud_rain:",
    ":snowflake:",
    ":fog:",
    ":boom:"
  ];
  const iconID = ["01", "02", "03", "04", "09", "10", "11", "13", "50"];
  for (var i = 0; i < iconID.length; i++) {
    if (iconName.match(iconID[i])) return iconStr[i];
  }
  return iconStr[9];
}
// 教育文字一覧のテキストを返す
function teachText() {
  let text = "";
  for (var i = 0; i < teach.length; i += 2) {
    text += teach[i] + "　:arrow_forward:　" + teach[i + 1];
    if (i != teach.length - 2) text += "\n";
  }
  return text;
}

//指定した効果音を鳴らす
function playSE(mode) {
  const voiceC = client.voice.connections.get(GUILD_ID); //接続ボイスチャンネルを取得
  let index = mode;
  if (voiceC !== undefined) {
    voiceC.play(SE[index].URL);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Anony CHANNEL                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function anony(message) {
  if (message.channel.id == ANONY_CHANNEL) {
    if (message.author.id == client.user.id) return;
    sendAnony(message);
    message.delete();
  }
}

function sendAnony(message) {
  anonyId++;
  let text = "(" + anonyId + ")\n" + message.content;
  sendMsg(ANONY_CHANNEL, text);
  save();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Share CHANNEL                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function share(message) {
  if (message.channel.id == SHARE_CHANNEL) {
    const mb = member.find(v => v.id === message.member.id);
    if (mb === undefined) {
      message.delete();
      addLog("関係者以外のアクセスが検知されました。");
      return;
    }
    if (message.content.match(/^-?\d{1,}$/)) {
      opeBank(mb, Number(message.content), 0);
    } else if (message.content.match(/^share[　 ]-?\d{1,}$/)) {
      const data = splitSpace(message.content);
      opeBank(mb, Number(data[1]), 2);
    } else if (message.content.match(/^send[ 　]\d{1,}[ 　]/)) {
      const data = splitSpace(message.content);
      if (data.length == 3) {
        const recieve = member.find(v => v.name === data[2]);
        if (recieve === undefined) {
          message.delete();
          return;
        }
        opeBank(mb, Number(-data[1]), 0);
        opeBank(recieve, Number(data[1]), 0);
        const text =
          mb.name + "から" + recieve.name + "へ送金完了(" + data[1] + "円)";
        displayBank(text);
        addLog(text);
      }
    }
    message.delete();
  }
}

// メンバー情報とお金を入力として、その人の預金を操作する
function opeBank(member, money, mode) {
  const pG = member.G;
  const pM = bankMoney;
  const mN = member.name + "：";
  if (mode != 2) member.G += money;
  if (mode == 0) bankMoney += money;
  else if (mode == 2) {
    // share金額のみを操作する場合
    bankMoney += money;
    displayBank(mN + "share総額(" + money + "円)");
    addLog(
      mN + "SHARE " + money + "円を操作。" + pM + "円→" + bankMoney + "円"
    );
  }
  // 入金操作
  if (mode != 2) {
    if (money > 0) {
      displayBank(mN + money + "円を入金。");
      addLog(mN + money + "円を入金。" + pG + "円→" + member.G + "円");
    } else if (money < 0) {
      // 出金操作
      if (mode == 0) {
        displayBank(mN + money * -1 + "円を出金。");
        addLog(mN + money * -1 + "円を出金。" + pG + "円→" + member.G + "円");
      } else if (mode == 1) {
        // 支払い操作
        displayBank(mN + money * -1 + "円を支払いました。");
        addLog(mN + money * -1 + "円を出金。" + pG + "円→" + member.G + "円");
      }
    }
  }
  saveBank();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Game CHANNEL                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class State {
  constructor(y, x, st) {
    this.x = x;
    this.y = y;
    this.st = st;
  }
}

class Nyanchu {
  constructor(y, x) {
    this.x = x;
    this.y = y;
    this.hp = 3;
    this.turn = 0; // 経過ターン
    this.breakPoint = 0; // 壁を壊せる回数
    this.landmines = 0; // 地雷の個数
    this.stop = 0; // 時間を停止できる回数
    this.stopCnt = 0; // 時間が停止する残りターン数
    this.score = 0; // スコア
    this.clear = false; //クリア判定
  }
}

class Enemy {
  constructor(y, x) {
    this.x = x;
    this.y = y;
  }
  move(H, W, field, nyan) {
    var st = dijkstra(H, W, field, nyan.x, nyan.y, this.x, this.y);
    if (st !== null) {
      this.x = st.x;
      this.y = st.y;
    }
    if (field[this.y][this.x] == 9) {
      // 地雷の処理
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (!(this.y - 1 + i == 1 && this.x - 1 + j == 1))
            field[this.y - 1 + i][this.x - 1 + j] = 1;
        }
      }
      nyan.score += 500;
      flavorText = "やったー！敵を閉じ込めたにゃ″ん！";
    }
    if (field[this.y][this.x] == 11) {
      var xy = warp(this.x, this.y);
      this.x = xy[0];
      this.y = xy[1];
    }
    if (nyan.x == this.x && nyan.y == this.y) {
      gameOver = true;
      flavorText = "おばけにゃああ！！怖いにゃああ！！！";
    }
  }
}

class Bomb {
  constructor(y, x) {
    this.x = x;
    this.y = y;
  }
}
// 下、左、上、右
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
const H = 11;
const W = 11;
// フィールド生成
let field = new Array(H);
for (var i = 0; i < H; i++) {
  field[i] = new Array(W).fill(1);
}
let enemy = [];
let bomb = [];
let nyan = new Nyanchu(H - 2, W - 2);
let flavorText;
var gameOver = true;
const objectName = [
  "玉ねぎ",
  "土星",
  "たらい",
  "ゴマダレ",
  "画鋲",
  "つらら",
  "新幹線",
  "イガグリ",
  "海水",
  "ゴミ",
  "だるまさん",
  "おねぇ″さ″ん",
  "おじさん",
  "犯罪者",
  "ブラジル",
  "たまごかけご飯",
  "仮想空間",
  "ハヤシライス",
  "家族",
  "福沢諭吉",
  "３兆円",
  "岐阜大学",
  "女子高生",
  "女子アナ",
  "女子大生",
  "小学生",
  "ブラックホール",
  "タモリ",
  "お団子",
  "ハイエンドPC",
  "木島先生",
  "マッチョ",
  "シイタケ",
  "人工知能",
  "安西先生",
  "NHK",
  "もう一人のミー",
  "ピクミン",
  "地球の皆",
  "虚空",
  "ゴキブリ",
  "概念",
  "ミッ〇キー"
];
const objectMinusVerb = [
  "が降ってきた",
  "が目に入った",
  "とぶつかった",
  "に背後から襲われた",
  "に殴られた",
  "を踏み抜いた",
  "に突き刺さった",
  "で転んだ",
  "に激突した",
  "にビンタされた",
  "に潰された",
  "と核融合した",
  "に訴えられた"
];
const objectPlusVerb = [
  "に癒された",
  "を食べて元気が出た",
  "と出会ってうれしい",
  "と一緒に踊った",
  "が応援してくれた",
  "が励ましてくれた",
  "に囲まれて幸せ",
  "に抱きしめられた",
  "の一発ギャグが面白かった",
  "を手に入れてうれしい"
];
const commonText = [
  "おばけに地雷を当てると、にゃんと500スコア加算にゃ！！",
  "紫マスはワープが出来るにゃ！",
  "青マスはHPが回復するにゃ！",
  "赤マスはダメージを受けるから気を付けるにゃ！",
  "緑マスは良いことが起こるらしいにゃ！",
  "時間停止を使えば時を止められるにゃ！",
  "壁破壊で道を作るのも手にゃ。",
  "50ターンを過ぎると1ターンごとに20スコア減るにゃ！",
  "50ターンより早くゴールすると、ボーナススコア獲得にゃ！",
  "ゴールした時のHPの数でポイントも増えるにゃ！",
  "何もないにゃ。"
];
makeGame();

// ゲームを初期化する
function makeGame() {
  let fieldText = makeMaze(H, W);
  // フィールド生成
  field = new Array(H);
  for (var i = 0; i < H; i++) {
    field[i] = new Array(W).fill(1);
  }
  // フィールドテキストを参照、通路を判定し数値に変換する
  for (var i = 0; i < H; i++) {
    for (var j = 0; j < W; j++) {
      if (fieldText[i + 1][j + 1] === "　") field[i][j] = 0;
    }
  }
  field[H - 3][W - 2] = 0; //初期位置のとなりは通路
  field[H - 2][W - 3] = 0; //初期位置のとなりは通路
  situate(H, W, field, 0, 7, 1); // 壁をいくつか通路に変換する
  situate(H, W, field, 2, 10, 0); // ダメージポイントを生成
  situate(H, W, field, 3, 12, 0); // 回復ポイントを生成
  situate(H, W, field, 4, 6, 0); // 壁壊しポイントを生成
  situate(H, W, field, 5, 6, 0); // 地雷ポイントを生成
  situate(H, W, field, 12, 2, 0); // 停止ポイントを生成
  situate(H, W, field, 11, 2, 1); // ワープポイントを生成
  field[1][1] = 6; // ゴール
  enemy = [];
  bomb = [];
  nyan = new Nyanchu(H - 2, W - 2);
  flavorText = "黄色マスを目指してレッツスタートぉん″！";
  let enemyNum = 3;
  en: while (enemyNum) {
    let eX = Math.floor(Math.random() * (W - 1)) + 1;
    let eY = Math.floor(Math.random() * (H - 1)) + 1;
    if (eX >= W - 5 && eY >= H - 5) continue;
    for (var i = 0; i < enemy.length; i++) {
      if (enemy[i].x == eX && enemy[i].y == eY) continue en;
    }
    if (field[eY][eX] == 0) {
      enemy.push(new Enemy(eY, eX));
      enemyNum--;
    }
  }
  gameOver = false;
}
// 地雷を使用するときの処理
function playLandMine() {
  if (nyan.landmines == 0) {
    flavorText = "地雷を持ってないにゃん！";
  } else {
    flavorText = "地雷を設置したにゃん！";
    bomb.push(new Bomb(nyan.y, nyan.x));
    nyan.landmines--;
    field[nyan.y][nyan.x] = 9;
  }
}
// 時間停止を使用するときの処理
function playStopTime() {
  if (nyan.stop == 0) {
    flavorText = "時を止められないにゃん！";
  } else {
    nyan.stopCnt += 3;
    nyan.stop--;
    flavorText = nyan.stopCnt + "ターン時を止めるにゃ！";
  }
}
function displayDelete(message) {
  display(H, W, field, message.member.displayName); // フィールドをGAME_CHANNELに描画
  message.delete();
}

// ゲームの処理を行う
function game(message) {
  if (message.channel.id == GAME_CHANNEL) {
    if (message.author.id != client.user.id) {
      // 初期化
      if (gameOver) {
        makeGame();
      } else {
        // メインループ
        if (message.content.match(/w|か/)) moveNyan(nyan.y - 1, nyan.x);
        else if (message.content.match(/s|な/)) moveNyan(nyan.y + 1, nyan.x);
        else if (message.content.match(/d|は/)) moveNyan(nyan.y, nyan.x + 1);
        else if (message.content.match(/a|た/)) moveNyan(nyan.y, nyan.x - 1);
        else if (message.content.match(/r|わ/)) {
          makeGame();
          displayDelete(message);
          return;
        } else if (message.content.match(/q|あ/)) {
          playLandMine();
          displayDelete(message);
          return;
        } else if (message.content.match(/e|さ/)) {
          playStopTime();
          displayDelete(message);
          return;
        }
        processEvent(message.member.displayName);
      }
      displayDelete(message);
    }
  }
}

// 通路にイベントマスを置く
function situate(H, W, field, id, num, mode) {
  while (num) {
    var sx = Math.floor(Math.random() * (W - 2) + 1);
    var sy = Math.floor(Math.random() * (H - 2) + 1);
    if (
      field[sy][sx] == mode &&
      !(sy > H - 4 && sx > W - 4) &&
      !(sy == 1 && sx == 1)
    ) {
      field[sy][sx] = id;
      num--;
    }
  }
  return field;
}
// 迷路をテキストにして送信
function display(H, W, field, name) {
  const fieldIdToText = [
    ":white_large_square:",
    ":white_square_button:",
    ":red_square:",
    ":blue_square:",
    ":green_square:",
    ":green_square:",
    ":yellow_square:",
    "<:nyan:786216879663874109>",
    "<:obake:786217527675453460>",
    "<:bakudan:786221416261353482>",
    "<:death:767774739195494480>",
    ":purple_square:",
    ":green_square:"
  ];
  let text = "プレイヤー：";
  if (nyan.turn == 0 || nyan.clear || gameOver) {
    text += "no player\n";
  } else {
    text += name + "　" + nyan.turn + "ターン目\n";
  }
  for (var i = 1; i < H - 1; i++) {
    for (var j = 1; j < W - 1; j++) {
      let t = fieldIdToText[field[i][j]];
      for (var k = 0; k < enemy.length; k++) {
        // 敵の描画
        if (i == enemy[k].y && j == enemy[k].x) t = fieldIdToText[8];
      }
      if (i == nyan.y && j == nyan.x) {
        if (!gameOver || nyan.clear) t = fieldIdToText[7];
        //ニャンちゅう描画
        else t = fieldIdToText[10]; // ニャンちゅうの遺影
      }
      text += t;
    }
    text += "\n";
  }
  if (gameOver && !nyan.clear)
    text += ":red_square:　　GAME OVER　　:red_square:\n";
  if (nyan.clear) text += ":blue_square:　　GAME CLEAR　:blue_square:\n";
  text +=
    "HP：" +
    nyan.hp +
    "　破壊：" +
    nyan.breakPoint +
    "　地雷：" +
    nyan.landmines +
    "　停止：" +
    nyan.stop +
    "　スコア：" +
    nyan.score;
  text += "\n<:nyanz:762647337461874709>「" + flavorText + "」";
  gameText.edit(text + "\n\n\nボタンを押して操作");
}
// -1 動けない 0 動いた 1 壁を破壊した
function moveNyan(y, x) {
  if (y < 1 || y > H - 1 || x < 1 || x > W - 1) return -1;
  if (field[y][x] == 1) {
    if (nyan.breakPoint > 0) {
      nyan.x = x;
      nyan.y = y;
      nyan.breakPoint--;
      return 1;
    } else {
      return -1;
    }
  } else {
    nyan.x = x;
    nyan.y = y;
  }
  return 0;
}
// 止まったマス目のイベント処理を行う
function processEvent(name) {
  if (field[nyan.y][nyan.x] == 0) {
    flavorText = commonText[Math.floor(Math.random() * commonText.length)];
  } else if (field[nyan.y][nyan.x] == 1) {
    flavorText = "壁の中にいるにゃ。";
  } else if (field[nyan.y][nyan.x] == 2) {
    nyan.hp--;
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      objectMinusVerb[Math.floor(Math.random() * objectMinusVerb.length)] +
      "にゃ″ん！(1ダメージ)";
  } else if (field[nyan.y][nyan.x] == 3) {
    nyan.hp++;
    nyan.score += 50;
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      objectPlusVerb[Math.floor(Math.random() * objectPlusVerb.length)] +
      "にゃ″ん！(HP1回復)";
  } else if (field[nyan.y][nyan.x] == 4) {
    nyan.breakPoint++;
    nyan.score += 50;
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      "が壁を壊す力を授けてくれたにゃ″ん！(破壊+1)";
  } else if (field[nyan.y][nyan.x] == 5) {
    nyan.landmines++;
    nyan.score += 50;
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      "が地雷をくれたにゃ″ん！(地雷+1)";
  } else if (field[nyan.y][nyan.x] == 6) {
    gameOver = true;
    nyan.clear = true;
    flavorText = "迷路から脱出できたにゃ″ん！";
    nyan.score += nyan.hp * 50 + (50 - nyan.turn) * 20;
  } else if (field[nyan.y][nyan.x] == 9) {
    flavorText = "地雷が置いてあるにゃ″ん！";
    return;
  } else if (field[nyan.y][nyan.x] == 11) {
    flavorText = "ワープしたにゃ″ん！";
    var xy = warp(nyan.x, nyan.y);
    nyan.x = xy[0];
    nyan.y = xy[1];
  } else if (field[nyan.y][nyan.x] == 12) {
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      "が時を止める能力をくれたにゃん！";
    nyan.stop++;
    nyan.score += 50;
  }
  if (field[nyan.y][nyan.x] !== 11) field[nyan.y][nyan.x] = 0;
  if (nyan.hp <= 0 || (gameOver && !nyan.clear)) {
    gameOver = true;
    flavorText = "ニャンちゅうは死んだよ";
  }
  // ターン処理とお化けの移動
  if (nyan.stopCnt == 0) {
    nyan.turn++;
    if (field[nyan.y][nyan.x] != 9) {
      for (var i = 0; i < enemy.length; i++) {
        enemy[i].move(H, W, field, nyan);
      }
    }
  } else {
    nyan.stopCnt--;
    flavorText = "残り" + nyan.stopCnt + "ターン時を止めるにゃ！";
    if (nyan.stopCnt == 0) flavorText = "†そして時は動き出す†";
  }
  if (gameOver) {
    console.log(name + "：" + nyan.score);
    let text = rank(nyan.score, name);
    client.channels.cache
      .get(GAME_CHANNEL)
      .messages.cache.get(RANK_TEXT)
      .edit(text); // ランキング更新
  }
}

// スコアを入れるとランキングのテキストを出力してくれる
function rank(score, name) {
  let alreadyExist = -1;
  for (var i = 0; i < 10; i++) {
    if (ranking.indexOf(name) != -1) alreadyExist = ranking.indexOf(name);
  }
  if (alreadyExist != -1) {
    // ランキングに名前がある場合
    if (ranking[alreadyExist + 1] <= nyan.score)
      ranking[alreadyExist + 1] = nyan.score; // スコア更新出来たらランキングを更新
    // ランキングのソート
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (Number(ranking[j * 2 + 1]) < Number(ranking[(j + 1) * 2 + 1])) {
          let tmpName = ranking[j * 2];
          ranking[j * 2] = ranking[(j + 1) * 2];
          ranking[(j + 1) * 2] = tmpName;
          let tmpScore = ranking[j * 2 + 1];
          ranking[j * 2 + 1] = ranking[(j + 1) * 2 + 1];
          ranking[(j + 1) * 2 + 1] = tmpScore;
        }
      }
    }
  } else {
    // ランキングに名前が無い場合
    for (var i = 0; i < 10; i++) {
      if (ranking[i * 2 + 1] <= nyan.score) {
        // スコアが高かったら挿入＆末尾削除
        ranking.splice(i * 2, 0, nyan.score);
        ranking.splice(i * 2, 0, name);
        ranking.pop();
        ranking.pop();
        break;
      }
    }
  }
  save();
  let text = "☆ランキング☆\n";
  for (var i = 0; i < 10; i++) {
    text +=
      "`" +
      makeEmpty(i + 1, 2, -1) +
      "位`：`" +
      ranking[i * 2 + 1] +
      "点`(**" +
      ranking[i * 2] +
      "**)\n";
  }
  return text;
}

// 現在の位置から別のワープますの座標を割り出す
function warp(x, y) {
  warp: for (var i = 0; i < H; i++) {
    for (var j = 0; j < W; j++) {
      if (i == y && j == x) continue;
      if (field[i][j] == 11) {
        return [j, i];
      }
    }
  }
  return [x, y]; //ほかにワープマスが無い場合、ワープしない
}

// 表示とリアクションの消去を行う
function displayDeleteReaction(USER, reaction, user) {
  USER.then(USER => {
    display(H, W, field, USER.displayName);
  }); // フィールドをGAME_CHANNELに描画
  reaction.users.remove(user);
}
//const gameIcon = ["⬆", "⬅", "⬇", "➡","💣","⏱","⏸","<:death:767774739195494480>"];
// リアクションでのゲーム操作を行う
client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.id == DISP_TEXT && user !== client.user) {
    if ("<:death:767774739195494480>".match(reaction.emoji.name)) {
      makeGame();
      display(H, W, field, "no player");
      reaction.users.remove(user);
      return;
    }
    const USER = client.guilds.cache.get(GUILD_ID).members.fetch(user.id);
    if (!gameOver) {
      let moving = 0;
      if (reaction.emoji.name === "⬆") moving = moveNyan(nyan.y - 1, nyan.x);
      if (reaction.emoji.name === "⬅") moving = moveNyan(nyan.y, nyan.x - 1);
      if (reaction.emoji.name === "⬇") moving = moveNyan(nyan.y + 1, nyan.x);
      if (reaction.emoji.name === "➡") moving = moveNyan(nyan.y, nyan.x + 1);
      if (reaction.emoji.name === "💣") {
        playLandMine();
        displayDeleteReaction(USER, reaction, user);
        return;
      }
      if (reaction.emoji.name === "⏱") {
        playStopTime();
        displayDeleteReaction(USER, reaction, user);
        return;
      }
      if (moving == 0 || moving == 1) {
        USER.then(USER => {
          processEvent(USER.displayName);
          if (moving == 1) flavorText = "壁を破壊したにゃ！！";
          display(H, W, field, USER.displayName);
        }); // フィールドをGAME_CHANNELに描画
      } else if (moving == -1) {
        flavorText = "壁があって動けないにゃぁ。";
        displayDeleteReaction(USER, reaction, user);
        return;
      }
    }
    reaction.users.remove(user);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 穴掘り法でW×Hの迷路を生成する
function makeMaze(H, W) {
  if (H % 2 == 0) H++;
  if (W % 2 == 0) W++;
  let field = new Array(H + 2);
  for (var i = 0; i < H + 2; i++) {
    field[i] = new Array(W + 2).fill("□");
  }
  for (var i = 0; i < H + 2; i++) {
    for (var j = 0; j < W + 2; j++) {
      if (i == 0 || j == 0 || i == H + 1 || j == W + 1) field[i][j] = "　";
    }
  }
  // 迷路生成
  var open = [];
  var fx = Math.floor((Math.random() * (W - 1)) / 2 + 1) * 2;
  var fy = Math.floor((Math.random() * (H - 1)) / 2 + 1) * 2;
  open.push(new State(fy, fx, 0)); // 初期位置指定
  field[fy][fx] = "　";
  while (open.length) {
    var rand = Math.floor(Math.random() * open.length);
    var tmp = open.splice(rand, 1);
    var st = tmp[0];
    // 四方向に伸ばせない場合はcontinue
    var sum = 0;
    for (var i = 0; i < 4; i++) {
      if (field[st.y + dy[i] * 2][st.x + dx[i] * 2] === "□") sum++;
    }
    if (sum == 0) continue;
    else if (sum > 1) open.push(st);
    // ランダムに方向決定
    while (true) {
      var dir = Math.floor(Math.random() * 4);
      if (field[st.y + dy[dir] * 2][st.x + dx[dir] * 2] === "□") {
        field[st.y + dy[dir]][st.x + dx[dir]] = "　";
        field[st.y + dy[dir] * 2][st.x + dx[dir] * 2] = "　";
        open.push(new State(st.y + dy[dir] * 2, st.x + dx[dir] * 2, 0));
        break;
      }
    }
  }
  return field;
}

// ダイクストラ法で最短経路を求める
function dijkstra(H, W, field, sx, sy, gx, gy) {
  let gst = new State(gy, gx, null);
  const open = [];
  open.push(new State(sy, sx, null));
  const closed = []; // 探索済み座標の格納
  // 最短経路の探索
  while (open.length) {
    let st = open.shift();
    // ゴールしたらループから抜ける
    if (st.y == gy && st.x == gx) {
      gst = st;
      break;
    }
    if (closed.indexOf((st.y << 16) | st.x) != -1) {
      continue;
    }
    if (field[st.y][st.x] === 1) {
      continue;
    }
    for (let i = 0; i < 4; i++) {
      const ns = new State(st.y + dy[i], st.x + dx[i], st);
      open.push(ns);
    }
    closed.push((st.y << 16) | st.x);
  }
  return gst.st;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 固定変数集                                                                                                  　 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 干支
const zodiac = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥"
];
// 誕生日を指定する
const birthday = [
  { m: 4, d: 11, name: "三木" },
  { m: 4, d: 15, name: "大橋" },
  { m: 5, d: 24, name: "松野" },
  { m: 5, d: 30, name: "稲守" },
  { m: 6, d: 2, name: "木島先生" },
  { m: 7, d: 31, name: "尾山" },
  { m: 8, d: 4, name: "平野" },
  { m: 9, d: 2, name: "白木" },
  { m: 9, d: 13, name: "伊藤" },
  { m: 9, d: 17, name: "浅野" },
  { m: 10, d: 22, name: "谷口" },
  { m: 10, d: 31, name: "髙岡" },
  { m: 11, d: 24, name: "新良" },
  { m: 1, d: 26, name: "野ツ俣" },
  { m: 1, d: 28, name: "虫鹿" },
  { m: 2, d: 15, name: "南部" },
  { m: 3, d: 12, name: "犬飼" }
];
// 誰かがありがとうなど発言したときの返し
const thanks = [
  "サンキュでぇ～す！",
  "ん優しい世界ぃ″！",
  "ありがとうございまぁ″～す！",
  "素敵だにゃ″ぁ！",
  "にゃ″はは！",
  "あったかいにゃ″ぁ",
  "いぇ″～い″！！",
  "んほぉ″～！！",
  "社会貢献だにゃ″ぁ！",
  "お″ね″ぇさ″んも喜んでるにゃ″ぁ！",
  "あぁ″＾～感謝の言葉がぴょんぴょんするんにゃ″ぁ～",
  "はぁ″い！",
  "感謝感謝にゃ″ぁ～",
  "気持ちがええんにゃ″ぁ～",
  "やったぜ。",
  "ありがとうは世界を救うにゃ″ぁ～",
  "どゅ″ふ″ふ″、あったかいにゃ″～",
  "おじさんもきっと喜んでるにゃ！"
];
// 誰かがごめんなさいなど発言したときの返し
const apo = [
  "そういうときもあるにゃぁ",
  "つぎからがんばればいいにゃぁ",
  "しかたないにゃぁ",
  "ミーも一緒にあやまるにゃぁ",
  "はい、ごめんなさ″～い",
  "ここはミーに任せてはやく逃げるにゃ”！",
  "正直に謝ればみんな許してくれるにゃぁ",
  "きりかえていくにゃぁ",
  "またつぎがあるにゃぁ",
  "ここはミーに免じてゆるしてほしいにゃぁ”！",
  "ボコルならミーをボコるにゃ！！",
  "誰にでもしっぱいはあるにゃぁ"
];
// botを呼んだ時の反応
const res = [
  "おぉ″ーん″！呼んだかにゃぁ″？",
  "お″ねぇ″さ″ん″に呼ばれた気がしたにゃぁ！！",
  "人気者は困っちゃうにゃぁ″～！",
  "ミ″ーを呼ぶ声が聞こえてきた気がするにゃぁ″！",
  "何か用かにゃぁ″？",
  "お″ぉ～ん！ニャンちゅうでぇ～す″！！",
  "これからお″ねぇ″さんとデェートに行ってくるにゃぁ″！ドュフフフ",
  "は？",
  "いぇ″～い！ニャンちゅうは今日も元気いっぱいにゃぁ″～！",
  "な″～んということでしょう！ニャンちゅうは人気者でぇ″～す！",
  "んにゃ″ぁ″ぁ″ぁ″ぁ″ぁ″ぁ",
  "み゛ぃとともだちになってくれるのかにゃあん！？",
  "お゛に゛ぃさぁ゛ん！？",
  "み゛ぃはま゛ぁだいぎでる゛に゛ゃあ゛あ゛あ゛あ゛ん゛！",
  "ｶﾞｶﾞｶﾞ……ｼﾃ、ﾋﾟｰｶﾞｶﾞ…ｺｺｶﾗ…ﾀﾞｼ…ｶﾞｶﾞｶﾞｶﾞｶﾞｶﾞ",
  "今日も素敵な一日だにゃ″ん！",
  "お″ぉん″！！お″お″お″お″お″お″お″ぉ″ん！！！",
  "次のゼミが待ち遠しいにゃぁ″！",
  "お″ねぇ″さ″ん″がいつのまにか40代になってたにゃぁ″...",
  "やっぱりたまごかけご飯はおいしいにゃぁん！！",
  "真の卵賭けご飯を見せてやるにゃ″ん！",
  "お″ね″え″さんの生態を学会に発表したにゃ″ん！！",
  "ぃや″っぱりぃ″！？",
  "FXで有り金全部溶かしたにゃ″ん″！！！",
  "NHKの人ぉん、訴えないでくださぁ″い！"
];
