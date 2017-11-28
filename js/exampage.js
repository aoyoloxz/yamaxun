$(function(){

    'use strict';
    
    var examPage = $('#exam-page'),
        btnSave = $('#btn-save'),
        btnSubmit = $('#btn-submit'),
        btnAgain = $('#btn-again'),
        examForm =  $(document['exam-form']);

    var progress = $('#progress'),
        stepNow = $('#step-now'),
        stepTotal = $('#step-total');

    var valuetotal = examPage.find('.qa').length,
        valuenow = 0,
        dirtyQas = 0,
        hasChecked = false;

    var UAChecker = {
        ua: navigator.userAgent,
        isIE: function(){
            var ua = this.ua,
                ie_reg = /MSIE/;
            return ie_reg.test( ua );
        },
        ltIE8: function(){
            var isIE = this.isIE,
                docMode = document.documentMode;
            return isIE && ( docMode === 'undefined' || docMode < 8 );
        }
    };

    //每29分钟自动保存，29X60000
    setInterval(function(){btnSave.click()},1740000);

    var showNotification = (function() {        

        var popHTML = '';
        popHTML += '<div class="popup">';
        popHTML +=  '<div class="dialog">';
        popHTML +=      '<i class="icon"></i>';
        popHTML +=      '<span class="msg"></span>';
        popHTML +=  '</div>';
        popHTML +=  '<div class="shadow"></div>';
        popHTML += '</div>';

        var isPoped = false;
        var mask = $(popHTML);

        var popup = function() {

            var stateIcon = mask.find('.icon').get(0);

            this.show = function(state, msg) {
                if (state === 'success') {
                    stateIcon.className = 'icon ico-success';

                } else if (state === 'failure') {
                    stateIcon.className = 'icon ico-failure';

                } else if (state === 'wating') {
                    stateIcon.className = 'icon ico-wating';
                }

                mask.find('.msg').text( msg );

                if( !isPoped ){                
                    $('body').append( mask );
                    isPoped = true;
                }

                mask.fadeIn();// .delay(1000).fadeOut();
            };

            this.hide = function() {
                mask.fadeOut();
            }
            
        };

        return new popup();
        
    })();


    function drawProgress(valuenow, valuetotal) {
        var percent = ( valuenow / valuetotal ) * 100;
        stepNow.html(valuenow);
        progress.css('width', percent + '%');
    }

    function hasFinished() {
        dirtyQas = examPage.find('.dirty');
        valuenow = dirtyQas.length;

        drawProgress(valuenow, valuetotal);

        if ( valuenow === valuetotal) {
            btnSubmit.removeAttr('disabled');
        }
    }

    function filterResult(role) {
        // 
        var qaGroups = examPage.find('.qa-group');

        if (role === 'tab-all') {

            qaGroups.show();
            examPage.find('.right').show();
            examPage.find('.wrong').show();

        } else if (role === 'tab-wrong') {

            qaGroups.show();

            // 显示错误，隐藏正确选项                        
            $.each(qaGroups, function(i, el){
                var qas = $(el).find('.qa'),
                    rightQas = $(el).find('.right'),
                    wrongQas = $(el).find('.wrong');

                wrongQas.show();

                if (rightQas.length === qas.length) {
                    $(el).hide();
                    return;
                }

                rightQas.hide();
            });

        } else if (role === 'tab-right') {

            qaGroups.show();

            // 显示正确，隐藏错误选项
            $.each(qaGroups, function(i, el){
                var qas = $(el).find('.qa'),
                    rightQas = $(el).find('.right'),
                    wrongQas = $(el).find('.wrong');

                rightQas.show();

                if (wrongQas.length === qas.length) {
                    $(el).hide();
                    return;
                }

                wrongQas.hide();
            });
        }

    }

    // 格式化试卷答案
    function formatAnswer() {
        var answerData,
            quesArr = [];

        // if (valuenow < 1) { showNotification('您还没有答题'); }

        examPage.find('.qa').each(function(i, item){
            
            var quesObj,                    
                optChecked = '';

            var that = $(item);
            var qid = that.attr("data-id");

            that.find('input[type="checkbox"]:checked').each(function(){
                optChecked += $(this).val();
            });

            quesObj = {
                "qid": qid,
                "options": optChecked
            };

            quesArr[i] = quesObj;
        });

        answerData = {
            "exam_id": $('#exam-id').val(),
            "questions": quesArr
        };

        return JSON.stringify(answerData);
    }
    
    (function init() {

        var examAction = examForm.attr('action'),
            eventSubmit = $('#event-submit'),
            answerSheet = $('#answer-sheet');

        stepTotal.html(valuetotal);
        
        // 有题目已作答
        hasFinished();        

        $('#pgtab').on('click', '.i', function(e){
            var me = $(this);
            var role = me.attr('data-role');

            me.addClass('on').removeClass('i');
            me.siblings().addClass('i').removeClass('on');

            filterResult(role);
        });

        examPage.on('click', 'input[type="checkbox"]', function(e){

            var that = $(this),
                ckbox = that[0],
                qa = that.parents('.qa'),
                label = that.parent();

            if ( !hasChecked ) {
                window.onbeforeunload = function(e){

                    e = e || window.event;
             
                    if (e) {
                        e.returnValue = '您的内容尚未保存，离开此页面数据会丢失。';
                    }

                    return '您的内容尚未保存，离开此页面数据会丢失。';
                }
            }

            hasChecked = true;
            
            if ( ckbox.checked ) {
                label.addClass('checked');

                // 
                if ( !qa.hasClass('dirty') ) {
                    qa.addClass('dirty');

                    // 做了几题
                    hasFinished();
                }

            } else {
                label.removeClass('checked');                    

                // 无选中，本题未作答
                var qaChecked = qa.find('input[type="checkbox"]:checked');

                if ( qaChecked.length < 1 ) {
                    qa.removeClass('dirty');
                    valuenow -= 1;
                    
                    drawProgress(valuenow, valuetotal);
                    btnSubmit.attr('disabled', 'disabled');
                }
            }

        });

        // 保存
        btnSave.on('click', function(){                

            var answerData = formatAnswer();
            
            eventSubmit.attr('name', 'event_submit_do_save');
            answerSheet.val( answerData );

            showNotification.show('wating', '正在保存...');

            $.ajax({
                url: examAction,
                type: 'post',
                data: examForm.serialize(),
                dataType: 'json',
                success: function(res) {
                    //result = json;
                    if(res.success){
                        // 解除离开确认               
                        window.onbeforeunload = null;
                        showNotification.show('success', '保存成功！');
                        setTimeout(showNotification.hide, 800);
                    } else {
                        showNotification.show('failure', '保存失败！');
                        setTimeout(showNotification.hide, 800);
                    }
                },
                error: function() {
                    showNotification.show('failure', '保存失败！');
                    setTimeout(function () {
                            showNotification.hide;
                            location.replace(location.href);
                        }, 800);
                }
            });
            
        });

        // 提交
        btnSubmit.on('click', function(){
            // 已答完题
            if (valuenow === valuetotal) {

                // 解除离开确认               
                window.onbeforeunload = null;

                var answerData = formatAnswer();
            
                eventSubmit.attr('name', 'event_submit_do_submit');
                answerSheet.val( answerData );

                // 提交
                // examForm.submit();

                $.ajax({
                    url: examAction,
                    type: 'post',
                    data: examForm.serialize(),
                    dataType: 'json',
                    success: function(res) {

                        if(res.success){
                            // 提交成功，刷新页面
                            // showNotification('提交成功！');
                            location.replace(location.href);

                        } else {
                            showNotification.show('failure', '提交失败！');
                            setTimeout(showNotification.hide, 800);
                        }
                    },
                    error: function() {
                        showNotification.show('failure', '提交失败！');
                        setTimeout(function () {
                            showNotification.hide;
                            location.replace(location.href);
                        }, 800);
                    }
                });
            }
        });

        // 再考一次
        btnAgain.one('click', function(){
            // 
            eventSubmit.attr('name', 'event_submit_do_again');
            answerSheet.val('nothing');
            examForm.submit();
        });

    })();

    // IE8以下，<= IE7 加载json2.js
    // if (UAChecker.ltIE8) {

    //     $.getScript('/assets/lib/json2.js', function(){
    //         init();
    //     });

    // } else {
    //     init();
    // }

});