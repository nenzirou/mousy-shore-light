const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const unirest = require("unirest");// OpenWeatherMapと通信するために必要
const client = new discord.Client();
const {writeFileSync} =require('fs');// ファイル関係
const {VoiceText} = require("voice-text");// 音声を読み上げてくれるやつ
const voicetext = new VoiceText('d03x68wro08w7mz7');// 音声を読み上げてくれるやつ
const cron = require('node-cron');// 定期的にプログラムを実行してくれるやつ
// 名前とその対応するディスコードIDを記述する
const name = [["伊藤","三木"],["浅野","白木"],["松野","虫鹿"],["尾山","稲守"],["南部","高岡"],["犬飼","野ツ俣"]];
const id = [["715796433487396864","625491071475908651"],["243312886049406979","695626581187756102"],["694899614201020448","336031337452666880"],["699500872442314754","694443025287610408"],["708191971424075797","337439445269741568"],["331787151341780994","694560220730359890"]];
// 全員の名前を一つにまとめたリストを作成する
var memberList = [];
for(var i=0;i<name.length;i++){
  Array.prototype.push.apply(memberList, name[i]);
}
var noticeList = [];// ユーザのお知らせを格納するリスト
// チャンネルID記述
const TEACHER_CHANNEL = "732522915832266834";// #先生の部屋ID
const NOTICE_CHANNEL = "716879387072528384";// #お知らせID
const BOT_CHANNEL = "758946751830163477";// #Bot開発ID
const GAME_CHANNEL = "768724791141990461";// #gameID
const ANONY_CHANNEL = "768723934966841355";// #匿名掲示板ID
const INST_TEXT = "786125903460958230";// ゲーム説明書のメッセージID
const RANK_TEXT = "786232811207917599";// ランキングのメッセージID
const DISP_TEXT = "788263576594153472"// ディスプレイのメッセージID
const GUILD_ID = "694442026762240090";// 木島研サーバーのID
// 読み上げ関係
const voiceTable = ['hikari', 'haruka', 'takeru', 'santa', 'show'];// ボイスの種類 bearは聞き取りずらいので除外
var sayQueue = [];// 発言を記憶しておくキュー
var sayFlag = false;// BOTが発言中かどうかを判定する
const NGword = ["@","＠","zemi","next","for","back","add","take","join","leave","teach","clear","set","len","sel"];// ここに設定した文字列が含まれる文章は読み上げない
var teach = [];// 読み上げに教育したリスト
// 日付の処理用
const zodiac = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];// 干支
const monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];// 各月の日数
const week = ["日","月","火","水","木","金","土"];
const weekIcon = [":orange_circle:",":white_circle:",":red_circle:",":blue_circle:",":green_circle:",":yellow_circle:",":brown_circle:"];// 曜日のアイコン名
const zemiWeek = [1,2,4];// 曜日を数値で表す0~6 日~土
const zemiTime = [16,"30",14,"45",14,"45"];// zemiWeekに対応するゼミの開始時間
let zemiName = 0;// 発表者の配列番号
let addName = [""];
const fs = require("fs");
let anonyId = 0;
let ranking = [];
load();// データをロードする
// botを呼んだ時の反応
const res = ["おぉ″ーん″！呼んだかにゃぁ″？","お″ねぇ″さ″ん″に呼ばれた気がしたにゃぁ！！","人気者は困っちゃうにゃぁ″～！","ミ″ーを呼ぶ声が聞こえてきた気がするにゃぁ″！","何か用かにゃぁ″？","お″ぉ～ん！ニャンちゅうでぇ～す″！！",
          "これからお″ねぇ″さんとデェートに行ってくるにゃぁ″！ドュフフフ","は？","いぇ″～い！ニャンちゅうは今日も元気いっぱいにゃぁ″～！","な″～んということでしょう！ニャンちゅうは人気者でぇ″～す！","んにゃ″ぁ″ぁ″ぁ″ぁ″ぁ″ぁ",
          "み゛ぃとともだちになってくれるのかにゃあん！？","お゛に゛ぃさぁ゛ん！？","み゛ぃはま゛ぁだいぎでる゛に゛ゃあ゛あ゛あ゛あ゛ん゛！","ｶﾞｶﾞｶﾞ……ｼﾃ、ﾋﾟｰｶﾞｶﾞ…ｺｺｶﾗ…ﾀﾞｼ…ｶﾞｶﾞｶﾞｶﾞｶﾞｶﾞ","今日も素敵な一日だにゃ″ん！","お″ぉん″！！お″お″お″お″お″お″お″ぉ″ん！！！",
          "次のゼミが待ち遠しいにゃぁ″！","お″ねぇ″さ″ん″がいつのまにか40代になってたにゃぁ″...","やっぱりたまごかけご飯はおいしいにゃぁん！！","真の卵賭けご飯を見せてやるにゃ″ん！","お″ね″え″さんの生態を学会に発表したにゃ″ん！！","ぃや″っぱりぃ″！？"
          ,"FXで有り金全部溶かしたにゃ″ん″！！！","NHKの人ぉん、訴えないでくださぁ″い！"];
