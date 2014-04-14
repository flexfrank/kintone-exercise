/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
  
    "use strict";
    kintone.events.on('app.record.create.show', function (event) {
        var record = event.record;
        record['Customer']['value'] =  'この文字列で上書き';
        record['Person']['value'] = [{'code': test, 'name': テスト}];
        return event;
    });
}());
