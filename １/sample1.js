/*
 * ���O�C�����[�U�[���S�����Ă��郌�R�[�h�ɔw�i�F������T���v���v���O����
 * Copyright (c) 2014 Cybozu
 *
 * Licensed under the MIT License
 */
(function () {
  
    "use strict";
    // ���R�[�h�ꗗ�̕\�����Ƀt�B�[���h�l�̏����ɉ����āA�����F�ƃt�B�[���h�̔w�i�F��ύX����
    kintone.events.on('app.record.index.show', function (event) {
  
        var user = kintone.getLoginUser();      // ���O�C�����[�U���
        var loginFieldColor = '#e5f0ff';        // ���O�C�����[�U�̃t�B�[���h�F
        var toDay = dateFormat(new Date(),0);   // �{�����t�t�H�[�}�b�g����
        var beforeLimitDay = 5;                 // ����**���O�̌x���p (Day�P��)
  
        // �ꗗ�̗v�f���擾
        var elCustomer = kintone.app.getFieldElements('Customer');
        var elStatus = kintone.app.getFieldElements('Status');
        var elPerson = kintone.app.getFieldElements('Person');
        var elQType = kintone.app.getFieldElements('QType');
        var elDetail = kintone.app.getFieldElements('Detail');
        var elLimitDay = kintone.app.getFieldElements('LimitDay');
  
        // ���R�[�h�������ƒS���҃`�F�b�N����
        for (var i = 0; i < event.records.length; i++) {
            var record = event.records[i];
  
            // �������̎擾�ƃt�H�[�}�b�g����
            var tmpdate = new Array();
            tmpdate = record['LimitDay']['value'].split("-");
            var reclimitday = new Date(tmpdate[0], tmpdate[1]-1, tmpdate[2]);
  
            // �Ή��S���҂�Array����S���Җ��𒊏o
            var recperson = record['Person']['value'];
            var personList = new Array();
            for (var num = 0; num < recperson.length; num++){
                personList.push(recperson[num].name);
            }
  
            // �S���҃`�F�b�N
            if (personList.indexOf(user.name) > -1) {
                // �Ή��S���҂����O�C�����[�U�̏ꍇ�̓t�B�[���h�F��ύX����
                elCustomer[i].style.backgroundColor = loginFieldColor;
                elStatus[i].style.backgroundColor = loginFieldColor;
                elPerson[i].style.backgroundColor = loginFieldColor;
                elQType[i].style.backgroundColor = loginFieldColor;
                elDetail[i].style.backgroundColor = loginFieldColor;
                elLimitDay[i].style.backgroundColor = loginFieldColor;
            }
  
            // ���������R�[�h�̊������`�F�b�N
            if (record['Status']['value'] != "����"){
                // �����؂ꃌ�R�[�h��Ԏ��ɂ���
                if(dateFormat(reclimitday,0) < toDay){
                    elLimitDay[i].style.color = 'red';
                    elLimitDay[i].style.fontWeight = 'bold';
                }
                // ������**���O�̃��R�[�h����ɂ���
                else if (dateFormat(reclimitday,beforeLimitDay) <= toDay){
                    elLimitDay[i].style.color = 'blue';
                }
            }
        }
  
        // ���O�C�����[�U�̖������Ŋ����؂�̃��R�[�h����\������
        // �A�v��ID���擾
        var appID = kintone.app.getId();
        // �N�G�����̐ݒ�
        var qryInfo = 'Person in (LOGINUSER()) and Status not in ("����") and LimitDay < TODAY()';
  
        // �񓯊����N�G�X�g���s��
        kintone.api('/k/v1/records', 'GET', { app: appID, query: qryInfo}, function (resp) {
            if(resp['records'].length > 0){
                alert("�������؂�Ă��� "+user.name+" ����̃��R�[�h�� "+resp['records'].length+"������܂��B");
            }
        });
  
        // ���t�t�H�[�}�b�g�֐�
        function dateFormat(date,op) {
            // yyyy/MM/dd�`���ɕϊ��A���|op����Date��return����
            var yy = date.getFullYear();
            var mm = date.getMonth() < 9 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
            var dd = date.getDate() < 10 ? '0' + date.getDate() - op : date.getDate() - op;
            date = yy+"/"+mm+"/"+dd;
            return date;
        }
     });
 })();