// botのプレイしているゲーム
const state = ["お″ねぇ″さ″ん","PLAYING","あ″い″ちゅあ″ん","PLAYING","あなた","WATCHING","滅びた世界","LISTENING","㊙ビデオ","WATCHING","コンピューターおばあちゃん","LISTENING","BlockRoom","WATCHING","3Dプリンタ","PLAYING",
               "カタン","PLAYING","湯沸し器","WATCHING","木島先生","WATCHING","卵かけご飯","WATCHING","深淵","WATCHING","君が代","LISTENING","毛髪","LISTENING","ニャンちゅう","PLAYING","天井","WATCHING","挫けた心","LISTENING",
               "ピクミン","PLAYING","スマブラ","PLAYING","スプラトゥーン","PLAYING","NHK","WATCHING","お姉さんの生態","WATCHING","お姉さんのお風呂","WATCHING","デュフｗコポォｗ","WATCHING","FX","PLAYING","パチンコ","PLAYING",
               "競馬","WATCHING","生命","LISTENING","ニャンちゅうといっしょ","WATCHING","おかあさんといっしょ","WATCHING","ニャンちゅう","WATCHING","夏目漱石","LISTENING","OculusQuest2","PLAYING","ViveCosmos","PLAYING",
               "FOVE0","PLAYING","情熱大陸","WATCHING","プロフェッショナル","WATCHING","ラーメン","WATCHING","地上の星","LISTENING","バーチャルボーイ","PLAYING","PlayStation","PLAYING","PlayStation2","PLAYING",
               "任天堂64","PLAYING","ゲームボーイ","PLAYING","ゲームキューブ","PLAYING","WiiFit","PLAYING","ファミコン","PLAYING","ゲーム&ウオッチ","PLAYING","おじゃる丸","WATCHING","しまじろう","WATCHING",
               "アンパンマン","WATCHING","アカシックレコード","WATCHING","メイドインアビス","WATCHING","オリンピック","PLAYING","ベルリンの壁","LISTENING","縺薙ｓ縺ｫ縺｡縺ｯ縺薙ｓ縺ｰ繧薙ｏ","PLAYING","ノートルダム大聖堂","LISTENING",
               "汚染された川","LISTENING","人生","LISTENING","仮想通貨","PLAYING","宝くじ","PLAYING","パチスロ","PLAYING","麻雀","PLAYING","24歳学生です。","PLAYING","玉ねぎ","PLAYING","タラバガニ","PLAYING","大根おろし","PLAYING",
               "個人民事","LISTENING","この虫野郎","WATCHING","例のアレ","WATCHING","作ってワクワク","WATCHING","焼肉","PLAYING","パラパラ","WATCHING","ピクミン4","PLAYING","スプラトゥーン3","PLAYING","PS5","PLAYING",
               "サツマイモ","PLAYING","塊魂","PLAYING","ポケモン","PLAYING","女の子","WATCHING","男の子","WATCHING","ヤクルト","PLAYING","吾輩は猫である","LISTENING","昆布茶","PLAYING","ミーは灰皿じゃないにゃ″ぁぁぁ！","PLAYING",
               "春はあけぼの","PLAYING","夏は夜","PLAYING","秋は夕暮れ","PLAYING","冬はつとめて","PLAYING","天才とは1%のひらめきと99%の努力である","PLAYING","あきらめたら、そこで試合終了ですよ","LISTENING","豆","PLAYING",
               "孤独な者よ、君は創造者の道を行く","LISTENING","天才とは努力する凡才のことである","LISTENING","我思う、故に我有り","LISTENING","くるくるくるりん","PLAYING","ミ”ーは食用じゃないにゅあ”ぁん！！","PLAYING"];
// 誰かがありがとうなど発言したときの返し
const thanks = ["サンキュでぇ～す！","ん優しい世界ぃ″！","ありがとうございまぁ″～す！","素敵だにゃ″ぁ！","にゃ″はは！","あったかいにゃ″ぁ","いぇ″～い″！！","んほぉ″～！！",
                "社会貢献だにゃ″ぁ！","お″ね″ぇさ″んも喜んでるにゃ″ぁ！","あぁ″＾～感謝の言葉がぴょんぴょんするんにゃ″ぁ～","はぁ″い！","感謝感謝にゃ″ぁ～","気持ちがええんにゃ″ぁ～",
                "やったぜ。","ありがとうは世界を救うにゃ″ぁ～","どゅ″ふ″ふ″、あったかいにゃ″～","おじさんもきっと喜んでるにゃ！"];
// 誰かがごめんなさいなど発言したときの返し
const apo = ["そういうときもあるにゃぁ","つぎからがんばればいいにゃぁ","しかたないにゃぁ","ミーも一緒にあやまるにゃぁ","はい、ごめんなさ″～い","ここはミーに任せてはやく逃げるにゃ”！","正直に謝ればみんな許してくれるにゃぁ",
             "きりかえていくにゃぁ","またつぎがあるにゃぁ","ここはミーに免じてゆるしてほしいにゃぁ”！","ボコルならミーをボコるにゃ！！","誰にでもしっぱいはあるにゃぁ"];


