const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();
const {writeFileSync} =require('fs');// ファイル関係
const {createWriteStream} =require('fs');// ファイル関係
const ytdl = require('ytdl-core');// youtubeの音声を再生してくれるやつ
const {VoiceText} = require("voice-text");// 音声を読み上げてくれるやつ
const voicetext = new VoiceText('d03x68wro08w7mz7');// 音声を読み上げてくれるやつ
const cron = require('node-cron');// 定期的にプログラムを実行してくれるやつ

// 名前とその対応するディスコードIDを記述する
const name = [["伊藤","三木"],["浅野","白木"],["松野","虫鹿"],["尾山","稲守"],["南部","高岡"],["犬飼","野ツ俣"]];
const id = [["715796433487396864","625491071475908651"],["243312886049406979","695626581187756102"],["694899614201020448","336031337452666880"],["699500872442314754","694443025287610408"],["708191971424075797","337439445269741568"],["331787151341780994","694560220730359890"]];
// チャンネルID記述
const TEACHER_CHANNEL = "732522915832266834";// 木島先生の部屋ID
const NOTICE_CHANNEL = "716879387072528384";// #お知らせID
const BOT_CHANNEL = "758946751830163477";// #Bot開発ID
const GAME_CHANNEL = "768724791141990461";// #gameID
const ANONY_CHANNEL = "768723934966841355";// #匿名掲示板ID
const GUILD_ID = "694442026762240090";// サーバーのID
const voiceTable = ['hikari', 'haruka', 'takeru', 'santa', 'show'];// ボイスの種類 bearは聞き取りずらいので除外
// botを呼んだ時の反応
const res = ["おぉ″ーん″！呼んだかにゃぁ″？","お″ねぇ″さ″ん″に呼ばれた気がしたにゃぁ！！","人気者は困っちゃうにゃぁ″～！","ミ″ーを呼ぶ声が聞こえてきた気がするにゃぁ″！","何か用かにゃぁ″？","お″ぉ～ん！ニャンちゅうでぇ～す″！！",
          "これからお″ねぇ″さんとデェートに行ってくるにゃぁ″！ドュフフフ","は？","いぇ″～い！ニャンちゅうは今日も元気いっぱいにゃぁ″～！","な″～んということでしょう！ニャンちゅうは人気者でぇ″～す！","んにゃ″ぁ″ぁ″ぁ″ぁ″ぁ″ぁ",
          "み゛ぃとともだちになってくれるのかにゃあん！？","お゛に゛ぃさぁ゛ん！？","み゛ぃはま゛ぁだいぎでる゛に゛ゃあ゛あ゛あ゛あ゛ん゛！","ｶﾞｶﾞｶﾞ……ｼﾃ、ﾋﾟｰｶﾞｶﾞ…ｺｺｶﾗ…ﾀﾞｼ…ｶﾞｶﾞｶﾞｶﾞｶﾞｶﾞ","今日も素敵な一日だにゃ″ん！","お″ぉん″！！お″お″お″お″お″お″お″ぉ″ん！！！",
          "次のゼミが待ち遠しいにゃぁ″！","お″ねぇ″さ″ん″がいつのまにか40代になってたにゃぁ″...","やっぱりたまごかけご飯はおいしいにゃぁん！！","真の卵賭けご飯を見せてやるにゃ″ん！","お″ね″え″さんの生態を学会に発表したにゃ″ん！！","ぃや″っぱりぃ″！？"
          ,"FXで有り金全部溶かしたにゃ″ん″！！！"];
