/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
  
    "use strict";
    // レコード一覧の表示時にフィールドの背景色を変更する
    kintone.events.on('app.record.index.show', function (event) {
            // ログインユーザのフィールド色
        var fieldColor = '#e5f0ff',
            // 一覧の要素を取得
            elCustomer = kintone.app.getFieldElements('Customer'),
            elStatus = kintone.app.getFieldElements('Status'),
            elPerson = kintone.app.getFieldElements('Person'),
            elQType = kintone.app.getFieldElements('QType'),
            elDetail = kintone.app.getFieldElements('Detail'),
            elLimitDay = kintone.app.getFieldElements('LimitDay'),
            i;
  
        for (i = 0; i < event.records.length; i++) {
            elCustomer[i].style.backgroundColor = fieldColor;
            elStatus[i].style.backgroundColor = fieldColor;
            elPerson[i].style.backgroundColor = fieldColor;
            elQType[i].style.backgroundColor = fieldColor;
            elDetail[i].style.backgroundColor = fieldColor;
            elLimitDay[i].style.backgroundColor = fieldColor;
        }
    });
}());