// サーバーを作成する
http.createServer(function(req, res){
  if (req.method == 'POST'){
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

// コンストラクタ
client.on('ready', message =>{
  console.log("Ready!");
  changeState();// プレイ中のゲーム名を変更
  client.channels.cache.get(GAME_CHANNEL).messages.fetch({ after: '0', limit: 20 })
  .then(messages => messages.forEach(message=>{if(message.id!=INST_TEXT&&message.id!=RANK_TEXT&&message.id!=DISP_TEXT) message.delete()}))// ゲームチャンネルのテキストメッセージを削除する
  client.channels.cache.get(GAME_CHANNEL).messages.fetch(DISP_TEXT);// ゲーム画面をキャッシュに保存
});

// 定時お知らせ　"秒　分　時間　日　月　曜日"を表す　*で毎回行う 0 22 * * * で毎朝7時に実行 時差9時間
cron.schedule('30 5 22 * * *', () => {
  notice(NOTICE_CHANNEL);
});
// ゼミ終了後にゼミ順を定時連絡する
cron.schedule('0 10 * * 1,2,4', () => {
  sendMsg(NOTICE_CHANNEL,returnOrder());
});
// ステータスの変更を定時に行う
cron.schedule('0 * * * *', () => {
  changeState();
});

// ボイスチャンネルが更新されたときの処理
client.on('voiceStateUpdate', (oldMember, newMember) => {
  const conn = client.voice.connections.get(GUILD_ID);
  if(newMember.channel !== null&&newMember.id!=client.user.id){// 誰かがボイスチャンネルに接続したらbotもそのチャンネルに接続する
    newMember.channel.join();
    console.log("接続　：　"+newMember.channel.name);
  }else if(conn && conn.channel && conn.channel.members.array().length < 2) {// ボイスチャンネルにbotしかいなくなった場合に切断する
    console.log("切断　：　"+conn.channel.name);
    disconnect();
  }
});

// ユーザがメッセージを投稿するとここが呼ばれる
client.on('message', message =>{
  // 匿名チャンネルの処理
  anony(message);
  // ゲームチャンネルの処理
  game(message);
  // 自分のコメントや他のbotに反応して無限ループしないようにする
  if (message.author.id == client.user.id || message.author.bot) return;
  // 特定のメッセージが含まれる文章は処理しない
  if(message.content.match(/http/)) return;
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
  // 迷路生成
  maze(message);
  // デバッグ用 @db
  debug(message);
  // NGワードは読み上げない
  for(var i=0;i<NGword.length;i++){
    if(message.content.match(NGword[i])) return;
  }
  // ボイスチャンネルに接続しているとき、入力されたメッセージを流す voiceTable[message.member.id%voiceTable.length] 'hikari', 'haruka', 'takeru', 'santa', 'bear', 'show'
  if(message.channel.id != GAME_CHANNEL&&message.channel.id != ANONY_CHANNEL&&client.voice.connections.get(GUILD_ID)!==undefined) {
    sayQueue.push(message);
    say();
  }
});

// トークンが設定されていない場合　.envにてDISCORD_BOT_TOKENを設定しておく必要あり
if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );// ログインする
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                Main Function                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 定時連絡のテキストを生成する関数
function notice(channel){
  var zemiId = 0;// zemiWeek及びzemiTime(ゼミ開始時刻)の配列番号
  let today = getTime();// 西暦(0),月(1),日(2),曜日(3),時間(4),分(5),和暦(6)の順の配列を返す
  for(var i=0;i<zemiWeek.length;i++){// 次のゼミがいつなのかを探る
    if(today[3]>zemiWeek[i]) zemiId=i+1;
    if(zemiId==zemiWeek.length) zemiId = 0;
  }
  let text = "おはようございます！\n"+today[1]+"月"+today[2]+"日"+weekIcon[today[3]]+week[today[3]]+"曜の朝がやってきました。\n";
  if(zemiWeek.indexOf(today[3])!=-1&&channel==NOTICE_CHANNEL) text += "本日"+zemiTime[zemiId*2]+"時"+zemiTime[zemiId*2+1]+"分からゼミの予定です。\n発表者は"+returnMention(zemiName)+returnAddNameMention(addName)+"です。\n";// ゼミ当日発表者に@メンション
  else text += "次回のゼミは"+weekIcon[zemiWeek[zemiId]]+week[zemiWeek[zemiId]]+"曜の"+zemiTime[zemiId*2]+"時"+zemiTime[zemiId*2+1]+"分からです。\n発表者は**"+combiName(name[zemiName],addName)+"**です。\n";// ゼミが無い日
  if(today[3] == 2 || today[3] == 5) text += ":bell:燃えるゴミの日";// 火曜日と金曜日
  if(today[3] == 3 || today[3] == 5) text += ":bell:工学実験TA(3限)";// 水曜日と金曜日
  if(today[3] == 4 && today[2]<=6)   text += makeSurText("明日は段ボール回収の日","＃");// 第一木曜日
  if(today[3] == 5 && today[2]<=7)   text += "\n"+makeSurText("今日は段ボール回収の日","＊");// 第一金曜日
  if(today[3] == 6) text+=today[0]+"年(令和"+today[6]+"年"+zodiac[(today[0]-2020)%12]+"年)は残り"+remainingDays(today[1],today[2],1,1)+"日です。";// 毎週土曜日に今年の残りの日数を通知
  if(noticeList.length>0){
    text+="\n**☆みんなのお知らせ☆**\n";
    for(var i=0;i<noticeList.length;i+=2){
      text+=noticeList[i]+"\n";
      noticeList[i+1]--;
    }
  }
  judgeNoticeList();// 期限が切れたお知らせを削除する
  weatherForecast().then(res=>{// 天気予報の追加
    text += res[0];
    text += res[1];
    sendMsg(channel,text);
  })
  save();
}
// メッセージに対する反応を行う
function react(message){
  if(message.channel.id!=NOTICE_CHANNEL && message.channel.id!=TEACHER_CHANNEL){
    const REACTION= "762647337461874709";// ニャンちゅうスタンプID
    if(message.content.match(/にゃん|ニャン|ちゅう|チュウ/)){
      sendMsg(message.channel.id," "+res[Math.round(Math.random()*(res.length-1))]);   
      message.react(REACTION);
      return;
    }
    if(message.content.match(/ありが|あざ|サン|さんきゅ|さんくす/)){
      sendMsg(message.channel.id," "+thanks[Math.round(Math.random()*(thanks.length-1))]);
      message.react(REACTION);
      return;
    }
    if(message.content.match(/すみません|ごめん|すまん|申し訳/)){
      sendMsg(message.channel.id," "+apo[Math.round(Math.random()*(apo.length-1))]);
      message.react(REACTION);
      return;
    }
    if(message.content.match(/うるさい|だま|黙|しずかに|静かに|やっぱり/)){
      let text = "ぃや″っぱりぃ″！？";
      sendMsg(message.channel.id,text);
      message.react(REACTION);
      return;
    }
    if(message.content.match(/なんで|どうして/)){
      sendMsg(message.channel.id,"にゃ″んでぇ！？にゃ″～んでぇ！？");
      message.react(REACTION);
      return;
    }
    if(message.content.match(/すご|やば|素晴し|すばらし|すげ|やべ|凄|いいね|やる|流石/)){
      sendMsg(message.channel.id,"こぉ″れを芸術と呼ばずしてにゃ″んと申しましょうか～！");
      message.react(REACTION);
      return;
    }
    if(message.content.match(/正解|違|合って|どうですか|ちが|その通り/)){
      sendMsg(message.channel.id,"ちっがぁいあ″りませ～ん″！");
      message.react(REACTION);
      return;
    }
  }
}
// ゼミ開始の処理
function zemi(message){
  if (message.content.match(/zemi|ゼミ始|ゼミです|ゼミやりま|ゼミっす|ゼミ。|ぜみ。|ゼミ開始|ぜみ開始/)){
    let text = "everyone\nゼミが始まります！\n**発表者："+combiName(name[zemiName],addName)+"**\n司会　："+returnName(name[(zemiName+2)%name.length]);
    speak("今日のゼミの発表者は、"+combiName(name[zemiName],addName)+"です。"+"司会は"+returnName(name[(zemiName+2)%name.length])+"です。よろしくお願いします。",voiceTable[Math.floor(Math.random()*voiceTable.length)]);
    if(message.channel.id==BOT_CHANNEL){
      sendMsg(BOT_CHANNEL,"http"+text);
    }else {
      text = "@"+text;
      sendMsg(NOTICE_CHANNEL,text);
      opeZemi(1);
      clearAddName();
    }
    if(message.content.match(/zemi/)) message.delete();
    save();
    return;
  }
}
// ゼミ順を前に移動する for
function back(message){
  if(message.content.match(/back/)){
    opeZemi(-1);
    save();
    sendReply(message,"発表者順を１つ前に移動しました。\n次の発表者は"+combiName(name[zemiName],addName)+"さんです。");
    message.delete();
    return;
  }
}
// ゼミ順を後ろに移動する back
function forward(message){
  if(message.content.match(/for/)){
    opeZemi(1);
    save();
    sendReply(message,"発表者順を１つ後に移動しました。\n次の発表者は"+combiName(name[zemiName],addName)+"さんです。");    
    message.delete();
    return;
  }
}
// ゼミ順を確認する next
function next(message){
  if(message.content.match(/next/)){
    let text = returnOrder();
    sendMsg(message.channel.id, text);
    message.delete();
    return;
  }
}
// 積み残しの人を追加する add
function add(message){
  if(message.content.match(/add/)){
    var str = message.content.split(" ");
    var text = "以下の人を次のゼミ発表者に追加しました：";
    if(str.length>1){
      var judgeLength = 0;
      for(var i=1;i<str.length;i++){
        if(str[i].length <= 5) {
          text += addAddName(str[i]);
          if(i!=str.length-1 && str[i]!=="") text+="、";
        }
        if(str[i].length > judgeLength) judgeLength = str[i].length;
      }
      if(judgeLength>5) text += "\n名前が長すぎる人はミ″ーには覚えられなかったにゃ″ぁ";
    }else{
      text = "add 名前 名前 ... のように半角スペースで区切って教えてくれないとミ″ーには難しいにゃ″ぁ";
    }
    save();
    sendMsg(message.channel.id, text);
    message.delete();
    return;
  }
}
// 積み残しリストを削除する take
function take(message){
  if(message.content.match(/take/)){
    clearAddName();
    var text = "積み残しリストを削除しました。";
    save();
    sendMsg(message.channel.id, text);
    message.delete();
    return;
  }
}
// メッセージを送った人のいるボイスチャンネルに接続する join
function join(message){
  if (message.content.match(/join/)) {
    let ch = message.member.voice.channel;
    if(ch==null)sendMsg(message.channel.id, "ボイスチャンネルに入室してからjoinと命令してください。");
    else message.member.voice.channel.join();
    console.log(ch+"に接続");
    message.delete();
    return;
  }
}
// ボイスチャンネルから切断する leave
function leave(message){
  if (message.content.match(/leave/)) {
    if(client.voice.connections.get(GUILD_ID)==null)sendMsg(message.channel.id, "botがボイスチャンネルに入室していません。");
    else disconnect();
    console.log("ボイスチャンネルから退出");
    message.delete();
    return;
  }
}
// 読み上げに教育する teach
function teachVoice(message){
  if (message.content.match(/teach/)) {
    var str = message.content.split(" ");
    if(str.length==3){
      teach.push(str[1]);
      teach.push(str[2]);
      sendMsg(message.channel.id, teachText());
      save();
    }else{
      sendMsg(message.channel.id, "「teach 読み方を変更する文字列 読み方」のように入力してください。");
    }
    message.delete();
    return;
  }
}
// 教育を削除する clear
function clearVoice(message){
  if (message.content.match(/clear/)) {
    var str = message.content.split(" ");
    if(str.length==2){
      var loop = teach.length;
      for(var i=0;i<loop;i+=2){
        if(teach[i]===str[1]) teach.splice(i,2);
      }
      sendMsg(message.channel.id, teachText());
      save();
    }else{
      sendMsg(message.channel.id, "「clear 削除したい文字列」のように入力してください。");
    }
    message.delete();
    return;
  }
}
// カスタムお知らせを追加する　set
function setNoticeList(message){
  if (message.content.match(/set/)) {
    if(message.content.match(/,/)){
      sendMsg(message.channel.id, "「,」の文字は使えません。");
      return;
    }
    var str = message.content.split(" ");
    if(str.length==4){
      let time = getTime();
      let remain = remainingDays(time[1],time[2],str[2],str[3]);
      noticeList.push(message.member.displayName.substr(0,2)+"："+str[1]);
      noticeList.push(remain);
      sendMsg(message.channel.id, "「"+message.member.displayName.substr(0,2)+"："+str[1]+"」を毎朝のお知らせに追加しました。残り"+remain+"日間表示されます。");
      save();
    }else{
      sendMsg(message.channel.id, "「set お知らせに追加した文章 月 日」のように入力してください。");
    }
    message.delete();
    return;
  }
}
  // 文字数を計測する len
function len(message){
  if(message.content.match(/len/)){
    var str = message.content.split(" ");
    var sum = str.length-2;
    var space = 0;
    var line = 0;
    for(var i=1;i<str.length;i++){
      sum += str[i].length;
      space += ( str[i].match( /　/g ) || [] ).length
      line += ( str[i].match( /\n/g ) || [] ).length
    }
    let text = "文字数(全角スペース込み)："+(sum-line)+"文字\n文字数(全角スペース抜き)："+(sum-line-space-str.length+2)+"文字\n行数："+(line+1)+"行";
    sendMsg(message.channel.id,text);
    message.delete();
    return;
  }
}
// ランダムセレクト sel
function sel(message){
  if (message.content.match(/sel/)){
    var str = message.content.split(" ");
    var sN = Number(str[1]);
    if(str[1]==null) sN=1;
    var list = memberList.slice();// メンバーリストを複製する
    var loop = list.length-sN;// リストの長さ-指定回数分メンバーリストからランダムに削除する
    for(var i=0;i<loop;i++){
      list.splice(parseInt(Math.random()*list.length),1);
    }
    sendMsg(message.channel.id, "選ばれたのは"+returnName(list)+"でした。");
    message.delete();
    return;
  }
}
// デバッグ用 @db
function debug(message){
  if(message.content.match(/@db/)){
    //client.channels.cache.get(GAME_CHANNEL).messages.cache.get(RANK_TEXT).edit(rank(0,"a"));
    //client.channels.cache.get(GAME_CHANNEL).messages.cache.get(DISP_TEXT).react("⬆️");// ランキング更新
    //client.channels.cache.get(GAME_CHANNEL).messages.cache.get(DISP_TEXT).react("⬇️");// ランキング更新
    //client.channels.cache.get(GAME_CHANNEL).messages.cache.get(DISP_TEXT).react("⬅️");// ランキング更新
    //client.channels.cache.get(GAME_CHANNEL).messages.cache.get(DISP_TEXT).react("➡️");// ランキング更新
    message.delete();
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Function                                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// リプを飛ばす
function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信"))
    .catch(console.error);
}
// 指定したチャンネルにメッセージを送る
function sendMsg(channelId, text, option={}){
  client.channels.cache.get(channelId).send(text, option)
    .then(console.log("メッセージ送信{\n"+text.substr(0,50)+"\n}"))
    .catch(console.error);
}
// BOTをボイスチャンネルから退出させる
function disconnect(){
  client.voice.connections.get(GUILD_ID).disconnect();
  sayFlag = false;
  sayQueue = [];
}
// 提示お知らせリストを条件を見て削除する
function judgeNoticeList(){
  var loop = noticeList.length;
  for(var i=0;i<loop;i+=2){
    if(noticeList[i+1]==0) noticeList.splice(i,2);
  }
  console.log(noticeList);
}
// 通常の発表者と積み残しの発表者名を結合して返す
function combiName(zemi,add){
  let text = returnName(zemi);
  if(add.length>1) text+=returnName(add);
  return text;
}
// 名前の配列を渡すと、テキストの形に連結してくれる
function returnName(name){
  let text = "";
  for(var i=0;i<name.length;i++){
    text+=name[i];
    if(i!=name.length-1) text+="、";
  }
  return text;
}
// 指定した発表者番号渡すと、発表者グループをメンションする文字列を返す
function returnMention(num){
  let text = "";
  for(var i=0;i<id[num].length;i++){
    text += "<@"+id[num][i]+">";
  }
  return text;
}
// 指定した発表者番号を渡すと、その人だけをメンションする文字列を返す
function returnMonoMention(num){
  let text = "";
  let sum = 0;
  for(var i=0;i<id.length;i++){
    for(var j=0;j<id[i].length;j++){
      if(sum==num) text+="<@"+id[i][j]+">";
      sum++;
    }
  }
  return text;
}
// 積み残しの人をメンションする文字列を返す
function returnAddNameMention(array){
  let text="";
  let num = 0;
  for(var k=0;k<array.length;k++){
    num = 0;
    for(var i=0;i<name.length;i++){
      for(var j=0;j<name[i].length;j++){
        if(array[k]===name[i][j]) {
          text += returnMonoMention(num);
        }
        num++;
      }
    }
  }
  return text;
}
// ゼミ順を移動する
function opeZemi(num){
  zemiName += num;
  if(zemiName<0) zemiName = name.length-1;
  else if(zemiName>name.length-1) zemiName = 0;
}
// 一周期分のゼミ順を返す
function returnOrder(){
  let text = "**　　☆発表者順☆**\n**:arrow_right:　";
  text += combiName(name[zemiName],addName)+"**\n";
  for(var i=1;i<name.length;i++){
    text += ":arrow_up:　"+returnName(name[(zemiName+i)%6])+"\n";
  }
  return text;
}
// 積み残しリストに追加する
function addAddName(str){
  let text = "";
  if(str!==""){
    addName.push(str);
    text+=str+" ";
  }
  return text;
}
// 積み残しリストを初期化する
function clearAddName(){
  addName = [""];
}
// botにボイスチャンネルで発言させる
function say(){
  if(sayQueue.length&&!sayFlag){// キューにメッセージがあり、BOTが発言中でない場合
    var msg = sayQueue.shift();// メッセージをリストから取り出す
    var speaker = voiceTable[msg.member.id%voiceTable.length];// 読み上げる声をIDから決定する
    var sayText = msg.member.displayName.substr(0,2)+"、"+msg.content;// 読み上げる内容を決定する
    speak(sayText,speaker);
  }
}
// テキストとスピーカーを指定してボイスチャンネルで発言する
function speak(text,speaker){
  for(var i=0;i<teach.length;i+=2){
    text = text.split(teach[i]).join(teach[i+1]);
  }
  sayFlag = true;
  voicetext.fetchBuffer(text, { speaker:speaker,format: 'ogg' })
  .then((buffer) => {
    writeFileSync('voice.ogg', buffer);
    var dispatcher = client.voice.connections.get(GUILD_ID).play('voice.ogg');
    dispatcher.once('finish', () => {
      sayFlag = false;
      say();
    })
  });
}
// ファイルに書き込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function save(){
  let text = zemiName+","+anonyId+",";
  if(addName.length==1) text+="none\n";
  else text+=addName.join(",")+"\n";
  if(teach.length==0) text+="none\n";
  else text+=teach.join(",")+"\n";
  if(noticeList.length==0) text+="none\n";
  else text+=noticeList.join(",")+"\n";
  text+=ranking.join(",")+"\n";
  fs.writeFile("tex.txt", text, (err) => {
    if (err) throw err;
  });
}
// ファイルを読み込む
// 0:ゼミ周期ID 1:匿名掲示板番号 2:積み残しリスト 3:ゲームランキング
function load(){
  fs.readFile("tex.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let d = data.split("\n");
    let str = d[0].split(",");
    let td = d[1].split(",");
    let nd = d[2].split(",");
    let rd = d[3].split(",");
    zemiName = Number(str[0]);
    anonyId = str[1];
    if(str[2]!=="none"){
      for(var i=1;i<str.length-2;i++){
        addName.push(str[i+2]);
      }
    }
    if(td[0]!=="none")teach = td;
    if(nd[0]!=="none")noticeList = nd;
    ranking = rd;
  });
}
// ステータスをランダムに変更する
function changeState(){
  let p = Math.floor(Math.random()*(state.length/2));
  client.user.setPresence({ activity: { name: state[2*p] ,type:state[2*p+1]} });
}
// テキストを指定した文字列で囲んだものを生成する
function makeSurText(str,kind){
  var text = "";
  for(var i=0;i<str.length+2;i++) text+=kind;
  text+="\n"+kind+str+kind+"\n";
  for(var i=0;i<str.length+2;i++) text+=kind;
  return text;
}
// 指定した文字列に結合したときに指定した文字数になるように空白をつけて返す
function makeEmpty(str,n,mode){
  var loop = n-str.length;
  for(var i=0;i<loop;i++){
    if(mode==0) str+=" ";
    else str+="　";
  }
  return str;
}
// 西暦,月,日,曜日,時間,分,和歴を日本時間になおして返す
function getTime(){
  const now = new Date();
  now.setTime(now.getTime()+9*3600*1000);// 日本時間に補正
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let todayWeek = now.getDay();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let era = year-2018;
  let output = [year,month+1,day,todayWeek,hour,minutes,era];
  return output;
}
// 指定した日にち(month1,day1)から指定した日にち(month2,day2)までの残りの日数を返す
function remainingDays(month1,day1,month2,day2){
  if(month1==month2&&day1<=day2) return day2-day1;
  else{
    let thisMonthRemainingDays = monthDay[month1-1]-day1;
    let thatMonthRemainingDays = day2;
    let monthDifference = month2-month1-1;
    if(monthDifference<0) monthDifference+=12;
    let sumDays = 0;
    for(var i=0;i<monthDifference;i++){
      sumDays+=monthDay[(month1+i)%12];
    }
    return thisMonthRemainingDays+thatMonthRemainingDays+sumDays;
  }
}
// 今日の天気予報の文字列をpromiseで返す
function weatherForecast(){
  var text1 = "\n**☆本日の岐阜市の天気予報☆**\n";
  var text2 = "\n**☆岐阜市の週間天気予報☆**\n";
  var req = unirest("GET", "http://api.openweathermap.org/data/2.5/onecall?lat=35.4232&lon=136.7606&units=metric&lang=ja&appid=7f9fb408b66bcb820ef71aa80ab569cd");// 岐阜市の天気をもらってくる
  return new Promise((resolve, reject) => { 
    req.end(function (res) {
      console.log(res.body.current);
      console.log(res.body.daily[0]);
      //console.log(res.body);
      var hourName = [":sunrise_over_mountains:07時 ： ",":sun_with_face:12時 ： ",":sunrise:18時 ： "];
      var hour = [0,5,11];
      for(var i=0;i<3;i++){
        text1+=hourName[i]+returnWeatherIcon(res.body.hourly[hour[i]].weather[0].icon)+"("+makeEmpty(res.body.hourly[hour[i]].weather[0].description+")",6,1);
        text1+="気温"+makeEmpty(Math.round(res.body.hourly[hour[i]].temp)+"℃",4,0)+"\n";
      }
      let time = getTime();
      let tw = time[3];
      for(var i=0;i<7;i++){
        text2+=weekIcon[(tw+i)%7]+week[(tw+i)%7]+"曜 ： "+returnWeatherIcon(res.body.daily[i].weather[0].icon)+"("+makeEmpty(res.body.daily[i].weather[0].description+")",6,1);
        text2+=":arrow_up: "+Math.round(res.body.daily[i].temp.max)+"℃　:arrow_down: "+Math.round(res.body.daily[i].temp.min)+"℃\n";
      }
      var text = [text1,text2];
      return resolve(text);
    });
  })
}
// iconの値から天気の絵文字を返す
function returnWeatherIcon(iconName){
  const iconStr = [":sunny:",":white_sun_small_cloud:",":white_sun_cloud:",":cloud:",":cloud_rain:",":umbrella:",":thunder_cloud_rain:",":snowflake:",":fog:",":boom:"];
  const iconID = ["01","02","03","04","09","10","11","13","50"];
  for(var i=0;i<iconID.length;i++){
    if(iconName.match(iconID[i])) return iconStr[i];
  }
  return iconStr[9];
}
// 教育文字一覧のテキストを返す
function teachText(){
  let text = "";
  for(var i=0;i<teach.length;i+=2){
    text+=teach[i]+"　:arrow_forward:　"+teach[i+1];
    if(i!=teach.length-2) text+="\n";
  }
  return text;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Anony CHANNEL                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function anony(message){
  if(message.channel.id == ANONY_CHANNEL){
    if(message.author.id == client.user.id) return;
    anonyId++;
    save();
    let text = "("+anonyId+")\n"+message.content;
    message.delete();
    sendMsg(ANONY_CHANNEL,text);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Game CHANNEL                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class State{
  constructor(y,x,st){
    this.x = x;
    this.y = y;
    this.st = st;
  }
}

class Nyanchu{
  constructor(y,x){
    this.x = x;
    this.y = y;
    this.hp = 3;
    this.turn = 0;// 経過ターン
    this.breakPoint = 0;// 壁を壊せる回数
    this.landmines = 0;// 地雷の個数
    this.stop = 0;// 時間を停止できる回数
    this.stopCnt = 0;// 時間が停止する残りターン数
    this.score = 0;// スコア
    this.clear = false;//クリア判定
  }
}

class Enemy{
  constructor(y,x){
    this.x = x;
    this.y = y;
  }
  move(H,W,field,nyan){
    var st = dijkstra(H,W,field,nyan.x,nyan.y,this.x,this.y);
    if(st!==null){
      this.x = st.x;
      this.y = st.y;
    }
    if(field[this.y][this.x]==9){// 地雷の処理
      for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
          if(!(this.y-1+i==1&&this.x-1+j==1)) field[this.y-1+i][this.x-1+j] = 1;
        }
      }
      nyan.score+=500;
      flavorText = "やったー！敵を閉じ込めたにゃ″ん！";
    }
    if(field[this.y][this.x]==11){
      var xy = warp(this.x,this.y);
      this.x = xy[0];
      this.y = xy[1];
    }
    if(nyan.x==this.x&&nyan.y==this.y){
      gameOver = true;
      flavorText = "おばけにゃああ！！怖いにゃああ！！！";
    }
  }
}

class Bomb{
  constructor(y,x){
    this.x = x;
    this.y = y;
  }
}
// 下、左、上、右
const dx = [0,-1,0,1];
const dy = [1,0,-1,0];
let field;
const H = 11;
const W = 11;
let gameMsg=[];
let nyan;
let enemy;
let bomb;
let flavorText;
var gameOver = true;
const objectName = ["玉ねぎ","土星","たらい","ゴマダレ","画鋲","つらら","新幹線","イガグリ","海水","ゴミ","だるまさん","おねぇ″さ″ん","おじさん","犯罪者","ブラジル","たまごかけご飯","仮想空間","ハヤシライス","家族","福沢諭吉","３兆円","岐阜大学",
                    "女子高生","女子アナ","女子大生","小学生","ブラックホール","タモリ","お団子","ハイエンドPC","木島先生","マッチョ","シイタケ","人工知能","安西先生","NHK","もう一人のミー","ピクミン"];
const objectMinusVerb = ["が降ってきた","が目に入った","を踏んだ","とぶつかった","に背後から襲われた","に殴られた","を踏み抜いた","に突き刺さった","で転んだ","に激突した","にビンタされた","に潰された"];
const objectPlusVerb = ["に癒された","を食べて元気が出た","と出会ってうれしい","と一緒に踊った","が応援してくれた","が励ましてくれた","に囲まれて幸せ","に抱きしめられた","の一発ギャグが面白かった","を手に入れてうれしい"];

client.on('messageReactionAdd', async (reaction, user) => {
   console.log(`${reaction.message.guild} で ${user.tag} が ${reaction.emoji.name} をリアクションしました`);
 })

// ゲームの処理を行う
function game(message){
  if(message.channel.id==GAME_CHANNEL){
    if(message.author.id!=client.user.id){
      // 初期化
      if(gameOver){
        let fieldText = makeMaze(H,W);
        // フィールド生成
        field = new Array(H);
        for(var i=0;i<H;i++){
          field[i] = new Array(W).fill(1);
        }
        // フィールドテキストを参照、通路を判定し数値に変換する
        for(var i=0;i<H;i++){
          for(var j=0;j<W;j++){
            if(fieldText[i+1][j+1]==="　") field[i][j] = 0;
          }
        }
        field[H-3][W-2] = 0;//初期位置のとなりは通路
        field[H-2][W-3] = 0;//初期位置のとなりは通路
        situate(H,W,field,0,7,1);  // 壁をいくつか通路に変換する
        situate(H,W,field,2,10,0); // ダメージポイントを生成
        situate(H,W,field,3,12,0); // 回復ポイントを生成
        situate(H,W,field,4,6,0);  // 壁壊しポイントを生成
        situate(H,W,field,5,6,0);  // 地雷ポイントを生成
        situate(H,W,field,12,2,0); // 停止ポイントを生成
        situate(H,W,field,11,2,1); // ワープポイントを生成
        field[1][1] = 6;// ゴール
        enemy = [];
        bomb = [];
        nyan = new Nyanchu(H-2,W-2);
        flavorText="レッツスタートにゃ～！";
        let enemyNum = 3;
        en:while(enemyNum){
          let eX = Math.floor(Math.random()*(W-1))+1;
          let eY = Math.floor(Math.random()*(H-1))+1;
          if(eX>=W-5&&eY>=H-5) continue;
          for(var i=0;i<enemy.length;i++){
            if(enemy[i].x==eX&&enemy[i].y==eY) continue en;
          }
          if(field[eY][eX]==0){
            enemy.push(new Enemy(eY,eX));
            enemyNum--;
          }
        }
        //for(var i=0;i<3;i++) enemy.push(new Enemy(Math.floor(Math.random()*(H-4))+1,Math.floor(Math.random()*(W-4))+1));
        gameOver = false;
      }else{// メインループ
        if(message.content.match(/w|か/)) moveNyan(nyan.y-1,nyan.x);
        else if(message.content.match(/s|な/)) moveNyan(nyan.y+1,nyan.x);
        else if(message.content.match(/d|は/)) moveNyan(nyan.y,nyan.x+1);
        else if(message.content.match(/a|た/)) moveNyan(nyan.y,nyan.x-1);
        else if(message.content.match(/r|わ/)) gameOver = true;
        else if(message.content.match(/q|あ/)) {
          if(nyan.landmines==0){
            flavorText = "地雷を持ってないにゃん！";
            display(H,W,field,message);// フィールドをGAME_CHANNELに描画
            message.delete();
            return;
          }
          bomb.push(new Bomb(nyan.y,nyan.x));
          nyan.landmines--;
          field[nyan.y][nyan.x] = 9;
        }
        else if(message.content.match(/e|さ/)){
          if(nyan.stop==0){
            flavorText = "時を止められないにゃん！";
            display(H,W,field,message);// フィールドをGAME_CHANNELに描画
            message.delete();
            return;
          }
          nyan.stopCnt+=4;
          nyan.stop--;
        }
        processEvent(message);
        if(nyan.stopCnt==0){
          nyan.turn++;
          if(field[nyan.y][nyan.x]!=9){
            for(var i=0;i<enemy.length;i++){
              enemy[i].move(H,W,field,nyan);
            }
          }
        }else{
          nyan.stopCnt--;
          flavorText = "残り"+nyan.stopCnt+"ターン時を止めるにゃ！";
        }
      }
      display(H,W,field,message);// フィールドをGAME_CHANNELに描画
      message.delete();
    }else{
      if(gameMsg.length){
        if(gameMsg[gameMsg.length-1].content.indexOf("☆")!=-1){
        // 前フレームのメッセージを削除する
        for(var i=0;i<gameMsg.length;i++){
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
function situate(H,W,field,id,num,mode){
  while(num){
    var sx = Math.floor(Math.random()*(W-2)+1);
    var sy = Math.floor(Math.random()*(H-2)+1);
    if(field[sy][sx]==mode&&!(sy>H-4&&sx>W-4)&&!(sy==1&&sx==1)) {
      field[sy][sx]=id;
      num--;
    }
  }
  return field;
}
// 迷路をテキストにして送信
function display(H,W,field,message){
  const fieldIdToText = [':white_large_square:',':white_square_button:',':red_square:',':blue_square:',':green_square:',':green_square:',':yellow_square:','<:nyan:786216879663874109>','<:obake:786217527675453460>','<:bakudan:786221416261353482>','<:death:767774739195494480>',':purple_square:',':green_square:'];
  let text = "プレイヤー：";
  if(nyan.turn==0||nyan.clear||gameOver){
    text+="no player\n";
  }else{
    text+=message.member.displayName+"　"+nyan.turn+"ターン目\n";
  }
  for(var i=1;i<H-1;i++){
    for(var j=1;j<W-1;j++){
      let t = fieldIdToText[field[i][j]];
      for(var k=0;k<enemy.length;k++){// 敵の描画
        if(i==enemy[k].y&&j==enemy[k].x) t=fieldIdToText[8];
      }
      if(i==nyan.y&&j==nyan.x) {
        if(!gameOver||nyan.clear) t=fieldIdToText[7];//ニャンちゅう描画
        else t=fieldIdToText[10];// ニャンちゅうの遺影
      }
      text+=t;
    }
    text+="\n";
  }
  if(gameOver&&!nyan.clear) text+=":red_square:　　GAME OVER　　:red_square:\n";
  text+="HP："+nyan.hp+"　破壊："+nyan.breakPoint+"　地雷："+nyan.landmines+"　停止："+nyan.stop+"　スコア："+nyan.score;
  text+="\nニャンちゅう「"+flavorText+"」";
  client.channels.cache.get(GAME_CHANNEL).messages.cache.get(DISP_TEXT).edit(text+"☆");// ディスプレイ更新
}
// -1 動けない 0 動いた 1 壁を破壊した
function moveNyan(y,x){
  if(y<1||y>H-1||x<1||x>W-1) return -1;
  if(field[y][x] == 1){
    if(nyan.breakPoint>0){
      nyan.x = x;
      nyan.y = y;
      nyan.breakPoint--;
      return 1;
    }else{
      return -1;
    }
  }else{
    nyan.x = x;
    nyan.y = y;
  }
  return 0;
}
// 止まったマス目のイベント処理を行う
function processEvent(message){
  if(field[nyan.y][nyan.x]==0){
    flavorText="何も無いにゃ。";
  }else if(field[nyan.y][nyan.x]==1){
    flavorText="壁の中にいるにゃ。";
  }else if(field[nyan.y][nyan.x]==2) {
    nyan.hp--;
    flavorText=objectName[Math.floor(Math.random()*objectName.length)]+objectMinusVerb[Math.floor(Math.random()*objectMinusVerb.length)]+"にゃ″ん！(1ダメージ)";
  }else if(field[nyan.y][nyan.x]==3) {
    nyan.hp++;
    nyan.score+=50;
    flavorText=objectName[Math.floor(Math.random()*objectName.length)]+objectPlusVerb[Math.floor(Math.random()*objectPlusVerb.length)]+"にゃ″ん！(HP1回復)";
  }else if(field[nyan.y][nyan.x]==4) {
    nyan.breakPoint++;
    nyan.score+=50;
    flavorText=objectName[Math.floor(Math.random()*objectName.length)]+"が壁を壊す力を授けてくれたにゃ″ん！(破壊+1)";
  }else if(field[nyan.y][nyan.x]==5) {
    nyan.landmines++;
    nyan.score+=50;
    flavorText=objectName[Math.floor(Math.random()*objectName.length)]+"が地雷をくれたにゃ″ん！(地雷+1)";
  }else if(field[nyan.y][nyan.x]==6){
    gameOver = true;
    nyan.clear = true;
    flavorText="迷路から脱出できたにゃ″ん！";
    nyan.score+=nyan.hp*50+(50-nyan.turn)*20;
    console.log(nyan.score);
    let text = rank(nyan.score,message.member.displayName);
    client.channels.cache.get(GAME_CHANNEL).messages.cache.get(RANK_TEXT).edit(text);// ランキング更新
  }else if(field[nyan.y][nyan.x]==9) {
    flavorText="地雷が置いてあるにゃ″ん！";
    return;
  }else if(field[nyan.y][nyan.x]==11){
    flavorText="ワープしたにゃ″ん！";
    var xy = warp(nyan.x,nyan.y);
    nyan.x = xy[0];
    nyan.y = xy[1];
    return;
  }else if(field[nyan.y][nyan.x]==12){
    flavorText=objectName[Math.floor(Math.random()*objectName.length)]+"が時を止める能力をくれたにゃん！";
    nyan.stop++;
    nyan.score+=50;
  }
  field[nyan.y][nyan.x]=0;
  if(nyan.hp<=0||(gameOver&&!nyan.clear)) {
    gameOver=true;
    flavorText="にゃんちゅうは死んだよ";
  }
}

// スコアを入れるとランキングのテキストを出力してくれる
function rank(score,name){
  let alreadyExist=-1;
  for(var i=0;i<5;i++){
    if(ranking.indexOf(name)!=-1) alreadyExist=ranking.indexOf(name);
  }
  if(alreadyExist!=-1){// ランキングに名前がある場合
    if(ranking[alreadyExist+1]<=nyan.score) ranking[alreadyExist+1] = nyan.score;// スコア更新出来たらランキングを更新
    // ランキングのソート
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(Number(ranking[j*2+1])<Number(ranking[(j+1)*2+1])) {
          let tmpName = ranking[j*2];
          ranking[j*2]=ranking[(j+1)*2];
          ranking[(j+1)*2] = tmpName;
          let tmpScore = ranking[j*2+1];
          ranking[j*2+1] = ranking[(j+1)*2+1];
          ranking[(j+1)*2+1] = tmpScore;
        }
      }
    }
  }else{// ランキングに名前が無い場合
    for(var i=0;i<5;i++){
      if(ranking[i*2+1]<=nyan.score){// スコアが高かったら挿入＆末尾削除
        ranking.splice(i*2,0,nyan.score);
        ranking.splice(i*2,0,name);
        ranking.pop();
        ranking.pop();
        break;
      }
    }
  }
  save();
  let text = "☆ランキング☆\n";
  for(var i=0;i<5;i++){
    text+=i+1+"位："+ranking[i*2]+"("+ranking[i*2+1]+"点)\n";
  }
  return text;
}

// 現在の位置から別のワープますの座標を割り出す
function warp(x,y){
  warp :for(var i=0;i<H;i++){
    for(var j=0;j<W;j++){
      if(i==y&&j==x) continue;
      if(field[i][j]==11) {
        return [j,i];
      }
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 迷路生成プログラム
function maze(message){
  if(message.content.match(/maze/)){
    var str = message.content.split(" ");
    if(str.length!=3) {
      sendMsg(message.channel.id,"「maze 横幅 縦幅」と入力してください。");
      return;
    }
    // フィールド用意
    var H = Number(str[2]);
    var W = Number(str[1]);
    let field = makeMaze(H,W);
    // 出力
    let text = "めいろ(左上スタート,右下ゴール)\n";
    for(var i=1;i<=H;i++){
      for(var j=1;j<=W;j++){
        text+=field[i][j];
      }
      if(text.length>1900){
        sendMsg(message.channel.id,text);
        text="";
      }
      text+="\n";
    }
    sendMsg(message.channel.id,text);// 迷路出力
    text = "最短経路〇　探索範囲＊\n";
    field = dijkstra(H,W,field,2,2,H-1,W-1);
    for(var i=1;i<=H;i++){
      for(var j=1;j<=W;j++){
        text+=field[i][j];
      }
      if(text.length>1900){
        sendMsg(message.channel.id,text);
        text="";
      }
      text+="\n";
    }
    sendMsg(message.channel.id,text);// 迷路出力
    message.delete();
  }
}

// 穴掘り法でW×Hの迷路を生成する
function makeMaze(H,W){
  if(H%2==0) H++;
  if(W%2==0) W++;
  let field = new Array(H+2);
  for(var i=0;i<H+2;i++){
    field[i] = new Array(W+2).fill("□");
  }
  for(var i=0;i<H+2;i++){
    for(var j=0;j<W+2;j++){
      if(i==0||j==0||i==H+1||j==W+1) field[i][j] = "　";
    }
  }
  // 迷路生成
  var open = [];
  var fx = Math.floor(Math.random()*(W-1)/2+1)*2;
  var fy = Math.floor(Math.random()*(H-1)/2+1)*2;
  open.push(new State(fy,fx,0));// 初期位置指定
  field[fy][fx] = "　";
  while(open.length){
    var rand = Math.floor(Math.random()*open.length);
    var tmp = open.splice(rand,1);
    var st = tmp[0];
    // 四方向に伸ばせない場合はcontinue
    var sum = 0;
    for(var i=0;i<4;i++){
      if(field[st.y+dy[i]*2][st.x+dx[i]*2]==='□') sum++;
    }
    if(sum==0) continue;
    else if(sum>1) open.push(st);
    // ランダムに方向決定
    while(true){
      var dir = Math.floor(Math.random()*4);
      if(field[st.y+dy[dir]*2][st.x+dx[dir]*2]==='□'){
        field[st.y+dy[dir]][st.x+dx[dir]] = "　";
        field[st.y+dy[dir]*2][st.x+dx[dir]*2] = "　";
        open.push(new State(st.y+dy[dir]*2,st.x+dx[dir]*2,0));
        break;
      }
    }
  }
  return field;
}

// ダイクストラ法で最短経路を求める
function dijkstra(H,W,field,sx,sy,gx,gy){
  var gst = new State(gy,gx,null);
  var open = [];
  open.push(new State(sy,sx,null));
  var closed = [];// 探索済み座標の格納
  // 最短経路の探索
  while(open.length){
    var st = open.shift();
    // ゴールしたらループから抜ける
    if(st.y==gy&&st.x==gx) {
      gst = st;
      break;
    }
    if(closed.indexOf(st.y<<16|st.x)!=-1){
      continue;
    }
    if(field[st.y][st.x]===1){
      continue;
    }
    for(var i=0;i<4;i++){
      var ns = new State(st.y+dy[i],st.x+dx[i],st);
      open.push(ns);
    }
    closed.push(st.y<<16|st.x);
  }
  return gst.st;
}