// botのプレイしているゲーム
const state = ["お″ねぇ″さ″ん","PLAYING","あ″い″ちゅあ″ん","PLAYING","あなた","WATCHING","滅びた世界","LISTENING","㊙ビデオ","WATCHING","コンピューターおばあちゃん","LISTENING","BlockRoom","WATCHING","3Dプリンタ","PLAYING","カタン","PLAYING","湯沸し器","WATCHING","木島先生","WATCHING","卵かけご飯","WATCHING"
              ,"深淵","WATCHING","君が代","LISTENING","毛髪","LISTENING","ニャンちゅう","PLAYING","天井","WATCHING","挫けた心","LISTENING","ピクミン","PLAYING","スマブラ","PLAYING","スプラトゥーン","PLAYING","NHK","WATCHING","お姉さんの生態","WATCHING","お姉さんのお風呂","WATCHING","デュフｗコポォｗ","WATCHING"
              ,"FX","PLAYING","パチンコ","PLAYING","競馬","WATCHING","生命","LISTENING","ニャンちゅうといっしょ","WATCHING","おかあさんといっしょ","WATCHING","ニャンちゅう","WATCHING","夏目漱石","LISTENING","OculusQuest2","PLAYING","ViveCosmos","PLAYING","FOVE0","PLAYING","情熱大陸","WATCHING","プロフェッショナル","WATCHING"
              ,"ラーメン","WATCHING","地上の星","LISTENING","バーチャルボーイ","PLAYING","PlayStation","PLAYING","PlayStation2","PLAYING","任天堂64","PLAYING","ゲームボーイ","PLAYING","ゲームキューブ","PLAYING","WiiFit","PLAYING","ファミコン","PLAYING"
              ,"ゲーム&ウオッチ","PLAYING","おじゃる丸","WATCHING","しまじろう","WATCHING","アンパンマン","WATCHING","アカシックレコード","WATCHING","メイドインアビス","WATCHING","オリンピック","PLAYING","ベルリンの壁","LISTENING","縺薙ｓ縺ｫ縺｡縺ｯ縺薙ｓ縺ｰ繧薙ｏ","PLAYING"
              ,"ノートルダム大聖堂","LISTENING","汚染された川","LISTENING","人生","LISTENING","仮想通貨","PLAYING","宝くじ","PLAYING","パチスロ","PLAYING","麻雀","PLAYING","24歳学生です。","PLAYING","玉ねぎ","PLAYING","タラバガニ","PLAYING","大根おろし","PLAYING"
              ,"個人民事","LISTENING","この虫野郎","WATCHING","例のアレ","WATCHING","作ってワクワク","WATCHING","焼肉","PLAYING","パラパラ","WATCHING","ピクミン4","PLAYING","スプラトゥーン3","PLAYING","PS5","PLAYING","サツマイモ","PLAYING","塊魂","PLAYING","ポケモン","PLAYING","女の子","WATCHING","男の子","WATCHING"];
const thanks = ["サンキュでぇ～す！","ん優しい世界ぃ″！","ありがとうございまぁ″～す！","素敵だにゃ″ぁ！","にゃ″はは！","あったかいにゃ″ぁ","いぇ″～い″！！","んほぉ″～！！",
                "社会貢献だにゃ″ぁ！","お″ね″ぇさ″んも喜んでるにゃ″ぁ！","あぁ″＾～感謝の言葉がぴょんぴょんするんにゃ″ぁ～","はぁ″い！","感謝感謝にゃ″ぁ～","気持ちがええんにゃ″ぁ～",
                "やったぜ。","ありがとうは世界を救うにゃ″ぁ～","どゅ″ふ″ふ″、あったかいにゃ″～","おじさんもきっと喜んでるにゃ！"];
const apo = ["","","","","","","","","","","",""];
// 日付の処理用
const zodiac = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];
const week = ["日","月","火","水","木","金","土"];
const zemiWeek = [1,2,4];// 曜日を数値で表す0~6 日~土
const zemiTime = [16,"30",14,"45",14,"45"];// zemiWeekに対応するゼミの開始時間
let zemiName = 0;// 発表者の配列番号
let addName = [""];
const fs = require("fs");
let anonyId = 0;

// ゲームに使う変数
let highScore = ["","","","","",""];
let tmpHighScore = ["","","","","",""];
let textId = 0;
let text =0;
let beforeMessage;
let score = 0;
const width = 6;// ゲーム盤の横幅
const height = 6;// ゲーム盤の縦幅
let nyanSitu = 0;
let gameOver = false;
const dirStr = ["u","d","r","l"];
let tile = ["<:floor:767329931356930058>","<:nyan:767331341212581888>","<:death:767774739195494480>","<:stone:768087754466525205>","<:enemy:768089974095872040>","<:eggRice:768090009915490354>",""];
let field = new Array(width*height);
makeField();
load();// データをロードする

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
  changeState();// プレイ中のゲーム名を変更
  client.channels.cache.get(GAME_CHANNEL).messages.fetch({ after: '0', limit: 10 }).then(messages => messages.forEach(message=>message.delete()));// ゲームチャンネルのテキストメッセージを削除する
  sendMsg(GAME_CHANNEL,display());// ゲーム画面表示
});

