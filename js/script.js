$(function () {
    //    Loading screen
    var ajaxLoadTimeout;
    $(document).ajaxStart(function () {
        ajaxLoadTimeout = setTimeout(function () {
            $(".loading-overlay").fadeIn("fast");
        }, 600);

    }).ajaxComplete(function () {
        clearTimeout(ajaxLoadTimeout);
        $(".loading-overlay").fadeOut("fast");
    });

    //display specialization input
    $('#study-select').change(function () {
        if ($("#study-select").val() == "4" || $("#study-select").val() == "5") {
            $("#study-sp-wrapper").removeClass("d-none");
        } else {
            $("#study-sp-wrapper").addClass("d-none");
            $("#study-sp").val("");
        }
    });
    
//    function changeToPartField1() {
//        $("#part-error").addClass("d-none");
//        $("#to-part-text").removeClass("d-none");
////        $("#from-part").vl("1");
//        $("#from-part").val("");
//        if ($("#subject-select").find('option:selected').data("multi")) {
//            $("#part-wrapper").removeClass("d-none");
//            $("#from-part").attr("required", "required");
//            var partsNum = Number($("#subject-select").find('option:selected').data("count"));
//            var sum = Number($("#from-part").val()) + partsNum - 1;
//            if (sum > 30) {
//                $("#to-part").html("");
//                $("#part-error").removeClass("d-none");
//                $("#to-part-text").addClass("d-none");
//            } else {
//                $("#to-part").html(sum);
//            }
//
//        } else {
//            $("#from-part").removeAttr("required");
////            $("#from-part").val("1");
//            $("#from-part").val("");
//            $("#to-part").html("");
//            $("#part-error").addClass("d-none");
//            $("#to-part-text").removeClass("d-none");
//            $("#part-wrapper").addClass("d-none");
//        }
//    }
//
//    function changeToPartField() {
//        $("#part-error").addClass("d-none");
//        $("#to-part-text").removeClass("d-none");
//        var partsNum = Number($("#subject-select").find('option:selected').data("count"));
//        var sum = Number($("#from-part").val()) + partsNum - 1;
//        if (sum > 30) {
//            $("#to-part").html("");
//            $("#part-error").removeClass("d-none");
//            $("#to-part-text").addClass("d-none");
//        } else {
//            $("#to-part").html(sum);
//        }
//    }

    function subjectChange() {
//        console.log($('#from-part-select').val());
        $("#part-error").addClass("d-none");
        $("#to-part-text").removeClass("d-none");
        $('#from-part-select')[0].sumo.unSelectAll();
        $("#from-part-select option:selected").prop("selected", false)
        if ($("#subject-select").find('option:selected').data("multi")) {
            $("#part-wrapper").removeClass("d-none");
            $("#from-part-select").attr("required", "required");
            var partsNum = Number($("#subject-select").find('option:selected').data("count"));
            var sum = Number($("#from-part-select").val()) + partsNum - 1;
            if (sum > 30) {
                $("#to-part").html("");
                $("#part-error").removeClass("d-none");
                $("#to-part-text").addClass("d-none");
            } else {
                $("#to-part").html(sum);
            }

        } else {
            $("#from-part-select").removeAttr("required");
            $("#from-part").val("");
            $("#to-part").html("");
            $("#part-error").addClass("d-none");
            $("#to-part-text").removeClass("d-none");
            $("#part-wrapper").addClass("d-none");
        }
    }

    function partChange() {
        $("#part-error").addClass("d-none");
        $("#to-part-text").removeClass("d-none");
        var partsNum = Number($("#subject-select").find('option:selected').data("count"));
        var sum = Number($("#from-part-select").val()) + partsNum - 1;
        if (sum > 30) {
            $("#to-part").html("");
            $("#part-error").removeClass("d-none");
            $("#to-part-text").addClass("d-none");
        } else {
            $("#to-part").html(sum);
        }
    }
    
    $('#subject-select').change(function () {
        subjectChange();
    });

    //add from-part-select
    for (j = 1; j <= 28; j += 1) {
        $("#from-part-select").append($('<option>', {
            value: j,
            text: j
        }));
    }
    $('#from-part-select')[0].sumo.reload();
    
    $('#from-part-select').change(function () {
        partChange();
    });
//    $("#from-part").on('keyup paste', function (event) {
//        changeToPartField();
//    });
    
//    $("#from-part").on('focusout', function (event) {
//        if($(this).val() == 0){
//            $("#to-part").html("");
//            $("#part-error").removeClass("d-none");
//            $("#to-part-text").addClass("d-none");
//        }
//    });

    //arabic letters validation
    function onlyArabic($field) {
        // Arabic characters fall in the Unicode range 0600 - 06FF
        var arabicCharUnicodeRange = /[\u0600-\u06FF]/;
        //        var arabicCharUnicodeRange = /[ء-ي]/;
        //        var arabicCharUnicodeRange = /([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])/;
        //        var regex = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]");
        //sol1
        $field.on('keypress paste', function (event) {
            var key = event.which;
            // 0 = numpad
            // 8 = backspace
            // 32 = space
            if (key == 8 || key == 0 || key === 32) {
                return true;
            }

            var str = String.fromCharCode(key);
            if (arabicCharUnicodeRange.test(str)) {
                return true;
            }

            return false;
        });
        //sol2
        //        $field.on('keypress keyup', function (event) {
        //            if (this.value.match(/\D/)) {
        //                this.value = this.value.replace(/\D/g, '');
        //            }
        //
        //        });
        //sol3
        //        $field.on('keypress keyup', function (event) {
        //            console.log(this.value.match(/\D/))
        //            if (this.value.match(/\D/)) {
        ////                return true;
        //            }else{
        //                return false;
        //            }
        //
        //        });
    }
    // allow arabic characters only for following fields
    onlyArabic($("#first_name"));
    onlyArabic($("#father_name"));
    onlyArabic($("#last_name"));
    onlyArabic($("#study-sp"));

    //numbers validation
    function onlyNumbers($field) {
        var range = /^[0-9]+$/;

        $field.on('keypress paste', function (event) {
            var key = event.which;
            // 0 = numpad
            // 8 = backspace
            // 32 = space
            if (key == 8 || key == 0 || key === 32) {
                return true;
            }

            var str = String.fromCharCode(key);
            if (range.test(str)) {
                return true;
            }

            return false;
        });
    }
    // allow arabic characters only for following fields
    onlyNumbers($("#phone"));
    onlyNumbers($("#phone-confirm"));

    //allow only numbers between 1-30
//    $("#from-part").on('keypress paste', function (event) {
//        var range = /^[0-9]+$/;
//        var key = event.which;
//        // 0 = numpad
//        // 8 = backspace
//        if (key == 8 || key == 0) {
//            return true;
//        }
//
//        var str = String.fromCharCode(key);
//        if (range.test(str)) {
//            var newVal = $(this).val() + event.key;
//            if (Number(newVal) > 30) {
//                return false;
//            }
//            return true;
//        }
//        return false;
//    });
    
    function checkPhoneMatch() {
        var phone = $("#phone").val();
        var confirmPhone = $("#phone-confirm").val();

        if (phone != confirmPhone) {
            if (confirmPhone !== "") {
                $("#phone-match-note").html("الرقمين غير متطابقين");
                $("#phone-match-note").addClass("text-danger");
                $("#phone-match-note").removeClass("text-success");
                $("#phone-match-note").parent().removeClass("d-none");
            } else {
                $("#phone-match-note").parent().addClass("d-none");
            }
        } else if (phone === "" && confirmPhone === "") {
            $("#phone-match-note").parent().addClass("d-none");
        } else {
            $("#phone-match-note").html("الرقمين متطابقين");
            $("#phone-match-note").removeClass("text-danger");
            $("#phone-match-note").addClass("text-success");
            $("#phone-match-note").parent().removeClass("d-none");
        }
    }

    $("#phone").keyup(checkPhoneMatch);
    $("#phone-confirm").keyup(checkPhoneMatch);

    //remove invalid style when select option
    $("select.form-control").change(function () {
        if ($(this).siblings(".CaptionCont").hasClass("sumo-invalid")) {
            $(this).siblings(".CaptionCont").removeClass("sumo-invalid")
        }
    });

//    var arabic = /[\u0600-\u06FF-\s]/;//arabic and space
//    var string = "يسيس سيَ يُّd";
//    console.log(((string.split(arabic).length - 1) == string.length));
    
    $("#register-form").submit(function (evnt) {
        event.preventDefault();
        event.stopPropagation();

        $("#error-message, .field-error-msg").addClass("d-none");
        
        //        apply custom Bootstrap validation styles to form
        if ($(this).hasClass("needs-validation")) {
            //            $(this).removeClass("was-validated");
            //to add validation styles
            this.classList.add('was-validated');
            if (this.checkValidity() === false) {
                $("select.form-control:invalid").each(function () {
                    $(this).siblings(".CaptionCont").addClass("sumo-invalid");
                });
                $("html, body").animate({
                    scrollTop: $("form").offset().top
                }, "slow");
                $("#error-message").html("*الرجاء إدخال كافة الحقول الإلزامية");
                $("#error-message").removeClass("d-none");
                return false;
            } else {
                //validate arabic input
                var arabicCharUnicodeRange = /[\u0600-\u06FF-\s]/;//arabic and space

                var first_name = $("#first_name").val();
                var father_name = $("#father_name").val();
                var last_name = $("#last_name").val();

//                if (!((first_name.split(arabicCharUnicodeRange).length - 1) == first_name.length) ||
//                    !((father_name.split(arabicCharUnicodeRange).length - 1) == father_name.length) ||
//                    !((last_name.split(arabicCharUnicodeRange).length - 1) == last_name.length)) {
//                    $("html, body").animate({
//                        scrollTop: $("form").offset().top
//                    }, "slow");
//                    $("#error-message").html("*الرجاء إدخال الاسم باللغة العربية");
//
//                    $("#error-message").removeClass("d-none");
//                    return false;
//                }
                var wrong = false;
                if (!((first_name.split(arabicCharUnicodeRange).length - 1) == first_name.length)) {
                    $("#first_name").siblings(".field-error-msg").html("*الرجاء إدخال الاسم باللغة العربية");
                    $("#first_name").siblings(".field-error-msg").removeClass("d-none");
                    wrong = true;
                }
                if (!((father_name.split(arabicCharUnicodeRange).length - 1) == father_name.length)) {
                    $("#father_name").siblings(".field-error-msg").html("*الرجاء إدخال الاسم باللغة العربية");
                    $("#father_name").siblings(".field-error-msg").removeClass("d-none");
                    wrong = true;
                }
                if (!((last_name.split(arabicCharUnicodeRange).length - 1) == last_name.length)) {
                    $("#last_name").siblings(".field-error-msg").html("*الرجاء إدخال الاسم باللغة العربية");
                    $("#last_name").siblings(".field-error-msg").removeClass("d-none");
                    wrong = true;
                }
                if (wrong) {
                    $("html, body").animate({
                        scrollTop: $("#first_name").offset().top
                    }, "slow");

                    return false;
                }
                //validate phone
                if (!($("#error-msg").hasClass("d-none"))) {
                    $("html, body").animate({
                        scrollTop: $("#phone").offset().top
                    }, "slow");
                    $(".phone-container").siblings(".field-error-msg").html("*الرجاء كتابة رقم الوتساب بشكل صحيح");
                    $(".phone-container").siblings(".field-error-msg").removeClass("d-none");
                    return false;
                }
                
                
                //validate phone and phone-confirm match
                var phone = $("#phone").val();
                var confirmPhone = $("#phone-confirm").val();

                if (phone !== confirmPhone) {
                    $("html, body").animate({
                        scrollTop: $("#phone").offset().top
                    }, "slow");
                    $(".phone-confirm-container").siblings(".field-error-msg").html("*الرجاء إعادة كتابة رقم الوتساب بشكل صحيح");

                    $(".phone-confirm-container").siblings(".field-error-msg").removeClass("d-none");
                    return false;
                }

                //validate arabic specialization
                if ($("#study-select").val() == "4" || $("#study-select").val() == "5") {
                    var specialization = $("#study-sp").val();
                    if (specialization != "") {
                        if (!((specialization.split(arabicCharUnicodeRange).length - 1) == specialization.length)) {
                            $("html, body").animate({
                                scrollTop: $("#study-sp").offset().top
                            }, "slow");
                            $("#study-sp").siblings(".field-error-msg").html("*الرجاء إدخال الاختصاص باللغة العربية");
                            $("#study-sp").siblings(".field-error-msg").removeClass("d-none");

                            return false;
                        }
                    }
                }
                
                //check if policies accepted
                if(!($("#accept").is(':checked'))){
                    $("html, body").animate({
                        scrollTop: $("#policies").offset().top
                    }, "slow");
                    $("#policies .field-error-msg").html("*الرجاء قراءة شروط التسجيل والموافقة عليها");
                    $("#policies .field-error-msg").removeClass("d-none");
                    return false;
                }
                
                var parts;
                data = $(this).serializeArray();
                if ($("#subject-select").find('option:selected').data("multi")) {
                    parts = $("#from-part").val() + "," + Number($("#to-part").text());
                    data.push({
                        name: "parameter-notes",
                        value: parts
                    });
                }

                $.ajax({
                    type: "post",
                    url: "http://pure-journey-56274.herokuapp.com//api/quran_register",
                    dataType: "json",
                    data: $.param(data)
                }).done(function (data) {
                    console.log(data);
                    alert("Thank you");

                });
            }

        }
    });

    //initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //select birthday year
    var dateNow = new Date();
    var intYear = dateNow.getFullYear();
    for (i = 1930; i <= intYear; i += 1) {
        $("#birthday-select").append($('<option>', {
            value: i,
            text: i
        }));
    }
    $('#birthday-select')[0].sumo.reload();

    //check if policies are read
    $('#policies').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 50) {
        $("#accept").removeAttr("disabled");
        }
    });

});
