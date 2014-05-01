/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
    "use strict";
    kintone.events.on('app.record.index.show', function (event) {
        var headerSpace = kintone.app.getHeaderSpaceElement(),
            textNode = null,
            sum = 0;

        //既に入っている要素を削除
        headerSpace.innerHTML = '';
        var i = 0;
        for (i = 0; i < event.records.length; i++) {
            sum = sum + parseInt(event.records[i]['数値_1'].value, 10);
        }
        textNode = document.createTextNode('合計金額: ' + sum);
        headerSpace.appendChild(textNode);
        headerSpace.style.fontSize = '24pt';
    });
}());