// 定時お知らせ　"秒　分　時間　日　月　曜日"を表す　*で毎回行う 0 22 * * * で毎朝7時に実行
cron.schedule('30 0 22 * * *', () => {
  var zemiId = 0;// zemiWeek及びzemiTime(ゼミ開始時刻)の配列番号
  let today = compensate();// 曜日、月、日、時間、分、年、元号の順に配列として代入
  for(var i=0;i<zemiWeek.length;i++){// 次のゼミがいつなのかを探る
    if(today[0]>zemiWeek[i]) zemiId=i+1;
    if(zemiId==zemiWeek.length) zemiId = 0;
  }
  let text = "おはようございます！"+today[1]+"月"+today[2]+"日"+week[today[0]]+"曜日の朝がやってきました。\n";
  if(zemiWeek.indexOf(today[0])!=-1) text += "本日"+zemiTime[zemiId*2]+"時"+zemiTime[zemiId*2+1]+"分からゼミの予定です。\n発表者は"+returnMention(zemiName)+returnAddNameMention(addName)+"です。\n";
  else text += "次回のゼミは"+week[zemiWeek[zemiId]]+"曜日の"+zemiTime[zemiId*2]+"時"+zemiTime[zemiId*2+1]+"分からの予定です。\n発表者は**"+combiName(name[zemiName],addName)+"**です。\n";
  if(today[0] == 2 || today[0] == 5) text += "#燃えるゴミの日";
  if(today[0] == 3 || today[0] == 5) text += "#工学実験TA(3限)";
  if(today[0] == 4 && today[2]<=6)   text += "\n"+makeSurText("明日は段ボール回収の日","＃");
  if(today[0] == 5 && today[2]<=7)   text += "\n"+makeSurText("段ボール回収の日","＊");
  if(today[0] == 6) text+=today[5]+"年(令和"+today[6]+"年"+zodiac[(today[5]-2020)%12]+"年)は残り"+remainingDays(today[1],today[2],1,1)+"日です。";
  sendMsg(NOTICE_CHANNEL,text);
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
    console.log(newMember.channel.name+"に接続");
  }else if(conn && conn.channel && conn.channel.members.array().length < 2) {// ボイスチャンネルにbotしかいなくなった場合に切断する
    conn.disconnect();
    console.log("ボイスチャンネルから切断");
  }
});

