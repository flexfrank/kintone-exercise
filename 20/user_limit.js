/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
  
    "use strict";
    
    var events = [
        'app.record.edit.submit',
        'app.record.create.submit',
        'app.record.index.edit.submit'
    ];
    kintone.events.on(events, function (event) {
        var size = event.record.Person.value.length;
        if (size > 5) {
            event.error = '対応担当者は５人までです。';
        }
        return event;
    });
}());
