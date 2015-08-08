/**
 * Created by NQLDY on 2015/7/26.
 */

(function($){

    var numberUtilities = function() {

        var random = function(nMinimum, nMaximum, nRoundToInterval) {//生成随机数
            nMaximum?nMaximum:nMaximum = 0;
            nRoundToInterval?nRoundToInterval:nRoundToInterval = 1;
            if(nMinimum > nMaximum) {
                var nTemp = nMinimum;
                nMinimum = nMaximum;
                nMaximum = nTemp;
            }
            var nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
            var nRandomNumber = Math.random() * nDeltaRange;
            nRandomNumber += nMinimum;
            return Math.floor(nRandomNumber, nRoundToInterval);
        }

        return {
            randomize: function (aArray) {//数组元素随机化
                var aCopy = aArray.concat();
                var aRandomized = new Array();
                var oElement;
                var nRandom;
                for(var i = 0; i < aCopy.length; i++) {
                    nRandom = random(0, aCopy.length - 1);
                    aRandomized.push(aCopy[nRandom]);
                    aCopy.splice(nRandom, 1);
                    i--;
                }
                return aRandomized;
            },
            isNumber : function(num) {
                var reg = /^\d+(?=\.{0,1}\d+$|$)/
                if(reg.test(num)) {
                    return true;
                }
                return false ;
            }
        };
    }();

    $.QjzdPassWord = function ($inputObjs, opt) {
        if (typeof($inputObjs) !== 'object') {
            $inputObjs = $($inputObjs);
        }
        var options = $.extend({}, $.QjzdPassWord.defaults);
        //设置options入参
        var setOptions = function (opt) {
            if (typeof(opt) !== 'object') {
                opt = {};
            }
            options = $.extend(options, opt);
        };
        setOptions(opt);

        $inputObjs.each(function() {
            $(this).wrap('\
                <div class="passInput">\
                </div>\
            ');
            $(this).after('\
                <b></b>\
                <div class="passKey">\
                </div>\
            ');
            var $passInputDiv = $(this).parent();
            var $passKey = $passInputDiv.find(".passKey");
            var $input = $(this);
            var $b = $passInputDiv.find("b");

            var maxlength = $input.attr("maxlength");
            if (!numberUtilities.isNumber(maxlength) || maxlength < 0 ) {
                maxlength = -1;
            }
            var initPassKey = function() {
                if ($passKey.attr("data-hasPassKey") === "true") {
                    return;
                }
                $passKey.html('\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="num"></div>\
                    <div class="space"></div>\
                    <div class="num"></div>\
                    <div class="del"></div>\
                ');
                var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var arrRandom = [];
                arrRandom = numberUtilities.randomize(arr);
                $passKey.find('.num').each(function (i, d) {
                    $(this).text(arrRandom[i]);
                    $(this).on('click', function () {
                        if (maxlength !== -1 && $input.val().length >= maxlength) {
                            return;
                        }
                        $input.val($input.val() + $(this).text());
                    });
                });
                $passKey.find('.del').on('click', function () {
                    $input.val($input.val().slice(0, -1));
                });
                $passKey.attr("data-hasPassKey", true);
            };

            $input.on("focus", function() {
                if($passKey.css('display') == 'none') {
                    initPassKey();
                    $('.passInput .passKey').hide();
                    $passKey.show();
                }
            });
            $b.on('click',function(){
                if($passKey.css('display') == 'none') {
                    initPassKey();
                    $('.passInput .passKey').hide();
                    $passKey.show();
                } else {
                    $passKey.hide();
                }
            });
            $input.on("keyup", function() {
                if(!options.checkingRule($input.val()) && options.isShowErrPassImg) {
                    $passInputDiv.addClass('passErr');
                    $passInputDiv.removeClass('passSucc');
                } else {
                    $passInputDiv.removeClass('passErr');
                    $passInputDiv.addClass('passSucc');
                }
            });
            $passInputDiv.on('click',function(e){
                if(!options.checkingRule($input.val()) && options.isShowErrPassImg) {
                    $(this).addClass('passErr');
                    $(this).removeClass('passSucc');
                } else {
                    $(this).removeClass('passErr');
                    $(this).addClass('passSucc');
                }
                e.stopPropagation();
            });
            $("body").on("click", function(e) {
                $('.passKey').hide();
            });
        });
        var api = {};
        api.isValueValid = function($inputObj) {
            if (typeof  ($inputObj) === "undefined") {
                $inputObj = $inputObjs.eq(0);
            }  else if (typeof ($inputObj) !== "object") {
                $inputObj = $($inputObj);
            }
            if ($inputObjs.closest($inputObj).length > 0) {
                return options.checkingRule($inputObj.val());
            }
        };
        return api;
    };

    //默认参数
    $.QjzdPassWord.defaults = {
        isShowErrPassImg: true,
        checkingRule: function(num) {
            var reg = /^\d{6}$/;
            return reg.test(num);
        }
    };

    $.fn.pass = function (options, callback) {
        var api;
        if (this && this.length > 0) {
            api = $.QjzdPassWord(this, options);
            if ($.isFunction(callback)) {
                callback.apply(api);
            }
        }
        return this;
    };
}(jQuery));





