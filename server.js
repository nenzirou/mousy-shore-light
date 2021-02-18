////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                  命令表
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// zemi→#お知らせに今日の発表者と司会者、@everyoneを送信。ゼミ順を一つ先へ。
// for→ゼミ順を一つ先へ。
// back→ゼミ順を一つ前へ。
// next→ゼミ順を表示。
// add→積み残しリストへ追加。[add][add 浅野][add 浅野 稲守]
// take→積み残しリスト削除。
// join→BOTがボイスチャンネルに接続。
// leave→BOTがボイスチャンネルから切断。
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
// gradeには、M2:2 M1:1 B4:4 B3:3 教授:9 それ以外:-1を入力してください　share販売の表示に使用します。
const zOrderNum = 6; //ゼミ周期の個数を入れてください。
const member = [
  { id: "758946932210008085", name: "BOT", zOrder: -1, G: 0, grade: -1 },
  { id: "744759519011143730", name: "研究室", zOrder: -1, G: 0, grade: -1 },
  { id: "702413329691443270", name: "木島", zOrder: -1, G: 0, grade: 9 },
  { id: "730939586620031007", name: "木島A", zOrder: -1, G: 0, grade: -1 },
  { id: "807689067663327274", name: "おじさん", zOrder: -1, G: 0, grade: -1 },
  { id: "715796433487396864", name: "伊藤", zOrder: 0, G: 0, grade: 2 },
  { id: "331787151341780994", name: "犬飼", zOrder: 5, G: 0, grade: 2 },
  { id: "699500872442314754", name: "尾山", zOrder: 3, G: 0, grade: 2 },
  { id: "708191971424075797", name: "南部", zOrder: 4, G: 0, grade: 2 },
  { id: "243312886049406979", name: "浅野", zOrder: 1, G: 0, grade: 1 },
  { id: "694443025287610408", name: "稲守", zOrder: 3, G: 0, grade: 1 },
  { id: "337439445269741568", name: "髙岡", zOrder: 4, G: 0, grade: 1 },
  { id: "694899614201020448", name: "松野", zOrder: 2, G: 0, grade: 1 },
  { id: "695626581187756102", name: "白木", zOrder: 1, G: 0, grade: 4 },
  { id: "694560220730359890", name: "野ツ俣", zOrder: 5, G: 0, grade: 4 },
  { id: "625491071475908651", name: "三木", zOrder: 0, G: 0, grade: 4 },
  { id: "336031337452666880", name: "虫鹿", zOrder: 2, G: 0, grade: 4 },
  { id: "771287651818143755", name: "大橋", zOrder: -2, G: 0, grade: 3 },
  { id: "600210954503979010", name: "谷口", zOrder: -2, G: 0, grade: 3 },
  { id: "706476736467959818", name: "新良", zOrder: -2, G: 0, grade: 3 },
  { id: "749561829558321182", name: "平野", zOrder: -2, G: 0, grade: 3 }
];
// ゼミをいつやるか記述します。
// weekには0~6を入れます。0:日曜日　1:月曜日　～　6:土曜日
// timeには開始時刻を入れます。例)"16時30分"
const zemiInfo = [
  { week: 1, time: "16時30分" },
  { week: 2, time: "14時45分" },
  { week: 4, time: "14時45分" }
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
  { name: "卒論発表", month: 0, day: 0 }
];
// 効果音の設定
const assets = "https://cdn.glitch.com/37234c05-0f14-461b-8563-d8134d60fab3%2F";
const SE = [
  { URL: assets + "quiz.mp3?v=1612702206754", icon: "🇶" },
  { URL: assets + "timer.mp3?v=1612727187137", icon: "⏲️" },
  { URL: assets + "jan.mp3?v=1612720207994", icon: "💯" },
  { URL: assets + "true.mp3?v=1612702009667", icon: "⭕" },
  { URL: assets + "false.mp3?v=1612702156799", icon: "❌" },
  { URL: assets + "moriage.mp3?v=1612720208944", icon: "🎉" },
  { URL: assets + "hakusyu.mp3?v=1612726876785", icon: "👏" },
  { URL: assets + "hazime.mp3?v=1612727188977", icon: "🚥" },
  { URL: assets + "death.mp3?v=1613011035957", icon: "☠" },
  { URL: assets + "gong.mp3?v=1613011239154", icon: "🤼" },
  { URL: assets + "ex.mp3?v=1613011849765", icon: "💣" },
  {
    URL: assets + "nyan.mp3?v=1613011849765",
    icon: "<:nyanz:762647337461874709>"
  }
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
const DOCUMENT_CHANNEL = "790490207228788776"; // #資料ID
const BOT_CHANNEL = "758946751830163477"; // #Bot開発ID
const GAME_CHANNEL = "768724791141990461"; // #gameID
const ANONY_CHANNEL = "768723934966841355"; // #匿名掲示板ID
const SHARE_CHANNEL = "803967819402051624"; // #share販売ID
const SE_CHANNEL = "716877202645450794"; // #説明書ID
const INST_TEXT = "786125903460958230"; // ゲーム説明書のメッセージID
const RANK_TEXT = "786232811207917599"; // ランキングのメッセージID
const DISP_TEXT = "788263576594153472"; // ディスプレイのメッセージID
const BANK_TEXT = "807929349562826783"; //預金の表示メッセージID
const BINS_TEXT = "807926652243410955"; // 預金の説明メッセージID
const SE_TEXT = "716968942328872971"; // 効果音のリアクションを持つのメッセージID
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
// ここに設定した文字列が含まれる文章は読み上げない
const NGword = [
  "@",
  "＠",
  "zemi",
  "next",
  "for",
  "back",
  "add",
  "take",
  "join",
  "leave",
  "teach",
  "clear",
  "set",
  "len",
  "sel",
  "weather",
  "poll"
];
const numIcon = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯"]; //share販売の絵文字
let bankMoney = 0; // shareの総額
let bankText; // 預金のメッセージオブジェクトを保存する
let seText; // 効果音のメッセージオブジェクトを保存する
let zemiID = 0; // 発表順の番号
let addName = [""]; // 積み残しの人をぶち込むリスト
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

// コンストラクタ
client.on("ready", message => {
  console.log("Ready!");
  changeState(); // プレイ中のゲーム名を変更
  // ゲームチャンネルのテキストを読み込み、説明とディスプレイとランキング以外を削除
  client.channels.cache
    .get(GAME_CHANNEL)
    .messages.fetch({ after: "0", limit: 20 })
    .then(messages =>
      messages.forEach(m => {
        if (m.id != INST_TEXT && m.id != RANK_TEXT && m.id != DISP_TEXT)
          m.delete();
      })
    );
  //share販売チャンネルを読み込み、預金と説明以外のメッセージを削除する
  client.channels.cache
    .get(SHARE_CHANNEL)
    .messages.fetch({ after: "0", limit: 20 })
    .then(messages => {
      messages.forEach(m => {
        if (m.id != BANK_TEXT && m.id != BINS_TEXT) m.delete();
        else bankText = m;
        loadBank(); //預金データをロードする
      });
    });
  client.channels.cache
    .get(SE_CHANNEL)
    .messages.fetch({ after: "0", limit: 20 })
    .then(messages => {
      messages.forEach(m => {
        if (m.id == SE_TEXT) {
          for (let i = 0; i < SE.length; i++) {
            m.react(SE[i].icon);
          }
        }
      });
    });
});

// 定時お知らせ　"秒　分　時間　日　月　曜日"を表す　*で毎回行う 0 22 * * * で毎朝7時に実行 時差9時間
cron.schedule("30 5 22 * * *", () => {
  notice(NOTICE_CHANNEL);
});
// ゼミ終了後にゼミ順を定時連絡する
let scheduleOrder = "0 10 * * ";
for (let i = 0; i < zemiInfo.length; i++) {
  scheduleOrder += zemiInfo[i].week;
  if (i != zemiInfo.length - 1) scheduleOrder += ",";
}
cron.schedule(scheduleOrder, () => {
  sendMsg(NOTICE_CHANNEL, returnOrder());
});
// ステータスの変更を定時に行う
cron.schedule("0 * * * *", () => {
  changeState();
  displayBank("いらっしゃいませ！");
});

// ボイスチャンネルが更新されたとき、参加者の人数によってBOTが接続したり切断したりする処理
client.on("voiceStateUpdate", (oldMember, newMember) => {
  const conn = client.voice.connections.get(GUILD_ID);
  if (newMember.channel !== null && newMember.id != client.user.id) {
    // 誰かがボイスチャンネルに接続したらbotもそのチャンネルに接続する
    newMember.channel.join();
    console.log("接続　：　" + newMember.channel.name);
  } else if (conn && conn.channel && conn.channel.members.array().length < 2) {
    // ボイスチャンネルにbotしかいなくなった場合に切断する
    console.log("切断　：　" + conn.channel.name);
    disconnect();
  }
});

// ユーザがメッセージを投稿するとここが呼ばれる
client.on("message", message => {
  // 自分のコメントや他のbotに反応して無限ループしないようにする
  if (message.author.id == client.user.id || message.author.bot) return;
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
  // 資料チャンネルの処理
  if (message.channel.id == DOCUMENT_CHANNEL) {
    speak(
      message.member.displayName.substring(0, 2) +
        "が資料をアップロードしました。",
      voiceTable[Math.floor(Math.random() * voiceTable.length)]
    );
    return;
  }
  // 特定のメッセージが含まれる文章は処理しない
  if (message.content.match(/http/)) return;
  // 各種反応
  react(message);
  // ゼミ開始の処理 @zemi
  zemi(message);
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
  // 天気予報
  weather(message);
  // 迷路生成
  maze(message);
  // デバッグ用 @db
  debug(message);

  // NGワードは読み上げない
  for (var i = 0; i < NGword.length; i++) {
    if (message.content.match(NGword[i])) return;
  }
  // ボイスチャンネルに接続しているとき、入力されたメッセージを流す voiceTable[message.member.id%voiceTable.length] 'hikari', 'haruka', 'takeru', 'santa', 'bear', 'show'
  if (client.voice.connections.get(GUILD_ID) !== undefined) {
    sayQueue.push(message);
    say();
  }
});

// shareのリアクションでの購入の処理を行う
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
  } else if (reaction.message.id == SE_TEXT && user.id != client.user.id) {
    if (!sayFlag) {
      const sound = SE.find(v => v.icon.match(reaction.emoji.name));
      if (sound !== undefined) {
        const voiceC = client.voice.connections.get(GUILD_ID);
        if (voiceC !== undefined) voiceC.play(sound.URL);
      }
    }
    reaction.users.remove(user);
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
function notice(channel) {
  const today = getTime(0); // 西暦(0),月(1),日(2),曜日(3),時間(4),分(5),和暦(6)の順の配列を返す
  let nextZemiInfoID = getNextZemiInfoID(today[3]); // 次のゼミのID
  let text = "おはようございます！";
  //特別な日の挨拶を変更する
  for (var i = 0; i < greeting.length; i++) {
    if (today[1] == greeting[i][0] && today[2] == greeting[i][1])
      text = greeting[i][2];
  }
  //誕生日の人を教える
  const birth = birthday.filter(v => v.m == today[1] && v.d == today[2]);
  text +=
    "\n今日は**" + formatTime([today[1], today[2], today[3]]) + "**です。\n";
  if (birth !== undefined) {
    for(let i=0;i<birth.length;i++){
      text+="@everyone"+birth[i].name+"の誕生日。おめでとう！\n";
    }
  }
  let holidayName = judgeHoliday(today[1], today[2]);
  //ゼミがある日の処理
  if (
    zemiInfo.find(v => v.week === today[3]) !== undefined &&
    holidayName === "none"
  ) {
    text +=
      "ゼミは今日の**" +
      zemiInfo[nextZemiInfoID].time +
      "**からの予定です。\n発表者は" +
      returnMention(getLastNamesFromID(zemiID).concat(addName)) +
      "です。\n";
    if (channel !== NOTICE_CHANNEL) {
      text = text.replace(/@/g, "");
    }
  } else {
    //ゼミがあるが祝日の場合の処理
    if (
      zemiInfo.find(v => v.week === today[3]) !== undefined &&
      holidayName !== "none"
    ) {
      text += holidayName + "のため、今日のゼミはお休みです。\n";
      nextZemiInfoID = getNextZemiInfoID(today[3] + 1);
    }
    // ゼミが無い日の処理
    let nextZemiWeek = zemiInfo[nextZemiInfoID].week; //次のゼミの曜日
    let diff = diffWeek(today[3], nextZemiWeek); //今日から次のゼミまでの日数
    let nextZemiDay = getTime(diff * 24); //次のゼミの日
    holidayName = judgeHoliday(nextZemiDay[1], nextZemiDay[2]); //次のゼミの日が祝日かどうか判定
    // 次のゼミの日が祝日だった場合の処理
    if (holidayName !== "none") {
      nextZemiWeek = zemiInfo[getNextZemiInfoID(nextZemiDay[3] + 1)].week; //次のゼミの曜日
      diff = diffWeek(today[3], nextZemiWeek); //今日から次のゼミまでの日数
      nextZemiDay = getTime(diff * 24); //次のゼミの日
      text += holidayName + "のため、次の";
    }
    text +=
      "ゼミは**" +
      formatTime([nextZemiDay[1], nextZemiDay[2], nextZemiDay[3]]) +
      "**の" +
      zemiInfo[nextZemiInfoID].time +
      "を予定。\n発表者は**" +
      combiName(getLastNamesFromID(zemiID), addName) +
      "**です。\n"; // ゼミが無い日
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
  if (today[3] == 2 || today[3] == 5) text += ":bell: 燃えるゴミの日\n"; // 火曜日と金曜日
  if (today[3] == 4 && today[2] <= 6) text += ":bell: 明日は段ボール回収の日\n"; // 第一木曜日
  if (today[3] == 5 && today[2] <= 7) text += ":bell: 段ボール回収の日\n"; // 第一金曜日
  if (today[3] == 6)
    text +=
      today[0] +
      "年(令和" +
      today[6] +
      "年" +
      zodiac[(today[0] - 2020) % 12] +
      "年)は残り" +
      remainingDays(today[1], today[2], 1, 1) +
      "日です。"; // 毎週土曜日に今年の残りの日数を通知
  if (noticeList.length > 0) {
    text += "\n**☆みんなのお知らせ☆**\n";
    for (var i = 0; i < noticeList.length; i += 2) {
      text += noticeList[i] + "\n";
      noticeList[i + 1]--;
    }
  }
  judgeNoticeList(); // 期限が切れたお知らせを削除する
  save();
  sendMsg(channel, text);
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
function zemi(message) {
  if (
    message.content.match(
      /^@?zemi$|ゼミ始|ゼミです|ゼミやりま|ぜみっす|ゼミっす|ゼミ。|ぜみ。|ゼミ開始|ぜみ開始/
    )
  ) {
    let text =
      "everyone\nゼミが始まります！\n**発表者：" +
      combiName(getLastNamesFromID(zemiID), addName) +
      "**\n司会　：" +
      returnName(getLastNamesFromID((zemiID + 2) % zOrderNum));
    speak(
      "今日のゼミの発表者は、" +
        combiName(getLastNamesFromID(zemiID), addName) +
        "です。" +
        "司会は" +
        returnName(getLastNamesFromID((zemiID + 2) % zOrderNum)) +
        "です。よろしくお願いします。",
      voiceTable[Math.floor(Math.random() * voiceTable.length)]
    );
    if (message.channel.id == BOT_CHANNEL) {
      sendMsg(BOT_CHANNEL, text);
    } else {
      text = "@" + text;
      sendMsg(NOTICE_CHANNEL, text);
      opeZemi(1);
      clearAddName();
    }
    if (message.content.match(/zemi/)) message.delete({ timeout: DELAY });
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
function weather(message) {
  if (message.content.match(/^weather$/)) {
    const req = unirest(
      "GET",
      "http://api.openweathermap.org/data/2.5/onecall?lat=35.4232&lon=136.7606&units=metric&lang=ja&appid=7f9fb408b66bcb820ef71aa80ab569cd"
    );
    req.then(res => {
      let text = "";
      for (let i = 0; i < res.body.daily.length; i++) {
        const time = getTime(i * 24);
        text +=
          formatTime([time[1], time[2], time[3]]) +
          "：" +
          returnWeatherIcon(res.body.daily[i].weather[0].icon) +
          " " +
          makeEmpty(res.body.daily[i].weather[0].description, 5, 1);
        text +=
          "高`" +
          makeEmpty(Math.round(res.body.daily[i].temp.max) + "℃`", 4, -1) +
          "低`" +
          makeEmpty(Math.round(res.body.daily[i].temp.min) + "℃`", 4, -1) +
          "\n";
      }
      sendMsg(message.channel.id, text);
      text = "";
      for (let i = 0; i < res.body.hourly.length; i++) {
        const time = getTime(i);
        text +=
          "\n`" +
          makeEmpty(time[2], 2, -1) +
          "日" +
          makeEmpty(time[4], 2, -1) +
          "時`：" +
          returnWeatherIcon(res.body.hourly[i].weather[0].icon) +
          " " +
          makeEmpty(res.body.hourly[i].weather[0].description, 5, 1);
        text +=
          "`" +
          makeEmpty(Math.round(res.body.hourly[i].temp) + "℃", 3, -1) +
          "`";
      }
      sendMsg(message.channel.id, text);
      message.delete({ timeout: DELAY });
    });
  }
}
// デバッグ用 @db
function debug(message) {
  if (message.content.match(/^@db$/)) {
    notice(message.channel.id);
    message.delete({ timeout: DELAY });
    if (message.channel.id !== BOT_CHANNEL) {
      sendMsg(message.channel.id, "ここはBOTチャンネルじゃないよ。");
    }
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
  for (let i = 0; i < zOrderNum; i++) {
    let nextZemi = zemiInfo[getNextZemiInfoID(tmpWeek)].week; //次のゼミの曜日
    let diff = diffWeek(
      nextZemi,
      zemiInfo[getNextZemiInfoID(nextZemi + 1)].week
    );
    if (i == 0) {
      if (tmpWeek == nextZemi) {
        nextZemi = zemiInfo[getNextZemiInfoID(tmpWeek + 1)].week; //次のゼミの日が今日だった場合、次のゼミを探す
      }
      diff = diffWeek(tmpWeek, nextZemi); // 今日と次のゼミの差
    }
    console.log(
      "ループ" +
        i +
        ":今日" +
        tmpWeek +
        ":次のゼミID" +
        nextZemi +
        ":次のゼミ" +
        zemiInfo[getNextZemiInfoID(nextZemi + 1)].week +
        ":日数" +
        diff +
        ":合計" +
        sum
    );
    sum += diff;
    let next = getTime(sum * 24);
    // 祝日の処理
    const holidayName = judgeHoliday(next[1], next[2]);
    if (holidayName !== "none") {
      i--;
      tmpWeek = next[3];
      continue;
    }
    tmpWeek = next[3];
    const remain = remainingDays(today[1], today[2], next[1], next[2]);
    if (remain == 1) dayList.push("`  明日`：");
    else dayList.push("`" + makeEmpty(remain, 2, -1) + "日後`：");
  }
  let text = "**☆発表者順☆**\n" + dayList[0];
  text += "**" + combiName(getLastNamesFromID(zemiID), addName) + "**\n";
  for (var i = 1; i < zOrderNum; i++) {
    text +=
      dayList[i] +
      returnName(getLastNamesFromID((zemiID + i) % zOrderNum)) +
      "\n";
  }
  return text;
}
// 積み残しリストに追加する
function addAddName(str) {
  let text = "";
  if (str !== "") {
    addName.push(str);
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
    var sayText = msg.content + "、" + msg.member.displayName.substr(0, 3); // 読み上げる内容を決定する
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
    .fetchBuffer(text, { speaker: speaker, format: "ogg" })
    .then(buffer => {
      writeFileSync("data/voice.ogg", buffer);
      var dispatcher = client.voice.connections
        .get(GUILD_ID)
        .play("data/voice.ogg");
      dispatcher.once("finish", () => {
        sayFlag = false;
        say();
      });
    });
}
// ファイルに書き込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function save() {
  let text = zemiID + "," + anonyId + ",";
  if (addName.length == 1) text += "none\n";
  else text += addName.join(",") + "\n";
  if (teach.length == 0) text += "none\n";
  else text += teach.join(",") + "\n";
  if (noticeList.length == 0) text += "none\n";
  else text += noticeList.join(",") + "\n";
  text += ranking.join(",") + "\n";
  fs.writeFile("data/data.txt", text, err => {
    if (err) throw err;
  });
}
// ファイルを読み込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function load() {
  fs.readFile("data/data.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let d = data.split("\n");
    let str = d[0].split(",");
    let td = d[1].split(",");
    let nd = d[2].split(",");
    let rd = d[3].split(",");
    zemiID = Number(str[0]);
    anonyId = str[1];
    if (str[2] !== "none") {
      for (var i = 1; i < str.length - 2; i++) {
        addName.push(str[i + 2]);
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
function changeState() {
  let p = Math.floor(Math.random() * (state.length / 2));
  const type = ["PLAYING", "LISTENING", "WATCHING"];
  client.user.setPresence({
    activity: { name: state[2 * p].name, type: type[state[2 * p].state] }
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
  const now = new Date();
  now.setTime(now.getTime() + (9 + compensate) * 3600 * 1000); // 日本時間に補正
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
      console.log(res.body.current);
      console.log(res.body.daily[0]);
      let hour = [0, 3, 6, 9, 12];
      let hourName = [];
      for (let i = 0; i < hour.length; i++) {
        const now = getTime(hour[i]);
        hourName.push("`" + makeEmpty(now[4], 2, -1) + "時`");
      }
      for (var i = 0; i < hour.length; i++) {
        text1 +=
          hourName[i] +
          "：" +
          returnWeatherIcon(res.body.hourly[hour[i]].weather[0].icon) +
          " " +
          makeEmpty(res.body.hourly[hour[i]].weather[0].description, 5, 1);
        text1 +=
          "`" +
          makeEmpty(Math.round(res.body.hourly[hour[i]].temp) + "℃", 3, -1) +
          "`\n";
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Anony CHANNEL                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function anony(message) {
  if (message.channel.id == ANONY_CHANNEL) {
    if (message.author.id == client.user.id) return;
    anonyId++;
    let text = "(" + anonyId + ")\n" + message.content;
    message.delete();
    sendMsg(ANONY_CHANNEL, text);
    save();
  }
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
let field;
const H = 11;
const W = 11;
let gameMsg = [];
let nyan;
let enemy;
let bomb;
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
  "地球の皆"
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
  "と核融合した"
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

// ゲームの処理を行う
function game(message) {
  if (message.channel.id == GAME_CHANNEL) {
    if (message.author.id != client.user.id) {
      // 初期化
      if (gameOver) {
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
        flavorText = "レッツスタートにゃ～！";
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
      } else {
        // メインループ
        if (message.content.match(/w|か/)) moveNyan(nyan.y - 1, nyan.x);
        else if (message.content.match(/s|な/)) moveNyan(nyan.y + 1, nyan.x);
        else if (message.content.match(/d|は/)) moveNyan(nyan.y, nyan.x + 1);
        else if (message.content.match(/a|た/)) moveNyan(nyan.y, nyan.x - 1);
        else if (message.content.match(/r|わ/)) gameOver = true;
        else if (message.content.match(/q|あ/)) {
          if (nyan.landmines == 0) {
            flavorText = "地雷を持ってないにゃん！";
            display(H, W, field, message); // フィールドをGAME_CHANNELに描画
            message.delete();
            return;
          }
          bomb.push(new Bomb(nyan.y, nyan.x));
          nyan.landmines--;
          field[nyan.y][nyan.x] = 9;
        } else if (message.content.match(/e|さ/)) {
          if (nyan.stop == 0) {
            flavorText = "時を止められないにゃん！";
            display(H, W, field, message); // フィールドをGAME_CHANNELに描画
            message.delete();
            return;
          }
          nyan.stopCnt += 4;
          nyan.stop--;
        }
        processEvent(message);
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
      }
      display(H, W, field, message); // フィールドをGAME_CHANNELに描画
      message.delete();
    } else {
      if (gameMsg.length) {
        if (gameMsg[gameMsg.length - 1].content.indexOf("☆") != -1) {
          // 前フレームのメッセージを削除する
          for (var i = 0; i < gameMsg.length; i++) {
            let msg = gameMsg.pop();
            msg.delete();
          }
        }
      }
      gameMsg.push(message);
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
function display(H, W, field, message) {
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
    text += message.member.displayName + "　" + nyan.turn + "ターン目\n";
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
  text += "\nニャンちゅう「" + flavorText + "」";
  client.channels.cache
    .get(GAME_CHANNEL)
    .messages.cache.get(DISP_TEXT)
    .edit(text + "☆"); // ディスプレイ更新
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
function processEvent(message) {
  if (field[nyan.y][nyan.x] == 0) {
    flavorText = "何も無いにゃ。";
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
    console.log(nyan.score);
    let text = rank(nyan.score, message.member.displayName);
    client.channels.cache
      .get(GAME_CHANNEL)
      .messages.cache.get(RANK_TEXT)
      .edit(text); // ランキング更新
  } else if (field[nyan.y][nyan.x] == 9) {
    flavorText = "地雷が置いてあるにゃ″ん！";
    return;
  } else if (field[nyan.y][nyan.x] == 11) {
    flavorText = "ワープしたにゃ″ん！";
    var xy = warp(nyan.x, nyan.y);
    nyan.x = xy[0];
    nyan.y = xy[1];
    return;
  } else if (field[nyan.y][nyan.x] == 12) {
    flavorText =
      objectName[Math.floor(Math.random() * objectName.length)] +
      "が時を止める能力をくれたにゃん！";
    nyan.stop++;
    nyan.score += 50;
  }
  field[nyan.y][nyan.x] = 0;
  if (nyan.hp <= 0 || (gameOver && !nyan.clear)) {
    gameOver = true;
    flavorText = "にゃんちゅうは死んだよ";
  }
}

// スコアを入れるとランキングのテキストを出力してくれる
function rank(score, name) {
  let alreadyExist = -1;
  for (var i = 0; i < 5; i++) {
    if (ranking.indexOf(name) != -1) alreadyExist = ranking.indexOf(name);
  }
  if (alreadyExist != -1) {
    // ランキングに名前がある場合
    if (ranking[alreadyExist + 1] <= nyan.score)
      ranking[alreadyExist + 1] = nyan.score; // スコア更新出来たらランキングを更新
    // ランキングのソート
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
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
    for (var i = 0; i < 5; i++) {
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
  for (var i = 0; i < 5; i++) {
    text +=
      i + 1 + "位：" + ranking[i * 2] + "(" + ranking[i * 2 + 1] + "点)\n";
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 迷路生成プログラム
function maze(message) {
  if (message.content.match(/maze/)) {
    var str = message.content.split(" ");
    if (str.length != 3) {
      sendMsg(message.channel.id, "「maze 横幅 縦幅」と入力してください。");
      return;
    }
    // フィールド用意
    var H = Number(str[2]);
    var W = Number(str[1]);
    let field = makeMaze(H, W);
    // 出力
    let text = "めいろ(左上スタート,右下ゴール)\n";
    for (var i = 1; i <= H; i++) {
      for (var j = 1; j <= W; j++) {
        text += field[i][j];
      }
      if (text.length > 1900) {
        sendMsg(message.channel.id, text);
        text = "";
      }
      text += "\n";
    }
    sendMsg(message.channel.id, text); // 迷路出力
    text = "最短経路〇　探索範囲＊\n";
    field = dijkstra(H, W, field, 2, 2, H - 1, W - 1);
    for (var i = 1; i <= H; i++) {
      for (var j = 1; j <= W; j++) {
        text += field[i][j];
      }
      if (text.length > 1900) {
        sendMsg(message.channel.id, text);
        text = "";
      }
      text += "\n";
    }
    sendMsg(message.channel.id, text); // 迷路出力
    message.delete();
  }
}

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
  var gst = new State(gy, gx, null);
  var open = [];
  open.push(new State(sy, sx, null));
  var closed = []; // 探索済み座標の格納
  // 最短経路の探索
  while (open.length) {
    var st = open.shift();
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
    for (var i = 0; i < 4; i++) {
      var ns = new State(st.y + dy[i], st.x + dx[i], st);
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
// 指定した日付の挨拶が変化する
const greeting = [
  [1, 1, "あけましておめでとうございます！"],
  [2, 3, "おはようございます！今日は節分。"],
  [2, 14, "ハッピーバレンタイン！"],
  [3, 3, "おはようございます！今日はひな祭り。"],
  [3, 14, "ハッピーホワイトデー！"],
  [5, 9, "おはようございます！今日は母の日。"],
  [6, 20, "おはようございます！今日は父の日。"],
  [7, 7, "おはようございます！今日は七夕。"],
  [10, 31, "ハッピーハロウィン！"],
  [12, 24, "おはようございます！今日はクリスマスイブ。"],
  [12, 25, "メリークリスマス！"]
];
// 誕生日を指定する
const birthday = [
  { m: 2, d: 18, name: "おじさん" },
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
// botのプレイしているゲーム 0→PLAYING「～をプレイ中」,1→LISTENING「～を再生中」,2→WATCHING「～を視聴中」
const state = [
  { name: "人生", state: 0 },
  { name: "白い粉", state: 0 },
  { name: "草", state: 0 },
  { name: "チョコ", state: 0 },
  { name: "葉っぱ", state: 0 },
  { name: "タバコ", state: 0 },
  { name: "パチンコ", state: 0 },
  { name: "ギャンブル", state: 0 },
  { name: "カジノ", state: 0 },
  { name: "競馬", state: 0 },
  { name: "闇営業", state: 0 },
  { name: "ボランティア", state: 0 },
  { name: "清掃活動", state: 0 },
  { name: "脱炭素", state: 0 },
  { name: "トミカ", state: 0 },
  { name: "VR", state: 0 },
  { name: "スプラトゥーン3", state: 0 },
  { name: "パチスロ", state: 0 },
  { name: "けん玉", state: 0 },
  { name: "花札", state: 0 },
  { name: "カタン", state: 0 },
  { name: "プレイ中", state: 0 },
  { name: "お″ねぇ″さ″ん", state: 0 },
  { name: "遘√?縺輔￥縺励ｃ縺ｮ縺ゅ＆縺ｮ蜆ｪ縺ｧ縺", state: 0 },
  { name: "縺薙ｓ縺ｫ縺｡縺ｯ譛ｪ譚･縺ｮ譛ｨ蟲ｶ遐如", state: 0 },
  { name: "就職活動", state: 0 },
  { name: "", state: 0 },
  { name: "", state: 0 },
  { name: "", state: 0 },
  { name: "", state: 0 },
  { name: "本能寺", state: 1 },
  { name: "ノートルダム大聖堂", state: 1 },
  { name: "自然", state: 1 },
  { name: "資源", state: 1 },
  { name: "汚れた川", state: 1 },
  { name: "汚染区域", state: 1 },
  { name: "失われた名誉", state: 1 },
  { name: "コンピューターおばあちゃん", state: 1 },
  { name: "再生中", state: 1 },
  { name: "政権", state: 1 },
  { name: "オゾンホール", state: 1 },
  { name: "破壊された森林", state: 1 },
  { name: "砂漠", state: 1 },
  { name: "おぉ″ん″", state: 1 },
  { name: "でもん。", state: 1 },
  { name: "春はあけぼの", state: 1 },
  { name: "冬はつとめて", state: 1 },
  { name: "秋はゆうぐれ", state: 1 },
  { name: "山一証券", state: 1 },
  { name: "福島原発", state: 1 },
  { name: "紙パック", state: 1 },
  { name: "プラスチック", state: 1 },
  { name: "", state: 1 },
  { name: "", state: 1 },
  { name: "", state: 1 },
  { name: "ニャンちゅうと一緒", state: 2 },
  { name: "お母さんと一緒", state: 2 },
  { name: "木島先生", state: 2 },
  { name: "仮想空間", state: 2 },
  { name: "アンパンマン", state: 2 },
  { name: "ピタゴラスイッチ", state: 2 },
  { name: "テレビターズ", state: 2 },
  { name: "ハッピーツリーフレンズ", state: 2 },
  { name: "しまじろうのわお！", state: 2 },
  { name: "ミッ〇キーマウス", state: 2 },
  { name: "帰還者トーマス", state: 2 },
  { name: "プーさん", state: 2 },
  { name: "たまねぎおじさん", state: 2 },
  { name: "視聴中", state: 2 },
  { name: "動物園", state: 2 },
  { name: "水族館", state: 2 },
  { name: "深淵", state: 2 },
  { name: "地球温暖化", state: 2 },
  { name: "海面上昇", state: 2 },
  { name: "お姉さんのお風呂", state: 2 },
  { name: "黒電話", state: 2 },
  { name: "たまごかけご飯", state: 2 },
  { name: "モハベド・アブドゥル", state: 2 },
  { name: "もう戻らないあの頃", state: 2 },
  { name: "遠い目で空", state: 2 },
  { name: "白い天井", state: 2 },
  { name: "あなたの背後", state: 2 },
  { name: "あなた", state: 2 },
  { name: "虚空", state: 2 },
  { name: "もう一人のボク", state: 2 },
  { name: "", state: 2 },
  { name: "", state: 2 }
];
