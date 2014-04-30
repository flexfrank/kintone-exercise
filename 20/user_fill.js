/*
 * Copyright (c) 2014 Cybozu
 * Licensed under the MIT License
 */
/*jslint nomen: true, devel: true, browser: true, vars: true, plusplus: true*/
/*global 'kintone': false */
(function () {
  
    "use strict";
    kintone.events.on('app.record.create.show', function (event) {
        var user = kintone.getLoginUser();
        event.record.Person.value = [{'code': user.code, 'name': user.name},
                                     {'code': 'taiga-hisamune', 'name': "久宗大雅"}
                                    ];
        
        return event;
    });
}());
