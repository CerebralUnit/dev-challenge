/**
  * @license ValidateMe plugin for jquery
  * http://github.com/CerebralUnit/ValidateMe
  * Copyright (c) 2014 Brian Lee
  * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
  * Version: 0.0.0
*/
(function($){

 var imported     = document.createElement('script');
     imported.src = 'js/jquery.inputmask.js';
     $('script:first').after(imported);


                $.fn.focusAtEnd = function() {
                    var initialVal = this.val();
                    this.val('');
                    this.val(initialVal);
                };
            })(jQuery);

// $.fn.validate = function(type, dropdownSelector, allowSpace, minLength, maxLength, pwReqArray){
$.fn.validate = function(customOptions){
    defaults = {

                type             : 'alphanumeric',
                creditDropdown   : '#credit',
                allowSpace       : true,
                allowHyphen      : false,
                minLength        : 0,
                maxLength        : 50,
                pwReqArray       : [ 'a','A', 9, '!', 'A!']

               };
    var type;
    var options = {};
    var input           = this;
    var inputParentType = this.parent().prop('tagName');
    var creditDropDown;
    var creditType;





    if (typeof customOptions === "string"){
        type     = customOptions;
    }else{
        
        options  = $.extend( {} , defaults, customOptions );
        type     = options.type;
    }

  


    if (options.type == 'credit'){

        creditDropDown  = $(options.creditDropdown);
        
        creditType      = creditDropDown.val();

        creditDropDown.change(function(){
            creditType = creditDropDown.val();
        });
    }
        


    if (inputParentType !== 'DIV'){

        this.wrap('<div style="position: relative; width: '+this.width()+'px ; height: '+this.height()+'px; " class="inputwrapper"></div>');
    }

    var validDate          = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var validMoney         = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/;
    var validLetter        = /^[a-zA-Z]+$/;
    var validLetterSpace   = /^[a-zA-Z\.\, ]+$/;
    var validLetterSpaceHyphen   = /^[a-zA-Z\-\.\, ]+$/;
    var validNumber        = /^\s*\d+\s*$/;
    var validAlphanumeric  = /^[a-zA-Z0-9]*$/;
    var validAlphaNumSpace = /^[a-zA-Z0-9\.\, ]*$/;
    var validNonNumber     = /[^0-9\.]+/g;   
    var validPhoneNumber   = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

    //RFC822 Email Standard
    var validEmail        = /(?:[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    var validInt          = /^\s*(\+|-)?\d+\s*$/;
    var validDecimal      = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
    var validIpAddress    = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    //credit cards
    var validAmEXCard     = /^(?:3[47][0-9]{13})$/;
    var validVisaCard     = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var validMastercard   = /^(?:5[1-5][0-9]{14})$/;
    var validDiscoverCard = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var validDinersCard   = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    var validJcbCard      = /^(?:(?:2131|1800|35\d{3})\d{11})$/;


    var command  = {isPressed:false};
    var commandCode = 224;
    $(document).keydown(function(e) {
        if (e.keyCode == commandCode) {
            command.isPressed = true;
        }
    }).keyup(function(e) {
        if (e.keyCode == commandCode) {
            command.isPressed = false;
        }
    });

    //Prevent Backspace from leaving page
    $(function(){
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
            }
        });
    });


    var validate = {
                    alphanumeric : function(el){
                                                    el.keydown(function (e) {
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110];

                                                                                if (options.allowSpace){
                                                                                    
                                                                                    keysAllowed.push(32);
                                                                                    keysAllowed.push(190);
                                                                                    keysAllowed.push(188);
                                                                                }

                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) || 
                                                                                    (e.shiftKey && (e.keyCode > 64 && e.keyCode < 91)) || 
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if (e.shiftKey || e.keyCode < 48 || ( e.keyCode > 57 && e.keyCode < 65) || e.keyCode > 90 ) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });

                                                    
                                                    el.keyup(function(e){
                                                                            var err;
                                                                            if (options.allowSpace){
                                                                                err = "Enter Numbers, Letters, and Spaces Only";
                                                                                testInput($(this), validAlphaNumSpace, err);
                                                                            }else{
                                                                                err = "Enter Numbers and Letters Only";
                                                                                testInput($(this), validAlphanumeric, err);
                                                                            }
                                                        
                                                                        });
                                               },



                    creditCard   : function(el){

                                                    el.keydown(function (e) {
                                                        
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 32];
                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });

                                                     el.keyup(function(){
                                                                            checkCreditNumber(el);
                                                                        });

                                                    creditDropDown.change(function(){
                                                                                         checkCreditNumber(el);
                                                                                    });

                                                     function checkCreditNumber(el){
                                                        var err = "Please Enter a Valid " + creditType + " Number";
                                                        var validCardReg;

                                                         switch(creditType){
                                                                            case 'mastercard':
                                                                                validCardReg = validMastercard;
                                                                                break;

                                                                            case 'discover':
                                                                                validCardReg = validDiscoverCard;
                                                                                break;

                                                                            case 'amex':
                                                                                validCardReg = validAmEXCard;
                                                                                break;

                                                                            case 'visa':
                                                                                validCardReg = validVisaCard;
                                                                                break;

                                                                            case 'diners':
                                                                                validCardReg = validDinersCard;
                                                                                break;

                                                                            case 'jcb':
                                                                                validCardReg = validJcbCard;
                                                                                break;
                                                                            }

                                                        testInput(el, validCardReg, err, 'credit');
                                                    }
                                               },



                    date         : function(el){
                                                    el.inputmask('99/99/9999');
                                                    el.keydown(function (e) {
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 173, 191];
                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });


                                                    el.keyup(function(e){
                                                        var err     = "Please Enter valid Date e.g. 01/01/2001";
                                                        testInput($(this), validDate, err);
                                                    });

                                               },


                    decimal      : function(el){
                                                     el.keydown(function (e) {
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 190];
                                                                                var indexOfDecimalPoint = keysAllowed.indexOf(190);

                                                                                if(el.val().indexOf('.') > -1){
                                                                                    keysAllowed.splice(indexOfDecimalPoint, 1);
                                                                                }

                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey  || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });

                                                     el.keyup(function(e){
                                                                            var err     = "Please Enter valid Decimal e.g. 243.12";
                                                                            testInput($(this), validDecimal, err);
                                                                        });

                                               },



                    email        : function(el){
                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter valid Email Address";
                                                                            testInput($(this), validEmail, err);
                                                                        });
                                               },

                    integer      : function(el){

                                                    el.keydown(function (e) {
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 173];
                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });
                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter valid Integer";
                                                                            testInput($(this), validInt, err);
                                                                        });

                                               },



                    ipAddress    : function(el){

                                                    el.keydown(function (e) {
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 173, 190];

                                                                                if ($.inArray(e.keyCode, keysAllowed ) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey  === true) || 
                                                                                    (e.keyCode == 59   && e.shiftKey === true) || 
                                                                                    (command.isPressed && e.keyCode  == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode  <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });


                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter valid IP Address";
                                                                            testInput($(this), validIpAddress, err);
                                                                        });

                                               },



                    letter      : function(el){

                                                    el.keydown(function (e) {

                                                                               

                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110];

                                                                                if (options.allowSpace){
                                                                                  
                                                                                    keysAllowed.push(32);
                                                                                    keysAllowed.push(190);
                                                                                    keysAllowed.push(188);
                                                                                }

                                                                                if (options.allowHyphen){
                                                                                 
                                                                                    keysAllowed.push(173);
                                                                                }

                                                                                    if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                        (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                        (command.isPressed && e.keyCode == 65) ||
                                                                                        (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                        return;
                                                                                    }
                                                                                    if (((e.keyCode < 65 || e.keyCode > 90))) {
                                                                                        e.preventDefault();
                                                                                    }
                                                                              });

                                                     el.keyup(function(e){
                                                                            var err;
                                                                            if (options.allowSpace && options.allowHyphen){
                                                                                err = "Enter Letters, Hyphens, and Spaces Only";
                                                                                testInput($(this), validLetterSpaceHyphen, err);
                                                                            }else if(options.allowSpace){
                                                                                 err = "Enter Letters and Spaces Only";
                                                                                 testInput($(this), validLetterSpace, err);
                                                                            }else{
                                                                                err = "Enter Letters Only";
                                                                                testInput($(this), validLetter, err);
                                                                            }
                                                                            
                                                                        });

                                               },



                    money        : function(el){
                                                    el.parent().append('<div style="font-family: arial; font-size: 11px; position: absolute; top: 2px; left: 116px; height: 100%: width: 12px; padding: 6px; " class="dollarsign">$</div>');
                                                    el.css({paddingLeft : '134px'});

                                                    el.keydown(function (e) {

                                                                                var myVal = el.val();
                                                                                var decimal;
                                                                                var decimalLen = 0;
                                                                                var keysAllowed = [46, 8, 9, 27, 13, 110, 188, 190];
                                                                                
                                                                                if (myVal.length > 0){
                                                                                    decimal  =   myVal.split(".")[1] || 0;
                                                                                    if (decimal.length > 0){
                                                                                        decimalLen = decimal.length;
                                                                                    }
                                                                                    
                                                                                }

                                                                                if ($.inArray(e.keyCode, keysAllowed) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if (e.shiftKey  || !(e.keyCode > 47 && e.keyCode < 58) && !(e.keyCode > 95 && e.keyCode < 106)) {
                                                                                 
                                                                                    e.preventDefault();
                                                                                }
                                                                                if (decimalLen && decimalLen > 1){
                                                                                     e.preventDefault();
                                                                                }

                                                                                
                                                                            });

                                                        
                         
                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter valid Dollar Amount e.g. $0.20";
                                                                            testInput($(this), validMoney, err);
                                                                        });

                                               },



                    nonNumber   : function(el){

                                                     el.keydown(function (e) {
                                                                                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                                                                                        (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                        (command.isPressed && e.keyCode == 65) ||
                                                                                        ( e.shiftKey && ( e.keyCode > 47 && e.keyCode < 58 ) ) ||
                                                                                        (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                        return;
                                                                                    }
                                                                                    if ( (e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)) {
                                                                                        e.preventDefault();
                                                                                    }
                                                                              });

                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter Any Non-Number";
                                                                            testInput($(this), validNonNumber, err);
                                                                        });

                                               },



                    number      : function(el){

                                                    el.keydown(function (e) {
                                                                                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });
                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter Numbers Only";
                                                                            testInput($(this), validNumber, err);
                                                                        });
                                               },

                     password   : function(el){
                                                    

                                                    var atLeastOneNumber    = "(?=.*\\d)";
                                                    var atLeastOneLower     = "(?=.*[a-z])";
                                                    var atLeastOneUpper     = "(?=.*[A-Z])";
                                                    var atLeastOneSpecial   = "(?=.*[\\W])";
                                                    var mustStartWithLetter = "^[a-zA-Z]";
                                                    var trueMin = options.minLength - 1;
                                                    var trueMax = options.maxLength - 1
                                                    var betweenRange        = ".{" + trueMin + "," + trueMax + "}$";
                                                    var errorArray          = [];
                                                    var regexArray          =[];
                                                    var regex;

                                                    $.each(options.pwReqArray, function(i,val){
                                                            if       (val === 'a'){
                                                                regexArray.push(atLeastOneLower);
                                                                errorArray.push('<br> At Least One a-z');
                                                            }else if (val === 'A'){
                                                                regexArray.push(atLeastOneUpper);
                                                                errorArray.push('<br> At Least One A-Z');
                                                            }else if (val ===  9 ){
                                                                regexArray.push(atLeastOneNumber);
                                                                errorArray.push('<br> At Least One 0-9');
                                                            }else if (val === '!'){
                                                                regexArray.push(atLeastOneSpecial);
                                                                errorArray.push('<br> At Least One !@#$%');
                                                            }else if (val === 'A!'){
                                                                regexArray.push(mustStartWithLetter);
                                                                errorArray.push('<br> Must Start With a Letter');
                                                            }
                                                    });

                                                    if(options.minLength && options.maxLength){
                                                        regexArray.push(betweenRange);
                                                        errorArray.push('<br> And Must Be Between ' + options.minLength + ' and ' + options.maxLength + ' Characters');
                                                    }

                                                    regex = new RegExp(regexArray.join(""));

                                                    el.keydown(function(e){
                                                        var inputLen = el.val().length;

                                                        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }

                                                        

                                                        if (inputLen == options.maxLength) {
                                                            e.preventDefault();
                                                        }

                                                    });

                                                     el.keyup(function(e){
                                                                            var err     = "Password Must contain:" + errorArray.join();
                                                                            
                                                                            testInput($(this), regex, err, 'password');
                                                                        });
                                               },

                     phone      : function(el){



                                                    el.inputmask('(999)999-9999');


                                                    el.keydown(function (e) {
                                                                                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39)) {
                                                                                    return;
                                                                                }
                                                                                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });


                                                    el.keyup(function(e){
                                                                            var err     = "Please Enter Valid US Phone Number";
                                                                            testInput($(this), validPhoneNumber, err, 'phone');
                                                                        });
                                               },



                    range      : function(el){

                                                    el.keydown(function (e) { 
                                                                                var inputLen = el.val().length;
                                                                                
                                                                                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                                                                                    (e.keyCode == 65   && e.ctrlKey === true) || 
                                                                                    (command.isPressed && e.keyCode == 65) ||
                                                                                    (e.keyCode >= 35   && e.keyCode <= 39) ||
                                                                                    textIsSelected(el)
                                                                                    )
                                                                                     {
                                                                                    return;
                                                                                }
                                                                                if (inputLen == options.maxLength) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            });

                                                     el.keyup(function(e){
                                                                            var inputLen = el.val().length;
                                                                            var err      = "Minimum Length is " + options.minLength + " Characters";

                                                                            if (inputLen < options.minLength){
                                                                                errorMessage($(this), err);
                                                                            }else{
                                                                                el.parent().find('.inputerror').fadeOut(function(){
                                                                                    $(this).remove();
                                                                                });
                                                                            }
                                                                            
                                                                        });
                                               }


                   }


            function errorMessage(el, message, isPw){
                    var hasError =  $(el).parent().find('.inputerror').length > 0;
                   

                    if (!hasError && !isPw){
                        $(el).parent().append('<div class="inputerror">'+ message +'</div>').hide().fadeIn();
                        // $(el).focusAtEnd();
                    }else if(!hasError && isPw ){
                         $(el).parent().append('<div class="inputerror passworderror">'+ message +'</div>').hide().fadeIn();
                    }else if(hasError && isPw){
                         $(el).parent().find('.inputerror').addClass('passworderror');
                    }else{
                         $(el).parent().find('.inputerror').removeClass('passworderror').html(message)
                    }
                    
                    $(el).addClass('invalid')

            }


            function textIsSelected(input) {
                // console.log(input.get(0).selectionStart);
                    if (input.val().length == 0){
                        return false;
                    }else if (typeof input.get(0).selectionStart == "number") {
                        return input.get(0).selectionStart == 0 && input.get(0).selectionEnd == input.get(0).value.length;
                    } else if (typeof document.selection != "undefined") {
                        input.focus();
                        return document.selection.createRange().text == input.get(0).value;
                    }
            }

            function testInput(el, regex, errMessage, checkFor){
                var curVal  = el.val();
                var isPw    = false;

                if(checkFor == "credit"){
                    curVal = curVal.replace(/\s+/g, '');
                   
                }else if(checkFor =="phone"){
                     curVal = curVal.replace(/\D/g,'');
                }else if(checkFor == "password"){
                    isPw = true;
                }
                var isValid = curVal.match(regex); 
                var err     = errMessage;

                


                if (!isValid && curVal != 0){
                    errorMessage(el, err, isPw);
                }else{
                    el.parent().find('.inputerror').fadeOut(function(){
                        $(this).remove();
                    });

                    el.removeClass('invalid')
                    el.parent().find('.warning').fadeOut(function(){
                        $('this').remove();
                    })
                   
                }

            }

    switch(type){
        case 'alphanumeric':
            validate.alphanumeric(input);
            break;

        case 'credit':

            validate.creditCard(input);
            break;

        case 'date':
            validate.date(input);
            break;

        case 'decimal':
            validate.decimal(input);
            break;

        case 'email':
            validate.email(input);
            break;

        case 'integer':
            validate.integer(input);
            break;

        case 'ip':
            validate.ipAddress(input);
            break;

        case 'letter':
            validate.letter(input);
            break;

        case 'money':
            validate.money(input);
            break;

        case 'nonNumber':
            validate.nonNumber(input);
            break;

        case 'number':
            validate.number(input);
            break;

        case 'password':
            validate.password(input);
            break;

        case 'phone':
            validate.phone(input);
            break;

        case 'range':
            validate.range(input);
            break;
    }
    


    return this;
};