// ユーザのコメントに対する反応系
client.on('message', async message =>{
  // ボイスチャンネルに接続しているとき、入力されたメッセージを流す voiceTable[message.member.id%voiceTable.length] 'hikari', 'haruka', 'takeru', 'santa', 'bear', 'show'
  if(!message.content.match(/@|＠|http| /)&&message.channel.id != GAME_CHANNEL&&message.channel.id != ANONY_CHANNEL) say(message.member.displayName.substr(0,2)+"、"+message.content,voiceTable[message.member.id%voiceTable.length]);
  // ゲームチャンネルの処理
  if(message.channel.id == GAME_CHANNEL){
    if(message.author.id==client.user.id) textId = message.id;
    else {
      let order = message.content;
      let name = message.member.displayName;
      message.delete();
      // 前フレームのメッセージを削除する
      if(textId!=0) {
        beforeMessage = client.channels.cache.get(GAME_CHANNEL).messages.cache.get(textId);
        if(beforeMessage!=null)beforeMessage.delete();
      }
      if(gameOver){
        score=0;
        gameOver = false;
        load();
        makeField();
      }else if(!gameOver){
        let text = "\n";
        nyanSitu = search();
        if(order.match(/w/)){//上
          move(nyanSitu,"u");
        }else if(order.match(/s/)){//下
          move(nyanSitu,"d");
        }else if(order.match(/a/)){// 左
          move(nyanSitu,"l");
        }else if(order.match(/d/)){// 右
          move(nyanSitu,"r");
        }else if(order.match(/r/)) {
          gameOver=true;
          death();
          score = 0;
          name = "";
        }
        let obakeArray = searchObake();
        for(var i=0;i<obakeArray.length;i++) move(obakeArray[i],dirStr[Math.floor(Math.random()*(dirStr.length))]);
      }
      // ランキング処理
      let flag = true;
      if(tmpHighScore.indexOf(name)!=-1){
        if(tmpHighScore[tmpHighScore.indexOf(name)-1]>score) flag = false;
      }
      if(flag){
        for(var i=0;i<3;i++){
          if(score>=tmpHighScore[i*2]){
            for(var j=0;j<6;j++) tmpHighScore[j] = highScore[j];
            tmpHighScore[i*2] = score;
            tmpHighScore[i*2+1] = name;
            for(var j=i;j<2;j++){
              tmpHighScore[(j+1)*2] = highScore[j*2];
              tmpHighScore[(j+1)*2+1] = highScore[j*2+1];
            }
            save();
            break;
          }
        }
      }
      let text="";
      if(name!=="") text+="プレイヤー："+name;
      text+=display();
      sendMsg(GAME_CHANNEL,text);
    }
    return;
  }
  // 匿名チャンネルの処理
  if(message.channel.id == ANONY_CHANNEL){
    if(message.author.id == client.user.id) return;
    anonyId++;
    save();
    let text = "("+anonyId+")\n"+message.content;
    message.delete();
    sendMsg(ANONY_CHANNEL,text);
  }
  // 自分のコメントや他のbotに反応して無限ループしないようにする
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  // 各種反応 お知らせチャンネルを除く
  if(message.channel.id!=NOTICE_CHANNEL && message.channel.id!=TEACHER_CHANNEL){
    const REACTION= "762647337461874709";
    if(message.content.match(/にゃん|ニャン|ちゅう|チュウ/)){
      sendMsg(message.channel.id," "+res[Math.round(Math.random()*(res.length-1))]);   
      message.react(REACTION);
    }
    if(message.content.match(/ありが|あざ|サン|さんきゅ|さんくす/)){
      sendMsg(message.channel.id," "+thanks[Math.round(Math.random()*(thanks.length-1))]);
      message.react(REACTION);
    }
    if(message.content.match(/すみません|ごめん|すまん|申し訳/)){
      let text = " そういうときもあるにゃ″ぁ";
      sendMsg(message.channel.id,text);
      message.react(REACTION);
    }
    if(message.content.match(/うるさい|だま|黙|しずかに|静かに|やっぱり/)){
      let text = "ぃや″っぱりぃ″！？";
      sendMsg(message.channel.id,text);
      message.react(REACTION);
    }
    if(message.content.match(/なんで|どうして/)){
      sendMsg(message.channel.id,"にゃ″んでぇ！？にゃ″～んでぇ！？");
      message.react(REACTION);
    }
    if(message.content.match(/すご|やば|素晴し|すばらし|すげ|やべ|凄|いいね|やる|流石/)){
      sendMsg(message.channel.id,"こぉ″れを芸術と呼ばずしてにゃ″んと申しましょうか～！");
      message.react(REACTION);
    }
    if(message.content.match(/正解|違|合って|どうですか|ちが|その通り/)){
      sendMsg(message.channel.id,"ちっがぁいあ″りませ～ん″！");
      message.react(REACTION);
    }
  }
  // ゼミを始める際に入力することで、全員に対する通知を行い、発表者順を表示する　お知らせ:716879387072528384 bot開発:758946751830163477 木島先生id 702413329691443270
  if (message.content.match(/zemi|ゼミ始|ゼミです|ゼミやりま|ゼミっす|ゼミ。|ぜみ。|ゼミ開始|ぜみ開始/)){
    console.log("ゼミ開始");
    let tmp = (zemiName+2)%6;
    let text = "everyone\nゼミが始まります！\n**発表者："+combiName(name[zemiName],addName)+"**\n司会　："+returnName(name[tmp]);
    if(message.channel.id==BOT_CHANNEL){
      sendMsg(BOT_CHANNEL,text);
    }else {
      text = "@"+text;
      sendMsg(NOTICE_CHANNEL,text);
    }
    if(message.content.match(/zemi/)) message.delete();
    clearAddName();
    opeZemi(1);
    save();
  }
  // 司会者を教えてくれる
  if (message.content.match(/sikai|shikai/)){
    sendMsg(message.channel.id,"司会者："+returnName(name[(zemiName+2)%name.length]));
    message.delete();
  }
  // ゼミ順を前に移動する
  if(message.content.match(/back/)){
    opeZemi(-1);
    save();
    sendReply(message,"発表者順を１つ前に移動しました。\n次の発表者は"+combiName(name[zemiName],addName)+"さんです。");
    message.delete();
  }
  // ゼミ順を後に移動する
  if(message.content.match(/for/)){
    opeZemi(1);
    save();
    sendReply(message,"発表者順を１つ後に移動しました。\n次の発表者は"+combiName(name[zemiName],addName)+"さんです。");    
    message.delete();
  }
  // ゼミ順を初期化する
  if(message.content.match(/@clear/)){
    zemiName = 0;
    clearAddName();
    save();
    sendReply(message,"ゼミ順を初期化しました。");
  }
  // 発表順の確認をする
  if(message.content.match(/next/)){
    let text = returnOrder();
    sendMsg(message.channel.id, text);
    message.delete();
  }
  // ゼミ順に積み残しの人を追加する
  if(message.content.match(/add/)){
    var str = message.content.split(" ");
    var text = "@以下の人を次のゼミ発表者に追加しました：";
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
  }
  // ゼミ順の積み残しの人を削除する
  if(message.content.match(/take/)){
    clearAddName();
    var text = "積み残しの人のリストを削除しました。";
    save();
    sendMsg(message.channel.id, text);
    message.delete();
  }
  // 発言者のいるボイスチャンネルに接続する
  if (message.content.match(/join/)) {
    let ch = message.member.voice.channel;
    if(ch==null)sendMsg(message.channel.id, "ボイスチャンネルに入室してからjoinと命令してください。");
    else message.member.voice.channel.join();
    console.log(ch+"に接続");
    message.delete();
  }
  // ボイスチャンネルから切断する
  if (message.content.match(/leave/)) {
    if(client.voice.connections.get(GUILD_ID)==null)sendMsg(message.channel.id, "botがボイスチャンネルに入室していません。");
    else client.voice.connections.get(GUILD_ID).disconnect();
    console.log("ボイスチャンネルから退出");
    message.delete();
  }
  // ボイスチャンネルにyoutubeの音声を流す
  if(message.content.match(/@bgm/)){
    var str = message.content.split(" ");
    if(str[1]!=null && client.voice.connections.get(GUILD_ID)!=null){
      client.voice.connections.get(GUILD_ID).play(ytdl(str[1], { filter: 'audioonly' }));
      console.log(str[1]+"を再生");
    }else if(client.voice.connections.get(GUILD_ID)!=null){
      //sendMsg(message.channel.id,"@ミ″ーのおすすめの曲を流すにゃぁ″！「bgm youtubeのURL」で好きなyoutubeの音声が流せるにゃ！");
      client.voice.connections.get(GUILD_ID).play(ytdl("https://www.youtube.com/watch?v=fpcAvRw0Q-Y", { filter: 'audioonly' }));
    }else{
      sendMsg(message.channel.id,"ミ″ーがボイスチャンネルに入ってないと音が流せないにゃぁ″...");
    }
    message.delete();
  }
  // 文字数を計測する
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
  }
  // サイコロを振る
  if(message.content.match(/dice/)){
    var str = message.content.split(" ");
    var text = message.member.displayName+"が"+str[1]+"面ダイスを"+str[2]+"回振りました。";
    if(str.length==3||str.length==4){
      var m = str[1];
      var n = str[2];
      if(n <= 300) text += "\n出目：";
      var sum = 0;
      for(var i=0;i<n;i++){
        var tmp = Math.floor(Math.random()*m)+1;
        if(n<= 300) text += tmp+" ";
        sum += tmp;
      }
      if(n != 1) {
        text = text + "\n合計："+sum;
        if(str.length==4) text = text + "\n平均："+(sum/n).toFixed(3);
      }
    }else{
      text = "ん″にゃ″はぁ″！m面のダイスをn回振るには「@dice m n」と半角スペースで区切って入力してくださぁ″～い。"
    }
    sendMsg(message.channel.id,text);
    message.delete();
  }
  // タイマー機能
  if (message.content.match(/time/)){
    var str = message.content.split(" ");
    if(Number(str[1])<=99){
      sendMsg(message.channel.id, "今からミ″ーが"+str[1]+"分数えてあげるにゃぁ″！よ～いドォ″ン″！");
      setTimeout(function() {
        sendReply(message,"にゃ″～んにゃ″にゃ″～ん！！"+str[1]+"分経ったにゃぁ″！！");   
      },Number(str[1])*1000*60);
    }else sendMsg(message.channel.id, "時間を測るには@time n(1~99の間)と入力してほしいにゃ″ん！");
    message.delete();
  }
  // ランダムセレクト
  if (message.content.match(/sel/)){
    var n = 0;
    var str = message.content.split(" ");
    var sN = Number(str[1]);
    if(str[1]==null) sN=1;
    var text = "";
    var list = [""];
    for(var i=0;i<name.length;i++){
      for(var j=0;j<name[i].length;j++){
        n++;
      }
    }
    if(n>=sN && sN>0){
      while(list.length<=sN){
        var p = 0;
        var rand = Math.random();
        for(var i=0;i<name.length;i++){
          for(var j=0;j<name[i].length;j++){
            p += 1/n;
            if(p>rand) {
              for(var l=0;l<list.length;l++){
                if(list[l]===name[i][j]){
                  break;
                }else if(l==list.length-1){
                  list.push(name[i][j]);
                }
              }
              break;
            }
          }
          if(p>rand) break;
        }
      }
      sendMsg(message.channel.id, "選ばれたのは"+returnName(list)+"でした。");
    }else sendMsg(message.channel.id, "指定できるのは1~"+n+"人までにゃ");
    message.delete();
  }
  // 文字を装飾して返す
  if(message.content.match(/big/)){
    var str = message.content.split(" ");
    const symbol = ['＊', '＆', '＃', '＄', '￥','？','＋'];
    var text = makeSurText(str[1],symbol[Math.floor(Math.random()*symbol.length)]);
    message.delete();
    sendMsg(message.channel.id,text);
  }
  // デバッグ用
  if(message.content.match(/@db/)){
    let text = makeSurText("パラダイスおじさん","＊");
    sendMsg(message.channel.id, text);
    message.delete();
  }
});

