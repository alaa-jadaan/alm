$(function () {
    //    $('#ad-modal .location-select')[0].sumo.reload();
    //    $('.type-select').change(function () {
    $('.register-page ').on("change", "#country-select", function () {
        //        console.log("ss");
        $('#state-select')[0].sumo.reload();
    });

    function changeToPartField() {
        var partsNum = Number($("#subject-select").find('option:selected').val());
        var sum = Number($("#from-part").val()) + partsNum;
        $("#to-part").html(sum);
    }
    $('#subject-select').change(function () {
        $("#part-wrapper").removeClass("d-none");
        changeToPartField();
    });
    $("#from-part").on('keyup paste', function (event) {
        changeToPartField();
    });

    //arabic letters validation
    function onlyArabic($field) {
        // Arabic characters fall in the Unicode range 0600 - 06FF
        var arabicCharUnicodeRange = /[\u0600-\u06FF]/;

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
    }
    // allow arabic characters only for following fields
    onlyArabic($("#register-form input[name='first_name']"));
    onlyArabic($("#register-form input[name='father_name']"));
    onlyArabic($("#register-form input[name='last_name']"));

    //arabic letters validation
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
    onlyNumbers($("#register-form input[name='phone']"));
    onlyNumbers($("#register-form input[name='phone-confirm']"));
    //    onlyNumbers($("#from-part"));

    $("#from-part").on('keypress', function (event) {
        var range = /^[0-9]+$/;
        var key = event.which;
        // 0 = numpad
        // 8 = backspace
        if (key == 8 || key == 0) {
            return true;
        }

        var str = String.fromCharCode(key);
        if (range.test(str)) {
            var newVal = $(this).val() + event.key;
            console.log(newVal);
            if (Number(newVal) > 30) {
                return false;
            }
            return true;
        }
        return false;
    });

    //    function checkPhoneMatch() {
    //        var phone = $("#register-form input[name='phone']").val();
    //        var confirmPhone = $("#register-form input[name='phone-confirm']").val();
    //
    //        if (phone != confirmPhone){
    //            if(confirmPhone !== ""){
    //                $(".phone-match-note").html("الرقمين غير متطابقين");
    //                $(".phone-match-note").css('background-color', '#dc3545');
    //            }else{
    //                $(".phone-match-note").html("");
    //                $(".phone-match-note").removeAttr("style");
    //            }
    //        }else if(phone === "" && confirmPhone === "" ){
    //            $(".phone-match-note").html("");
    //            $(".phone-match-note").removeAttr("style");
    //        }else{
    //            $(".phone-match-note").html("الرقمين متطابقين");
    //            $(".phone-match-note").css('background-color', '#28a745');
    //        }
    //    }
    //    
    //    $("#register-form input[name='phone']").keyup(checkPhoneMatch);
    //    $("#register-form input[name='phone-confirm']").keyup(checkPhoneMatch);


    //    var url= window.location
    //    var pos = url.search(":");
    //    var id = url.slice(pos);

    //    $.ajax({
    //        type: "get",
    //        url: "http://pure-journey-56274.herokuapp.com/api/check_course",
    //        dataType: "json",
    //        data: {
    //            id: 2
    //        }
    //    }).done(function (data) {
    //        //		console.log(data);
    //        if (data.status) {
    //        }
    //    });

    //    $.ajax({
    //        type: "get",
    //        url: "http://pure-journey-56274.herokuapp.com/api/quran_subjects",
    //        dataType: "json"
    //    }).done(function (data) {
    //        		console.log(data);
    //        if (data.status) {
    //            var i;
    //            for (i in data) {
    //                $('#subject-select').append($('<option>', {
    //                    value: data[i].location_id,
    //                    text: data[i].name
    //                }));
    //            }
    //        }
    //    });


    $("#register-form").submit(function (evnt) {
        //        apply custom Bootstrap validation styles to form
        if ($(this).hasClass("needs-validation")) {
            //            $(this).removeClass("was-validated");
            //        prevent submission
            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            console.log($("select.form-control:invalid"));
            $("select.form-control:invalid").each(function () {
                $(this).siblings(".CaptionCont").addClass("sumo-invalid");
            });
            this.classList.add('was-validated');
        }
        //        evnt.preventDefault();
        //        evnt.stopImmediatePropagation();

        console.log($("#register-form").serialize());
        console.log($("#register-form").serializeArray());
        //        console.log($.param(data));

        //        $.ajax({
        //            type: "post",
        //            url: "/api/quran_register",
        //            dataType: "json",
        //            data: $.param(data)
        //        }).done(function (data) {
        //            console.log(data);
        //            
        //        });

    });

    //    var template = document.getElementById('invalid-msg-template').innerHTML;
    //    var rendered = Mustache.render(template);
    //    document.getElementById('target').innerHTML = rendered;

});
