/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
    "use strict";
    kintone.events.on('app.record.detail.show', function (event) {
        function htmlEscape(str) {
            str = str.replace(/&/g,'&amp;');
            str = str.replace(/"/g,'&quot;');
            str = str.replace(/>/g,'&gt;');
            str = str.replace(/</g,'&lt;');
            return str;
        }
        var headerSpace = kintone.app.record.getHeaderMenuSpaceElement(),
            title = event.record['文字列__1行_'].value;
        
        headerSpace.innerHTML = '<input type="button" value="' + htmlEscape(title) + '">';
        headerSpace.style.color = '#dc143c';
    });
}());