// トークンが設定されていない場合　.envにてDISCORD_BOT_TOKENを設定しておく必要あり
if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );// ログインする


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
    .then(console.log("メッセージ送信"+text.substr(0,50)))
    .catch(console.error);
}
// 通常の発表者と積み残しの発表者名を結合して返す
function combiName(zemi,add){
  let text = returnName(zemi);
  for(var i=1;i<add.length;i++){
    text+="、";
    text+=add[i];
  }
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
  let text = "発表者順\n**次回　：";
  text += combiName(name[zemiName],addName)+"**\n";
  for(var i=1;i<name.length;i++){
    text += "その次："+returnName(name[(zemiName+i)%6])+"\n";
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
async function say(str,speaker){
  if(speaker==="def") speaker = "hikari";// スピーカーがデフォルトの場合
  if(client.voice.connections.get(GUILD_ID)!=undefined){
    await voicetext.fetchBuffer(str, { speaker:speaker,format: 'ogg' })
      .then((buffer) => {
        writeFileSync('voice.ogg', buffer);
        client.voice.connections.get(GUILD_ID).play('voice.ogg');
    });
  }
}
// ファイルに書き込む
function save(){
  let text = zemiName+"\n";
  for(var i=1;i<addName.length;i++){
    text+=addName[i];
    if(i!=addName.length-1) text+=",";
  }
  if(addName.length==1){
    text = zemiName+"\nnone";
  }
  text+="\n";
  for(var i=0;i<tmpHighScore.length;i++) {
    text+=tmpHighScore[i];
    if(i!=tmpHighScore.length-1) text+=",";
  }
  text+="\n"+anonyId;
  fs.writeFile("tex.txt", text, (err) => {
    if (err) throw err;
  });
}
// ファイルを読み込む
function load(){
  fs.readFile("tex.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let str = data.split("\n");
    zemiName = Number(str[0]);
    let str2 = str[1].split(",");
    if(str[1]!=="none"){
      for(var i=0;i<str2.length;i++){
        addName.push(str2[i]);
      }
    }
    let str3 = str[2].split(",");
    for(var i=0;i<6;i++) {
      highScore[i]=str3[i];
      tmpHighScore[i]=str3[i];
    }
    anonyId = str[3];
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
// 曜日、月、日付、時間、分を補正して返す
function compensate(){
  const now = new Date();// 日付取得に使う
  let todayWeek = now.getDay();
  let month = now.getMonth();
  let day = now.getDate();
  let hour = now.getHours();// グリニッジ標準時間になるので9時間分時差補正
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let era = year-2018;
  hour+=9;
  // 曜日の補正
  if(hour >= 24) {
    todayWeek = (todayWeek+1)%7;
    day++;
    hour -= 24;
  }
  // 日の補正
  if(monthDay[month]<day){
    day-=monthDay[month];
    month++;
  }
  // 年月元号の補正
  if(month==12) {
    month-=12;
    year++;
    era++;
  }
  let output = [todayWeek,month+1,day,hour,minutes,year,era];
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 Game Function                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ゲームフィールドのテキストを生成する
function display(){
  text = "\n";
  for(var i=0;i<width*height;i++){
    text+=tile[field[i]];
    if(i%width==width-1) text+="\n";
  }
  text+="上(w) 下(s) 右(d) 左(a) 不動(q) リセット(r)\nscore:"+score;
  if(gameOver) text+="\nニャンちゅうは死んだよ。";
  for(var i=0;i<3;i++){
    text+="\n"+(i+1)+"位:"+tmpHighScore[i*2]+"点("+tmpHighScore[i*2+1]+")";
  }
  return text;
}
// 指定した配列の隣の配列番号を返す
function getNum(id,str){
  if(str=="r"){
    id+=1;
    if(id%width==0)return "none";
  }else if(str=="l"){
    id-=1;
    if(id%width==width-1) return "none";
  } else if(str=="u") {
    id-=width;
    if(id<0) return "none";
  }else if(str=="d") {
    id+=width;
    if(id>=width*height) return "none";
  }
  return id;
}
// 指定した配列のオブジェクトを移動させる
function move(id,str){
  let tmp = getNum(id,str);
  let egg = false;
  if(tmp!="none"){
    if(field[tmp]!=3) {
      if(field[tmp]==5&&field[id]==1||field[tmp]==5&&field[id]==4) {
        if(field[id]==1) score++;
        egg = true;
      }else if(field[tmp]==4&&field[id]==1){
        gameOver=true;
        death();
      }else if(field[tmp]==1&&field[id]==4){
        gameOver = true;
        death();
      }
      if(!gameOver){
        field[tmp]=field[id];
        field[id]=0;
        if(egg) {
          makeEgg();
          if(Math.random()<0.5) makeObake();
        }
      }
    }
  }else return "none";
}
// ニャンちゅうの位置を探す
function search(){
  for(var i=0;i<width*height;i++){
    if(field[i]==1) return i;
  }
  return 0;
}
// ニャンちゅうの葬式を行う
function death(){
  let ny = search();
  field[ny] = 2;
}
// たまごかけご飯を生成
function makeEgg(){
  for(var i=0;i<1;i++){
    let tmp = Math.floor(Math.random()*width*height);
    if(field[tmp]==0) {
      field[tmp]=5;
      for(var j=0;j<4;j++){
        let tmp2 = getNum(tmp,dirStr[j]);
        if(tmp2!="none"){
          if(field[tmp2]==1) {
            field[tmp]=0;
            i--;
            continue;
          }
        }
      }
    }else i--;
  }
}
// お化けの位置を探す
function searchObake(){
  let array=[];
  for(var i=0;i<width*height;i++){
    if(field[i]==4) array.push(i);
  }
  return array;
}
// お化けを生成
function makeObake(){
  for(var i=0;i<1;i++){
    let tmp = Math.floor(Math.random()*width*height);
    if(field[tmp]==0) {
      field[tmp]=4;
      for(var j=0;j<4;j++){
        let tmp2 = getNum(tmp,dirStr[j]);
        if(tmp2!="none"){
          if(field[tmp2]==1) {
            field[tmp]=0;
            i--;
            continue;
          }
        }
      }
    }else i--;
  }
}
// 岩を生成
function makeStone(i){
  field[i] = 3;
  for(var j=0;j<dirStr.length;j++){// 上下左右が床の場合のみ岩を生成する
    var tmp = getNum(i,dirStr[j]);
    if(tmp!="none"){
      if(field[tmp]!=0) {
        field[i]=0;
        break;
      }
    } 
  }
}
// フィールドを作成する
function makeField(){
  for(var i=0;i<width*height;i++) field[i]=0;// フィールドを床で埋め尽くす
  nyanSitu = Math.floor(Math.random()*width*height);
  field[nyanSitu] = 1;// ニャンちゅう配置
  for(var i=0;i<width*height;i++){
    if(i==nyanSitu) continue;
    if(Math.random()<0.2){
      makeStone(i);
    }
  }
  for(var i=0;i<3;i++)makeObake();
  for(var i=0;i<2;i++)makeEgg();
}
