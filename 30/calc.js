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
        
        for (var i = 0; i < event.records.length; i++) {
            sum += parseFloat(event.records[i]['数値_1'].value, 10);
        }
        sum = sum / event.records.length
        textNode = document.createTextNode('平均金額: ' + String(sum));
        headerSpace.style.fontSize = '24pt';
        headerSpace.style.color = '#006400';
        headerSpace.style.fontWeight = 'bolder';
    
        headerSpace.appendChild(textNode);
    });
}());
