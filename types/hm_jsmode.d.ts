/**
 * @file 秀丸のjsmode用のTypeScript定義ファイル
 * 
 * @author Akitsugu Komiyama
 * 
 * @copyright 「各関数の説明内容」については、「サイトー企画 (https://hide.maruo.co.jp/)」に著作権が帰属します。    
 *            「TypeScript定義ファイル化」については、Akitsugu Komiyama に著作権が帰属します。
 * 
 * @license    - The Custom License
 *                 https://github.com/komiyamma/hm_jsmode_ts_difinition/blob/main/LICENSE*    
 * 
 *                 以下に定める条件に従い、「本定義ファイル（hm_jsmode.d.ts）」および関連ファイルの複製を取得するすべての人に対し、
 *                 「本定義ファイル」を「プログラミング構文や単語の強調ファイル」もしくは「プログラミング言語等の定義ファイル」を目的とするという条件下（以下「条件Ａ」）においては、
 *                 この「複製を使用、複写、変更、結合、掲載、頒布」を許可します。
 *                 また、「複製を使用、複写、変更、結合、掲載、頒布」を提供する相手に、「条件Ａ」において、同じことを許可する権利も含まれます。
 *
 *                 上記の著作権表示および本許諾表示を、「本定義ファイル」の複製または重要な部分に記載するものとします。
 *
 *                 「本定義ファイル」は「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。
 *                 ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。
 *                 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、
 *                 「本定義ファイル」に起因または関連し、あるいは「本定義ファイル」の使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について
 *                 何らの責任も負わないものとします。
 *
 *             - 本定義ファイルのヘルプ文面についてのライセンス
 *
 *                「ヘルプファイルの文章を使って、強調ファイルや定義ファイルを作り、それを配布するのは自由に出来る」という「サイトー企画」社の許諾に基づく
 *                （ヘルプファイルから大量の説明文章の利用を伴っていても良い）
 *                 https://www.maruo.co.jp/hidesoft/1/x01458_.html?a=0#1458
 * 
 * @version v0.7.0
 */

/**
 * console
 */
declare namespace console {
  /**
   * console.log()を、秀丸エディタ上で実装しています。    
   * 
   * あらかじめ、debuginfo(2);をしておくと    
   * 適所でconsole.log("text");等を入れておくと、アウトプット枠に出力できます。
   *  
   * @param message    
   * 出力する対象の文字列や数値、オブジェクトなど
   * 
   * @param optional_params    
   * その他の、出力する対象の文字列や数値、オブジェクトなど。    
   * 複数の引数を受け付ける。
   * 
   * @example
   * debuginfo(2);
   * console.log("OK1");
   * console.log("OK2");
   * console.log(typeof(str)); // function
   * console.log(str);  // 関数の中身が出る
   * 
   * @comment
   * 参照：
   * @see debuginfo
   */
  function log(message: any, ...optional_params: any[]): void;
}

declare namespace hidemaru {

  type DllFuncManager = any
  /**
   * hidemaru.loadDll関数の返り値。    
   * 
   * @comment
   * DLLに存在する関数をメソッドとして呼び出すことができます。    
   * 予約された名前は使うことができません。    
   * DLLで決められた呼び出し方法で呼び出さないとクラッシュする可能性があるので注意が必要です。    
   * 呼び出し方法は、hidemaru.loadDllで取得したILoadDllResult型ののプロパティうち、    
   * DllFuncManager型である
   * - dllFunc
   * - dllFuncStr
   * - dllFuncW
   * - dllFuncStrW
   * 内のメソッドとして呼び出すことで、明示的に指定できます。    
   * 
   * @example
   * var dll = hidemaru.loadDll("HmJre.dll");
   * var obj1 = dll.dllFunc;
   * var obj2 = dll.dllFuncStr;
   * var num = obj1.FindRegular( "[a-z]", "123 abc"), 0 );
   * var str = obj2.ReplaceRegular("([a-z]+)([0-9]+)", "--abcdefg1234567--", 0, "\\2\\1" );
   * 
   * @comment
   * DLL側の関数名の制限
   * - loadDllFile
   * - dllFuncExist
   * - setDllDetachFunc
   * - dllFunc
   * - dllFuncW
   * - dllFuncStr
   * - dllFuncStrW    
   * 
   * これらの名前はDLLの関数名として使うことはできません。
   */
  interface ILoadDllResult {

    /**
     * 読み込まれているDLLファイルのパスを返します
     */
    readonly loadDllFile: string;

    /**
     * DllFuncManagerオブジェクト。    
     * 引数が数値もしくはマルチバイト(char)文字列で、数値を返す関数であることを意味する。    
     * メソッドには秀丸エディタのdllfuncの呼び出し方法で呼び出される関数群があります。
     */
    readonly dllFunc: DllFuncManager;

    /**
     * DllFuncManagerオブジェクト。    
     * 引数が数値もしくはワイド(wchar)文字列で、数値を返す関数であることを意味する。    
     * メソッドには秀丸エディタのdllfuncwの呼び出し方法で呼び出される関数群があります。
     */
    readonly dllFuncW: DllFuncManager;

    /**
     * DllFuncManagerオブジェクト。    
     * 引数が数値もしくはマルチバイト(char)文字列で、マルチバイト(char)文字列を返す関数であることを意味する。    
     * メソッドには秀丸エディタのdllfuncstrの呼び出し方法で呼び出される関数群があります。
     */
    readonly dllFuncStr: DllFuncManager;

    /**
     * DllFuncManagerオブジェクト。    
     * 引数が数値もしくはワイド(wchar)文字列で、ワイド(wchar)文字列を返す関数であることを意味する。    
     * メソッドには秀丸エディタのdllfuncstrwの呼び出し方法で呼び出される関数群があります。
     */
    readonly dllFuncStrW: DllFuncManager;

    /**
     * 関数名が存在するかどうかを返します。    
     * 秀丸マクロのdllfuncexistに対応する関数です。
     * 
     * @param funcname
     * 関数名を指定します。
     * 
     * @comment
     * @参照：
     * @see dllfuncexist
     * 
     * @returns
     * 存在すれば１を返す、存在しなければ０を返す。
     */
    dllFuncExist(funcname: string): number

    /**
     * DLLが解放されるタイミングで呼び出される関数名を指定します。    
     * 秀丸マクロのsetdlldetachfuncに対応する関数です。
     * 
     * @example
     * var dll = loaddll("C:\\abc\\abc.dll");
     * dll.setDllDetachFunc("MyDllDetachFunc");
     * 
     * @comment
     * この文を実行せず、DLL側に"DllDetachFunc_After_Hm866"という関数がエクスポートされていれば、    
     * dll.setDllDetachFunc("DllDetachFunc_After_Hm866");    
     * をしているのと同じになります。
     *
     * DLL側の関数はdllfuncと同じように定義します。
     *
     * @example
     * extern "C" __declspec( dllexport )
     * intptr_t MyDllDetachFunc( intptr_t n_reason ) {
     *    if(n_reason == 1 ) {
     *      // freedll
     *    } else if( n_reason == 2 ) {
     *      // loaddll文による入れ替え
     *    } else if( n_reason == 3 ) {
     *      // プロセス終了時
     *    } else if (n_reason == 4 ) {
     *      // マクロ終了時(keepdll #dll,0;のとき)(
     *    }
     *    return 0;
     * }
     * 
     * @param funcname 
     * 開放時に実行する関数名を指定します。
     * 
     * @comment
     * @参照：
     * @see dllfuncexist
     * 
     * @returns
     * 返り値は意味を持ちません。
     */
    setDllDetachFunc(funcname: string): number
  };

  /**
   * loadDllメソッドは、秀丸用のdllfunc対応のDLLを読み込みます。
   * @param dllpath 
   * DLLのファイル名を指定します。
   *
   * @example
   * var dll = hidemaru.loadDll("c:\\folder\\mydll.dll");
   * 
   * @comment
   * 参照：
   * @see loaddll
   * @see hidemaru.ILoadDllResult
   * 
   * @returns
   * 読み込みに成功した場合、hidemaru.ILoadDllResultを満たすオブジェクトを返します。    
   * 失敗した場合、undefinedを返します。
   */
  function loadDll(dllpath: string): ILoadDllResult | undefined;


  /**
   * s
   * 
   * createobject関数は、COMオブジェクトを作成します。
   * 
   * @param progid 
   * 登録されたCOMオブジェクトのProgIdを指定します。
   * 
   * @example
   * var fso = hidemaru.createObject("Scripting.FileSystemObject");
   * var file = fso.OpenTextFile("c:\\folder\\test_utf16.txt",1,0,-1);
   * var line = file.ReadLine();
   * file.Close();
   * 
   * @returns
   * 読み込みに成功した場合、COMオブジェクトを返します。    
   * 失敗した場合、undefinedを返します。    
   */
  function createObject(progid: string): any | undefined;

  /**
   * s
   * 
   * createobject関数は、COMオブジェクトを作成します。
   * 
   * @param dllpath 
   * DLLのファイル名をフルパスで指定します。
   * 
   * @param typeid 
   * - dllがネイティブのCOMの場合、typeidにCLSIDを記述することで、    
   * 登録なしでCOMオブジェクトを作成することができます。    
   * 対応できるインターフェイスはIDispatch（またはデュアルインターフェース）である必要があります。    
   * - dllがnet framework 4.xで作成したクラスライブラリをCOMとして使用可能にしているとき、    
   * ProgIDを記述することで、現在のユーザーに対して登録し、COMオブジェクトとして作成することができます。    
   * (COMの登録は自動的に「HmRegasm.exe」という秀丸エディタに付属の実行ファイルで行われます、この実行ファイルは.net framework 4.5以上必要です。)    
   * - dllが「.NET 7, .NET 6, .NET 5, .NET Core 3.1」でCOMとして公開可能でIDispatchに対応したDLLを作成している場合、    
   * コンパイル時に末尾に.comhost.dllというファイル名のDLLも同時に生成されますので、どちらのdllを対象にcreateobjectします。    
   * 例えばSample.dllというDLL本体があった場合、Sample.comhost.dllというDLLがセットでできます。    
   * .comhost.dllというファイル名が付いたDLLは、C++等のネイティブコードと同じ互換性のある形式で扱うことが可能です。
   * 
   * @example
   * // ネイティブの場合
   * var obj = null;
   * if(platform() & 0x00080000){
   *     obj = hidemaru.createObject("C:\\Program Files\\Hidemaru\\hmpv64.dll","{609E0957-143D-45CB-986E-5365B7A3ED26}");
   * } else {
   *     obj = hideamru.createObject("C:\\Program Files\\Hidemaru\hmpv.dll","{609E0957-143D-45CB-986E-5365B7A3ED26}");
   * }
   * obj.ShowDialog(hidemaruhandle(0));
   * 
   * @example
   * // .NET 4.xの場合
   * var obj = hideamru.createObject("C:\\Folder\\ClassLibrary1.dll","ClassLibrary1.Test1");
   * 
   * @example
   * // .NET 7, .NET 6, .NET 5, .NET Core 3.1の場合
   * var obj = hidemaru.createObject("C:\\Folder\\Sample.comhost.dll","{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}");
   * 
   * @returns
   * 読み込みに成功した場合、COMオブジェクトを返します。    
   * 失敗した場合、undefinedを返します。    
   */
  function createObject(dllpath: string, typeid: string): any | undefined;

  /**
   * loadTextFileメソッドは、テキストファイルを読み込んで文字列で取得します。
   * 
   * @param filepath 
   * ファイル名をフルパスで指定します。
   * 
   * @example
   * js{
   *     var text = hidemaru.loadTextFile("c:\\folder\\a.txt");
   * }
   * 
   * @comment
   * ファイルは、Shift-JIS,UTF-8,UTF-16を自動認識します。    
   * ファイルの内容をテキストに変換し、文字列として返します。    
   * 10MBの上限があります。
   * 
   * @returns
   * 読み込みに成功した場合、ファイルの内容を文字列で返します。    
   * 失敗した場合、undefinedを返します。
   */
  function loadTextFile(filepath: string): string | undefined;

  /**
   * f
   * 
   * isMacroExecutingメソッドは、現在マクロ実行中かどうかを取得します。    
   * 
   * @example
   * js{
   *     var a = hidemaru.isMacroExecuting();
   * }
   * 
   * @example
   * jsmode "WebView2";
   * js{
   *   function asyncFunc() {
   *     //ここはマクロ実行中ではない
   *     var b = hidemaru.isMacroExecuting();
   *     console.log(b);
   *   }
   *   
   *   debuginfo(2);
   *   setTimeout(asyncFunc, 2000);
   *   var a = hidemaru.isMacroExecuting();
   *   console.log(a);
   * }
   * endmacro;
   * 
   * @comment
   * 参照：
   * @see WM_ISMACROEXECUTING
   * 
   * @returns
   * マクロ実行中の場合は0以外、マクロ実行中でない場合は0を返します。
   */
  function isMacroExecuting(): number;

  /**
   * f
   * 
   * postExecMacroFileメソッドは、ファイル名を指定して、マクロ実行をスケジュールします。    
   * 現在のマクロが終了した後、次に実行するマクロをあらかじめ指定する目的で利用できます。    
   * 
   * マクロ実行をスケジュールした後は速やかに現在実行中のメソッド、マクロを終わる必要があります。    
   * 
   * @example
   * // マクロ実行中の中で実行する例
   * js{
   *     hidemaru.postExecMacroFile("test2.mac");
   * }
   * 
   * @example
   * // マクロ実行中ではない時に実行する例
   * jsmode "WebView2";
   * js{
   *   function asyncFunc() {
   *     //ここはマクロ実行中ではない
   *     var b = hidemaru.isMacroExecuting();
   *     console.log(b);
   *   }
   *
   *   debuginfo(2);
   *   setTimeout(asyncFunc, 2000);
   *   var a = hidemaru.isMacroExecuting();
   *   console.log(a);
   * }
   * endmacro;
   * 
   * @returns
   * 返り値はありません。
   */
  function postExecMacroFile(filepath: string): void;

  /**
   * f
   * 
   * postExecMacroMemoryメソッドは、マクロの内容を文字列で指定して、マクロ実行をスケジュールします。    
   * 
   * @example
   * js{
   *     hidemaru.postExecMacroMemory('message "a";');
   * }
   * 
   * @example
   * jsmode "WebView2";
   * js{
   *    function asyncFunc(text){
   *      //ここはマクロ実行中ではない
   *      globaltext=text;
   *      hidemaru.postExecMacroMemory(`
   *        jsmode "WebView2";
   *        js{
   *          message(globaltext);
   *          globaltext=null;
   *        }
   *      `)
   *    }
   *
   *   debuginfo(2);
   *   setTimeout(asyncFunc, 2000);
   * }
   * endmacro;
   * 
   * @returns
   * 返り値はありません。
   */
  function postExecMacroMemory(expression: string): void;
}

/**
 * 秀丸マクロの「ユーザー定義の変数」の値をJavaScriptの変数の値として取得します。
 * 
 * @param varname
 * 取得する変数名を指定します。    
 * "#"から始まる場合、数値型変数を取得します。    
 * "$"から始まる場合、文字列型変数を取得します。
 * 
 * @example
 * $a = "Hello";
 * #b = 3333;
 * js {
 *     var s = getVar( "$a" );
 *     s += " JavaScript";
 *     setVar( "$a", s );
 *     var num = getVar( "#b" );
 * }
 *
 * @returns
 * 指定した秀丸マクロ変数の値を返す
 */
declare function getVar(varname: string): number | string;


/**
 * JavaScriptの変数の値を、秀丸マクロの「ユーザー定義の変数」へ設定します。
 * 
 * @param varname
 * 設定する変数名を指定します。
 * "#"から始まる場合、数値型変数を設定します。    
 * "$"から始まる場合、文字列型変数を設定します。
 * 
 * @param newvalue
 * 設定する変数の内容を指定します。
 * 
 * @example
 * $a = "Hello";
 * js {
 *     var s = getVar( "$a" );
 *     s += " JavaScript";
 *     setVar( "$a", s );
 *     setVar( "#b", 333 );
 * }
 *
 * @returns
 * 値の設定が成功したら１，失敗したら０を返す
 */
declare function setVar(varname: string, newvalue: string | number | boolean): number;

/**
 * k    
 * 
 * 自動起動マクロとしてマクロが実行されたとき、どのような種類かを表します。
 *
 * @returns
 * 0 自動起動マクロとして実行されていない    
 * 1 ファイルを開いた直後    
 * 2 新規作成直後    
 * 3 保存直前と直後    
 * 4 印刷直前と直後    
 * 5 編集後タイマー    
 * 6 カーソル移動後タイマー    
 * 7 ファイルを閉じる直前    
 * 8 アクティブ切り替え後(V8.00以降)    
 * 9 テンプレート(スニペット)による実行(V9.16以降)    
 */
declare function event(): number;

/**
 * f
 * 
 * geteventparam関数は、自動起動マクロとしてマクロが呼び出されたとき、    
 * さらにどのような条件で呼び出されたかなどの詳細な情報を取得します。    
 * 
 * @param event_infomation_ix
 * どのような情報を取得するかを指定します。    
 * eventによって意味が違います。    
 * 
 * @comment
 * eventの値によって以下の情報を返します。    
 * - ファイルを開いた直後(event==1)    
 * geteventparam(0)の返り値：    
 *   - 0 外部から開いた    
 *   - 1 秀丸エディタから開いた    
 *   - 2 常駐秀丸エディタから開いた    
 *   - 3 タグジャンプによって開いた(V8.30以降)    
 *
 * @example
 * if( event() == 1 ) {
 *     var a = geteventparam( 0 );
 * }
 * 
 * @comment
 * - 新規作成直後(event==2)    
 * geteventparam(0)の返り値：    
 *    - 0 外部から開いた    
 *    - 1 秀丸エディタから開いた    
 *    - 2 常駐秀丸エディタから開いた    
 * 
 * @example
 * if( event() == 2 ) {
 *     var a = geteventparam( 0 );
 * }
 *
 * @comment
 * - 保存直前と直後(event==3)    
 * geteventparam(0)の返り値：    
 *    - 0 保存直前    
 *    - 1 保存直後    
 * 
 * @example
 * if( event() == 3 ) {
 *     var a = geteventparam( 0 );
 *     if( a == 0 ) {
 *         message("保存直前");
 *     } else if( a == 1 ) {
 *         message("保存直後");
 *     }
 * }
 * 
 * @comment
 * - 印刷直前と直後(event==4)    
 * geteventparam(0)の返り値：    
 *    - 0 印刷直前    
 *    - 1 印刷直後    
 * 
 * @example
 * if( event() == 4 ) {
 *     var a = geteventparam( 0 );
 * }
 * 
 * @comment
 * - 編集後タイマー(event==5)    
 *   - geteventparam(0)の返り値：    
 *     - 0 通常の編集    
 *     - 1 やり直しによる編集    
 *   - geteventparam(1)の返り値：    
 *     - 0 改行以外の編集    
 *     - 1 改行による編集（遅延時間0msのときのみ）    
 *   - geteventparam(2)の返り値：    
 *     - 0 単語補完の決定直後以外 
 *     - 1 単語補完の決定直後    
 *   - geteventparam(3)の返り値：    
 *      - 遅延時間(ms)    
 *   - geteventparam(4)の返り値：    
 *      - 遅延時間0msのとき、入力された一文字の文字コード。    
 *   - geteventparam(5)の返り値：    
 *      - 0 削除ではない編集
 *      - 1 通常の削除
 *      - 2 BackSpace
 *      - 3 範囲選択
 *      - 4 行削除
 *      - 5 単語削除
 *      - 6 カーソルより後ろを削除
 *      - 7 カーソルより前を削除
 *      - 8 置換
 *      - 9 全置換
 *      - 10 複数選択の入力
 *      - 11 複数選択の削除
 *      - 12 BOX選択の入力
 *      - 13 BOX削除
 *      - 14 CSV/TSVモードで列の移動
 * 
 * @example
 * if( event() == 5 ) {
 *     var undo = geteventparam( 0 );
 *     var enter = geteventparam( 1 );
 *     var autocomp = geteventparam( 2 );
 *     var time = geteventparam( 3 );
 *     var char = geteventparam( 4 );
 *     var type = geteventparam( 5 );
 * }
 * 
 * @comment
 * - カーソル移動後タイマー(event==6)    
 *   - geteventparam(3)の返り値：    
 *     - 遅延時間(ms)    
 *   - geteventparam(4)の返り値：    
 *     - どういうコマンドによってカーソル移動したかを表すコマンド値。    
 *       通常の矢印キーによりカーソル移動は0になります。    
 *       コマンド値を調べるするマクロの例：（ステータスバーに表示）     
 *   - geteventparam(5)の返り値：    
 *      - 最後に実行した上検索/下検索が成功したかどうかを返します。    
 *        title(str(geteventparam(4)),1);    
 *        title(-1,1);    
 * 
 * @example
 * if ( event() == 6 ) {
 *     var time = geteventparam( 3 );
 *     var cmd = geteventparam( 4 );
 *     var found = geteventparam( 5 );
 * }
 * 
 * @comment
 * - ファイルを閉じる直前(event==7)    
 *    - geteventparam(1)の返り値：    
 *      - 0 破棄して終了以外    
 *      - 1 破棄して終了    
 * 
 * @example
 * if ( event() == 7 ) {
 *     var a = geteventparam( 1 );
 * }
 * 
 * @example
 * - アクティブ切り替え後(event==8)    
 *   - geteventparam(0)の返り値：    
 *     - 0 タグジャンプによって開いた以外    
 *     - 3 タグジャンプによって開いた    
 *   - geteventparam(3)の返り値：    
 *     - 遅延時間(ms)    
 * 
 * @example
 * if ( event() == 8 ) {
 *     var tagjump = geteventparam( 0 );
 *     var time = geteventparam( 3 );
 * }
 * 
 * @comment
 * - テンプレート(スニペット)による実行(event==9)    
 *   - geteventparam(0)の返り値：    
 *     - 0 直前の選択内容    
 * 
 * @example
 * if ( event() == 9 ) {
 *     var seltext = geteventparam( 0 );
 * }
 * 
 * @returns
 * 指定された情報を返します。    
 * eventとパラメータの値によって意味が違います。    
 * 指定によって数値が返るか文字列が返るかも違います。
 */
declare function geteventparam(event_infomation_ix: number): number | string

/**
 * s    
 * 
 * seteventnotify文は、自動起動マクロとしてマクロが呼び出されたとき、    
 * マクロ実行後の処理を秀丸エディタに指示します。
 * 
 * eventの値によって意味が違います。
 * geteventnotifyを使うことで、seteventnotifyで設定された値を取得できます。
 * 
 * @param notify_target    
 * @comment
 * - 自動起動マクロとして実行されていない(event==0)    
 * フォーカスが各種の枠にあるとき、キー割り当てによって   
 * マクロが実行された場合に本来のキー操作を行うかどうかを決めます。    
 * 枠のキー操作を続行する場合、マクロは本体に関する操作等は行わず、    
 * すぐにseteventnotify(1);してマクロを終了する必要があります。    
 * @example
 *   seteventnotify(0); // 枠のキー操作を中断
 *   seteventnotify(1); // 枠のキー操作を続行
 * 
 * @comment
 * - ファイルを開いた直後(event==1)    
 * なし
 * 
 * - 新規作成直後(event==2)    
 * なし
 * 
 * - 保存直前と直後(event==3) かつ、geteventparam(0)==0で保存直前の場合。    
 * @example
 *   seteventnotify(0); // 保存処理を続行
 *   seteventnotify(1); // 保存処理を中断
 * 
 * - 印刷直前と直後(event==4) かつ、geteventparam(0)==0で印刷直前の場合。    
 * @example
 *   seteventnotify(0); // 印刷処理を続行
 *   seteventnotify(1); // 印刷処理を中断
 * 
 * - 編集後タイマー(event==5)    
 * なし
 * 
 * - カーソル移動後タイマー(event==6)    
 * なし
 * 
 * - ファイルを閉じる直前(event==7)    
 * @example
 *   seteventnotify(0); // 閉じる処理を続行
 *   seteventnotify(1); // 閉じる処理を中断
 *   seteventnotify(2); // 保存するかどうかの問い合わせは出さずに続行
 *
 * - アクティブ切り替え後(event==8)
 * なし
 * 
 * @returns
 * result相当。成功すれば1、失敗すれば0;
 */
declare function seteventnotify(notify_target: number): number;

/**
 * f    
 * 
 * geteventnotify関数は、seteventnotifyで設定された値を取得します。
 * 
 * @param notify_target 0を指定してください。    
 * パラメータは将来のために予約されています。
 * 
 * @returns seteventnotifyで設定された値を返します。
 * 
 */
declare function geteventnotify(notify_target: 0): number;

/**
 * s    
 * 
 * print文は、印刷をします。
 * @param showdialog 印刷ダイアログを出すかどうかを指定します。
 * @returns 成功したらresultは0以外になります。    
 *        　失敗したらresultは0になります。
 */
declare function print(showdialog?: number): number;

/**
 * s
 * 
 * 文字列で指定するマクロを実行します。
 * @param expression : 実行する秀丸マクロ文字列
 * 
 * @comment
 * 参考：
 * @see Hidemaru_EvalMacro    
 * @see WM_REMOTE_EVALMACRO    
 * @see hidemaru.evalMacro
 * 
 * @returns 成功したらresultは0以外になります。    
 *        　失敗したらresultは0になります。
 */
declare function evalMacro(expression: string): number;

/**
 * f
 * 
 * JavaScriptのeval関数と同一です。
 * @param expression : 実行するJavaScript文字列
 * @returns JavaScriptとしてeval評価された最終的なオブジェクト
 */
declare function evalJs(expression: string): any;

/**
 * k    
 * 
 * (※JavaScriptにおいては、文も関数化されており、返り値がresult相当であるため、    
 * この関数を使う機会はほとんど無いはずです。    
 * 
 * resultキーワードは、基本的には直前に行った文(命令)の結果を返すことになっています。    
 * 例えばquestion文を実行した直後には「はい」か「いいえ」のどちらのボタンか押されたかの値がresultには格納されています。    
 * @returns 直前の命令文の結果値
 */
declare function result(): number;

/**
 * k    
 * 
 * 秀丸エディタのバージョン番号です。    
 * @returns 
 * Version9.18の場合、918という値になります。    
 * 秀丸エディタβ版では、下２桁は98以下であり、    
 * 秀丸エディタ正式版では、下２桁は99となります。
 */
declare function version(): number;

/**
 * k    
 * 
 * 秀丸エディタが実行されているOSなどの情報を表します。    
 * 以下の値を論理積(&)した値で各種状態を取得できます。    
 * - 0x000000ff　Windowsのマイナーバージョン    
 * - 0x0000ff00　Windowsのメジャーバージョン    
 * - 0x00010000　NTかどうか    
 * - 0x00020000　管理者に昇格しているかどうか    
 * - 0x00040000　HKLM,HKCRに書き込み可能かどうか    
 * - 0x00080000　64bit版かどうか    
 * - 0x00100000　64bit環境の中の32bit版かどうか    
 * - 0x00200000　英語版かどうか    
 * - 0x00400000　浮動小数点数版かどうか    
 * - 0x00800000　秀丸メール上で動作しているかどうか    
 * - 0x01000000　持ち出しキットで動作中かどうか    
 * - 0x02000000　ストアアプリ版かどうか    
 */
declare function platform(): number;

/**
 * k    
 * 
 * ダークモードの状態を表します。    
 * 以下の値を論理積(&)した値で各種状態を取得できます。    
 * - 0x00000001 Windowsの設定がダークモードで、秀丸エディタもダークモード対応が有効な状態で動作しています。    
 * - 0x00000002 ダークモード対応が有効で、かつ、色設定の自動変換が有効です。    
 */
declare function darkmode(): number;

/**
 * k    
 * 
 * カラーマーカーの予約されたレイヤーのうち、検索の色付けを表す文字列です。    
 * @returns "\x01#findmarker"という文字列と同じです。
 */
declare function findmarker(): string;

/**
 * k    
 * 
 * カラーマーカーの予約されたレイヤーのうち、比較結果を表す文字列です。    
 * @returns "\x01#diff"という文字列と同じです。
 */
declare function diff(): string;

/**
 * k    
 * 
 * カラーマーカーの予約されたレイヤーのうち、複数選択予約を表す文字列です。    
 * @returns "\x01#reservedmultisel"という文字列と同じです。
 */
declare function reservedmultisel(): string;


/**
 * k    
 * 
 * 正規表現DLLをフルパスで表します。    
 */
declare function regulardll(): string;

/**
 * k    
 * 
 * カーソルのx座標を表します。    
 * カーソルが一番左にいる時が0です。    
 *
 * タブ文字は、固定ピッチフォントの場合は見た目上のタブの文字数分で数えます。    
 * プロポーショナルフォントの場合はタブは1文字として数えます。    
 *
 * Unicode独自の文字は、固定ピッチフォントの場合は、表示されている文字の幅によって半角相当であれば1、全角相当であれば2になります。    
 * プロポーショナルフォントの場合は4として数えます。    
 *
 * TSV/CSV/自由配置モードのときは、固定ピッチフォントであってもプロポーショナルフォント扱いになります。    
 * 
 * @returns カーソルのx座標
 */
declare function x(): number;

/**
 * k    
 * 
 * カーソルのy座標を表します。    
 * y座標は、現在編集中のテキストの先頭行からワープロ的に行番号を計算した値です。    
 * 一番上にいる時が0です。 
 * 
 * @returns カーソルのy座標
 */
declare function y(): number;

/**
 * k    
 * 
 * カーソルのカラム位置を表します。    
 * カラム位置は、論理行頭（直前の改行文字の次）から現在のカーソル位置までの文字数を数えた値です。    
 * カーソルが論理行頭にいる時が0です。    
 * 半角は1文字、全角は2文字、タブ文字は1文字として数えられます。    
 * プロポーショナルフォントの場合でも、文字の幅によって半角相当は1文字、全角相当は2文字として数えられます。    
 * 結合文字は実際に幅として現れなくても文字数に加算されます。
 * @returns カーソルのカラム位置(秀丸独自単位)
 */
declare function column(): number;


/**
 * k    
 * 
 * カーソルのカラム位置を表します。    
 * columnの「UCS-2単」位版
 * @returns カーソルのカラム位置(UCS-2単位)
 */
declare function column_wcs(): number;

/**
 * k    
 * 
 * カーソルのカラム位置を表します。    
 * columnの「UCS-4」単位版
 * @returns カーソルのカラム位置(UCS-4単位)
 */
declare function column_ucs4(): number;

/**
 * k    
 * 
 * カーソルのカラム位置を表します。    
 * columnの「カーソル移動」単位版
 * @returns カーソルのカラム位置(カーソル移動単位)
 */
declare function column_cmu(): number;

/**
 * k    
 * 
 * カーソルのカラム位置を表します。    
 * columnの「書記素クラスター」単位版
 * @returns カーソルのカラム位置(書記素クラスター単位)
 */
declare function column_gcu(): number;

/**
 * k    
 * 
 * カーソル位置の、エディタ的に計算した行番号を表します。    
 * ファイルの先頭が1です。 
 * @returns カーソル位置の行番号
 */
declare function lineno(): number;

/**
 * k    
 * 
 * タブストップごとに数えた位置、または    
 * TSVモード/CSVモードのタブ区切り/カンマ区切りの位置で、    
 * カーソルがどの位置に含まれるかを表します。    
 * forwardtab, backtabの数え方と対応しています。    
 * 0から数えます。    
 * 現在のテキスト内容から得られる最大の値はtabcolumnmaxで取得できます。
 * @returns タブストップごとに数えた位置、または、TSVモード/CSVモードのタブ区切り/カンマ区切りの位置
 */
declare function tabcolumn(): number;

/**
 * k    
 * 
 * カーソルの見た目上のx座標を表します。    
 * xは場合によっては見た目上の位置ではなく、    
 * 文字のカウントの仕方によって見た目上の座標ではないことがありますが、    
 * xviewは見た目上の座標を表します。    
 * 
 * 例えば、プロポーショナルフォントやTSV/CSVモードの場合、    
 * xはタブ文字は1文字としてカウントされますが、    
 * xviewは見た目上の位置で表されます。    
 * 
 * [その他]→[動作環境]→[編集]→[高度な編集2]の    
 * 「タブ文字の上にカーソル移動した時」が「貫通する」のときに移動できる場所でも、    
 * 正確に表します。
 * 
 * この値を使った位置に移動するには、movetoview文を使います。
 * @returns カーソルの見た目上のx座標
 */
declare function xview(): number;

/**
 * k    
 * 
 * カーソル位置の文字コードを表します。    
 * 2バイト文字の場合は2バイトのコードを返します。    
 * 例えば全角空白の場合は0x8140になります。    
 * 
 * フリーカーソルモードの時に、カーソルが改行文字より後ろに位置する場合は    
 * codeの値は0になります。
 * 
 * 改行文字の上の場合は0x0Dになります。    
 * （改行コードがCR/LF/CR+LFのいずれであっても0x0Dになります）
 * 
 * ファイルの最後の[EOF]の上の場合は-1になります。
 * 文字コードは、Unicodeではなく適用されるフォントの文字セットによる文字コードで、    
 * 通常ははShift-JISになります。
 * 
 * Unicodeの文字コードの場合はunicodeキーワードを使ってください。
 * 
 * @returns カーソル位置の文字コード（数値）
 */
declare function code(): number;

/**
 * k    
 * 
 * カーソル位置のUnicodeの文字コード（数値）を取得します。
 * U+10000以上のUTF-16でサロゲートペアとなる文字も0x10000以上の数値として取得できます。
 * 文字のUnicodeの文字コードを返すunicode関数と同名ですが、違うので注意が必要です。
 * 
 * @returns カーソル位置のUnicodeの文字コード（数値）
 */
declare function unicode(): number;

/**
 * f    
 * 
 * unicode関数は、文字列の先頭の文字のUnicodeの文字コード（数値）を取得します。    
 * 対象となる文字列を指定します。先頭の１文字だけを見ます。    
 * ascii関数のUnicode版です。    
 * s1の先頭の文字のUnicodeの値を返します。    
 * unichar関数と逆の関数です。
 * @param text 
 * @returns 文字列の先頭の文字のUnicodeの文字コード（数値）
 */
declare function unicode(text: string): number;


/**
 * k
 * 
 * カーソル位置の文字の色コードを返します。色コードの意味は以下のようになります。    
 * 
 * - 0x00000000 ... 普通の文字    
 * - 0x00000019 ... スクリプト部分    
 * - 0x00000004 ... 強調表示1    
 * - 0x00000007 ... 強調表示2    
 * - 0x00000016 ... 強調表示3    
 * - 0x00000017 ... 強調表示4    
 * - 0x00004004 ... 強調表示5    
 * - 0x00004007 ... 強調表示6    
 * - 0x00004016 ... 強調表示7    
 * - 0x00004017 ... 強調表示8    
 * - 0x0000001B ... 数値(V7.08以降)    
 * - 0x00000014 ... 文字定数    
 * - 0x0000000D ... HTMLタグ全体    
 * - 0x0000000E ... HTMLタグのエレメント    
 * - 0x0000000F ... HTMLタグのアトリビュート    
 * - 0x00000006 ... 行の強調表示1    
 * - 0x00000009 ... 行の強調表示2    
 * - 0x00004006 ... 行の強調表示3    
 * - 0x00004009 ... 行の強調表示4    
 * - 0x00000003 ... コメント    
 * - 0x0000001A ... #ifdef等での無効部分    
 * - 0x0000000C ... メールアドレス    
 * - 0x0000000B ... ホームページURL    
 * - 0x00000015 ... ファイル名と思わしき場所    
 * - 0x00000005 ... 特に強調表示1    
 * - 0x00000008 ... 特に強調表示2    
 * - 0x00004005 ... 特に強調表示3    
 * - 0x00004008 ... 特に強調表示4    
 *     
 * さらに、以下の値が組み合わされます。（OR演算された値となります）    
 * - 0x00000020 ... タブ文字    
 * - 0x00000040 ... 全角空白（記号表示ONの時のみ）    
 * - 0x00000080 ... 半角空白（記号表示ONの時のみ）    
 * - 0x00000100 ... 範囲選択    
 * - 0x00000200 ... 制御コード（0x01～0x1Fで、タブ,改行,EOF以外の文字）    
 * - 0x00000400 ... 「...を開く」が出来る場所（URL、Email、ファイル名部分）    
 * - 0x00000800 ... 「...を秀丸エディタで開く」が出来る場所（ファイル名部分）    
 * - 0x00001000 ... Email部分    
 * - 0x00010000 ... 検索文字列の強調    
 * - 0x00080000 ... カラーマーカー    
 *     
 * 「普通の文字」～「特に強調表示4」の色コードは、(colorcode & 0x401F)して取得できます。    
 * （以前のヘルプでは色コードを0x001fで取得できるとしていましたが、強調5～8,行の強調3～4,特に強調3～4は取得できないので、0x401fが適切です）    
 *     
 * 改行文字の上またはファイル末尾（[EOF]）の上、およびそれより後ろの位置ではcolorcodeは常に0になります。    
 *     
 * カーソルが行末にある場合、colorcodeに角カッコの添え字を付けることで、行末の情報を得ることができます。（V8.00以降）    
 * 
 * @param line_flag    
 * 1を指定すると、行の強調があるときの改行以降の色、または改行の色を表します。    
 * 2を指定すると、複数行強調/コメントがあるときの、次の行へと続く色を表します。
 */
declare function colorcode(line_flag?: number): number;

/**
 * k    
 * 
 * カーソル位置がマークされているかどうかを返します。    
 * @returns カーソル位置がマークされていたら1、そうでなければ0
 */
declare function marked(): number;


/**
 * k    
 * 
 * カーソル位置に編集マーク（編集した行）があるかどうかを返します。    
 * @returns 編集マーク（編集した行）があれば1、そうでなければ0
 */
declare function lineupdated(): number;


/**
 * k    
 * 
 * カーソルのX座標のピクセル位置を返します。    
 * 
 * @returns カーソルのX座標のピクセル位置
 */
declare function xpixel(): number;

/**
 * k    
 * 
 * カーソルのY座標のピクセル位置を返します。    
 * 
 * @returns カーソルのY座標のピクセル位置
 */
declare function ypixel(): number;

/**
 * k    
 * 
 * 「前のカーソル位置」として記憶されているカーソル位置のX座標を表します。    
 * （xキーワードと同じ文字単位）
 * 
 * @returns 前のカーソル位置のX座標
 */
declare function prevposx(): number;

/**
 * k    
 * 
 * 「前のカーソル位置」として記憶されているカーソル位置のY座標を表します。    
 * （yキーワードと同じワープロ的）
 * 
 * @returns 前のカーソル位置のY座標
 */
declare function prevposy(): number;

/**
 * k    
 * 
 * 最後に編集した所のX座標を表します。    
 * （xキーワードと同じ文字単位）
 * 
 * @returns 最後に編集した所のX座標
 */
declare function lastupdatedx(): number;

/**
 * k    
 * 
 * 最後に編集した所のY座標を表します。    
 * （yキーワードと同じワープロ的）
 * 
 * @returns 最後に編集した所のY座標
 */
declare function lastupdatedy(): number;

/**
 * k    
 * 
 * マウスカーソルの場所にある文字カーソルのcolumn相当の位置を表します。    
 * 参照:    
 * https://help.maruo.co.jp/hidemac/html/200_Api_Hidemaru_GetCursorPosUnicodeFromMousePos.html
 * 
 * @returns マウスカーソルの場所にある文字カーソルのcolumn相当の位置
 */
declare function mousecolumn(): number;

/**
 * k    
 * 
 * マウスカーソルの場所にある文字カーソルのlineno相当の位置を表します。    
 * 参照:    
 * https://help.maruo.co.jp/hidemac/html/200_Api_Hidemaru_GetCursorPosUnicodeFromMousePos.html
 * 
 * @returns マウスカーソルの場所にある文字カーソルのlineno相当の位置
 */
declare function mouselineno(): number;

/**
 * k    
 * 
 * 現在のファイルの、ワープロ的(折り返しも一行とする)に計算した行数を表します。    
 * 新規作成直後の内容が無い場合は１を返します。    
 * 
 * ワープロ的ではなく、エディタ的(改行だけを数える)にカウントしたい場合は、    
 * linecount2を利用すること。
 * 
 * @returns 現在のファイルの、ワープロ的(折り返しも一行とする)に計算した行数。    
 * 
 */
declare function linecount(): number;

/**
 * k    
 * 
 * 現在のファイルの、エディタ的(改行だけを数える)に計算した行数を表します。    
 * 新規作成直後の内容が無い場合は１を返します。
 * 
 * @returns 現在のファイルの、エディタ的(改行だけを数える)に計算した行数
 */
declare function linecount2(): number;

/**
 * k    
 * 
 * 現在のカーソル位置の行の長さを表します。    
 * この値は画面上での１行の長さで、右端で折り返している場合は、    
 * 行頭から折り返している位置までの長さだけ計算します。    
 * タブ文字も、画面上での文字数として計算します。    
 * 
 * @param line_num 引数を指定すると、指定した行の値を得ることができます。    
 * 行の数え方はワープロ的(折り返しも一行とする)で、0から数えます。    
 * @example
 * var current = linelen();
 * var top = linelen(0);    
 * var bottom = linelen(linecount()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen(line_num?: number): number;

/**
 * k
 * 
 * linelen の「エディタ的に計算した」長さを返します。    
 * つまり、論理行頭から改行文字（または[EOF]）までの文字数を計算します。    
 * タブ文字は１文字として計算します。
 * 
 * @param line_num2 引数を指定すると、指定した行の値を得ることができます。    
 * 行の数え方はエディタ的(改行だけを数える)で、0から数えます。
 * @example
 * var current = linelen2();
 * var current = linelen2(lineno()-1); // 上と同じ
 * var top = linelen2(0);    
 * var bottom = linelen2(linecount2()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen2(line_num2?: number): number;

/**
 * k
 * 
 * linelen2と同様の処理だが、UnicodeのUCS-2として文字を数えるバージョン。
 * @example
 * var current = linelen_wcs();
 * var current = linelen_wcs(lineno()-1); // 上と同じ
 * var top = linelen_wcs(0);    
 * var bottom = linelen_wcs(linecount2()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen_wcs(line_num2?: number): number;

/**
 * k
 * 
 * linelen2と同様の処理だが、UnicodeのUCS-4として文字を数えるバージョン。
 * @example
 * var current = linelen_ucs4();
 * var current = linelen_ucs4(lineno()-1); // 上と同じ
 * var top = linelen_ucs4(0);    
 * var bottom = linelen_ucs4(linecount2()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen_ucs4(line_num2?: number): number;

/**
 * k
 * 
 * linelen2と同様の処理だが、カーソル移動単位として数えるバージョン。
 * @example
 * var current = linelen_cmu();
 * var current = linelen_cmu(lineno()-1); // 上と同じ
 * var top = linelen_cmu(0);    
 * var bottom = linelen_cmu(linecount2()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen_cmu(line_num2?: number): number;

/**
 * k
 * 
 * linelen2と同様の処理だが、書記素クラスター単位として数えるバージョン。
 * @example
 * var current = linelen_gcu();
 * var current = linelen_gcu(lineno()-1); // 上と同じ
 * var top = linelen_gcu(0);    
 * var bottom = linelen_gcu(linecount2()-1);
 * 
 * @returns カーソル位置(もしくは指定)の行の長さ
 */
declare function linelen_gcu(line_num2?: number): number;

/**
 * k    
 * 
 * tabcolumnの数え方で、現在のテキスト内容から得られる最大の値を表します。
 * @returns 現在のテキスト内容から得られる最大の値
 */
declare function tabcolumnmax(): number;

/**
 * k    
 * 
 * 範囲選択中かどうかを表します。
 * @returns 範囲選択中の場合は１、そうでない場合は０
 */
declare function selecting(): number;

/**
 * k    
 * 
 * BOX範囲選択中かどうかを表します。
 * @returns BOX範囲選択中の場合は１、そうでない場合は０
 */
declare function rectselecting(): number;

/**
 * k    
 * 
 * 「行選択開始」コマンドによる選択中かどうかを表します。
 * @returns 「行選択開始」コマンドによる選択中の場合は１、そうでない場合は０
 */
declare function lineselecting(): number;

/**
 * k    
 * 
 * 「選択開始」「BOX選択開始」「行選択開始」コマンドによる選択中かどうかを表します。
 * @returns 「選択開始」「BOX選択開始」「行選択開始」コマンドによる選択中の場合は１、そうでない場合は０
 */
declare function selectionlock(): number;

/**
 * k    
 * 
 * マウスによる選択中かどうかと、その選択方法を表します。    
 * 自動起動マクロのカーソル移動後タイマーで知ることができます。
 * @returns
 * - 0：マウスによる選択ではない    
 * - 1：文字単位の選択    
 * - 2：単語単位の選択（本文ダブルクリックのドラッグ操作）    
 * - 3：行単位（折り返しまで）の選択（行番号表示部分のドラッグ）    
 * - 4：行単位（改行まで）の選択（行番号表示部分のダブルクリックのドラッグ、または本文トリプルクリックのドラッグ操作）    
 */
declare function mouseselecting(): number;

/**
 * k    
 * 
 * 複数選択中であるかどうかを表します。    
 * @returns 複数選択中の場合は１、そうでない場合は０    
 * ただし、複数選択中で、全てが幅ゼロの場合は２
 */
declare function multiselecting(): number;

/**
 * k    
 * 
 * 複数選択時、選択されている個数を表します。    
 * @returns 複数選択時、選択されている個数。    
 */
declare function multiselectcount(): number;

/**
 * k    
 * 
 * 範囲内検索の状態かどうかを表します。    
 * （＝検索ダイアログで「選択した範囲」で検索した状態）   
 * 
 * 
 * @returns 検索ダイアログの「選択した範囲」の横の設定が「行単位」の場合は1、    
 * 「文字単位」の場合は2になります。
 */
declare function inselecting(): number;

/**
 * k    
 * 
 * 範囲選択開始位置のx座標を表します。    
 * 複数選択時、選択している番目を指定することで該当の範囲選択開始位置を取得できます。    
 *
 * @param selected_range_num n番目の範囲選択という指定。0から始まる。
 * 
 * @example
 * var n_selected_top_x = seltopx(n); // n番目の範囲選択の開始位置のx座標
 *
 * @returns 範囲選択開始位置のx座標。該当の選択範囲がなければ-1を返す。
 */
declare function seltopx(selected_range_num?: number): number;

/**
 * k    
 * 
 * 範囲選択開始位置のy座標を表します。    
 * 複数選択時、選択している番目を指定することで該当の範囲選択開始位置を取得できます。    
 *
 * @param selected_range_num n番目の範囲選択という指定。0から始まる。
 * 
 * @example
 * var n_selected_top_y = seltopy(n); // n番目の範囲選択の開始位置のy座標
 *
 * @returns 範囲選択開始位置のy座標。該当の選択範囲がなければ-1を返す。
 */
declare function seltopy(selected_range_num?: number): number;

/**
 * k    
 * 
 * 範囲選択終了位置のx座標を表します。    
 * 複数選択時、選択している番目を指定することで該当の範囲選択開始位置を取得できます。    
 *
 * @param selected_range_num n番目の範囲選択という指定。0から始まる。
 * 
 * @example
 * var n_selected_top_x = selendx(n); // n番目の範囲選択終了位置のx座標
 *
 * @returns 範囲選択終了位置のx座標。該当の選択範囲がなければ-1を返す。
 */
declare function selendx(selected_range_num?: number): number;

/**
 * k    
 * 
 * 範囲選択終了位置のy座標を表します。    
 * 複数選択時、選択している番目を指定することで該当の範囲選択開始位置を取得できます。    
 *
 * @param selected_range_num n番目の範囲選択という指定。0から始まる。
 * 
 * @example
 * var n_selected_top_y = selendy(n); // n番目の範囲選択の開始位置のy座標
 *
 * @returns 範囲選択終了位置のy座標。該当の選択範囲がなければ-1を返す。
 */
declare function selendy(selected_range_num?: number): number;

/**
 * k    
 * 
 * 範囲選択開始位置のカラム位置(column相当の値)を表します。    
 * 文字の単位ごとに各種のバリエーションがあります。
 *（seltop_wcs, seltop_ucs4, seltop_cmu, seltop_gcu）   
 * @returns 範囲選択開始位置のカラム位置(column相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function seltopcolumn(): number;

/**
 * k    
 * 
 * seltopcolumnのUCS-2単位版
 * @returns 範囲選択開始位置のカラム位置(column_wcs相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function seltop_wcs(): number;

/**
 * k    
 * 
 * seltopcolumnのUCS-4単位版
 * @returns 範囲選択開始位置のカラム位置(column_ucs4相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function seltop_ucs4(): number;


/**
 * k    
 * 
 * seltopcolumnの秀丸単位(カーソル移動)版
 * @returns 範囲選択開始位置のカラム位置(column_cmu相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function seltop_cmu(): number;

/**
 * k    
 * 
 * seltopcolumnの書記素クラスター単位版
 * @returns 範囲選択開始位置のカラム位置(column_gcu相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function seltop_gcu(): number;

/**
 * k    
 * 
 * 範囲選択開始位置のエディタ的に計算した行番号を表します。
 * @returns 範囲選択開始位置のエディタ的に計算した行番号
 * 選択範囲がなければ最後の範囲選択開始位置のエディタ的に計算した行番号
 */
declare function seltoplineno(): number;

/**
 * k    
 * 
 * 範囲選択終了位置のカラム位置(column相当の値)を表します。    
 * 文字の単位ごとに各種のバリエーションがあります。
 *（selend_wcs, selend_ucs4, selend_cmu, selend_gcu）   
 * @returns 範囲選択終了位置のカラム位置(column相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function selendcolumn(): number;

/**
 * k    
 * 
 * selendcolumnのUCS-2単位版
 * @returns 範囲選択終了位置のカラム位置(column_wcs相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function selend_wcs(): number;

/**
 * k    
 * 
 * selendcolumnのUCS-4単位版
 * @returns 範囲選択終了位置のカラム位置(column_ucs4相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function selend_ucs4(): number;


/**
 * k    
 * 
 * selendcolumnの秀丸単位(カーソル移動)版
 * @returns 範囲選択終了位置のカラム位置(column_cmu相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function selend_cmu(): number;

/**
 * k    
 * 
 * selendcolumnの書記素クラスター単位版
 * @returns 範囲選択終了位置のカラム位置(column_gcu相当の値)。    
 * 選択範囲がなければ最後の選択範囲のカラム位置を返す。
 */
declare function selend_gcu(): number;

/**
 * k    
 * 
 * 範囲選択終了位置のエディタ的に計算した行番号を表します。
 * @returns 範囲選択終了位置のエディタ的に計算した行番号
 * 選択範囲がなければ最後の範囲選択終了位置のエディタ的に計算した行番号
 */
declare function selendlineno(): number;

/**
 * k    
 * 
 * 範囲選択を開始した時の位置、    
 * つまり、選択してる範囲での、現在のカーソル位置の反対側の位置のx座標を表します    
 * @returns 範囲選択を開始した時のx位置。    
 * 選択範囲がなければ範囲選択を開始した時のx位置。
 */
declare function selopenx(): number;

/**
 * k    
 * 
 * 範囲選択を開始した時の位置、    
 * つまり、選択してる範囲での、現在のカーソル位置の反対側の位置のy座標を表します
 * @returns 範囲選択を開始した時のy位置。    
 * 選択範囲がなければ範囲選択を開始した時のy位置。
 */
declare function selopeny(): number;

/**
 * k    
 * 
 * ウィンドウの横幅を文字数で表します。    
 * 左側の余白やスクロールバーなどの外側の部分は含まれていません。    
 * 行番号表示がONの場合はその部分を含んでいます。
 * @returns ウィンドウの横幅を文字数
 */
declare function windowwidth(): number;

/**
 * k    
 * 
 * ウィンドウの高さを文字数で表します。    
 * キャプションやメニューなどの外側の部分は含まれていません。
 * @returns ウィンドウの高さを文字数
 */
declare function windowheight(): number;

/**
 * k    
 * 
 * ウィンドウ全体の横幅をピクセル単位で表します。
 * @returns ウィンドウ全体の横幅のピクセル数
 */
declare function windowcx(): number;

/**
 * k    
 * 
 * ウィンドウ全体の高さをピクセル単位で表します。
 * @returns ウィンドウ全体の高さをピクセル数
 */
declare function windowcy(): number;

/**
 * k    
 * 
 * ウィンドウの左上の位置のx座標をピクセル単位で表します。
 * @returns ウィンドウの左上の位置のx座標をピクセルで返す
 */
declare function windowposx(): number;

/**
 * k    
 * 
 * ウィンドウの左上の位置のy座標をピクセル単位で表します。
 * @returns ウィンドウの左上の位置のy座標をピクセルで返す。
 */
declare function windowposy(): number;

/**
 * k    
 * 
 * ウィンドウの分割の状態を表します。
 * @returns    
 * - 分割されてない場合は０
 * - 分割されていて、カーソルが上側(左側)にある場合は１
 * - カーソルが下側(右側)にある場合は２です。
 */
declare function splitstate(): number;

/**
 * k    
 * 
 * ウィンドウの分割の方式を表します。
 * @returns    
 * - 分割されてない場合は０
 * - 上下分割は１
 * - 左右分割は２
 */
declare function splitmode(): number;

/**
 * k    
 * 
 * ウィンドウの分割されている場合、分割位置を表します。
 * @returns    
 * - ウィンドウの分割されている場合、分割位置。    
 * 全ての行に番号を１から振ったと想定して、何行目相当の位置で分割しているかを返す。    
 * 分割していない場合は、-1を返す
 */
declare function splitpos(): number;

/**
 * k    
 * 
 * ウィンドウの表示の具合を表します。
 * @example
 * var a = windowstate();
 * @param hidemaru_handle hidemaruhandleに相当する値を引数に与えることで、    
 * 他の秀丸エディタからも値を得ることができます。
 * @example
 * var a = windowstate(1); // ２番めの秀丸エディタのウィンドウ具合を得る
 * 
 * @example
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = windowstate(handle);

 * @returns    
 * - 非表示の場合は０    
 * - 通常の表示状態の場合は１
 * - アイコン化されている場合は２
 * - 最大化されている場合は３
 */
declare function windowstate(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * ウィンドウの表示の具合その２です。    
 * 以下の値の論理和です。    
 * - 常に手前に表示　　　0x0001(ビット０)
 * - 全画面表示かどうか　0x0002(ビット１)
 * @example
 * var a = windowstate2() & 0x1; // aが1なら常に手前に表示
 * var b = windowstate2() & 0x2; // bが1なら全画面表示
 * var c = a & b; // cが1なら常に手前に表示で、かつ全画面表示
 * 
 * @param hidemaru_handle hidemaruhandleに相当する値を引数に与えることで、    
 * 他の秀丸エディタからも値を得ることができます。
 * @example
 * var a = windowstate2(1); // ２番めの秀丸エディタのウィンドウ具合を得る
 * 
 * @example
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = windowstate2(handle);

 * @returns    
 * - 非表示の場合は０    
 * - 通常の表示状態の場合は１
 * - アイコン化されている場合は２
 * - 最大化されている場合は３
 */
declare function windowstate2(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * 画面の横サイズをピクセル単位で表します。
 * @returns 画面の横サイズをピクセル単位で返す。
 */
declare function cxscreen(): number;

/**
 * k    
 * 
 * 画面の縦サイズをピクセル単位で表します。
 * @returns 画面の縦サイズをピクセル単位で返す。
 */
declare function cyscreen(): number;

/**
 * k    
 * 
 * 画面の作業領域（タスクバーやOfficeショートカットバーを除いた領域）の左上の位置のx座標を    
 * ピクセル単位で表します。
 * @returns 画面の作業領域の左上の位置のx座標
 */
declare function xworkarea(): number;

/**
 * k    
 * 
 * 画面の作業領域（タスクバーやOfficeショートカットバーを除いた領域）の左上の位置のy座標を    
 * ピクセル単位で表します。
 * @returns 画面の作業領域の左上の位置のy座標
 */
declare function yworkarea(): number;

/**
 * k    
 * 
 * 画面の作業領域の横サイズをピクセル単位で表します
 * @returns 画面の作業領域の横サイズをピクセル単位で返す
 */
declare function cxworkarea(): number;

/**
 * k    
 * 
 * 画面の作業領域の縦サイズをピクセル単位で表します。
 * @returns 画面の作業領域の縦サイズをピクセル単位で返す
 */
declare function cyworkarea(): number;

/**
 * k    
 * 
 * 画面の作業領域の縦サイズをピクセル単位で表します。
 * @returns 画面の作業領域の縦サイズをピクセル単位で返す
 */
declare function cyworkarea(): number;

/**
 * k    
 * 
 * マルチモニタ環境において、現在のモニタ番号を表します。    
 * モニタ番号は０番から始まります。
 * ちなみにsetmonitor文を使うと指定したモニタに移動できます。
 * @returns 現在のモニタ番号を返す。０番から始まります。
 */
declare function monitor(): number;

/**
 * k    
 * 
 * マルチモニタ環境において、モニタの数を表します。    
 * @returns モニタの数
 */
declare function monitorcount(): number;

/**
 * k    
 * 
 * タブモード（ウィンドウ一覧のタブ）が有効であるかを表します。    
 * 
 * @comment
 * 参照：
 * @see settabmode 
 * 
 * @returns タブモードなら１、そうでないなら０
 */
declare function tabmode(): number;

/**
 * k    
 * 
 * タブモードのとき、グループIDを表します。    
 * グループIDとは、タブを分離しているとき、    
 * 見た目上のウィンドウに与えられる固有の識別番号です。    
 * 
 * 通常、0 から順番に割り当てられていますが、    
 * ウィンドウを閉じたりすると飛び飛びの番号になったりもします。    
 * 自分自身は 0 とは限りません。    
 * 
 * グループIDは、hidemaruhandleに似ています。    
 * ウィンドウの重なり具合によって変化することはありません。    
 * @example
 * var a = tabgroup();
 * 
 * @param hidemaru_handle    
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @example
 * var a = tabgroup(1);
 * 
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = tabgroup(handle);
 * 
 * @comment
 * openfile("/h");した後のステルスモードでは-1になります。
 * 
 * @comment
 * 参照：
 * @see settabgroup 
 * 
 * @returns タブモードのとき、グループIDを返す。自分自身は 0 とは限らない。    
 * ステルスモードでは-1を返す。
 */
declare function tabgroup(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * タブモードのとき、グループの順番を表します。    
 * グループの順番とは、タブを分離しているとき、    
 * ウィンドウの重なりを上から数えた番号です。    
 * 
 * グループの順番は、hidemaruorderに似ています。    
 * ウィンドウの重なり具合によって変化します。    
 * 自分自身は 0 になります。    
 * 
 * @example
 * var a = tabgrouporder();
 * 
 * @param hidemaru_handle    
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @example
 * var a = tabgrouporder(1);
 * 
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = tabgrouporder(handle);
 * 
 * @comment
 * openfile("/h");した後のステルスモードでは-1になります。
 * 
 * @returns タブモードのとき、グループの順番を返す。自分自身は0。     
 * ステルスモードでは-1を返す。
 */
declare function tabgrouporder(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * タブモードのとき、自身のタブを、    
 * 同じグループにあるタブの0から数えた順番を表します。
 * 
 * @example
 * var a = taborder();
 * 
 * @param hidemaru_handle    
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @example
 * var a = taborder(1);
 * 
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = taborder(handle);
 * 
 * @comment
 * openfile("/h");した後のステルスモードでは-1になります。
 * 
 * @returns タブモードのとき、自身のタブを同じグループにあるタブの0から数えた順番を返す。
 * ステルスモードでは-1を返す。
 */
declare function taborder(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * タブモードのとき、同じグループにあるタブの総数を表します。    
 * タブ文字の幅を表すtabcountと間違えやすいので注意してください。
 * 
 * @example
 * var a = tabtotal();
 * 
 * @param hidemaru_handle    
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @example
 * var a = tabtotal(1);
 * 
 * var handle = hidemaruhandle( findhidemaru( "client.cpp" ) ); // client.cpp
 * var a = tabtotal(handle);
 * 
 * @comment
 * openfile("/h");した後のステルスモードでは-1になります。
 * 
 * @returns タブモードのとき、同じグループにあるタブの総数を返す。
 * ステルスモードでは-1を返す。
 */
declare function tabtotal(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * タブモードのとき、同じグループにあるタブの総数を表します。    
 * @returns タブモードのとき、同じグループにあるタブの総数を返す。
 */
declare function tabgrouptotal(): number;

/**
 * k    
 * 
 * 画面の先頭の行のy座標を表します。    
 * 
 * @comment
 * 参照：    
 * @see enabledraw 文
 * 
 * @returns 画面の先頭の行のy座標。
 */
declare function screentopy(): number;

/**
 * k    
 * 
 * 横スクロール位置のx座標を表します。    
 * 
 * @comment
 * 参照：    
 * @see enabledraw 文
 * 
 * @returns 横スクロール位置のx座標。
 */
declare function screenleftx(): number;

/**
 * k    
 * 
 * 他の秀丸エディタと内容比較をしている場合、    
 * 比較中のウィンドウハンドルを表します。    
 * 
 * @comment
 * 参照：
 * @see compfile 文    
 * 
 * @returns 秀丸エディタと内容比較をしている場合、比較中のウィンドウハンドルを返す    
 * 比較中のウィンドウがない場合、0
 */
declare function compfilehandle(): number;

/**
 * k    
 * 
 * 他の秀丸エディタと同時スクロールしている場合、    
 * 同時スクロール中のウィンドウハンドルを表します。    
 * 
 * @comment
 * 参照：    
 * @see scrolllink 文
 * @returns 他の秀丸エディタと同時スクロールしている場合、同時スクロール中のウィンドウハンドルを返す    
 * 同時スクロール中のウィンドウがない場合、0
 */
declare function scrolllinkhandle(): number;

/**
 * k    
 * 
 * 現在編集中のファイル名をドライブ文字も含めたフルパスで表します。  
 * ファイル名はすべて小文字に変換されています。
 * @example
 * var a = filename();
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * @example
 * var a = filename(1);
 * 
 * for(var ix = 0; ix < hidemarucount(); ix++) {
 *     var handle = hidemaruhandle(ix);
 *     var a = filename(handle);
 * }
 * 
 * @returns
 * 現在編集中のファイル名をドライブ文字も含めたフルパスで返す。    
 * ファイル名はすべて小文字に変換されている。
 */
declare function filename(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * filenameの小文字に変換しないバージョンです。    
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * 現在編集中のファイル名をドライブ文字も含めたフルパスで返す。    
 */
declare function filename2(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * filenameの短縮ファイル名バージョンです。   
 * 短縮ファイル名とは、主にMS-DOSやWindows95の頃まで利用されていた「8.3形式」のことです。    
 * https://ja.wikipedia.org/wiki/8.3%E5%BD%A2%E5%BC%8F
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * 現在編集中のファイル名をドライブ文字も含めた短縮ファイル名で返す。    
 */
declare function filename3(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * ファイル名の、パスを含まない、ベース名だけを表します。    
 * すべて小文字に変換されています。
 * @example
 * var a = basename();
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * @example
 * var a = basename(1);
 * 
 * for(var ix = 0; ix < hidemarucount(); ix++) {
 *     var handle = hidemaruhandle(ix);
 *     var a = basename(handle);
 * }
 * 
 * @returns
 * ファイル名の、パスを含まない、ベース名だけを返す。    
 * ファイル名はすべて小文字に変換されている。
 */
declare function basename(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * basenameの小文字に変換しないバージョンです。    
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * ファイル名の、パスを含まない、ベース名だけを返す。    
 */
declare function basename2(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * basenameの短縮ファイル名バージョンです。   
 * 短縮ファイル名とは、主にMS-DOSやWindows95の頃まで利用されていた「8.3形式」のことです。    
 * https://ja.wikipedia.org/wiki/8.3%E5%BD%A2%E5%BC%8F
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * ファイル名の、パスを含まない、ベース名だけを短縮ファイル名で返す。    
 */
declare function basename3(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * カレントフォルダをドライブ名も含めたパス名で表します。    
 * ルートフォルダでない場合は最後に「\」が付いていません。
 * すべて小文字に変換されています。
 * @example
 * var a = directory();
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * @example
 * var a = directory(1);
 * 
 * for(var ix = 0; ix < hidemarucount(); ix++) {
 *     var handle = hidemaruhandle(ix);
 *     var a = directory(handle);
 * }
 * 
 * @returns
 * カレントフォルダをドライブ名も含めたパス名で返す。    
 * ルートフォルダでない場合は最後に「\」が付いていない。    
 * ファイル名はすべて小文字に変換されている。
 */
declare function directory(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * directoryの小文字に変換しないバージョンです。    
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * カレントフォルダをドライブ名も含めたパス名で返す。    
 * ルートフォルダでない場合は最後に「\」が付いていない。    
 */
declare function directory2(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * directoryの短縮ファイル名バージョンです。   
 * 短縮ファイル名とは、主にMS-DOSやWindows95の頃まで利用されていた「8.3形式」のことです。    
 * https://ja.wikipedia.org/wiki/8.3%E5%BD%A2%E5%BC%8F
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @returns
 * カレントフォルダをドライブ名も含めた短縮パス名で返す。    
 * ルートフォルダでない場合は最後に「\」が付いていない。    
 */
declare function directory3(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * 現在編集中のファイルのファイルタイプを表します。   
 * すべて小文字です。    
 * ファイルの拡張子を表すときは必ず先頭にピリオド（.）が入ります。
 *
 * @comment
 * 参照：    
 * @see setfiletype
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * 
 * @example
 * var a = filetype(1);
 * 
 * for(var ix = 0; ix < hidemarucount(); ix++) {
 *     var handle = hidemaruhandle(ix);
 *     var a = filetype(handle);
 * }
 *
 * @returns
 * 現在編集中のファイルのファイルタイプを返す。    
 * 以下のパターンがある。
 * - .xxx    
 * 拡張子あり（xxx部に拡張子が入ります。） 例：test.txtの場合".txt"
 * - .    
 * 拡張子なし 
 * - new    
 * (無題) 
 * - grep    
 * grep結果 
 * - exeresult    
 * 実行結果 
 * - executing    
 * プログラム実行中
 * - webbrowse    
 * Webブラウズモード（Hidemarnet Explorerがインストールされているときのみ）
 */
declare function filetype(hidemaru_handle?: number): string;

/**
 * k    
 * 
 * 現在実行中のマクロのファイル名をフルパスで表します。すべて小文字です。
 * 
 * @returns
 * 現在実行中のマクロのファイル名をフルパスで返す。すべて小文字。    
 */
declare function currentmacrofilename(): string;

/**
 * k    
 * 
 * 現在実行中のマクロのファイル名の、パスを含まない、ベース名だけを表します。すべて小文字です。
 * 
 * @returns
 * 現在実行中のマクロのファイル名の、パスを含まない、ベース名を返す。すべて小文字。    
 */
declare function currentmacrobasename(): string;

/**
 * k    
 * 
 * 現在実行中のマクロのフォルダを表します。すべて小文字です。
 * 
 * @returns
 * 現在実行中のマクロのフォルダを返す。すべて小文字。    
 */
declare function currentmacrodirectory(): string;

/**
 * k    
 * 
 * hidemaru.exeのフォルダを表します。すべて小文字です。
 * 
 * @returns
 * hidemaru.exeのフォルダを返す。すべて小文字。
 */
declare function hidemarudir(): string;

/**
 * k    
 * 
 * マクロファイル用のフォルダを表します。    
 * 動作環境で指定されていない場合は、    
 * hidemaru.exeのhidemarudirと同じフォルダを返します。    
 * すべて小文字です。
 * 
 * @returns
 * マクロファイル用のフォルダを返す。    
 * 動作環境で指定されていない場合は、    
 * hidemaru.exeのhidemarudirと同じフォルダを返す。    
 * すべて小文字。
 */
declare function macrodir(): string;

/**
 * k    
 * 
 * 設定ファイル用のフォルダを表します。    
 * 動作環境で指定されていない場合は、    
 * hidemaru.exeのhidemarudirと同じフォルダを返します。    
 * すべて小文字です。
 * 
 * @returns
 * 設定ファイル用のフォルダを返す。    
 * 動作環境で指定されていない場合は、    
 * hidemaru.exeのhidemarudirと同じフォルダを返す。    
 * すべて小文字。
 */
declare function settingdir(): string;

/**
 * k    
 * 
 * バックアップファイル用のフォルダを表します。    
 * 
 * @returns
 * バックアップファイル用のフォルダを返す。    
 */
declare function backupdir(): string;

/**
 * k    
 * 
 * バックアップファイル用のフォルダを表します。    
 * すべて小文字です。
 * 
 * @returns
 * バックアップファイル用のフォルダを返す。    
 * すべて小文字。
 */
declare function windir(): string;

/**
 * k    
 * 
 * Windowsのシステムフォルダを表します。    
 * すべて小文字です。
 * 
 * @returns
 * Windowsのシステムフォルダを返す。    
 * すべて小文字。
 */
declare function winsysdir(): string;

/**
 * k    
 * 
 * ファイルヒストリの項目数を表す数値です。    
 * 
 * @returns
 * ファイルヒストリの項目数    
 */
declare function filehistcount(): number;

/**
 * k    
 * 
 * 上書きモードか挿入モードかを表します。
 * 
 * @returns
 * 上書きモードの場合は１、    
 * 挿入モードの場合は０です。
 */
declare function overwrite(): number;

/**
 * s    
 * 
 * overwrite文は、カーソルの位置を基準に、    
 * (挿入ではなく)上書きモードにて引数で指定された文字列で上書きします。    
 * 上書きしたのち、カーソルを上書きした文字列の最後に移動します。    
 * overwrite文は上書きモードでの入力に相当します。    
 * 
 * @param newtext
 * 指定の文字列で上書きする
 * @param mode
 * 第２パラメータに１を指定すると、    
 * 全角の上に半角を上書きしたとき、    
 * 右半分が空白になる動作が無効になります
 * 
 * @returns
 * 実行に成功した場合は１、    
 * 失敗した場合は０。
 */
declare function overwrite(newtext: string, mode?: number): number;

/**
 * k    
 * 
 * 更新されたかどうかを表します。
 * 更新された場合は１、そうでない場合は０です。
 * @example
 * var a = updated();
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。
 * @example
 * var a = updated(1);
 * 
 * for(var ix = 0; ix < hidemarucount(); ix++) {
 *     var handle = hidemaruhandle(ix);
 *     var a = updated(handle);
 * }
 * 
 * @returns
 * 対象の秀丸エディタが更新された場合は１、そうでない場合は０です。
 */
declare function updated(hidemaru_handle?: number): number;

/**
 * k    
 * 
 * 何らかの操作によって本文テキストの内容が変わったときにカウントされる値です。    
 * ファイルを閉じても初期値には戻らず、ひたすらカウントします。    
 * 一回の操作でも数カウント上がったりします。    
 * 
 * 32bitの値を超えると一周します。    
 * 初期値は1以上です。
 * @returns
 * 内容が変わったときにカウントが増える値。    
 * 初期値は1以上。32bitの値を超えると一周。
 */
declare function updatecount(): number;

/**
 * k    
 * 
 * クリップボードに文字列があるかどうかを表します。    
 * ある場合は１、無い場合は０です。
 * 文字列ではなく、画像などがクリップボードにある場合も０になります。
 * 
 * @returns
 * クリップボードに文字列がある場合は１，無い場合は０
 * 文字列ではなく、画像などがクリップボードにある場合も０
 */
declare function anyclipboard(): number;

/**
 * k    
 * 
 * かな漢字変換の状態を表します。    
 * 
 * @returns
 * かな漢字変換がONなら１、OFFなら０
 */
declare function imestate(): number;

/**
 * k    
 * 
 * 閲覧モードかどうかを表します。    
 * 
 * @returns
 * 閲覧モードの場合は１、そうでない場合は０
 */
declare function browsemode(): number;

/**
 * k    
 * 
 * キーが押されたかどうかを表します。    
 * disablebreakされた状態でのみ利用可能です。    
 * 
 * キーが押されていた場合はそのキーコード、押されてなかった場合は０です。    
 * 
 * keypressedが１回実行されると、メッセージキューから仮想キーコードを取り出します。    
 * 仮想キーコードは、iskeydownの値と同じです    
 * 
 * IMEがONの場合はキーが押されたというメッセージがメッセージキューに入らないことがあります。    
 * @example
 * if( imestate() != 0) { imeswitch(); }
 * @comment
 * としてIMEをOFFにすると取得できます。    
 * iskeydownはIMEがONでも取得できます。    
 * 
 * @comment
 * 参照：    
 * @see iskeydown    
 * @see inputchar    
 * @see keypressedex    
 * 
 * @returns
 * キーが押されていた場合はそのキーコード、押されてなかった場合は０    
 * disablebreakされた状態でのみ利用可能。
 */
declare function keypressed(): number;

/**
 * f    
 * 
 * keypressedex関数は、    
 * キーが押されたかどうかを返すkeypressedキーワードの拡張版です。
 * disablebreakされた状態でのみ利用可能です。
 *
 * @param return_keytype    
 * 取得する方法を指定します。    
 * - 0を指定する場合は、keypressedキーワードと同じ仮想キーコードを取得します。    
 * - 1を指定する場合は、仮想キーコードではなく、char関数に相当する文字コードを取得します。    
 * 例外的に、矢印キーについては、inputcharと同様の秀丸エディタ独自のコードを取得します。    
 * 例外的に、矢印キー以外の0x20未満の値についてはkeypressedキーワードと同じ仮想キーコードを取得します。(Escキーなどを取得するため）
 * 
 * - パラメータ１に0を指定する場合、押されたキーの仮想キーコードを返します。
 * @example 
 *  disablebreak();
 *  insert("Escキーで終わります\n");
 *  while( 1 ) {
 *    var c = keypressedex(0);
 *    if(c==0x1B) { // Esc
 *      break;
 *    }
 *    if(c==0x31) { // 1キー
 *      insert("1キー\n");
 *    }
 *    if(c==0x10) { // Shiftキー VK_SHIFT
 *      insert("Shiftキー\n");
 *    }
 *  }
 * 
 * @comment
 * - パラメータ１に1を指定する場合、
 * 例えばShift+1キーでキーボードによっては"!"になりますが、"!"に相当する0x21が取得できます。

 * @example 
 *  disablebreak();
 *  insert("Escキーで終わります\n");
 *  while( 1 ) {
 *    var c = keypressedex(1);
 *    if(c==0x1B) { // Esc
 *      break;
 *    }
 *    if(c==0x31) { // 1キー
 *      insert("1という文字\n");
 *    }
 *    if(c==0x21) { // '!'
 *      insert("!という文字\n");
 *    }
 *  }
 * 
 * @comment
 * 参照：    
 * @see iskeydown
 * @see inputchar
 * @see keypressed
 * 
 * @returns
 * - 引数のreturn_keytypeが0の場合は、仮想キーコードを返す。
 * - 引数のreturn_keytypeが1の場合は、文字コードを返す。
 * 
 * disablebreakされた状態でのみ利用可能。
 */
declare function keypressedex(return_keytype: number): number;

/**
 * k    
 * 
 * 現在のマクロが連続実行されているものかどうかを表します。    
 * 連続実行である場合1、そうでない場合0です。   
 * 
 * 例えば、Ctrl+1によってマクロ実行される場合は、   
 * Ctrl+1を２回連続で実行した場合に2回目がreplayがtrueなります。    
 * 
 * 自動起動マクロによってマクロが実行される場合は、   
 * この値は不定で、連続実行されたかどうかを知ることはできません。   
 * 
 * @returns
 * 現在のマクロが連続実行である場合1、そうでない場合0
 */
declare function replay(): number;

/**
 * k    
 * 
 * 「検索での表示」の状態を表します。
 * 
 * @returns
 * 点滅表示のとき0、範囲選択のときは1
 */
declare function searchmode(): number;

/**
 * k    
 * 
 * 検索バッファの内容を表します。    
 * 
 * 検索バッファは、以前に実行された検索コマンドまたは置換コマンドで検索対象となる文字列を記憶していて、    
 * 「下候補」または「上候補」コマンドで利用されるものです。
 * 
 * @returns
 * 検索バッファの内容を返す
 */
declare function searchbuffer(): string;

/**
 * k    
 * 
 * 検索フラグの状態値を表します。    
 * 
 * 検索フラグは、以前に実行された検索コマンドまたは置換コマンドのダイアログボックスで指定された   
 * 各種のオプションを記憶しています。    
 * オプションの内容は以下の通りのビットごとの論理和になっています。    
 * 
 * 0x00002000のビットは、searchoptionで得た値をsetsearchで   
 * そのまま復元するために常にONになっています。
 * - 0x00000001 単語の検索    
 * - 0x00000002 大文字/小文字の区別    
 * - 0x00000004 置換かどうか    
 * - 0x00000008 置換の場合、問い合わせの有無    
 * - 0x00000010 正規表現    
 * - 0x00000020 あいまい検索    
 * - 0x00000040 ファイル名一覧だけ作成（grep用）    
 * - 0x00000080 次の秀丸エディタも続けて検索    
 * - 0x00000100 サブフォルダも検索（grep用）    
 * - 0x00000200 最小化状態で実行（grep用）    
 * - 0x00000400 ファイル名をフルパスで出力（grep用）    
 * - 0x00000800 検索文字列の強調（検索，grep用）    
 * 注意：setsearch等で設定する場合は0x00002000も必要
 * - 0x00001000 検索文字列の強調（置換用）    
 * 注意：setsearch等で設定する場合は0x00002000も必要
 * - 0x00002000 強調のビットが有効（常にON）
 * - 0x00010000 追加の条件（普通の文字）    
 * - 0x00020000 追加の条件（コメント）    
 * - 0x00040000 追加の条件（#ifdef等の無効部分）    
 * - 0x00080000 追加の条件（スクリプト部分）    
 * - 0x00100000 追加の条件（文字列）    
 * - 0x00200000 追加の条件（HTML/XMLタグ）    
 * - 0x00400000 追加の条件（「のみ」）    
 * - 0x00800000 追加の条件が有効であるかどうか    
 * - 0x01000000 一周する    
 * - 0x02000000 検索したら閉じる    
 * - 0x04000000 バックアップ（grepして置換用）    
 * - 0x08000000 保存の前に確認（grepして置換用）    
 * - 0x30000000 出力先（grep用）
 * - 0x80000000 searchoption2が有効かどうか    
 * 
 * 「選択した範囲」のフラグはありません。    
 * 「選択した範囲」で動作中であるかどうかはinselectingキーワードで得ます。    
 * 
 * 以下は検索オプションを変数に設定しておく例です。    
 * @example
 * //searchoption(検索関係)
 * var word =                 0x00000001;
 * var casesense =            0x00000002;
 * var nocasesense =          0x00000000;
 * var regular =              0x00000010;
 * var noregular =            0x00000000;
 * var fuzzy =                0x00000020;
 * var hilight =              0x00003800;
 * var nohilight =            0x00002000;
 * var linknext =             0x00000080;
 * var loop =                 0x01000000;
 * 
 * //searchoption(マスク関係)
 * var maskcomment =          0x00020000;
 * var maskifdef =            0x00040000;
 * var masknormal =           0x00010000;
 * var maskscript =           0x00080000;
 * var maskstring =           0x00100000;
 * var masktag =              0x00200000;
 * var maskonly =             0x00400000;
 * var fEnableMaskFlags =     0x00800000;
 * 
 * //searchoption(置換関係)
 * var fEnableReplace =       0x00000004;
 * var ask =                  0x00000008;
 * var noclose =              0x02000000;
 * 
 * //searchoption(grep関係)
 * var subdir =               0x00000100;
 * var icon =                 0x00000200;
 * var filelist =             0x00000040;
 * var fullpath =             0x00000400;
 * var outputsingle =         0x10000000;
 * var outputsametab =        0x20000000;
 * 
 * //searchoption(grepして置換関係)
 * var backup =               0x04000000;
 * var preview =              0x08000000;
 * 
 * var fEnableSearchOption2 = 0x80000000; // searchoption2 を使う時に必要
 * 
 * @example
 * var word =                 0x00000001;
 * var casesense =            0x00000002;
 * setsearch("test", word | casesense);
 * finddown();
 * 
 * @comment
 * 参照：    
 * @see searchoption2
 * @see setsearch
 * @see inselecting    
 * 
 * @returns
 * 検索フラグの状態値
 */
declare function searchoption(): number;

/**
 * k    
 * 
 * 拡張された検索フラグの状態値を表します。    
 * searchoptionの0x80000000のビットが立っている場合にのみ有効です。
 * 
 * 以下の値の論理和です。
 * - 0x00000001 ヒットしない行（grep用）    
 * - 0x00000002 指定の範囲/カラーマーカー内（検索,置換用）    
 * - 0x00800000 searchoptionのも必要。    
 * 範囲はsettargetcolormarkerで指定。    
 * - 0x00000008 桁位置（grep用）    
 * - 0x00000010 ヒット文字列のみ（grep用）    
 * - 0x00000020 日付順（grep用）    
 * 
 * 以下は検索オプションを変数に設定しておく例です。    
 * @example
 * //searchoption2
 * var unmatch =              0x00000001;
 * var incolormarker =        0x00000002;
 * var fGrepFormColumn =      0x00000008;
 * var fGrepFormHitOnly =     0x00000010;
 * var fGrepFormSortDate =    0x00000020;
 * 
 * @comment
 * 参照：    
 * @see setsearch 
 * 
 * @returns
 * 拡張された検索フラグの状態値
 */
declare function searchoption2(): number;

/**
 * k    
 * 
 * settargetcolormarkerで指定されている文字列を取得します。    
 * searchdown等でinselect2を指定して検索した後は、    
 * 文字単位の選択用の予約された文字列になります。
 * 
 * @returns
 * settargetcolormarkerで指定されている文字列を返す。    
 * searchdown等でinselect2を指定して検索した後は、    
 * 文字単位の選択用の予約された文字列を返す。
 */
declare function targetcolormarker(): string;

/**
 * k    
 * 
 * 置換バッファの内容を表します。
 * 
 * @comment
 * 参照：    
 * @see setreplace 
 * 
 * @returns
 * 置換バッファの内容を返す
 */
declare function replacebuffer(): string;

/**
 * k    
 * 
 * grepの「検索するファイル」の内容を表します。    
 *「(現在の内容)」でgrepした後は、   
 * 先頭に制御コードの\x01が入った文字列になります。
 * 
 * @comment
 * 参照：    
 * @see setgrepfile 
 * 
 * @returns
 * grepの「検索するファイル」の内容を返す。   
 * 「(現在の内容)」でgrepした後は、   
 * 先頭に制御コードの\x01が入った文字列になる。
 */
declare function grepfilebuffer(): string;

/**
 * k    
 * 
 * grepダイアログの設定が「前回のフォルダを使う」になっているとき、    
 * 前回のフォルダ文字列を表します。    
 * 「前回のフォルダを使う」がOFFの場合は""になります。    
 * 
 * @returns
 * grepダイアログの設定が「前回のフォルダを使う」になっているとき、    
 * 前回のフォルダ文字列を返す。    
 * 「前回のフォルダを使う」がOFFの場合は""を返す。
 */
declare function grepfolderbuffer(): string;

/**
 * k    
 * 
 * 検索にヒットした文字列の開始位置のx座標を表します。
 * 
 * @returns
 * 検索にヒットした文字列の開始位置のx座標
 */
declare function foundtopx(): number;

/**
 * k    
 * 
 * 検索にヒットした文字列の開始位置のy座標を表します。
 * 
 * @returns
 * 検索にヒットした文字列の開始位置のy座標
 */
declare function foundtopy(): number;

/**
 * k    
 * 
 * 検索にヒットした文字列の終了位置のx座標を表します。
 * 
 * @returns
 * 検索にヒットした文字列の終了位置のx座標
 */
declare function foundendx(): number;

/**
 * k    
 * 
 * 検索にヒットした文字列の終了位置のy座標を表します。
 * 
 * @returns
 * 検索にヒットした文字列の終了位置のy座標
 */
declare function foundendy(): number;

/**
 * k    
 * 
 * 「検索文字列の強調」が表示状態にあるかどうかを表します。
 * 
 * @returns
 * 「検索文字列の強調」が表示状態なら１、    
 * 表示状態でないなら０
 */
declare function foundhilighting(): number;

/**
 * k    
 * 
 * 「検索文字列の強調」されているとき、   
 * 強調のために使われている検索文字列を表します。    
 * 
 * searchbufferは全ての秀丸エディタで共通ですが、    
 * foundbufferはそれぞれの秀丸エディタごとに記憶しています。
 * 
 * 検索後、実際にヒットした文字列ではなく、検索文字列を表しています。    
 * 実際にヒットした文字列を取得するには、次のようにします。    
 * @example
 * var foundtext = gettext(foundtopx(),foundtopy(),foundendx(),foundendy());
 * 
 * @returns
 * 「検索文字列の強調」されているとき、   
 * 強調のために使われている検索文字列を返す。
 */
declare function foundbuffer(): string;

/**
 * k    
 * 
 * 「検索文字列の強調」されているとき、    
 * 強調のために使われている検索フラグを表します。
 * 
 * @returns
 * 「検索文字列の強調」がされているなら１、    
 * されてないなら０
 */
declare function foundoption(): number;

/**
 * k    
 * 
 * 上書き禁止かどうかを表します。
 * 
 * @returns
 * 上書き禁止の場合は１、そうでない場合は０
 */
declare function readonly(): number;

/**
 * k    
 * 
 * 現在のエンコードの種類と改行を表します。    
 * charsetキーワードと同じ意味です。    
 * 
 * - 文字コード    
 * ビット０～ビット５（encode & 0x3F した値）が「文字コード」で以下の対応となります。    
 *   - 1 　Shift-JIS
 *   - 2 　Unicode(UTF-16)
 *   - 3 　EUC
 *   - 4 　JIS
 *   - 5 　UTF-7
 *   - 6 　UTF-8
 *   - 7 　Unicode (UTF-16,Big-Endian)
 *   - 8 　欧文
 *   - 9 　簡体字中国語
 *   - 10　繁体字中国語
 *   - 11　韓国語
 *   - 12　韓国語(Johab)
 *   - 13　中央ヨーロッパ言語
 *   - 14　バルト語
 *   - 15　ギリシャ語
 *   - 16　キリル言語
 *   - 17　シンボル
 *   - 18　トルコ語
 *   - 19　ヘブライ語
 *   - 20　アラビア語
 *   - 21　タイ語
 *   - 22　ベトナム語
 *   - 23　Macintosh
 *   - 24　OEM/DOS
 *   - 25　その他
 *   - 26　バイナリモード
 *   - 27　Unicode(UTF-32)
 *   - 28　Unicode(UTF-32,Big-Endian)
 * 
 * - 改行タイプ    
 * ビット６が１の場合、改行＝LF（encode & 0x40）    
 * ビット７が１の場合、改行＝CR（encode & 0x80）    
 * ビット６と７が共に０、または共に１の場合は改行＝CR+LF（encode & 0xC0）    
 *
 * @example
 * var current_code = encode() & 0x3F;
 * var is_lf = encode() & 0x40;
 * var is_cr = encode() & 0x80;
 * var is_lf_cr = (is_lf == is_cr); // 両方1か両方0
 * 
 * @comment
 * - openfile等のencode相当    
 * sjis = 0x01;    
 * utf16 = 0x02;    //unicode    
 * euc = 0x03;    
 * jis = 0x04;    
 * utf7 = 0x05;    
 * utf8 = 0x06;    
 * utf16_be = 0x07; //unicode_be    
 * euro = 0x08;    
 * gb2312 = 0x09;    
 * big5 = 0x0A;    
 * euckr = 0x0B;    
 * johab = 0x0C;    
 * easteuro = 0x0D;    
 * baltic = 0x0E;    
 * greek = 0x0F;    
 * russian = 0x10;    
 * symbol = 0x11;    
 * turkish = 0x12;    
 * hebrew = 0x13;    
 * arabic = 0x14;    
 * thai = 0x15;    
 * vietnamese = 0x16;    
 * mac = 0x17;    
 * oem = 0x18;    
 * default = 0x19;    
 * utf32 = 0x1B;    
 * utf32_be = 0x1C;    
 * binary = 0x1A;    
 * lf = 0x40;    
 * cr = 0x80;    
 *     
 * - saveasの他のオプションの数値指定    
 * bom = 0x0600;    
 * nobom = 0x0400;    
 * selection = 0x2000;    
 *     
 * - openfileの他のオプションの数値指定    
 * noaddhist = 0x0100;    
 * ws = 0x0800;    
 * wb = 0x1000;    
 * 
 * @returns
 * 現在のエンコードの種類と改行タイプを含んだ値を返す。
 */
declare function encode(): number;

/**
 * k    
 * 
 * encodeと全く同じ。    
 * charsetといっても、フォントの文字セットのことではありません。
 * @returns
 * 現在のエンコードの種類と改行タイプを含んだ値を返す。
 */
declare function charset(): number;

/**
 * k    
 * 
 * Unicode系のエンコードの種類のファイルの場合、    
 * BOMを含むかどうかを表します。    
 * 
 * @returns
 * Unicode系のエンコードの種類のファイルの場合、    
 * BOMを含むなら１、BOMを含まないなら０、    
 * Unicode系でない場合も０
 * 
 */
declare function bom(): number;

/**
 * k    
 * 
 * 現在のエンコードの種類に対応するコードページを表します。    
 * encode（& 0x3F した値）とcodepageの対応関係は以下のようになっています。    
 * 
 * - encode=1 codepage=932 Shift-JIS
 * - encode=2 codepage=1200 Unicode(UTF-16)
 * - encode=3 codepage=51932 EUC
 * - encode=4 codepage=50221 JIS
 * - encode=5 codepage=65000 UTF-7
 * - encode=6 codepage=65001 UTF-8
 * - encode=7 codepage=1201 Unicode(UTF-16,Big-Endian)
 * - encode=8 codepage=1252 欧文
 * - encode=9 codepage=936 簡体字中国語
 * - encode=10 codepage=950 繁体字中国語
 * - encode=11 codepage=949 韓国語
 * - encode=12 codepage=1361 韓国語(Johab)
 * - encode=13 codepage=1250 中央ヨーロッパ言語
 * - encode=14 codepage=1257 バルト語
 * - encode=15 codepage=1253 ギリシャ語
 * - encode=16 codepage=1251 キリル言語
 * - encode=17 codepage=42 シンボル
 * - encode=18 codepage=1254 トルコ語
 * - encode=19 codepage=1255 ヘブライ語
 * - encode=20 codepage=1256 アラビア語
 * - encode=21 codepage=874 タイ語
 * - encode=22 codepage=1258 ベトナム語
 * - encode=23 codepage=0 Macintosh
 * - encode=24 codepage=0 OEM/DOS
 * - encode=25 codepage=0 その他
 * - encode=27 codepage=12000 Unicode(UTF-32)
 * - encode=28 codepage=12001 Unicode(UTF-32,Big-Endian)
 * 
 * @returns
 * 現在のエンコードの種類に対応するコードページ
 * 
 */
declare function codepage(): number;

/**
 * f    
 * 
 * getfocus関数は、現在の入力フォーカスのあるウィンドウを取得します。    
 * ウィンドウの値の意味は、setfocusで指定する値と同じです。 
 * 
 * @example
 * var a = getfocus();
 *
 * @comment
 * キー割り当てしたマクロで編集エリア以外では通常のキー操作にしたい場合は    
 * getfocusで判断後、seteventnotify(1);をする方法があります。
 * @example
 * if ( getfocus()==1 ) {
 *     down();
 * } else {
 *     seteventnotify(1);
 * }
 * 
 * @returns
 * 現在の入力フォーカスのあるウィンドウに対応する数値を返す。
 * - 1 編集エリア 
 * - 2 アウトライン解析の枠 
 * - 3 ツールバーの検索ボックス 
 * - 4 ファイルマネージャ枠 
 * - 5 アウトプット枠 
 */
declare function getfocus(): number;

/**
 * k    
 * 
 * 単語補完の状態を表します。    
 * 以下の値の論理和です。
 * 
 * - 0x0001(ビット0)　単語補完が動作中
 * - 0x0002(ビット1)　半角から始まる文字入力の直後でカーソル移動していない状態
 * - 0x0004(ビット2)　「マクロ1」などのコマンドの実行によって単語補完が消えた直後
 *
 * @example
 * if (autocompstate() & 0x01) {
 *    ...
 * }
 * @comment    
 * のように判定してください。    
 * 0x0001は、自動起動マクロのときに効果があります。    
 * 手動によるマクロ実行ではマクロ実行した時点で    
 * 単語補完は消えるので効果はありません。
 * 
 * @returns
 * 単語補完の状態を返す、以下の値の論理和。
 * - 0x0001(ビット0)　単語補完が動作中
 * - 0x0002(ビット1)　半角から始まる文字入力の直後でカーソル移動していない状態
 * - 0x0004(ビット2)　「マクロ1」などのコマンドの実行によって単語補完が消えた直後
 */
declare function autocompstate(): number;

/**
 * k    
 * 
 * getarg可能なパラメータの数を表します。
 * 
 * @returns
 * getarg可能なパラメータの数を返す
 */
declare function argcount(): number;

/**
 * k    
 * 
 * setcompatiblemodeの現在の状態を表します。
 * 
 * @comment
 * 参照：    
 * @see setcompatiblemode
 * 
 * @returns
 * setcompatiblemodeの現在の状態を返す
 */
declare function compatiblemode(): number;

/**
 * k    
 * 
 * [その他]→[動作環境]→[編集]→[高度な編集2]の「タブ文字の上にカーソル移動した時」の状態を表します。    
 * 
 * @returns
 * - 0が「左に寄る」
 * - 1が「どちらか近いほう」
 * - 2が「右に寄る」
 * - 3が「貫通する」
 */
declare function carettabmode(): number;

/**
 * k    
 * 
 * TSV/CSVモードの「セル内改行の変換」（convert_return_in_cell）が行われている状態を表します。
 * 
 * @returns
 * -TSV/CSVモードの「セル内改行の変換」（convert_return_in_cell）が行われている状態値を返す。
 * 
 * 以下の値の論理和。    
 * - 0x0001 LFが半角矢印(￬)(U+FFEC)に変換されています。    
 * 保存時にU+FFECはLFに変換されるモードとして動作しています。
 * - 0x0002 CRが半角矢印(￩)(U+FFE9)に変換されています。    
 * 保存時にU+FFE9はCRに変換されるモードとして動作しています。
 * - 0x0004 CR+LFが半角矢印(↲)(U+21B2)に変換されています。    
 * 保存時にU+21B2はCR+LFに変換されるモードとして動作しています。    
 * - 0x0100 LFが見た目上改行されない特殊なLFに変換されています。    
 * - 0x0200 CRが見た目上改行されない特殊なCRに変換されています。    
 * - 0x0400 CR+LFが見た目上改行されない特殊なCR+LFに変換されています。
 */
declare function return_in_cell_mode(): number;

/**
 * k    
 * 
 * 「ヒストリの記録を中断」の状態かどうかを表します。    
 * キーワード名が動詞のような表記ですが、    
 * stophistoryswitchに対応した表記になっています。
 * 
 * @returns
 * 「ヒストリの記録を中断」の状態かどうかを返す。    
 * 中断しているなら１、そうでないなら０
 */
declare function stophistory(): number;

/**
 * k    
 * 
 * フォントの種類や描画モードを表す状態値を表します。    
 * 以下の値の論理和です。    
 * - 0x0001(ビット0)　プロポーショナルフォントかどうか    
 * - 0x0002(ビット1)　結合文字が有効かどうか    
 * （[その他]→[動作環境]→[編集]→[高度な編集2]→[結合文字を１つの文字として扱う]）
 * - 0x0004(ビット2)　DirectWriteが有効かどうか    
 * （[その他]→[動作環境]→[表示/操作]→[文字の描画]→[3Dグラフィックスアクセラレータによる文字の描画]）    
 * - 0x0008(ビット3)　カラー絵文字が有効かどうか    
 * （[その他]→[動作環境]→[表示/操作]→[文字の描画]→[カラー絵文字]）
 * @example
 * if ( fontmode & 0x01 ) { ... }
 * @comment
 * のようにして判定してください。    
 * 
 *  固定ピッチフォントを指定していても、    
 * TSV/CSVモードやタブの自由配置モード、    
 * 「プロポーショナルフォント扱い」のオプションがONのときなど、    
 * プロポーショナルフォントとして振る舞っているときも、    
 * 0x0001が有効になります。    
 * 
 * @comment
 * 参照：    
 * @see config 文のxTabMode
 * 
 * @returns
 * フォントの種類や描画モードを表す状態値を返す
 */
declare function fontmode(): number;

/**
 * k    
 * 
 * 整形ラインの表示の有無を表します。    
 * 
 * @comment
 * 参照：    
 * @see showformline 
 * 
 * @returns
 * 整形ラインが表示されていれば１、そうでないなら０    
 */
declare function formline(): number;

/**
 * k    
 * 
 * 現在の「設定のリスト」の名前を表します。    
 * 「共通」の場合は無名になります。
 * 
 * @comment
 * 参照：    
 * @see configset
 * 
 * @returns
 * 現在の「設定のリスト」の名前を返す    
 */
declare function currentconfigset(): string;

/**
 * k    
 * 
 * ファイルタイプ別の設定の状態を表します。    
 * 以下の値の論理和です。
 * - 0x0001(ビット0) 一時的な設定かどうか    
 * (現在はビット0しかありませんが将来的に拡張されるかもしれないので、
 *  以下のように判定してください。)
 * 
 * @example
 * configstate() & 0x0001
 * 
 * @comment
 * 参照：    
 * @see setconfigstate
 * 
 * @returns
 * ファイルタイプ別の設定の状態を返す    
 */
declare function configstate(): number;

/**
 * k    
 * 
 * フォントの名前を表します。    
 * 
 * @returns
 * フォントの名前を返す    
 */
declare function fontname(): string;

/**
 * k    
 * 
 * フォントのサイズ（高さ）を表します。    
 * 単位はピクセル数（ドット数）です。
 * 
 * @returns
 * フォントのサイズ（高さ）を返す。    
 * 単位はピクセル数（ドット数）。    
 */
declare function fontsize(): number;

/**
 * s    
 * 
 * 日付と時刻を表すキーワードyear, month, day, hour, minute, second, dayofweek, dayofweeknumは、    
 * マクロの実行を開始した時点での時刻を返しますが、    
 * refreshdatetime文を実行すると、これら時刻関連のキーワードを    
 * 文を実行した時点での時刻へと更新します。
 * @example
 * message(second()); // second() はマクロを開始時の時刻に基づく
 * message(second()); // よって、このsecond() は１行目を同じ値となる。
 * refreshdatetime(); // ここで時刻関連キーワードの値が、この文を実行した時刻に基づいて更新される
 * message(second()); // second()は、refreshdatetime()文を実行した時刻に基づいた値となっている。
 * @returns
 * 更新に成功したら0以外を返す。    
 * 失敗したら0を返す。    
 */
declare function refreshdatetime(): number;

/**
 * k    
 * 
 * 現在の日付を表します。    
 * 
 * @returns
 * 現在の日付を返す。    
 * "92/10/22(月)"のような文字列形式。
 */
declare function date(): string;

/**
 * k    
 * 
 * 現在の時刻を表します。
 * 
 * @returns
 * 現在の時刻を返す。    
 * "22:30:45"のような文字列形式。
 */
declare function time(): string;

/**
 * k    
 * 
 * 年を表します。４桁の文字列です。
 * 
 * @returns
 * 年を表す文字列を返す。４桁の文字列
 */
declare function year(): string;

/**
 * k    
 * 
 * 月を表します。２桁の文字列です。
 * 
 * @returns
 * 月を表す文字列を返す。２桁の文字列
 */
declare function month(): string;

/**
 * k    
 * 
 * 日を表します。２桁の文字列です。
 * 
 * @returns
 * 日を表す文字列を返す。２桁の文字列
 */
declare function day(): string;

/**
 * k    
 * 
 * 時間を表します。２桁の文字列です。
 * 
 * @returns
 * 時間を表す文字列を返す。２桁の文字列
 */
declare function hour(): string;

/**
 * k    
 * 
 * 分を表します。２桁の文字列です。
 * 
 * @returns
 * 分を表す文字列を返す。２桁の文字列
 */
declare function minute(): string;

/**
 * k    
 * 
 * 秒を表します。２桁の文字列です。
 * 
 * @returns
 * 秒を表す文字列を返す。２桁の文字列
 */
declare function second(): string;

/**
 * k    
 * 
 * 曜日を表します。    
 * "日"　"月"といった文字列です。
 * 
 * @returns
 * 曜日を表す文字列を返す。１文字。
 */
declare function dayofweek(): string;

/**
 * k    
 * 
 * 曜日を表します。    
 * 数値です。(日曜=0 月曜=1　...)
 * 
 * @returns
 * 曜日を表す数値を返す。    
 * (日曜=0 月曜=1 火曜=2 水曜=3 木曜=4 金曜日=5 土曜日=6)
 */
declare function dayofweeknum(): number;

/**
 * k    
 * 
 * Windowsが起動されてからの経過時間をミリ秒単位で表します。    
 * パソコンを起動してから25日程度経過すると負の数になり、    
 * 50日程度経過すると0からカウントしなおすので注意が必要です。    
 * 
 * 負の数にならないようにするには次のようにすること。
 * @example
 * var tick = tickcount() & 0x7fffffff;
 * 
 * @returns
 * Windowsが起動されてからの経過時間をミリ秒単位で返す。    
 */
declare function tickcount(): number;

/**
 * k    
 * 
 * カーソル行が折りたたみ可能かどうかを表します。    
 * 値は、fold文のパラメータに指定できる折りたたみ可能な条件の値と同じ値になります。    
 * 括弧を付けて条件を指定して関数のように扱うこともできます。    
 * 
 * 参照:    
 * @see fold
 * 
 * @example
 * if( foldable( 0x0002 ) ) fold(); //インデントによる折りたたみが可能な場合だけ折りたたみ
 * 
 * @returns
 * カーソル行が折りたたみ不可能な場合は０、    
 * 折りたたみ可能な場合、状態値として以下を返す
 * - 0x0001 範囲選択 
 * - 0x0002 インデントの深さ 
 * - 0x0004 連続したコメント 
 * - 0x0008 カーソル上の対応する括弧 
 * - 0x0010 #ifdef等の対応 
 * - 0x0020 アウトライン解析との対応 
 * - 0x0040 空行区切り 
 * - 0x0080 行の強調表示区切り 
 */
declare function foldable(): number;

/**
 * k    
 * 
 * カーソル行が折りたたみされているかどうかを表します。   
 * 0か1です。
 * 折りたたみされた範囲を調べるには、    
 * @example
 * setcompatiblemode(0x00000003);
 * 
 * @comment    
 *  された状態での次の行のカーソル位置でわかります。    
 * （折り返しがある場合down;ではなくgolineend2;right;）
 * @returns
 * カーソル行が折りたたみされているかどうかを表します。    
 * 折りたたみされていれば１，そうでなければ０
 */
declare function folded(): number;

/**
 * k    
 * 
 * 部分編集されているとき、部分編集されている先頭の行のy座標を表します。    
 * 
 * @returns
 * 部分編集されているとき、部分編集されている先頭の行のy座標を返す    
 */
declare function rangeedittop(): number;

/**
 * k    
 * 
 * 部分編集されているとき、部分編集されている最後の行のy座標を表します。    
 * 
 * @returns
 * 部分編集されているとき、部分編集されている最後の行のy座標を返す    
 */
declare function rangeeditend(): number;

/**
 * k    
 * 
 * 部分編集されているかどうかを表します。    
 * 以下の値のOR演算された値になります。    
 * - 0x01 部分編集中 
 * - 0x02 範囲選択による部分編集中 
 * - 0x04 ローカル編集モード 
 * 
 * @example
 * var b1 = rangeeditmode() & 0x01 // 部分編集中 
 * var b2 = rangeeditmode() & 0x02 // 範囲選択による部分編集中 
 * var b3 = rangeeditmode() & 0x04 // ローカル編集モード
 * 
 * @returns
 * 部分編集されているかどうかの状態値を返す  
 */
declare function rangeeditmode(): number;

/**
 * k    
 * 
 * アウトライン解析の枠のウィンドウハンドルを表します。
 * コマンドを送ることができます。
 * （下記コマンド値一覧参照）
 * 
 * アウトライン解析の枠のコマンド値一覧     
 *  
 * - 7122 関数一覧
 * - 7124 強調一覧
 * - 7152 ツリー表示 - 通常
 * - 7153 ツリー表示 - 分類
 * - 
 * - 7119 枠内の検索
 * - 7121 範囲選択
 * - 7135 下候補(V8.66以降)
 * - 7136 上候補(V8.66以降)
 * - 7141 枠を閉じる
 * - 7142 コピー
 * - 7143 切り抜き
 * - 7144 貼り付け
 * - 7145 行番号
 * - 7163 検索文字列を含む見出しを強調
 * - 7165 アウトライン解析の設定
 * - 7166 最新の情報に更新
 * - 
 * - 7131 位置：左
 * - 7132 位置：右
 * - 7133 位置：上
 * - 7134 位置：下
 * - 7102 位置：浮かせる
 * - 
 * - 7146 関数一覧：パラメータ
 * - 
 * - 7125 強調一覧：行の強調1
 * - 7126 強調一覧：行の強調2
 * - 7127 強調一覧：特に強調1
 * - 7128 強調一覧：特に強調2
 * - 7129 強調一覧：URL/Email
 * - 7130 強調一覧：ファイル名
 * - 7147 強調一覧：行の強調3
 * - 7148 強調一覧：行の強調4
 * - 7149 強調一覧：特に強調3
 * - 7150 強調一覧：特に強調4
 * - 
 * - 7167 ツリー表示：この見出しだけのレベルを上げる
 * - 7168 ツリー表示：この見出しだけのレベルを下げる
 * - 7169 ツリー表示：下位レベルも含めて上移動
 * - 7170 ツリー表示：下位レベルも含めて下移動
 * - 7171 ツリー表示：ツリーそのものをコピー
 * - 7172 ツリー表示：表示方向横書き
 * - 7173 ツリー表示：表示方向縦書き
 * - 7174 ツリー表示：表示方向自動
 * - 7180 ツリー表示：全て展開
 * - 7181 ツリー表示：レベル1まで展開
 * - 7182 ツリー表示：レベル2まで展開
 * - 7183 ツリー表示：レベル3まで展開
 * - 7184 ツリー表示：レベル4まで展開
 * 
 * @example
 * var ret = sendmessage(outlinehandle(), 0x111, 7119, 0); //0x111=WM_COMMAND 7119=枠内の検索 
 * 
 * @returns
 * アウトライン解析の枠のウィンドウハンドルを返す  
 */
declare function outlinehandle(): number;

/**
 * k    
 * 
 * 現在のアウトライン解析の枠の幅(左右の場合)または    
 * 高さ(上下の場合)をピクセル単位で表します。    
 * 
 * @returns
 * 現在のアウトライン解析の枠の幅(左右の場合)または    
 * 高さ(上下の場合)をピクセル単位で返す。  
 */
declare function outlinesize(): number;

/**
 * k    
 * 
 * アウトライン解析の枠にある項目の数を表します。    
 * 
 * @comment
 * 参照：    
 * @see getoutlineitem    
 * 
 * @returns
 * アウトライン解析の枠にある項目の数を返す
 */
declare function outlineitemcount(): number;

/**
 * f    
 * 
 * str関数は、数値を文字列に変換します。    
 * (秀丸マクロの互換のために実装されていますが、    
 *  JavaScriptには、toString()メソッドがありますので、    
 *  そちらを使うのが一般的です。)
 * 
 * @param num_value 数値を指定します。    
 * 例えばnum_valueが100の場合，返す値は"100"となります。
 * @example
 * message(str(100)); // "100"
 * 
 * @comment
 * 参照：    
 * @see val 関数
 * @see str 関数
 * @see hex 関数
 * @see sprintf 関数
 * 
 * @returns
 * 引数の「数値」を「文字列の数字」にして返す
 */
declare function str(num_value: number): string;

/**
 * f    
 * 
 * val関数は、文字列を数値に変換します。    
 * (秀丸マクロの互換のために実装されていますが、    
 *  JavaScriptは、「文字列の数字」に単項演算子として「+」を付けると数値に変換できますので、    
 *  そちらを使うのが一般的です。)
 * 
 * @param num_value 文字列を指定します。    
 * 例えばnum_stringが"100"の場合，返す値は100となります。    
 * 16進数の文字列も指定できます。    
 * "0x100"にすると、返す値は256となります。    
 * 数値に変換できない場合は0が返ります。
 * 
 * @example
 * var a = "100"+"23";
 * message(a);
 * var a = val("100") + val("23");
 * message(str(a));
 * 
 * var a = (+"100") + (+"23"); // JavaScriptでは数字に+を付けると数値になる
 * 
 * @comment
 * 参照：    
 * @see val 関数
 * @see str 関数
 * @see hex 関数
 * @see sprintf 関数
 * 
 * @returns
 * 「文字列の数字」を「数値」にして返します。
 */
declare function val(num_string: string): number;

/**
 * f    
 * 
 * char関数は、数値の文字コードの文字を文字列にして返します。
 * 
 * asciiと逆の関数です。    
 * charはShift-JIS版の関数と言えます。   
 * Unicode版に相当するunichar関数もあります。
 * 漢字のコードを指定すれば、１文字の漢字の文字列になります。    
 * 返す値は文字列型です。
 * 
 * @param char_code 文字コードを指定します。    
 * 例えばnum_valueが100の場合，返す値は"100"となります。
 * @example
 * var a = char( 0x41 ); // "A"が返ってきます。
 * 
 * @returns
 * 数値の文字コードの文字を文字列として返す
 */
declare function char(char_code: number): string;

/**
 * f    
 * 
 * ascii関数は、文字列の先頭文字の文字コード（数値）を取得します。    
 * Unicode独自の文字の場合は、半角幅相当の場合は「?」と同じ0x3Fを返します。    
 * 全角幅相当の場合は「？」と同じ0x8148を返します。    
 * 
 * charと逆の関数です。
 * asciiはShift-JIS版の関数と言えます。   
 * Unicode版に相当するunicode関数もあります。
 * 
 * @param character 対象となる文字列を指定します。    
 * 先頭の１文字だけを見ます。
 * 
 * @param fallback_behavior 1を指定するとUnicode独自の文字で「?」や「？」相当を返すことはなく、    
 * 0を返すようになります。    
 * 
 * @example
 * var a = char( 0x41 ); // "A"が返ってきます。
 * var b = hex(ascii("あ"));
 * 
 * @returns
 * 引数の文字列の先頭文字の文字コード（数値）を返す
 */
declare function ascii(character: string, fallback_behavior?: number): number;

/**
 * f    
 * 
 * unichar関数は、Unicodeの値を文字列にして返します。
 * 
 * char関数のUnicode版です。    
 * unicode関数と逆の関数です。
 * 
 * @param char_code Unicodeの文字コードを指定します。
 * @example
 * var a = unichar( 0x3042 ); // "あ"が返ってきます。
 * 
 * @returns
 * Unicodeの値に対応する文字コードの文字を文字列として返す
 */
declare function unichar(unichar_code: number): string;

/**
 * f    
 * 
 * hex関数は、数値を16進数の文字列に変換します。
 * 
 * @comment
 * 参照：    
 * @see val 関数
 * @see str 関数
 * @see hex 関数
 * @see sprintf 関数
 * 
 * @param num 数値を指定します。
 * @example
 * var a = hex(123);
 * 
 * @returns
 * 数値を16進数の文字列にして返す。
 */
declare function hex(num: number): string;

/**
 * f    
 * 
 * sprintfは書式で指定して変換された文字列を返します。
 * 
 * @param format 書式の文字列を指定します
 * 
 * @param optional_params 第２パラメータ以降は、書式に従い文字列または数値を指定します。    
 * パラメータは可変長ですが最大で16個までです。
 *
 * C言語のランタイムライブラリにあるsprintfとほぼ同じですが、    
 * 機能は限定されています。    
 * 以下の書式のタイプに対応しています。
 * - %s
 * - %d
 * - %i
 * - %o
 * - %u
 * - %x
 * - %X
 * - %%
 * 
 * 以下の書式のタイプには対応していません。    
 * - %c
 * - %f
 * - %e
 * - %E
 * - %g
 * - %G
 * - %p
 * - %n
 * 
 * V8.66以降は、64bit版で以下のような64bit長の書き方に対応しています。    
 * 但し、JavaScriptでは値の受け渡しの関係上、64bit値を取り扱えないので注意してください。
 * - %lld
 * - %I64d
 * 
 * @example
 * var a = sprintf("数値:%d  数値桁数:%04d  16進数:%08X\n",111,222,333);
 * insert(a); //"数値:111  数値桁数:0222  16進数:0000014D"になる
 * 
 * @comment
 * 参照：    
 * @see val 関数
 * @see str 関数
 * @see hex 関数
 * @see sprintf 関数
 * 
 * @returns
 * 書式によって変換された文字列が返ります。
 */
declare function sprintf(format: string, ...optional_params: any[]): string;

/**
 * f    
 * 
 * leftstr関数は、文字列の先頭から数えた長さの範囲の文字列を取得します。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の先頭から数えた長さ指定します。
 * 
 * @example
 * var a = leftstr( "秀丸エディタ", 4 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see leftstr
 * @see wcsleftstr
 * @see ucs4leftstr
 * @see cmuleftstr
 * @see gculeftstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の先頭から数えた指定の長さの範囲の文字列を返す。    
 * 半角は1文字、全角は2文字として数える。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function leftstr(text: string, length: number): string;

/**
 * f    
 * 
 * rightstr関数は、文字列の末尾から数えた長さの範囲の文字列を取得します。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の末尾から数えた長さ指定します。
 * 
 * @example
 * var a = rightstr( "秀丸エディタ", 8 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see rightstr
 * @see wcsrightstr
 * @see ucs4rightstr
 * @see cmurightstr
 * @see gcurightstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の末尾から数えた長さの範囲の文字列を返す。    
 * 半角は1文字、全角は2文字として数える。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function rightstr(text: string, length: number): string;

/**
 * f    
 * 
 * midstr関数は、文字列の指定の範囲を取得します。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param from 範囲の開始位置を指定します。
 *
 * @param length 範囲の長さを指定します。省略すると、末尾までの長さになります。
 * 
 * @example
 * var a = midstr( "秀丸エディタ", 4, 6 );
 * message(a);
 * 
 * @comment
 * 参照：
 * @see midstr
 * @see wcsmidstr
 * @see ucs4midstr
 * @see cmumidstr
 * @see gcumidstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の指定の範囲を返す。  
 * 半角は1文字、全角は2文字として数えます。 
 */
declare function midstr(text: string, from: number, length?: number): string;

/**
 * f    
 * 
 * strlen関数は、文字列の長さを取得します
 * 
 * @param text 対象となる文字列を指定します。
 * 
 * @example
 * var a = strlen( "秀丸エディタ" );
 * message(str(a));
 * 
 * @comment
 * 参照：
 * @see strlen
 * @see wcslen
 * @see ucs4len
 * @see cmulen
 * @see gculen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の長さを返す。    
 * 半角文字は1文字、全角文字は2文字として数えます。
 */
declare function strlen(text: string): number;

/**
 * f    
 * 
 * strstr関数は、文字列の先頭から末尾の方向に向かって検索し、    
 * 見つかった位置を取得します。
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は先頭から検索します。
 * 
 * @example
 * var a = strstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strstr
 * @see wcsstrstr
 * @see ucs4strstr
 * @see cmustrstr
 * @see gcustrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 半角文字は1文字、全角文字は2文字として数えます。
 */
declare function strstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * strrstr関数は、文字列の最後から先頭の方向に向かって検索し、    
 * 見つかった位置を取得します。
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は末尾から検索します。
 * 
 * @example
 * var a = strrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strrstr
 * @see wcsstrrstr
 * @see ucs4strrstr
 * @see cmustrrstr
 * @see gcustrrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 半角文字は1文字、全角文字は2文字として数えます。
 */
declare function strrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * wcsleftstr関数は、文字列の先頭から数えた長さの範囲の文字列を取得します。    
 * 単位は、Unicode(UCS-2)単位です。    
 * 
 * leftstrのUnicode版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *  * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の先頭から数えた長さ指定します。
 * 
 * @example
 * var a = wcsleftstr( "秀丸エディタ", 2 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see leftstr
 * @see wcsleftstr
 * @see ucs4leftstr
 * @see cmuleftstr
 * @see gculeftstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の先頭から数えた指定の長さの範囲の文字列を返す。    
 * 単位は、Unicode(UCS-2)単位。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function wcsleftstr(text: string, length: number): string;


/**
 * f    
 * 
 * wcsrightstr関数は、文字列の末尾から数えた長さの範囲の文字列を取得します。    
 * 単位は、Unicode(UCS-2)単位です。    
 * 
 * rightstrのUnicode版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の末尾から数えた長さ指定します。
 * 
 * @example
 * var a = wcsrightstr( "秀丸エディタ", 4 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see rightstr
 * @see wcsrightstr
 * @see ucs4rightstr
 * @see cmurightstr
 * @see gcurightstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の末尾から数えた長さの範囲の文字列を返す。    
 * 単位は、Unicode(UCS-2)単位。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function wcsrightstr(text: string, length: number): string;

/**
 * f    
 * 
 * wcsmidstr関数は、文字列の指定の範囲を取得します。    
 * 単位は、Unicode(UCS-2)単位です。    
 * 
 * midstrのUnicode版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param from 範囲の開始位置を指定します。
 *
 * @param length 範囲の長さを指定します。省略すると、末尾までの長さになります。
 * 
 * @example
 * var a = wcsmidstr( "秀丸エディタ", 2, 3 );
 * message(a);
 * 
 * @comment
 * 参照：
 * @see midstr
 * @see wcsmidstr
 * @see ucs4midstr
 * @see cmumidstr
 * @see gcumidstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の指定の範囲を返す。  
 * 単位は、Unicode(UCS-2)単位。
 */
declare function wcsmidstr(text: string, from: number, length?: number): string;

/**
 * f    
 * 
 * wcslen関数は、文字列の長さを取得します。    
 * 単位は、Unicode(UCS-2)単位です。    
 * 
 * strlenのUnicode版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16の数え方と同じになります。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。

 * @param text 対象となる文字列を指定します。
 * 
 * @example
 * var a = wcslen( "秀丸エディタ" );
 * message(str(a));
 * 
 * @comment
 * 参照：
 * @see strlen
 * @see wcslen
 * @see ucs4len
 * @see cmulen
 * @see gculen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の長さを返す。    
 * 単位は、Unicode(UCS-2)単位。    
 */
declare function wcslen(text: string): number;

/**
 * f    
 * 
 * strstr関数は、文字列の先頭から末尾の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 位置の単位は、Unicode(UCS-2)単位です。    
 * 
 * strstrのUnicode版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。    
 * 先頭が0です。 
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は先頭から検索します。
 * 
 * @example
 * var a = wcsstrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strstr
 * @see wcsstrstr
 * @see ucs4strstr
 * @see cmustrstr
 * @see gcustrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 位置の単位は、Unicode(UCS-2)単位。
 */
declare function wcsstrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * wcsstrrstr関数は、文字列の最後から先頭の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 位置の単位は、Unicode(UCS-2)単位です。
 * 
 * strrstrのUnicode版です。    
 * 全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字は2文字として数えます。    
 * 先頭が0です。    
 *
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は末尾から検索します。
 * 
 * @example
 * var a = wcsstrrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strrstr
 * @see wcsstrrstr
 * @see ucs4strrstr
 * @see cmustrrstr
 * @see gcustrrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 位置の単位は、Unicode(UCS-2)単位。
 */
declare function wcsstrrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * ucs4leftstr関数は、文字列の先頭から数えた長さの範囲の文字列を取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * leftstrのUnicode(UCS-4)版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *  * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の先頭から数えた長さ指定します。
 * 
 * @example
 * var a = ucs4leftstr( "秀丸エディタ", 2 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see leftstr
 * @see wcsleftstr
 * @see ucs4leftstr
 * @see cmuleftstr
 * @see gculeftstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の先頭から数えた指定の長さの範囲の文字列を返す。    
 * 位置の単位は、Unicode(UCS-4)単位    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function ucs4leftstr(text: string, length: number): string;


/**
 * f    
 * 
 * ucs4rightstr関数は、文字列の末尾から数えた長さの範囲の文字列を取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * rightstrのUnicode(UCS-4)版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の末尾から数えた長さ指定します。
 * 
 * @example
 * var a = ucs4rightstr( "秀丸エディタ", 4 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see rightstr
 * @see wcsrightstr
 * @see ucs4rightstr
 * @see cmurightstr
 * @see gcurightstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の末尾から数えた長さの範囲の文字列を返す。    
 * 位置の単位は、Unicode(UCS-4)単位。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function ucs4rightstr(text: string, length: number): string;

/**
 * f    
 * 
 * ucs4midstr関数は、文字列の指定の範囲を取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * midstrのUnicode(UCS-4)版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param from 範囲の開始位置を指定します。
 *
 * @param length 範囲の長さを指定します。省略すると、末尾までの長さになります。
 * 
 * @example
 * var a = ucs4midstr( "秀丸エディタ", 2, 3 );
 * message(a);
 * 
 * @comment
 * 参照：
 * @see midstr
 * @see wcsmidstr
 * @see ucs4midstr
 * @see cmumidstr
 * @see gcumidstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の指定の範囲を返す。  
 * 位置の単位は、Unicode(UCS-4)単位
 */
declare function ucs4midstr(text: string, from: number, length?: number): string;

/**
 * f    
 * 
 * ucs4len関数は、文字列の長さを取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * strlenのUnicode(UCS-4)版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。    

 * @param text 対象となる文字列を指定します。
 * 
 * @example
 * var a = ucs4len( "秀丸エディタ" );
 * message(str(a));
 * 
 * @comment
 * 参照：
 * @see strlen
 * @see wcslen
 * @see ucs4len
 * @see cmulen
 * @see gculen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の長さを返す。    
 * 位置の単位は、Unicode(UCS-4)単位    
 */
declare function ucs4len(text: string): number;

/**
 * f    
 * 
 * ucs4strstr関数は、文字列の先頭から末尾の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * strstrのUnicode(UCS-4)版です。全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。    
 * 先頭が0です。 
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は先頭から検索します。
 * 
 * @example
 * var a = ucs4strstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strstr
 * @see wcsstrstr
 * @see ucs4strstr
 * @see cmustrstr
 * @see gcustrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 位置の単位は、Unicode(UCS-4)単位
 */
declare function ucs4strstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * ucs4strrstr関数は、文字列の最後から先頭の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 位置の単位は、Unicode(UCS-4)単位です。(UTF-32/1文字32bit=4バイト)    
 * 
 * strrstrのUnicode(UCS-4)版です。    
 * 全角文字も半角文字も1文字として数えます。    
 * UTF-16でサロゲートペアとなる文字も1文字として数えます。    
 * 先頭が0です。    
 *
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は末尾から検索します。
 * 
 * @example
 * var a = ucs4strrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strrstr
 * @see wcsstrrstr
 * @see ucs4strrstr
 * @see cmustrrstr
 * @see gcustrrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 位置の単位は、Unicode(UCS-4)単位
 */
declare function ucs4strrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * cmuleftstr関数は、文字列の先頭から数えた長さの範囲の文字列を取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * leftstrのカーソル移動単位版です。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *  * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の先頭から数えた長さ指定します。
 * 
 * @example
 * var a = cmuleftstr( "秀丸エディタ", 2 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see leftstr
 * @see wcsleftstr
 * @see ucs4leftstr
 * @see cmuleftstr
 * @see gculeftstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の先頭から数えた指定の長さの範囲の文字列を返す。    
 * 単位は、カーソル移動単位    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function cmuleftstr(text: string, length: number): string;


/**
 * f    
 * 
 * cmurightstr関数は、文字列の末尾から数えた長さの範囲の文字列を取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * rightstrのカーソル移動単位版です。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の末尾から数えた長さ指定します。
 * 
 * @example
 * var a = cmurightstr( "秀丸エディタ", 4 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see rightstr
 * @see wcsrightstr
 * @see ucs4rightstr
 * @see cmurightstr
 * @see gcurightstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の末尾から数えた長さの範囲の文字列を返す。    
 * 単位は、カーソル移動単位。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function cmurightstr(text: string, length: number): string;

/**
 * f    
 * 
 * cmumidstr関数は、文字列の指定の範囲を取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * midstrのカーソル移動単位版です。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param from 範囲の開始位置を指定します。
 *
 * @param length 範囲の長さを指定します。省略すると、末尾までの長さになります。
 * 
 * @example
 * var a = cmumidstr( "秀丸エディタ", 2, 4 );
 * message(a);
 * 
 * @comment
 * 参照：
 * @see midstr
 * @see wcsmidstr
 * @see ucs4midstr
 * @see cmumidstr
 * @see gcumidstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の指定の範囲を返す。  
 * 単位は、カーソル移動単位
 */
declare function cmumidstr(text: string, from: number, length?: number): string;

/**
 * f    
 * 
 * cmulen関数は、文字列の長さを取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * strlenのカーソル移動単位版です。
 *  
 * @param text 対象となる文字列を指定します。
 * 
 * @example
 * var a = cmulen( "秀丸エディタ" );
 * message(str(a));
 * 
 * @comment
 * 参照：
 * @see strlen
 * @see wcslen
 * @see ucs4len
 * @see cmulen
 * @see gculen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の長さを返す。    
 * 単位は、カーソル移動単位
 */
declare function cmulen(text: string): number;

/**
 * f    
 * 
 * cmustrstr関数は、文字列の先頭から末尾の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * strstrのカーソル移動単位版です。    
 * 先頭が0です。 
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は先頭から検索します。
 * 
 * @example
 * var a = cmustrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strstr
 * @see wcsstrstr
 * @see ucs4strstr
 * @see cmustrstr
 * @see gcustrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 単位は、カーソル移動単位
 */
declare function cmustrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * cmustrrstr関数は、文字列の最後から先頭の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 単位は、カーソル移動単位です。    
 * 
 * strrstrのカーソル移動単位版です。
 * 先頭が0です。    
 *
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は末尾から検索します。
 * 
 * @example
 * var a = cmustrrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strrstr
 * @see wcsstrrstr
 * @see ucs4strrstr
 * @see cmustrrstr
 * @see gcustrrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 単位は、カーソル移動単位
 */
declare function cmustrrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * gculeftstr関数は、文字列の先頭から数えた長さの範囲の文字列を取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * leftstrの書記素クラスター単位版です。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *  * 
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の先頭から数えた長さ指定します。
 * 
 * @example
 * var a = gculeftstr( "秀丸エディタ", 2 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see leftstr
 * @see wcsleftstr
 * @see ucs4leftstr
 * @see cmuleftstr
 * @see gculeftstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の先頭から数えた指定の長さの範囲の文字列を返す。    
 * 単位は、書記素クラスター単位    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function gculeftstr(text: string, length: number): string;


/**
 * f    
 * 
 * gcurightstr関数は、文字列の末尾から数えた長さの範囲の文字列を取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * rightstrの書記素クラスター単位版です。    
 * 元の文字列の長さが指定の長さより小さい場合は、元の文字列がそのまま返ります。
 *
 * @param text 対象となる文字列を指定します。
 *
 * @param length 文字列の末尾から数えた長さ指定します。
 * 
 * @example
 * var a = gcurightstr( "秀丸エディタ", 4 );
 * message(a);
 * 
 * @comment
 * 参照：    
 * @see rightstr
 * @see wcsrightstr
 * @see ucs4rightstr
 * @see cmurightstr
 * @see gcurightstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の末尾から数えた長さの範囲の文字列を返す。    
 * 単位は、書記素クラスター単位。    
 * 元の文字列の長さが指定の長さより小さい場合は、   
 * 元の文字列がそのまま返る。
 */
declare function gcurightstr(text: string, length: number): string;

/**
 * f    
 * 
 * gcumidstr関数は、文字列の指定の範囲を取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * midstrの書記素クラスター単位版です。
 * 
 * @param text 対象となる文字列を指定します。
 *
 * @param from 範囲の開始位置を指定します。
 *
 * @param length 範囲の長さを指定します。省略すると、末尾までの長さになります。
 * 
 * @example
 * var a = gcumidstr( "秀丸エディタ", 2, 3 );
 * message(a);
 * 
 * @comment
 * 参照：
 * @see midstr
 * @see wcsmidstr
 * @see ucs4midstr
 * @see cmumidstr
 * @see gcumidstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の指定の範囲を返す。  
 * 単位は、書記素クラスター単位
 */
declare function gcumidstr(text: string, from: number, length?: number): string;

/**
 * f    
 * 
 * gculen関数は、文字列の長さを取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * strlenの書記素クラスター単位版です。
 *  
 * @param text 対象となる文字列を指定します。
 * 
 * @example
 * var a = gculen( "秀丸エディタ" );
 * message(str(a));
 * 
 * @comment
 * 参照：
 * @see strlen
 * @see wcslen
 * @see ucs4len
 * @see cmulen
 * @see gculen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字列の長さを返す。    
 * 単位は、書記素クラスター単位
 */
declare function gculen(text: string): number;

/**
 * f    
 * 
 * gcustrstr関数は、文字列の先頭から末尾の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * strstrの書記素クラスター単位版です。    
 * 先頭が0です。 
 * 
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は先頭から検索します。
 * 
 * @example
 * var a = gcustrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strstr
 * @see wcsstrstr
 * @see ucs4strstr
 * @see cmustrstr
 * @see gcustrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 単位は、書記素クラスター単位
 */
declare function gcustrstr(text: string, pattern: string, from?: number): number;

/**
 * f    
 * 
 * gcustrrstr関数は、文字列の最後から先頭の方向に向かって検索し、    
 * 見つかった位置を取得します。    
 * 単位は、書記素クラスター単位です。    
 * 
 * strrstrの書記素クラスター単位版です。
 * 先頭が0です。    
 *
 * @param text 検索対象となる文字列を指定します。
 * 
 * @param pattern 検索する文字列を指定します。
 * 
 * @param from 検索開始位置を指定します。省略した場合は末尾から検索します。
 * 
 * @example
 * var a = gcustrrstr( "秀丸エディタ秀丸エディタ", "エ" );
 * message(str(a));
 * 
 * @comment
 * 参照：    
 * @see strrstr
 * @see wcsstrrstr
 * @see ucs4strrstr
 * @see cmustrrstr
 * @see gcustrrstr    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 見つかった位置を返す。    
 * 見つからなかった場合は-1を返す。    
 * 単位は、書記素クラスター単位
 */
declare function gcustrrstr(text: string, pattern: string, from?: number): number;

/**
 * f
 * 
 * wcs_to_char関数は、Unicode(UCS-2)単位の文字位置から文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * strlen等の文字の数え方は、全角を２つ、半角を１つとして数えます。    
 * wcslen等のUnicode(UCS-2)の文字の数え方は、全角も半角も１つとして数えます。    
 * この数え方の違いを変換します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column_wcs
 * 0から数えた文字位置（column_wcs相当）を指定します。
 * 
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、6を返します。    
 * 
 * @example
 * var c = wcs_to_char("あいうabcde", 3 ); // "あいう"はcolumn_wcs相当で3文字
 * message(str(c)); // column相当で6文字
 * 
 * @example
 * selectall();
 * insert("あいうabcde\n"); // 1行目となるテキスト
 * var c = wcs_to_char(1,3); // 1行目のcolumn_wcs相当で3文字
 * message(str(c)); // column相当で6文字
 *
 * @comment 
 * 参照：    
 * @see column    
 * @see char_to_wcs    
 * @see wcslen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字位置（column相当）を返します。
 */
declare function wcs_to_char(text_line: string | number, from_column_wcs: number): number;

/**
 * f
 * 
 * char_to_wcs関数は、文字位置からUnicode(UCS-2)単位の文字位置の変換をして、    
 * 変換された位置を取得します。
 * 
 * strlen等の文字の数え方は、全角を２つ、半角を１つとして数えます。    
 * wcslen等のUnicode(UCS-2)の文字の数え方は、全角も半角も１つとして数えます。    
 * この数え方の違いを変換します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column
 * 0から数えた文字位置（column相当）を指定します。    
 * 
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、3を返します。    
 * 
 * @example
 * var wcs = char_to_wcs("あいうabcde", 6 ); // "あいう"はcolumn相当で6文字
 * message(str(wcs)); // Unicode(UCS-2)単位で3文字
 * 
 * @example
 * selectall();
 * insert("あいうabcde\n"); // 1行目となるテキスト
 * var wcs = char_to_wcs(1,6); // 1行目のcolumn相当で6文字目
 * message(str(wcs)); // Unicode(UCS-2)単位で3文字
 *
 * @comment 
 * 参照：    
 * @see column    
 * @see wcs_to_char    
 * @see wcslen    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * Unicode(UCS-2)単位の文字位置（column_wcs相当）を返す。
 */
declare function char_to_wcs(text_line: string | number, from_column: number): number;

/**
 * f
 * 
 * ucs4_to_char関数は、Unicode(UCS-4)単位の文字位置から文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * strlen等の文字の数え方は、全角を２つ、半角を１つとして数えます。    
 * ucs4len等のUnicode(UCS-4)の文字の数え方は、全角も半角も１つとして数えます。    
 * UTF-16でサロゲートペアとなる文字も１つとして数えます。    
 * この数え方の違いを変換します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column_ucs4 
 * 0から数えたUnicode(UCS-4)単位の文字位置（column_ucs4相当）を指定します。
 * 
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、6を返します。    
 * 
 * @example
 * var c = ucs4_to_char("あいうabcde", 3 ); // "あいう"はUnicode(UCS-4)単位で3文字
 * message(str(c)); // column相当で6文字
 * 
 * @example
 * selectall();
 * insert("あいうabcde\n"); // 1行目となるテキスト
 * var c = ucs4_to_char(1,3); // 1行目のUnicode(UCS-4)単位で3文字目
 * message(str(c)); // column相当で6文字
 *
 * @comment 
 * 参照：    
 * @see column    
 * @see char_to_ucs4    
 * @see ucs4len    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字位置（column相当）を返します。
 * 
 */
declare function ucs4_to_char(text_line: string | number, from_column_ucs4: number): number;

/**
 * f
 * 
 * char_to_ucs4関数は、文字位置からUnicode(UCS-4)単位の文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * strlen等の文字の数え方は、全角を２つ、半角を１つとして数えます。    
 * ucs4len等のUnicode(UCS-4)の文字の数え方は、全角も半角も１つとして数えます。    
 * UTF-16でサロゲートペアとなる文字も１つとして数えます。    
 * この数え方の違いを変換します。    
 *  
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column
 * 0から数えた文字位置（column相当）を指定します。    
 * 
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、3を返します。    
 * 
 * @example
 * var ucs4 = char_to_ucs4("あいうabcde", 6 ); // "あいう"はcolumn相当で6文字
 * message(str(ucs4)); // Unicode(UCS-4)単位で3文字
 * 
 * @example
 * selectall();
 * insert("あいうabcde\n"); // 1行目となるテキスト
 * var ucs4 = char_to_ucs4(1,6); // 1行目のcolumn相当で6文字目
 * message(str(ucs4)); // Unicode(UCS-4)単位で3文字
 *
 * @comment 
 * 参照：    
 * @see column    
 * @see ucs4_to_char    
 * @see ucs4len    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * Unicode(UCS-4)単位の文字位置（column_ucs4相当）を返す。
 */
declare function char_to_ucs4(text_line: string | number, from_column: number): number;

/**
 * f
 * 
 * cmu_to_char関数は、カーソル移動単位の文字位置から文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column_cmu 
 * 0から数えたカーソル移動単位の文字位置（column_cmu相当）を指定します。    
 *  
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、4を返します。    
 * 
 * @example
 * var c = cmu_to_char("秀丸エディタ",2)); // "秀丸"はカーソル移動単位で2文字
 * message(str(c)); // column相当で4文字
 * 
 * @example
 * selectall();
 * insert("秀丸エディタ\n"); // 1行目となるテキスト
 * var c = cmu_to_char(1,2); // 1行目のカーソル移動単位で2文字目
 * message(str(c)); // column相当で4文字
 *
 * @comment 
 * 参照：    
 * @see char_to_cmu    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字位置（column相当）を返します。
 */
declare function cmu_to_char(text_line: string | number, from_column_cmu: number): number;

/**
 * f
 * 
 * char_to_cmu関数は、文字位置からカーソル移動単位の文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column
 * 0から数えた文字位置（column相当）を指定します。    
 * 
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例では、2を返します。    
 * 
 * @example
 * var cmu = char_to_cmu("秀丸エディタ",4); // "秀丸"はcolumn相当で4文字
 * message(str(cmu)); // カーソル移動単位で2文字
 * 
 * @example
 * selectall();
 * insert("秀丸エディタ\n"); // 1行目となるテキスト
 * var cmu = char_to_cmu(1,4); // 1行目のcolumn相当の4文字目
 * message(str(cmu)); // カーソル移動単位で2文字
 *
 * @comment 
 * 参照：    
 * @see cmu_to_char    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * カーソル移動単位の文字位置（column_cmu相当）を返す。
 * 
 */
declare function char_to_cmu(text_line: string | number, from_column: number): number;

/**
 * f
 * 
 * gcu_to_char関数は、書記素クラスター単位の文字位置から文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column_gcu 
 * 0から数えた書記素クラスター単位の文字位置（column_gcu相当）を指定します。
 *
 * @example
 * var c = gcu_to_char("秀丸エディタ",2); // "秀丸"は書記素クラスター単位で2文字
 * message(str(c)); // column相当で4文字
 * 
 * @example
 * selectall();
 * insert("秀丸エディタ\n"); // 1行目となるテキスト
 * var c = gcu_to_char(1,2); // 1行目の書記素クラスター単位で2文字目
 * message(str(c)); // column相当で4文字
 *
 * @comment 
 * 参照：    
 * @see char_to_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 文字位置（column相当）を返します。
 */
declare function gcu_to_char(text_line: string | number, from_column_gcu: number): number;

/**
 * f
 * 
 * char_to_gcu関数は、文字位置から書記素クラスター単位の文字位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * @param text_line 
 * 文字列を指定すると、文字列を対象に変換します。    
 * 数値を指定すると、1から数えた行番号（lineno相当）の本文のテキストを対象に変換します。    
 * 
 * @param from_column
 * 0から数えた文字位置（column相当）を指定します。    
 * 
 * @example
 * var gcu = char_to_gcu("秀丸エディタ",4); // "秀丸"はcolumn相当で4文字
 * message(str(gcu)); // 書記素クラスター単位で2文字
 * 
 * @example
 * selectall();
 * insert("秀丸エディタ\n"); // 1行目となるテキスト
 * var gcu = char_to_gcu(1,4); // 1行目のcolumn相当の4文字目
 * message(str(gcu)); // 書記素クラスター単位で2文字
 *
 * @comment 
 * 参照：    
 * @see gcu_to_char    
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 書記素クラスター単位の文字位置（column_gcu相当）を返す。
 * 
 */
declare function char_to_gcu(text_line: string | number, from_column: number): number;

/**
 * f
 * 
 * byteindex_to_charindex関数は、バイト位置から文字位置の変換をして、    
 * 変換された位置を取得します。
 * 
 * strlen等の文字の数え方は、全角を２つ、    
 * 半角を１つとして数えます。    
 * Unicode文字でも全角を２つ、半角を１つとして数えます。    
 * HmJre.dllをloaddllして呼ぶ関数のFindRegular関数等は、    
 * 全角２バイト、半角１バイト、Unicode文字を４バイトとして扱います。    
 * 
 * この数え方の違いを変換して、    
 * strlen等の数え方と一致させるためにこの関数があります。    
 * 
 * @param text 
 * 対象となる文字列を指定します。    
 * 
 * @param byteindex 
 * バイト位置を指定します。
 *
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例で、最初の文字がUnicodeの全角文字だとしたら、2を返します。    
 * 
 * @example
 * // var a = byteindex_to_charindex( "☀abcde", 4 );
 * var a = byteindex_to_charindex( "\u2600abcde", 4 );
 * message(str(a));
 * 
 * @comment
 * 最初の文字がUnicodeの半角文字だとしたら、1を返します。    
 * 
 * @example
 * // var a = byteindex_to_charindex( "Àabcde", 4 );
 * var a = byteindex_to_charindex( "\u00c0abcde", 4 );
 * message(str(a));
 *
 * @comment
 * 以下の例では、byteindex_to_charindexを呼ぶことによって、    
 * strstrの結果と同じ位置を得られることになります。
 * 
 * @example
 * var hmjre = loaddll("HmJre.dll");
 * var target = "\u2600abcde"; // "☀abcde"
 * var a = hmjre.dllFunc.FindRegular( "FindRegular", "abc", target, 0 );
 * var b = byteindex_to_charindex( target, a );
 * var c = strstr( target, "abc" );
 *
 * @comment
 * HmJre.dllにはdllfuncで呼び出せる関数としてSetUnicodeIndexAutoConvertという関数があります。    
 * これを使うと、byteindex_to_charindex, charindex_to_byteindexを使わずに自動的に変換することもできます。    
 * 詳細はHmJre.dllのヘルプを参照してください。
 * 
 * @comment 
 * 参照：    
 * @see column    
 * @see charindex_to_byteindex
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 0から数えた文字位置（column相当）を返す。
 */
declare function byteindex_to_charindex(text: string, byteindex: number): number;

/**
 * f
 * 
 * charindex_to_byteindex関数は、文字位置からバイト位置の変換をして、    
 * 変換された位置を取得します。    
 * 
 * strlen等の文字の数え方は、全角を２つ、    
 * 半角を１つとして数えます。    
 * Unicode文字でも全角を２つ、半角を１つとして数えます。    
 * HmJre.dllをloaddllして呼ぶ関数のFindRegular関数等は、    
 * 全角２バイト、半角１バイト、Unicode文字を４バイトとして扱います。    
 * 
 * この数え方の違いを変換して、    
 * strlen等の数え方と一致させるためにこの関数があります。    
 * 
 * @param text 
 * 対象となる文字列を指定します。    
 * 
 * @param  charindex 
 * 0から数えた文字位置（column相当）を指定します。
 *
 * @comment
 * 文字の先頭を 0 として、いくつ目かで計算します。    
 * 以下の例で、最初の文字がUnicodeの全角文字だとしたら、2を返します。    
 * 
 * @example
 * // var a = charindex_to_byteindex( "☀abcde", 2 );
 * var a = charindex_to_byteindex( "\u2600abcde", 2 );
 * message(str(a));
 * 
 * @comment
 * 最初の文字がUnicodeの半角文字だとしたら、5を返します。    
 * 
 * @example
 * // var a = charindex_to_byteindex( "Àabcde", 2 );
 * var a = charindex_to_byteindex( "\u00c0abcde", 2 );
 * message(str(a));
 *
 * @comment
 * 以下の例で、文字列変数中にUnicode文字が含まれるかどうかを    
 * 調べることに使うこともできます。
 * 
 * @example
 * var target = "□abcde";
 * var c = strlen( target );
 * if( charindex_to_byteindex( target, c ) != c ) {
 *    // Unicode文字が含まれる
 * } else {
 *    // Unicode文字が含まれない
 * }
 *
 * @comment
 * HmJre.dllにはdllfuncで呼び出せる関数としてSetUnicodeIndexAutoConvertという関数があります。    
 * これを使うと、byteindex_to_charindex, charindex_to_byteindexを使わずに自動的に変換することもできます。    
 * 詳細はHmJre.dllのヘルプを参照してください。
 * 
 * @comment 
 * 参照：    
 * @see column    
 * @see byteindex_to_charindex
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * バイト位置を返す。
 */
declare function charindex_to_byteindex(text: string, charindex: number): number;

/**
 * f
 * 
 * gettext関数は、座標で指定する範囲にある文字列を取得します。
 * エディタのテキストを操作する上では、gettextではなく、    
 * gettext2を利用した方が、通常は便利ですので、    
 * そちらも参照してください。    
 * 
 * @param bgn_x 範囲の開始位置のX座標を指定します。
 * 
 * @param bgn_y 範囲の開始位置のY座標を指定します。
 * 
 * @param bgn_x 範囲の終了位置のX座標を指定します。
 * 
 * @param bgn_y 範囲の終了位置のY座標を指定します。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext( 0, 0, 10, 10 );
 * 
 * @comment
 * x，y座標の指定の仕方はmoveto文と同じです。    
 * 
 * @example
 * var a = gettext( seltopx, seltopy, selendx, selendy, 1 );
 *
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext(bgn_x: number, bgn_y: number, end_x: number, end_y: number, keep_select?: number, n_replace?: number): string;

/**
 * f
 * 
 * gettext2関数は、行と桁で指定する範囲にある文字列を取得します。
 * 
 * @param bgn_column 範囲の開始位置の桁位置を指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column 範囲の終了位置の桁位置を指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext2( 0, 0, 10, 10 );
 * 
 * @comment
 * 数え方はmoveto2と同じです。
 * 
 * @example
 * var a = gettext2( seltopcolumn(), seltoplineno(), selendcolumn(), selendlineno(), 1 );
 *
 * @comment
 * 途中に改行コードが含まれる場合、"\x0d\x0a"として取得します。    
 * "\n"と同じではないので注意してください。"\n"は"\x0a"と同じです。    
 * 
 * 範囲選択やカーソル位置そのままにファイル内容全体を取得するには、    
 * 以下のようになります。    
 * 
 * @example
 * var a = gettext2( 0, 1, linelen2(linecount2()-1), linecount2(), 1);
 * 
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext2(bgn_column: number, bgn_lineno: number, end_column: number, end_lineno: number, keep_select?: number, n_replace?: number): string;

/**
 * f
 * 
 * gettext_wcs関数は、行と桁で指定する範囲にある文字列を取得します。    
 * gettextのUnicode(UCS-2)単位版です。
 * 
 * @param bgn_column_wcs 範囲の開始位置の桁位置をUnicode(UCS-2)単位で指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column_wcs 範囲の終了位置の桁位置をUnicode(UCS-2)単位で指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext_wcs( 0, 0, 10, 10 );
 * 
 * @example
 * var a = gettext_wcs( seltop_wcs(), seltoplineno(), selend_wcs(), selendlineno(), 1 );
 *
 * @comment
 * 途中に改行コードが含まれる場合、"\x0d\x0a"として取得します。    
 * "\n"と同じではないので注意してください。"\n"は"\x0a"と同じです。    
 * 
 * 範囲選択やカーソル位置そのままにファイル内容全体を取得するには、    
 * 以下のようになります。    
 * 
 * @example
 * var a = gettext_wcs( 0, 1, linelen_wcs(linecount2()-1), linecount2(), 1);
 * 
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext_wcs(bgn_column_wcs: number, bgn_lineno: number, end_column_wcs: number, end_lineno: number, keep_select?: number, n_replace?: number): string;

/**
 * f
 * 
 * gettext_ucs4関数は、行と桁で指定する範囲にある文字列を取得します。    
 * gettextのUnicode(UCS-4)単位版です。
 * 
 * @param bgn_column_ucs4 範囲の開始位置の桁位置をUnicode(UCS-4)単位で指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column_ucs4 範囲の終了位置の桁位置をUnicode(UCS-4)単位で指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext_ucs4( 0, 0, 10, 10 );
 * 
 * @example
 * var a = gettext_ucs4( seltop_ucs4(), seltoplineno(), selend_ucs4(), selendlineno(), 1 );
 *
 * @comment
 * 途中に改行コードが含まれる場合、"\x0d\x0a"として取得します。    
 * "\n"と同じではないので注意してください。"\n"は"\x0a"と同じです。    
 * 
 * 範囲選択やカーソル位置そのままにファイル内容全体を取得するには、    
 * 以下のようになります。    
 * 
 * @example
 * var a = gettext_ucs4( 0, 1, linelen_ucs4(linecount2()-1), linecount2(), 1);
 * 
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext_ucs4(bgn_column_ucs4: number, bgn_lineno: number, end_column_ucs4: number, end_lineno: number, keep_select?: number, n_replace?: number): string;

/**
 * f
 * 
 * gettext_cmu関数は、行と桁で指定する範囲にある文字列を取得します。    
 * gettextのカーソル移動単位版です。
 * 
 * @param bgn_column_cmu 範囲の開始位置の桁位置をカーソル移動単位で指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column_cmu 範囲の終了位置の桁位置をカーソル移動単位で指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext_cmu( 0, 0, 10, 10 );
 * 
 * @example
 * var a = gettext_cmu( seltop_cmu(), seltoplineno(), selend_cmu(), selendlineno(), 1 );
 *
 * @comment
 * 途中に改行コードが含まれる場合、"\x0d\x0a"として取得します。    
 * "\n"と同じではないので注意してください。"\n"は"\x0a"と同じです。    
 * 
 * 範囲選択やカーソル位置そのままにファイル内容全体を取得するには、    
 * 以下のようになります。    
 * 
 * @example
 * var a = gettext_cmu( 0, 1, linelen_cmu(linecount2()-1), linecount2(), 1);
 * 
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext_cmu(bgn_column_cmu: number, bgn_lineno: number, end_column_cmu: number, end_lineno: number, keep_select?: number, n_replace?: number): string;

/**
 * f
 * 
 * gettext_gcu関数は、行と桁で指定する範囲にある文字列を取得します。    
 * gettextの書記素クラスター単位版です。
 * 
 * @param bgn_column_gcu 範囲の開始位置の桁位置を書記素クラスター単位で指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column_gcu 範囲の終了位置の桁位置を書記素クラスター単位で指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @param keep_select 指定しないか0を指定すると、範囲選択を解除します。    
 * 1を指定すると、範囲選択を維持します。    
 * 
 * @param n_replace 1を指定すると、改行コードは"\x0a"として取得します。    
 * 
 * @example
 * var a = gettext_gcu( 0, 0, 10, 10 );
 * 
 * @example
 * var a = gettext_gcu( seltop_gcu(), seltoplineno(), selend_gcu(), selendlineno(), 1 );
 *
 * @comment
 * 途中に改行コードが含まれる場合、"\x0d\x0a"として取得します。    
 * "\n"と同じではないので注意してください。"\n"は"\x0a"と同じです。    
 * 
 * 範囲選択やカーソル位置そのままにファイル内容全体を取得するには、    
 * 以下のようになります。    
 * 
 * @example
 * var a = gettext_gcu( 0, 1, linelen_gcu(linecount2()-1), linecount2(), 1);
 * 
 * @comment
 * 参照：    
 * @see gettext2    
 * @see gettext_wcs    
 * @see gettext_ucs4    
 * @see gettext_cmu    
 * @see gettext_gcu    
 * 文字の単位ごとに各種のバリエーションがあります。    
 * 
 * @returns
 * 指定した範囲の文字列を返す。    
 * 文字列の長さが長すぎると秀丸がエラーになります。
 */
declare function gettext_gcu(bgn_column_gcu: number, bgn_lineno: number, end_column_gcu: number, end_lineno: number, keep_select?: number, n_replace?: number): string;

/**
 * f    
 * 
 * getenv関数は、環境変数の値を取得します。    
 * 
 * @returns
 * 環境変数の値を返す。
 */
declare function getenv(env_varname: string): string;

/**
 * f    
 * 
 * findwindow関数は、指定したキャプション（タイトルバー）の秀丸のウィンドウを探して    
 * そのウィンドウハンドルを取得します。    
 * 
 * 該当するウィンドウが複数見つかった場合でも、１つしか返しません。
 * 
 * @param caption_bar_text キャプション（タイトルバー）のテキスト
 * 
 * @example
 * var a = findwindow( "電卓" );
 * 
 * @param window_class_name 
 * ウィンドウクラス名を指定します。    
 * 指定した場合、キャプションとクラス名の両方に一致したウィンドウを探します。    
 * 省略すると、キャプションだけで探します。    
 * 
 * @example
 * var a = findwindow("電卓","ApplicationFrameWindow");
 * message(hex(a));
 * 
 * @returns
 * 秀丸のウィンドウハンドルを返す。    
 * 見つからなかった場合は0
 */
declare function findwindow(caption_bar_text: string, window_class_name?: string): number;

/**
 * f    
 * 
 * findwindowclass関数は、クラス名からウィンドウを探して    
 * そのウィンドウハンドルを取得します。    
 * 
 * 該当するウィンドウが複数見つかった場合でも、１つしか返しません。
 * 
 * @param window_class_name 
 * ウィンドウクラス名を指定します。    
 * 
 * @example
 * var a = findwindowclass( "Hidemaru32Class" );
 * 
 * @example
 * var a = findwindowclass( "Hidemaru32Class" );
 * message(hex(a));
 * 
 * @returns
 * 秀丸のウィンドウハンドルを返す。    
 * 見つからなかった場合は0
 */
declare function findwindowclass(window_class_name: string): number;

/**
 * f
 * 
 * hwndで指定されるウィンドウハンドルにメッセージを送ります。    
 * 原則的には、Win32 API の SendMesage と同じものです。    
 * 
 * sendmessageは、使い方を誤るとハングしたり異常終了することもあるので注意して下さい。
 * 
 * @param hwnd ウィンドウハンドルを指定します。
 * 
 * @param wndmsg_id メッセージを指定します。    
 * WM_COMMAND のように win32 で定義されている数値
 *
 * @param wparam wParamを指定します。    
 * 
 * @param lparam lParamを指定します。    
 * 
 * @comment
 * メッセージの値やwParam、lParamの値は、処理するウィンドウによります。
 * 
 * @example
 * var ret = sendmessage(outlinehandle, 0x111, 7119, 0); //0x111=WM_COMMAND, 7119=枠内の検索 
 * 
 * @return
 * メッセージを送ったウィンドウが返した値を返す。    
 * 返す値は、Win32APIのSendMessage関数の返り値そのままで、数値型。
 */
declare function sendmessage(hwnd: number, wndmsg_id: number, wparam: number, lparam: number): number

/**
 * f
 * 
 * getgrepfilehist関数は、grepファイルヒストリの文字列を取得します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。    
 * ヒストリの番号は、grepダイアログが普通タイプのときの「検索するファイル」にある順番です。    
 * 
 * 新タイプのときは、フォルダ名部分とファイル名部分が自動的に整理された情報になっていて、    
 * ヒストリの番号とは一致しないので注意が必要です。    
 * 
 * @example
 * var i=0;
 * while(i < 100) {
 *     var a = getgrepfilehist(i);
 *     if(a == ""){
 *         break;
 *     }
 *     insert(a+"\n");
 *     i++;
 * }
 * 
 * @returns
 * 引数で指定したヒストリのgrepファイルヒストリの文字列を返す。
 */
declare function getgrepfilehist(history_ix: number): string

/**
 * f
 * 
 * getgrepfilehist関数は、指定のgrepファイルヒストリに    
 * 常駐（ピン留め）しているかどうかを取得できます。
 * 
 * @param history_ix 
 * 0から始まるヒストリの番号を指定します。    
 * ヒストリの番号は、grepダイアログが普通タイプのときの「検索するファイル」にある順番です。    
 * 
 * 新タイプのときは、フォルダ名部分とファイル名部分が自動的に整理された情報になっていて、    
 * ヒストリの番号とは一致しないので注意が必要です。    
 * 
 * @param is_pin 
 * 1を指定すると、ヒストリに常駐（ピン留め）しているかどうかを取得できます。    
 * 文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。

 * @example
 * var i=0;
 * while(i < 100) {
 *     var a = getgrepfilehist(i);
 *     var b = getgrepfilehist(i, 1);
 *     if(a == ""){
 *         break;
 *     }
 *     insert(a+"\n");
 *     insert(b+"\n\n");
 *     i++;
 * }
 * 
 * @returns
 * ヒストリに常駐（ピン留め）していれば、文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。
 */
declare function getgrepfilehist(history_ix: number, is_pin: 1 | number): "0" | "1"

/**
 * f
 * 
 * xtocolumn関数は、X座標からカラム位置への変換をします。
 * 
 * @param pos_x
 * X座標を指定します。
 * 
 * @param pos_y
 * Y座標を指定します。
 *
 * @example
 * var c = xtocolumn(x, y);
 * var l = ytolineno(x, y);
 * message(str(c)+" "+str(l));
 * 
 * @comment
 * 参照：    
 * @see ytolineno    
 * 
 * @returns
 * カラム位置を返します。
 */
declare function xtocolumn(pos_x: number, pos_y: number): number

/**
 * f
 * 
 * ytolineno関数は、Y座標から行番号への変換をします。
 * 
 * @param pos_x
 * X座標を指定します。
 * 
 * @param pos_y
 * Y座標を指定します。
 *
 * @example
 * var c = xtocolumn(x, y);
 * var l = ytolineno(x, y);
 * message(str(c)+" "+str(l));
 * 
 * @comment
 * 参照：    
 * @see xtocolumn    
 * 
 * @returns
 * 行番号を返します。
 */
declare function ytolineno(pos_x: number, pos_y: number): number

/**
 * f
 * 
 * columntox関数は、カラム位置からX座標への変換をします。
 * 
 * @param pos_column
 * カラム位置を指定します。
 * 
 * @param pos_lineno
 * 行番号を指定します。
 *
 * @example
 * var x = columntox(column, lineno);
 * var y = linenotoy(column, lineno);
 * message(str(c)+" "+str(l));
 * 
 * @comment
 * 参照：    
 * @see linenotoy    
 * 
 * @returns
 * X座標を返します。
 */
declare function columntox(pos_column: number, pos_lineno: number): number

/**
 * f
 * 
 * linenotoy関数は、行番号からY座標への変換をします。（
 * 
 * @param pos_column
 * カラム位置を指定します。
 * 
 * @param pos_lineno
 * 行番号を指定します。
 *
 * @example
 * var x = columntox(column, lineno);
 * var y = linenotoy(column, lineno);
 * message(str(c)+" "+str(l));
 * 
 * @comment
 * 参照：    
 * @see columntox    
 * 
 * @returns
 * Y座標を返します。
 */
declare function linenotoy(pos_column: number, pos_lineno: number): number

/**
 * f
 * 
 * getlinecount関数は、文字列中の位置の行と余りを計算（行と桁に変換）します。    
 * 複数行の文字列中の位置を、行と桁に変換することに使うことができます。    
 * 
 * @param text    
 * 計算元となる、改行コードを含む複数行の文字列を指定します。
 * 
 * @param pos    
 * パラメータ１の文字列上の、先頭から数えた指定の文字の位置を指定します。    
 * 改行も含んで数えた１行目からの位置を指定します。    
 * 文字数の数え方はstrlenやstrstrと同じです。    
 * 
 * @param return_obj    
 * 行数が数えられた後の、余りの文字の位置（0から数えた桁位置）を格納するためのオブジェクトを渡します。    
 * オブジェクトを渡し、オブジェクトのcolumnメンバに値が格納されます。    
 * 例えば、以下のようなオブジェクトです。    
 * 
 * @example
 * var obj = {column: 0} ;
 * var c_line = getlinecount("", 7, obj);
 * var c_column = obj.column;
 * 
 * @returns
 * - 返り値    
 * 指定の文字の位置が、何行目にあるかを返します。    
 * 0から数えた行数を返します。
 * 
 */
declare function getlinecount(text: string, pos: number, return_obj: { column: number } | {}): number

/**
 * f
 * 
 * @param count_type    
 * 数え方のフラグを指定します。
 * 
 * [全角文字の数え方のビットフラグ]
 * - 0x00000000　全角文字を1文字として数える
 * - 0x00000001　全角文字を2文字として数える
 * - 0x00000002　全角文字を数えない
 * - 0x00000008　カーソル移動単位（V8.96以降）
 *  
 * [半角文字の数え方のビットフラグ]
 * - 0x00000000　半角文字を1文字として数える
 * - 0x00000010　半角文字を2文字として数える
 * - 0x00000020　半角文字を数えない
 * - 0x00000030　半角文字を0.5文字として数える
 * - 0x00000080　カーソル移動単位（V8.96以降）
 * 
 *  [全角空白の数え方のビットフラグ]
 * - 0x00000000　全角空白を1文字として数える
 * - 0x00000100　全角空白を2文字として数える
 * - 0x00000200　全角空白を数えない
 * 
 *  [半角空白の数え方のビットフラグ]
 * - 0x00000000　半角空白を1文字として数える
 * - 0x00001000　半角空白を2文字として数える
 * - 0x00002000　半角空白を数えない
 * - 0x00003000　半角空白を0.5文字として数える
 * 
 *  [タブ空白の数え方のビットフラグ]
 * - 0x00000000　タブを1文字として数える
 * - 0x00010000　タブを2文字として数える
 * - 0x00020000　タブを数えない
 * - 0x00030000　タブを0.5文字として数える（V8.40以降）
 * 
 *  [改行の数え方のビットフラグ]
 * - 0x00000000　改行を1文字として数える
 * - 0x00100000　改行を2文字として数える
 * - 0x00200000　改行を数えない
 *
 * @param text    
 * 文字列を指定すると、指定した文字列を対象とします。    
 * 
 * 省略して指定しない場合、現在のテキストや範囲選択を対象とします。    
 * count_type によって、テキスト全体なのか、選択範囲なのかを選択します。
 * 
 * @example
 * var ct_flag = 0;
 * ct_flag = ct_flag | 0x80000000;　範囲選択の部分を計算対象とする
 * 
 * var cnt = charcount(ct_flag);
 * 
 * @example
 * var c = charcount( 0x00000088 );
 * message(str(c));
 * 
 * @comment
 * 参照：
 * @see showcharcount
 * @see getresultex(23)
 * 
 * @returns
 * 数えられる上限は2147483647(16進数にして0x7fffffff)までで、    
 * 超えた場合は0を返します。    
 * 超えたかどうかはgetresultex(23)で判断できます。    
 * 
 * 0.5文字分を含み、結果が小数点以下になる場合は切り上げられます。
 */
declare function charcount(count_type: number, text?: string): number

/**
 * f
 * 
 * enumcolormarkerlayer関数は、    
 * 現在使われているカラーマーカーの名前付きのレイヤーを列挙します。
 * 
 * 文字列が空（""）になるまでcolormarkerlayer_ixの値を１つずつ増やして呼び出すと、    
 * すべてのレイヤー名を取得できます。    
 * 取得される順番は、レイヤーの重なり合わせがある場合の一番下から取得されます。
 * 
 * @param colormarkerlayer_ix 
 * 0から始まる数値を指定します。    
 * 名前を取得したいカラーマーカーのindexを指定します。
 * 
 * @example
 * var markerarr = [];
 * for(var i=0; true; i++) {
 *     var ret = enumcolormarkerlayer(i);
 *	   if(ret == "") { break; }
 *         markerarr[i] = ret;
 *     }
 * }
 * @return
 * レイヤー名が返ります。    
 * 空の文字列が返ると、これ以上の名前付きレイヤーは無いことを意味します。
 */
declare function enumcolormarkerlayer(colormarkerlayer_ix: number): string

/**
 * f
 * 
 * fullpathのファイルが存在するかどうかを返します。    
 * また、target_attrに数値を指定することで、ファイルの様々な情報を取得することが出来ます。
 * 
 * @param fullpath 
 * ファイルのフルパスを指定する。    
 * 
 * @example
 * var is_exist = existfile( "c:\\folder\\file.txt" );
 * 
 * ファイルにはワイルドカードを指定することもできます。    
 * @example
 * var is_exist = existfile( "c:\folder\*.*" );
 * 
 * @param target_attr 
 * 省略するか0の場合は、ファイルが存在するかどうかを取得します。    
 * 
 * 1を指定する場合は、ファイルの属性を取得します。    
 * @example
 * var cfile = "c:\\folder";
 * if( (existfile( cfile, 1 ) & 0x00000010) != 0 ) {
 *     message("ディレクトリ");
 * }
 * 
 * 2を指定する場合は、ファイルサイズを取得します。    
 * @example
 * var file = "c:\\folder\\test.txt";
 * var nbyte = existfile( file, 2 );
 * message(nbyte + "バイト");
 * 
 * @returns
 * - target_attrを省略、もしくは0なら    
 * 指定のfullpathのファイルが存在する場合は0以外を返す。    
 * 存在しない場合は0を返す。    
 * 
 * - target_attrが1の場合、ファイルの属性として以下の値をOR演算した組み合わせを返す。    
 *   - 0x00000001　読み取り専用
 *   - 0x00000002　隠しファイル
 *   - 0x00000004　システムファイル
 *   - 0x00000010　ディレクトリ(フォルダ)
 *   - 0x00000020　アーカイブ
 * 
 * -target_attrが2の場合    
 * ファイルのサイズを返す。 サイズはバイト数です。   
 */
declare function existfile(fullpath: string, target_attr?: number): number

/**
 * f
 * 
 * getfiletime関数は、ファイルの更新日時などの情報を取得します。    
 * 
 * @param fullpath 
 * ファイルのフルパスを指定する。    
 * 
 * @param filetime_attr 
 * - 省略するか0の場合は、更新日時を取得します。    
 * - 1の場合は、作成日時を取得します。    
 * - 2の場合は、アクセス日時を取得します。    
 * 
 * @param format 
 * 取得した結果を文字列で表すための書式を指定します。    
 * 省略した場合は、"YYYY-MM-DD hh:mm:ss"という書式になります。    
 * 
 * ---    
 * 書式は以下のようになります。
 *   - YYYY    
 *     年（西暦）を４桁で返す    
 *   - YY    
 *     年（西暦）を２桁で返す（例：2001年なら01） 
 *   - 平成Y    
 *     年を和暦で返す 
 *   - M    
 *     月 
 *   - D    
 *     日 
 *   - W    
 *     何曜日か（月、火、…） 
 *   - EM    
 *     月を英語３文字で（Jan、Feb、Mar、…） 
 *   - EW    
 *     何曜日かを英語３文字で（Sun、Mon、Tue、…） 
 *   - h    
 *     時 
 *   - m    
 *     分 
 *   - s    
 *     秒 
 *   - i    
 *     午前か午後かを、「AM」または「PM」のような形式で 
 *   - j    
 *     午前か午後かを、「午前」または「午後」のような形式で 
 *   - k    
 *     時を12時間単位で（例えば午後２時なら14ではなく、2を返す） 
 * 
 * M、D、h、m、s、kについて    
 * 例えば「MM」と指定すると、例えば1月の場合に「01」を返すようになります。    
 * 「 M」のように半角空白と組み合わせて指定すると、    
 * 値が２桁になった時にその空白部分に数字を埋めるようになります。    
 * 
 * 例えば、「YY/ M/ D」と指定すると、    
 * ２０００年１月１日の場合に「00/ 1/ 1」と返り、    
 * １２月３１日の場合には「00/12/31」となります。
 * 
 * 「平成Y」について、文字列の途中に"平成"という文字列があると、    
 * それを見つけた所以降から、「Y」または「YY」は和暦の値を返す動作になります。    
 * なので、例えば「YYYY平成YY」と書くと、    
 * 最初の４桁のYYYY部分は西暦になって、後のYYは和暦になります。    
 * 
 * 現在の日付がもしかして平成じゃなくて昭和になってる場合は、   
 * "平成"と書いた部分が自動的に"昭和"になって返ってきます。
 * 
 * @example
 * var s = getfiletime( "c:\\folder\\test.txt", 0, "YYYYMMDD" );
 * message(s);
 * 
 * @returns
 * 文字列として日時の情報を返します。
 */
declare function getfiletime(fullpath: string, filetime_attr?: number, format?: string): string

/**
 * f
 * 
 * getmaxinfo関数は、各種上限の情報の取得をします。
 * 
 * @param editor_attr 
 * 
 * 取得する情報の種類を指定します。    
 * 以下の種類があります。    
 * - 0 編集可能な最大行数
 * - 1 マクロの変数の上限(MB)
 * - 2 マクロの静的変数の上限(KB)
 * - 3 やり直しバッファサイズ(Byte)
 * - 4 クリップボード履歴のバッファサイズ(KB)
 * - 5 クリップボード履歴の個数
 * - 6 検索文字列の上限(Unicode(UCS-2単位)文字数,終端NUL含む)、検索／置換文字列の上限について
 * - 7 置換文字列の上限(Unicode(UCS-2単位)文字数,終端NUL含む)
 * - 8 setregularcacheでキャッシュできる上限    
 * 
 * @returns
 * editor_attrによって指定された種類の値が返ります。
 */
declare function getmaxinfo(editor_attr: number): number

/**
 * f
 * 
 * getoutlineitem関数は、    
 * アウトライン解析の枠の１つの項目の情報を取得します。
 * 
 * @param outline_ix    
 * 項目のインデックス（0から数えた項目の番号）を指定します。
 * 
 * @param outline_attr 
 * 取得する種類を指定します。
 * - 0を指定すると、項目のテキストを文字列で返します。    
 * - 1を指定すると、項目に対応する本文の行番号を文字列で返します。    
 * - 2を指定すると、ツリー表示の場合、階層構造のレベルを文字列で返します。
 * 
 * @comment
 * 参照：    
 * @see アウトライン系文
 * 参照：    
 * @see アウトライン関連キーワード
 * 
 * @returns
 * outline_ixで指定した項目の、情報を文字列で返します。
 */
declare function getoutlineitem(outline_ix: number, outline_attr: number): string

/**
 * f
 * 
 * getarg関数は、起動オプション/aやexecmacroで渡された引数の内容を取得します。    
 * 
 * @param arg_ix 
 * 0から始まる何番目の引数かを指定します。
 *
 * @comment
 * 起動オプションで渡す場合は、/aオプションで以下のように記述します。    
 * でくくると空白を含んだ文字列を渡すことができます。    
 * ダブルクォーテーションそのものを記述するには２つ並べて「""」と書きます。    
 * （「"abc"」を指定する場合は「/a"""abc"""」）    
 * 
 * @example
 * hidemaru.exe /xtest.mac /aparam1 /a"param 2"    
 * 
 * @comment
 * execmacroで渡す場合は、秀丸マクロのファイル名の後に、以下のように記述します。    
 * (JavaScriptではなく秀丸マクロ)
 * 
 * @example
 * execmacro "test.mac", "param1", "param 2";
 * 
 * @comment
 * test.mac中で、以下のようにして取得します。 
 * 
 * @example
 * var a = getarg(0); //１番目の引数
 * var b = getarg(1); //２番目の引数
 * 
 * var ret = [];
 * for(var ix=0; ix<argcount(); i++) {
 *     ret[i] = getarg(i);
 * }
 *
 * @comment
 * execmacroで呼んだマクロの中でさらにexecmacroする場合、getargは元の状態を覚えていません。    
 * openfileで秀丸エディタが新しく起動する場合は、    
 * hidemaru.exeを起動したのと同じ扱いで、getargは元の状態を覚えていません。    
 * 
 * execmacroを呼ぶ前に、一度別の変数に退避しておく必要があります。    
 * /a や execmacroで渡す引数の上限は31個です。
 * 
 * @comment
 * 参照：
 * @see execmacro 文    
 * @see argcount キーワード    
 * 
 * @returns
 * 引数の内容が返ります。
 */
declare function getarg(arg_ix: number): string

/**
 * f
 * 
 * getautocompitem関数は、単語補完の候補の文字列を取得します。
 *
 * @param item_ix
 * 単語補完の候補を0から数えた番号を指定します。
 *
 * @example
 * message(getautocompitem(0));
 * 
 * @returns
 * item_ixの番号に対応する候補の文字列を返します。    
 * 候補が無い場合は""を返します。
 */
declare function getautocompitem(item_ix: number): string

/**
 * f
 * 
 * getfilehist関数は、ファイルヒストリの文字列を取得します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。
 * 
 * @example
 * var i=0;
 * while(i < filehistcount() ) {
 *     var a = getfilehist(i);
 *     insert(a+"\n");
 *     i++;
 * }
 * 
 * @returns
 * 指定に対応する文字列を返す。
 */
declare function getfilehist(history_ix: number): string

/**
 * f
 * 
 * getfilehist関数は、指定のファイルヒストリに    
 * 常駐（ピン留め）しているかどうかを取得できます。
 * 
 * @param history_ix 
 * 0から始まるヒストリの番号を指定します。    
 * 
 * @param is_pin 
 * 1を指定すると、ヒストリに常駐（ピン留め）しているかどうかを取得できます。    
 * 文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。

 * @example
 * var i=0;
 * while(i < filehistcount() ) {
 *     var a = getfilehist(i);
 *     var b = getfilehist(i, 1);
 *     insert(a+"\n");
 *     insert(b+"\n\n");
 *     i++;
 * }
 * 
 * @returns
 * ヒストリに常駐（ピン留め）していれば、文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。
 */
declare function getfilehist(history_ix: number, is_pin: 1 | number): "0" | "1"

/**
 * f
 * 
 * getpathhist関数は、フォルダヒストリの文字列を取得します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。    
 * フォルダヒストリの数は9個で固定です。    
 * history_ixの指定は0～8までになります。
 * 
 * @example
 * var i=0;
 * while(i <= 8 ) {
 *     var a = getpathhist(i);
 *     insert(a+"\n");
 *     i++;
 * }
 * 
 * @returns
 * 指定に対応する文字列を返す。
 */
declare function getpathhist(history_ix: number): string

/**
 * f
 * 
 * getreplacehist関数は、置換ヒストリの文字列を取得します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。    
 * 置換ヒストリの最大は20個（0～19まで）です。
 * 
 * -1 を指定すると、ヒストリを使用している数を文字列にして返します。
 * 
 * @example
 * var c = +( getreplacehist(-1) ); // + を付けて、文字列を数値に
 * var i = 0;
 * while(i <= c ) {
 *     var a = getreplacehist(i);
 *     insert(a+"\n");
 *     i++;
 * }
 * 
 * @comment
 * 参照：    
 * @see setreplacehist
 * 
 * @returns
 * 指定に対応する文字列を返す。    
 * history_ix に -1 を指定した場合、ヒストリを使用している数を文字列で返す。
 */
declare function getreplacehist(history_ix: number | -1): string

/**
 * f
 * 
 * getreplacehist関数は、置換ヒストリに    
 * 常駐（ピン留め）しているかどうかを取得できます。
 * 
 * @param history_ix 
 * 0から始まるヒストリの番号を指定します。    
 * 
 * @param is_pin 
 * 1を指定すると、ヒストリに常駐（ピン留め）しているかどうかを取得できます。    
 * 文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。

 * @example
 * var c = +( getreplacehist(-1) );
 * var i = 0;
 * while(i < c ) {
 *     var a = getreplacehist(i);
 *     var b = getreplacehist(i, 1);
 *     insert(a+"\n");
 *     insert(b+"\n\n");
 *     i++;
 * }
 * 
 * @comment
 * 参照：    
 * @see setreplacehist
 * 
 * @returns
 * ヒストリに常駐（ピン留め）していれば、文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。
 */
declare function getreplacehist(history_ix: number, is_pin: 1 | number): "0" | "1"

/**
 * f
 * 
 * getsearchhist関数は、検索ヒストリの文字列を取得します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。    
 * 検索ヒストリの最大は100個（0～99まで）です。
 * 
 * -1 を指定すると、ヒストリを使用している数を文字列にして返します。
 * 
 * @example
 * var c = +( getsearchhist(-1) ); // + を付けて、文字列を数値に
 * var i = 0;
 * while(i <= c ) {
 *     var a = getsearchhist(i);
 *     insert(a+"\n");
 *     i++;
 * }
 * 
 * @comment
 * 参照：    
 * @see setsearchhist
 * 
 * @returns
 * 指定に対応する文字列を返す。    
 * history_ix に -1 を指定した場合、ヒストリを使用している数を文字列で返す。
 */
declare function getsearchhist(history_ix: number | -1): string

/**
 * f
 * 
 * getsearchhist関数は、検索ヒストリに    
 * 常駐（ピン留め）しているかどうかを取得できます。
 * 
 * @param history_ix 
 * 0から始まるヒストリの番号を指定します。    
 * 
 * @param is_pin 
 * 1を指定すると、ヒストリに常駐（ピン留め）しているかどうかを取得できます。    
 * 文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。
 * 
 * @example
 * var c = +( getsearchhist(-1) );
 * var i = 0;
 * while(i < c ) {
 *     var a = getsearchhist(i);
 *     var b = getsearchhist(i, 1);
 *     insert(a+"\n");
 *     insert(b+"\n\n");
 *     i++;
 * }
 * 
 * @comment
 * 参照：    
 * @see setsearchhist
 * 
 * @returns
 * ヒストリに常駐（ピン留め）していれば、文字列で "0"か"1"が返ります。    
 * 文字列なので注意してください。
 */
declare function getsearchhist(history_ix: number, is_pin: 1 | number): "0" | "1"

/**
 * s
 * 
 * setfilehist文は、ファイルヒストリを設定します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * -1を指定すると最初に挿入します。    
 * -2を指定すると最後に追加します。    
 * 
 * @param fullpath
 * ヒストリの内容（フルパスのファイル名）を指定します。    
 * 
 * @example
 * setfilehist(0, "c:\\folder\\file.txt");
 * 
 * @comment
 * 参照：
 * @see deletefilehist
 * @see getfilehist
 * @see filehistcount
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setfilehist(history_ix: number, fullpath: string): number

/**
 * s
 * 
 * setfilehist文は、ファイルヒストリを設定します。    
 * その際に、行番号(pos_lineno)と桁位置(pos_column)は、    
 * ファイルタイプ別の設定の「カーソル位置の自動復元」で使われます。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * -1を指定すると最初に挿入します。    
 * -2を指定すると最後に追加します。    
 * 
 * @param fullpath
 * ヒストリの内容（フルパスのファイル名）を指定します。    
 * 
 * @param is_pin
 * 0を指定します。    
 * 
 * @param pos_lineno
 * 行番号を指定します。    
 * 
 * @param pos_column
 * 桁位置を指定します。    
 * 
 * @example
 * setfilehist(0, "c:\\folder\\file.txt", 0, lineno, column);
 * 
 * @comment
 * 参照：    
 * @see deletefilehist
 * @see getfilehist
 * @see filehistcount
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setfilehist(history_ix: number, fullpath: string, is_pin: 0, pos_lineno: number, pos_column: number): number

/**
 * s
 * 
 * setfilehist文は、ファイルヒストリを設定します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * -1を指定すると最初に挿入します。    
 * -2を指定すると最後に追加します。    
 * 
 * @param pin_status
 * 第３パラメータis_pinによって常駐の指定となっている場合、    
 * "0" を指定するとヒストリに常駐OFF、"1" を指定するとヒストリに常駐ONになります。
 * 
 * @param is_pin
 * 1を指定します。    
 * 
 * @example
 * setfilehist(3, "1", 1);
 * 
 * @comment
 * 参照：    
 * @see deletefilehist
 * @see getfilehist
 * @see filehistcount
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setfilehist(history_ix: number | -1 | -2, pin_status: "0" | "1", is_pin: 1): number

/**
 * s
 * 
 * setpathhist文は、フォルダのヒストリを設定します。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * フォルダヒストリの数は9個で固定です。    
 * 番号の指定は0～8までになります。
 * 
 * @param fullpath
 * ヒストリの内容（フォルダのパス）を指定します。    
 * 文字列を""にすると、ヒストリを削除します。
 * 
 * @comment
 * 参照：    
 * @see getpathhist
 * 
 * @returns
 * 設定に成功した場合は、０以外
 * 失敗した場合は、０
 */
declare function setpathhist(history_ix: number, fullpath: string): number

/**
 * s
 * 
 * deletefilehist文は、ファイルヒストリを削除します。    
 * 0以上の値を指定する場合は、0から数えたヒストリの番号で、    
 * １つの項目を削除します。
 * 
 * 削除された項目以降は１つ番号が上がります。
 * 
 * 
 * @param history_ix    
 *  0以上の場合、0から数えたヒストリの番号を指定します。    
 *  -1を指定すると、ヒストリに常駐している項目以外をすべて削除します。    
 *  -2を指定すると、ヒストリに常駐している項目も含めてすべて削除します。    
 * 
 * @example
 * deletefilehist(0);
 * 
 * @comment
 * 参照：    
 * @see setfilehist
 * @see getfilehist
 * @see filehistcount
 * 
 * @returns
 * 設定に成功した場合は、０以外
 * 失敗した場合は、０
 */
declare function deletefilehist(history_ix: number | -1 | -2): number

/**
 * s
 * 
 * getcliphistは、クリップボード履歴からの取り出しを行います。
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。    
 * 0 が最新の履歴、1 が１つ前、2 が２つ前という具合です。
 * 
 * パラメータが無い場合は、全ての履歴を消去します。    
 * パラメータに0から数えた数値を指定することで、指定した履歴を消すことができます。    
 * 
 * @comment
 * 参照：    
 * @see クリップボードと変数とのやりとり
 * 
 * @returns
 * 取り出しに成功すると、0以外を返す。    
 * 存在しない番号を指定したり、常駐秀丸エディタがいないなどの場合は0を返す。
 */
declare function getcliphist(history_ix?: number): number


/**
 * 
 * 
 * @param result_id 
 *
 * - 0：resultと同じ
 *
 * - 1：openfile/saveasで、何かエラーがあるか    
 *  （getresultex(2～6)のいずれかが0以外）
 * 
 * - 2：openfile/saveasで、変換できない文字のエラーかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 3：openfileで、NULL文字のエラーかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 4：openfileで、複数のエンコードの種類に一致しているかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 5：openfileで、他のプロセスで開かれている等ののエラーかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 6：openfileで、改行コード混在のエラーかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 7：tagjump/directtagjumpでジャンプした行番号
 * 
 * - 8：directtagjumpでファイルが存在しない    
 * 　(0以外=失敗／0=成功)
 * 
 * - 9：runsync（またはrunexで同期）実行して成功したときの終了ステータス    
 *  (GetExitCodeProcess相当、259は同期しなかった)
 * 
 * - 10：COM関係の文/関数が成功したかどうか    
 * （成功=1,失敗=0）
 * 
 * - 11：COM関係の文/関数の最後のHRESULT値
 * 
 * - 12：grep実行後、検索したファイルの数
 * 
 * - 13：loadhilight文で個数が多すぎて全て読み込めなかったかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 14：replaceall文でlinknext付きで実行したとき、    
 * 他の秀丸エディタも含めた置換の総数
 * 
 * - 15：replacedown, replaceup等でask付きで実行したとき、    
 * 直前の確認ダイアログがどのようにして閉じられたかの情報
 * 
 *   - 0x0000　直前に確認ダイアログの操作でない
 *   - 0x0100　キャンセル
 *   - 0x0200　下方向の一気・ヒット
 *   - 0x0201　下方向の一気・ヒットなし
 *   - 0x0210　上方向の一気・ヒット
 *   - 0x0211　下方向の一気・ヒットなし
 *   - 0x0300　下方向の置換・ヒット
 *   - 0x0301　下方向の置換・ヒットなし
 *   - 0x0310　上方向の置換・ヒット
 *   - 0x0311　下方向の置換・ヒットなし
 *   - 0x0401　上方向の検索(上候補)・ヒットなし
 *   - 0x0411　下方向の検索(上候補)・ヒットなし
 * 
 * - 16：spellcheckdialogのダイアログの操作結果。
 * 
 * - 17：call/gotoで、ラベルが見つからなかったのときエラーかどうか    
 * 　(0以外=失敗／0=成功)    
 *  （seterrormode 5,0;としてエラーが表示されないようになっている必要があります）
 * 
 * - 18：最後に行ったfilter文/filter関数で、    
 * 変換モジュールの読み込みに失敗した場合に1
 * 
 * - 19：最後に行ったfilter文/filter関数で、    
 * 関数が見つからない場合に1
 * 
 * - 20：openfileで、ファイルが見つからない    
 * 　(0以外=失敗／0=成功)
 * 
 * - 21：openfileで、ファイル検索パスの問い合わせで    
 * 「はい」で開いたとき1、「いいえ」で続行したとき2
 * 
 * - 22：openfileで、ファイルが見つからないときの新規作成の問い合わせ（seterrormode 0x00100000;）で    
 * 「はい」で開いたとき1、「いいえ」で続行したとき2
 * 
 * - 23：charcountで、数えられる上限を超えたかどうか    
 * 　(0以外=失敗／0=成功)
 * 
 * - 25：newfile等で新しく秀丸エディタが起動するとき、    
 * 起動数の上限によってエラーになったかどうか　(0以外=失敗／0=成功)
 * 
 * @example
 * tagjump();
 * if(result()){
 *     var n = getresultex(7); // tagjump/directtagjumpでジャンプした行番号
 *     message(n);
 * }
 * 
 * @returns
 * 指定の対象に対応する数値を返す
 */
declare function getresultex(result_id: number): number

/**
 * f    
 * 
 * getresultex関数は、詳細なエラー情報などの取得をします。
 * 
 * @param result_id 
 * -1 を指定します。
 * -1は 直近の execmacroで呼ばれたマクロで    
 * endmacroにパラメータを指定したときの文字列値を返すためのパラメータです。
 * 
 * @example
 * execmacro "testsub.mac"; // execmacro はJavaScriptからは使えない。秀丸マクロ特有の仕様。
 * jsmode;
 * js {
 *     var result_str = getresultex(-1); // 最後のexecmacroのなかで、endmacro に渡したパラメータ。
 *     messge(result_str);
 * }
 * 
 * @returns
 * 直近の execmacroで呼ばれたマクロで    
 * endmacroにパラメータを指定したときの文字列値を返す。
 */
declare function getresultex(result_id: -1): string

/**
 * f    
 * 
 * gettagsfile関数は、tagsファイルのファイル名をフルパスで取得します。
 * 
 * 動作環境で上の階層もチェックするようになっている場合は、    
 * 上の階層をチェックして存在するファイルのフルパスを返します。    
 * 
 * ファイルが存在しない場合は、空の文字列（""）を返します。    
 * 
 * @param tagfile_ix 
 * tagsファイルが複数指定されている場合、0から始まる番号を指定します。
 * 
 * @example
 * var tagfile = gettagsfile(0);
 * message(tagfile);
 * 
 * @returns
 * 指定のtagfile_ixに対応するtagsファイルのファイル名をフルパスで返す。    
 * ファイルが存在しない場合は、空の文字列（""）を返す。
 */
declare function gettagsfile(tagfile_ix: number): string

/**
 * f
 * 
 * gettitle関数は、キャプションや見出しバーなどの内容を取得します。    
 * 
 * @param target_id 
 * どのような情報を取得するかを指定します。    
 * - 0 キャプション（タイトルバー）    
 * - 1 ステータスバー    
 * - 2 見出しバー    
 * - 3 タブモードのタブ名    
 * - 4 アウトライン解析の枠の対応する見出し名    
 * 
 * @param hidemaru_handle 
 * 引数にhidemaruhandle相当の値を渡すことで、    
 * 他の秀丸エディタからも値を得ることが出来ます。    
 * 指定しない場合は、現在の秀丸エディタの情報を取得します。    
 * 
 * @example
 * var a = gettitle(0); // キャプション（タイトルバー）の文字列を取得する
 * 
 * @returns
 * target_idで指定の場所の文字列が返ります。
 */
declare function gettitle(target_id: number, hidemaru_handle?: number): string

/**
 * f
 * 
 * browsefile関数は、ファイルの参照ダイアログを出し、    
 * 選ばれたファイル名を返します。
 * 
 * 
 * @param target_directory 
 * 初期フォルダのパスを指定します。    
 * ""を指定すると現在のフォルダになります。
 * 
 * @param filename_wildcard 
 * ファイル一覧に出すワイルドカードを指定します。    
 * 
 * @example
 * var my_selected_file = browsefile(macrodir(), "*.mac");
 * if ( my_selected_file != "" ) {
 *     message( my_selected_file );
 * }
 * 
 * @returns
 * 選ばれたファイルのフルパスが返ります。    
 * キャンセルされた場合は""が返ります。
 */
declare function browsefile(target_directory: string, filename_wildcard?: string): string

/**
 * f
 * 
 * quote関数は、正規表現のメタ文字をエスケープした文字列を返します。    
 * 
 * 文字列の中に以下の文字が含まれると、    
 * 該当する文字の直前に「\」を付加した文字列を返します。
 * 
 * [ ] ( ) ^ $ . * + ? | \ { }    
 * 
 * 正規表現の検索で、文字列そのままを検索可能な文字に変換されます。
 * 
 * @param text 
 * 変換元の文字列を指定します。
 * 
 * @example
 * // quoteが無いと...
 * var tfind = "xxx(1).zzz";
 * searchdown(tfind, 0x00000010); // searchoption や serachoption2の引数と同じ。0x00000010 = 正規表現
 * // 対象テキスト
 * // xxx1Azzz    ← ヒット
 * // xxx1Bzzz    ← ヒット
 * // xxx(1).zzz  ← ヒットしない
 * 
 * @example
 * // quoteが有ると...
 * var tfind = quote("xxx(1).zzz");
 * searchdown(tfind, 0x00000010); // searchoption や serachoption2の引数と同じ。0x00000010 = 正規表現
 * // 対象テキスト
 * // xxx1Azzz    ← ヒットしない
 * // xxx1Bzzz    ← ヒットしない
 * // xxx(1).zzz  ← ヒットする
 * 
 * @returns 
 * 変換された文字列が返ります。
 */
declare function quote(text: string): string

/**
 * f
 * 
 * strreplace関数は、text の中の search_text を全て replace_textに置き換えします。   
 * すべて置換した文字列を返します。    
 * 
 * @param text 
 * 元の文字列全体を指定します。
 * 
 * @param search_text 
 * 検索する文字列を指定します。
 * 
 * @param replace_text 
 * 置換する文字列を指定します。
 * 
 * @example
 * var src = "abcabc";
 * var result_text = strreplace( $src, "a", "x" );
 * message(result_text); //"xbcxbc";
 * 
 * @return
 * 置換後の文字列を返します。    
 * 見つからなかった場合は、textをそのまま返します。    
 * 
 */
declare function strreplace(text: string, search_text: string, replace_text): string

/**
 * s
 * 
 * newfile文は、新しい秀丸エディタを起動します。    
 * 
 * 新規作成コマンドと同様に、新しい秀丸エディタを起動します。
 * マクロの実行は、新しい秀丸エディタに切り替わります。
 * 
 * @deprecated    
 * newfileは新しいプロセスを作成してしまうため、JavaScriptから利用するべきではありません。    
 * JavaScriptからどうしても利用する場合には、hidemacJS.dllとjsmodeとプロセスに関わる特性を、    
 * よく理解する必要があります。
 * 
 * js{...}の実行中は、他の秀丸エディタへの切り替えは一切できません。    
 * 新しい秀丸エディタが起動することが起きても、マクロの実行は元の秀丸エディタのままです。    
 * 他の秀丸エディタに切り替える場合は、js{}の外で従来通りのマクロで行ってください。jsmodeの指定も改めて行う必要があります。
 * 
 * @example
 * // プロセスA の秀丸エディタ
 * jsmode;
 * js{
 *     message("a");
 * }
 * 
 * // JavaScriptではなく秀丸マクロから使う
 * newfile;
 * // ここで新しいプロセスBの秀丸エディタへと移動してしまう。
 * // 秀丸マクロとは異なり、jsmode は「プロセス単位」で独立している。
 * // このため新たなプロセスBでは、改めてjsmodeの宣言が必要。
 * // 秀丸マクロは「プロセスを跨げる」が、jsmode空間は「プロセスを跨げない」ことに注意すること。
 * // プロセスB の秀丸エディタ
 * jsmode;
 * js{
 *     message("b");
 * }
 * endmacro;
 * 
 * @comment
 * 参照：
 * @see 秀丸エディタ管理
 * 
 * @returns
 * 成功したらresultは0以外を返す。    
 * 失敗したらresultは0を返す。
 */
declare function newfile(): number

/**
 * s    
 * 
 * openfile文は、ファイルを開きます。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * パラメータでファイル名を指定します。    
 * ファイル名がワイルドカードでない場合は、ダイアログボックスは出ません。
 *
 * 新規作成状態では、現在の秀丸エディタに開きます。    
 * 更新時や既にファイルを開いてる場合は、    
 * 新しい秀丸エディタが起動して、そこに開きます。    
 * マクロの実行は、新しい秀丸エディタに切り替わります。    
 * 
 * @comment
 * 参照：
 * @see 秀丸エディタ管理
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * 26のバイナリモードはエンコードの種類の１つとして扱われます。    
 * noaddhistの0x0100を付けるとヒストリに追加せずにファイルを開くことができます。    
 * Hidemarnet ExplorerでWebページを開く場合、wbの0x800またはwsの0x1000をパラメータに書くことができます。    
 * エラーメッセージや問い合わせを出すかどうかの詳細指定は @see seterrormode で指定可能です。
 * 詳しいエラーの状態はgetresultexで取得可能です。
 * 
 * @example
 * openfile("c:\\folder\\file.txt");
 * 
 * @example
 * openfile("file.txt"); // 秀丸のカレントフォルダ次第。
 * 
 * @example
 * openfile("c:\\folder\\file.txt", 28|0x0600); // Unicode(UTF-32, Big-Endian) で、BOM付き
 * 
 * @example
 * var utf8 = 0x06;
 * var noaddhist = 0x0100;
 * openfile( "c:\\folder\\test.txt", utf8|noaddhist );
 * 
 * @see getresultex
 * @see browsefile    
 * browsefile関数を使うと、ファイルを開いたり保存したりはせず、ファイルの参照ダイアログだけを出すことができます。
 * 
 * @comment
 * openfile文でワイルドカードの指定
 * 
 * @example
 * openfile("*.txt"); // 「ファイルを開く」のダイアログボックスを表示します。
 *
 * openfile("C:\\folder\\*.txt"); ディレクトリ付きのフルパスで指定すると、カレントディレクトリの指定を含む形でダイアログボックスを表示します。
 * 
 * @comment
 * 参照：
 * @see hidemaru.exeを起動するオプション
 * 
 * @comment
 * openfile文で起動オプションの指定    
 * openfileのパラメータには、hidemaru.exeを起動するオプション がそのまま指定できます。    
 * openfileのパラメータには、hidemaru.exeを起動するオプション がそのまま指定できます。    
 * openfile("/r " + filename());　とすると、readonlyopenfile()と同じになります。    
 * openfile("")　とすると、newfileと同じになります。    
 * openfile("/(0,0,100,100)") とすると、0,0～100,100のサイズの秀丸エディタが起動されます。    
 * "/f数字" オプションを指定することで、エンコードの種類を数値で指定できます。    
 * たとえばキリル言語の場合は、openfile("/f16 " + filename());と指定します。数字は、encodeキーワード(charsetキーワード)の値と同じです。    
 * openfile("/h " + filename());　とすると、秀丸エディタがステルスモードになり、画面から見えなくなり、マクロの実行が高速になる場合があります。    
 * openfile("/h") とファイル名を指定しなければ新規作成状態の見えない秀丸エディタが起動します。    
 * 画面の書き換えが無くなる分高速になりますが、Hidemaru.exeの起動や終了などが頻繁に行われることで逆効果となる場合もあるので、状況に応じて使い分けてください。    
 * 見えなくなった秀丸エディタはマクロの中で終わらせてあげてください。    
 * 終わらせないままマクロを終了すると自動的にステルス解除されます。    
 * openfile("/x") でマクロを実行しようとしてもエラーになるので注意してください。    
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 * ただし存在しないファイル名を指定して新規作成状態となる場合は、0以外になります。    
 * 詳しいエラーの状態はgetresultexで取得可能です。    
 */
declare function openfile(filepath: string, fileoption_flag?: number): number

/**
 * s    
 * 
 * loadfile文は、ファイルを閉じて開きます。
 * パラメータの指定はopenfileと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * loadfile("c:\\folder\\file.txt");
 * 
 * @see openfile
 * @see getresultex
 * 
 * @returns
 * 成功したらresultは0以外になります。    
 * 失敗したらresultは0になります。    
 * ただし存在しないファイル名を指定して新規作成状態となる場合は、0以外になります。    
 * 詳しいエラーの状態はgetresultexで取得可能です。    
 */
declare function loadfile(filepath: string, fileoption_flag?: number): number

/**
 * s
 * 
 * openfilepart文は、「ファイルの一部を開く...」コマンドに相当する開き方でファイルを開きます。    
 * 
 * @param filepath 
 * ファイル名を指定します。
 * 
 * @param seek_cursor 
 * 読込み位置を指定します。    
 * バイト数で指定します。
 * 
 * @param read_size 
 * サイズを指定します。
 * バイト数で指定します。
 * 
 * @param read_flag 
 * フラグは以下の意味の値をOR演算したものを指定します。
 * - 0x0010   読込み範囲を指定しない　
 * - 0x0020   行単位に境界を揃えない
 * - 0x0040   強調表示を無効にする
 * - 0x0080   折り返しを最大にする
 * - 0x0100   上書き禁止にする
 * 
 * @param n_encode 
 * エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 */
declare function openfilepart(filepath: string, seek_cur: number, read_size: number, read_flag: number, n_encode: number): number

/**
 * s
 * 
 * closenew 文は、ファイルを閉じる
 * 
 * @returns
 * 成功したらresultは0以外になります。    
 * 失敗したらresultは0になります。
 */
declare function closenew(): number

/**
 * s    
 * 
 * saveas文は、名前を付けて保存をします。
 * パラメータの指定はopenfileと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * saveas("c:\\folder\\file.txt", 6|0x0600|0x0100);
 * 
 * @see openfile
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function saveas(filepath: string, fileoption_flag?: number): number

/**
 * s    
 * 
 * appendsave文は、別ファイルへの追加保存をします。
 * パラメータの指定はsaveasと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * appendsave("c:\\folder\\file.txt", 6|0x0600|0x0100);
 * 
 * @see saveas
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function appendsave(filepath: string, fileoption_flag?: number): number

/**
 * s
 * 
 * changename文は、秀丸エディタ上で記憶しているファイル名の変更を行います。    
 * 
 * @param filename    
 * 名前変更後の新しいファイル名を指定します。
 * 
 * ""を指定すると、無題のファイルになります。
 * ファイル名を"nul"にすると、上書き保存してもどこにもファイルが生成されないようになります。    
 * 
 * これは秀丸エディタの機能というより、"nul"というファイル名がファイルシステム上の予約されたファイル名のため、    
 * 保存できないようになっているためです。    
 * 
 * これを利用して、新規作成状態では都合が悪いけど、ファイルがあたかもあるような一時的な状態で作業する状態にすることができます。    
 * 例えば、新規作成状態では行番号に編集された行の編集マークが付きませんが、付けることができるようになります。 
 * 
 * @example
 * 
 * insert("A\nB\nC\n");
 * disablehistory(0x0100);
 * changename("nul");
 * clearupdated;
 * insert("D(ここに行番号の編集マーク)\n");
 * 
 * @returns
 * 成功したらresultは0以外になります。    
 * 失敗したらresultは0になります。
 */
declare function changename(filename: "" | "nul" | string): number

/**
 * s    
 * 
 * insertfile文は、カーソル位置への読み込みをします。    
 * パラメータの指定はopenfileと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * insertfile("c:\\folder\\file.txt");
 * 
 * @see openfile
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function insertfile(filepath: string, fileoption_flag?: number): number


/**
 * s    
 * 
 * readonlyopenfile文は、書換え禁止の状態でファイルを開きます。    
 * （「開く...」コマンド相当の開き方）
 * 
 * パラメータの指定はopenfileと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * readonlyopenfile("c:\\folder\\file.txt");
 * 
 * @see openfile
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function readonlyopenfile(filepath: string, fileoption_flag?: number): number

/**
 * s    
 * 
 * readonlyloadfile文は、書換え禁止の状態でファイルを閉じて開きます。    
 * （「閉じて開く...」コマンド相当の開き方）
 * 
 * パラメータの指定はopenfileと同じです。
 * 
 * @param filepath 
 * ファイル名を指定します    
 * 
 * @param fileoption_flag 
 * パラメータ２以降で、エンコードの種類（文字コード）を指定することができます。
 * - 1 　Shift-JIS
 * - 2 　Unicode(UTF-16)
 * - 3 　EUC
 * - 4 　JIS
 * - 5 　UTF-7
 * - 6 　UTF-8
 * - 7 　Unicode (UTF-16,Big-Endian)
 * - 8 　欧文
 * - 9 　簡体字中国語
 * - 10　繁体字中国語
 * - 11　韓国語
 * - 12　韓国語(Johab)
 * - 13　中央ヨーロッパ言語
 * - 14　バルト語
 * - 15　ギリシャ語
 * - 16　キリル言語
 * - 17　シンボル
 * - 18　トルコ語
 * - 19　ヘブライ語
 * - 20　アラビア語
 * - 21　タイ語
 * - 22　ベトナム語
 * - 23　Macintosh
 * - 24　OEM/DOS
 * - 25　その他
 * - 26　バイナリモード
 * - 27　Unicode(UTF-32) 
 * - 28　Unicode(UTF-32,Big-Endian)
 * 
 * 以下の値をfileoption_flagにOR演算指定します。    
 * 複数指定できます。
 * - 0x40   lf
 * - 0x80   cr
 * - 0x0600 bom
 * - 0x0400 nobom
 * - 0x0100 noaddhist;
 * - 0x2000 selection;
 * - 0x0800 ws
 * - 0x1000 wb;
 * 
 * @example
 * readonlyloadfile("c:\\folder\\file.txt");
 * 
 * @see openfile
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function readonlyloadfile(filepath: string, fileoption_flag?: number): number

/**
 * s    
 * 
 * save文は、「上書き保存」を実行します。    
 * 
 * @example
 * save();
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function save(): number;

/**
 * s    
 * 
 * savelf文は、「上書き保存（改行=LF）」を実行します。    
 * 
 * @example
 * savelf();
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function savelf(): number;

/**
 * s    
 * 
 * saveall文は、「全保存」を実行します。    
 * 保存対象は現在秀丸エディタで開いている全てのファイルのうち    
 * 「更新されたファイル」のみとなります。
 * 
 * @example
 * saveall();
 * 
 * @params exclude_flag
 * 保存の対象から除外する動作を指定します。    
 * 以下の値をOR演算した値です。
 * - 0x01 無題ファイルを除外    
 * - 0x02 更新されていないファイルを除外
 * 省略すると0と同じです。
 * 
 * パラメータを付けて保存の対象から除外する動作を指定できます。    
 * 
 * @example
 * saveall( 0x01 | 0x02 );
 * 
 * @see saveupdatedall
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function saveall(exclude_flag?: number): number;

/**
 * s    
 * 
 * saveupdatedall文は、「全保存」を実行します。    
 * 保存対象は現在秀丸エディタで開いている全てのファイルのうち    
 * 「更新されたファイル」のみとなります。
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function saveupdatedall(): number;

/**
 * s    
 * 
 * テキストが選択されている時、あるいは、
 * ファイル名と思わしき場所、ホームページURL、メールアドレスで    
 * カラー表示されている場所にカーソルがあるとき、    
 * マウスの右ボタンクリックして「...を開く」をしたときと同じ動作をします。    
 * 
 * @example
 * var ret = openbyshell();
 * 
 * @param text
 * テキストを選択する替わりとして、textを具体的に指定するとで、    
 * 対象を指定することができます。
 * 
 * @example
 * var ret = openbyshell("C:/abc/a.html"); 
 * 
 * @returns
 * 選択テキストがなく(かつtextも指定されていなければ)、特になにもせず０を返す。
 * 選択テキスト(もしくはtext)があり、ファイルのオープンに成功したら、０以外を返す、    
 * 失敗したらエラーダイアログが出て、(マクロを中断しなければ）０を返す
 */
declare function openbyshell(text?: string): number;

/**
 * s    
 * 
 * openbyhidemaru文は、    
 * テキストが選択されている時、あるいは、
 * ファイル名と思わしき場所がカラー表示されている場所にカーソルがあるとき、    
 * 対象のテキストをファイルのパスとみなして、秀丸エディタで開きます。    
 * 
 * @returns
 * テキストを選択していなければ、特になにもせず１を返す。
 * 選択対象があり、ファイルのオープンに成功したら、０以外を返す、    
 * 失敗したらエラーダイアログが出て、(マクロを中断しなければ）０を返す
 */
declare function openbyhidemaru(): number;

/**
 * s    
 * 
 * setencode文は、エンコードの種類の変更または改行コードの変更をします。    
 * 
 * エンコードの種類が変更されると、    
 * エンコードの種類に適したフォントに自動的に切り替わります。    
 * これは古いWindowsではフォントごとにエンコードに対応する文字が揃っていないためで、    
 * [その他]→[ファイルタイプ別の設定]→[フォント]→[多言語]→[すべての言語で同じフォントを指定する]をONにして、    
 * 共通にしておくことをお勧めします。    
 * 
 * @param n_encode
 * encodeキーワードで示される値と同じ、    
 * エンコードの種類を表す値を指定します。    
 * 0を指定すると、「自動判定で読み込みしなおし」と同じになります。    
 * 省略すると0と同じです。
 * n_encodeでバイナリモードを表す26を指定すると、    
 * バイナリモードに変更することができます。
 * 
 * @param text_keep 
 * 0を指定すると、ファイルの読み込みし直しを行います。    
 * 1を指定すると、テキストの内容を維持したまま変換を行います。    
 * 省略すると0と同じです。
 * 
 * @param bom_type 
 * Unicodeの場合、BOMを付けるかどうかを指定します。    
 * 0 自動判断    
 * 1 強制的にBOMあり    
 * 2 強制的にBOMなし    
 * 省略した場合は0と同じです。
 * 
 * @example
 * setencode(2,1,1);
 * 
 * @returns
 * 成功したら０以外を返す、    
 * 失敗したら０を返す
 */
declare function setencode(n_encode?: number, text_keep?: number, bom_type?: number): number;

/**
 * s
 * 
 * stophistoryswitch分は、呼び出す度に、   
 * ヒストリの記録を中断 ⇔ ヒストリの記録を再開    
 * を切り替えます。
 * 
 * 現在どちら（中断中なのか記録中なのか）は、    
 * 状態を取得するにはstophistoryキーワードを使います。    
 * 
 * @example
 * // 現在、ヒストリの記録を中断しているなら
 * if (stophistory() == 1) {
 *     // ヒストリの記録を再開する
 *     stophistoryswitch();
 * }
 * if (stophistory() == 0) {
 *     message("ヒストリは記録中");
 * }
 * 
 * @returns
 * 切り替えに成功したら１を返す。    
 * 失敗したら０を返す。
 */
declare function stophistoryswitch(): number;

/**
 * openfileのダイアログボックス版。
 * 
 * @comment
 * 参照：
 * @see getresultex
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 * ただし存在しないファイル名を指定して新規作成状態となる場合は、0以外を返す。    
 * 
 * 詳しいエラーの状態はgetresultexで取得可能です。    
 */
declare function OPEN(): number;

/**
 * saveasのダイアログボックス版。
 * 
 * @comment
 * 参照：
 * @see getresultex

 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返すか、または、    
 * または、保存できずマクロが続行できない場合は、マクロは中断されます。    
 * 詳しいエラーの状態はgetresultexで取得可能です。
 */
declare function SAVEAS(): number;

/**
 * loadfileのダイアログボックス版。
 * 
 * @comment
 * 参照：
 * @see getresultex
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 * ただし存在しないファイル名を指定して新規作成状態となる場合は、0以外を返す。    
 * 
 * 詳しいエラーの状態はgetresultexで取得可能です。    
 */
declare function LOAD(): number;

/**
 * appendsaveのダイアログボックス版。
 * 
 * @comment
 * 参照：
 * @see getresultex
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返すか、または、    
 * または、保存できずマクロが続行できない場合は、マクロは中断されます。    
 * 詳しいエラーの状態はgetresultexで取得可能です。
 */
declare function APPENDSAVE(): number;

/**
 * changefileのダイアログボックス版。
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 */
declare function CHANGENAME(): number;

/**
 * insertfileのダイアログボックス版。
 * 
 * @comment
 * 参照：
 * @see getresultex
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 * ただし存在しないファイル名を指定して新規作成状態となる場合は、0以外を返す。    
 * 
 * 詳しいエラーの状態はgetresultexで取得可能です。    
 */
declare function INSERTFILE(): number;

/**
 * openfilepartのダイアログボックス版。
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 */
declare function OPENFILEPART(): number;

/**
 * compfileのダイアログボックス版。
 * 
 * COMPFILE文は、キー割り当てされた「他の秀丸エディタと内容比較...」と同じことをします。    
 * - 開いている秀丸エディタが１つの場合は何も起きません。    
 * - 開いている秀丸エディタが２つの場合は動作環境によって、すぐ比較されるか、比較先ダイアログが出るかが変わります。    
 * - 開いている秀丸エディタが３つ以上の場合は比較先ダイアログが出ます。    
 * 
 * @comment
 * 参照：    
 * @see compfile 文
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。    
 */
declare function COMPFILE(): number;

/**
 * deletefile文は、ファイルを削除します。    
 * 
 * @param filepath
 * 削除するファイルのファイル名を指定します。
 * 
 * @param move_to_recyeclebin
 * ごみ箱に入れるかどうかを指定します。    
 * - 1を指定すると、ごみ箱に入れます。    
 * この1を指定した場合に限り、filepathにはワイルドカードも指定できます。    
 * 
 * - 0を指定するか省略すると、ごみ箱に入れません。    
 * この0を指定するか省略した場合、    
 * 安全のため(＝誤ったワイルドカードによる削除で取り返しがつかなくなることを防止するため)    
 * ワイルドカードは指定できません。    
 *
 * var target_delete_filename = "C:\\test\\abcdefg.txt"
 * deletefile(deletefilename); // ゴミ箱に入らずそのまま削除
 *
 * @returns
 * 成功した場合は、resultは0以外を返す。
 * 失敗した場合は、resultは0を返す。
 */
declare function deletefile(filepath: string, move_to_recyeclebin?: number): number;

/**
 * s
 * 
 * 現在秀丸で編集中のファイルのプロパティダイアログを表示する。    
 * (無題)など、ダイアログを表示する対象がないなら何もしない。    
 * changename などでファイル名を偽装している場合は、偽装したファイル名に基づいてダイアログを出す。    
 * 
 * @see changename
 * 
 * @returns
 * (無題)など、ダイアログを表示する対象がないなら１を返す。
 * ダイアログを表示した際も１を返す。
 */
declare function propertydialog(): number;

/**
 * s
 * 
 * up文は、カーソル上コマンドと同等のカーソル移動を行います。
 * 
 * @example
 * up();
 *
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * up(100);
 * down(90);
 * 
 * @example
 * var ret = up(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function up(n_step?: number): number;

/**
 * s
 * 
 * down文は、カーソル下コマンドと同等のカーソル移動を行います。
 * 
 * @example
 * down();
 *
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * down(100);
 * up(90);
 * 
 * @example
 * var ret = down(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function down(n_step?: number): number;

/**
 * s
 * 
 * left文は、カーソル左コマンドと同等のカーソル移動を行います。
 * 
 * @example
 * left();
 *
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * left(100);
 * right(90);
 * 
 * @example
 * var ret = left(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 *
 * @comment
 * 範囲選択された状態でのleft;やright;は、複数行の選択かどうかなどによって動作が違います。   
 * 通常は、[その他]→[動作環境]→[編集]→[高度な編集2]の「左右キーは必ず範囲選択の先頭/末尾」がOFF相当の動作です。    
 * この動作の違いを無くすには、setcompatiblemodeで0x10000000を指定します。
 *
 * @example
 * setcompatiblemode(0x10000000);
 * beginsel();
 * down();
 * endsel();
 * right();
 * left();
 *  
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function left(n_step?: number): number;

/**
 * s
 * 
 * right文は、カーソル右コマンドと同等のカーソル移動を行います。
 * 
 * @example
 * right();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * right(100);
 * left(90);
 * 
 * @example
 * var ret = right(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 *
 * @comment
 * 範囲選択された状態でのleft;やright;は、複数行の選択かどうかなどによって動作が違います。   
 * 通常は、[その他]→[動作環境]→[編集]→[高度な編集2]の「左右キーは必ず範囲選択の先頭/末尾」がOFF相当の動作です。    
 * この動作の違いを無くすには、setcompatiblemodeで0x10000000を指定します。
 *
 * @example
 * setcompatiblemode(0x10000000);
 * beginsel();
 * down();
 * endsel();
 * right();
 * left();
 *  
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function right(n_step?: number): number;

/**
 * s
 * 
 * up_nowrap文は、upの折り返し無視版です。    
 * カーソル上コマンドと同等のカーソル移動を行います。    
 * その際、折り返しが無視されます。
 * 
 * @example
 * up_nowrap();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * up_nowrap(100);
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function up_nowrap(n_step?: number): number;

/**
 * s
 * 
 * down_nowrap文は、downの折り返し無視版です。    
 * カーソル下コマンドと同等のカーソル移動を行います。    
 * その際、折り返しが無視されます。
 * 
 * @example
 * down_nowrap();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * down_nowrap(100);
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function down_nowrap(n_step?: number): number;

/**
 * s
 * 
 * shiftup文は、Shiftキーを押しながら矢印上キーを押すことに相当する文です。    
 * カーソルの動きやパラメータなどはupと同じで、    
 * Shiftキーを押しながら操作することに相当するため、範囲選択が広がるなどの動作になります。
 * 
 * @example
 * shiftup();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * shiftup(100);
 * shiftdown(90);
 * 
 * @example
 * var ret = shiftup(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function shiftup(n_step?: number): number;

/**
 * s
 * 
 * shiftdown文は、Shiftキーを押しながら矢印下キーを押すことに相当する文です。    
 * カーソルの動きやパラメータなどはdownと同じで、    
 * Shiftキーを押しながら操作することに相当するため、範囲選択が広がるなどの動作になります。
 * 
 * @example
 * shiftdown();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * shiftdown(100);
 * shiftup(90);
 * 
 * @example
 * var ret = shiftdown(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function shiftdown(n_step?: number): number;

/**
 * s
 * 
 * shiftleft文は、Shiftキーを押しながら矢印左キーを押すことに相当する文です。    
 * カーソルの動きやパラメータなどはleftと同じで、    
 * Shiftキーを押しながら操作することに相当するため、範囲選択が広がるなどの動作になります。
 * 
 * @example
 * shiftleft();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * shiftleft(100);
 * shiftright(90);
 * 
 * @example
 * var ret = shiftleft(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 *
 * @comment
 * 範囲選択された状態でのshiftleft;やshiftright;は、複数行の選択かどうかなどによって動作が違います。   
 * 通常は、[その他]→[動作環境]→[編集]→[高度な編集2]の「左右キーは必ず範囲選択の先頭/末尾」がOFF相当の動作です。    
 * この動作の違いを無くすには、setcompatiblemodeで0x10000000を指定します。
 *
 * @example
 * setcompatiblemode(0x10000000);
 * beginsel();
 * shiftdown();
 * endsel();
 * shiftright();
 * shiftleft();
 *  
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function shiftleft(n_step?: number): number;

/**
 * s
 * 
 * shiftright文は、Shiftキーを押しながら矢印右キーを押すことに相当する文です。    
 * カーソルの動きやパラメータなどはrightと同じで、    
 * Shiftキーを押しながら操作することに相当するため、範囲選択が広がるなどの動作になります。
 * 
 * @example
 * shiftright();
 * 
 * @param n_step
 * 移動する量を指定します。
 * 省略すると1と同じです。
 * 
 * @example
 * shiftright(100);
 * shiftleft(90);
 * 
 * @example
 * var ret = shiftright(100);
 * if (ret != 0) {
 *     message("移動した");
 * } else {
 *     message("移動しなかった");
 * }
 *
 * @comment
 * 範囲選択された状態でのshiftleft;やshiftright;は、複数行の選択かどうかなどによって動作が違います。   
 * 通常は、[その他]→[動作環境]→[編集]→[高度な編集2]の「左右キーは必ず範囲選択の先頭/末尾」がOFF相当の動作です。    
 * この動作の違いを無くすには、setcompatiblemodeで0x10000000を指定します。
 *
 * @example
 * setcompatiblemode(0x10000000);
 * beginsel();
 * shiftdown();
 * endsel();
 * shiftright();
 * shiftleft();
 *  
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function shiftright(n_step?: number): number;

/**
 * s
 * 
 * ファイルの最後に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function gofileend(): number;

/**
 * s
 * 
 * ファイルの先頭に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function gofiletop(): number;

/**
 * s
 * 
 * 対応する括弧に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function gokakko(): number;

/**
 * s
 * 
 * 最後に編集した所に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golastupdated(): number;

/**
 * s
 * 
 * '{'に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function goleftkakko(): number;

/**
 * s
 * 
 * '}'に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function gorightkakko(): number;

/**
 * s
 * 
 * 行頭に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golinetop(): number;

/**
 * s
 * 
 * 論理行頭に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golinetop2(): number;

/**
 * s
 * 
 * 行末に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golineend(): number;

/**
 * s
 * 
 * 論理行末に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golineend2(): number;

/**
 * s
 * 
 * 行末に移動(その２)     
 * 表示行の最後に移動します。    
 * 「行末に移動」とは違い、折り返しがあるとき、    
 * カーソル位置は行末の文字の右側に来ます。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function golineend3(): number;

/**
 * s
 * 
 * 画面の最後に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function goscreenend(): number;

/**
 * s
 * 
 * 画面の先頭に移動する。
 * 
 * @returns
 * 移動した場合は0以外を返す。    
 * 移動しなかった場合は0を返す。
 */
declare function goscreentop(): number;

/**
 * s
 * 
 * 指定行に移動のダイアログを出す
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function jump(): number;

/**
 * s
 * 
 * moveto文は、任意の位置にカーソルを移動します。
 * 
 * @param pos_x     
 * X座標を指定します。
 * 
 * @param pos_y    
 * Y座標を指定します。
 * 
 * @example
 * moveto(10, 15);
 * 
 * @comment
 * パラメータとしてX座標とY座標を指定してください。（ワープロ的・折り返しも一行とする）    
 * Y座標はファイルの先頭を0として数え、X座標は一番左側の位置を0として数えた値です。    
 * 現在のカーソル位置はxとyで表現されます。例えば、カーソルを現在のy位置の1/2の箇所に移動するには、以下のようにします。    
 * xやyは内部的な値を表現するキーワードです。    
 * 
 * @example
 * moveto(x(), y()/2);
 * 
 * @comment
 * 範囲選択しながらカーソル移動をするには、    
 * beginselを実行してからカーソル移動することによって範囲選択してください。    
 * またはshiftrightなどで選択しながらカーソル移動ができます。    
 * 
 * @see moveto
 * @see movetoview
 * @see moveto2
 * @see movetolineno
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto(pos_x: number, pos_y: number): number;

/**
 * s
 * 
 * movetolineno文は、任意の位置にカーソルを移動します。    
 * エディタ的に計算した行番号と桁番号でカーソルを移動します。（改行だけを数える）    
 * 
 * @deprecated このmovetolineno文はcolumnがずれており使いにくいです。    
 * movetolinenoではなく、moveto2 を使うことをオススメします。    
 * @see moveto2
 * 
 * @param pos_column_plus 
 * 1から数えた桁位置を指定します。    
 * 桁位置は、タブ文字は１つとして数えた番号です。    
 * movetoと違い、桁番号も行番号も1から始まります。    
 * たとえばファイルの先頭に移動するには、両方1を指定します。    
 * columnの返す値は0から始まるので注意してください。    
 * 同じ位置に移動するにはcolumnに1を加えます。    
 * 
 * @example
 * movetolineno(column()+1, lineno());
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @comment
 * 範囲選択しながらカーソル移動をするには、    
 * beginselを実行してからカーソル移動することによって範囲選択してください。    
 * またはshiftrightなどで選択しながらカーソル移動ができます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function movetolineno(pos_column_plus: number, pos_lineno: number): number;

/**
 * s
 * 
 * movetoview文は、任意の位置にカーソルを移動します。
 * 
 * @param pos_x     
 * X座標を指定します。
 * 
 * @param pos_y    
 * Y座標を指定します。
 * 
 * @example
 * movetoview(0, 0);
 * 
 * @comment
 * movetoview文は、ほとんどの場合はmovetoと同じですが、    
 * カーソルをタブ文字の右側の何もない空間にも移動させることができます。    
 * ただし、[その他]→[動作環境]→[編集]→[高度な編集2]の「タブ文字の上にカーソル移動した時」が「貫通する」になっている必要があります。    
 * 「貫通する」になっているかどうかは、carettabmodeキーワードで知ることができます。    
 * 貫通する位置も表す現在のカーソル位置はxviewキーワードで知ることができます。     
 * 
 * @see carettabmode    
 * @see xview
 * 
 * @example
 * mmovetoview(xview(), y());
 * 
 * @see moveto
 * @see movetoview
 * @see moveto2
 * @see movetolineno
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @comment
 * 範囲選択しながらカーソル移動をするには、    
 * beginselを実行してからカーソル移動することによって範囲選択してください。    
 * またはshiftrightなどで選択しながらカーソル移動ができます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto(pos_x: number, pos_y: number): number;

/**
 * s
 * 
 * moveto2文は、任意の位置にカーソルを移動します。
 * 
 * @example
 * moveto2(0, 1);
 * 
 * @param pos_column
 * 0から数えた桁位置を指定します。
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @comment
 * moveto2文は、movetolinenoとほぼ同じですが、桁数の数え方がcolumnやlinenoと一致しています。    
 * columnとlinenoを使って同じ位置に移動するには、columnとlinenoをそのまま指定するだけでいいです。    
 * 
 * @example
 * moveto2(column(), lineno());
 * 
 * @see moveto
 * @see movetoview
 * @see moveto2
 * @see movetolineno
 * 文字の単位ごとに各種のバリエーションがあります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto2(pos_column: number, pos_lineno: number): number;

/**
 * s
 * 
 * moveto_wcs文は、moveto2ののUCS-2単位版です。
 * 
 * @param pos_column_wcs 
 * 0から数えた桁位置（column_wcs相当）を指定します。
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto_wcs(pos_column_wcs: number, pos_lineno: number): number;

/**
 * s
 * 
 * moveto_ucs4文は、moveto2ののUCS-4単位版です。
 * 
 * @param pos_column_ucs4 
 * 0から数えた桁位置（column_ucs4相当）を指定します。
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto_ucs4(pos_column_ucs4: number, pos_lineno: number): number;

/**
 * s
 * 
 * moveto_cmu文は、moveto2のカーソル移動単位版です。
 * 
 * @param pos_column_cmu 
 * 0から数えた桁位置（pos_column_cmu相当）を指定します。
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto_cmu(pos_column_cmu: number, pos_lineno: number): number;

/**
 * s
 * 
 * moveto_gcu文は、moveto2の書記素クラスター単位版です。
 * 
 * @param pos_column_gcu 
 * 0から数えた桁位置（pos_column_gcu相当）を指定します。
 * 
 * @param pos_lineno 
 * 1から数えた行番号を指定します。
 *
 * @returns
 * 返り値は意味を持ちません。
 */
declare function moveto_gcu(pos_column_gcu: number, pos_lineno: number): number;

/**
 * s
 * 
 * nextpage文は、「次ページ」を実行します。
 * 
 * @param addition_line 
 * 1ページ分の行数に加算する値を指定します。    
 * 何も指定しないと、標準ではちょうど1ページよりも1行少ない量になります。    
 * nextpageは単独でも使えますが、addition_lineを指定すると1ページを修正して加算する行数を指定できます。    
 * 例えば以下のようにすると、ちょうど1ページよりも3行少ない量スクロールします。     
 * 
 * @example
 * nextpage(-3);
 * 
 * @param is_cursor_keep 
 * 「スクロールしてもカーソル位置は固定」としてスクロールした状態にするかどうかを指定します。
 * is_cursor_keepに1を指定すると、「スクロールしてもカーソル位置は固定」としてスクロールした状態になります。
 * 
 * @example
 * nextpage(0, 1);
 * 
 * @comment
 * 参照：    
 * @see prevpage
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function nextpage(addition_line?: number, is_cursor_keep?: number): number;

/**
 * s
 * 
 * prevpage文は、「前ページ」を実行します。
 * 
 * @param addition_line 
 * 1ページ分の行数に加算する値を指定します。    
 * 何も指定しないと、標準ではちょうど1ページよりも1行少ない量になります。    
 * prevpageは単独でも使えますが、addition_lineを指定すると1ページを修正して加算する行数を指定できます。    
 * 例えば以下のようにすると、ちょうど1ページよりも3行少ない量スクロールします。     
 * 
 * @example
 * prevpage(-3);
 * 
 * @param is_cursor_keep 
 * 「スクロールしてもカーソル位置は固定」としてスクロールした状態にするかどうかを指定します。
 * is_cursor_keepに1を指定すると、「スクロールしてもカーソル位置は固定」としてスクロールした状態になります。
 * 
 * @example
 * prevpage(0, 1);
 * 
 * @comment
 * 参照：    
 * @see nextpage
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function prevpage(addition_line?: number, is_cursor_keep?: number): number;

/**
 * s
 * 
 * halfnextpage文は、「半次ページ」を実行します。
 * 
 * @param addition_line 
 * 半ページ分の行数に加算する値を指定します。    
 * 何も指定しないと、標準ではちょうど半ページよりも1行少ない量になります。    
 * halfnextpageは単独でも使えますが、addition_lineを指定すると半ページを修正して加算する行数を指定できます。    
 * 例えば以下のようにすると、ちょうど半ページよりも3行少ない量スクロールします。     
 * 
 * @example
 * halfnextpage(-3);
 * 
 * @param is_cursor_keep 
 * 「スクロールしてもカーソル位置は固定」としてスクロールした状態にするかどうかを指定します。
 * is_cursor_keepに1を指定すると、「スクロールしてもカーソル位置は固定」としてスクロールした状態になります。
 * 
 * @example
 * halfnextpage(0, 1);
 * 
 * @comment
 * 参照：    
 * @see halfprevpage
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function halfnextpage(addition_line?: number, is_cursor_keep?: number): number;

/**
 * s
 * 
 * halfprevpage文は、「半前ページ」を実行します。
 * 
 * @param addition_line 
 * 半ページ分の行数に加算する値を指定します。    
 * 何も指定しないと、標準ではちょうど半ページよりも1行少ない量になります。    
 * halfprevpageは単独でも使えますが、addition_lineを指定すると半ページを修正して加算する行数を指定できます。    
 * 例えば以下のようにすると、ちょうど半ページよりも3行少ない量スクロールします。     
 * 
 * @example
 * halfprevpage(-3);
 * 
 * @param is_cursor_keep 
 * 「スクロールしてもカーソル位置は固定」としてスクロールした状態にするかどうかを指定します。
 * is_cursor_keepに1を指定すると、「スクロールしてもカーソル位置は固定」としてスクロールした状態になります。
 * 
 * @example
 * halfprevpage(0, 1);
 * 
 * @comment
 * 参照：    
 * @see halfnextpage
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function halfprevpage(addition_line?: number, is_cursor_keep?: number): number;

/**
 * s
 * 
 * rollup文は、スクロールアップと同等の移動を行います。
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function rollup(): number;

/**
 * s
 * 
 * rollup文は、スクロールアップ２と同等の移動を行います。
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function rollup2(): number;

/**
 * s
 * 
 * rolldown文は、スクロールダウンと同等の移動を行います。
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function rolldown(): number;

/**
 * s
 * 
 * rolldown2文は、スクロールダウン２と同等の移動を行います。
 * 
 * @returns
 * スクロールが発生した場合、0以外を返す。    
 * スクロールが発生しなかった場合、0を返す。
 */
declare function rolldown2(): number;

/**
 * s
 * 
 * wordleft文は、「単語左」と同等の移動を行います。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * wordleft2を利用してください。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordleft(): number;

/**
 * s
 * 
 * wordleft2文は、「単語左」と同等の移動を行います。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordleft2(): number;

/**
 * s
 * 
 * wordright文は、「単語右」と同等の移動を行います。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * wordright2を利用してください。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordright(): number;

/**
 * s
 * 
 * wordright2文は、「単語右」と同等の移動を行います。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordright2(): number;

/**
 * s
 * 
 * wordrightsalnen文は、「単語右(サルネン風)」と同等の移動を行います。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * wordrightsalnen2を利用してください。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordrightsalnen(): number;

/**
 * s
 * 
 * wordrightsalnen2文は、「単語右(サルネン風)」と同等の移動を行います。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function wordrightsalnen2(): number;

/**
 * s
 * 
 * 単語の先頭に移動に移動する。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * gowordtop2を利用してください。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function gowordtop(): number;

/**
 * s
 * 
 * 単語の先頭に移動に移動する。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function gowordtop2(): number;

/**
 * s
 * 
 * 単語の最後に移動に移動する。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * gowordend2を利用してください。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function gowordend(): number;

/**
 * s
 * 
 * 単語の最後に移動に移動する。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function gowordend2(): number;

/**
 * s
 * 
 * １つ前のカーソル位置に移動する。
 * 
 * @comment
 * 以下のコマンドなどを実行したときのカーソル位置を覚えます。
 * - ファイルの先頭へ移動 
 * - ファイルの最後へ移動 
 * - 上の編集箇所 
 * - 下の編集箇所 
 * - タグジャンプ 
 * - バックタグジャンプ 
 * - 指定行への移動 
 * - 最後に編集した所 
 * - 検索開始位置へ戻る 
 * - マクロmoveto, movetolineno, moveto2, moveto_***系
 * - 置換ダイアログで置換 
 * - 検索ダイアログで検索 
 * - 強調一覧で移動 
 * - マーク一覧で移動 
 * - 他の秀丸エディタと内容比較の開始 
 * - 他の秀丸エディタと内容比較で違う場所に移動したとき 
 * - 「カーソル位置の自動復元」した位置 
 * - 「前のカーソル位置」を実行したときの位置 
 * - アウトライン解析のツリー表示で、フォーカスが移る前の位置 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevpos(): number;

/**
 * s
 * 
 * prevpos文で移動した履歴は記憶されているため、    
 * このprevposhistbackで移動した軌跡を過去へたどることが出来ます。
 * 
 * @comment
 * 参照：
 * @see prevposhistforward
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevposhistback(): number;

/**
 * s
 * 
 * prevpos文で移動した履歴は記憶されているため、    
 * このprevposhistbackで履歴を遡ってカーソル移動します。
 * 
 * @comment
 * 参照：
 * @see prevposhistforward
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevposhistback(): number;

/**
 * s
 * 
 * prevposhistbackとは逆の動作で、履歴を戻している場合、進めます。
 * 
 * @comment
 * 参照：
 * @see prevposhistback
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevposhistforward(): number;

/**
 * s
 * 
 * 現在行をマークされていれば、マークを解除し、    
 * マークがなければ、マークします。    
 * 要するに現行行に対して「マーク⇔マーク解除」の切り替えをします。
 * 
 * @comment
 * 参照：
 * @see marked
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setmark(): number;

/**
 * s
 * 
 * clearallmark文は、    
 * 「現在の秀丸エディタのマークを解除」または「異なる秀丸も含めマークを全て解除」を行います。
 *
 * @param is_current_hidemaru
 * 1を指定した場合、「現在のファイルのマークを解除」を行います。    
 * 0を指定した場合、「マークを全て解除」を行います。    
 * 
 * is_current_hidemaruを省略した場合、「マークを全て解除」を行います。    
 * この場合、resultが書き換わらないため、有効な返り値は返りません。    
 * (0を明示した場合とは、返り値の意味が変わりますので注意)
 * 
 * @returns
 * 成功した場合resultは0以外を返す。    
 * 失敗した場合resultは0を返す。    
 * is_current_hidemaru を省略した場合は、resultが書き換わらないため、有効な値を返さないので注意)
 */
declare function clearallmark(is_current_hidemaru?: number): number;

/**
 * s
 * 
 * 「マーク一覧」を実行します。    
 * 
 * @returns
 * マークをリストから選択すると、１が返ってくる。
 * ダイアログを閉じたり、キャンセルボタンを選ぶと-1が返ってくる。    
 * (何かマークを操作しても、最終的にダイアログを閉じたりキャンセルボタンをおせば、-1が返ってくる)    
 * その他の場合は、返ってくる値に意味はない。
 */
declare function marklist(): number;

/**
 * s
 * 
 * 「マーク行の下検索」を実行します。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function nextmark(): number;

/**
 * s
 * 
 * 「マーク行の上検索」を実行します。
 * 
 * @returns
 * 移動が発生した場合、0以外を返す。    
 * 移動が発生しなかった場合、0を返す。
 */
declare function prevmark(): number;

/**
 * s
 * 
 * 上の強調行に移動を実行します。
 * Ｃ言語の関数とおぼしきものを上方向に検索します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevfunc(): number;

/**
 * s
 * 
 * 下の強調行に移動を実行します。
 * Ｃ言語の関数とおぼしきものを下方向に検索します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function nextfunc(): number;

/**
 * s
 * 
 * nextresult文は、「次の結果」を実行します。
 * 
 * @param target_flag 
 * 移動する対象を指定します。    
 * 以下の値の論理和を指定する。    
 * - 0x0001　比較結果    
 * - 0x0002　grep結果    
 * - 0x0004　検索での色付け
 * 省略した場合、全てを対象とします。
 * 
 * @returns
 * 有効な値は返ってこない。
 */
declare function nextresult(target_flag?: number): number;

/**
 * s
 * 
 * prevresult文は、「前の結果」を実行します。
 * 
 * @param target_flag 
 * 移動する対象を指定します。    
 * 以下の値の論理和を指定する。    
 * - 0x0001　比較結果    
 * - 0x0002　grep結果    
 * - 0x0004　検索での色付け
 * 省略した場合、全てを対象とします。
 * 
 * @returns
 * 有効な値は返ってこない。
 */
declare function prevresult(target_flag?: number): number;


/**
 * s
 * 
 * 対応するHTMLタグに移動。    
 * 開始タグにカーソルがあれば、終了タグに移動し、    
 * 逆に、終了タグにカーソルがあれば、開始タグに移動する。
 * 
 * @comment
 * この機能はHTML,XMLのカラー表示されているときのみ有効、    
 * 対応するタグに移動します。
 * 
 * @returns
 * 対応するタグに移動したら１を返す。    
 * それ以外は０を返す。
 */
declare function gotagpair(): number;

/**
 * s
 * 
 * backtab文は、「タブ後退」を行います。    
 * タブ後退は、カーソル位置よりも左にあるタブストップにジャンプします。    
 * TSV/CSVモードではタブ区切り/カンマ区切りの前の位置にジャンプします。    
 * 
 * @returns
 * resultがカーソル移動しかたどうかが得られます。    
 * カーソル移動した場合は０以外を返す。    
 * カーソル移動しなかった場合は０を返す。
 */
declare function backtab(): number;

/**
 * s
 * 
 * forwardtab文は、「タブ前進」を行います。    
 * タブ後退は、カーソル位置よりも左にあるタブストップにジャンプします。    
 * TSV/CSVモードではタブ区切り/カンマ区切りの次の位置にジャンプします
 * 
 * @returns
 * resultがカーソル移動しかたどうかが得られます。    
 * カーソル移動した場合は０以外を返す。    
 * カーソル移動しなかった場合は０を返す。
 */
declare function forwardtab(): number;

/**
 * s
 * 
 * appendcopy文は、追加コピーを実行します。    
 * 
 * @comment
 * （元のクリップボードの内容がBOX選択してコピーしていた場合、BOX選択であったことの情報は消去されます） 
 * 
 * @see copy
 * 
 * @returns
 * 追加コピーに成功した場合は、１を返す    
 * 失敗した場合は、０を返す
 */
declare function appendcopy(): number;

/**
 * s
 * 
 * appendcut文は、追加切り抜きを実行します。    
 * 
 * @comment
 * （元のクリップボードの内容がBOX選択してコピーしていた場合、BOX選択であったことの情報は消去されます） 
 * 
 * @see copy
 * 
 * @returns
 * 追加切り抜きに成功した場合は、１を返す    
 * 失敗した場合は、０を返す
 */
declare function appendcut(): number;

/**
 * s
 * 
 * BOX範囲選択を開始します。    
 * 
 * @example
 * beginrect();
 * right();right();
 * down();down();
 * copy();
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beginrect(): number;

/**
 * s
 * 
 * BOX範囲選択開始(複数選択化)を開始します。    
 * 
 * @example
 * beginrectmulti();
 * right();right();
 * down();down();
 * copy();
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beginrectmulti(): number;

/**
 * s
 * 
 * 範囲選択開始を実行する    
 * 
 * @example
 * beginsel();
 * right();right();
 * down();down();
 * copy();
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beginsel(): number;

/**
 * s
 * 
 * beginlineselは、行選択開始を行います。
 * 
 * @param is_multiline
 * 範囲選択されていない場合は、カーソル位置の行を行選択状態にしてから、行選択モードに移ります。    
 * 範囲選択されている場合は、パラメータによって動作が違います。    
 * - 0を指定するか省略した場合、範囲選択されていないときと同様に、カーソル位置の行を行選択状態にします。    
 * - 1を指定すると、範囲選択が含まれる行すべてを行単位の選択にしてから、行選択モードに移ります。
 *
 * @example
 * beginlinesel(1);
 * right();right();
 * down();down();
 * copy();
 * 
 * @see copyline
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beginlinesel(is_multiline?: number): number;

/**
 * s
 * 
 * beginsel, beginrect, beginlinesel, beginrectmultiなど    
 * 範囲選択モードになっている状態（範囲選択はそのまま）    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function endsel(): number;

/**
 * s
 * 
 * コピー（の後に範囲選択解除）を実行する。    
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see copy2 範囲選択を解除しないバージョン
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copy(): number;

/**
 * s
 * 
 * コピー（の後に範囲選択はそのまま）を実行する。    
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see copy 範囲選択を解除するバージョン
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copy2(): number;

/**
 * s
 * 
 * 切り抜きを実行する。    
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @returns
 * 切り抜きに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function cut(): number;

/**
 * s
 * 
 * copylineは、行のコピーを行います。
 * 
 * @param is_multiline
 * 範囲選択されていない場合は、カーソル位置の行をコピーします。    
 * 範囲選択されている場合は、パラメータによって動作が違います。    
 * - 0を指定するか省略した場合、範囲選択されていないときと同様に、カーソル位置の行をコピーします。    
 * - 1を指定すると、範囲選択が含まれる行すべてを行単位にしてコピーします。
 *
 * @see beginlinesel
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copyline(is_multiline?: number): number;

/**
 * s
 * 
 * cutafter文は、カーソルより後ろを切り抜き
 * 
 * @returns
 * 切り抜きに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function cutafter(): number;

/**
 * s
 * 
 * copywordは、カーソルの位置の単語をコピーします。    
 * なお、１つ以上の連続した空白（１つも含む）も１つの単語とみなします。    
 * 
 * 単語というよりも、文字コード表における「文字グループ」の切り替わり目までコピーする、といった意味です。    
 * 例えば、「アルファベット＋数値」「空白」「漢字」「ひらがな」「カタカナ」    
 * などの「切り替わりを区切れ目と見なす」感じ。
 * 
 * @example
 * abcc123b  あいうえお漢字ですナ
 * → abcc123b|  |あいうえお|漢字|です|ナ
 *  　といったように分解し、それぞれを１つの単語とみなす。
 * 
 * @param copy_word_count 
 * copy_word_count を指定することで、単語１つではなく、カーソルがある位置から、指定の数値の分だけ単語をコピーします。
 * 
 * @example
 * // 秀丸エディタの内容が 「This is a pen.」だとする。
 * // 現在のカーソルの位置が、Thisの文字列上のどこかにあるものとする。
 * copy_word_count(5);
 * // 「This is a」という５単語分(空白も単語)の文字列がクリップボードにコピーされる。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copyword(copy_word_count?: number): number;

/**
 * s
 * 
 * cutwordは、単語を切り抜きを実行します。    
 * 
 * @returns
 * 切り抜きに成功したら１を返す、
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function cutword(): number;

/**
 * s
 * 
 * escapeselect文は、範囲選択の取り消しを行います。    
 * （秀丸マクロでは、これはescape文のことです）    
 * 
 * 範囲選択をしている状態でescapeコマンドを使うと、    
 * 範囲選択は取り消されてしまいますが、    
 * seltopx，seltopy，selendx，selendyの値は    
 * 次の範囲選択を開始するまで保持されます。
 * 
 * @returns
 * 返ってくる値に意味はない。
 */
declare function escapeselect(): number;

/**
 * s
 * 
 * pasteは貼り付けを実行します。    
 * 
 * 動作環境の設定によって貼り付け後のカーソル位置が違います。   
 * 違いを無くすにはsetcompatiblemode文を使います。    
 * 
 * @example
 * setcompatiblemode(0x00000000); // 書かないことと同じ    マクロの標準動作（動作環境に従う） 
 * setcompatiblemode(0x00001000); // 先頭のまま 
 * setcompatiblemode(0x00002000); // 最後に移動 
 * 
 * @comment
 * BOX選択をコピーした内容を貼り付ける場合は、pasterect相当になります。
 * 
 * @see setcompatiblemode
 * @see pasterect
 * 
 * @returns
 * 貼り付けに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function paste(): number;

/**
 * s
 * 
 * pasterectはBOX貼り付けを実行します。    
 * 
 * [EOF]以降に貼り付けられる場合、    
 * 通常のBOX貼り付け操作では自動的に改行が入りますが、    
 * pasterectの場合は改行が入りません。
 * 
 * @returns
 * 貼り付けに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function pasterect(): number;

/**
 * s
 * 
 * refpasteは引用付き貼り付けを実行します。    
 * 実際には、「通常のコピー」もしくは「単行のコピー」あるいは「複数行のコピー」のコピーの際に、    
 * 各行の文字列の先頭に'> 'という文字をくっつけてpasteを実行します。    
 * 
 * 矩形でコピーしていた場合には、機能しません。
 * 
 * @see paste
 * 
 * @returns
 * 貼り付けに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function refpaste(): number;

/**
 * s
 * 
 * refcopyは引用付きコピー（の後に範囲選択解除）
 * 実際には、「通常の範囲選択」「単行の範囲選択」「複数行の範囲選択」「矩形範囲選択」の際に、    
 * 各行の文字列の先頭に'> 'という文字をくっつけてクリップボードにコピーします。    
 * 
 * refpasteとは異なり、こちらは矩形でも機能します。
 * 
 * @see refcopy2 コピー後に範囲選択を維持したい場合はこのrefcopy2を使用してください。
 * @see refpaste
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refcopy(): number;

/**
 * s
 * 
 * refcopyは引用付きコピー（範囲選択はそのまま）
 * 実際には、「通常の範囲選択」「単行の範囲選択」「複数行の範囲選択」「矩形範囲選択」の際に、    
 * 各行の文字列の先頭に'> 'という文字をくっつけてクリップボードにコピーします。    
 * 
 * refpasteとは異なり、こちらは矩形でも機能します。
 * 
 * @see refcopy コピー後に範囲選択を解除したい場合はこのrefcopyを使用してください。
 * @see refpaste
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refcopy2(): number;

/**
 * s
 * 
 * selectall文は、すべてを選択 を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectall(): number;

/**
 * s
 * 
 * selectline文は、行の選択（エディタ的な行単位、改行まで）    
 * を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectline(): number;

/**
 * s
 * 
 * selectword文は、単語選択(全部) を実行します。    
 * 全部という言葉が紛らわしいですが、複数という意味ではなく    
 * カーソル位置の単語１つを全部（＝先頭から最後までを）選択するという意味です。    
 * カーソルは単語の先頭に移動します。
 * 
 * @deprecated
 * これは古い秀丸の動作(V6.50未満の動作)です、    
 * selectword2を利用してください。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectword(): number;

/**
 * s
 * 
 * selectword2文は、単語選択(全部) を実行します。    
 * 全部という言葉が紛らわしいですが、複数という意味ではなく    
 * カーソル位置の単語１つを全部（＝先頭から最後までを）選択するという意味です。    
 * カーソルは単語の先頭に移動します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectword2(): number;

/**
 * s
 * 
 * showcliphist文は、クリップボード履歴の表示 を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showcliphist(): number;

/**
 * s    
 * 
 * poppaste文は、「貼り付け＋履歴戻し」を実行します。    
 * 
 * @comment
 * 「貼り付け＋履歴戻しと」は、    
 * 貼り付けを実行してからクリップボード履歴をひとつ前に戻します。    
 * このコマンドは、「コピー」または「切り抜き」コマンドを連続して実行することとセットで利用することを想定しています。    
 * 例えば、あるファイルの中から必要とする各部分だけを別のファイルに移動させたい場合に、    
 * まず「切り抜き」コマンドを連続実行して最初に全部切り抜いてしまい、    
 * あとで「貼り付け＋履歴戻し」コマンドを連続実行すればまとめて移動することができます。    
 * [動作環境]-[編集]の「貼り付け後のカーソル位置」が「先頭のまま」の場合は、    
 * 連続実行することでコピーした順番通りになります。    
 * 「最後に移動」の場合は、連続実行すると順番が逆になるので注意が必要です。    
 * 実行後は、クリップボードの内容は、貼り付けた内容と同じになっています。    
 * クリップボード履歴の先頭にある内容とクリップボードの内容が食い違うことになるので注意してください。
 * 
 * @comment
 * poppaste文の後のカーソル位置は、    
 * 動作環境の貼り付け後のカーソル位置に依存しています。    
 * 
 * 動作環境の設定によって貼り付け後のカーソル位置が違います。   
 * 常に固定にするには、setcompatiblemodeで指定することができます。    
 * 
 * @example
 * setcompatiblemode(0x00000000); // 書かないことと同じ    マクロの標準動作（動作環境に従う） 
 * setcompatiblemode(0x00001000); // 先頭のまま 
 * setcompatiblemode(0x00002000); // 最後に移動 
 * 
 * @see setcompatiblemode
 * @see poppaste2
 * 
 * @returns
 * 貼り付けに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function poppaste(): number;

/**
 * poppaste2文は、「貼り付け＋履歴戻し2」を実行します。    
 * カーソル位置は「先頭のまま」で固定です。
 * 
 * @see poppaste
 * 
 * @returns
 * 貼り付けに成功したら１を返す、    
 * 書き込み禁止などで切り抜きに失敗したら０を返す
 */
declare function poppaste2(): number;

/**
 * s
 * 
 * clearcliphistは、クリップボード履歴の消去を行います。
 * 
 * @param history_ix 
 * 
 * history_ixに０から数えた数値を指定することで、    
 * 指定した履歴を消すことができます。    
 * history_ixが無い場合は、全ての履歴を消去します。
 * 
 * @returns
 * 成功した場合、0以外を返します。    
 * 失敗した場合、0を返します。    
 */
declare function clearcliphist(history_ix? number): number;

/**
 * s
 * 
 * selectcfunc文は、「強調行の範囲選択」 を実行します。    
 * 
 * @comment
 * 「強調行の範囲選択」 とは、
 * 現在のカーソル位置の関数（CまたはC++言語で言う所の関数）を選択します。    
 * 関数の先頭から次の関数の前までを選択するので、    
 * 関数と関数の間にある文も含めて選択されます。    
 * 1000行を超える関数は正しく選択されないことがあります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectcfunc(): number;

/**
 * s
 * 
 * 「...をコピー」を実行します。    
 * 
 * @comment
 * 「...をコピー」とは    
 * カーソル位置がURLの上にあるとき、このコマンドを実行すると、    
 * URL全体をコピーします。    
 * メールアドレスや、ファイル名と思わしき場所にあるときでも有効です。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copyurl(): number;

/**
 * s
 * 
 * 「折り返しに改行を入れてコピー」を実行します。    
 * 
 * @comment
 * 「折り返しに改行を入れてコピー」とは、
 * 「折り返し」相当の位置に改行コードを挿入してコピーします。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function copyformed(): number;

/**
 * s
 * 
 * selectcolumn文は、タブストップまたはTSV/CSVモードの区切り単位の選択を行います。
 * 
 * 引数を全て省略すると、現在のカーソル位置が含まれる区切りを選択します。    
 * 
 * @example
 * selectcolumn(0, 5);
 * 
 * @param select_tabcolumn_bgn
 * 選択の左端となる区切りの番号を指定します。    
 * タブストップ区切りやTSV/CSVモード区切で、0から数えます。    
 * 
 * @param select_tabcolumn_end
 * 選択の右端となる区切りの番号を指定します。    
 * タブストップ区切りやTSV/CSVモード区切で、0から数えます。
 * select_tabcolumn_end引数以降を省略すると、select_tabcolumn_bgnの区切り番号だけを選択します。    
 * 
 * @example
 * selectcolumn(tabcolumn, tabcolumn);
 * 
 * @param select_lineno_bgn
 * 上端となる行番号を指定します。    
 * 1から数えます。    
 * 省略した場合は全ての行が対象になります。    
 * 
 * @param select_lineno_end
 * 下端となる行番号を指定します。    
 * 1から数えます。    
 * 省略した場合は全ての行が対象になります。    
 * 
 * @example
 * selectcolumn(tabcolumn, tabcolumn, lineno, lineno);
 * 
 * @comment
 * TSV/CSVモード向けの機能です。    
 * TSV/CSVモードのルーラー（「A　　|B　　|C　　」といった表示）をクリックしたときと同じ選択になります。    
 * 番号で指定する左端の区切りから右端の区切りまでを、BOX選択で縦方向に全行分選択します。    
 * 
 * 区切りは0から数えます。    
 * 数え方は、タブストップまたはTSC/CSVのタブ区切り/カンマ区切りを１つの単位として数えたものです。    
 * forwardtab, backtabの数え方と対応しています。    
 * 現在のカーソルが含まれる位置は、tabcolumnで表されます。    
 * （columnキーワードとは対になっていないので注意が必要です。）    
 * 
 * @example
 * config("xTabMode:0x0001"); //TSVモード
 * insert("A1\tB1test\tC1\n");
 * insert("A2\tB2test\tC2\n");
 * refreshtabstop();
 * selectcolumn(1, 1); //B列を選択
 * copy2(); //コピーとか
 * 
 * @example
 * //複数選択扱い変換モジュールは事前にsetcompatiblemode必要
 * setcompatiblemode(0x00100000);
 * selectcolumn(1, 1); // B列を選択
 * tolower();
 * 
 * @returns
 * 成功時は0以外を返す    
 * 失敗時は0になります。    
 */
declare function selectcolumn(select_tabcolumn_bgn?: number, select_tabcolumn_end?: number, select_lineno_bgn?: number, select_lineno_end?: number): number;

/**
 * s
 * 
 * tomultiselect文は、「複数選択化」を実行します。    
 * 
 * - 範囲選択を、１行ずつばらばらにして複数選択の扱いにします。    
 * - 範囲選択で２行以上の選択の場合、２つ以上の複数選択にします。    
 * - BOX選択で高さが２文字分以上の場合、２つ以上の複数選択にします。    
 *
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function tomultiselect(): number;

/**
 * s
 * 
 * invertselection文は、「範囲選択を反転」を実行します。    
 * 
 * 範囲選択を反転して、範囲選択が無かったところを選択し、    
 * 選択があったところを選択なしにします。
 *
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function invertselection(): number;

/**
 * s
 * 
 * reservemultisel文は、「複数選択予約」を実行します。    
 * 
 * @comment
 * 「複数選択予約」とは、
 * 通常の範囲選択の部分を、あとで「複数選択予約を選択」で選択させるために予約します。    
 * 予約された部分は、範囲選択の色と通常の色の中間色で色が付きます。    
 * 予約しただけの段階では、コピーや削除の対象にはなりません。    
 * 予約は複数個所で行うことができます。    
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function reservemultisel(): number;

/**
 * s
 * 
 * selectreservedmultisel文は、「複数選択予約を選択 」を実行します。    
 * 
 * @comment
 * 「複数選択予約を選択 」とは、
 * 「複数選択予約」されていた箇所を、選択します。    
 * 選択された箇所は、コピーや削除の対象になります。
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectreservedmultisel(): number;

/**
 * s
 * 
 * clearreservedmultisel文は、「複数選択予約を消去」を実行します。    
 * 
 * @comment
 * 「複数選択予約を消去」とは、
 * 「複数選択予約」されている範囲の一部を消去し、予約を解除します。    
 * 消去する対象は、通常の範囲選択の部分だけになります。
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function clearreservedmultisel(): number;

/**
 * s
 * 
 * clearreservedmultiselall文は、「複数選択予約を全て消去 」を実行します。    
 * 
 * @comment
 * 「複数選択予約を全て消去 」とは、
 * 複数選択予約」されている範囲の全てを消去し、予約を解除します
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see setcompatiblemode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function clearreservedmultiselall(): number;

/**
 * s
 * 
 * beginclipboardread文は、    
 * クリップボードからのデータの取り込みを開始することを宣言します。    
 * 
 * getclipboard関数といっしょに使います。
 * 
 * @see getclipboard
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beginclipboardread(): number;

/**
 * f
 * 
 * getclipboard関数は、クリップボードから１行分のデータを取り出し、それを返します。    
 * 
 * @comment
 * '\x0D'は除去されますが、'\x0A'は行末についてきます。    
 * ただし、クリップボードデータの最後の部分が改行で終わっていない場合は、'\x0A'無しでデータが返ってきます。    
 * 
 * getclipboard()を使うには、まずbeginclipboardreadを実行しないといけません。    
 * beginclipboardreadを実行した直後のgetclipboard()の値はクリップボード内データの１行目で、    
 * ２回目の値は２行目で、以下、３行目、４行目とデータを受けとることができます。
 * 
 * クリップボードの最後までデータを取り出し終わるとgetclipboard()の返す値は""となります。    
 * getclipboard()を続けて呼ぶことができるのは、同じ秀丸エディタ内のみです。    
 * newfileやsetactivehidemaruで別の秀丸エディタに切り替わった場合は、getclipboard()は続けて呼ぶことはできません。    
 * 
 * @comment
 * 参照：    
 * @see beginclipboardread
 * 
 * @example
 * // クリップボードの内容を a[0～] の配列に取り込む例
 * beginclipboardread();
 * var i = 0;
 * var a = [];
 * a[i] = getclipboard();
 * while( a[i] != "" ) {
 *     i = i + 1;
 *     a[i] = getclipboard();
 * }
 * 
 * @returns
 * 取得した文字列を返します。
 */
declare function getclipboard(): number;

/**
 * s
 * 
 * setclipboard文は、式の値をクリップボードに設定します。
 * 
 * @param text 
 * クリップボードに設定する文字列を指定します。
 * 
 * @example
 * var aaaaa = "あいうえお";
 * setclipboard(aaaaa);
 * 
 * @comment
 * 改行も含めてクリップボードに入れたい場合は以下のように使う必要があります。
 * 
 * @example
 * var aaaaa = "あいうえお" + "\r\n";
 * setclipboard(aaaaa);
 * 
 * @comment
 * 空の文字列（""）を設定すると、クリップボードの内容は全て消去されます。
 * 
 * @example
 * setclipboard("");
 * 
 * @returns
 * 失敗した場合、0を返す。    
 * 成功した場合、0以外を返す。
 */
declare function setclipboard(text: string): number;

/**
 * s
 * 
 * addclipboard文は、現在のクリップボードのデータに式の値を追加します。    
 * BOX選択してコピーしていた場合、BOX選択であることの情報は失われます。
 * 
 * @param text 
 * クリップボードに追加する文字列を指定します。
 * 
 * @example
 * setclipboard("あいうえお");
 * addclipboard("かきくけこ"); // 最新のクリップボードは"あいうえおかきくけこ" になる。
 * 
 * @see setclipboard
 * 
 * @returns
 * 失敗した場合、0を返す。    
 * 成功した場合、0以外を返す。
 */
declare function addclipboard(text: string): number;

/**
 * s
 * 
 * backspace文は、    
 * 「Backspace」を実行します。
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function backspace(): number;

/**
 * s
 * 
 * delは、秀丸マクロではdelete文に対応します。    
 * 「Del」を実行します。
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function del(): number;

/**
 * s
 * 
 * deleteafterは、「カーソルより後ろを削除」を実行します。   
 * カーソルの位置から、その行の末尾の改行文字の直前までを削除します。
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function deleteafter(): number;

/**
 * s
 * 
 * deletebeforeは、「カーソルより前を削除 」を実行します。   
 * カーソルの位置する行の先頭（直前の改行文字の次）からカーソル位置までの文字を削除します。
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function deletebefore(): number;

/**
 * s
 * 
 * deleteline文は、行削除を行います。（ワープロ的な行単位、折り返しまで）
 * 
 * @example
 * deleteline();
 * 
 * @param is_selected_lines
 * 0を指定すると、カーソル位置の行だけを削除します。    
 * 1を指定すると、範囲選択が含まれる行すべてを行単位に揃えて削除します。    
 * 省略すると0と同じです。    
 * 
 * @comment
 * 範囲選択されていない場合は、カーソル位置の行を削除します。    
 * 範囲選択されている場合は、is_selected_linesによって動作が違います。    
 * is_selected_linesに0を指定するか省略した場合、範囲選択されていないときと同様に、カーソル位置の行を削除します。    
 * is_selected_linesに1を指定すると、範囲選択が含まれる行すべてを行単位に揃えて削除します。    
 * このときの行単位はdeleteline2と同様にエディタ的な行単位（改行まで）になります。    
 * deletelineは、「カーソルより前を削除 」を実行します。    
 * カーソルの位置する行の先頭（直前の改行文字の次）からカーソル位置までの文字を削除します。    
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function deleteline(is_selected_lines?: number): number;

/**
 * s
 * 
 * deleteline2文は、論理行削除を行います。（エディタ的な行単位、改行まで）
 * 
 * @example
 * deleteline2();
 * 
 * @param is_selected_lines
 * 0を指定すると、カーソル位置の行だけを削除します。    
 * 1を指定すると、範囲選択が含まれる行すべてを行単位に揃えて削除します。    
 * 省略すると0と同じです。    
 * 
 * @comment
 * 範囲選択されていない場合は、カーソル位置の行を削除します。    
 * 範囲選択されている場合は、is_selected_linesによって動作が違います。    
 * is_selected_linesに0を指定するか省略した場合、範囲選択されていないときと同様に、カーソル位置の行を削除します。    
 * is_selected_linesに1を指定すると、範囲選択が含まれる行すべてを行単位に揃えて削除します。
 * 
 * @returns
 * 成功した場合、1を返す。    
 * 失敗した場合、0を返す。    
 */
declare function deleteline2(is_selected_lines?: number): number;

/**
 * s
 * 
 * deleteword文は、機能的には「単語の削除（カーソルの後ろだけ）」を実行します。
 * 
 * @comment
 * (※そういう点では、deletewordafterという関数名が相応しかったといえるでしょう)
 * 
 * @returns
 * 原則的には1を返す。    
 * 特に編集が発生しなかったとしても1を返す。    
 * そもそも編集禁止モードなどの時は0を返す。
 */
declare function deleteword(): number;

/**
 * s
 * 
 * deletewordall文は、「単語の削除」を実行します。    
 * 単語の先頭から末尾まで削除されます。
 * 
 * @returns
 * 原則的には1を返す。    
 * 特に編集が発生しなかったとしても1を返す。    
 * そもそも編集禁止モードなどの時は0を返す。
 */
declare function deletewordall(): number;

/**
 * s
 * 
 * deletewordall文は、「単語の削除（カーソルより前の部分だけ）」を実行します。    
 * 
 * @returns
 * 原則的には1を返す。    
 * 特に編集が発生しなかったとしても1を返す。    
 * そもそも編集禁止モードなどの時は0を返す。
 */
declare function deletewordfront(): number;


/**
 * s
 * 
 * insert文は、textで指定された文字列を挿入したのち、    
 * カーソルを挿入した文字列の最後に移動します。    
 * insert文は挿入モードでの入力に相当します。
 * 
 * @param text 
 * 挿入する文字列を指定します。
 * 
 * @example
 * insert("ABC");
 * 
 * // 改行文字の挿入には、文字コード10(line-feed)を挿入します。
 * insert("\n");
 * 
 * // または次のようにしてもかまいません｡
 * insert "\x0A";
 * 
 * @param mode1
 * 改行コードの解釈の仕方や、インデントを働かせる方法を指定します。    
 * - 省略した場合、改行は"\n"のみ、インデントは無しです。
 * - 1 を指定すると、"\r"と"\n"と"\r\n"の改行コードの違いを正しく解釈するようになります。    
 * - 2 を指定して、文字列が"}"の場合、C言語用の自動アンインデントが働きます。    
 * - 2 を指定して、文字列が"\n"の場合、自動インデントが働きます。    
 * 
 * @param mode2
 * 自動インデントの設定を明示的に指定できます。    
 * 以下の値の論理和です。    
 * - 0x0001：全角空白もインデント=ON
 * - 0x0002：全角空白もインデント=OFF
 * - 0x0010：C言語用のインデント=ON
 * - 0x0020：C言語用のインデント=OFF
 * - 0x0100：C言語インデントで、switchの場合はインデントしない=ON
 * - 0x0200：C言語インデントで、switchの場合はインデントしない=OFF
 * 指定しない場合は、ファイルタイプ別の設定/動作環境に従います。
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see insertfix
 * @see overwrite
 * 
 * @returns
 * 挿入できたら0以外を返す。
 * 書き込み禁止などで挿入できなかったら0を返す。
 */
declare function insert(text: string, mode1?: number, mode2_flag?: number): number;

/**
 * s
 * 
 * insertfix文はinsertと同様に文字列を挿入しますが、    
 * カーソルは移動しません。
 * 
 * @param text 
 * 挿入する文字列を指定します。
 * 
 * @example
 * insertfix("ABC");
 * 
 * // 改行文字の挿入には、文字コード10(line-feed)を挿入します。
 * insertfix("\n");
 * 
 * // または次のようにしてもかまいません｡
 * insertfix "\x0A";
 * 
 * @param mode1
 * 改行コードの解釈の仕方や、インデントを働かせる方法を指定します。    
 * - 省略した場合、改行は"\n"のみ、インデントは無しです。
 * 1 を指定すると、"\r"と"\n"と"\r\n"の改行コードの違いを正しく解釈するようになります。    
 * 2 を指定して、文字列が"}"の場合、C言語用の自動アンインデントが働きます。    
 * 2 を指定して、文字列が"\n"の場合、自動インデントが働きます。    
 * 
 * @param mode2
 * 自動インデントの設定を明示的に指定できます。    
 * 以下の値の論理和です。    
 * - 0x0001：全角空白もインデント=ON
 * - 0x0002：全角空白もインデント=OFF
 * - 0x0010：C言語用のインデント=ON
 * - 0x0020：C言語用のインデント=OFF
 * - 0x0100：C言語インデントで、switchの場合はインデントしない=ON
 * - 0x0200：C言語インデントで、switchの場合はインデントしない=OFF
 * 指定しない場合は、ファイルタイプ別の設定/動作環境に従います。
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @see insert
 * @see overwrite
 * 
 * @returns
 * 挿入できたら１を返す、    
 * 書き込み禁止などで挿入できなかったら０を返す。
 */
declare function insertfix(text: string, mode1: number, mode2_flag?: number): number;

/**
 * s
 * 
 * duplineは、行の二重化を行います。    
 * 
 * 範囲選択されていない場合は、カーソル位置の行を二重化します。    
 * 範囲選択されている場合は、duplicate_modeによって動作が違います。    
 * 
 * @param duplicate_mode
 * 0を指定するか省略した場合、範囲選択されていないときと同様に、カーソル位置の行を二重化します。    
 * 1を指定すると、範囲選択が含まれる行すべてを行単位にして行の二重化をします。
 * 
 * @returns
 * 二重化できたら１を返す、    
 * 書き込み禁止などで挿入できなかったら０を返す。
 */
declare function dupline(duplicate_mode?: number): number;

/**
 * s
 * 
 * insertline文は、空行挿入を実行します。
 * 
 * @returns
 * 挿入できたら１を返す、    
 * 書き込み禁止などで挿入できなかったら０を返す。
 */
declare function insertline(): number;


/**
 * s
 * 
 * insertreturn文は、改行キーを押したのと全く同じ働きをします。    
 * このコマンドは現在のモードが上書きモードか挿入モードかによって動作が異なりますので注意が必要です。    
 * 
 * 挿入モードでの動作を期待する場合は、    
 * 以下のようにする必要があります。    
 * 
 * @example
 * if( overwrite() ) {
 *    overwriteswitch();
 *    insertreturn();
 *    overwriteswitch();
 * } else {
 *    insertreturn();
 * }
 * 
 * @comment
 * insertreturnは、自動インデントも働きます。    
 * 自動インデントを働かせず、単純に改行を挿入する場合は、
 * 
 * @example
 * insert("\n");としてください。
 * 
 * @returns
 * 成功した場合、0以外を返す。
 * 書き込み禁止などで失敗した場合、0を返す。
 */
declare function insertreturn(): number;

/**
 * s
 * 
 * tab文は、タブキーを押したのと全く同じ働きをします。    
 * 
 * @returns
 * 挿入できたら１を返す、    
 * 書き込み禁止などで挿入できなかったら０を返す。
 */
declare function tab(): number;

/**
 * s
 * 
 * undelete文は、「削除内容復元」コマンドと同じです。    
 * 直前に削除された内容を挿入します。    
 * 
 * （削除の取り消しではありません。直近の削除した内容は秀丸では保存されていますので、    
 *  それを別の場所であっても復元することに利用できるのがこのコマンドです）
 * 
 * これを応用して、カーソル行の内容を上に移動したり、    
 * 下に移動したりといったマクロが簡単に作れます。    
 * 
 * @comment
 * 行を上に移動する例 
 * 
 * @example 
 * deleteline2(); // 行を削除(すべての削除行為は削除内容が記憶されている)
 * moveto2(0,lineno()-1); // １行上に移動
 * undelete(); 移動先で削除した内容を復元
 * 
 * @comment
 * 行を下に移動する例 
 * 
 * @example 
 * deleteline2(); // 行を削除(すべての削除行為は削除内容が記憶されている)
 * moveto2(0,lineno()+1); // １行下に移動
 * undelete(); 移動先で削除した内容を復元
 * 
 * @returns
 * 復元できたら１を返す、    
 * 書き込み禁止などで復元できなかったら０を返す。
 */
declare function undelete(): number;

/**
 * s
 * 
 * undo文は、やり直しをします。
 * 
 * @example
 * undo();
 * 
 * @param undo_type 
 * グループ化されたやり直しの方法を指定します。    
 * - 0 : ダイアログを出して問い合わせします。
 * - 1 : グループ化されていても、無視して常に１つずつやり直しします。
 * - 2 : グループ化されているものをまとめてやり直しします。
 * - 3 : 「動作環境・編集」の「全置換のやり直し」で指定した方法に従う動作となります。（V8.22以降）
 * 省略時は1と同じです。    
 * 
 * @returns
 * やり直しできたら１を返す、    
 * 書き込み禁止などでやり直しできなかったら０を返す。
 */
declare function undo(undo_type?: number): number;

/**
 * s
 * 
 * redo文は、「やり直しのやり直し」をします。
 * 
 * @returns
 * 「やり直しのやり直し」をできたら１を返す、    
 * 書き込み禁止などで「やり直しのやり直し」をできなかったら０を返す。
 */
declare function redo(): number;


/**
 * s
 * 
 * casechange文は、「大文字<->小文字の変換」をします。
 * 
 * @example
 * casechange();
 *
 * @param target_char_group_flag
 * 対象となる文字を指定します。
 * 以下の値の論理和です。
 * - 0x01 半角英字
 * - 0x02 全角英字
 * - 0x04 アクセント記号付ラテン文字
 * - 省略時は半角英字だけを対象とします。
 * 
 * @returns
 * 常に0を返しますが、返り値は意味を持ちません。
 */
declare function casechange(target_char_group_flag?: number): 0;

/**
 * s
 * 
 * indent文は、「インデント」を実行します。    
 * 
 * @comment
 * インデントとは、    
 * 複数行を範囲選択した状態でTabキーを押すと、その範囲を行単位でインデント(字下げ)します。    
 * Shift+Tabでは逆方向にインデントします。    
 * この機能はC言語やC#、JavaScriptなどでプログラムを書く場合に便利です。    
 * 複数選択している場合は、各行の先頭にタブ文字を挿入（あるいは削除）する動作になります。
 * 
 * @returns
 * 「インデント」をできたら１を返す、    
 * 書き込み禁止などで「インデント」をできなかったら０を返す。
 */
declare function indent(): number;

/**
 * s
 * 
 * indent文は、「逆インデント」を実行します。    
 * 
 * @comment
 * 逆インデントとは、    
 * 複数行を範囲選択した状態でTabキーを押すと、その範囲を行単位でインデント(字下げ)します。    
 * Shift+Tabでは逆方向にインデントします。    
 * この機能はC言語やC#、JavaScriptなどでプログラムを書く場合に便利です。    
 * 複数選択している場合は、各行の先頭にタブ文字を挿入（あるいは削除）する動作になります。
 * 
 * @returns
 * 「逆インデント」をできたら１を返す、    
 * 書き込み禁止などで「逆インデント」をできなかったら０を返す。
 */
declare function unindent(): number;

/**
 * s
 * 
 * shifttab文は、行選択の補完を実行します。    
 * （逆インデントと同じです）
 * 
 * @comment
 * 逆インデントとは、    
 * 複数行を範囲選択した状態でTabキーを押すと、その範囲を行単位でインデント(字下げ)します。    
 * Shift+Tabでは逆方向にインデントします。    
 * この機能はC言語やC#、JavaScriptなどでプログラムを書く場合に便利です。    
 * 複数選択している場合は、各行の先頭にタブ文字を挿入（あるいは削除）する動作になります。
 * 
 * @returns
 * 「逆インデント」をできたら１を返す、    
 * 書き込み禁止などで「逆インデント」をできなかったら０を返す。
 */
declare function shifttab(): number;

/**
 * s
 * 
 * toupper文は、選択されたテキストを大文字に変換します。
 * 
 * @example
 * 
 * toupper();
 * 
 * @param target_char_group_flag
 * 指定しない場合、「半角アルファベット」と「全角アルファベット」が対象になります。    
 * （第１引数に文字列を指定する場合のtoupper関数とは異なります）    
 * 指定する場合、以下の値のOR演算した値を指定できます。    
 * - 0x01 半角アルファベットを対象にする。
 * - 0x02 全角アルファベットを対象にする。
 * - 0x04 アクセント付きラテン文字を対象にする。
 * - 0x08 キリル文字とギリシャ文字を対象にする。
 * - 0x10 対にならない文字も対象にする。
 * - 0x20 標準的な変換(ICU)を使う。Windows 10 Version 1903以降のみ。
 * 
 * @example
 * selectline();
 * toupper(0x01 | 0x02);
 * 
 * @comment
 * 参照：    
 * @see toupper 
 * @see tolower
 * 
 * @returns
 * 常に0を返しますが、返り値は意味を持ちません。
 */
declare function toupper(target_char_group_flag?: number): 0;

/**
 * f
 * 
 * toupper関数は、文字列を大文字に変換した文字列を返します。
 * 
 * @example
 * 
 * var a = toupper( "Hello" );
 * 
 * @param text
 * 文字列を指定します。
 * 
 * @param target_char_group_flag
 * 指定しない場合、「半角アルファベット」だけが対象になります。    
 * （第１引数に数値を指定する場合のtoupper関数とは異なります）    
 * 指定する場合、以下の値のOR演算した値を指定できます。    
 * - 0x01 半角アルファベットを対象にする。
 * - 0x02 全角アルファベットを対象にする。
 * - 0x04 アクセント付きラテン文字を対象にする。
 * - 0x08 キリル文字とギリシャ文字を対象にする。
 * - 0x10 対にならない文字も対象にする。
 * - 0x20 標準的な変換(ICU)を使う。Windows 10 Version 1903以降のみ。
 * 
 * @example
 * var a = "HankakuＺｅｎｋａｋｕ";
 * var b = toupper( a, 0x01 | 0x02 );
 * 
 * @comment
 * 参照：    
 * @see toupper
 * @see tolower
 * 
 * @returns
 * 大文字に変換された文字列を返します。
 */
declare function toupper(text: string, target_char_group_flag?: number): string;

/**
 * s
 * 
 * tolower文は、選択されたテキストを小文字に変換します。
 * 
 * @example
 * 
 * tolower();
 * 
 * @param target_char_group_flag
 * 指定しない場合、「半角アルファベット」と「全角アルファベット」が対象になります。    
 * （第１引数に文字列を指定する場合のtolower関数とは異なります）    
 * 指定する場合、以下の値のOR演算した値を指定できます。    
 * - 0x01 半角アルファベットを対象にする。
 * - 0x02 全角アルファベットを対象にする。
 * - 0x04 アクセント付きラテン文字を対象にする。
 * - 0x08 キリル文字とギリシャ文字を対象にする。
 * - 0x10 対にならない文字も対象にする。
 * - 0x20 標準的な変換(ICU)を使う。Windows 10 Version 1903以降のみ。
 * 
 * @example
 * selectline();
 * tolower(0x01 | 0x02);
 * 
 * @comment
 * 参照：    
 * @see tolower 
 * @see toupper
 * 
 * @returns
 * 常に0を返しますが、返り値は意味を持ちません。
 */
declare function tolower(target_char_group_flag?: number): 0;

/**
 * f
 * 
 * tolower関数は、文字列を小文字に変換した文字列を返します。
 * 
 * @example
 * 
 * var a = tolower( "Hello" );
 * 
 * @param text
 * 文字列を指定します。
 * 
 * @param target_char_group_flag
 * 指定しない場合、「半角アルファベット」だけが対象になります。    
 * （第１引数に数値を指定する場合のtolower関数とは異なります）    
 * 指定する場合、以下の値のOR演算した値を指定できます。    
 * - 0x01 半角アルファベットを対象にする。
 * - 0x02 全角アルファベットを対象にする。
 * - 0x04 アクセント付きラテン文字を対象にする。
 * - 0x08 キリル文字とギリシャ文字を対象にする。
 * - 0x10 対にならない文字も対象にする。
 * - 0x20 標準的な変換(ICU)を使う。Windows 10 Version 1903以降のみ。
 * 
 * @example
 * var a = "HankakuＺｅｎｋａｋｕ";
 * var b = tolower( a, 0x01 | 0x02 );
 * 
 * @comment
 * 参照：    
 * @see tolower
 * @see toupper
 * 
 * @returns
 * 小文字に変換された文字列を返します。
 */
declare function tolower(text: string, target_char_group_flag?: number): string;

/**
 * s
 * 
 * tospace文は、「タブ⇒空白変換」を実行します。    
 * 範囲選択してから実行してください。    
 * １つのタブをいくつの空白に変換するかは、動作環境の設定に依存します。    
 * CSVモードのときは使えません。TSVモードのときは使えます。    
 * 
 * @returns
 * 空白に変換できたら１を返す、    
 * 変換できなかったら０を返す。
 */
declare function tospace(): number;

/**
 * s
 * 
 * totab文は、「空白⇒タブ変換」を実行します。    
 * 範囲選択してから実行してください。    
 * いくつの空白を１つのタブに変換するかは、動作環境の設定に依存します。    
 * TSV/CSVモードのときは使えません。
 * 
 * @returns
 * タブに変換できたら１を返す、    
 * タブに変換できなかったら０を返す。
 */
declare function totab(): number;

/**
 * s
 * 
 * tohankaku文は、「半角文字に変換」を実行します。    
 * 範囲選択してから実行してください。    
 * 
 * @returns
 * 半角文字に変換できたら１を返す、    
 * 変換できなかったら０を返す。
 */
declare function tohankaku(): number;

/**
 * s
 * 
 * tozenkakuhira文は、「全角ひらがなに変換」を実行します。    
 * 全角カタカナ，半角カタカナを、全角ひらがなに変換します。    
 * 範囲選択してから実行してください。    
 * 
 * @returns
 * 変換できたら１を返す、    
 * 変換できなかったら０を返す。
 */
declare function tozenkakuhira(): number;

/**
 * s
 * 
 * tozenkakukata文は、「全角カタカナに変換」を実行します。    
 * 全角ひらがな，半角カタカナを、全角カタカナに変換します。    
 * 範囲選択してから実行してください。    
 * 
 * @returns
 * 変換できたら１を返す、    
 * 変換できなかったら０を返す。
 */
declare function tozenkakukata(): number;

/**
 * s
 * 
 * capslockforgot文は、「CapsLockし忘れの是正」を実行します。    
 * 
 * @comment
 * 「CapsLockし忘れの是正」とは、    
 * CapsLockし忘れたまま入力した文字列を大文字/小文字変換し、    
 * さらにCapsLockのON/OFFも切り替えます。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function capslockforgot(): number;

/**
 * s
 * 
 * capslockforgot文は、「再変換」を実行します。    
 * 
 * @comment
 * 「再変換」とは、
 * かな漢字変換しわすれの是正であり、    
 * 範囲選択した文字列を、再度かな漢字変換します。    
 * 範囲選択しない場合は、かな漢字変換をONにするのをし忘れたまま入力してしまった場合、    
 * 入力する前まで戻ってかな漢字変換をONにしてから入力したことにしてくれます。   
 * 
 * @see 再変換の使用例 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function imeconvforgot(): number;


/**
 * s
 * 
 * reopen文は、「再読み込み（最初からやり直し）」を実行します。    
 * 
 * @comment
 * 再読み込み（最初からやり直し）とは、    
 * 現在の内容を破棄し、もう一度ファイルから読み込みなおします。    
 * 危険なコマンドなので一度確認をします。
 *
 * @returns
 * 再読み込みした場合は１を返す、    
 * ファイル名がまだ付いていない場合でテキスト内容が変更されている場合、再読み込みはせず、０を返す。    
 * ファイル名が付いている場合で、テキスト内容が変更されている場合、ダイアログが出た後、１を返す。
 */
declare function reopen(): number;

★★★ filter ★ function() { var m = "filter"; if (arguments.length >= 4) { eval(fs); } else { eval(st); } return r; }

/**
 * k
 * 
 * 現在実行中のexecjs文によって呼ばれたjsファイルのファイル名をフルパスで表します。
 * execjs文による実行中でない場合はcurrentmacrofilenameと同じです。
 * すべて小文字です。
 * 
 * @example
 * // execjsにより実行されている最中ならば、{filename, directory}のそれぞれのプロパティに有効な値が入る
 * function get_including_by_execjs() {
 *     var cjf = hidemaruGlobal.currentjsfilename();
 *     var cmf = hidemaruGlobal.currentmacrofilename();
 *     if (cjf != cmf) {
 *         var dir = cjf.replace(/[\/\\][^\/\\]+?$/, "");
 *         return {
 *             "filename": cjf,
 *             "directory": dir
 *         };
 *     }
 *     return {};
 * }
 * 
 * @returns
 * execjs文による実行中なら、実行中のファイルのフルパスを文字列で返す。    
 * そうでない場合は、currentmacrofilenameと同じ文字列を返す。
 */
declare function currentjsfilename(): string;

/**
 * s
 * 
 * filtermenu文は、秀丸の「変換メニュー」を表示します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function filtermenu(): number;

/**
 * autocomplete文は、単語補完を実行します。
 * 
 * @example
 * autocomplete(-1, -1, -1, "");
 * 
 * @param complete_mode    
 * 動作を指定します。    
 * - -1 単語補完（同期リスト）
 * - 0 単語補完（非同期リスト、マクロは中断）
 * - 1～9 単語補完候補1～9
 * - 10～ 単語補完候補10～（V8.30以降）
 * 
 * @param complete_resource    
 * 補完の情報元の検索対象指定します。    
 * 以下の値の論理和です。    
 * - -1を指定するとファイルタイプ別の設定に従います。
 * - 0x00000001 現在編集中のテキスト
 * - 0x00000002 辞書
 * - 0x00000004 辞書の種類＝行単位
 * - 0x00000010 強調表示定義
 * - 0x00000020 tagsファイル
 * - 0x00000040 直前の秀丸エディタ
 * - 0x00000080 クリップボード
 * - 0x00000100 クリップボード履歴
 * - 0x00000200 ファイル名
 * 
 * @param complete_method    
 * 検索方法を指定します。    
 * 以下の値の論理和です。    
 * - -1を指定するとファイルタイプ別の設定に従います。
 * - 0x00000000 大文字/小文字の区別：標準
 * - 0x00000001 大文字/小文字の区別：区別しない
 * - 0x00000002 大文字/小文字の区別：候補だけ区別
 * - 0x00000003 大文字/小文字の区別：候補も入力も区別
 * - 0x00000000 優先順位：標準
 * - 0x00000010 優先順位：カーソルから近い順
 * - 0x00000020 優先順位：アルファベット順
 * - 0x00000030 優先順位：長い文字順
 * - 0x00000050 優先順位：辞書優先
 * - 0x00000000 単語の種類：標準
 * - 0x00000100 単語の種類：一般的な単語
 * - 0x00000200 単語の種類：ドットシンタックス
 * - 0x00000300 単語の種類：HTML/XML
 * - 0x00000F00 単語の種類：カスタム
 * - 0x00001000 単語の途中も検索
 * - 0x00002000 候補が１つの場合決定
 * - 0x00004000 「記号とより多くの単語」を対象としない
 * - 0x00008000 全ての単語
 * - 0x00000000 日本語：なし
 * - 0x00010000 日本語：単語・熟語
 * - 0x00020000 日本語：単語・熟語（自動対応）
 * - 0x00030000 日本語：文
 * - 0x00040000 日本語：文（自動対応）
 * - 0x00100000 リアルタイム入力
 * 
 * @param complete_dictionary    
 * 辞書ファイルを指定します。(ワイルドカード可)    
 * 
 * @comment    
 * パラメータを省略するとファイルタイプ別の設定に従います。    
 *     
 * パラメータ１の動作に 0 を指定するか何も指定しないと、マクロは中断し、通常の単語補完コマンドを実行した後と同じ状態になります。    
 * この状態は、単語補完のリストが出ているのと同時にほとんど操作が可能なため、マクロを続行することはできません。    
 *     
 * 動作に -1 を指定すると、単語補完のリストを出し、リストを選択するかキャンセルするとマクロの続きを続行します。    
 * この状態は、単語補完コマンドで実行したときとは違い、ほとんどの操作は不可能で、候補を選ぶかキャンセルするかぐらいしかできません。    
 * このとき、返り値には補完した文字列の位置をカーソル位置からの相対位置で返します。    
 * 返り値の上位ワードはカーソル位置から補完した文字列先頭までの距離、下位ワードはカーソル位置から補完した文字列最後までの距離が入ります。    
 * 下位ワードは候補から選んでEnterすると0ですが、候補から選んで続けて文字を入力すると1以上になることがあります。    
 * 返り値が0の場合はキャンセルです。    
 * テンプレートの項目は、候補には出ないようになります。    
 *     
 * 動作に 1 以上を指定した場合は、候補から決定し、マクロも続行します。    
 * ただし、テンプレートの項目の場合は、サポートされていません。    
 * 
 * @example 
 * var ret = autocomplete(-1);
 * var c1 = (ret & 0xffff0000) / 0x10000;
 * var c2 = ret & 0x0000ffff;
 * message(gettext2(column() - c1, lineno(), column() - c2, lineno());
 * 
 * @returns
 * 返り値は、同期で動作しているときの詳細情報を返します。
 */
declare function autocomplete(complete_mode?: number, complete_resource?: number, complete_method?: number, complete_dictionary?: string): number;

/**
 * s
 * 
 * form文は、「整形」を実行します。
 * 
 * @comment
 * 整形とは、
 * 行が整形ラインを超えている場合、整形ラインの桁数に改行を入れます。    
 * 範囲選択されていない場合は、カーソルがある行が対象になります。    
 * 範囲選択されている場合は、範囲を含む行が対象になります。範囲は必ず行単位で処理されます。
 * 
 * @returns
 * 返り値は意味を持ちません。    
 * 整形しなかったとしても１が返ってくる。    
 * 上書き禁止などの時は０が返ってくる。
 */
declare function form(): number;

/**
 * s
 * 
 * unform文は、「連結」を実行します。
 * 
 * @comment
 * 連結とは、
 * 整形ラインの位置以降に改行がある場合、改行を削除して次の行と連結します。    
 * 範囲選択されていない場合は、実行されません。    
 * 範囲選択されている場合は、範囲を含む行が対象になります。範囲は必ず行単位で処理されます。    
 * 
 * @returns
 * 返り値は意味を持ちません。    
 * 整形しなかったとしても１が返ってくる。    
 * 上書き禁止などの時は０が返ってくる。
 */
declare function unform(): number;

/**
 * s
 * 
 * showformline文は、「整形ラインを表示」を実行します。
 * 
 * @comment
 * 整形ラインを表示とは、
 * 整形,連結コマンドで使われる整形ラインを表示します。    
 * ルーラーを表示している場合は、ルーラー上のつまみをドラッグして整形ラインを移動できます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showformline(): number;

/**
 * s
 * 
 * clearundobuffer文は、「やり直しバッファのクリア」を実行します。
 * 
 * @comment
 * やり直しバッファのクリアとは、
 * やり直しバッファをクリアして、その時点からのやり直しをできない状態にします。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function clearundobuffer(): number;

/**
 * s
 * 
 * template文は、「テンプレート」を実行します。    
 * 
 * @param filepath
 * filepathを省略した場合、テンプレートの設定で指定された場所からテンプレートの一覧を出します。    
 * パラメータにファイル名を指定すると、テンプレートファイルとして挿入します。    
 * 
 * @comment
 * autocomplete(0);と同様に実行後マクロは中断します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function template(filepath?: string): number;

/**
 * s
 * 
 * find1文は、検索ダイアログを出します。    
 * このfind1は秀丸マクロのfind文のことです。    
 * 
 * @returns
 * ダイアログで検索をして、成功(=ヒット)した場合は1を返す。    
 * ダイアログで検索をして、失敗(=ヒットせず)した場合は0を返す。    
 * ダイアログでキャンセルした場合は -2 を返す。
 */
declare function find1(): number;

/**
 * s
 * 
 * find2文は、検索ダイアログを出します。    
 * - searchbufferで得られる検索文字列を利用
 * - searchoptionで得られるオプション状態を利用
 * - find2文の直前にforceinselect文が実行されていれば、その指定が有効となります。    
 * 
 * @comment
 * 参照：
 * @see searchbuffer
 * @see searchoption
 * @see forceinselect
 * 
 * @returns
 * ダイアログで検索をして、成功(=ヒット)した場合は1を返す。    
 * ダイアログで検索をして、失敗(=ヒットせず)した場合は0を返す。    
 * ダイアログでキャンセルした場合は -2 を返す。
 */
declare function find1(): number;

/**
 * s
 * 
 * findword文は、検索ダイアログ（単語の検索）を出します。    
 * 
 * @returns
 * ダイアログで検索をして、成功(=ヒット)した場合は1を返す。    
 * ダイアログで検索をして、失敗(=ヒットせず)した場合は0を返す。    
 * ダイアログでキャンセルした場合は -2 を返す。
 */
declare function findword(): number;

/**
 * s
 * 
 * searchdialog文は、検索ダイアログを出して検索します。
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @example
 * searchdialog("文字");
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * - word(0x00000001)    
 * wordを指定すると、単語検索になります。
 * 
 * - casesense(0x00000002), nocasesense(0x00000000)    
 * casesenseは大文字／小文字の区別をするという意味です。    
 * nocasesenseは大文字／小文字の区別をしません。    
 * casesenseとnocasesenseのいずれも指定しない場合は、    
 * 正規表現(regular)の指定があるときは自動的にcasesenseの指定になり、    
 * 正規表現の指定がないときは自動的にnocasesenseの指定になります。    
 * 
 * - regular(0x00000010), noregular(0x00000000)    
 * regularを付けると正規表現で検索します。    
 * regularを付けて、casesenseとnocasesenseのいずれも指定しない場合は、    
 * 自動的にcasesense相当（大文字/小文字の区別をする）になります。    
 * noregularを付けると正規表現でない通常の検索をします。    
 * noregularを付けて、casesenseとnocasesenseのいずれも指定しない場合は、    
 * 自動的にnocasesense相当（大文字/小文字の区別をしない）になります。
 * regularとnoregularのいずれも指定しない場合は、    
 * あいまい検索(fuzzy)の指定があるときは自動的にregularの指定になり、    
 * あいまい検索の指定がないときは自動的にnoregularの指定になります。
 * 
 * - fuzzy(0x00000020)    
 * fuzzyを付けるとあいまい検索をします。    
 * fuzzyを付けて、regularとnoregularのいずれも指定しない場合は、自動的にregular相当（正規表現あり）になります。    
 * fuzzyを付けず、regularとnoregularのいずれも指定しない場合は、自動的にnoregular相当（正規表現なし）になります。    
 * 
 * - linknext(0x00000080)    
 * linknextを付けると次の秀丸エディタも続けて検索します。    
 * 
 * - hilight(0x00003800), nohilight(0x00002000)    
 * hilightを付けると「検索文字列の強調」になります。    
 * nohilightを付けると「検索文字列の強調」が無効になります。    
 * 
 * - masknormal(0x00010000), maskcomment(0x00020000), maskifdef(0x00040000), maskscript(0x00080000), maskstring(0x00100000), masktag(0x00200000), maskonly(0x00400000)    
 * masknormalは、追加の条件の「普通の文字」です。    
 * maskcommentは、追加の条件の「コメント」です。    
 * maskifdefは、追加の条件の「#ifdef等の無効部分」です。    
 * maskscriptは、追加の条件の「スクリプト部分」です。    
 * maskstringは、追加の条件の「文字定数」です。    
 * masktagは、追加の条件の「HTML/XMLタグ」です。    
 * maskonlyを付けない場合は、追加の条件は「を除く」です。maskonlyを付けると「のみ」になります。    
 * 
 * - loop(0x01000000)    
 * loopを付けると「一周する」になります。    
 * 
 * - noclose(0x02000000)    
 * nocloseを付けると「検索したら閉じる」をOFFにします。（searchdialogのみ）    
 * 
 * - incolormarker(0x00000002)    
 * incolormarkerは、追加の条件の「指定の範囲/カラーマーカー内」を有効にします。    
 * 対象となる範囲は、settargetcolormarkerで指定します。    
 * 
 * @example
 * searchdialog("test", 0x00000001 | 0x00000002);
 * 
 * @comment
 * 検索文字列には上限があります。上限を超える可能性がある場合は事前に文字数をカウントして判断する必要があります。    
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see searchdown
 * @see searchdown2
 * @see 検索／置換文字列の上限について
 * 
 * searchdownは、カーソル位置の次の文字から検索を開始します。    
 * カーソル位置から検索するには、searchdown2を使います。    
 * 
 * 検索にヒットした後、選択されるか点滅表示になるかは動作環境によって違います。    
 * 違いを無くすにはsetcompatiblemode文を使います。    
 * 
 * searchdown等の文を使うと、検索ダイアログボックスの中の検索条件（大文字/小文字の区別、正規表現のON/OFF等）がマクロ内で実行した検索条件に書き換わってしまいます。    
 * マクロでsearchdown文などを使っても検索ダイアログの検索条件を変わらないようにするには、searchdown等を実行する前に、「setcompatiblemode 0x20000;」を実行する方法があります。    
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 * ダイアログでキャンセルした場合は -2 になります。    
 */
declare function searchdialog(search_text: string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * searchdownは、カーソル位置の次の文字から下検索をします。
 *
 * パラメータの意味はsearchdialog文と同じです。    
 * カーソル位置から検索するには、searchdownではなく、searchdown2を使います。    
 * 
 * @example
 * searchdown("文字");
 * 
 * @example
 * var flag_word = 0x00000001;
 * searchdown("abc", flag_word);
 * 
 * @param search_text 
 * 検索文字列を指定します
 * 
 * @param searchoption_flag 
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag 
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see searchdown2
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function searchdown(search_text: string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * searchdown2は、カーソル位置の文字から下検索をします。
 *
 * パラメータの意味はsearchdown文と同じです。    
 * カーソル位置の次の文字から検索するには、searchdown2ではなく、searchdownを使います。    
 * 
 * @example
 * searchdown("文字");
 * 
 * @example
 * var flag_word = 0x00000001;
 * searchdown2("abc", flag_word);
 * 
 * @param search_text 
 * 検索文字列を指定します
 * 
 * @param searchoption_flag 
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag 
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see searchdown
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function searchdown2(search_text: string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * searchupは、上検索をします。    
 * カーソルの位置にある単語も検索に含める場合は、searchupではなく、searchup2を使います。
 *
 * パラメータの意味はsearchdialog文と同じです。    
 * 
 * @example
 * searchup("文字");
 * 
 * @example
 * var flag_word = 0x00000001;
 * searchup("abc", flag_word);
 * 
 * @param search_text 
 * 検索文字列を指定します
 * 
 * @param searchoption_flag 
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag 
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see searchup2
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function searchup(search_text: string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * searchup2は、上検索をします。    
 * カーソルの位置から検索するため、カーソルの位置にある単語を検索に含めます。    
 * カーソルの位置にある単語を含みたくない場合、searchup2ではなく、searchupを使います。
 *
 * パラメータの意味はsearchdialog文と同じです。    
 * 
 * @example
 * searchup("文字");
 * 
 * @example
 * var flag_word = 0x00000001;
 * searchup("abc", flag_word);
 * 
 * @param search_text 
 * 検索文字列を指定します
 * 
 * @param searchoption_flag 
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag 
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see searchup
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function searchup2(search_text: string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * replace1文は、置換ダイアログを出します。
 * これは秀丸マクロのreplace文に相当します。
 * 
 * キー割り当ての「置換...」コマンドを実行するのと同じように、    
 * カーソル位置や範囲選択の文字列を検索文字列として拾うか、    
 * 動作環境の動作に従って、置換ダイアログを出します。    
 * searchbufferを検索文字列にするには、replace1ではなく、replacedialog文を使います。    
 *
 * @example
 * replace1();
 * 
 * @comment
 * 参照：
 * @see replacedialog
 * 
 * @returns
 * 成功した場合は、resultは置換した個数を返す。
 * ダイアログでキャンセルした場合は -2 を返す。
 */
declare function replace1(): number;

/**
 * s
 * 
 * replacedialog文は、置換ダイアログを出して置換します。
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replacedialog("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * - word(0x00000001)    
 * wordを指定すると、単語検索になります。
 * 
 * - casesense(0x00000002), nocasesense(0x00000000)    
 * casesenseは大文字／小文字の区別をするという意味です。    
 * nocasesenseは大文字／小文字の区別をしません。    
 * casesenseとnocasesenseのいずれも指定しない場合は、    
 * 正規表現(regular)の指定があるときは自動的にcasesenseの指定になり、    
 * 正規表現の指定がないときは自動的にnocasesenseの指定になります。    
 * 
 * - regular(0x00000010), noregular(0x00000000)    
 * regularを付けると正規表現で検索します。    
 * regularを付けて、casesenseとnocasesenseのいずれも指定しない場合は、    
 * 自動的にcasesense相当（大文字/小文字の区別をする）になります。    
 * noregularを付けると正規表現でない通常の検索をします。    
 * noregularを付けて、casesenseとnocasesenseのいずれも指定しない場合は、    
 * 自動的にnocasesense相当（大文字/小文字の区別をしない）になります。
 * regularとnoregularのいずれも指定しない場合は、    
 * あいまい検索(fuzzy)の指定があるときは自動的にregularの指定になり、    
 * あいまい検索の指定がないときは自動的にnoregularの指定になります。
 * 
 * - fuzzy(0x00000020)    
 * fuzzyを付けるとあいまい検索をします。    
 * fuzzyを付けて、regularとnoregularのいずれも指定しない場合は、自動的にregular相当（正規表現あり）になります。    
 * fuzzyを付けず、regularとnoregularのいずれも指定しない場合は、自動的にnoregular相当（正規表現なし）になります。    
 * 
 * - linknext(0x00000080)    
 * linknextを付けると次の秀丸エディタも続けて検索します。    
 * 
 * - hilight(0x00003800), nohilight(0x00002000)    
 * hilightを付けると「検索文字列の強調」になります。    
 * nohilightを付けると「検索文字列の強調」が無効になります。    
 * 
 * - masknormal(0x00010000), maskcomment(0x00020000), maskifdef(0x00040000), maskscript(0x00080000), maskstring(0x00100000), masktag(0x00200000), maskonly(0x00400000)    
 * masknormalは、追加の条件の「普通の文字」です。    
 * maskcommentは、追加の条件の「コメント」です。    
 * maskifdefは、追加の条件の「#ifdef等の無効部分」です。    
 * maskscriptは、追加の条件の「スクリプト部分」です。    
 * maskstringは、追加の条件の「文字定数」です。    
 * masktagは、追加の条件の「HTML/XMLタグ」です。    
 * maskonlyを付けない場合は、追加の条件は「を除く」です。maskonlyを付けると「のみ」になります。    
 * 
 * - loop(0x01000000)    
 * loopを付けると「一周する」になります。    
 * 
 * - noclose(0x02000000)    
 * nocloseを付けると「検索したら閉じる」をOFFにします。（searchdialogのみ）    
 * 
 * - incolormarker(0x00000002)    
 * incolormarkerは、追加の条件の「指定の範囲/カラーマーカー内」を有効にします。    
 * 対象となる範囲は、settargetcolormarkerで指定します。    
 * 
 * - ask(0x00000008)
 * askを指定すると置換の前に確認が入ります。    
 * askによって確認にダイアログが出るとき、どのようにして確認ダイアログが閉じられたかをgetresultexで知ることができます。    
 * linknextとaskを同時に指定することはできません。
 * 
 * @example
 * replacedialog("test", "host", 0x00000001 | 0x00000002);
 * 
 * @comment
 * 検索文字列には上限があります。上限を超える可能性がある場合は事前に文字数をカウントして判断する必要があります。    
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 置換した個数が返ります。    
 * ダイアログでキャンセルした場合は -2 になります。    
 */
declare function replacedialog(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/*
replaceup, replacedownは、成功した場合はresult1になり、失敗した場合は0になります。
ダイアログでキャンセルした場合は-2になります。（V6.50以降）
*/

/**
 * s
 * 
 * replacedown文は、カーソル位置から下方向置換をします。
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replacedown("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @example
 * replacedown("test", "host", 0x00000001 | 0x00000002);
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function replacedown(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * replaceup文は、カーソル位置から上方向置換をします。
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replaceup("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @example
 * replaceup("test", "host", 0x00000001 | 0x00000002);
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 成功した場合は返り値は1になります。    
 * 失敗した場合は返り値は0になります。    
 */
declare function replaceup(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * replaceall文はは普通に全置換を実行します。    
 * 普通ではなく高速に実行したい場合は、replaceallfastを利用してください。    
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replaceall("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @example
 * replaceall("test", "host", 0x00000001 | 0x00000002);
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see replaceallfast
 * @see getresultex(14)
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 置換した個数が返ります。    
 * 途中で中断された場合はresultは-1になります。    
 * 
 * 置換が終了しても、「何個置換しました」のメッセージは表示されず、代わりに返り値に置換した個数が入ります。    
 * linknext(0x00000080)を第２引数に付けて置換した場合、resultには現在の秀丸エディタで置換した数しか入りません。    
 * 他の秀丸エディタでも置換した総数を取得するにはgetresultex(14)を使います。
 */
declare function replaceall(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * replaceallfast文はは高速に全置換を実行します。    
 * 高速ではなく普通の速度で実行したい場合は、replaceallを利用してください。    
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replaceallfast("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @example
 * replaceallfast("test", "host", 0x00000001 | 0x00000002);
 * 
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see getresultex(14)
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 置換した個数が返ります。    
 * 途中で中断された場合はresultは-1になります。    
 * 
 * 置換が終了しても、「何個置換しました」のメッセージは表示されず、代わりに返り値に置換した個数が入ります。    
 * linknext(0x00000080)を第２引数に付けて置換した場合、resultには現在の秀丸エディタで置換した数しか入りません。    
 * 他の秀丸エディタでも置換した総数を取得するにはgetresultex(14)を使います。
 */
declare function replaceallfast(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * replaceallquick文は、クイック全置換を行います。    
 * 利用方法は、replaceall, replaceallfastや、replaceup, replacedown, replacedown文とほぼ同じです。    
 * 
 * @param search_text
 * 検索文字列を指定します
 * 
 * @param replace_text
 * 置換文字列を指定します。
 * 
 * @example
 * var ret = replaceallquick("検索文字", "置換文字");
 * if( !ret ) { message("見つかりませんでした。"); }
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @example
 * replaceallquick("test", "host", 0x00000001 | 0x00000002);
 * 
 * @comment
 * クイック全置換でサポートしていないオプションなどは、replaceallquickでも同様にサポートしていません。    
 * replaceall等と違いは以下のものがあります。    
 * 
 * - 置換後のカーソル位置が通常の全置換とは違います。     
 * - マーク、編集マーク、折りたたみ、カラーマーカーは保持されません。（編集マークは全行に付きます）     
 * - 「追加の条件」、\(タグ番号,関数名)による変換モジュール指定、「次の秀丸エディタも続けて置換」、複数選択はできません。     
 * - 正規表現に以下の処理の違いがあります。    
 * 置換後のテキストが再び検索対象にはならず、元のテキストのみが検索対象になります。    
 * 例えば「^a」を「a\n」に置換で、対象テキストが「aaaaa」の場合、行頭の１つだけになります。    
 * 「\n」や「[^...]」で改行がヒットする可能性がある場合は全行が対象になります。(?#maxlines:)や(?#fulllinematch)の指定は無視されます。    
 * - 「選択した範囲」は行単位ではなく文字単位になり、置換後は「選択した範囲」で動作中の範囲にはならず、通常のままになります。    
 * - 改行コードが混在する場合、全ての行で統一された改行コードになります。    
 *     
 * 注意：多くの場合は高速になりますが、検索文字列に改行を含んで長さが変わるような正規表現の場合、    
 * 全行がとても長い一行と同じようなことになり、逆に遅くなる場合があります。    
 * 
 * @comment
 * 参照：
 * @see searchoption
 * @see searchoption2
 * @see getresultex(14)
 * @see getresultex(15)
 * @see 検索／置換文字列の上限について
 * 
 * @returns
 * 置換した個数が返ります。    
 * 途中で中断された場合はresultは-1になります。    
 * 
 * 置換が終了しても、「何個置換しました」のメッセージは表示されず、代わりに返り値に置換した個数が入ります。    
 * linknext(0x00000080)を第２引数に付けて置換した場合、resultには現在の秀丸エディタで置換した数しか入りません。    
 * 他の秀丸エディタでも置換した総数を取得するにはgetresultex(14)を使います。
 */
declare function replaceallquick(search_text: string, replace_text:string, searchoption_flag?: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * finddown文は、「下候補」を実行します。    
 * 
 * finddownは、カーソル位置の次の文字から検索を開始します。    
 * カーソル位置から検索するには、finddown2を使います。    
 * 
 * @example
 * finddown();
 * 
 * @comment
 * searchoptionの置換フラグがOFFのとき（replacedownをした直後）は検索し、ONのときは置換します。    
 * findup, finddownは、コマンドの上候補,下候補と完全に同じ動作ではありません。    
 * 
 * 検索にヒットした後、選択されるか点滅表示になるかは動作環境によって違います。    
 * 違いを無くすにはsetcompatiblemode文を使います
 * 
 * @example
 * var casesense = 0x00000002;
 * var hilight = 0x00003800;
 * searchdown("検索文字列", casesense|hilight);
 * // 上と同じ処理として
 * 
 * var casesense = 0x00000002;
 * var nohilight = 0x00002800;
 * var option = casesense|nohilight|(searchoption() & 0x0740); // grep用のオプションを維持
 * setsearch("検索文字列", option);  
 * finddown();
 * hilightfound(1);
 * 
 * @comment
 * 参照：
 * @see findup
 * @see setsearch
 * @see hilightfound
 * 
 * @returns
 * 成功した場合は、0以外にを返す。
 * 失敗した場合は、0を返す。
 */
declare function finddown(): number;

/**
 * finddown文2は、「下候補」を実行します。    
 * 
 * カーソル位置から検索を開始するバージョンです。    
 * 
 * @example
 * finddown2();
 * 
 * @comment
 * searchoptionの置換フラグがOFFのとき（replacedownをした直後）は検索し、ONのときは置換します。    
 * findup, finddownは、コマンドの上候補,下候補と完全に同じ動作ではありません。    
 * 
 * 検索にヒットした後、選択されるか点滅表示になるかは動作環境によって違います。    
 * 違いを無くすにはsetcompatiblemode文を使います
 * 
 * @example
 * var casesense = 0x00000002;
 * var hilight = 0x00003800;
 * searchdown("検索文字列", casesense|hilight);
 * // 上と同じ処理として
 * 
 * var casesense = 0x00000002;
 * var nohilight = 0x00002800;
 * var option = casesense|nohilight|(searchoption() & 0x0740); // grep用のオプションを維持
 * setsearch("検索文字列", option);  
 * finddown2();
 * hilightfound(1);
 * 
 * @comment
 * 参照：
 * @see findup
 * @see setsearch
 * @see hilightfound
 * 
 * @returns
 * 成功した場合は、0以外にを返す。
 * 失敗した場合は、0を返す。
 */
declare function finddown2(): number;

/**
 * s
 * 
 * findup文は、「上候補」を実行します。    
 * 
 * @example
 * findup();
 * 
 * @comment
 * searchoptionの0x00000004（置換かどうか）がOFFのときは検索し、ONのときは置換します。    
 * （searchdown等の検索をした後は0x00000004はOFFになっています。replacedown等の置換をした後は0x00000004がONになっています。）    
 * 
 * findup, finddownは、コマンドの上候補,下候補と完全に同じ動作ではありません。    
 * 
 * 検索にヒットした後、選択されるか点滅表示になるかは動作環境によって違います。    
 * 違いを無くすにはsetcompatiblemode文を使います
 * 
 * @example
 * var casesense = 0x00000002;
 * var hilight = 0x00003800;
 * searchup("検索文字列", casesense|hilight);
 * // 上と同じ処理として
 * 
 * var casesense = 0x00000002;
 * var nohilight = 0x00002800;
 * var option = casesense|nohilight|(searchoption() & 0x0740); // grep用のオプションを維持
 * setsearch("検索文字列", option);  
 * findup();
 * hilightfound(1);
 * 
 * @comment
 * 参照：
 * @see finddown
 * @see setsearch
 * @see hilightfound
 * 
 * @returns
 * 成功した場合は、0以外にを返す。
 * 失敗した場合は、0を返す。
 */
declare function findup(): number;

/**
 * s
 * 
 * findup2文は、「上候補」を実行します。    
 * カーソル位置から検索を開始するバージョンです。    
 * 
 * @example
 * findup2();
 * 
 * @comment
 * searchoptionの0x00000004（置換かどうか）がOFFのときは検索し、ONのときは置換します。    
 * （searchdown等の検索をした後は0x00000004はOFFになっています。replacedown等の置換をした後は0x00000004がONになっています。）    
 * 
 * findup, finddownは、コマンドの上候補,下候補と完全に同じ動作ではありません。    
 * 
 * 検索にヒットした後、選択されるか点滅表示になるかは動作環境によって違います。    
 * 違いを無くすにはsetcompatiblemode文を使います
 * 
 * @example
 * var casesense = 0x00000002;
 * var hilight = 0x00003800;
 * searchup("検索文字列", casesense|hilight);
 * // 上と同じ処理として
 * 
 * var casesense = 0x00000002;
 * var nohilight = 0x00002800;
 * var option = casesense|nohilight|(searchoption() & 0x0740); // grep用のオプションを維持
 * setsearch("検索文字列", option);  
 * findup2();
 * hilightfound(1);
 * 
 * @comment
 * 参照：
 * @see finddown
 * @see setsearch
 * @see hilightfound
 * 
 * @returns
 * 成功した場合は、0以外にを返す。
 * 失敗した場合は、0を返す。
 */
declare function findup2(): number;

/**
 * s
 * 
 * getsearch文は、カーソル位置の単語を検索文字列として取り込みます。    
 * 
 * 範囲選択されている場合は、範囲選択の内容を取り込みます。    
 * 検索文字列の強調がされている場合、検索文字列の強調も更新されます。    
 * 
 * @example
 * getsearch;
 * 
 * @comment
 * 参照：
 * @see setsearch 
 * @see hilightfound
 * 
 * @returns
 * 成功した場合は、resultは0以外になります。    
 * 失敗した場合は、resultは0になります。    
 */
declare function getsearch(): number;

/**
 * s
 * 
 * setsearch文は、秀丸エディタが内部で保持している検索文字列と検索オプションの内容を設定します。    
 * 
 * @param search_text
 * 検索文字列を指定します。
 * 
 * @param searchoption_flag
 * searchoption相当の検索オプションを指定します。
 * 
 * @param searchoption2_flag
 * searchoption2相当の検索オプションを指定します。    
 * searchoption2相当の値を設定するには、searchoptionで0x80000000のビットを立てる必要があります。    
 * 
 * @comment
 * 検索文字列と検索オプションは、「上候補」や「下候補」などで参照され、検索が終わった後も保持しています。    
 * 例えば、setsearch文で設定してからfinddownを実行すると、searchdownを実行したのと同じ結果が得られます。    
 * setsearchと逆に、検索バッファの内容を参照するには、searchbuffer, searchoption, searchoption2という値を使います。    
 * 
 * マクロの中でsearchdown等を使うと、検索文字列と検索オプションの内容が書き換えられてしまいます。    
 * そうすると、次に上候補/下候補コマンドを使った時に予期しない動作をしてしまうことがあります。    
 * そのため、マクロ実行開始時に値を記憶し、マクロが終わるときにsetsearchを使って復元させることができます。    
 * 
 * @example
 * var word = 0x00000001;
 * var casesense = 0x00000002;
 * setsearch( "test", (word|casesense) );
 * finddown();
 * 
 * @example
 * var s = searchbuffer();
 * var f = searchoption();
 * var f2 = searchoption2();
 * var r = replacebuffer();
 * …
 * 処理本体…
 * …
 * setsearch(s, f, f2);
 * setreplace(r);
 * 
 * @comment
 * 「setcompatiblemode(0x20000);」を最初に実行しておくと、    
 * 上記の保存して復元するのと同じことを簡単にする方法もあります。
 * 
 * @example
 * setcompatiblemode(0x20000);
 * …
 * 処理本体…
 * …
 * 
 * @comment
 * 「検索文字列の強調」を変更する場合は、searchoption相当の値（パラメータ２）の0x00002000を同時にセットしないといけません。    
 * 例えば、0x00000000を指定すると、「検索文字列の強調」の状態はONにもOFFにも変更されず、維持されます。    
 * 0x00002000（つまり0x00002000 | 0x00000000 | 0x00000000）を指定すると、検索文字列の強調はOFFになります。    
 * 0x00003800（つまり0x00002000 | 0x00001000 | 0x00000800）を指定すると、検索文字列の強調はONになります。（検索時，置換時とも変更する場合）    
 * 実際に検索文字列の強調をさせるには、hilightfound文で行います。    
 * 
 * searchoption2相当の値（パラメータ３）を設定するには、searchoption（パラメータ２）で0x80000000のビットを立てる必要があります。
 * 
 * 「選択した範囲」に相当する値はありません。    
 * forceinselectを使って「選択した範囲」の指定をすることができます。    
 * 
 * 検索文字列には上限があります。上限を超える可能性がある場合は事前に文字数をカウントして判断する必要があります。
 * 
 * @comment
 * 参照：    
 * @see 検索／置換文字列の上限について
 * @see searchoption
 * @see searchoption2
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setsearch(search_text: string, searchoption_flag: number, searchoption2_flag?: number): number;

/**
 * s
 * 
 * gosearchstarted文は、「検索開始位置へ戻る」を実行します。
 * 
 * @returns
 * 成功した場合は、resultは0以外になります。    
 * 失敗した場合は、resultは0になります。    
 */
declare function gosearchstarted(): number;

/**
 * s
 * 
 * setreplace文は、秀丸エディタが内部で保持している置換文字列の内容を設定します。
 * 
 * @param replace_text
 * 置換文字列を指定します
 * 
 * @example
 * setreplace("置換文字列");
 * 
 * @comment
 * 例えば、setsearchで検索文字列の内容と、検索オプションの0x00000004（置換を有効）にして、    
 * setreplaceで置換バッファの内容を設定してからfinddownを実行すると、replacedownを実行したのと同じ結果が得られます。    
 * 
 * setreplaceと逆に、置換バッファの内容を参照するには、replacebufferという値を使います。    
 * 
 * @example
 * var s = searchbuffer();
 * var f = searchoption();
 * var f2 = searchoption2();
 * var r = replacebuffer();
 * …
 * 処理本体…
 * …
 * setsearch(s, f, f2);
 * setreplace(r);
 * 
 * @comment
 * 検索/置換文字列には上限があります。    
 * 上限を超える可能性がある場合は事前に文字数をカウントして判断する必要があります。    
 * 
 * @comment
 * 参照：
 * @see 検索と置換文字列の上限について
 * 
 * @returns
 * 返ってくる値に意味はない。
 */
declare function setreplace(replace_text: string): number

/**
 * s
 * 
 * setsearchhist文は、検索ダイアログの検索文字列のヒストリを設定します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 検索ヒストリの最大は100個（0～99まで）です。    
 * 
 * @param search_text
 * ヒストリとして設定したい文字列を指定します。    
 * 
 * @param is_pin
 * 何も指定しないか 0 を指定します。
 * 
 * @example
 * setsearchhist(0, "あいうえお");
 * 
 * @comment
 * 参照：    
 * @see getsearchhist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setsearchhist(history_ix: number, search_text: string, is_pin?: 0): number

/**
 * s
 * 
 * setsearchhist文は、検索ダイアログの検索文字列のヒストリを設定します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 検索ヒストリの最大は100個（0～99まで）です。    
 * 
 * @param pin_status
 * ヒストリに常駐させるかどうかの指定になります。    
 * "0" を指定するとヒストリに常駐OFF、"1" を指定するとヒストリに常駐ONになります。
 * 
 * @param is_pin
 * 1 を指定します。
 * 
 * @example
 * setsearchhist(0, "1", 1);
 * 
 * @comment
 * 参照：    
 * @see getsearchhist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setsearchhist(history_ix: number, pin_status: "0" | "1", is_pin: 1): number

/**
 * s
 * 
 * setsearchhist文は、検索ダイアログの検索文字列のヒストリを一斉削除します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 検索ヒストリの最大は100個（0～99まで）です。    
 * この指定の番号より1つ大きい番号以降のヒストリが削除されます。
 * 
 * @param noop
 * ""を指定します。
 * 
 * @param is_pin
 * 2 を指定します。
 * 
 * @example
 * setsearchhist(0, "", 2); // 検索ダイアログの検索文字列のヒストリを一斉削除
 * 
 * @comment
 * 参照：    
 * @see getsearchhist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setsearchhist(history_ix: number, noop: "", is_pin: 2): number

/**
 * s
 * 
 * setreplacehist文は、置換ダイアログの置換文字列のヒストリを設定します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 置換ヒストリの最大は20個（0～19まで）です。
 * 
 * @param replace_text
 * ヒストリとして設定したい文字列を指定します。    
 * 
 * @param is_pin
 * 何も指定しないか 0 を指定します。
 * 
 * @example
 * setreplacehist(0, "あいうえお");
 * 
 * @comment
 * 参照：    
 * @see getreplacehist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setreplacehist(history_ix: number, replace_text: string, is_pin?: 0): number

/**
 * s
 * 
 * setreplacehist文は、置換ダイアログの置換文字列のヒストリを設定します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 置換ヒストリの最大は20個（0～19まで）です。
 * 
 * @param pin_status
 * ヒストリに常駐させるかどうかの指定になります。    
 * "0" を指定するとヒストリに常駐OFF、"1" を指定するとヒストリに常駐ONになります。
 * 
 * @param is_pin
 * 1 を指定します。
 * 
 * @example
 * setreplacehist(0, "1", 1);
 * 
 * @comment
 * 参照：    
 * @see getreplacehist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setreplacehist(history_ix: number, pin_status: "0" | "1", is_pin: 1): number

/**
 * s
 * 
 * setreplacehist文は、置換ダイアログの置換文字列のヒストリを一斉削除します。    
 * 
 * @param history_ix    
 * 0から始まるヒストリの番号を指定します。   
 * 置換ヒストリの最大は20個（0～19まで）です。    
 * この指定の番号より1つ大きい番号以降のヒストリが削除されます。
 * 
 * @param noop
 * ""を指定します。
 * 
 * @param is_pin
 * 2 を指定します。
 * 
 * @example
 * setreplacehist(0, "", 2); // 置換ダイアログの置換文字列のヒストリを一斉削除
 * 
 * @comment
 * 参照：    
 * @see getreplacehist
 * 
 * @returns
 * 設定に成功した場合は、1
 * 失敗した場合は、０
 */
declare function setreplacehist(history_ix: number, noop: "", is_pin: 2): number

/**
 * setgrepfile文は、grepの「検索するファイル」の内容を設定します。
 * 
 * @param file_glob
 * grepの「検索するファイル」の内容を指定します。
 * 
 * @example
 * setgrepfile("*.txt");
 * 
 * @comment
 * 参照：
 * @see grepfilebuffer
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setgrepfile(file_glob: string): number;

/**
 * s
 * 
 * goupdatedown文は、「編集マークの下検索」を実行します。    
 * 
 * @returns
 * 次の編集箇所へと移動した場合には１を返す、    
 * そうでなければ０を返す。
 */
declare function goupdatedown(): number;

/**
 * s
 * 
 * goupdateup文は、「編集マークの前検索」を実行します。    
 * 
 * @returns
 * 前の編集箇所へと移動した場合には１を返す、    
 * そうでなければ０を返す。
 */
declare function goupdateup(): number;

/**
 * s
 * 
 * forceinselect文は、検索を明示的に「選択した範囲」として動作させます。    
 * 
 * @param select_mode
 * 「選択した範囲」として動作させるかどうかを指定します。    
 * - 1 を指定すると、検索ダイアログを出すときに明示的に「選択した範囲」にチェックしたり、下候補、上候補するときに明示的に「選択した範囲」で動作させます。    
 * - 2 を指定すると、文字単位になります。    
 * - 0 を指定すると、通常の動作になります。    
 * 
 * searchdown等の引数でinselectが指定できるものには有効ではありません。    
 * find文では有効ではありません。find2文では有効です。    
 * 
 * この文は、検索実行後には値を保持していません。検索のたびにこの文を呼んでいただく必要があります。    
 * 
 * @example
 * forceinselect(1);
 * 
 * @example
 * gofiletop();
 * down(5);
 * beginsel();
 * up(5);
 * endsel();
 * 
 * setsearch("n",0);
 * forceinselect(1);
 * finddown();
 * 
 * @comment
 * 参照：
 * @see escapeinselect
 * @see searchdown
 * @see find
 * @see find2
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function forceinselect(select_mode: number): number;

/**
 * s
 * 
 * clearupdates文は、「編集マークのクリア」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function clearupdates(): number;

/**
 * s
 * 
 * grepdialog文は、「grepの実行...」のダイアログボックスを出します。    
 * 
 * 通常の「grepの実行...」コマンドを実行した動作とは違います。    
 * 現在の秀丸エディタが新規作成状態でない場合は新規に秀丸エディタが立ち上がります。    
 * 
 * @example
 * grepdialog();
 * 
 * @comment
 * 参照：
 * @see grep
 * @see grepdialog
 * @see grepdialog2
 * 
 * @returns
 * 通常は、０を返します。    
 * ダイアログでキャンセルした場合は -2 になります。
 */
declare function grepdialog(): number;


★★★ grep ★ function() { var m = "grep"; eval(st); return r; }

grepdialog2 ★ function() { var m = "grepdialog2"; eval(st); return r; }
localgrep ★ function() { var m = "localgrep"; eval(st); return r; }
grepreplace ★ function() { var m = "grepreplace"; eval(st); return r; }
grepreplacedialog2 ★ function() { var m = "grepreplacedialog2"; eval(st); return r; }


/**
 * s
 * 
 * escapeinselect文は、「選択した範囲」動作を取り消す。
 * 
 * @comment
 * 参照：    
 * @see forceinselect 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function escapeinselect(): number;

/**
 * s
 * 
 * hilightfound文は、検索文字列の強調を切り替えます。
 * 
 * @param is_on
 * 0 を指定すると強調オフ、    
 * 1 を指定すると強調オンになります。    
 * 省略すると、オンとオフを切り替えます。    
 * 
 * @comment
 * 参照：    
 * @see foundhilighting
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function hilightfound(is_on?: number): number;



★★★ colormarker ★ function() { var m = "colormarker"; eval(st); return r; }

/**
 * s
 * 
 * prevcolormarker文は、カラーマーカーで色付けされている前の場所に移動します。
 * 次のカラーマーカーに移動するにはnextcolormarker文を使います。    
 * 全ての引数を省略すると、カラーマーカーで色付けされている前の開始位置に移動します。    
 * 
 * @param target_flag 
 * 対象を指定します。以下の値をOR演算した値を指定します。    
 * - 0x01 カラーマーカーの開始位置
 * - 0x02 カラーマーカーの終了位置
 * - 0x04 ユーザーデータと一致するものを探す
 * - 0x08 カーソル位置を含めて検索する    
 * 省略すると0x01と同じです。
 * 
 * @param user_data 
 * ユーザーデータを指定します。    
 * 引数にtarget_flagに0x04が含まれる場合に使われます。    
 * 
 * @param layer_name 
 * レイヤー名を指定します。    
 * 指定したレイヤーに属するものだけに移動します。    
 * 省略すると、""の一時的なカラーマーカーと同じです。    
 * 
 * @example
 * prevcolormarker(0x01, 0, "");
 * 
 * @comment
 * 「一時的なカラーマーカー」のレイヤー名は""です。    
 * 検索の色付けは、findmarkerというキーワードを指定します。    
 * 比較結果のカラーマーカーは、diffというキーワードを指定します。    
 *
 * @comment
 * 参照：
 * @see nextcolormarker
 * @see findmarker
 * @see diff
 * 
 * @returns
 * 移動した場合は、0以外を返す。    
 * 移動しなかった場合は、0を返す。
 */
declare function prevcolormarker(target_flag?: number, user_data?: number, layer_name?: string): number;

/**
 * s
 * 
 * nextcolormarker文は、カラーマーカーで色付けされている次の場所に移動します。
 * 前のカラーマーカーに移動するにはprevcolormarker文を使います。    
 * 全ての引数を省略すると、カラーマーカーで色付けされている次の開始位置に移動します。    
 * 
 * @param target_flag 
 * 対象を指定します。以下の値をOR演算した値を指定します。    
 * - 0x01 カラーマーカーの開始位置
 * - 0x02 カラーマーカーの終了位置
 * - 0x04 ユーザーデータと一致するものを探す
 * - 0x08 カーソル位置を含めて検索する    
 * 省略すると0x01と同じです。
 * 
 * @param user_data 
 * ユーザーデータを指定します。    
 * 引数にtarget_flagに0x04が含まれる場合に使われます。    
 * 
 * @param layer_name 
 * レイヤー名を指定します。    
 * 指定したレイヤーに属するものだけに移動します。    
 * 省略すると、""の一時的なカラーマーカーと同じです。    
 * 
 * @example
 * nextcolormarker(0x01, 0, "");
 * 
 * @comment
 * 「一時的なカラーマーカー」のレイヤー名は""です。    
 * 検索の色付けは、findmarkerというキーワードを指定します。    
 * 比較結果のカラーマーカーは、diffというキーワードを指定します。    
 *
 * @comment
 * 参照：
 * @see prevcolormarker
 * @see findmarker
 * @see diff
 * 
 * @returns
 * 移動した場合は、0以外を返す。    
 * 移動しなかった場合は、0を返す。
 */
declare function nextcolormarker(target_flag?: number, user_data?: number, layer_name?: string): number;

/**
 * s
 * 
 * colormarkerdialog文は、「一時的なカラーマーカー...」コマンド相当のダイアログを表示します。    
 * 
 * @returns
 * OKしてカラーマーカーが付けられたときに1を返します。    
 * キャンセルされたときはresultに0を返します。    
 */
declare function colormarkerdialog(): number;

/**
 * s
 * 
 * deletecolormarker文は、範囲選択されている部分のカラーマーカーを消去します。
 * 
 * @param layer_name 
 * レイヤー名を指定します。    
 * パラメータが無い場合は、「一時的なカラーマーカー」のうち、範囲選択されている部分を消去します。    
 * レイヤー名を指定すると、指定したレイヤーの、範囲選択されている部分を消去します。
 * 
 * @example
 * var layer_name = "何かレイヤー名";
 * deletecolormarker(layer_name);
 * 
 * @comment
 * 「一時的なカラーマーカー」のレイヤー名は""です。    
 * 検索の色付けは、findmarkerというキーワードを指定します。    
 * 比較結果のカラーマーカーは、diffというキーワードを指定します。
 * 
 * @comment
 * 参照：    
 * @see colormarker
 * @see findmarker
 * @see diff
 * 
 * @param user_data 
 * ユーザーデータを指定します。    
 * ユーザーデータを指定すると、ユーザーデータに一致するものを全て消去します。    
 * ユーザーデータを指定しない場合は、範囲選択が対象になります。    
 * ユーザーデータが0の場合、bgn_column以降の引数を使って、開始行, 開始桁, 終了行, 終了桁を指定して、消去する範囲を明示指定できます。    
 *
 * @example
 * var layer = "レイヤー名";
 * var userdata = 2
 * deletecolormarkerall(layer, userdata);
 * 
 * @comment
 * ユーザーデータが0の場合、開始行, 開始桁, 終了行, 終了桁を指定して、消去する範囲を明示指定できます。    
 * lineno, column相当の行と桁で表します。
 * 
 * @param bgn_column 範囲の開始位置の桁位置を指定します。0から数えます。
 * 
 * @param bgn_lineno 範囲の開始位置の行番号を指定します。1から数えます。
 * 
 * @param end_column 範囲の終了位置の桁位置を指定します。0から数えます。
 * 
 * @param end_lineno 範囲の終了位置の行番号を指定します。1から数えます。
 * 
 * @example
 * var layer = "レイヤー名";
 * var lineno1 = 1;
 * var column1 = 3;
 * var lineno2 = 10;
 * var column2 = 30;
 * deletecolormarker(layer, 0, lineno1, column1, lineno2, column2);
 * 
 * @returns
 * 成功した場合は、0以外を返す。    
 * 失敗した場合は、0を返す。    
 */
declare function deletecolormarker(layer_name?: string, user_data?: number, bgn_column?: number, bgn_lineno?: number, end_column?: number, end_lineno?: number): number;

/**
 * s
 * 
 * deletecolormarkerall文は、カラーマーカーを全て消去します。
 * 
 * @param layer_name 
 * レイヤー名を指定します。    
 * 省略した場合は、「一時的なカラーマーカー」が対象になります。    
 * レイヤー名を指定すると、指定したレイヤーに属するものだけを消去します。
 * 「一時的なカラーマーカー」のレイヤー名は""です。    
 * 検索の色付けは、findmarkerというキーワードを指定します。    
 * 比較結果のカラーマーカーは、diff というキーワードを指定します。    

 * @comment
 * 参照：    
 * @see colormarker
 * @see findmarker
 * @see diff
 * 
 * @param user_data 
 * ユーザーデータを指定します。    
 * ユーザーデータを指定すると、ユーザーデータに一致するものを全て消去します。    
 * ユーザーデータを指定しない場合は、同じレイヤーの全てのカラーマーカーが対象になります。    
 * ユーザーデータに0は指定できません。
 *
 * @example
 * deletecolormarkerall();
 * 
 * @example
 * var layer = "レイヤー名";
 * var userdata = 2
 * deletecolormarkerall(layer, userdata);
 * 
 * @returns
 * 成功した場合は、0以外を返す。    
 * 失敗した場合は、0を返す。    
 */
declare function deletecolormarkerall(layer_name?: string, user_data?: number): number;

/**
 * s
 * 
 * selectcolormarker文は、カラーマーカーで色付けされている部分を全て選択します。（
 * 
 * @param layer_name 
 * レイヤー名を指定します。    
 * 省略するか、""とした場合は、「一時的なカラーマーカー」を対象にします。    
 * 検索の色付けは、findmarkerというキーワードを指定します。    
 * 比較結果のカラーマーカーは、diff というキーワードを指定します。    

 * @param user_data 
 * ユーザーデータを指定します。    
 * 0以外の値を指定すると、一致するユーザーデータのみを対象にします。    
 * 省略するか0の場合は、ユーザーデータを問わず対象にします。    
 * 
 * @example
 * selectcolormarker();
 * 
 * @example
 * var layer = "レイヤー名";
 * selectcolormarker(layer);
 * 
 * @example
 * var layer = "レイヤー名";
 * var userdata = 2
 * selectcolormarker(layer, userdata);
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @comment
 * 参照：    
 * @see colormarker
 * @see findmarker
 * @see diff
 * 
 * @returns
 * 成功時は0以外を返す。    
 * 失敗時は0を返す。
 */
declare function selectcolormarker(layer_name?: string, user_data?: number): number;

/**
 * s
 * 
 * selectallfound文は、「すべての候補を選択」を実行します。
 * 
 * @comment
 * 注意：複数選択対応のマクロは次のようにsetcompatiblemodeでマクロの互換モードを指定しておく必要があります。
 * 
 * @example
 * setcompatiblemode(0x00100000);
 * 
 * @returns
 * 成功した場合は、ヒットした個数を返す。    
 * 失敗した場合は、０を返す。    
 */
declare function selectallfound(): number;


colormarkerallfound ★ function() { var m = "colormarkerallfound"; eval(st); return r; }

/**
 * s
 * 
 * clearcolormarkerallfound文は、「すべての候補の色付けを消去」を実行します。    
 * 
 * 「すべての候補の色付け」コマンドで色付けされていたものを消去します。    
 * 
 * @returns
 * 
 */
declare function clearcolormarkerallfound(): number;

/**
 * s
 * 
 * foundlist文は、「すべて検索 - 一覧表示」のダイアログを表示します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function foundlist(): number;

/**
 * s
 * 
 * foundlistoutline文は、「すべて検索 - アウトラインに表示」のダイアログを表示します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function foundlistoutline(): number;

/**
 * findmarkerlist文は、「検索の色付け一覧...」コマンドによるダイアログの表示をします。    
 * 
 * @example
 * findmarkerlist();
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function findmarkerlist(): number;

/**
 * s
 * 
 * findmarkerlist文は、「検索の色付け一覧...」コマンドによる操作をします。    
 * 
 * @param marker_ix 
 * 0以上の値を指定すると、ダイアログを表示せず、    
 * 「検索の色付け一覧...」の0から数えた項目に対する操作をします。    
 * 
 * @param n_action
 * - 0を指定すると、指定した項目を再度色付けします。一覧の個数を超えている場合は返り値は0になります。
 * - 1を指定すると、指定した項目を消去します。一覧の個数を超えている場合は返り値は0になります。
 * - 2を指定すると、指定した項目を検索バッファと検索オプションに適用します。一覧の個数を超えている場合は返り値は0になります。
 * - 3を指定すると、指定した項目で検索ダイアログを出します。一覧の個数を超えている場合は返り値は0になります。
 * - 4を指定すると、指定した項目の上検索をします。検索失敗時返り値は0になります。
 * - 5を指定すると、指定した項目の下検索をします。検索失敗時返り値は0になります。
 * - 6を指定すると、指定した項目の文字色が返り値になります。一覧の個数を超えている場合は返り値は-1になります。
 * - 7を指定すると、指定した項目の背景色が返り値になります。一覧の個数を超えている場合は返り値は-1になります。
 * 
 * @example
 * var c=0;
 * var r="検索の色付けの色一覧\n";
 * while(1) {
 *   var color = findmarkerlist(c,6);
 *   if(color < 0){
 *       break;
 *   }
 *   var back = backfindmarkerlist(c,7);
 *   r = r+" text:"+rightstr("000000"+hex(color),6)
 *       +" back:"+rightstr("000000"+hex(back),6)
 *       +"\n";
 *   c=c+1;
 * }
 * message(r);
 * 
 * @returns
 * n_actionによって、それぞれの結果に対応する値を返します。
 */
declare function findmarkerlist(marker_ix: number, n_action: number): number;

/**
 * s
 * 
 * findmarkerlist文は、「検索の色付け一覧...」にある項目のすべてを対象とした操作をします。
 * 
 * @param marker_ix 
 * -1を指定します。    
 * ダイアログを表示せず、「検索の色付け一覧...」にある項目のすべてを対象とした操作をします。
 * 
 * @param is_delete_all_mark 
 * 0を指定すると、すべての項目を再度色付けします。    
 * 1を指定すると、すべての項目を消去します。
 * 
 * @example
 * findmarkerlist(-1,0);	//「すべて再度色付け」をします。
 *
 * @returns
 * 返り値は意味を持ちません。
 */
declare function findmarkerlist(marker_ix: -1, is_delete_all_mark: number): number;

/**
 * s
 * 
 * selectinselect文は、「範囲内検索を選択」を実行します。
 * 
 * @comment
 * 範囲内検索を選択とは、    
 * 範囲内検索の状態（検索ダイアログで「選択した範囲」をONにして検索した状態）のとき、その範囲を選択します。    
 * このコマンドを実行してからもう一度検索ダイアログを出すことによって、範囲内検索していた範囲をもう一度指定することができます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function selectinselect(): number;

/**
 * s
 * 
 * setinselect2文は、「範囲内検索に指定」を実行します。
 * 
 * @comment
 * 範囲内検索に指定とは、    
 * 範囲選択（コピーや切り取りの対象）を、範囲内検索の範囲（検索ダイアログで「選択した範囲」をONにして検索する状態）にします。    
 * 行単位や文字単位やBOX選択や複数選択など、どのような選択状態であっても、文字単位の範囲内検索として指定されます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setinselect2(): number;

/**
 * s
 * 
 * settargetcolormarker文は、検索や置換の「追加の条件」の「指定の範囲/カラーマーカー内」の対象を指定します。    
 * 
 * @example
 * settargetcolormarker("mylayer");
 * 
 * @param layer_name
 * 対象となるレイヤー名を指定します。    
 * 検索や置換で、「追加の条件」の「指定の範囲/カラーマーカー内」が有効な場合、この文で指定されるレイヤー名を対象となるようにします。    
 * 文字列は、以下の予約されたレイヤー名を指定できます。    
 * 先頭に"\x01#"がある文字列は予約されたカラーマーカーになります。    
 * 
 * - "" 「一時的なカラーマーカー」の範囲 
 * - "\x01#findmarker" 「すべて検索 - 色付け」された範囲（findmarkerというキーワードも指定可能） 
 * - "\x01#reservedmultisel" 「複数選択予約」された範囲（reservedmultiselというキーワードも指定可能） 
 * - 文字列の先頭が"\x01#"ではない文字列は、任意のレイヤー名を指定できます。（例："mylayer"）
 * 
 * @comment
 * settargetcolormarkerの指定はずっと保持されるとは限らず、他の操作で上書きされる場合があります。    
 * searchdown等の直前に指定するようにしてください。    
 * searchdown等でinselect2を指定して検索した後は、targetcolormarkerは上書きされ、文字単位の選択用の予約された文字列になります。    
 * 
 * @comment
 * 参照：
 * @see searchdown 等
 * @see targetcolormarker
 * @see findmarker
 * @see reservedmultisel
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function settargetcolormarker(layer_name: string): number;

/**
 * s
 * 
 * colormarkersnapshot文は、現在のカラーマーカーの状態をやり直し可能にします。    
 * この文を実行すると、(更新)の状態になり一回編集を行ったことと同じ扱いになり、    
 * やり直しを行うと、実行した時点のカラーマーカーの状態に復元します。    
 * 引数で範囲を指定できます。    
 * 
 * @param lineno_bgn 
 * 開始位置の行番号を指定します。1から数えます。
 * 
 * @param column_bgn 
 * 開始位置の桁を指定します。0から数えます。
 * 
 * @param lineno_end 
 * 終了位置の行番号を指定します。1から数えます。
 *
 * @param column_end 
 * 終了位置の桁を指定します。0から数えます。
 * 
 * @param layer_name 
 * レイヤー名を指定します。
 * レイヤー名を省略すると全てののレイヤーが対象になります。    
 * 
 * @comment
 * lineno, column相当の行と桁で表します。    
 * 引数を省略するとファイル全体が対象になります。    
 * 範囲を全て0（colormarkersnapshot 0, 0, 0, 0;）にするとファイル全体が対象になります。
 * 
 * @example
 * colormarkersnapshot(1,0,10,0); 
 * 
 * @example
 * colormarkersnapshot(0,0,0,0,"mylayer");
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function colormarkersnapshot(lineno_bgn?: number, column_bgn?: number, lineno_end?: number, column_end?: number, layer_name?: string): number;

/**
 * s
 * 
 * restoredesktop文は、デスクトップ復元をします。
 * レジストリからデスクトップ復元します。
 * 
 * @param virtual_desktop_mode
 * 0を指定するか、もしくは省略した場合、仮想デスクトップが同じデスクトップ上にあるものとして復元されます。    
 * 1の場合は現在の仮想デスクトップに対してのみ、復元されます。    
 * 2の場合は全ての仮想デスクトップに全てのウィンドウが復元されます。保存された情報も2として保存されている必要があります。    
 * 
 * @example
 * restoredesktop(1);
 * 
 * @see savedesktop
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function restoredesktop(virtual_desktop_mode?: number): number;

/**
 * s
 * 
 * restoredesktop文は、デスクトップ復元をします。
 * 
 * @param filepath
 * パラメータにファイル名を指定すると、    
 * ファイルにデスクトップ保存,ファイルからデスクトップ復元ができます。
 * 
 * @example
 * restoredesktop("c:\\folder\\test.hmdesk");
 * 
 * @param virtual_desktop_mode
 * 0を指定するか、もしくは省略した場合、全ての仮想デスクトップが同じデスクトップ上にあるものとして復元されます。    
 * 1の場合は現在の仮想デスクトップに対してのみ、復元されます。    
 * 2の場合は全ての仮想デスクトップに全てのウィンドウが復元されます。保存された情報も2として保存されている必要があります。    
 * 
 * @example
 * restoredesktop("c:\\folder\\test.hmdesk", 1);
 * 
 * @see savedesktop
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function restoredesktop(filepath: string, virtual_desktop_mode?: number): number;

/**
 * s
 * 
 * savedesktop文は、デスクトップ保存をします。
 * 
 * @param virtual_desktop_mode
 * 省略するか、0の場合全ての仮想デスクトップが同じデスクトップ上にあるものとして解釈されます。    
 * 1の場合は現在の仮想デスクトップに対してのみ、保存されます。    
 * 2の場合は全ての仮想デスクトップの全てのウィンドウが保存されます。どこの仮想デスクトップに属していたかも一緒に保存されます。    
 * 
 * @example
 * savedesktop(1);
 * 
 * @see restoredesktop
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function savedesktop(virtual_desktop_mode?: number): number;

/**
 * s
 * 
 * savedesktop文は、デスクトップ保存をします。
 * 
 * @param filepath
 * パラメータにファイル名を指定すると、    
 * ファイルにデスクトップ保存,ファイルからデスクトップ保存ができます。
 * 
 * @example
 * savedesktop("c:\\folder\\test.hmdesk");
 * 
 * @param virtual_desktop_mode
 * 0を指定するか、もしくは省略した場合、全ての仮想デスクトップが同じデスクトップ上にあるものとして解釈されます。    
 * 1の場合は現在の仮想デスクトップに対してのみ、保存されます。    
 * 2の場合は全ての仮想デスクトップの全てのウィンドウが保存されます。どこの仮想デスクトップに属していたかも一緒に保存されます。    
 * 
 * @example
 * savedesktop("c:\\folder\\test.hmdesk", 1);
 * 
 * @see restoredesktop
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function savedesktop(filepath: string, virtual_desktop_mode?: number): number;

/**
 * s
 * 
 * scrolllink文は、「他の秀丸エディタと同時スクロール」コマンドを実行します。
 * 
 * @param hidemaru_handle 
 * 同時スクロールする相手の秀丸エディタの番号またはウィンドウハンドルを指定します。    
 * - パラメータを省略すると、「他の秀丸エディタと同時スクロール」コマンドと同じで、複数のファイルを開いている場合は選択ダイアログが出ます。    
 * - パラメータに秀丸エディタのウィンドウハンドルを指定すると、指定したウィンドウと同時スクロールします。    
 * - パラメータに0を指定すると、同時スクロール状態を解除します。    
 * - パラメータに-1を指定すると、常に相手を指定するダイアログが出るようになります。
 * 
 * @example
 * scrolllink hidemaruhandle(1);
 * 
 * @see scrolllinkhandle
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function scrolllink(hidemaru_handle?: number | 0 | -1): number;

/**
 * s
 * 
 * split文は、ウィンドウ分割します。   
 * 
 * @param split_type
 * 省略するか、もしくは 0 を指定すると、旧方式の上下のウィンドウ分割になります。    
 * 1 を指定すると、新方式の上下のウィンドウ分割になります。（V8.00以降）     
 * 2 を指定すると、新方式の左右のウィンドウ分割になります。（V8.00以降）    
 * -1 を指定すると、キー割り当てした「ウィンドウ分割上下」と同じように、[その他]→[動作環境]→[トラブル対策]→[その他のトラブル対策]の「ウィンドウ分割をV7.xx以下の方式にする」によって動作が変わるようになります。    
 * 
 * @example
 * split();
 * 
 * split(1);
 * 
 * @param split_switch
 * 省略するか、もしくは 0 を指定すると、分割のON/OFFを切り替えます。    
 * 1 を指定すると、直前の状態に関わらず常にONになります。    
 * 2 を指定すると、直前の状態に関わらず常にOFFになります。    
 * 
 * @example
 * split(1, 1);
 * 
 * @param split_pos
 * 省略するか、もしくは 0 を指定すると、ウィンドウの中央で分割します。    
 * 数値を指定すると、指定された行数(桁数)で分割位置を決めます。
 * 
 * @example
 * split(1, 1, 10);
 * 
 * @see split
 * @see splitswitch
 * @see setsplitinfo
 * @see splitstate
 * @see splitmode
 * 
 * @returns
 * 返ってくる値に意味はない。
 */
declare function split(split_type?: number, split_switch?: number, split_pos?: number): number;

/**
 * s
 * 
 * @param setting_prop
 * 設定する情報の種類です。    
 * 現在は 0 固定です。    
 * 0 を指定してください。     
 * 
 * @param setting_value
 * 設定する値です。    
 * - setting_propが0の時    
 * フォーカスが無いほうの分割のスクロールする量を指定して、スクロールさせます。    
 * 
 * @comment
 * 参照：    
 * @see split
 * @see splitswitch
 * @see setsplitinfo
 * @see splitstate
 * @see splitmode
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setsplitinfo(setting_prop: 0, setting_value: number): number;

/**
 * s
 * 
 * splitswitch文は、「分割ウィンドウ切り替え」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function splitswitch(): number;

/**
 * s
 * 
 * windowcascade文は、「秀丸エディタを重ねて表示」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function windowcascade(): number;

/**
 * s
 * 
 * windowhorz文は、「秀丸エディタを横に並べる」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function windowhorz(): number;

/**
 * s
 * 
 * windowtiling文は、「秀丸エディタを並べて表示」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function windowtiling(): number;

/**
 * s
 * 
 * windowvert文は、「秀丸エディタを縦に並べる」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function windowvert(): number;

/**
 * s
 * 
 * windowlist文は、「ウィンドウ一覧表示」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function windowlist(): number;

/**
 * s
 * 
 * compfile文は、他の秀丸エディタと内容比較を実行します。    
 * 
 * @param hidemaru_handle
 * パラメータとして他の秀丸エディタのウィンドウハンドルまたはウィンドウ番号を指定する必要があります。    
 * 以下のように使います。
 * 
 * @example
 * compfile(findhidemaru( "c:\\folder\\abc.txt" ));
 * 
 * @param is_after_cursor
 * is_after_cursorに 1 を指定することで、    
 * カーソル位置以降の異なる部分をカラーマーカーで色付けすることができます。    
 * 
 * @comment
 * 参照：
 * @see compfilehandle
 * @see COMPFILE
 * 
 * @returns
 * 比較先のウィンドウが見つからない場合は結果コードは-1、    
 * 比較の結果、違いが見つからなかった場合は結果コードは0、    
 * 違いが見つかってその位置にカーソル移動した場合は1となります。    
 */
declare function compfile(hidemaru_handle: number, is_after_cursor: number): number;

/**
 * s
 * 
 * nextcompfile文は、次の内容比較を行います。    
 * 
 * 比較のオプションで「カラーマーカーで色付け」されている状態では、    
 * 次の比較結果のカラーマーカーにジャンプします。    
 * (比較のオプションで「カラーマーカーで色付け」されている状態でないと、この文は意味がありません。)
 * 
 * @param compare_mode
 * パラメータで動作を指定できます。    
 * 0 を指定すると、比較結果のカラーマーカーは無視して、V8.00未満の従来通りの次の比較を実行します。    
 * 1 を指定すると、次の比較結果のカラーマーカーにジャンプします。    
 * 2 を指定すると、比較結果のカラーマーカーがあれば次の比較結果へ、無ければ従来通りの次の比較を自動的に判断します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function nextcompfile(compare_mode?: number): number;

/**
 * s
 * 
 * prevcompfile文は、前の内容比較を行います。    
 * 
 * 比較のオプションで「カラーマーカーで色付け」されている状態では、    
 * 前の比較結果のカラーマーカーにジャンプします。    
 * (比較のオプションで「カラーマーカーで色付け」されている状態でないと、この文は意味がありません。)
 * 
 * @param compare_mode
 * パラメータで動作を指定できます。    
 * 0 を指定すると、比較結果のカラーマーカーは無視して、V8.00未満の従来通りの前の比較を実行します。    
 * 1 を指定すると、前の比較結果のカラーマーカーにジャンプします。    
 * 2 を指定すると、比較結果のカラーマーカーがあれば前の比較結果へ、無ければ従来通りの前の比較を自動的に判断します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function prevcompfile(compare_mode?: number): number;

/**
 * s
 * 
 * alwaystopswitch文は、「常に手前に表示切り替え」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function alwaystopswitch(): number;

/**
 * s
 * 
 * settabmode文は、タブモードの状態を変更します。    
 * 
 * @param to_tabmode 
 * 値に 0 を指定すると、タブモードを解除します。    
 * 値に 1 を指定すると、タブモードになります。    
 * 値を省略すると、このようにタブモードを切り替えます。即ち、現在タブモードならタブモードを解除し、現在タブモードでなければ、タブモードにします。
 *
 * @example
 * settabmode(1);
 * 
 * @comment
 * 参照：
 * @see tabmode
 * @see 秀丸エディタ管理(タブ編)
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function settabmode(to_tabmode: number): number;

/**
 * s
 * 
 * settabgroup文は、タブモードのとき、タブを分離/移動します。
 * 
 * @example
 * 
 * @param hidemaru_handle 
 * 秀丸エディタの番号は、hidemaruorder で示されるウィンドウの番号またはウィンドウハンドルを指定します。
 * 
 * @param groupid
 * グループIDは、タブを分離しているとき、見た目上のウィンドウに与えられる固有の識別番号です。    
 * 目的のグループにタブが存在しないときは、タブは分離して新しいウィンドウが現れます。    
 * 目的のグループにタブが既に存在するときは、タブは移動します。    
 * もともとあったグループからタブが無くなると、そのグループのウィンドウは消滅します。    
 * グループIDに -1 を指定すると、空いているグループIDが自動的に割り当てられて分離します。    
 * グループIDの上限は63までです。    
 * 
 * @example
 * 
 * var hidemaru_handle = hidemaruhandle(0);
 * var groupid = 0;
 * 
 * settabgroup(hidemaru_handle, groupid);
 * 
 * @comment
 * 秀丸エディタの番号とグループIDを省略すると、「このタブを分離」コマンドと同様に、分離と合体を自動的に行います。
 * 
 * @example
 * var i = 0;
 * while(i < hidemarucount()){
 *     if( filetype(i) == ".cpp" ) {
 *         settabgroup(i, 0);
 *     } else if( filetype(i) == ".h" ) {
 *         settabgroup(i, 1);
 *     } else {
 *         settabgroup(i, 2);
 *     }
 *     i = i + 1;
 * }
 * 
 * @comment
 * 参照：    
 * @see tabgroup
 * @see 秀丸エディタ管理(タブ編)
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function settabgroup(hidemaru_handle?: number, groupid?: number): number;

/**
 * s
 * 
 * settaborder文は、タブモードのとき、タブの順番を変更します。
 * 
 * @example
 * 
 * @param hidemaru_handle 
 * 秀丸エディタの番号は、hidemaruorder で示されるウィンドウの番号またはウィンドウハンドルを指定します。
 * 
 * @param taborder
 * タブの位置を指定します。    
 * 数値は、同じグループ内のタブを 0 から数えた順番です。
 * 
 * @example
 * var i = 0;
 * while(i < hidemarucount()){
 *     if( filetype(i) == ".cpp" ) {
 *         settaborder(i, 0);
 *     } else if( filetype(i) == ".h" ) {
 *         settaborder(i, tabtotal(i)-1);
 *     }
 *     i = i + 1;
 * }
 * 
 * @comment
 * 参照：    
 * @see taborder
 * @see 秀丸エディタ管理(タブ編)
 * 
 * @returns
 * 成功した場合、0以外を返す。    
 * 失敗した場合、0を返す。    
 */
declare function settaborder(hidemaru_handle?: number, taborder?: number): number;

/**
 * s
 * 
 * iconthistab文は、「このタブを最小化」を実行します。
 * 
 * @comment
 * このタブを最小化とは、    
 * タブモードのとき、現在アクティブなタブを、タブの外へ出して最小化します。    
 * 最小化されている秀丸エディタをアクティブにすると、再びタブの中に戻ります。 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function iconthistab(): number;

/**
 * s
 * 
 * fullscreen文は、「全画面表示」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function fullscreen(): number;

/**
 * s
 * 
 * backtagjump文は、バックタグジャンプを実行します。
 * 
 * @comment
 * 参照：    
 * @see savebacktagjump
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function backtagjump(): number;

/**
 * s
 * 
 * directtagjump文は、ダイレクトタグジャンプを実行します。
 * 
 * @comment
 * 参照：    
 * @see savebacktagjump
 * 
 * @example
 * directtagjump
 * 
 * @comment
 * 参照：
 * @see getresultex
 * 
 * @returns
 * 成功すると1を返す、失敗すると0を返す。    
 * 「ダイレクトタグジャンプ飛び先指定」のダイアログでキャンセルされた場合は-1を返します。    
 * getresultexで、詳しい結果を得ることができます。    
 */
declare function directtagjump(): number;

/**
 * s
 * 
 * freecursorswitch文は、「フリーカーソルモード」を実行します。
 * 
 * @comment
 * フリーカーソルモードとは、    
 * カーソルは改行文字の後ろにも移動することができます。    
 * OFFにすると改行文字より後ろにはカーソルが移動しません。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function freecursorswitch(): number;

/**
 * s
 * 
 * imeswitch文は、「かな漢字変換の切り替え」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function imeswitch(): number;

/**
 * s
 * 
 * imeregisterword文は、「かな漢への単語登録」のダイアログを表示します。    
 * IMEが対応していない場合は、機能しません。
 * 
 * @comment
 * かな漢への単語登録とは、    
 * かな漢変換の単語登録の画面を出します。    
 * 範囲選択している場合は、範囲選択した文字を単語にして登録することができます。    
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function imeregisterword(): number;

/**
 * s
 * 
 * help文は、「外部ヘルプ」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help(): number;

/**
 * s
 * 
 * help2文は、「外部ヘルプ２」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help2(): number;

/**
 * s
 * 
 * help3文は、「外部ヘルプ３」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help3(): number;

/**
 * s
 * 
 * help4文は、「外部ヘルプ４」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help4(): number;

/**
 * s
 * 
 * help5文は、「外部ヘルプ５」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help5(): number;

/**
 * s
 * 
 * help5文は、「外部ヘルプ５」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help5(): number;

/**
 * s
 * 
 * help6文は、「外部ヘルプ６」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function help6(): number;

/**
 * s
 * 
 * hidemaruhelp文は、「秀丸エディタヘルプ」を実行します。
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function hidemaruhelp(): number;

/**
 * s
 * 
 * macrohelp文は、「秀丸マクロヘルプ」を実行します。
 * 
 * @param keyword
 * keywordを指定した場合、指定したキーワードで呼び出します。    
 * keywordを省略した場合、カーソル位置にある単語を自動的に検索キーワードにして呼び出します。    
 * 
 * @returns
 * 成功すると0以外、失敗すると0を返します。
 */
declare function macrohelp(keyword?: string): number;

/**
 * s
 * 
 * overwriteswitch文は、「上書き／挿入モード切り替え」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function overwriteswitch(): number;

/**
 * s
 * 
 * readonlyswitch文は、「ファイルの書換え禁止／許可の切り替え」を実行します。    
 * 起動オプション/rrで起動して、上書き禁止モードの切り替えができない状態になっている場合は失敗します。    
 * 
 * @returns
 * 成功時はresultは0以外、失敗時は0になります。
 */
declare function readonlyswitch(): number;

/**
 * s
 * 
 * showcode文は、「カーソルの文字コードの表示」を実行します。    
 * 主要なエンコードでの文字コードが、ダイアログにて表示されます。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showcode(): number;

/**
 * s
 * 
 * showcharcount文は、文字数計算のダイアログを出します。    
 * 
 * @comment
 * 文字数計算のダイアログでは、
 * 内全角文字,半角文字,全角空白,半角空白,タブ,改行の数え方を指定できます。    
 * UTF-8,UTF-16,EUC,JISなどは、文字によってエンコードされるバイト数が変化する可能性があるため、ファイルに保存される正確なバイト数を計算することはできません。    
 * 
 * 全角文字と半角文字で「1文字分」としていても、結合文字やカラー絵文字で複数の文字コードで構成される文字の場合は2文字以上で数えられます。    
 * 「カーソル移動単位」にすると、結合文字やカラー絵文字でも、カーソル移動と同じ数え方になります。    
 * 「カーソル移動単位」の場合は、計算にCPUの負担がかかる場合があります。    
 * 
 * 半角文字や半角空白で「0.5文字分」にすると、「AB」や「  」(半角2つ)を1つとして数えます。    
 * 
 * 半角文字で「単語(連続した半角)」にすると、半角の英数字や記号の連続を１つのまとまりとして数えます。半角空白は含まれません。    
 * 「Hide-maru」や「U.S.A.」は1つとして数えられます。「Hidemaru Editor」は2つとして数えられます。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showcharcount(): number;

/**
 * s
 * 
 * showlineno文は、「行番号の表示／非表示」を実行します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showlineno(): number;

/**
 * s
 * 
 * tagjump文は、タグジャンプを実行します。    
 * 
 * getresultex(7)はジャンプした行番号が得られます。    
 * 
 * 新しく秀丸エディタが起動すると同時に存在しない行番号を指定している場合、メッセージが出ることがあります。    
 * メッセージを出さないようにして、存在しない行番号だったかどうかを調べて処理するには、例えば以下のようにします。    
 * （存在しない行番号の場合、ファイルの末尾に移動する例）    
 * 
 * @example
 * disableerrormsg();
 * tagjump();
 * if(result() && (getresultex(7) > linecount2()) ) {
 *     gofileend();
 * }
 * 
 * @comment
 * 参照：
 * @see getresultex(7)
 * @see savebacktagjump
 * 
 * @returns
 * 成功すると0以外を返す、失敗すると0を返す。    
 * getresultex(7)はジャンプした行番号が得られます。
 */
declare function tagjump(): number;

/**
 * s
 * 
 * redraw文は、「秀丸エディタのウィンドウの再描画」を実行します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function redraw(): number;

/**
 * s
 * 
 * browsemodeswitch文は、「閲覧モードの切り替え」を実行します。    
 * 起動オプション/bbで起動して、閲覧モードの切り替えができない状態になっている場合は失敗します。    
 * 
 * @returns
 * 成功時はresultは0以外、失敗時は0になります。
 */
declare function browsemodeswitch(): number;

/**
 * s
 * 
 * clist文は、「アウトライン解析のダイアログ」を実行します。    
 * （旧バージョンでの強調表示の一覧，関数一覧）    
 * 
 * @returns
 * 返ってくる値に意味はない。
 */
declare function clist(): number;

/**
 * s
 * 
 * clearupdated文は、編集マークを全て消去して「(更新)」状態を解除します。
 *  
 * @returns
 * 返り値は意味を持ちません。
 */
declare function clearupdated(): number;

/**
 * s
 * 
 * refreshtabstop文は、「列の幅のテキスト幅揃えを更新」を実行します。
 * 
 * @comment
 * 列の幅のテキスト幅揃えを更新とは、    
 * タブの文字数が自由配置,TSVモード,CSVモードのとき、テキスト全体の内容を元に、タブストップを計算して設定します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refreshtabstop(): number;

/**
 * s
 * 
 * refreshtabstop_pause文は、「列の幅の自動調整を一時停止」を実行します。
 * 
 * @comment
 * 列の幅の自動調整を一時停止とは、    
 * TSVモード,CSVモードのとき、編集作業によって列の幅が自動的に調整されますが、このコマンドを実行して一時停止しておくと、調整されないようになります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refreshtabstop_pause(): number;

/**
 * s
 * 
 * refreshtabstop_shrink文は、「列の幅を全て狭める」を実行します。
 * 
 * @comment
 * 列の幅を全て狭めるとは、    
 * TSVモード,CSVモードのとき、列の幅を全て狭めます。横スクロールする量が多いとき、このコマンドを実行すると見やすくなります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refreshtabstop_shrink(): number;

/**
 * s
 * 
 * refreshtabstop_current文は、「この列のテキスト幅揃えを更新」を実行します。
 * 
 * @comment
 * この列のテキスト幅揃えを更新とは、    
 * TSVモード,CSVモードのとき、カーソルがある列の幅だけを適切な幅に調整します。    
 * ルーラー部分のクリックで列の選択、またはドラッグで複数の列の選択をしているときは、選択した列が対象になります。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function refreshtabstop_current(): number;

/**
 * s
 * 
 * autospellcheckswitch文は、「自動スペルチェックのON/OFF切り替え」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function autospellcheckswitch(): number;

/**
 * s
 * 
 * spellcheckdialog文は、「スペルミスの修正...」コマンドを実行します。
 * 
 * @comment
 * 参照：
 * @see getresultex(16)
 * 
 * @returns
 * 返り値は意味を持ちません。    
 * 
 * getresultexでスペルミスの修正ダイアログの捜査結果を取得できます。    
 * getresultex(16)の値：
 * - 1　上書き禁止状態のエラー
 * - 2　スペルチェックアドイン読み込み失敗
 * - 3　エラーメッセージを出して失敗
 * - 4　スペルミスなしになって正常終了
 * - 5　正常終了
 * - 6　閉じるを押して終了
 * - 7　その他何らかのエラー
 */
declare function spellcheckdialog(): number;

/**
 * s
 * 
 * savebacktagjump文は、現在のファイルとカーソル位置をバックタグジャンプの戻り先として明示的に記憶させます。
 * 
 * @example
 * savebacktagjump();
 * 
 * @comment
 * 参照：    
 * @see tagjump
 * @see directtagjump
 * @see backtagjump
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function savebacktagjump(): number;

/**
 * s
 * 
 * fold文は「折りたたみ」を実行します。
 * 
 * @param fold_condition_flag    
 * パラメータを指定して、折りたたみ可能な条件を指定することができます。    
 * パラメータが無い場合はファイルタイプ別の設定に従います。    
 * 以下の値のOR演算した値を指定できます。    
 * - 0x0001    範囲選択 
 * - 0x0002    インデントの深さ 
 * - 0x0004    連続したコメント 
 * - 0x0008    カーソル上の対応する括弧 
 * - 0x0010    #ifdef等の対応 
 * - 0x0020    アウトライン解析との対応 
 * - 0x0040    空行区切り 
 * - 0x0080    行の強調表示区切り 
 * 
 * @comment
 * 参照：
 * @see foldall
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function fold(fold_condition_flag?: number): number;

/**
 * s
 * 
 * unfold文は「展開」を実行します。
 * 
 * @comment
 * 参照：
 * @see unfoldall
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function unfold(): number;

/**
 * s
 * 
 * foldall文は「折りたたみ」を実行します。
 * 
 * @param fold_condition_flag
 * パラメータを指定して、折りたたみ可能な条件を指定することができます。    
 * パラメータが無い場合はファイルタイプ別の設定に従います。    
 * 以下の値のOR演算した値を指定できます。    
 * - 0x0001    範囲選択 
 * - 0x0002    インデントの深さ 
 * - 0x0004    連続したコメント 
 * - 0x0008    カーソル上の対応する括弧 
 * - 0x0010    #ifdef等の対応 
 * - 0x0020    アウトライン解析との対応 
 * - 0x0040    空行区切り 
 * - 0x0080    行の強調表示区切り 
 * 
 * @param is_show_dialog
 * ダイアログを出すかどうかを指定できます。
 * - 0を指定すると、ダイアログを出しません。
 * - 1を指定すると、ダイアログを出します。
 * - 2または省略すると、ダイアログが出るかどうかは自動で決まります。    
 * 自動で出るかどうかは、第１パラメータのフラグが全てONの状態    
 * （標準設定のままでfoldall;とだけ書いた場合）、ダイアログが出ます。    
 * 何かフラグを明示的に指定している場合は、ダイアログは出ません。
 * 
 * @example
 * foldall(0x0002); //インデントの深さで折りたたみ
 * 
 * @comment
 * 参照：
 * @see fold
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function foldall(fold_condition_flag?: number, is_show_dialog?: number): number;

/**
 * s
 * 
 * unfold文は「全て展開」を実行します。
 * 
 * @comment
 * 参照：
 * @see unfold
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function unfoldall(): number;

/**
 * s
 * 
 * nextfoldableは「次の折りたたみ可能行」コマンド、と同じ働きをします。
 * 
 * @param fold_condition_flag
 * パラメータを指定して、折りたたみ可能な条件を指定することができます。    
 * パラメータが無い場合はファイルタイプ別の設定に従います。    
 * 以下の値のOR演算した値を指定できます。    
 * - 0x0001    範囲選択 
 * - 0x0002    インデントの深さ 
 * - 0x0004    連続したコメント 
 * - 0x0008    カーソル上の対応する括弧 
 * - 0x0010    #ifdef等の対応 
 * - 0x0020    アウトライン解析との対応 
 * - 0x0040    空行区切り 
 * - 0x0080    行の強調表示区切り 
 * 
 * @example
 * nextfoldable(0x0040); //空行区切りの折りたたみ可能行に移動
 * 
 * @returns
 * 移動に成功した場合は0以外を返す、    
 * 失敗した場合は0を返す。
 */
declare function nextfoldable(fold_condition_flag?: number): number;

/**
 * s
 * 
 * prevfoldableは「前の折りたたみ可能行」コマンド、と同じ働きをします。
 * 
 * @param fold_condition_flag
 * パラメータを指定して、折りたたみ可能な条件を指定することができます。    
 * パラメータが無い場合はファイルタイプ別の設定に従います。    
 * 以下の値のOR演算した値を指定できます。    
 * - 0x0001    範囲選択 
 * - 0x0002    インデントの深さ 
 * - 0x0004    連続したコメント 
 * - 0x0008    カーソル上の対応する括弧 
 * - 0x0010    #ifdef等の対応 
 * - 0x0020    アウトライン解析との対応 
 * - 0x0040    空行区切り 
 * - 0x0080    行の強調表示区切り 
 * 
 * @example
 * prevfoldable(0x0040); //空行区切りの折りたたみ可能行に移動
 * 
 * @returns
 * 移動に成功した場合は0以外を返す、    
 * 失敗した場合は0を返す。
 */
declare function prevfoldable(fold_condition_flag?: number): number;

/**
 * s
 * 
 * selectfoldableは「折りたたみ可能行の範囲選択」コマンド、と同じ働きをします。
 * 
 * @param fold_condition_flag
 * パラメータを指定して、折りたたみ可能な条件を指定することができます。    
 * パラメータが無い場合はファイルタイプ別の設定に従います。    
 * 以下の値のOR演算した値を指定できます。    
 * - 0x0001    範囲選択 
 * - 0x0002    インデントの深さ 
 * - 0x0004    連続したコメント 
 * - 0x0008    カーソル上の対応する括弧 
 * - 0x0010    #ifdef等の対応 
 * - 0x0020    アウトライン解析との対応 
 * - 0x0040    空行区切り 
 * - 0x0080    行の強調表示区切り 
 * 
 * @example
 * selectfoldable(0x0040); //空行区切りの折りたたみ可能行に移動
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function selectfoldable(fold_condition_flag?: number): number;

/**
 * s
 * 
 * rangeeditin文は、「部分編集」を実行します。
 * 
 * @returns
 * 「部分編集」に成功した場合は0以外を返す、    
 * 失敗した場合は0を返す。
 */
declare function rangeeditin(): number;

/**
 * s
 * 
 * rangeeditout文は、「部分編集解除」を実行します。
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function rangeeditout(): number;

/**
 * s
 * 
 * nextoutlineitem文は、「次の見出し」を実行します。    
 * 
 * アウトライン解析がツリー表示の場合、ツリー表示項目のプロパティで、    
 * 「自動的な選択/部分編集の対象」がONになっている見出しが対象になります。    
 * 
 * @params outer_target
 * outer_targetに1を指定することで、「自動的な選択/部分編集の対象」のOFFの見出しも対象にすることができます。
 * 
 * @example
 * nextoutlineitem(1);
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function nextoutlineitem(outer_target?: number): number;

/**
 * s
 * 
 * prevoutlineitem文は、「前の見出し」を実行します。    
 * 
 * アウトライン解析がツリー表示の場合、ツリー表示項目のプロパティで、    
 * 「自動的な選択/部分編集の対象」がONになっている見出しが対象になります。    
 * 
 * @params outer_target
 * outer_targetに1を指定することで、「自動的な選択/部分編集の対象」のOFFの見出しも対象にすることができます。
 * 
 * @example
 * prevoutlineitem(1);
 * 
 * @returns
 * 返り値は意味を持ちません。    
 */
declare function prevoutlineitem(outer_target?: number): number;

/**
 * s
 * 
 * showoutline文は、「アウトライン解析の枠表示/非表示」を実行します。    
 * アウトライン解析の枠が表示されているかどうかは、getconfig("Outline")で知ることができます。     
 * 
 * @example
 * showoutline();
 * var is_show = getconfig("Outline");
 * if (is_show) {
 *     ....
 * }
 * 
 * 参考：
 * @see getconfig
 * 
 */
declare function showoutline(): number;

/**
 * s
 * 
 * showoutlinebar文は、「見出しバーの表示/非表示」を実行します。    
 * アウトライン解析の枠が表示されているかどうかは、getconfig("OutlineBar")で知ることができます。     
 * 
 * @example
 * showoutlinebar();
 * var is_show = getconfig("OutlineBar");
 * if (is_show) {
 *     ....
 * }
 * 
 * 参考：
 * @see getconfig
 * 
 */
declare function showoutlinebar(): number;

/**
 * s
 * 
 * showfoldingbar文は、「折りたたみ用の余白表示/非表示」の切り替えを実行します。
 * 
 * @returns
 * 返ってくる値に意味はない。    
 */
declare function showfoldingbar(): number;

/**
 * s
 * 
 * syncoutline文は、「アウトライン解析の枠同期」を実行します。
 * 
 * @returns
 * 返ってくる値に意味はない。    
 */
declare function syncoutline(): number;

/**
 * s
 * 
 * refreshoutline文は、「アウトライン解析を明示的に即更新」を実行します。
 * 
 * @returns
 * 返ってくる値に意味はない。    
 */
declare function refreshoutline(): number;

/**
 * s
 * 
 * refreshoutline文は、「アウトライン解析を明示的に即更新」を実行します。
 * 
 * @param n_size
 * アウトライン解析の枠の幅(左右の場合)または高さ(上下の場合)をピクセル単位で指定します。
 * 
 * @example
 * setoutlinesize(outlinesize()+300);
 * 
 * @returns
 * 返ってくる値に意味はない。    
 */
declare function setoutlinesize(n_size: number): number;

/**
 * f
 * 
 * message文は、メッセージボックスを表示します。
 *
 * @param message_text 
 * メッセージの文字列を指定します。
 * 
 * @example
 * message("秀丸エディタです");
 * message(100);
 * 
 * @param title_text 
 * タイトルを指定します。
 * 
 * @example
 * message("内容", "タイトル");
 * 
 * @param button_flag 
 * フラグを指定します。    
 * 以下の値のOR論理輪を指定します。
 * - ボタンの種類：
 *   - 0x00 OKのみ
 *   - 0x01 OK/キャンセル
 *   - 0x02 中止/再試行/無視
 *   - 0x03 はい/いいえ/キャンセル
 *   - 0x04 はい/いいえ
 *   - 0x05 再試行/キャンセル
 * - アイコンの種類：
 *   - 0x10 中止アイコン
 *   - 0x20 ？マークアイコン
 *   - 0x30 ！マークアイコン
 *   - 0x40 ｉマークアイコン
 * 
 * @example
 * var ret = message("内容", "タイトル", 0x03|0x20); //OK /キャンセル | ？アイコン
 * message(ret);
 * 
 * @param timeout_millisecond 
 * タイムアウトするまでの時間をミリ秒単位で指定します。    
 * 0を指定するとタイムアウト無しになります。    
 *  
 * @param timeout_button_type 
 * タイムアウトした場合に自動的に押すボタンの値を指定します。
 * - 1 OK
 * - 2 キャンセル
 * - 3 中止
 * - 4 再試行
 * - 5 無視
 * - 6 はい
 * - 7 いいえ
 * 
 * @example
 * var ret = message( "内容", "タイトル"
 *                   , 0x03|0x20    // MB_YESNOCANCEL | MB_ICONQUESTION
 *                   , 5000, 2      // 5秒後にキャンセルボタンを自動で選択
 *                   );
 * 
 * @param msgbox_pos_type 
 * メッセージボックスを出す位置の基準を指定します。    
 * - 0x00　通常（省略と同じ）
 * - 0x01　画面中央
 * - 0x02　画面左上からの位置
 * - 0x03　画面右上からの位置
 * - 0x04　画面左下からの位置
 * - 0x05　画面右下からの位置
 * - 0x06　カーソル位置
 * - 0x11　ウィンドウ中央
 * - 0x12　ウィンドウ左上からの位置
 * - 0x13　ウィンドウ右上からの位置
 * - 0x14　ウィンドウ左下からの位置
 * - 0x15　ウィンドウ右下からの位置
 * 
 * @param msgbox_pos_x
 * 位置を指定している場合のX座標を指定します。
 * 
 * @param msgbox_pos_y
 * 位置を指定している場合のY座標を指定します。
 * 
 * 位置の指定の値は、DPIが100%のときのピクセル単位で、DPIが200%のときは指定の2倍の値のピクセル数になります。    
 * パラメータ６で左上/右上/左下/右下からの位置を指定しているときに、パラメータ７、パラメータ８が使われます。    
 * 
 * @example
 * var ret = message("内容", "タイトル"
 *            , 0x03|0x20        //MB_YESNOCANCEL | MB_ICONQUESTION 
 *            , 0, 0             //タイムアウトは無し
 *            , 0x15, 100, 50);  //ウィンドウ右下からの位置
 * 
 * @returns
 * ボタンの種類を指定している場合、返り値は押したボタンを表します。
 * - 1 OK
 * - 2 キャンセル
 * - 3 中止
 * - 4 再試行
 * - 5 無視
 * - 6 はい
 * - 7 いいえ
 */
declare function message(message_text: any, title_text?: any, button_flag?: number, timeout_millisecond?: number, timeout_button_type?: number, msgbox_pos_type?: number, msgbox_pos_x?: number, msgbox_pos_y?: number): number;

/**
 * s
 * 
 * question文は、問い合わせのメッセージボックスを出します。
 * 
 * @example
 * question("よろしいですか？");
 * 
 * @param message 
 * メッセージの文字列を指定します。
 * 
 * @example
 * var select_button = question("セーブしますか？");
 * if( select_button != 0 ) {
 *   save();
 * }
 * 
 * @returns
 * 返り値は押したボタンを表します。    
 * - 0 いいえ
 * - 1 はい
 */
declare function question(message: string): number;

/**
 * s
 * 
 * beep文は、一般の警告音を出します。
 * 
 * @example
 * beep();
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function beep(): number;

/**
 * s
 * 
 * play文は、WAVファイルを再生します。    
 * 
 * @param wav_filepath 
 * WAVファイルを指定します。
 * 
 * @example
 * play("d:\\windows\\chord.wav");
 * 
 * @comment
 * WAVファイルの再生の終了を待たずにマクロの実行を継続します。    
 * 再生が終了するまで待つ場合、play文ではなく、playsync文を使います。
 * 
 * @comment
 * 参照：
 * @see playsync
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function play(wav_filepath: string): number;

/**
 * s
 * 
 * playsync文は、WAVファイルを再生します。    
 * 
 * @param wav_filepath 
 * WAVファイルを指定します。
 * 
 * @example
 * playsync("d:\\windows\\chord.wav");
 * 
 * @comment
 * WAVファイルの再生が終了するまで待ちます。    
 * 再生の終了を待たずにマクロの実行を継続するには、playsync文ではなく、play文を使います。
 * 
 * @comment
 * 参照：
 * @see play
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function playsync(wav_filepath: string): number;

/**
 * s
 * 
 * debuginfo文は、デバッグ出力を行います。    
 * 
 * @param output_mode 
 * 出力方法を指定します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function debuginfo(output_mode: number): number;

/**
 * s
 * 
 * debuginfo文は、デバッグ出力を行います。    
 * 
 * @param output_mode 
 * 出力方法を指定します。    
 * debuginfo文は、デバッグメッセージの表示の禁止／許可を行います。    
 * - 0を指定した場合、デバッグメッセージの表示を禁止します。    
 * - 0以外を指定した場合、デバッグメッセージの表示を許可されます。    
 * - 2を指定した場合は、デバッグメッセージに加えて、アプトプット枠にも出力します。    
 * マクロ実行直後は禁止になっています。
 * 
 * @example
 * debuginfo(2);
 *  
 * @comment
 * 参照：    
 * @see showvars
 * @see execmacro で別のマクロを実行する場合
 * @see setactivehidemaru 等で別の秀丸エディタに切り替わった場合
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function debuginfo(output_mode: number): number;

/**
 * s
 * 
 * debuginfo文は、デバッグ出力を行います。    
 * 
 * @param message 
 * 出力する内容を指定します。    
 * 改行文字を出力したい場合は、"\r\n"を使って下さい。
 * OutputDebugString関数を使ってその文字列をデバッグアプリケーションに表示します。    
 * 
 * @example
 * debuginfo(1);
 * var a = 100;
 * debuginfo("a = " + a + "\r\n");

 * 
 * @comment
 * デバッグアプリケーションが常駐していない時にこの文を実行すると、文字列はデバッグ端末に送られます。    
 * デバッグアプリケーションもデバッグ端末もない場合はWindowsの動作がおかしくなることがあるので注意してください。    
 * デバッグアプリケーションは、フリーソフトでいろいろ公開されていたりするので、入手して使うことができます。    
 * 「デバッガ」「OutputDebugString」等でWeb検索すると見付かるかもしれません。    
 * Microsoftの「DebugView」というソフトもあります。     
 * 秀丸用の「秀丸エディタ・デバッグ出力モニター」もあります。    
 * 
 * @example
 * debuginfo(2);
 * debuginfo("アウトプット枠\r\n");
 * 
 * @comment
 * 参照：    
 * @see showvars
 * @see execmacro で別のマクロを実行する場合
 * @see setactivehidemaru 等で別の秀丸エディタに切り替わった場合
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function debuginfo(message: string): number;

/**
 * s
 * 
 * showvars文は、現在の変数の一覧をデバッグアプリケーションに表示します。    
 * 
 * 実際に表示させるためには、debuginfo文でデバッグメッセージの表示が許可されている必要があります。    
 * debuginfo文で数値で2を指定している場合はアウトプット枠に出力します。    
 * 
 * @comment
 * 参照：    
 * @see debuginfo
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showvars(): number;

/**
 * s    
 * 
 * title文は、タイトルバー/ステータスバー/見出しバー/タブ名を変更します。
 * 
 * @param title_text
 * 文字列を指定する場合、変更する内容になります。
 * 
 * @example
 * title("マクロ処理中です");
 * 
 * @param target_location
 * どの部分に対する操作かを指定します。    
 * 省略した場合は0と同じです。   
 * - 0 タイトルバー（キャプション）が対象    
 * - 1 ステータスバーが対象    
 * - 2 見出しバーが対象    
 * - 3 タブモードのタブ名が対象    
 * 
 * target_locationを指定することで、ステータスバーや見出しバーの内容を変えることができます。    
 * ステータスバーの場合は、ファンクションキーとステータスバーを合体させていると表示されないので注意が必要です。    
 * 
 * @example
 * title("ステータスバーです", 1);
 * title(-1, 1);	//ステータスバーを維持する場合にも第２パラメータを指定
 * 
 * @comment
 * 参照：    
 * @see gettitle
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function title(title_text: string, target_location: number): number;

/**
 * s
 * 
 * title文は、タイトルバー/ステータスバー/見出しバー/タブ名を変更します。
 * 
 * @param title_behavior
 * 数値を指定する場合、どのように振る舞うかを指定します。    
 * - 0 現在の秀丸エディタで指定された内容を元通りに戻す
 * - 1 すべての秀丸エディタで指定された内容を元通りに戻す
 * - -1 現在設定されている内容をマクロ終了時も残す * 
 * 
 * マクロ実行中、変更された内容はウィンドウが切り替わっても保持されます。    
 * 現在の秀丸エディタのキャプションだけを元に戻すには、title 0 を実行してください。    
 * 他の秀丸エディタも含めてすべてのキャプションを元に戻すには、title 1を実行してください。
 * 
 * マクロが終了すると、すべて自動的に元に戻ります。    
 * タイトルバーを設定した後でtitle -1を実行すると、マクロで設定したタイトルバーがマクロ終了後もそのまま残るようになります。    
 * 
 * @example
 * title("タイトルバーです");
 * title(-1); // マクロで設定したタイトルバーがマクロ終了後も残る
 * 
 * @param target_location
 * どの部分に対する操作かを指定します。    
 * 省略した場合は0と同じです。   
 * - 0 タイトルバー（キャプション）が対象    
 * - 1 ステータスバーが対象    
 * - 2 見出しバーが対象    
 * - 3 タブモードのタブ名が対象    
 * 
 * target_locationを指定することで、ステータスバーや見出しバーの内容を変えることができます。    
 * ステータスバーの場合は、ファンクションキーとステータスバーを合体させていると表示されないので注意が必要です。    
 * 
 * @example
 * title("ステータスバーです", 1);
 * title(-1, 1);	//ステータスバーを維持する場合にも第２パラメータを指定
 * 
 * @comment
 * 参照：    
 * @see gettitle
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function title(title_behavior: number, target_location: number): number;

/**
 * s
 * 
 * run文は、他のプログラムを実行します。    
 * 
 * @param command
 * コマンドの文字列を指定します。
 * 
 * @example
 * run("notepad.exe");
 * 
 * @comment
 * run文はプログラムを起動したあと、マクロの次行以降をすぐに続行します。（標準入出力のリダイレクトが無ければ）    
 * 実行して待機する、runsync文, runsync2文もあります。    
 * 詳細なパラメータ指定する方法のrunex文もあります。    
 * 
 * @example
 * run("notepad.exe c:\\folder\\test.txt");
 * message("a");
 * 
 * @comment
 * run文は、"<con" や ">con" などを付けることにより標準入出力のリダイレクトが可能です。    
 * 詳細は、秀丸エディタヘルプの「プログラム実行の詳細」の項目を参照して下さい。    
 * 
 * 「<con」は、現在の秀丸の内容をShift-JISに変換してプログラムに渡します。    
 * 「>con」は、プログラムからの出力をShift-JISであると解釈して秀丸エディタに出力します。    
 * 範囲選択されている場合は範囲を置き換えます。新しい秀丸エディタで実行した場合は、    
 * その新しい秀丸エディタに出力します。    
 * 何かファイルを開いている場合は、新しい秀丸エディタに出力します。    
 * エンコードをそのまま扱いたい場合は、「<filename 」や「>filename」で直接入出力してください。    
 * run文で「>con」を指定して秀丸エディタが新しく起動する場合でも、    
 * マクロの実行が継続される秀丸は切り替わりません。    
 * 
 * @example
 * var shell = getenv("COMSPEC");
 * var command = shell + " /c echo %PATH% >con";
 * run(command);
 * 
 * @comment
 * run文に「%f」「%d」「%b」という文字を書いておくと、この文字は、それぞれ現在のファイル名やフォルダ名に置換されます。    
 * - %f    フルパスのファイル名 
 * - %d    フォルダ名 
 * - %b    フォルダを除いたファイル名 
 * - %%    % に置き換わります 
 * 
 * @example
 * run("notepad %f");
 * 
 * @comment
 * 参照：    
 * @see runex
 * @see runsync
 * @see runsync2
 * @see ファイルのエンコードのまま実行するマクロ
 * 
 * @comment
 * runex文を使うと、パラメータで細かく動作を指定できます。    
 * run "xxx.exe <con >con";    
 * と同じような処理を、    
 * runex "xxx.exe", 0, 1, "", 1, "", 1, "", 1, "", 0, 0, 0;    
 * というような細かいパラメータを指定して行うことができ、run文では指定できない同期/非同期を指定できます。
 * 
 * @returns
 * プログラムの起動に失敗すると0を返す。    
 * プログラムの起動に成功すると0以外を返す。
 */
declare function run(command: string): number;

/**
 * s
 * 
 * runsync文は、他のプログラムを実行し、プログラムが終了するまで待機します。    
 * プログラムを起動したあと、コマンドが終了するまで秀丸を最小化状態にして待機します。    
 *
 * @param command 
 * コマンドの文字列を指定します。
 * 
 * @example
 * runsync("notepad.exe");
 *
 * @comment
 * runsync文とrunsync2文は、標準入出力のリダイレクトはできません。    
 * 標準入出力をリダイレクトするには、run文, runex文を使ってください。    
 * run文のような「%f」「%d」「%b」の置換はありません。    
 * 
 * @comment
 * 参照：    
 * @see getresultex(9)
 * @see runex
 * @see run
 * 
 * @returns
 * プログラムの起動に失敗すると0を返す。    
 * プログラムの起動に成功すると0以外を返す。    
 * 起動に成功した場合の、commandにて実行したプログラムの終了ステータスはgetresultex(9)で取得可能です。
 */
declare function runsync(command: string): number;

/**
 * s
 * 
 * runsync2文はrunsync文と同様ですが、アイコン状態にしないで待機します。
 * 
 * @param command 
 * コマンドの文字列を指定します。
 * 
 * @comment
 * runsync文とrunsync2文は、標準入出力のリダイレクトはできません。    
 * 標準入出力をリダイレクトするには、run文, runex文を使ってください。    
 * run文のような「%f」「%d」「%b」の置換はありません。    
 * 
 * @example
 * runsync("notepad.exe c:\\folder\\test.txt");
 * message("a");
 * 
 * 参照：    
 * @see getresultex(9)
 * @see runex
 * @see run
 * 
 * @returns
 * プログラムの起動に失敗すると0を返す。    
 * プログラムの起動に成功すると0以外を返す。    
 * 起動に成功した場合の、commandにて実行したプログラムの終了ステータスはgetresultex(9)で取得可能です。
 */
declare function runsync2(command: string): number;

/**
 * s
 * 
 * runex文は、詳細なパラメータを指定してプログラムを実行します。    
 * 
 * @param command 
 * 実行するコマンドを文字列で指定します。    
 * ファイル名はrun文と同様に「%f」「%d」「%b」という文字を解釈します。    
 * %そのものを表す場合は「%%」と記述します。    
 * 
 * @param is_wait_sync 
 * 同期して実行するかどうかを指定します。
 * - 0:非同期
 * - 1:同期    
 * 
 * 非同期を指定していても、標準出力のパラーメータで、マクロを実行している秀丸エディタ自身で標準出力を受け取る場合は同期と同じになります。
 * 
 * @param stdin_prop 
 * 標準入力の方法を指定します。
 * - 0:なし
 * - 1:自動
 * - 2:ファイルの内容
 * - 3:(予約)
 * - 4:現在の内容
 * - 5:範囲選択の内容
 * 
 * @param in_filepath 
 * stdin_propが2のとき、ファイル名を指定します。    
 * それ以外では使わない場合でも""を指定してください。
 * 
 * @param stdout_prop 
 * - 0:なし
 * - 1:自動 (新規作成状態または範囲選択されている場合は挿入/置き換え、そうでなければ新規)
 * - 2:ファイルへ出力
 * - 3:ファイルへ追加
 * - 4:新規
 * - 5:挿入
 * - 6:範囲選択を置き換え
 * - 7:アウトプット枠へ出力(注)
 * - 8:アウトプット枠へ出力(消さずに追加)
 * 
 * @param out_filepath 
 * stdout_propが2または3のとき、ファイル名を指定します。    
 * それ以外では使わない場合でも""を指定してください。
 * 
 * @param stderr_prop 
 * 標準エラー出力の方法を指定します。
 * - 0:なし
 * - 1:標準出力と同じ または 自動
 * - 2:ファイルへ出力
 * - 3:ファイルへ追加
 * - 4:新規
 * - 5:挿入
 * - 6:範囲選択を置き換え
 * - 7:アウトプット枠へ出力(注)
 * - 8:アウトプット枠へ出力(消さずに追加)    
 * 
 * 標準出力フラグが 0 以外の時は、1～3 か、標準出力フラグと同じ値しか指定できません。
 * 
 * @param err_filepath 
 * stderr_propが2または3のとき、ファイル名を指定します。    
 * それ以外では使わない場合でも""を指定してください。
 * 
 * @param work_folder_prop 
 * 作業フォルダの決め方を指定します。    
 * - 0:指定なし
 * - 1:現在のファイルのフォルダ
 * - 2:フォルダを指定
 * - 3:(予約)
 * - 4:実行ファイルのフォルダ    
 *     作業フォルダは、実行するプログラムのカレントフォルダです。    
 *     標準入出力でファイルを指定している場合の相対パスの基準には使われません。    
 * 
 * @param work_folderpath
 * work_folder_propが2のとき、フォルダ名を指定します。
 * 
 * @param show_window_prop 
 * ウィンドウ表示の方法を指定します。
 * - 0:   自動
 * - 1:   表示
 * - 2:   非表示(SW_HIDE相当)    
 * 
 * 3以降はWindowsAPIのShellExecuteのnShowCmd相当に変換される値
 * - 3:   SW_SHOWMAXIMIZED/SW_MAXIMIZE
 * - 4:   SW_SHOWNOACTIVATE
 * - 5:   SW_SHOW
 * - 6:   SW_MINIMIZE
 * - 7:   SW_SHOWMINNOACTIVE
 * - 8:   SW_SHOWNA
 * - 9:   SW_RESTORE
 * - 10:  SW_SHOWDEFAULT
 * - 11:  SW_FORCEMINIMIZE
 * - 12:  SW_SHOWNORMAL
 * - 13:  SW_SHOWMINIMIZED
 * 
 * @param is_hide_redirect 
 * 標準出力をリダイレクト中、描画しないかどうかを指定します。    
 * - 0:描画する
 * - 1:標準出力をリダイレクト中は描画しない
 * 
 * @param n_encode 
 * エンコードの種類を指定します。
 * - 0:ANSI
 * - 2:Unicode(UTF-16)
 * - 6:Unicode(UTF-8)
 * それ以外のエンコードは指定できません。
 * 
 * @param extension_flags
 * 拡張フラグです。    
 * 以下の値の論理和です。    
 * - 0x0001:ファイル名部分で%の解釈をしないようになります。%を表す場合は「%」をそのまま書けるようになります。    
 * 
 * @example
 * runex(
 *    "filename.exe"
 *     , 1     //sync   0:async, 1:sync
 *     , 0, "" //stdin  0:none, 1:auto, 2:<file, 3:(reserved),
 *             //       4:current content, 5:selection
 *     , 1, "" //stdout 0:none, 1:auto, 2:>file 3:>>file, 4:new window,
 *             //       5:insert, 6:replace, 7:>output pane, 8:>>output pane
 *     , 0, "" //stderr 0:none, 1:auto or >>stdout, 2-8:same as stdout's param
 *     , 0, "" //folder 0:none, 1:current, 2:specify 3:(reserved), 4:exe's
 *     , 1     //show   0:auto, 1:show, 2:hide, 3-13:ShellExecute()'s SW_*
 *     , 1     //draw   0:draw, 1:no draw when stdout redirected
 *     , 0     //encode 0:ansi, 2:utf-16, 6:utf-8
 *     , 0     //extended flags
 *  );
 * 
 * @comment
 * 参照：
 * @see run
 * @see getresultex(9)
 * 
 * @returns
 * 成功時は0以外を返す。    
 * 失敗時は0を返す。    
 * getresultex(9)で同期実行したときの終了ステータスを取得できます。   
 */
declare function runex(command: string, is_wait_sync?: number, stdin_prop?: number, in_filepath?: string, stdout_prop?: number, out_filepath?: string, stderr_prop?: number, err_filepath?: string, work_folder_prop?: number, work_folderpath?: string, show_window_prop?: number, is_hide_redirect?: number, n_encode?: number, extension_flags?: number): number;

/**
 * s
 * 
 * disabledraw文は、画面の書き換えを禁止します。    
 *
 * マクロ起動時は許可状態になっています。    
 * 長い編集作業を短時間で終わらせたい場合に、まずdisabledrawして作業を開始し、    
 * 編集が終わったらenabledrawすると効果的です。     
 * 
 * ただし、enabledrawを実行するときに画面をすべて書き直すことになるので、    
 * 短時間で終わる処理をdisabledraw/enabledrawで囲むとかえって処理速度が低下することに注意してください。    
 * 
 * disabledrawの状態は、ウィンドウごとに状態を覚えています。    
 * disabledrawしてから、setactivehidemaruなどをして他の秀丸エディタに移すとdisabledrawの状態は解除されるので注意が必要です。    
 * 単純に描画だけをしないdisabledraw2もあります。    
 * 
 * @example
 * disabledraw();
 * gofiletop();
 * beginsel();
 * gofileend();
 * cut();
 * enabledraw();
 * 
 * @comment
 * disabledrawしたのにenabledrawを忘れたままマクロの実行が終了すると、自動的に画面をすべて書き換えます。    
 * 
 * enabledrawが実行された時、カーソルが画面のどの位置に表示されるかは秀丸エディタ側が適当に決めてしまいます。    
 * これをマクロ側で制御するには、enabledraw文のパラメータで画面の一番上の行番号（ワープロ的に計算した行番号）を指定してください。    
 * enabledrawのパラメータで指定されるスクロール位置は、現在のカーソル位置(y)が収まる範囲に自動的に調整されます。    
 * 画面は、カーソル上下キーで自動的にスクロールする範囲も除外されます。    
 * 例えば、現在のカーソル位置(y)が1000で、画面が50行で、カーソル上下でスクロールする領域が画面上3行、画面下3行の場合、enabledrawで指定できる範囲は、1000-3=997から、1000-50+3=953の範囲になります。    
 * この範囲から外れる場合は自動調整されます。    
 * disabledrawする前の、現在のスクロール位置はscreentopy, screenleftxで取得できます。    
 * 
 * @example
 * disabledraw();
 * searchdown("abc");
 * enabledraw(y - windowheight / 2);
 * 
 * @comment
 * enabledrawの第２引数で、横スクロール位置のx座標を指定できます。    
 * disabledrawする前の、現在のスクロール位置はscreentopy, screenleftxで取得できます。    
 * 
 * @example
 * var _screentopy = screentopy();
 * var _screenleftx = screenleftx();
 * disabledraw();
 * //～何らかの処理
 * enabledraw(_screentopy, _screenleftx);
 *
 * @comment
 * disabledraw中は、内部的にはウィンドウサイズをゼロとして高速に処理しています。    
 * enabledraw後にスクロール位置がずれるのもそのためです。rollup,rolldown等も正しいスクロール量でスクロールしません。    
 * 
 * disabledrawをすると、検索後のカーソル状態の情報は失われ、searchdown2などの連続した検索の動作に違いが出てきます。    
 * この問題を解消するには、setcompatiblemodeで0x00800000を指定すると、disabledrawの有無に関わらず、検索後のカーソル状態は維持されます。    
 * 
 * @comment
 * 参照：
 * @see enabledraw    
 * @see disabledraw2    
 * @see 影響の及ぶ範囲(execmacro)    
 * @see 影響の及ぶ範囲(アクティブ切り替え)    
 * 
 * @returns
 * 返り値は意味を持ちません。
 * 
 */
declare function disabledraw(): number;

/**
 * s
 * 
 * enabledraw文は、画面書き換えを許可します。    
 *
 * マクロ起動時は許可状態になっています。    
 * 長い編集作業を短時間で終わらせたい場合に、まずdisabledrawして作業を開始し、    
 * 編集が終わったらenabledrawすると効果的です。     
 * 
 * ただし、enabledrawを実行するときに画面をすべて書き直すことになるので、    
 * 短時間で終わる処理をdisabledraw/enabledrawで囲むとかえって処理速度が低下することに注意してください。    
 * 
 * disabledrawの状態は、ウィンドウごとに状態を覚えています。    
 * disabledrawしてから、setactivehidemaruなどをして他の秀丸エディタに移すとdisabledrawの状態は解除されるので注意が必要です。    
 * 単純に描画だけをしないdisabledraw2もあります。    
 * 
 * @example
 * disabledraw();
 * gofiletop();
 * beginsel();
 * gofileend();
 * cut();
 * enabledraw();
 * 
 * @comment
 * disabledrawしたのにenabledrawを忘れたままマクロの実行が終了すると、自動的に画面をすべて書き換えます。    
 * 
 * @param pos_y
 * enabledrawが実行された時、カーソルが画面のどの位置に表示されるかは秀丸エディタ側が適当に決めてしまいます。    
 * これをマクロ側で制御するには、enabledraw文のパラメータで画面の一番上の行番号（ワープロ的に計算した行番号）を指定してください。    
 * enabledrawのパラメータで指定されるスクロール位置は、現在のカーソル位置(y)が収まる範囲に自動的に調整されます。    
 * 画面は、カーソル上下キーで自動的にスクロールする範囲も除外されます。    
 * 例えば、現在のカーソル位置(y)が1000で、画面が50行で、カーソル上下でスクロールする領域が画面上3行、画面下3行の場合、enabledrawで指定できる範囲は、1000-3=997から、1000-50+3=953の範囲になります。    
 * この範囲から外れる場合は自動調整されます。    
 * disabledrawする前の、現在のスクロール位置はscreentopy, screenleftxで取得できます。    
 * 
 * @example
 * disabledraw();
 * searchdown("abc");
 * enabledraw(y - windowheight / 2);
 * 
 * @param pos_x
 * enabledrawの第２引数で、横スクロール位置のx座標を指定できます。    
 * disabledrawする前の、現在のスクロール位置はscreentopy, screenleftxで取得できます。    
 * 
 * @example
 * var _screentopy = screentopy();
 * var _screenleftx = screenleftx();
 * disabledraw();
 * //～何らかの処理
 * enabledraw(_screentopy, _screenleftx);
 *
 * @comment
 * disabledraw中は、内部的にはウィンドウサイズをゼロとして高速に処理しています。    
 * enabledraw後にスクロール位置がずれるのもそのためです。rollup,rolldown等も正しいスクロール量でスクロールしません。    
 * 
 * disabledrawをすると、検索後のカーソル状態の情報は失われ、searchdown2などの連続した検索の動作に違いが出てきます。    
 * この問題を解消するには、setcompatiblemodeで0x00800000を指定すると、disabledrawの有無に関わらず、検索後のカーソル状態は維持されます。    
 * 
 * @comment
 * 参照：
 * @see enabledraw    
 * @see disabledraw2    
 * @see 影響の及ぶ範囲(execmacro)    
 * @see 影響の及ぶ範囲(アクティブ切り替え)    
 * 
 * @returns
 * 返り値は意味を持ちません。
 * 
 */
declare function enabledraw(pos_y?: number, pos_x?: number): number;

/**
 * s
 * 
 * disabledraw2文は、画面の書き換えを禁止します。    
 * 
 * disabledrawとは違い、シンプルに描画だけをしないようになります。    
 * enabledrawでカーソル位置やスクロール位置がずれるということも無いです。    
 * マクロ終了後やenabledrawで自動的に再描画もしないので、必要に応じてredrawを実行する必要があります。
 * 
 * @comment
 * 参照：
 * @see redraw    
 * 
 * @returns
 * 返り値は意味を持ちません。
 * 
 */
declare function disabledraw2(): number;

/**
 * s
 * 
 * disablebreak文は、マクロの中断を禁止します。    
 * 
 * @comment
 * 秀丸エディタのマクロは実行中にESCキーを入力したり、マウスでクリックしたりすると「中断しますか？」と聞いてくる仕様になっています。    
 * disablebreak文を実行すると、そのマクロでは中断を一切受け付けなくなります。    
 * 
 * enablebreak文はdisablebreakされた状態を解除します。
 * 
 * @comment
 * 参照：    
 * @see enablebreak
 * @see 影響の及ぶ範囲(execmacro)
 * @see 影響の及ぶ範囲(アクティブ切り替え)
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function disablebreak(): number;

/**
 * s
 * 
 * enablebreak文はdisablebreakされた状態を解除します。    
 * 
 * @see disablebreak
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function enablebreak(): number;

/**
 * s
 * 
 * disableinvert文は、範囲選択のときの反転表示を禁止します。    
 * 
 * @comment
 * enableinvert文は、disableinvertを解除します。    
 * マクロ実行中の反転表示は目ざわりな場合が多いので、その場合はあらかじめdisableinvertしてから範囲選択すれば、画面上では反転せずに範囲選択されます。
 * 
 * @comment
 * 参照：    
 * @see enableinvert
 * @see 影響の及ぶ範囲(execmacro)
 * @see 影響の及ぶ範囲(アクティブ切り替え)
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function disableinvert(): number;

/**
 * s
 * 
 * enableinvert文は、disableinvertを解除します。    
 * 
 * @comment
 * 参照：    
 * @seedisableinvert
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function enableinvert(): number;

/**
 * s
 * 
 * disableerrormsg文は、各種のコマンドの中でエラーが発生してもエラーメッセージを表示しないようにします。    
 * enableerrormsg文は元に戻します。    
 * マクロ起動直後はenableになっています。    
 * 
 * 各種のコマンドの中でのエラーとは、例えば以下のような例があります。    
 * 
 * - appendsaveで指定されたファイルが見つからなかった 
 * - showcliphistで、ユーザが何も取り出さずにダイアログを閉じた 
 * - その他、「エラー」というタイトルのメッセージボックスが表示される処理すべて
 * （ただし、goto文でラベルが無いなど、マクロ実行に支障がある文法上のエラーなどは必ず表示されます） 
 * - disableerrormsgを実行しても、各関数のエラーなどの状況を示す返り値は変わりありません。
 * - disableerrormsg文を実行した場合はエラーになっていてもエラーダイアログが出なくなるため、    
 * 以後エラーの処理を正しく行うようにしてください。
 * 
 * @comment
 * 参照：
 * @see enableerrormsg
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function disableerrormsg(): number;

/**
 * s
 * 
 * enableerrormsg文は、disableerrormsg文によって抑制されたエラーメッセージを表示を、    
 * 元の表示される状態へと戻します。
 * 
 * @comment
 * 参照：
 * @see disableerrormsg
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function enableerrormsg(): number;

/**
 * s
 * 
 * disablehistory文は、マクロ実行中、各種ヒストリを取らないように指示する文です。    
 * 
 * @param history_flag
 * 引数に以下の値の論理和した値を入れて指示します。
 * - 0x0001　ファイルヒストリ
 * - 0x0002　フォルダヒストリ
 * - 0x0004　検索ヒストリ
 * - 0x0008　置換ヒストリ
 * - 0x0010　grepファイルヒストリ
 * - 0x0020　プログラム実行ヒストリ
 * - 0x0040　クリップボード履歴
 * - 0x0080　/nオプション,またはopenfileのnoaddhistと同じ扱い
 * - 0x0100　今開いているファイル(自分自身)をヒストリに残さないようにする
 *
 * 0x0001と0x0080と0x0100の違い    
 * - 0x0001 は、マクロ実行中に開いたり閉じたりしたときだけにファイルヒストリに残らなくなり、マクロが終了した後にファイルを閉じるとヒストリに残ります。
 * - 0x0080 は、マクロ実行中に開いたファイルは、マクロが終了した後もヒストリに残らなくなります。
 * - 0x0100 は、マクロ実行中にファイルを開かなくても、自分自身がヒストリに残らないようになります。一般的にはファイルを開いていた時点で既にヒストリにあるので効果は無いですが、changenameした場合に効果があります。
 * 
 * @comment
 * 参照：    
 * @see 影響の及ぶ範囲(execmacro)
 * @see 影響の及ぶ範囲(アクティブ切り替え)
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function disablehistory(history_flag: number): number;

/**
 * s
 * 
 * sleep文は、一定時間待ちます。    
 * 
 * @param millisecond
 * 待ち時間をミリ秒単位の数値を指定します。
 * 
 * @example
 * sleep(1000);
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function sleep(millisecond: number): number;

★★★ setcompatiblemode ★ function() { var m = "setcompatiblemode"; eval(fn); return r; }
/**
 * s
 * 
 * 秀丸エディタの浮動小数点版でのみ有効な機能となります。    
 * setfloatmode文は、浮動小数点数モードの切り替えをします。    
 * setfloatmodeを実行すると、resultは0になります。
 * 
 * @param to_floatmode_on
 * 0を指定すると、浮動小数点数モードがOFFになり、resultは0以外になります。    
 * 1を指定すると、浮動小数点数モードがONになり、resultは0以外になります。    
 * 
 * 浮動小数点数モードでは、以下の動作が通常とは違うようになります。    
 * - 数値変数が浮動小数点数になっている。（符号１ビット、仮数部５２ビット、指数部１１ビット）    
 * - str関数を使って数値を文字列に変換すると、小数点以下も付いて表示される。    
 * 場合によっては指数部付きの形式（+1.234E10のような形式）になることがある。    
 * - val関数を使って文字列を数値に変換する場合は、小数点以下も判断する。    
 * - hex関数を使って数値を16進数の文字列に変換すると、整数に変換して表示される。    
 * - 余りの計算（5 % 2等）の場合は両辺が整数に変換されてから実行される。    
 * - setregnum、getregnumの場合、数値は整数に変換されてから実行される。    
 * - writeininum、getininum文は、小数点付きの値も正しく処理する。    
 * - dllfuncで浮動小数点数用に作られたDLLを呼び出せる。    
 * 
 * 秀丸エディタ64bit版の浮動小数点版においては、setfloatmode 0;の状態では、数値は通常版32bitと同じ扱いになります。    
 * 
 * @comment
 * 参照：
 * @see 浮動小数点数モード
 * @see HideMath.dll
 * @see execmacro で別のマクロを実行する場合
 * @see setactivehidemaru 等で別の秀丸エディタに切り替わった場合
 * 
 * @returns
 * 秀丸エディタの浮動小数点版で実行すると、０以外の値が返ってくる。    
 * 秀丸エディタ通常版で実行すると、32bit版でも64bit版でも０が返ってくる。
 */
declare function setfloatmode(to_floatmode_on: number): number;

/**
 * f
 * 
 * seterrormode関数は、マクロ実行中に各種エラーを出すかどうかを指示します。    
 * 
 * @example
 * var ret = seterrormode(0, 0);
 * 
 * @param n_type 
 * 設定する種類を指定します。
 * 
 * @param n_value 
 * - n_type が0の場合    
 * disableerrormsg相当。    
 *   - n_type の意味：    
 *     - 0x00000000 enableerrormsgの状態    
 *     - 0x00000001 disableerrormsgの状態    
 * 
 * - n_type が1の場合    
 * 10秒待っても切り替えできないエラーを表示するどうか。    
 *   - n_type の意味：    
 *     - 0x00000000 表示しない(抑制する)    
 *     - 0x00000001 表示する(抑制しない)    
 * 
 * - n_type が2の場合        
 * 開くときのエンコードの種類関連。    
 *   - n_type の意味：マスク値(論理積した値)    
 *     - 0x0000000f 変換できない文字（デフォルトOFF）    
 *     - 0x000000f0 NULL文字（デフォルトOFF）    
 *     - 0x00000f00 複数マッチエンコードの選択（デフォルトOFF）    
 *     - 0x0000f000 書き込み許可で開くことができないときのエラー（デフォルトは動作環境に従う）    
 *     - 0x000f0000 改行文字のエラー（デフォルトOFF）    
 *     - 0x00f00000 見つからないときの新規作成の問い合わせ（デフォルトOFF）／選択結果はgetresultex(22)（V8.92以降）    
 *     - 0x0f000000 ファイル検索パスの問い合わせ（デフォルトON）／選択結果はgetresultex(21)（V8.92以降）    
 *   - マスクされたビットが 0 でデフォルト、1でON、2でOFFです。    
 *     （例：0x02002000 で、書き込み許可で開くことができないときのエラーをOFF、ファイル検索パスをOFF）    
 *   - 上記 0 のデフォルトというのは、「開く」「名前を付けて保存」などから操作した場合と同じ動作になるという意味ではありません。    
 *     マクロにとってのデフォルトということで、従来通りのマクロの既定の動作になります。    
 * 
 * - n_type が3の場合    
 * 開くときのエンコードの種類関連。    
 *   - n_type の意味：マスク値(論理積した値)    
 *     - 0x0000000f 上書き保存時の変換できない文字がある場合の問い合わせ（デフォルトON）    
 *     - 0x000000f0 ?に変換した後のメッセージ（デフォルトON）    
 *     - 0x00000f00 空だったとき（デフォルトON）    
 *     - 0x0000f000 無題で更新で空のとき（デフォルトOFF）    
 *   - マスクされたビットが 0 でデフォルト、1でON、2でOFFです。    
 *     （例：0x00000200 で、空だったときのエラーをOFF）    
 *   - 上記 0 のデフォルトというのは、「開く」「名前を付けて保存」などから操作した場合と同じ動作になるという意味ではありません。    
 *     マクロにとってのデフォルトということで、従来通りのマクロの既定の動作になります。    
 * 
 * - n_type が4の場合    
 * OKボタンだけがある一般的なメッセージを表示するかどうか。    
 *   - n_type の意味：マスク値(論理積した値)    
 *     - 0x00000000 表示しない(抑制する)    
 *     - 0x00000001 表示する(抑制しない)    
 * 
 * - n_type が5の場合    
 * call/gotoでラベルが見つからないときにエラーを出してマクロを中断するかどうか。    
 *   - n_type の意味：マスク値(論理積した値)    
 *     - 0x00000000 エラーを表示せず(抑制して)、次の文へマクロの実行を継続    
 *     - 0x00000001 エラーを表示して(抑制せず)、マクロの実行を中断    
 *   - エラーを表示しない場合、ラベルが見つからずに次の文に来たかどうかはgetresultex(17)で知ることができます。    
 * 
 * @comment
 * 参照：
 * @see seterrormode
 * @see disableerrormsg
 * @see enableerrormsg
 * @see 影響の及ぶ範囲(execmacro)    
 * @see 影響の及ぶ範囲(アクティブ切り替え)    
 * 
 * @comment
 * この関数の実行で変更されるのはパラメータ１の値に対応する状態のみで、    
 * パラメータ１以外のほかの状態には影響を与えません。    
 * （たとえばseterrormode 0,1;とした場合、以前に行ったseterrormode1,1;はそのまま保持される）    
 * 
 * @returns
 * 対象のn_typeに設定されているseterrormodeをする前の値が帰ってきます。    
 * これは設定状況を元へと戻すことを容易にするためです。    
 * 
 * @example
 * var n_type = 0;
 * var new_value = 1;
 * var old_value = seterrormode(n_type, new_value);として、設定すると同時に直前の値を知ることもできます。
 * message("設定前：0x"+hex(old_value)+"\n"+"設定後：0x"+hex(new_value));
 */
declare function seterrormode(n_type: number, n_value: number): number;


/**
 * s
 * 
 * setbackgroundmode文は、マクロを非アクティブな状態で実行できるようにします。    
 * この文をJavaScriptで使用するのは適していないかもしれません。    
 * 
 * setbackgroundmode(1);とすると、バックグラウンドモードが有効になります。    
 * setbackgroundmodeの主な目的は、setactivehidemaru等で２つの秀丸エディタを切り替えながら実行するマクロがあると、    
 * ウィンドウが前面に来てしまうことを防ぐためにあります。    
 * 例えば以下のマクロだと、非タブモードでウィンドウが２つある場合に前面に来てしまい、    
 * 他のアプリの操作や、手動起動で操作する秀丸エディタの操作が困難ですが、    
 * setbackgroundmode 1;をすると前面に来ないようになります。    
 * @example
 * // ウィンドウを切り替えながら実行するマクロの例
 * js {
 *     setbackgroundmode(1);
 *     setVar("#tabmode", tabmode());
 *     settabmode(0); // タブモードをやめる
 * }
 * 
 * newfile;
 * #a = hidemaruhandle(0);
 * setwindowpos 100, 200;
 * newfile;
 * #b = hidemaruhandle(0);
 * setwindowpos 200, 300;
 * setactivehidemaru #a;
 * #ix = 0;
 * while(#ix < 100){
 *     setactivehidemaru #a;
 *     insert "Aです\n";
 *     setactivehidemaru #b;
 *     insert "Bです\n";
 *     #ix = #ix + 1;
 * }
 * 
 * // settabmode #tabmode; とかは入れてもとへと戻そうとしては駄目。
 * // setbackgroundmode中にタブモードになると、マクロが終了時に不正な状態となってしまう。
 * 
 * endmacro; // setbackgroundmode(0)というものは存在しない。マクロが終了する必要がある。
 * 
 * @comment
 * 一度有効にすると、マクロが終了するまでは無効にすることはできません。    
 * バックグラウンドモードは、マクロ実行中の秀丸エディタが非アクティブな状態になっても、    
 * 実行中のマクロはその秀丸エディタ上で継続されます。    
 * openfileやnewfileで新しい秀丸エディタのウィンドウができる場合は、    
 * バックグラウンドモードでないときと同じように、新しい秀丸エディタにマクロの実行は切り替わります。    
 * バックグラウンドモードでは以下の制約があります。    
 * アクティブ切り替えは、順番による指定はできません。    
 * setactivehidemaru(1);で次の秀丸エディタをアクティブ、nexthidemaruで次の秀丸エディタをアクティブなど、順番の指定はできません。    
 * ウィンドウハンドルを指定して、setactivehidemaru #handle;とすることは可能です。    
 * 
 * @example
 * // できない例
 * setbackgroundmode 1;
 * //----
 * newfile;
 * setactivehidemaru 1;
 * 
 * @example
 * // できない例を回避する例
 * setbackgroundmode 1;
 * //----
 * #handle = hidemaruhandle(0);
 * newfile;
 * setactivehidemaru #handle;
 * 
 * @comment
 * - 他の秀丸エディタの情報取得で、順番の指定はできません。    
 * #a = hidemaruhandle(1);で次の秀丸エディタの情報を得るなど、順番による指定ではできません。    
 * #a = hidemaruhandle(0);として、自分自身の情報を得ることは可能です。    
 * 
 * - 特定の秀丸エディタの操作が制限される場合があります。    
 * マクロの実行を開始した秀丸エディタでなくても、    
 * setactivehidemaru等でマクロ実行を一度でも切り替えた秀丸エディタは、    
 * マクロが終了するまではキー入力などはできないようになります。    
 * 
 * - 検索バッファは個別になります。
 * 
 * @comment 
 * 参考：    
 * @see 影響の及ぶ範囲(execmacro)
 * @see 影響の及ぶ範囲(アクティブ切り替え)
 * 
 * @param to_background 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setbackgroundmode(to_background: 1): number;

/**
 * s
 * 
 * inputpos文は、ユーザからカーソル位置を入力してもらうための文です。    
 * 
 * この文を実行すると、ユーザはEnterキーを押すまでカーソルを自由に動かせるようになります。    
 * EnterキーまたはEscキーを押すと、inputposは処理を終了します。    
 * 
 * inputpos実行中は、ウィンドウのキャプションに文字列を表示します。    
 * ユーザがカーソル移動した後の位置は、キーワードxとyで参照することができます。    
 * EnterキーでもEscキーでも、カーソル位置は変わります。
 *  
 * @param text 
 * タイトルバー（キャプション）に表示させる文字列を指定します。
 * 
 * @example
 * inputpos("位置を指定してください。");
 * 
 * @example
 * var xOrg = x();
 * var yOrg = y();
 * var ret = inputpos("位置を指定してください。");
 * var xNew = x();
 * var yNew = y();
 * message("x:"+ xNew + " y:" + yNew + " result:" + ret);
 * if(ret == 0) {
 *    moveto(xOrg, yOrg);
 * }
 *
 * @returns
 * Enterキーを押して終わった場合は、resultは0以外になります。    
 * Escキーを押して終わった場合は、resultは0になります。    
 */
declare function inputpos(text: string): number;

/**
 * s
 * 
 * menu文はポップアップメニューを表示します。   
 * 
 * @param item1 
 * @param optional_items 
 * メニュー項目に表示される文字列を指定します。    
 * 項目の数だけ複数指定できます。    
 * 
 * @example
 * menu("項目A","項目B","項目C");
 * 
 * @example
 * var selected = menu("項目A","項目B","項目C");
 * if( selected == 0 ) {
 *    ;
 * } else if( selected == 1 ) {
 *     message("Aが選ばれました。");
 * } else if( selected == 2 ) {
 *     message("Bが選ばれました。");
 * } else if( selected == 3 ) {
 *     message("Cが選ばれました。");
 * }
 * 
 * @comment
 * マウスカーソルの近くにメニューを表示するにはmousemenu文を使います。    
 * 配列で指定する方式のmenuarray文もあります。    
 * 
 * @comment
 * セパレータにする場合は、"\x01"という文字列を指定します。    
 * 
 * サブメニューにする場合は、"\x01"に続いてサブメニューのメニュー名を記述します。    
 * その後の項目はサブメニュー内の項目として解釈されます。""を指定すると、サブメニューの終了を意味します。    
 * 
 * @example
 * var selected = menu(
 *   "\x01サブメニューA",
 *   "項目A-1",
 *   "項目A-2",
 *   "",
 *   "\x01サブメニューB",
 *   "項目B-1",
 *   "項目B-2",
 *   "",
 *   "項目C");
 * 
 * message(selected);
 * 
 * @comment
 * 参照：    
 * @see mousemenu
 * @see menuarray
 * @see setmenudelay
 * 
 * @returns
 * メニューを選択した場合、1から数えた項目の値になります。    
 * 選択しなかった場合、0になります。    
 */
declare function menu(item1: string, ...optional_items: string[]): number;

/**
 * s
 * 
 * mousemenu文はポップアップメニューを表示します。    
 * 引数等はmenuと同じです。    
 * メニューの表示位置がマウスカーソルの近くになります。    
 * 
 * @param item1 
 * @param optional_items 
 * メニュー項目に表示される文字列を指定します。    
 * 項目の数だけ複数指定できます。    
 * 
 * @example
 * mousemenu("項目A","項目B","項目C");
 * 
 * @example
 * var selected = mousemenu("項目A","項目B","項目C");
 * if( selected == 0 ) {
 *    ;
 * } else if( selected == 1 ) {
 *     message("Aが選ばれました。");
 * } else if( selected == 2 ) {
 *     message("Bが選ばれました。");
 * } else if( selected == 3 ) {
 *     message("Cが選ばれました。");
 * }
 * 
 * @comment
 * 参照：    
 * @see menu
 * @see setmenudelay
 * 
 * @returns
 * メニューを選択した場合、1から数えた項目の値になります。    
 * 選択しなかった場合、0になります。    
 */
declare function mousemenu(item1: string, ...optional_items: string[]): number;

/**
 * s
 * 
 * menuarray文は、ポップアップメニューを表示します。    
 * 機能はmenu文と同じで、引数を配列で指定する方式の文です。    
 * 文字カーソルの近くにメニューを表示します。
 * 
 * @param menu_items 
 * 配列形式で、メニュー内容を指定します。
 * 
 * @example
 * var arr =  [ "\x01サブメニューA",
 *   "項目A-1",
 *   "項目A-2",
 *   "",
 *   "\x01サブメニューB",
 *   "項目B-1",
 *   "項目B-2",
 *   "",
 *   "項目C"];
 * 
 * var selected = menuarray(arr);
 * message(selected);}
 * 
 * @param menu_len
 * 指定の数値のメニューの個数まで、メニュー項目を表示するという、どこまで表示するかを指定することが出来ます。    
 * 省略した場合は、全てのメニュー項目を表示します。    
 * 
 * @comment
 * 参照：
 * @see menu
 * @see mousemenuarray
 * @see setmenudelay
 * 
 * @returns
 * メニューを選択した場合、1から数えた項目の値になります。    
 * 選択しなかった場合、0になります。    
 */
declare function menuarray(menu_items: string[], menu_len?: number): number;

/**
 * s
 * 
 * mousemenuarray文は、ポップアップメニューを表示します。    
 * 引数等はmenuarrayと同じです。     
 * メニューの表示位置がマウスカーソルの近くになります。    
 * 
 * @param menu_items 
 * 配列形式で、メニュー内容を指定します。
 * 
 * @example
 * var arr =  [ "\x01サブメニューA",
 *   "項目A-1",
 *   "項目A-2",
 *   "",
 *   "\x01サブメニューB",
 *   "項目B-1",
 *   "項目B-2",
 *   "",
 *   "項目C"];
 * 
 * var selected = menuarray(arr);
 * message(selected);}
 * 
 * @param menu_len
 * 指定の数値のメニューの個数まで、メニュー項目を表示するという、どこまで表示するかを指定することが出来ます。    
 * 省略した場合は、全てのメニュー項目を表示します。    
 * 
 * @comment
 * 参照：
 * @see menu
 * @see mousemenuarray
 * @see setmenudelay
 * 
 * @returns
 * メニューを選択した場合、1から数えた項目の値になります。    
 * 選択しなかった場合、0になります。    
 */
declare function mousemenuarray(menu_items: string[], menu_len?: number): number;

/**
 * s
 * 
 * setmenudelay文は、menu, menuarray文の遅延時間を指定します。
 * 
 * @param millisecond 
 * 遅延時間をミリ秒単位で指定します。
 * 
 * @example
 * setmenudelay(1000);
 * 
 * @comment
 * menu, menuarray文を実行する直前に指定し、menu, menuarray文が実行されたら遅延時間はゼロにリセットされます。    
 * マクロを実行開始したときもゼロで、setmenudelayで指定したままマクロが終了しても、記憶されることはありません。    
 * 
 * 遅延時間の間は、メニューは現れず、キー操作のみが可能で、メニューを表示しないまま選択が可能です。    
 * キー操作が無いまま、遅延時間が経過するとメニューが現れます。    
 * 
 * @example
 * setmenudelay(1000);
 * menu("項目1(&A)");
 * 
 * 参考：
 * @see menu
 * @see menuarray
 * 
 * @returns
 * 返ってくる値に意味はない。
 */
declare function setmenudelay(millisecond: number): number;

/**
 * s
 * 
 * ダイアログボックスに表示されるメッセージを指定します。
 * 
 * @param message_text
 * ダイアログボックスに表示されるメッセージを指定します。
 * 
 * @param message_default
 * 入力欄にあらかじめ入力されている内容を指定します。
 * 
 * @param input_prop
 * ダイアログを出す位置の決め方と、入力欄の種類を指定します。
 * ダイアログを出す位置と入力欄の種類は以下の値を指定することができます。
 * - 0x00　通常（省略と同じ）
 * - 0x01　画面中央
 * - 0x02　画面左上からの位置
 * - 0x03　画面右上からの位置
 * - 0x04　画面左下からの位置
 * - 0x05　画面右下からの位置
 * - 0x06　カーソル位置
 * - 0x11　ウィンドウ中央
 * - 0x12　ウィンドウ左上からの位置
 * - 0x13　ウィンドウ右上からの位置
 * - 0x14　ウィンドウ左下からの位置
 * - 0x15　ウィンドウ右下からの位置
 * 
 * さらに以下の値を論理和で指定できます。    
 * - 0x0100　複数行の入力ボックス
 * - 0x0200　複数行の入力ボックスのとき折り返しあり
 * 
 * @param input_pos_x
 * 位置を指定している場合のX座標を指定します。
 * 
 * @param input_pos_y
 * 位置を指定している場合のY座標を指定します。
 * 
 * input_dialog_typeで左上/右上/左下/右下からの位置を指定しているときに、input_pos_x、input_pos_yのX,Y座標が使われます。    
 * X,Y座標の値は、DPIが100%のときのピクセル単位で、DPIが200%のときは指定の2倍の値のピクセル数になります。    
 * 
 * @example
 * var a = input( "入力してください", "", 0x01 ); //画面の中央
 * var a = input( "入力してください", "", 0x15, 100, 50 ); //ウィンドウ右下からの位置
 * 
 * @comment
 * 複数行の場合、改行コードは\r\nの２文字（\x0D\x0Aと同じ）で表す必要があります。    
 * gettext等で本文から取得されたテキストは、通常\r\nになっていますが、直接文字列で表す場合は、\r\nと書く必要があります。    
 * 
 * @example
 * var a = input( "入力してください", "あ\r\nい\r\nう", 0x0300 );    //複数行
 * 
 * @comment
 * TSV/CSVモードのセル内改行のテキストなど、場面に応じて改行コードが変わる場合は、文字列の置換をする必要がある場合があります。    
 * 置換をするには、strreplace関数でできます。    
 * 
 * @example
 * var s = "あ\nい\nう\nえ\nお";
 * var s = strreplace(s,"\n","\r\n");
 * var s = input( "Test", s, 0x0100 );
 * var s = strreplace(s,"\r\n","\n");
 * 
 * @example
 * var a = input("aaa", "bbb");
 * var r = result();
 * if (r == 1) {
 *     message("OKを押しました");
 * } else if (r == 0) {
 *     message("キャンセルを押しました");
 * }
 * 
 * @returns
 * 入力された文字列を返します。    
 * 返り値以外にも、result()にも選択ボタンの状況を反映します。    
 * 「OK」を押したならinput実行直後、result()は1になります。    
 * 「キャンセル」を押したなら、input実行直後は、result()は0になります。
 */
declare function input(message_text: string, message_default?: string, input_prop?: number, input_pos_x?: number, input_pos_y?: number): number;


/**
 * f
 * 
 * inputchar関数は、キー入力の待機状態にして、入力されたキーの文字コードを取得します。
 * 
 * @param wait_titlebar_text 
 * 待機状態のときのタイトルバーの内容を文字列で指定します。
 * 
 * @example
 * var c = inputchar("キーを入力してください");
 * 
 * @comment
 * 入力した文字は画面には表示されません。
 * カーソル移動キーが押された場合は文字コードは、以下のようになります。
 * - 左    0x1C 
 * - 上    0x1D 
 * - 右    0x1E 
 * - 下    0x1F 
 * 
 * @param millisecond 
 * 指定しないか0を指定すると、タイムアウトしません。    
 * 数値を指定すると、ミリ秒単位の時間経過後にタイムアウトします。
 * 
 * @param is_title_keep 
 * 1を指定すると、タイトルを変えないようになります。
 * 
 * @example
 * var c = inputchar("キーを入力してください",5000);
 * message(hex(c));
 * 
 * @comment
 * 参照：
 * @see iskeydown
 * @see keypressed
 * @see keypressedex
 * 
 * @returns
 * 文字コードを返します。    
 * タイムアウトした場合は0が返ります。
 */
declare function inputchar(wait_titlebar_text: string, millisecond?: number, is_title_keep?: number): number;

/**
 * s
 * 
 * iskeydown関数は、指定されたキーの状態を取得します。
 * 
 * @example
 * var f =iskeydown( 'A' );
 * 
 * @param virtual_key 
 * 仮想キーコードを指定します。
 * 
 * そのキーが押されている場合は 1、そうでない場合は 0 を返します。    
 * 主なキーコードは以下の通りです。このキーコードは、inputcharが返す値とは違う値なので注意してください。
 * 
 * - Shift    0x10 
 * - Ctrl    0x11 
 * - Alt    0x12 
 * - 左    0x25 
 * - 上    0x26 
 * - 右    0x27 
 * - 下    0x28 
 * - 0～9    0x30～0x39 
 * - A～Z    0x41～0x5A 
 * 
 * 実はこの関数は、Win32APIであるGetKeyState()を呼び出しているだけです。    
 * Win32APIのリファレンスの仮想キーコードの一覧を見ると調べることが出来ます。    
 * 
 * この関数を利用すれば、キー割り当てで、たくさんのキーに同じマクロを割り当てても、    
 * 「マクロ開始時になんのキーをおしているか？」でマクロファイル内で分岐する処理が可能になります。    
 * たとえば、Ctrl+上,下,左,右のキーに全て「マクロ1」を割り当てます。
 * 
 * @example
 * if( iskeydown(0x25) ) { 「←」の処理 }
 * if( iskeydown(0x26) ) { 「↑」の処理 }
 * if( iskeydown(0x27) ) { 「→」の処理 }
 * if( iskeydown(0x28) ) { 「↓」の処理 }
 * 
 * @comment
 * マクロ起動直後のキー状態が取得できるのは、マクロ実行開始から１秒以内です。
 * また、１秒以内であっても以下の関数・文を呼んだ後では起動直後のキー状態は取得できません。
 * keypressed, ddewaitadvice, localgrep, runsync, menu系文
 * 
 * @param key_info_type 
 * 省略するか0を指定すると、キーが押されているかどうかを取得します。    
 * 1 を指定すると、キーのトグル状態を取得します。    
 * トグルとは「CapsLock」キーや「半角・全角・漢字」や「NumLock」キーなど、    
 * キーを押すと、（押しっぱなしでなくとも）状態が変わることです。
 * 
 * @example
 * 例 
 * if( iskeydown( 0x14, 1 ) ) { 「CapsLock」が有効のときの処理 }
 * 
 * @comment
 * 参照：
 * @see inputchar
 * @see keypressed
 * @see keypressedex
 * 
 * @returns
 * キーの状態を返します。    
 * 
 * key_info_typeが0もしくは省略した場合、    
 * virtual_keyが押されている場合は 1、そうでない場合は 0 を返します。    
 * 
 * key_info_typeが1の時、    
 * 対象のvirtual_keyのトグル状態を示す値を返します。
 */
declare function iskeydown(virtual_key: string, key_info_type?: number): number;

/**
 * f
 * 
 * getininum関数は、INIファイルから数値を取得します。 
 * 文字列を取り出す場合は、この関数ではなく、getinistr関数を使ってください。
 * 
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @example
 * // INIファイルの例 
 * [Hello]
 * Number=123
 * String=XYZ
 * 
 * var a = getininum("C:\\Folder\\Test.ini","Hello","Number");
 * message(a);
 *
 * @comment
 * 参照：
 * @see getinistr
 * @see writeinistr
 * @see writeininum
 *
 * @returns 
 * 値を数値に変換して返します。    
 * 取り出した値が数値に変換不能な場合は0が返ります。
 */
declare function getininum(ini_filepath: string, section_name: string, key_name: string): number;

/**
 * f
 * 
 * getininumwは、getininumのUnicode版です。    
 * 使い方はgetininumと同じです。
 * 
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @example
 * // INIファイルの例 
 * [Hello]
 * Number=123
 * String=XYZ
 * 
 * var a = getininum("C:\\Folder\\Test.ini","Hello","Number");
 * message(a);
 *
 * @comment
 * 参照：
 * @see getinistrw
 * @see writeinistrw
 * @see writeininumw
 *
 * @returns 
 * 値を数値に変換して返します。    
 * 取り出した値が数値に変換不能な場合は0が返ります。
 */
declare function getininumw(ini_filepath: string, section_name: string, key_name: string): number;

/**
 * f
 * 
 * getinistr関数は、INIファイルから文字列を取得します。 
 * 数値を取り出す場合は、この関数ではなく、getininum関数を使ってください。
 * 
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @example
 * // INIファイルの例 
 * [Hello]
 * Number=123
 * String=XYZ
 * 
 * var a = getinistr("C:\\Folder\\Test.ini","Hello","String");
 * message(a);
 *
 * @comment
 * 参照：
 * @see getininum
 * @see writeinistr
 * @see writeinistr
 *
 * @returns 
 * 値を数値に変換して返します。    
 * 取り出した値が数値に変換不能な場合は0が返ります。
 */
declare function getinistr(ini_filepath: string, section_name: string, key_name: string): number;

/**
 * f
 * 
 * getinistrwは、getinistrのUnicode版です。    
 * 使い方はgetinistrと同じです。
 * 
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @example
 * // INIファイルの例 
 * [Hello]
 * Number=123
 * String=XYZ
 * 
 * var a = getinistr("C:\\Folder\\Test.ini","Hello","String");
 * message(a);
 *
 * @comment
 * 参照：
 * @see getininumw
 * @see writeinistrw
 * @see writeinistrw
 *
 * @returns 
 * 値を数値に変換して返します。    
 * 取り出した値が数値に変換不能な場合は0が返ります。
 */
declare function getinistrw(ini_filepath: string, section_name: string, key_name: string): number;

/**
 * s
 * 
 * writeininum文は、INIファイルに数値のデータを書き込みます。
 * 文字列を書き込む場合は、この関数ではなく、writeinistr関数を使ってください。
 *
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @param num_value
 * 書き込む内容の数値を指定します。
 * 
 * @example
 * writeininum("C:\\MyFolder\\Test.ini", "TestSec", "TestNumKey", #a + 10);
 * 
 * @returns 
 * 返り値は意味を持ちません。
 */
declare function writeininum(ini_filepath: string, section_name: string, key_name: string, num_value: number): number;

/**
 * s
 * 
 * writeininumw文は、writeininumのUnicode版です。    
 * 使い方はwriteininumと同じです。
 *
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @param num_value
 * 書き込む内容の数値を指定します。
 * 
 * @example
 * writeininumw("C:\\MyFolder\\Test.ini", "TestSec", "TestNumKey", #a + 10);
 * 
 * @returns 
 * 返り値は意味を持ちません。
 */
declare function writeininumw(ini_filepath: string, section_name: string, key_name: string, num_value: number): number;

/**
 * s
 * 
 * writeinistr文は、INIファイルに文字列のデータを書き込みます。
 * 数値を書き込む場合は、この関数ではなく、writeininum関数を使ってください。
 *
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @param str_value
 * 書き込む内容の文字列を指定します。
 * 
 * @example
 * writeinistr("C:\\MyFolder\\Test.ini", "TestSec", "TestNumKey", #a + 10);
 * 
 * @returns 
 * 返り値は意味を持ちません。
 */
declare function writeinistr(ini_filepath: string, section_name: string, key_name: string, str_value: value): number;

/**
 * s
 * 
 * writeinistrw文は、writeinistrのUnicode版です。    
 * 使い方はwriteinistrと同じです。
 *
 * @param ini_filepath 
 * INIファイルのファイル名を指定します。    
 * INIファイル名は、フルパスで書いてください。    
 * 拡張子が.iniである必要はなく、どんな拡張子でもかまいません。    
 * 
 * @param section_name
 * セクション名を指定します。
 *  
 * @param key_name 
 * キー名を指定します。
 * 
 * @param str_value
 * 書き込む内容の文字列を指定します。
 * 
 * @example
 * writeinistrw("C:\\MyFolder\\Test.ini", "TestSec", "TestNumKey", #a + 10);
 * 
 * @returns 
 * 返り値は意味を持ちません。
 */
declare function writeinistrw(ini_filepath: string, section_name: string, key_name: string, str_value: string): number;

/**
 * s
 * 
 * openreg文は、レジストリをオープンします。
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru\\Env");
 *
 * @param root_key
 * ルートとなるキー名を指定します。    
 * 以下の文字列が指定可能です。    
 * - "CLASSESROOT"（HKEY_CLASSES_ROOTに対応）
 * - "CURRENTUSER"（HKEY_CURRENT_USERに対応）
 * - "LOCALMACHINE"（HKEY_LOCAL_MACHINEに対応）
 * - "USERS"（HKEY_USERSに対応）
 * 
 * @param sub_key
 * サブキー名を指定します。
 * 
 * @param own_hidemaru_reg
 * 指定しないか0を指定する場合、32bit版は32bit版の情報、64bit版は64bit版の情報にそのままアクセスします。    
 * 1を指定すると、32bit版でも64bitの情報にアクセスします。    
 * 2を指定すると、64bit版でも32bitの情報にアクセスします。    
 * 
 * @comment
 * 64bit版/32bit版の注意：    
 * 64bit版のWindowsにおける、64bit版の秀丸エディタと32bit版の秀丸エディタでは参照するレジストリの場所が異なる場合があります。    
 * 32bit版の「HKEY_LOCAL_MACHINE\SOFTWARE」配下は、64bit版の「HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node」配下と同じになります。   
 * 64bit版の「HKEY_LOCAL_MACHINE\SOFTWARE」配下は、32bit版ではそのままではアクセスできません。    
 * HKEY_CURRENT_USERは32bitでも64bitでも同じです。    
 * 
 * @comment
 * openregは、指定されたサブキーが存在しない場合に失敗となります。    
 * createregは、指定されたサブキーが存在しない場合は新たに作成してからオープンします。    
 * 複数のレジストリを同時にオープンすることはできません。    
 * レジストリのオープン状態は、現在の秀丸エディタだけで有効です。    
 * nexthidemaru等で秀丸エディタを切り替えた先では有効ではありません。    
 * 
 * @comment
 * 管理者権限の注意：    
 * HKEY_CURRENT_USER以外は管理者権限がないと書き込みはできません。    
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。
 */
declare function openreg(root_key: string, sub_key: string, own_hidemaru_reg?: number): number;

/**
 * s
 * 
 * createreg文は、レジストリをオープンします。
 * 
 * @example
 * cretereg("CURRENTUSER", "Software\\MyApp");
 *
 * @param root_key
 * ルートとなるキー名を指定します。    
 * 以下の文字列が指定可能です。    
 * - "CLASSESROOT"（HKEY_CLASSES_ROOTに対応）
 * - "CURRENTUSER"（HKEY_CURRENT_USERに対応）
 * - "LOCALMACHINE"（HKEY_LOCAL_MACHINEに対応）
 * - "USERS"（HKEY_USERSに対応）
 * 
 * @param sub_key
 * サブキー名を指定します。
 * 
 * @param own_hidemaru_reg
 * 指定しないか0を指定する場合、32bit版は32bit版の情報、64bit版は64bit版の情報にそのままアクセスします。    
 * 1を指定すると、32bit版でも64bitの情報にアクセスします。    
 * 2を指定すると、64bit版でも32bitの情報にアクセスします。    
 * 
 * @comment
 * パラメータはopenregと同じです。    
 * openregは、指定されたサブキーが存在しない場合に失敗となります。    
 * createregは、指定されたサブキーが存在しない場合は新たに作成してからオープンします。    
 * レジストリのオープン状態は、現在の秀丸エディタだけで有効です。nexthidemaru等で秀丸エディタを切り替えた先では有効ではありません。    
 * 管理者権限の注意、64bit版/32bit版の注意、持ち出しキットの注意などもopenregと同じです。
 * 
 * @comment
 * 参照：
 * @see openreg
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。
 */
declare function createreg(root_key: string, sub_key: string, own_hidemaru_reg?: number): number;

/**
 * s
 * 
 * closereg文は、オープンしたレジストリをクローズします。
 * 
 * @example
 * closereg();
 * 
 * @comment
 * 参照：
 * @see openreg
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function closereg(): number;

/**
 * s
 * 
 * deletereg文は、レジストリのキーを削除します。
 * 
 * @example
 * deletereg("CURRENTUSER", "Software\\xxxx\\yyyy");
 *
 * @param root_key
 * ルートとなるキー名を指定します。
 * 
 * @param sub_key
 * サブキー名を指定します。
 * 
 * @param own_hidemaru_reg
 * 指定しないか0を指定する場合、32bit版は32bit版の情報、64bit版は64bit版の情報にそのままアクセスします。    
 * 1を指定すると、32bit版でも64bitの情報にアクセスします。    
 * 2を指定すると、64bit版でも32bitの情報にアクセスします。    
 * 
 * @comment
 * パラメータの指定の仕方はopenreg/createregと同じです。    
 * キーの中にサブキーがある場合でも、それらをまとめて削除します。    
 * 管理者権限の注意、64bit版/32bit版の注意、持ち出しキットの注意などもopenregと同じです。
 * 
 * @returns
 * 成功したら0以外を返す。    
 * 失敗したら0を返す。
 */
declare function deletereg(root_key: string, sub_key: string, own_hidemaru_reg?: number): number;

/**
 * f
 * 
 * getregbinary関数は、レジストリからREG_BINARY型のバイナリ値を、文字列に変換して取得します。
 * 
 * @param name 
 * 値の名前を指定します。    
 *
 * 値を書き込むにはwriteregbinaryを使います。
 * 
 * @param seek_cur 
 * 0から数えた何バイト目から取得するかを指定します。    
 * 省略した場合は0になります。
 * 
 * @param read_size 
 * 何バイト分取得するかのサイズを指定します。    
 * 省略した場合は全てのサイズになります。    
 * サイズは2000バイト分が上限です。
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru\\Env");
 * var s = getregbinary( "TabEditMouse", 0, 10 );
 * closereg();
 * message(s);
 * 
 * @comment
 * 参照：
 * @see writeregbinary
 * 
 * @returns
 * 16進数の文字列として、１バイトあたり２文字の文字列で返します。
 */
declare function getregbinary(name: string, seek_cur?: number, read_size?: number): string;

/**
 * f
 * 
 * getregnum関数は、オープンされたレジストリからREG_DWORD型の値を数値を取得します。    
 * 
 * REG_DWORD型の値を書き込むには、writeregnumを使います。    
 * 
 * @param name 
 * 値の名前を指定します。    
 * 既定の値(標準の値)を取得する場合は、空の文字列（""）を指定します。    
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru");
 * var n = getregnum( "RegVer")
 * closereg();
 * message(hex(n));
 * 
 * @comment
 * 参照：
 * @see writeregnum
 * 
 * @returns
 * 数値の内容を返します。
 */
declare function getregnum(name: string): number;

/**
 * f
 * 
 * getregstr関数は、オープンされたレジストリからREG_SZ型の文字列値を取得します。    
 * 
 * REG_SZ型の値を書き込むには、writeregstrを使います。
 * 
 * @param name 
 * 値の名前を指定します。    
 * 既定の値(標準の値)を取得する場合は、空の文字列（""）を指定します。    
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru");
 * var s = getregstr( "Spec");
 * closereg();
 * message(s);
 * 
 * @comment
 * 参照：    
 * @see writeregstr
 * 
 * @returns
 * 文字列値の内容を返します。
 */
declare function getregstr(name: string): string;

/**
 * s
 * 
 * writeregbinary文は、レジストリにREG_BINARY型のバイナリ値を書き込みます。    
 *
 * 値を読み込むにはgetregbinaryを使います。    
 * 
 * @param name 
 * 値の名前を指定します。    
 * 
 * @param value
 * バイナリ値を16進数の文字列として1バイトを2文字として指定します。
 * 
 * @param seek_cur 
 * 値を上書きする場合、0から数えた何バイト目から上書きするかを指定します。    
 * 省略した場合は0になります。    
 * 
 * @param write_mode 
 * 値を上書きする場合、全体のサイズを切り詰めるかどうかを指定します。    
 * 0を指定すると切り詰め、1を指定すると切り詰めません。    
 * 省略した場合は0と同じになります。
 * 
 * @example
 * // TabEditMouseの最初から6バイトを上書き、7バイト目以降はそのまま残す
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru\\Env");
 * writeregbinary("TabEditMouse", "0100FFFF0000", 0, 1);
 * closereg();
 * 
 * @comment
 * 参照：
 * @see getregbinary
 * 
 * @returns
 * 成功した場合はresultは0以外になります。    
 * 失敗した場合はresultは0になります。    
 */
declare function writeregbinary(name: string, value: string, seek_cur?: number, write_mode?: number): string;

/**
 * s
 * 
 * writeregnum文は、レジストリにREG_DWORD型の値を書き込みます。    
 * 
 * REG_DWORD型の値を読み込むにはgetregnumを使います。    
 * 
 * @param name 
 * 値の名前を指定します。    
 * 
 * @param value
 * 数値で値を指定します。
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru\\Env");
 * writeregnum("HorzScroll", 1);
 * closereg();
 * envchanged();
 * 
 * @comment
 * 参照：
 * @see getregnum
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function writeregnum(name: string, value: number): number;

/**
 * s
 * 
 * writeregstr文は、レジストリにREG_SZ型の値を書き込みます。    
 * 
 * REG_SZ型の値を読み込むにはgetregstrを使います。    
 * 
 * @param name 
 * 値の名前を指定します。    
 * 
 * @param value
 * 文字列値で値を指定します。
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru\\Env");
 * writeregstr("Spec", "*.*");
 * closereg();
 * envchanged();
 * 
 * @comment
 * 参照：
 * @see getregstr
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function writeregstr(name: string, value: string): number;

/**
 * f
 * 
 * enumregkey関数は、オープンされたレジストリのサブキーを列挙します。
 * 
 * @param subkey_ix 
 * 0から始まるサブキーのインデックスを指定します。
 * 
 * 0から順番に呼んで、""を返したら終わりです。
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru");
 * var i = 0;
 * while(true) {
 *    var a = enumregkey(i);
 *    if (a=="") {
 *        break;
 *    }
 *    insert(a+"\n");
 *    i++;
 * }
 * closereg();
 * 
 * @comment
 * 参照：
 * @see openreg
 * @see closereg
 * 
 * @returns
 * サブキーを文字列で返します。    
 * ""を返したらこれ以上のサブキーはありません。    
 */
declare function enumregkey(subkey_ix: number): string;

/**
 * f
 * 
 * enumregvalue関数は、オープンされたレジストリの値名と値の種類を列挙します。
 * 
 * @param subkey_ix 
 * 0から始まるサブキーのインデックスを指定します。
 * 0から順番に呼んで、""を返したら終わりです。
 * 
 * @param return_obj    
 * 値の種類を受け取るオブジェクトを渡します。    
 * オブジェクトを渡し、オブジェクトのregtypeメンバに値が格納されます。    
 * 例えば、以下のようなオブジェクトです。    
 * 
 * 値の種類は、以下の値になります。    
 * - REG_SZ 1 (getregstrに対応)    
 * - REG_BINARY 3 (getregbinaryに対応)    
 * - REG_DWORD 4 (getregnumに対応)    
 * 
 * これ以外の種類の場合は違う値になりますが、対応する読み込む関数はありません。    
 * 
 * @example
 * openreg("CURRENTUSER", "Software\\Hidemaruo\\Hidemaru");
 * var i = 0;
 * while( 1 ) {
 *    var obj = { regtype:0 };
 *    var strVal = enumregvalue( i, obj );
 *    var nRegType = obj.regtype;
 *    if( strVal == "" ) { break; }
 *       insert( strVal + "\t" + nRegType + "\n" );
 *    i++;
 * }
 * closereg();
 * 
 * @comment
 * 参照：
 * @see openreg
 * @see closereg
 * 
 * @returns
 * 値名を文字列で返します。    
 * ""を返したらこれ以上の値はありません。
 */
declare function enumregvalue(subkey_ix: number, return_obj: { regtype: number } | {}): string;

/**
 * st
 * 
 * configset文は、ファイルタイプ別の設定を、「設定のリスト」の名前を指定して変更します。
 * 
 * @param setting_name
 * 設定の名前を指定します。    
 * 設定のリストの中にある名前を指定します。   
 * ""を指定すると、「共通」の設定になります。
 * 
 * @param config_state
 * 設定を記憶するかどうかを指定します。    
 * - 0 を指定すると、ファイルタイプ別の設定は一時的な設定になります。    
 * ファイルタイプに関連付けられている設定のリストは維持されます。    
 * この状態で、saveconfig文を使うと、もともと指定されていた設定のリストに上書きされて保存されるので、注意してください。
 * - 1を指定すると、一時的な設定にはならず保存されます。    
 * ファイルタイプに関連付けされている設定のリストは切り替わります。    
 * 新規作成時の秀丸エディタに 1 を指定しても適用されません。    
 * 現在の設定のリストの名前はcurrentconfigsetキーワードで表されます。（ファイルタイプ別の設定関連)
 * 
 * @example
 * configset("C言語ｿｰｽﾌｧｲﾙ", 1);
 * 
 * @returns
 * 成功したら0以外を返します。    
 * 失敗したら0を返します。
 */
declare function config(string: setting_name, number: config_state): number

type typeConfigSettingName = "Font"|"FontSize"|"FontPoint"|"FontDecimal"|"FontCharSet"|"BoldFace"|"Orikaeshi"|"AutoAdjustOrikaeshi"|"Kinsoku"|"CorrectLineNo"|"LF"|"CharSpace"|"Tategaki"|"Dangumi"|"FreeCursor"|"SaveLastPos"|"Tab"|"TabMode"|"Indent"|"Blockquote"|"BquoteItemized"|"BquoteInclude"|"BlockquoteFix"|"UnderLine"|"ImeColorCurLine"|"HideCR"|"ShowCR"|"HideEOF"|"ShowEOF"|"ShowTab"|"ShowBox"|"Ruler"|"TabRuler"|"ShowLineNo"|"ShowPageNo"|"FormLine"|"ActiveKakko"|"ActiveTagPair"|"VertLine"|"GuideLine"|"GuideLineInterval"|"OrikaeshiLine"|"LastColor"|"Stripe"|"ColorNum"|"ColorUrl"|"ColorEmail"|"ColorFN"|"CurLineColor"|"CurLineColorEx"|"RulerColor"|"RulerBack"|"ColorComment"|"AspDefaultScript"|"Asp"|"JspComment"|"Php"|"Xml"|"ColorIfdef"|"Hilight"|"HilightTitle"|"HilightDirectWord"|"HilightDirectMulti"|"HilightDirectIfdef"|"Outline"|"ClistFont"|"ClistFontSize"|"HilightList"|"OutlineBar"|"RangeEdit"|"Folding"|"FoldingTwigBar"|"Ime"|"AutocompFlag1"|"AutocompFlag2"|"AutocompDic"|"AutocompAuto"|"FiletypeCharcode"|"SaveConv"|"StripTrail"|"SaveWithEOF"|"IgnoreEOF"|"Backup"|"BackupFast";
/**
 * f
 * 
 * getconfig関数は、ファイルタイプ別の設定の値を、設定の名前で取得します。
 * 
 * config("x...")で指定できる名前と同じものを指定します。
 *（getconfigのときは 頭についている x は不要です ）
 * 
 * @example
 * message(getconfig( "Font" ));
 * message(getconfig( "Tab" ));
 * message(getconfig( "FreeCursor" ));
 * message(getconfig( "xFont" ));	//失敗します。xは書かなくていいです。
 * 
 * @param setting_name
 * ファイルタイプ別の設定の値を、設定の名前で取得します。
 * - Font(文字列)    
 *     フォントの名前    
 *     参照：fontmode
 * - FontSize(数値)    
 *     フォントサイズ（ドット数） 
 * - FontPoint(数値)    
 *     フォントサイズ（ポイント） 
 * - FontDecimal(数値)    
 *     フォントサイズ（ポイント，小数点以下） 
 * - FontCharSet(数値)    
 *     フォントの文字セット 
 * - BoldFace(フラグ)    
 *     太字 
 * --------------------------------------------------------------------------------
 * - Orikaeshi(数値)    
 *     折り返し桁数 
 * - AutoAdjustOrikaeshi(数値)    
 *     - 0:折り返し桁数を固定
 *     - 1:折り返し桁数をウィンドウ幅に合わせる
 *     - 2:折り返し桁数を最大
 * - Kinsoku(フラグ)    
 *     禁則処理 
 * --------------------------------------------------------------------------------
 * - CorrectLineNo(フラグ)    
 *     行番号の計算方法がエディタ的かどうか 
 * - LF(数値)    
 *     行間（0～11） 
 * - CharSpace(数値)    
 *     文字間（0～11）
 *  
 * - Tategaki(数値)    
 *     - 縦書きのフラグ
 *     以下のフラグの論理和
 * 
 *     - 0x0001　縦書き
 *     - 0x0002　行番号も縦書き
 *     - 0x0004　半角も縦書き
 *     - 0x0008　半角漢数字
 *     - 0x0010　半角数字２文字をセットにして縦書きにする
 *     - 0x0020　カーソル行の下線モードは右側
 *     - 0x0040　全角の記号類を９０度回転
 * 
 * - Dangumi(数値)    
 *     段組数    
 *     マイナスのときは無効。マイナス値で数を記憶。  
 * - FreeCursor(フラグ)    
 *     フリーカーソルモード    
 *     閲覧モードでは2になります。
 *  
 * - SaveLastPos(フラグ)    
 *     カーソル位置の自動復元 
 * --------------------------------------------------------------------------------
 * - Tab(数値)    
 *     タブの文字数
 *     マイナス値にするとタブキーで空白入力。
 * - TabMode(数値)    
 *     TSVモード/CSVモード/自由配置モード    
 *     - 0x000fで論理積(&)されたビット
 *         - 0x0000　通常モード
 *         - 0x0001　TSVまたはCSVモード（TSVかCSVかは0x0100で判断）
 *         - 0x0002　自由配置モード
 * 
 *     - 0x0f00で論理積(&)されたビット
 *         - 0x0100　CSVモード（0x0001もあるとき）    
 * 
 *     - 参照：fontmode
 *  
 * - Indent(数値)    
 *     自動インデント 
 * - Blockquote(フラグ)    
 *     行頭のタブ文字で段落全体をインデントする 
 * - BquoteItemized(フラグ)    
 *     箇条書きへのインテリジェントな対応 
 * - BquoteInclude(文字列)    
 *     インデント対象に追加する文字 
 * - BlockquoteFix(数値)    
 *     指定桁数をインデントする     
 * --------------------------------------------------------------------------------
 * - UnderLine(数値)    
 *     カーソル行の下線モード    
 *     - 0で文字色モード、
 *     - 1で下線モード、
 *     - 2で背景色モード  
 * - ImeColorCurLine(数値)    
 *     カーソル関係のフラグ    
 *     - 以下のフラグの論理和
 *         - 0x0001　「カーソル行(IME ON時)」が有効かどうか
 *         - 0x0002　「IME変換中の色」が有効かどうか
 * - HideCR(フラグ)    
 *     改行の非表示(ShowCRと逆の意味) 
 * - ShowCR(フラグ)    
 *     改行の表示 
 * - HideEOF(フラグ)    
 *     EOFの非表示(ShowEOFと逆の意味) 
 * - ShowEOF(フラグ)    
 *     EOFの表示 
 * - ShowTab(フラグ)    
 *     タブ文字表示 
 * - ShowBox(数値)    
 *     全角空白・半角空白表示（第0ビットが全角空白を記号で表示、第1ビットが半角空白を記号で表示） 
 * - Ruler(フラグ)    
 *     ルーラー表示 
 * - TabRuler(フラグ)    
 *     ルーラー8単位かどうか 
 * - ShowLineNo(フラグ)    
 *     行番号表示 
 * - ShowPageNo(数値)    
 *     ページ番号表示
 * １ページの行数を指定/取得します。 
 * - FormLine(数値)    
 *     - 整形ラインの桁数    
 *     桁数　0x00007fffを論理積(&)した値    
 *     参照：formwidth showformline
 *  
 * - ActiveKakko(フラグ)    
 *     対応する括弧の強調表示 
 * - ActiveTagPair(フラグ)    
 *     対応するタグの強調表示
 * - VertLine(数値)    
 *     カーソル位置の縦線　0:なし　1:点線　2:実線 
 * - GuideLine(数値)    
 *     - ガイドライン縦と横の情報
 *         - ガイドライン縦：0x03を論理積(&)した値　0x00:なし　0x01:点線　0x02:実線
 *         - ガイドライン横：0x0Cを論理積(&)した値　0x00:なし　0x04:点線　0x08:実線
 *         - ガイドライン横の上下位置　0xC0を論理積(&)した値　0x00:下　0x40:中　0x80:上
 *  
 * - GuideLineInterval(数値)    
 *     - ガイドライン縦と横の間隔
 *         - ガイドライン縦の間隔：0x00007fffを論理積(&)した値
 *         - ガイドライン横の間隔：0x7fff0000を論理積(&)して、0x00010000で割った値（16ビット右シフト）
 *  
 * - OrikaeshiLine(数値)    
 *     折り返し桁数の縦線　0:なし　1:点線　2:実線 
 * - LastColor(フラグ)    
 *     最後に編集した所 
 * - Stripe(フラグ)    
 *     背景ストライプ表示
 * - ColorNum(フラグ)    
 *     数値のカラー表示
 * - ColorUrl(フラグ)    
 *     URLのカラー表示 
 * - ColorEmail(フラグ)    
 *     Emailのカラー表示 
 * - ColorFN(フラグ)    
 *     ファイル名と思わしき場所のカラー表示 
 * --------------------------------------------------------------------------------
 * - CurLineColor(文字列)    
 *     - カーソル行の色をRGBで10進数空白区切り    
 *     例：config("xCurLineColor:(255 0 0)");で赤色    
 *     configcolorの[65][0]でも指定できます。
 *  
 * - CurLineColorEx(数値)    
 *     - カーソル行の色の24ビット数値    
 *     例：config("xCurLineColorEx:0xff0000");で青色    
 *     configcolorの[65][0]でも指定できます。
 *  
 * - RulerColor(文字列)    
 *     ルーラーの文字色をRGBで10進数空白区切り    
 *     例：config("xRulerColor:(255 0 0)");で赤色    
 *     空の文字列で普通の文字の文字色と同じ　例：config("xRulerColor:()");    
 *     configcolorの[66][0]でも指定できます。
 *  
 * - RulerBack(文字列)    
 *     ルーラーの背景色をRGBで10進数空白区切り    
 *     例：config("xRulerBack:(0 0 255)");で青色    
 *     空の文字列で普通の文字の背景色と同じ　例：config("xRulerBack:()");    
 *     configcolorの[66][1]でも指定できます。
 * --------------------------------------------------------------------------------
 * - ColorComment(数値)    
 *     - 複数行コメント（旧、カラー表示にするモード）    
 *     getconfigで取得する場合、自動判定では判定されたモードが返ります。    
 *     - 以下の値が取得/設定できます。
 *         - 0　なし
 *         - 1　HTML
 *         - 5　C言語/Java
 *         - 6　Visual Basic
 *         - 7　Pascal/Delphi
 *         - 8　アセンブリ語
 *         - 9　Perl
 *         - 10　VHDL
 *         - 11　Verilog
 *         - 12　AutoLISP
 *         - 13　TeX
 *         - 14　PL/SQL
 *         - 15　秀丸マクロ
 *         - 16　秀Termスクリプト
 *         - 17　FORTRAN77
 *         - 19　FORTRAN90
 *         - 21　C言語/Java(#ifdef等のカラー表示)
 *         - 22　UNIXシェルスクリプト
 *         - 23　Hidemarnet Explorer
 *         - 25　CSS
 *         - 26　Ruby
 *         - 27　ユーザー定義
 *         - 28　Python
 *         - 29　自動（設定のみ,取得は判定後のモード）
 * 
 * - AspDefaultScript(数値)    
 *     サーバーサイドスクリプトのASPの言語 
 * - Asp(フラグ)    
 *     サーバーサイドスクリプトのASP 
 * - JspComment(フラグ)    
 *     サーバーサイドスクリプトのJSP
 *  
 * - Php(フラグ)    
 *     サーバーサイドスクリプトのPHP 
 * - Xml(フラグ)    
 *     HTML/XMLのときXMLかどうか 
 * - ColorIfdef(フラグ)    
 *     #ifdef等のカラー表示 
 * --------------------------------------------------------------------------------
 * - Hilight(数値)    
 *     - 強調表示
 *         - 0:なし
 *         - 1:ユーザー定義
 *         - 2:自動判定
 *         - 3:言語指定  
 * - HilightTitle(文字列)    
 *     hilightファイルを読み込んだときのファイル名    
 *     またはhilightファイル直接指定モード時のファイル名（xHilightDirectWordが必要）
 *  
 * - HilightDirectWord(数値)    
 *     hilightファイル直接指定モードかどうか
 * - HilightDirectMulti(数値)    
 *     hilightファイル直接指定モード（複数行の強調）かどうか（xHilightDirectWordが必要）
 * - HilightDirectIfdef(数値)    
 *     hilightファイル直接指定モード（#ifdef等の詳細）かどうか（xHilightDirectWordが必要）
 * --------------------------------------------------------------------------------
 * - Outline(フラグ)    
 *     アウトライン解析の枠
 * - ClistFont(文字列)    
 *     アウトライン解析の枠のフォント
 * - ClistFontSize(数値)    
 *     - アウトライン解析の枠のフォントサイズ    
 *       ポイント数を10倍した値です。    
 *       10.5ポイントの場合、105。  
 * - HilightList(数値)    
 *     - アウトライン解析のダイアログのフラグ    
 *       以下のフラグの論理和です。
 *         - 0x00000001　行の強調１（強調一覧時）
 *         - 0x00000002　未使用
 *         - 0x00000004　特に強調１（強調一覧時）
 *         - 0x00000008　URL（強調一覧時）
 *         - 0x00000010　ファイル名（強調一覧時）
 *         - 0x00000020　関数一覧
 *         - 0x00000040　ソート（関数一覧,強調一覧時）
 *         - 0x00000080　行の強調２（強調一覧時）
 *         - 0x00000100　特に強調２（強調一覧時）
 *         - 0x00000200　行番号を表示しない（関数一覧,強調一覧時）
 *         - 0x00000400　パラメータを表示しない（関数一覧時）
 *         - 0x00000800　行の強調３（強調一覧時）
 *         - 0x00001000　行の強調４（強調一覧時）
 *         - 0x00002000　特に強調３（強調一覧時）
 *         - 0x00004000　特に強調４（強調一覧時）
 *         - 0x00010000　ツリー表示
 *         - 0x00100000　分類モード（ツリー表示時）
 *         - 0x00800000　「検索文字列を強調」されている箇所（強調一覧時）
 *     - 0x000F0020を論理積( & )したビットは、「アウトライン解析の方法」が何であるかを意味します。    
 *       例：
 *       var f = val(getconfig("HilightList"));
 *       if( (f & 0x000F0020) == 0x00000020 ) { 関数一覧 }
 *       if( (f & 0x000F0020) == 0x00000000 ) { 強調一覧 }
 *       if( (f & 0x000F0020) == 0x00010000 ) { ツリー表示 }
 *  
 * - OutlineBar(数値)    
 *     - 見出しバー関係    
 *     以下のフラグの論理和
 *          - 0x00000001　見出しバー
 *          - 0x00000002　見出しバーを部分編集中に自動表示しない
 * 
 * - RangeEdit(数値)    
 *     - 部分編集関係    
 *     以下の値
 *          - 0x00000000　制限モード
 *          - 0x00010000　制限モード（半透明）
 *          - 0x00060000　ローカル編集モード
 * 
 * - Folding(数値)    
 *     - 折りたたみ可能な条件    
 *     以下のフラグの論理和
 *          - 0x00000001　範囲選択を無効
 *          - 0x00000002　インデントの深さを無効
 *          - 0x00000004　連続したコメントを無効
 *          - 0x00000008　カーソル上の対応する括弧を無効
 *          - 0x00000010　#ifdef等の対応を無効
 *          - 0x00000020　アウトライン解析との対応を無効
 *          - 0x00000040　空行区切りを無効
 *          - 0x00000080　行の強調表示区切りを無効
 * 
 * - FoldingTwigBar(数値)    
 *     - 折りたたみ用の余白関係    
 *     以下のフラグの論理和    
 *         - 0x00000001　折りたたみ用の余白
 * --------------------------------------------------------------------------------
 * - Ime(数値)    
 *     開く時のかな漢字変換の制御 
 * --------------------------------------------------------------------------------
 * - AutocompFlag1(数値)    
 *     単語補完の設定（autocomplete文の第２パラメータと同じ）
 * - AutocompFlag2(数値)    
 *     単語補完の設定（autocomplete文の第３パラメータと同じ）
 * - AutocompDic(文字列)    
 *     単語補完の辞書ファイル（autocomplete文の第４パラメータと同じ）
 * - AutocompAuto(数値)    
 *     - 単語補完の自動表示    
 *       以下のフラグの論理和
 *         - 0x00000001　自動表示ON/OFF
 *         - 0x00000000　表示方法 標準
 *         - 0x00000020　表示方法 リスト
 *         - 0x00000030　表示方法 ステータスバー
 *         - 0x00000040　表示方法 ツールチップ
 * --------------------------------------------------------------------------------
 * - FiletypeCharcode(数値)    
 *     標準のエンコードの種類 
 * - SaveConv(数値)    
 *     - 保存するときの変換
 *         - 0:変換なし
 *         - 1:タブを空白に変換する
 *         - 2:空白をタブに変換する
 * 
 * - StripTrail(フラグ)    
 *     保存するときに行末の空白を除去する 
 * - SaveWithEOF(フラグ)    
 *     保存するときにEOF制御文字を付ける 
 * - IgnoreEOF(フラグ)    
 *     読み込むときにEOF制御文字を無視 
 * - Backup(フラグ)    
 *     バックアップファイルの作成 
 * - BackupFast(フラグ)    
 *     高速バックアップ 
 * 
 * @returns
 * 取得する情報によって文字列型と数値型のどちらかが返ります。
 */
declare function getconfig(key: typeConfigSettingName): string | number

/**
 * f
 * 
 * getconfig関数は、ファイルタイプ別の設定の値を、設定の名前で取得します。
 * 
 * config("x...")で指定できる名前と同じものを指定します。
 *（getconfigのときは 頭についている x は不要です ）
 * 
 * @example
 * message(getconfig( "Font" ));
 * message(getconfig( "Tab" ));
 * message(getconfig( "FreeCursor" ));
 * message(getconfig( "xFont" ));	//失敗します。xは書かなくていいです。
 * 
 * @param setting_name
 * 取得する情報によって文字列型と数値型のどちらかが返ります。
 */
declare function getconfig(key: string): string | number

/**
 * 返り値は意味を持ちません。
 */
configcolor ★ function() { var m = "configcolor"; eval(st); return r; }
getconfigcolor ★ function() { var m = "getconfigcolor"; eval(fn); return r; }

/**
 * s
 * 
 * saveconfig文は、ファイルタイプ別の設定を保存します。    
 * 
 * @param filepath 
 * パラメータを指定しない場合、ファイルタイプ別の設定ダイアログで「OK」を押したのと同じです。    
 * たとえ(一時的な設定)になっていたとしても、強制的に保存します。
 * 
 * パラメータに文字列を指定すると、指定した設定名として保存します。
 * 現在の状態は何も変わりません。
 * 
 * @comment
 * 参照：
 * @see setconfigstate
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function saveconfig(filepath?: string): number;

/**
 * s
 * 
 * setconfigstate文はファイルタイプ別の設定の状態を指定します。
 * 
 * @param config_flag
 * 以下の値の論理和です。
 * - ビット0   一時的な設定かどうか
 *   - 0x0000 を指定すると一時的な設定ではなくなります。
 *   - 0x0001 を指定すると一時的な設定になります。
 * 
 * 実行前に一時的な設定になっていて、0を指定すると、    
 * 一時的な設定ではなくなりますが、他の秀丸エディタには反映されません。    
 * 「ファイルタイプ別の設定」のダイアログボックスでOKを押すと、    
 * 他の秀丸エディタにも反映されます。（同じファイルタイプであれば）
 * 
 * @comment
 * 参照：
 * @see configstate
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setconfigstate(config_flag: number): number;

/**
 * s
 * 
 * setfiletypeは、ファイルタイプ別の設定を識別するための拡張子を設定します。    
 * ファイルタイプ別の設定を識別するための拡張子は、filetypeキーワードで表され、    
 * 実際のファイル名による拡張子とは別に設定ができます。
 * 
 * @param extension 
 * 拡張子を指定します。    
 * 拡張子は"."から始まっている必要があります。    
 * "grep"や"exeresult"などの"."から始まらないファイルタイプは指定できません。
 * 
 * @param is_read_setting_file 
 * 拡張子に対応するファイルタイプ別の設定を読み込んで適用するかどうかを指定します。    
 * 省略するか0を指定すると設定を読み込んで適用します。    
 * 1を指定すると、設定は読込まず現在の設定を維持したまま、filetypeだけが書き換わります。    
 * 
 * @example
 * setfiletype(".mytxt", 1);
 * 
 * @comment
 * 参照：
 * @see filetype
 * @see configset
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setfiletype(extension: string, is_read_setting_file): number;

/**
 * s
 * 
 * envchanged文は、レジストリから動作環境とファイルタイプ別の設定の内容を再読込みし、秀丸エディタの動作環境とファイルタイプ別の設定を更新します。    
 * 
 * 秀丸エディタのマクロでは、[その他]-[動作環境]の内容を変更することができません。    
 * しかし、この文を使うとそれと同様のことができるようになります。    
 * 
 * 動作環境やファイルタイプ別の設定の内容を変更したい場合は、    
 * まずwriteregstr/writeregnum/writeregbinaryを使ってレジストリを書き換え、    
 * 次にenvchangedを使って秀丸エディタにその内容を教えてあげてください。
 * 
 * レジストリの内容については独自に調べてください。    
 * レジストリの内容を調べるには、Regedit.exeを使って、    
 * 
 * HKEY_CURRENT_USER\Software\Hidemaruo\Hidemaru     
 * の内容を見てください。    
 * 
 * 「ファイルタイプ別の設定」に関しては、レジストリを書き換えなくても、    
 * ファイルタイプ別の設定関連キーワード とconfig文 で使えるものがあります。    
 * 
 * config文で使えないものに関しては、envchangedで反映が可能です。    
 * ただし、ファイルタイプ別の設定が一時的な設定になっている場合は、反映されません。    
 * 一時的な設定かどうかはconfigstateで判断できます。
 * 
 * @comment
 * 参照：
 * @see writeregstr
 * @see writeregnum
 * @see writeregbinary
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function envchanged(): number;

/**
 * s
 * 
 * loadkeyassign文は、キー割り当てファイルを読込みます。    
 * パラメータでキー割り当てファイルの名前を指定してください。    
 * 
 * @param filepath 
 * ファイルのパスを指定します。
 * 
 * @example
 * loadkeyassign("default.key");
 * 
 * @param is_settingdir
 * 1 を指定すると、設定ファイル用のフォルダを対象とします。   
 * 指定しない場合、秀丸エディタをインストールしたフォルダが対象となります。
 * 
 * @comment
 * 参照：
 * @see savekeyassign
 * 
 * @returns
 * 返り値は意味を持ちません。    
 * 読み込みに失敗した場合は、マクロが中断してしまうため注意。
 */
declare function loadkeyassign(filepath: string, is_settingdir?: number): number;

/**
 * s
 * 
 * savekeyassign文は、現在のキー割り当てをキー割り当てファイルとしてファイルに保存します。    
 * パラメータでキー割り当てファイルの名前を指定してください。    
 * 
 * @param filepath 
 * ファイルのパスを指定します。
 * 
 * @param n_target
 * 0か1かの数字を指定します。    
 * 0にすると、キー割り当てのみの保存、    
 * 1にすると、マクロ登録の内容も保存します。    
 * 省略すると0になります。    
 * 
 * @param is_settingdir
 * 1 を指定すると、設定ファイル用のフォルダを対象とします。   
 * 指定しない場合、秀丸エディタをインストールしたフォルダが対象となります。
 * 
 * @example
 * savekeyassign("temp.key", 0, 1);
 * 
 * @comment
 * 参照：
 * @see loadkeyassign
 * 
 * @returns
 * 保存に成功した場合、１を返す。    
 * 保存に失敗した場合は、０を返す。
 */
declare function savekeyassign(filepath: string, n_target?: number, is_settingdir?: number): number;

/**
 * s
 * 
 * loadhilight文は、パラメータで指定された強調表示ファイルを読み込み，画面を再描画します。
 * 
 * @param filepath 
 * 
 * @param is_temp
 * 0か1かの数字を指定します。    
 * - 0にすると読み込んだものは一時的な設定になり、保存させません。（ファイルタイプ別の設定で「保存しないで更新」を押したときの状態）    
 * - 1にすると、設定は保存されます。（「OK」を押したときの状態）
 * 
 * 強調表示は、ファイルタイプ別の設定の強調表示の設定もONになっている必要があります。（マクロの config "y+"; 相当)    
 * 強調表示ファイルは普通のテキストファイルなので、マクロで内容を書き換える等してからloadhilightするという使い方もできます。
 *
 * @example
 * loadhilight("C-language.hilight", 0);
 * 
 * @param read_flag
 * 読み込む対象を指定できます。    
 * 省略すると1を指定したことと同じとなり、強調表示が対象となります。    
 * 
 * 以下の値をOR演算した値を指定します。    
 * - 0x00000001    強調表示 
 * - 0x00000002    複数行の強調 
 * - 0x00000004    ツリー定義 
 * - 0x00000008    カラー 
 * - 0x00000010    #ifdef等の詳細 
 * - 0x80000000    実際に読み込みをせずresultだけを得る 
 * 
 * @comment
 * 参照：
 * @see getresultex(13)
 * 
 * @returns
 * 読み込まれた内容のフラグが格納されます。    
 * 個数が多すぎて全て読み込めなかった場合は、getresultex(13)で状態を取得できます。
 */
declare function loadhilight(filepath: string, is_temp: number, read_flag?: number): number;

/**
 * s
 * 
 * savehilight文は、パラメータで指定された強調表示ファイルに書き込みます。
 * 
 * @param filepath 
 * 
 * @example
 * savehilight("C-language.hilight");
 * 
 * @param read_flag
 * 書き込む対象を指定できます。    
 * 省略すると1を指定したことと同じとなり、強調表示が対象となります。    
 * 
 * 以下の値をOR演算した値を指定します。    
 * - 0x00000001    強調表示 
 * - 0x00000002    複数行の強調 
 * - 0x00000004    ツリー定義 
 * - 0x00000008    カラー 
 * - 0x00000010    #ifdef等の詳細 
 * - 0x80000000    実際に読み込みをせずresultだけを得る 
 * 
 * @comment
 * 参照：
 * @see getresultex(13)
 * 
 * @returns
 * 読み込まれた内容のフラグが値として返る。    
 * 個数が多すぎて全て読み込めなかった場合は、getresultex(13)で状態を取得できます。
 */
declare function savehilight(filepath: string, read_flag?: number): number;


/**
 * s
 * 
 * loadbookmark文は、ブックマークを読込みます。    
 * 
 * @param filepath
 * ブックマークファイルの名前を指定してください。    
 * フルパスでない場合は設定ファイル用のフォルダを対象とします。    
 * 
 * @example
 * loadbookmark("test.hmbook");
 * 
 * @returns
 * 対象のファイルをロードできたら１を返す、    
 * ロードできなかったら０を返す。
 */
declare function loadbookmark(filepath: string): number;

/**
 * s
 * 
 * savebookmark文は、ブックマークを保存します。    
 * 
 * @param filepath
 * ブックマークファイルの名前を指定してください。    
 * フルパスでない場合は設定ファイル用のフォルダを対象とします。    
 * 
 * @example
 * savebookmark("test.hmbook");
 * 
 * @returns
 * 対象のファイルをセーブできたら１を返す、    
 * セーブできなかったら０を返す。
 */
declare function savebookmark(filepath: string): number;

/**
 * s
 * 
 * setfontchangemode文は、config文などでフォントの文字セットが変更されたときの動作を決めます。    
 * 
 * @param n_mode 
 * パラメータに 0 か 1 を指定します。    
 * - 0 を指定すると、config文でフォントの文字セットが変更されたとき、バイナリを維持したまま文字セットを適用します。
 * - 1 を指定すると、テキストの内容を維持したまま変換を行います。
 * 
 * @example
 * setfontchangemode(1);
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setfontchangemode(n_mode: number): number;

/**
 * s
 * 
 * settabstop文は、タブ文字数が自由配置モードのタブストップ、または、TSV/CSVモードの列の幅を設定します。
 * 
 * @param n_prop 
 * 0を指定してください。    
 * （将来の拡張用で現時点で0で固定）    
 * 
 * @param tab_width_settings
 * 半角文字数単位の幅を、空白区切りにしたものを指定します。    
 * 例えば、"10 20 5"という文字列を指定すると、    
 * 列の幅はA列=10, B列=20, C列=5で、C列以降はずっと5になります。    
 * タブの文字数が固定の場合は、自動的に自由配置モードになります。    
 * 
 * @comment
 * 参照：    
 * @see gettabstop
 * 
 * @returns
 * ０が返ります。
 */
declare function settabstop(n_prop: 0 | number, tab_width_settings: string): 0;

/**
 * f
 * 
 * gettabstop関数は、タブ文字数が自由配置モードのタブストップ、または、TSV/CSVモードの列の幅を取得します。
 * 
 * @param n_prop 
 * 0を指定してください。    
 * （将来の拡張用で現時点で0で固定）    
 * 
 * @comment
 * settabstopで設定された列幅をそのまま取得する例です。    
 * 
 * @example
 * settabstop(0, "4 8 4");
 * var tab_widths = gettabstop(0);
 * 
 * @example
 * settabstop(0, "4 8 4");
 * var tab_width_str = gettabstop(0);
 * try {
 * 	var tab_width_array = tab_width_str.split(" ");
 * 	message(tab_width_array.toString());
 * } catch(e) {
 *     message(e);
 * }
 * 
 * @comment
 * 参照：    
 * @see settabstop
 * 
 * @returns
 * 半角文字数単位の幅の文字列を空白区切りで返します。    
 * 例えば、TSVモードでA列=10, B列=20, C列=5の場合、"10 20 5 "という文字列を返します。    
 * C列以降はずっと5になっています。    
 * タブ文字数が固定の場合は、""を返します。    
 */
declare function gettabstop(n_prop: 0 | number): string;

/**
 * s
 * 
 * convert_return_in_cell文は、「セル内改行の変換」を行います。    
 * 
 * @comment
 * TSV/CSVモードでファイルを読み込んだ直後、    
 * セル内に改行が含まれると判断された場合、通常は上部にバーが表示されます。    
 * このとき、バーをクリックするか、[表示]→[タブストップ]→[セル内改行の変換...]によって、    
 * セル内の改行をどのように扱うかを選択できます。    
 * 
 * convert_return_in_cell文は、この操作をマクロとしてダイアログを出さずに実行します。    
 * 
 * @param convert_mode
 * 0を指定すると、特殊改行に変換します。    
 * 1を指定すると、特殊半角矢印に変換します。    
 *
 * @comment
 * return_in_cell_modeキーワードで現在の変換された状態を知ることができます。
 * 
 * 参照:
 * @see return_in_cell_mode
 * 
 * @returns
 * １つでも変換したら１を返す。    
 * なにも変換しなければ０を返す。
 */
declare function convert_return_in_cell(convert_mode: number): number;

/**
 * s
 * 
 * showwindow文は、現在のウィンドウの表示／非表示などを行います。    
 * 
 * @param show_mode
 * 値と意味は以下の通りです。
 * - 0 ウィンドウ非表示（SW_HIDE） 
 * - 1 最大化／最小化（アイコン化）されたウィンドウを元に戻す 
 * - 2 最小化（アイコン化）（SW_SHOWMINIMIZED） 
 * - 3 最大化（SW_SHOWMAXIMIZED） 
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function showwindow(show_mode: number): number;

/**
 * s
 * 
 * setmonitor文は、現在のウィンドウをパラメータで指定されたモニタに移動します。    
 * マルチモニタ環境でないと何も起きません。
 * 
 * @param monitor_ix
 * 
 * @example
 * if( monitor() == 0 ) {
 *    setmonitor 1;
 * } else {
 *    setmonitor 0;
 * }
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setmonitor(monitor_ix: number): number;

/**
 * s
 * setwindowpos文は、現在のウィンドウをパラメータで指定した位置に移動します。    
 * 
 * ウィンドウが最大化されている場合は何もしません。   
 * ウィンドウの位置は、画面のピクセル単位で指定します。    
 * 
 * @param pos_x_left 
 * ウィンドウの左上のxピクセル位置、
 * 
 * @param pos_y_top 
 * ウィンドウの左上のyピクセル位置、
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setwindowpos(pos_x_left: number, pos_y_top: number): number;

/**
 * s
 * setwindowpos文は、現在のウィンドウをパラメータで指定した位置に移動します。    
 * 
 * ウィンドウの位置は、画面のピクセル単位で指定します。    
 * ウィンドウが最大化されている場合は何もしません。   
 * 
 * @param pos_x_left 
 * ウィンドウの左上のxピクセル位置、
 * 
 * @param pos_y_top 
 * ウィンドウの左上のyピクセル位置、
 * 
 * @param pos_x_right 
 * ウィンドウの右下のxピクセル位置、
 * 
 * @param pos_y_bottom 
 * ウィンドウの右下のyピクセル位置、
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setwindowpos(pos_x_left: number, pos_y_top: number, pos_x_right: number, pos_y_bottom): number;

/**
 * s
 * 
 * setwindowsize文は、現在のウィンドウサイズを文字数単位で指定します。    
 * 
 * @param width_column 
 * 何文字の横幅(桁幅)にするかを指定する。
 * 
 * @param height_lineno 
 * 何文字の縦幅(行幅)にするかを指定する。
 * 
 * @example
 * setwindowsize(80, 20); // この場合は横80桁×縦20行となります。
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setwindowsize(width_column: number, height_lineno): number;

/**
 * s
 * 
 * setfocus文は、指定したウィンドウに入力フォーカスを設定します。    
 * 
 * @param window_target
 * 以下の値を指定できます。    
 * - 1  編集エリア 
 * - 2  アウトライン解析の枠 
 * - 3  ツールバーの検索ボックス 
 * - 4  ファイルマネージャ枠
 * - 5  アウトプット枠
 * 
 * @comment
 * 参照：    
 * @see getfocus
 * 
 * @returns
 * フォーカスを移動したら１を返す、    
 * フォーカスを移動できなければ０を返す
 */
declare function setfocus(window_target: number): number;

/**
 * s
 * 
 * begingroupundo文は、複数の編集操作のやり直しを一度でできるようにします。    
 * begingroupundoをしてからendgroupundoをするまでに編集を加えた部分を一度の編集とみなし、やり直しを一度でできるようにします。
 * 
 * @example
 * begingroupundo();
 * insert("a");
 * insert("b");
 * insert("c");
 * endgroupundo();
 * 
 * @comment
 * キー操作の記録で全置換したものをキー操作の保存をすると、endgroupundo 1; というようにパラメータが付きます。    
 * これは全置換のためのグループ化ということを意味しています。    
 * undo文でやり直しをまとめてするか１つずつするかの指定が適用されるようになります。    
 * 
 * @comment
 * 参照：
 * @see endgroupundo
 * @see undo
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function begingroupundo(): number;

/**
 * s
 * 
 * endgroupundo文は、begingroupundo文で開始した編集操作の終わりを指示します。    
 * begingroupundoをしてからendgroupundoをするまでに編集を加えた部分を一度の編集とみなし、やり直しを一度でできるようにします。
 * 
 * @example
 * begingroupundo();
 * insert("a");
 * insert("b");
 * insert("c");
 * endgroupundo();
 * 
 * @comment
 * キー操作の記録で全置換したものをキー操作の保存をすると、endgroupundo 1; というようにパラメータが付きます。    
 * これは全置換のためのグループ化ということを意味しています。    
 * undo文でやり直しをまとめてするか１つずつするかの指定が適用されるようになります。    
 * 
 * @comment
 * 参照：
 * @see begingroupundo
 * @see undo
 * 
 * @returns
 * begingroupundoされており、それを解除できたなら１が返ってくる    
 * begingroupundoされていなければ、０が返ってくる。
 */
declare function endgroupundo(): number;

/**
 * s
 * 
 * findspecial文は、通常の検索では検索できないものを検索します。
 * 
 * @example
 * var sjis = 0x01;
 * findspecial(0, sjis, 0);
 * 
 * @param search_type 
 * どのようなものを検索するかという種類を数値で指定します。
 * - 0 の場合、    
 * 指定されたエンコードで保存する場合、変換できない文字を検索します。    
 * 例えば、現在がutf16のエンコードであった場合に、これをshift-jisで保存すれば、変換できない文字が出てくる可能性があります。    
 * こういった文字を、検索することが出来ます。  
 * - 1 の場合、    
 * 改行コードが混在している場合に正確な改行コードを検索します。
 * - 2 の場合、    
 * NULL文字が変換された文字を検索します。    
 * この場合、次の引数となる code に意味はありません。    
 * [その他]→[動作環境]→[ファイル]→[エンコード2]で、「NULL文字の変換」のオプションが特殊空白文字か、特殊NULL文字になっている必要があります。
 * 現在のカーソル位置から検索します。
 * 
 * @param code 
 * search_type によって意味が変わります。    
 * - 0 の場合、    
 * encodeに対応する値を指定します。    
 * 指定したエンコードにした場合に、変換できない文字を検索できます。
 *   - 1 　Shift-JIS
 *   - 2 　Unicode(UTF-16)
 *   - 3 　EUC
 *   - 4 　JIS
 *   - 5 　UTF-7
 *   - 6 　UTF-8
 *   - 7 　Unicode (UTF-16,Big-Endian)
 *   - 8 　欧文
 *   - 9 　簡体字中国語
 *   - 10　繁体字中国語
 *   - 11　韓国語
 *   - 12　韓国語(Johab)
 *   - 13　中央ヨーロッパ言語
 *   - 14　バルト語
 *   - 15　ギリシャ語
 *   - 16　キリル言語
 *   - 17　シンボル
 *   - 18　トルコ語
 *   - 19　ヘブライ語
 *   - 20　アラビア語
 *   - 21　タイ語
 *   - 22　ベトナム語
 *   - 23　Macintosh
 *   - 24　OEM/DOS
 *   - 25　その他
 *   - 26　バイナリモード
 *   - 27　Unicode(UTF-32) 
 *   - 28　Unicode(UTF-32,Big-Endian)
 *
 * - 1の場合、    
 * 改行コードが混在している場合に正確な改行コードを検索します。    
 * 現在のカーソル位置の次の位置から検索します。
 *   - 0:CR+LF    
 *   - 1:LF    
 *   - 2:CR    
 *   - 3:境界    
 * 
 * - 2の場合、
 * search_typeが2の場合は、この引数codeは意味を持ちません。     
 * 0や-1など意味を適当な値を指定してください。
 * 
 * @param search_direction 
 * 下方向に検索するとき 0、上方向に検索するとき 1 を入れます。
 * 
 * @comment
 * 参照：
 * @see encode
 * 
 * @returns
 * 見つかった場合（カーソル移動した場合）、0以外を返す。    
 * 見つからなかった場合、0を返す。    
 */
declare function findspecial(search_type: number, code: number, search_direction: number): number;

/**
 * f
 * 
 * getstaticvariable関数は、静的な変数を取得します。
 * 
 * @param key 
 * 変数名を指定します。大文字と小文字の区別はされません。    
 * ""を指定すると、記憶されている変数名を列挙して","でつなげた文字列を返します。
 * 
 * @param scope_type
 * 共有されている静的な変数かどうかを指定します。    
 * - 0 を指定すると、共有せず、現在の秀丸エディタ内だけで有効です。    
 * 同じウィンドウであっても「ファイルを閉じる」「閉じて開く」をすると消去されます。    
 * - 1 を指定すると、全ての秀丸エディタで有効です。    
 * - 2 を指定すると、共有せず、現在の秀丸エディタ内だけで有効です。    
 * 「ファイルを閉じる」「閉じて開く」をしても保持されます。
 * - -1 を指定すると、別の使い方になります。静的ではなく、一時的な変数として扱います。    
 * 共有せず、現在の秀丸エディタだけで有効で、実行中のマクロ内だけで有効です。    
 * マクロが終了したら消えます。メモリ上限の設定の影響を受けないため、    
 * 大きなテキストなどを格納するのにむいています(マクロ変数だとメモリ制限の影響を受けるため)。    
 * 他のマクロとの競合はありません。
 *
 * @example
 * setstaticvariable("TestA", "全ての秀丸エディタで有効",1);
 * message(getstaticvariable( "TestA", 1 ));
 * 
 * setstaticvariable("TestB", "現在の秀丸エディタで有効",0);
 * message(getstaticvariable( "TestB", 0 ));
 * 
 * message("共有されている名前一覧:\n"+getstaticvariable( "", 1 ));
 * message("現在の秀丸エディタ内の名前一覧:\n"+getstaticvariable( "", 0 ));
 * 
 * setstaticvariable("TestC", "長大なテキスト文字列", -1); // -1 はメモリ制限を受けない
 * message(getstaticvariable( "TestC", -1 )); // 秀丸マクロ変数で受け取らず、直接返り値を利用すればメモリ制限を受けない
 * 
 * @comment
 * 参照：
 * @see setstaticvariable
 * @see Hidemaru_GetStaticVariable
 * 
 * @returns
 * keyとscope_typeで指定された静的変数の内容を返す。    
 * keyに""を指定した場合は、 記憶されている変数名を列挙して","でつなげた文字列を返す。    
 */
declare function getstaticvariable(key: string, scope_type: number): string;

/**
 * f
 * 
 * setstaticvariable関数は、静的な変数を書き込みます。
 * 
 * @param key 
 * 変数名を指定します。大文字と小文字の区別はされません。    
 * keyとvalueの両方に""を指定すると、全てのキーと値を消去します。
 * 
 * @param value
 * 書き込む変数の内容を、文字列で指定します。数値は指定できません。""を指定すると消去します。    
 * keyとvalueの両方に""を指定すると、全てのキーと値を消去します。
 * 
 * @param scope_type
 * 共有されている静的な変数かどうかを指定します。    
 * - 0 を指定すると、共有せず、現在の秀丸エディタ内だけで有効です。    
 * 同じウィンドウであっても「ファイルを閉じる」「閉じて開く」をすると消去されます。    
 * - 1 を指定すると、全ての秀丸エディタで有効です。    
 * - 2 を指定すると、共有せず、現在の秀丸エディタ内だけで有効です。    
 * 「ファイルを閉じる」「閉じて開く」をしても保持されます。
 * - -1 を指定すると、別の使い方になります。静的ではなく、一時的な変数として扱います。    
 * 共有せず、現在の秀丸エディタだけで有効で、実行中のマクロ内だけで有効です。    
 * マクロが終了したら消えます。メモリ上限の設定の影響を受けないため、    
 * 大きなテキストなどを格納するのにむいています(マクロ変数だとメモリ制限の影響を受けるため)。    
 * 他のマクロとの競合はありません。
 *
 * @example
 * setstaticvariable("TestA", "全ての秀丸エディタで有効",1);
 * message(getstaticvariable( "TestA", 1 ));
 * 
 * setstaticvariable("TestB", "現在の秀丸エディタで有効",0);
 * message(getstaticvariable( "TestB", 0 ));
 * 
 * message("共有されている名前一覧:\n"+getstaticvariable( "", 1 ));
 * message("現在の秀丸エディタ内の名前一覧:\n"+getstaticvariable( "", 0 ));
 * 
 * setstaticvariable("TestC", "長大なテキスト文字列", -1); // -1 はメモリ制限を受けない
 * message(getstaticvariable( "TestC", -1 )); // 秀丸マクロ変数で受け取らず、直接返り値を利用すればメモリ制限を受けない
 * 
 * setstaticvariable("", ""); // 全ての静的変数のキーと値を消去
 * 
 * @comment
 * 参照：
 * @see getstaticvariable
 * @see Hidemaru_SetStaticVariable
 * 
 * @returns
 * 失敗した場合、0を返す。    
 * 成功した場合、0以外を返す。    
 */
declare function setstaticvariable(key: string, value: string, scope_type: number): string;

/**
 * s
 * 
 * setregularcache文は、検索のための正規表現のキャッシュの具合を指定します。    
 * 正規表現パターンの文字列を、正規表現DLLによって解析する段階のキャッシュです。    
 * 検索を実行することそのものには影響ありません。
 * 
 * @param cache_mode    
 * マクロ内のキャッシュのモードを指定します。    
 * - 数値に0を指定すると、キャッシュしません。既にキャッシュされているものがあれば破棄します。    
 * - 数値に1を指定すると、マクロ内で使われた正規表現の検索をキャッシュし、マクロ実行中に同じ正規表現が使われたときはキャッシュを使います。マクロが終了したらキャッシュは無くなります。    
 * - 数値に2を指定すると、マクロ内で使われた正規表現の検索をキャッシュし、同じ正規表現が使われたときはキャッシュを使います。マクロを終了してもキャッシュを保持します。    
 * 
 * @returns
 * 返り値は意味を持ちません。
 */
declare function setregularcache(cache_mode: number): number;

/**
 * s
 * 
 * setregularcache文は、検索のための正規表現のキャッシュの具合を指定します。    
 * 正規表現パターンの文字列を、正規表現DLLによって解析する段階のキャッシュです。    
 * 検索を実行することそのものには影響ありません。
 * 
 * @param cache_mode 
 * 文字列を指定すると、文字列の正規表現のキャッシュ格納だけを行います。    
 * 
 * @param is_keep_cache
 * 0を指定すると、マクロ内だけキャッシュを保持し、マクロが終了したらキャッシュは無くなります。    
 * 省略するか、もしくは1を指定すると、マクロが終了してもキャッシュを保持します。    
 * 
 * @param is_ignore_case
 * 省略するか、0を指定すると、大文字/小文字の区別ありとして文字列を正規表現DLLにそのまま渡して解析します。    
 * 1を指定すると、大文字/小文字の区別なしで検索される想定として、小文字に変換した文字列を正規表現DLLに渡して解析します。    
 * 
 * @comment
 * キャッシュされる数は上限があります。getmaxinfo(8)によって取得できます。    
 * 
 * @returns
 * キャッシュ格納に成功すれば１が返る。    
 * 正規表現が不正な文字列であることなどが原因により、キャッシュ格納に失敗すれば０が返る。
 */
declare function setregularcache(cache_regexp: string, is_keep_cache?: number, is_ignore_case?: number): number;

/**
 * f
 * 
 * hidemaruorder関数は、hidemaruhandleの逆で、    
 * ハンドルからウィンドウ番号を取得します。
 * 
 * @param hidemaru_handle
 * 指定の秀丸のウィンドウハンドルを指定する。
 * 
 * @example
 * var window_handle = hidemaruhandle(0); // 番号からウィンドウハンドルを得る
 * var z_order = hidemaruorder( window_handle ); // ウィンドウハンドルをZ-Orderに戻す
 * 
 * @returns
 * ウィンドウの番号(Z-Order)を返す。    
 * 指定のウィンドウハンドルに対応するものが存在しない場合、-1を返す。
 */
declare function hidemaruorder(hidemaru_handle: number): number;

/**
 * k
 * 
 * hidemarucountは、現在起動されている秀丸エディタの数を表します。    
 * 常駐秀丸エディタは数えません。
 * 
 * @example
 * var c = hidemarucount();
 * 
 * @comment
 * 参照：    
 * @see 秀丸エディタ管理 
 * 
 * @returns
 * 現在起動されている秀丸エディタの数を返す。    
 * 常駐秀丸エディタは数えない。
 */
declare function hidemarucount(): number;

/**
 * f
 * 
 * findhidemaru関数は、ファイル名からウィンドウの番号を取得します。    
 * 
 * @param filepath
 * ファイル名を指定します。    
 * ファイル名は、ドライブ名から始まるフルパスでも、ファイル名本体だけも、どちらで指定してもかまいません。    
 * ただし、ファイル名本体だけしか指定しない場合は目的とするファイルとは別のフォルダの同名ファイルを検出してしまうかもしれないので、フルパスで指定するほうが確実です。    
 * 
 * @example
 * var target_filename = "C:\\abc\\abc.txt":
 * var n = findhidemaru( target_filename );
 * 
 * @comment
 * ファイルが秀丸エディタで開かれているかどうかを調べ、開かれている場合はそのウィンドウの番号を返します。    
 * 開かれていない場合は-1となります。    
 * 番号とは、秀丸エディタのウィンドウを上から順に数えた番号になっています。    
 * 複数の秀丸エディタ同士(秀丸がタブモードの場合、まるで１つに見えるが、エディタの実態は複数)での重なり順(Z-Order)のことです。    
 * 自分自身はfindhidemaruの対象とはなりません。（自分自身は常に0番目です）    
 * 
 * @example
 * if( findhidemaru( "c:\\folder\\test.txt" ) == -1 ) {
 *    openfile("c:\\folder\\test.txt");
 * }
 * 
 * @comment
 * ウィンドウ番号からウィンドウハンドルを得るのは、hidemaruhandleを使用します。
 * 
 * @comment
 * 参照：
 * @see hidemaruhandle
 * 
 * @returns
 * ウィンドウの番号を返します。    
 * 見つからない場合は-1を返します。
 */
declare function findhidemaru(filepath: string): number;

/**
 * f
 * 
 * hidemaruhandle関数は、ウィンドウの番号からウィンドウハンドルを得ます。
 * 
 * @param window_z_order
 * ウィンドウの番号を指定します。    
 * 自分自身は0です。    
 * 
 * ウィンドウの番号からウィンドウハンドルを取得します。    
 * ウィンドウの番号は、複数の秀丸エディタ同士(秀丸がタブモードの場合、まるで１つに見えるが、エディタの実態は複数)での重なり順(Z-Order)のため、    
 * nexthidemaruやsetactivehidemaruを実行すると順番が変わります。    
 * ウィンドウハンドルは順番に関わらず、常に同じです。    
 * 自分自身のウィンドウハンドルは、hidemaruhandle(0)で取得することができます。    
 * 
 * @example
 * var h = hidemaruhandle(0);
 * 
 * @returns
 * ウィンドウハンドルを返します。    
 * 実際のWin32 APIなどで取得するウィンドウハンドルと同じ値です。    
 * ウィンドウハンドルの値は32bitの範囲に必ず収まるため、    
 * 秀丸エディタ64bit版でも問題なく取り扱うことが出来ます。
 */
declare function hidemaruhandle(window_z_order: number): number;

/**
 * s
 * 
 * closehidemaru文は、番号（ハンドルも可）で指定した秀丸エディタを終了させます。    
 * 
 * @param hidemaru_handle 
 * 秀丸のウィンドウハンドル、もしくはウィンドウ番号を指定します。    
 * 自分自身を指定することはできません。    
 * 指定した秀丸エディタがまだファイルを保存してない場合はclosehidemaruは失敗します。    
 * 
 * @example
 * closehidemaru(1);
 * 
 * @example
 * var a = findhidemaru( "abc.txt" );
 * if( a == -1 ) {
 *    message("abc.txtはいません");
 * } else {
 *    var ret = closehidemaru(a);
 *    if( !ret ) { message("abc.txtの終了失敗です。");
 * }
 * 
 * @returns
 * 成功した場合は0以外を返す、    
 * 失敗した場合は0を返す。
 */
declare function closehidemaru(hidemaru_handle: number): number;

/**
 * s
 * 
 * closehidemaruforced文は、番号（ハンドルも可）で指定した秀丸エディタを終了させます。    
 * 
 * 
 * @param hidemaru_handle 
 * 秀丸のウィンドウハンドル、もしくはウィンドウ番号を指定します。    
 * 自分自身を指定することはできません。    
 * closehidemaruとは違い、「(更新)」のついたファイルの場合でもエラーにならずに強制的に（保存せずに）終了させます。
 * 
 * @example
 * closehidemaruforced(1);
 * 
 * @returns
 * 成功した場合は0以外を返す、    
 * 失敗した場合は0を返す。
 */
declare function closehidemaruforced(hidemaru_handle: number): number;

/**
 * f
 * 
 * getcurrenttab関数は、タブモードのとき、グループ内の選択されているタブに対応する    
 * 秀丸エディタのウィンドウハンドルを取得します。
 * 
 * @param id_type 
 * 0を指定すると、次に指定するtab_group_idはグループIDの意味になります。
 * 1を指定すると、次に指定するtab_group_idはグループの順番の意味になります。
 * 
 * @param tab_group_id
 * id_typeが0の場合、グループIDを指定します。
 * id_typeがが1の場合、0から数えたグループの順番を指定します。自分自身は0になります。
 * 
 * @example
 * var h = getcurrenttab(1,0);
 * 
 * @comment
 * 参照：
 * @see 秀丸エディタ管理(タブ編)
 * 
 * @returns
 * 秀丸エディタのウィンドウハンドルを返します。    
 * 引数に対応するようなタブが存在しない時は、-1を返す。
 */
declare function getcurrenttab(id_type: number, tab_group_id): number;

/**
 * f
 * 
 * gettabhandle関数は、タブモードのとき、各タブのウィンドウハンドルを取得します。（
 * グループとタブの順番を指定して、秀丸エディタのウィンドウハンドルを取得することができます。
 * 
 * @param id_type 
 * 0を指定すると、次に指定するtab_group_idはグループIDの意味になります。
 * 1を指定すると、次に指定するtab_group_idはグループの順番の意味になります。
 * 
 * @param tab_group_id
 * id_typeが0の場合、グループIDを指定します。
 * id_typeがが1の場合、0から数えたグループの順番を指定します。自分自身は0になります。
 * 
 * @param tab_order
 * グループ内のタブの順番を指定します。
 * 
 * @example
 * var h = gettabhandle(1,0,0);
 * 
 * @comment
 * 参照：
 * @see 秀丸エディタ管理(タブ編)
 * 
 * @returns
 * 秀丸エディタのウィンドウハンドルを返します。    
 * 引数に対応するようなタブが存在しない時は、-1を返す。
 */
declare function gettabhandle(id_type: number, tab_group_id, tab_order: number): number;

/**
 * f
 * 
 * getclipboardinfo関数は、現在のクリップボードの状態を取得します。
 * 
 * @param info_type
 * 0 を指定すると、クリップボードにテキストがあるかどうかを返します。    
 * 1 を指定すると、クリップボードが秀丸エディタのBOX選択をコピーしたものであるかどうかを返します。
 * 
 * @returns
 * info_typeが0の場合、クリップボードにテキストがあるかどうかを返します。    
 * テキストなら1、テキストでないなら0を返す    
 * 
 * info_typeが1の場合、クリップボードが秀丸エディタのBOX選択をコピーしたものであるかどうかを返します。
 * BOX選択をコピーしたものなら1、そうでないなら0を返す。
 */
declare function getclipboardinfo(info_type: number): number;

/**
 * f
 * 
 * loaddll関数は、hidemaru.loadDll関数の別名となります。
 * 
 * @param dllpath
 * DLLのファイル名を指定します。
 * 
 * @example
 * var dll = loaddll("c:\\folder\\mydll.dll");
 * 
 * @comment
 * 参照：
 * @see hidemaru.loadDll
 * @see hidemaru.ILoadDllResult
 * 
 * @returns
   * 読み込みに成功した場合、hidemaru.ILoadDllResultを満たすオブジェクトを返します。    
   * 失敗した場合、undefinedを返します。
 */
declare function loaddll(dllpath: string): hidemaru.ILoadDllResult | undefined;

/**
 * f
 * 
 * loadDll関数は、hidemaru.loadDll関数の別名となります。
 * 
 * @param dllpath
 * DLLのファイル名を指定します。
 * 
 * @example
 * var dll = loaddll("c:\\folder\\mydll.dll");
 * 
 * @comment
 * 参照：
 * @see hidemaru.loadDll
 * @see hidemaru.ILoadDllResult
 * 
 * @returns
   * 読み込みに成功した場合、hidemaru.ILoadDllResultを満たすオブジェクトを返します。    
   * 失敗した場合、undefinedを返します。
 */
 declare function loadDll(dllpath: string): hidemaru.ILoadDllResult | undefined;


/**
 * s
 * 
 * createobject関数は、hidemaru.createObject関数の別名となります。
 * 
 * @param progid 
 * 登録されたCOMオブジェクトのProgIdを指定します。
 * 
 * @example
 * var fso = createobject("Scripting.FileSystemObject");
 * var file = fso.OpenTextFile("c:\\folder\\test_utf16.txt",1,0,-1);
 * var line = file.ReadLine();
 * file.Close();
 * 
 * @returns
 * 読み込みに成功した場合、COMオブジェクトを返します。    
 * 失敗した場合、undefinedを返します。    
 */
declare function createobject(progid: string): any | undefined;

/**
 * s
 * 
 * createobject関数は、hidemaru.createObject関数の別名となります。
 * 
 * @param dllpath 
 * DLLのファイル名をフルパスで指定します。
 * 
 * @param typeid 
 * - dllがネイティブのCOMの場合、typeidにCLSIDを記述することで、    
 * 登録なしでCOMオブジェクトを作成することができます。    
 * 対応できるインターフェイスはIDispatch（またはデュアルインターフェース）である必要があります。    
 * - dllがnet framework 4.xで作成したクラスライブラリをCOMとして使用可能にしているとき、    
 * ProgIDを記述することで、現在のユーザーに対して登録し、COMオブジェクトとして作成することができます。    
 * (COMの登録は自動的に「HmRegasm.exe」という秀丸エディタに付属の実行ファイルで行われます、この実行ファイルは.net framework 4.5以上必要です。)    
 * - dllが「.NET 7, .NET 6, .NET 5, .NET Core 3.1」でCOMとして公開可能でIDispatchに対応したDLLを作成している場合、    
 * コンパイル時に末尾に.comhost.dllというファイル名のDLLも同時に生成されますので、どちらのdllを対象にcreateobjectします。    
 * 例えばSample.dllというDLL本体があった場合、Sample.comhost.dllというDLLがセットでできます。    
 * .comhost.dllというファイル名が付いたDLLは、C++等のネイティブコードと同じ互換性のある形式で扱うことが可能です。
 * 
 * @example
 * // ネイティブの場合
 * var obj = null;
 * if(platform() & 0x00080000){
 *     obj = createobject("C:\\Program Files\\Hidemaru\\hmpv64.dll","{609E0957-143D-45CB-986E-5365B7A3ED26}");
 * } else {
 *     obj = createobject("C:\\Program Files\\Hidemaru\hmpv.dll","{609E0957-143D-45CB-986E-5365B7A3ED26}");
 * }
 * obj.ShowDialog(hidemaruhandle(0));
 * 
 * @example
 * // .NET 4.xの場合
 * var obj = createobject("C:\\Folder\\ClassLibrary1.dll","ClassLibrary1.Test1");
 * 
 * @example
 * // .NET 7, .NET 6, .NET 5, .NET Core 3.1の場合
 * var obj = createobject("C:\\Folder\\Sample.comhost.dll","{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}");
 * 
 * @returns
 * 読み込みに成功した場合、COMオブジェクトを返します。    
 * 失敗した場合、undefinedを返します。    
 */
declare function createobject(dllpath: string, typeid: string): any | undefined;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
 declare function execjs(): 0;

/**
 * z    
 * 
 * @throws "endmacro"
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function endmacro(): 0;

/**
 * z    
 * 
 * @throws "endmacroall"
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function endmacroall(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function execmacro(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function js(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function jsmode(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function call(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function call(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function refcall(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function setactivehidemaru(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function nexthidemaru(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function prevhidemaru(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function nexthidemaruicon(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function prevhidemaruicon(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function nexttab(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function prevtab(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function getobject(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function msdnlibrary(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddeexecute(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddeexecutew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddeinitiate(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddeinitiatew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddepoke(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddepokew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function dderequest(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function dderequestw(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddestartadvice(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddestartadvicew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddestopadvice(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddestopadvicew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddeterminate(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddewaitadvice(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ddewaitadvicew(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function keepdde(): 0;


/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function GREP(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function FIND(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function ENV(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
 declare function exit(): 0;

/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
 declare function exitall(): 0;
 
/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function saveexit(): 0;
 
/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
declare function saveexitall(): 0;
 
/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
 declare function quit(): 0;
 
/**
 * z    
 * 
 * この関数はjsmodeでは機能しません。
 * @deprecated
 */
 declare function quitall(): 0;
 
 