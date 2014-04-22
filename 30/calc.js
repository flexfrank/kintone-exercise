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
        
        sum = parseInt(event.records[1]['数値_1'].value, 10);
        textNode = document.createTextNode('合計金額: ' + String(sum));
        headerSpace.style.fontSize = '24pt';
        headerSpace.style.color = '#006400';
        headerSpace.style.fontWeight = 'bolder';
    
        headerSpace.appendChild(textNode);
    });
}());
