/// <reference path="../types/hm_jsmode.d.ts" />
/// declare function onRequestQuestionText(): any;
/// declare function onCompleteAnswerText(answer_text:string ): any;
// ------------- 会話エンジンの設定項目 -------------
const projectId = "new-project-20240307"; // Google Cloud Console 上の「プロジェクトID」(プロジェクト名ではなくプロジェクトID。プロジェクトIDには空白は入らない)
const modelName = "gemini-1.5-flash"; // 該当のプロジェクトで使用する gemini-pro系。(gemini-1.0-pro や gemini-1.5-pro)
const locationName = "us-central1"; // 該当のプロジェクトのlocation。"us-central1" で問題はない。 ("asia-northeast1" も候補かも。どちらでも動作する)
const renderPaneCustomParam = {
    place: "rightside", // leftside | rightside | upside | downside
    size: 400, // 左や右の配置の時は、横幅のこと。上や下の配置の時は縦幅のこと。
};
const isOneAtTimeAIRenderPane = 1; // AI関連のレンダリング枠は(他の種類のAIも含め)１つだけにする。(複数起動しそうになると、前のものが閉じる）
// --------------------------------------------------
const renderPaneTargetName = "HmGoogleGemini";
const hidemaruExeDir = hidemarudir();
const currentMacroDirectory = currentmacrodirectory();
const argParamJsonObj = getArgParamJsonObj();
// JSONテキストの引数付きでこのマクロが呼ばれている場合にそれをオブジェクト化しておく
function getArgParamJsonObj() {
    let arg_text = getarg(0);
    if (!arg_text) {
        return null;
    }
    try {
        let arg_param = JSON.parse(arg_text);
        return arg_param;
    }
    catch (err) {
        outputAlert(err);
    }
}
// 宣言のみ。この空間マクロで時間を超えて共有するので初期化してはならない。
var avilablePort;
// 有効ポートの受け口。非同期にてここにopenHttpServer関数で代入される。
// 有効なポートが見つからない時や、時間切れになることもありえる
// 一度ポートを探して、0という「見つからない」という値が入っていることもある。この際も一応改めて探す
if (!Boolean(avilablePort)) {
    openHttpServer();
}
const httpServerCommandFileName = currentMacroDirectory + "\\HmSimpleHttpServer.txt";
deletefile(httpServerCommandFileName);
// 簡易Httpサーバーを立てる。ポート自体付きでサーバーを立てることが出来ない限定的なマシンだと失敗するだろう。
function openHttpServer() {
    function getExtractPort(text) {
        const match = text.match(/PORT:(\d+)/);
        return match ? Number(match[1]) : null;
    }
    try {
        // このウィンドウハンドルの値を私ながら簡易サーバーを立ち上げる。
        let currentWindowHandle = hidemaru.getCurrentWindowHandle();
        // このウィンドウハンドルがなくなったら、2秒後に「該当の簡易サーバー」は自動終了する
        // 簡易サーバーがどんどん増えるといったことはなくなる。
        let processInfo = hidemaru.runProcess('"' + currentMacroDirectory + "\\HmSimpleHttpServer.exe" + '"' + " " + currentWindowHandle, currentMacroDirectory, "stdioAlive", "sjis");
        // 簡易サーバープログラムの出力を非同期で読み取る。
        // 簡易サーバープログラムはサーバーを起動するとともに、確保したポート番号を標準出力に出す。
        let stdOut = processInfo.stdOut;
        stdOut.onReadLine(readLineAsync);
        // この関数は非同期で呼ばれる
        function readLineAsync(serverOutputText) {
            try {
                let port = getExtractPort(serverOutputText);
                if (port == 0) {
                    throw "HTTPサーバーのためのポートが確保できませんでした";
                }
                if (port != null) {
                    avilablePort = port;
                    pushPostExecMacroMemory("js { doMain() }");
                }
            }
            catch (err) {
                outputAlert(err);
            }
        }
    }
    catch (err) {
        outputAlert(err);
    }
}
// hidemaru.postExecMacroMemoryの実行を確かなものとする関数
function pushPostExecMacroMemory(command) {
    let peRetry = hidemaru.setInterval(() => {
        let isScheduled = hidemaru.postExecMacroMemory(command) ?? 1;
        if (isScheduled) {
            hidemaru.clearInterval(peRetry);
        }
    }, 100);
}
// AIウィンドウを１つだけに絞る処理
function oneAIWindowFrameCheck() {
    if (!isOneAtTimeAIRenderPane) {
        return;
    }
    let lastAiRenderPaneTargetName = getstaticvariable("OneAtTimeAIRenderPane", 2);
    // 自分だよ、何もしない。
    if (lastAiRenderPaneTargetName == renderPaneTargetName) {
        return;
    }
    // 他のAIマクロがAIパネル枠を利用しているなら、閉じる
    if (lastAiRenderPaneTargetName) {
        const renderpane_json_param = {
            target: lastAiRenderPaneTargetName,
            show: 0,
        };
        renderpanecommand(renderpane_json_param);
    }
}
// 質問内容のテキスト
function getQuestionText() {
    // ユーザーによって、このような関数が引数として引き渡されていれば、これを利用する。
    if (argParamJsonObj?.onRequestQuestionText && typeof (onRequestQuestionText) == "function") {
        try {
            let ret = onRequestQuestionText();
            // この判定自体には意味はないが、返り値が文字列ではなく、true や false があるんだということを意識するために記述しておく。
            if (ret === true || ret === false) {
                return ret;
            }
            return ret;
        }
        catch (err) {
            outputAlert(err);
        }
    }
    return hidemaru.getSelectedText() || true;
}
// getQuestionText()関数は１回だけ呼び出すべきなのでキャッシュとして結果を保存しておく
let questionTextCache = "";
// 質問内容があるかどうか
function hasQuestionText() {
    // ユーザーによって、このような関数が引数として引き渡されていれば、その内容(のキャッシュ)が有効であるのかどうか。
    if (argParamJsonObj?.onRequestQuestionText && typeof (onRequestQuestionText) == "function") {
        try {
            // テキストの場合にQuestionがあるとみなす。
            return typeof (questionTextCache) == "string";
        }
        catch (err) {
            outputAlert(err);
        }
    }
    else {
        // 選択対象があるなら、メニュー表示は不要、そうでなければ、メニュー表示が必要
        return selecting();
    }
}
// メニューを表示するべきかどうか
function mustShowMenu() {
    // ユーザーによって、このような関数が引数として引き渡されていれば、その内容(のキャッシュ)が有効であるのかどうか。
    if (argParamJsonObj?.onRequestQuestionText && typeof (onRequestQuestionText) == "function") {
        try {
            // getSelectedTextは "" や undefined になりえるので、このような判定
            if (questionTextCache === true) {
                return true;
            }
            if (questionTextCache === false) {
                return false;
            }
            if (typeof (questionTextCache) === "string") {
                return false;
            }
        }
        catch (err) {
            outputAlert(err);
        }
    }
    else {
        // 選択対象があるなら、メニュー表示は不要、そうでなければ、メニュー表示が必要
        return selecting() ? false : true;
    }
}
// レンダリングペインを再オープンする必要があるかどうか
function noNeedRenderPaneReOpen() {
    // 選択していない時は、ただのコマンドなので、すでに表示済みならリオープンしない
    if (!hasQuestionText()) {
        const renderpane_json_param = {
            target: renderPaneTargetName,
            get: "show",
        };
        // 文字列の"0" or "1"なので注意が必要
        let isShowNow = renderpanecommand(renderpane_json_param);
        if (isShowNow == "1") {
            return true;
        }
    }
    return false;
}
// レンダリングペインを指定属性＆ポートでオープン
function openRenderPaneCommand(port) {
    if (noNeedRenderPaneReOpen()) {
        return;
    }
    let baseUrl = new URL("http://localhost:" + port + "/HmGoogleGemini.html");
    // このJS内にあるコールバック用にも使う関数をレンダリング枠にクエリーparamとして伝達
    let idHtmlEventHandler = hidemaru.getFunctionId(onHtmlEventHandler);
    let params = new URLSearchParams();
    params.set('idHtmlEventHandler', String(idHtmlEventHandler));
    baseUrl.search = params.toString();
    let targetUrl = baseUrl.href; // オブジェクトから実際のUrl文字列へ
    const renderpane_json_param = {
        target: renderPaneTargetName,
        uri: targetUrl,
        show: 1,
        place: "rightside",
        size: 400,
        initialize: "async",
    };
    // ユーザー指定のもので上書き。
    const renderpane_mix_param = { ...renderpane_json_param, ...renderPaneCustomParam };
    renderpanecommand(renderpane_mix_param);
    // １つのウィンドウに絞るフラグがONなら、登録しておく
    if (isOneAtTimeAIRenderPane) {
        setstaticvariable("OneAtTimeAIRenderPane", renderPaneTargetName, 2);
    }
}
// レンダリングペインを閉じる（非表示）
function closeRenderPaneCommand() {
    const renderpane_json_param = {
        target: renderPaneTargetName,
        show: 0,
    };
    renderpanecommand(renderpane_json_param);
}
function focusEditor() {
    pushPostExecMacroMemory("js {setfocus(1);}");
}
function outputAlert(msg) {
    let dll = loaddll(hidemaruExeDir + "\\HmOutputPane.dll");
    dll.dllfunc.Output(hidemaru.getCurrentWindowHandle(), msg + "\r\n");
}
const aiExePath = currentMacroDirectory + "\\HmGoogleGemini.exe";
// ユーザーの「質問内容」が入るテキストファイル
const questionFileName = currentMacroDirectory + "\\HmGoogleGemini.question.txt";
const answerFileName = currentMacroDirectory + "\\HmGoogleGemini.txt";
const completeFileName = currentMacroDirectory + "\\HmGoogleGemini.complete.txt";
// 質問内容の1行目に「時刻」を入れることで、質問時刻がわかるようにしている。
// これはシステムが「ファイルの更新」を非常に頻繁に誤爆して多重検知するために必要。
// 多重検知した際に、「その内容はもう受付済み」という判断をするために「時刻」を質問内容に刻むようにしている。
function getTickCount() {
    return tickcount() & 0x7fffffff;
}
// 選択テキストを質問内容としてファイルに保存し、ＡＩを指定のパラメータやモデルで起動
function doSendQuestionContent() {
    let text = questionTextCache;
    let commandline = `"${aiExePath}" "${projectId}" "${locationName}" "${modelName}"`;
    hidemaru.runProcess(commandline, currentMacroDirectory, "stdioAlive", "sjis");
    let sendcmd = "HmGoogleGemini.Message(" + getTickCount() + ")\n";
    hidemaru.setTimeout(() => { hidemaru.saveTextFile(questionFileName, sendcmd + text, "utf8"); }, 200);
}
// ＡＩからの原文をユーザーがマクロから直接要求する場合用。
// ユーザーからは同期に見えるようにするためのクッション
var _completeAnswerText = "";
function syncOnCompleteAnswerText() {
    onCompleteAnswerText(_completeAnswerText);
}
function onHtmlEventHandler(command_name) {
    switch (command_name) {
        case "reset":
            resetAI();
            break;
        case "stop":
            stopAIAnswer();
            break;
        case "paste":
            pasteAIAnswer();
            focusEditor();
            break;
        case "editor_focus":
            focusEditor();
            break;
        case "pop":
            popAIAnswer();
            break;
        case "answer_complete":
            _completeAnswerText = "";
            if (argParamJsonObj?.onCompleteAnswerText && typeof (onCompleteAnswerText) == "function") {
                // AIの回答の原文を取得
                let answer_text = hidemaru.loadTextFile(answerFileName) || "";
                if (!answer_text) {
                    return;
                }
                // このファイルはC#が出力しているので、\nのまま。hidemaru.loadTextFile でも\r\n にはならない。
                const normalizeNewLineText = answer_text.replaceAll("\r\n", "\n").replaceAll("\n", "\r\n");
                _completeAnswerText = normalizeNewLineText;
                // ユーザーが非同期だと理解が大変なので同期にしておく
                pushPostExecMacroMemory("js { syncOnCompleteAnswerText(); }");
            }
            break;
    }
}
function stopAIAnswer() {
    let sendcmd = "HmGoogleGemini.Cancel(" + getTickCount() + ")\n";
    let text = "応答を停止";
    let commandline = `"${aiExePath}" "HmGoogleGemini.Cancel()"`;
    hidemaru.runProcess(commandline, currentMacroDirectory, "stdioAlive", "sjis");
    hidemaru.saveTextFile(questionFileName, sendcmd + text, "utf8");
}
function popAIAnswer() {
    let sendcmd = "HmGoogleGemini.Pop(" + getTickCount() + ")\n";
    let text = "履歴から除外";
    let commandline = `"${aiExePath}" "HmGoogleGemini.Pop()"`;
    hidemaru.runProcess(commandline, currentMacroDirectory, "stdioAlive", "sjis");
    hidemaru.saveTextFile(questionFileName, sendcmd + text, "utf8");
}
void resetHttpServer();
{
    let success = hidemaru.saveTextFile(httpServerCommandFileName, String(hidemaru.getCurrentWindowHandle()));
}
function resetAI() {
    let sendcmd = "HmGoogleGemini.Clear(" + getTickCount() + ")\n";
    let text = "リセット";
    let commandline = `"${aiExePath}" "HmGoogleGemini.Clear()"`;
    hidemaru.runProcess(commandline, currentMacroDirectory, "stdioAlive", "sjis");
    hidemaru.saveTextFile(questionFileName, sendcmd + text, "utf8");
    hidemaru.saveTextFile(answerFileName, "", "utf8");
    hidemaru.saveTextFile(completeFileName, "HmGoogleGemini.MessageCompleteClear(0)\n", "utf8");
    resetHttpServer();
}
function pasteAIAnswer() {
    let answer_text = hidemaru.loadTextFile(answerFileName);
    if (!answer_text) {
        return;
    }
    answer_text = formatMarkdownTable(answer_text + "\n"); // 最後に改行を足した状態で分析。テーブルの解析も安定する。
    insert(answer_text);
}
function getSelectedMenuCommand() {
    let menuLabelList = [
        {
            cmd: "stop",
            txt: "応答を停止 (&S)",
        },
        {
            cmd: "reset",
            txt: "全リセット (&R)",
        },
        {
            cmd: "paste",
            txt: "応答を貼り付け (&V)"
        },
    ];
    let menuCommandList = menuLabelList.map(item => item.cmd);
    let menuTextList = menuLabelList.map(item => item.txt);
    let selectMenuID = menuarray(menuTextList); // 選択しなければ0: 選択は最初の項目が1
    // キャンセルした
    if (selectMenuID == 0) {
        return false;
    }
    let selectMenuIx = selectMenuID - 1; // 配列用に使うので、0オリジンに変更。
    let selectCommand = menuCommandList[selectMenuIx];
    return selectCommand;
}
// テキストを選択せずに、このマクロを実行した時は、コマンド選択
function doSendCommand() {
    let selectedCommand = getSelectedMenuCommand();
    switch (selectedCommand) {
        // メニューをキャンセルなら""
        case false:
            // 間違ったかなにかだろう。元へと戻すという意味でレンダリングペインも一緒に閉じておく
            closeRenderPaneCommand();
            break;
        case "stop":
            stopAIAnswer();
            break;
        case "reset":
            resetAI();
            break;
        case "paste":
            pasteAIAnswer();
            break;
        default:
            // 未知のコマンドの場合の処理
            break;
    }
}
// HTML/JS用のHttpサーバーを起動。(PHPだと他の環境要らずでたった２個ほどのファイルでシンプルサーバーが動作するので一緒に内包してある)
// 選択範囲の最終座標に移動した方が便利だとわかっている
function gotoSelectEndPosition() {
    // 選択は自動解除した方が便利なようだ
    let cur_selendx = selendx();
    let cur_selendy = selendy();
    escapeselect();
    moveto(cur_selendx, cur_selendy);
}
// メイン処理
function doMain() {
    try {
        // getQuestionText()関数は１回だけ呼び出すべきなのでキャッシュとして結果を保存しておく
        questionTextCache = getQuestionText();
        // AIウィンドウフレームに絞るかどうか
        oneAIWindowFrameCheck();
        // レインだリングペインをそのポートでlocalhostで開く
        openRenderPaneCommand(avilablePort);
        // 質問があるなら
        if (hasQuestionText()) {
            // それをＡＩへの質問内容として送信
            doSendQuestionContent();
            // 選択を解除し、選択の最後の座標へと移動
            gotoSelectEndPosition();
        }
        else if (mustShowMenu()) {
            // それ以外なら、ＡＩにコマンドの送信
            doSendCommand();
        }
    }
    catch (err) {
        outputAlert(err);
    }
}
if (avilablePort > 0) {
    doMain();
}
