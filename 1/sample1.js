/*
 * ログインユーザーが担当しているレコードに背景色をつけるサンプルプログラム
 * Copyright (c) 2014 Cybozu
 *
 * Licensed under the MIT License
 */
(function () {
  
    "use strict";
    // レコード一覧の表示時にフィールド値の条件に応じて、文字色とフィールドの背景色を変更する
    kintone.events.on('app.record.index.show', function (event) {
  
        var user = kintone.getLoginUser();      // ログインユーザ情報
        var loginFieldColor = '#F18B8C';        // ログインユーザのフィールド色
        var toDay = dateFormat(new Date(),0);   // 本日日付フォーマット処理
        var beforeLimitDay = 5;                 // 期限**日前の警告用 (Day単位)
  
        // 一覧の要素を取得
        var elCustomer = kintone.app.getFieldElements('Customer');
        var elStatus = kintone.app.getFieldElements('Status');
        var elPerson = kintone.app.getFieldElements('Person');
        var elQType = kintone.app.getFieldElements('QType');
        var elDetail = kintone.app.getFieldElements('Detail');
        var elLimitDay = kintone.app.getFieldElements('LimitDay');
  
        // レコード期限日と担当者チェック処理
        for (var i = 0; i < event.records.length; i++) {
            var record = event.records[i];
  
            // 期限日の取得とフォーマット処理
            var tmpdate = new Array();
            tmpdate = record['LimitDay']['value'].split("-");
            var reclimitday = new Date(tmpdate[0], tmpdate[1]-1, tmpdate[2]);
  
            // 対応担当者のArrayから担当者名を抽出
            var recperson = record['Person']['value'];
            var personList = new Array();
            for (var num = 0; num < recperson.length; num++){
                personList.push(recperson[num].name);
            }
  
            // 担当者チェック
            if (personList.indexOf(user.name) > -1) {
                // 対応担当者がログインユーザの場合はフィールド色を変更する
                elCustomer[i].style.backgroundColor = loginFieldColor;
                elStatus[i].style.backgroundColor = loginFieldColor;
                elPerson[i].style.backgroundColor = loginFieldColor;
                elQType[i].style.backgroundColor = loginFieldColor;
                elDetail[i].style.backgroundColor = loginFieldColor;
                elLimitDay[i].style.backgroundColor = loginFieldColor;
            }
  
            // 未完了レコードの期限日チェック
            if (record['Status']['value'] != "完了"){
                // 期限切れレコードを赤字にする
                if(dateFormat(reclimitday,0) < toDay){
                    elLimitDay[i].style.color = 'red';
                    elLimitDay[i].style.fontWeight = 'bold';
                }
                // 期限が**日前のレコードを青字にする
                else if (dateFormat(reclimitday,beforeLimitDay) <= toDay){
                    elLimitDay[i].style.color = 'blue';
                }
            }
        }
  
        // ログインユーザの未完了で期限切れのレコード数を表示する
        // アプリIDを取得
        var appID = kintone.app.getId();
        // クエリ文の設定
        var qryInfo = 'Person in (LOGINUSER()) and Status not in ("完了") and LimitDay < TODAY()';
  
        // 非同期リクエストを行う
        kintone.api('/k/v1/records', 'GET', { app: appID, query: qryInfo}, function (resp) {
            if(resp['records'].length > 0){
                alert("期限が切れている "+user.name+" さんのレコードが "+resp['records'].length+"件あります。");
            }
        });
  
        // 日付フォーマット関数
        function dateFormat(date,op) {
            // yyyy/MM/dd形式に変換、日－op分のDateをreturnする
            var yy = date.getFullYear();
            var mm = date.getMonth() < 9 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
            var dd = date.getDate() < 10 ? '0' + date.getDate() - op : date.getDate() - op;
            date = yy+"/"+mm+"/"+dd;
            return date;
        }
     });
 })();