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
        var fieldColor = ['#87cefa', '#adff2f', '#ffd700', '#ff6347', '#d3d3d3', '#4b0082'],
            // 一覧の要素を取得
            elCustomer = kintone.app.getFieldElements('Customer'),
            elStatus = kintone.app.getFieldElements('Status'),
            elPerson = kintone.app.getFieldElements('Person'),
            elQType = kintone.app.getFieldElements('QType'),
            elDetail = kintone.app.getFieldElements('Detail'),
            elLimitDay = kintone.app.getFieldElements('LimitDay'),
            i;
        var j = 0;
        for (i = 0; i < event.records.length; i++) {
            if (i % 2 !== 0) {
                j = Math.floor(Math.random() * 6);
                elCustomer[i].style.backgroundColor = fieldColor[j];
                elStatus[i].style.backgroundColor = fieldColor[j];
                elPerson[i].style.backgroundColor = fieldColor[j];
                elQType[i].style.backgroundColor = fieldColor[j];
                elDetail[i].style.backgroundColor = fieldColor[j];
                elLimitDay[i].style.backgroundColor = fieldColor[j];
            }
        }
    });
}());
