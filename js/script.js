$(function () {
    //reinitialize sumo select
    setTimeout(function () {
        $('#nationality-select')[0].sumo.reload();
        $('#country-select')[0].sumo.reload();
    }, 0);

//    $('#study-select').change(function () {
//        if ($("#study-select").val() == "2") {
//            $("#study-sp").removeClass("d-none");
//        } else {
//            $("#study-sp").addClass("d-none");
//            $("#study-sp").val("");
//        }
//    });

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

    $('.register-page ').on("change", "#country-select", function () {
        $('#city-select')[0].sumo.reload();
    });

    
    function changeToPartField1() {
        $("#part-error").addClass("d-none");
        $("#to-part-text").removeClass("d-none");
        $("#from-part").val("1");
        if ($("#subject-select").find('option:selected').data("multi")) {
            $("#part-wrapper").removeClass("d-none");
            $("#from-part").attr("required", "required");
            var partsNum = Number($("#subject-select").find('option:selected').data("count"));
            var sum = Number($("#from-part").val()) + partsNum - 1;
            console.log(sum)
            if (sum > 30) {
                $("#to-part").html("");
                $("#part-error").removeClass("d-none");
                $("#to-part-text").addClass("d-none");
            } else {
                $("#to-part").html(sum);
            }

        } else {
            $("#from-part").removeAttr("required");
            $("#from-part").val("1");
            $("#to-part").html("");
            $("#part-error").addClass("d-none");
            $("#to-part-text").removeClass("d-none");
            $("#part-wrapper").addClass("d-none");
        }
    }

    function changeToPartField() {
        $("#part-error").addClass("d-none");
        $("#to-part-text").removeClass("d-none");
        var partsNum = Number($("#subject-select").find('option:selected').data("count"));
        var sum = Number($("#from-part").val()) + partsNum - 1;
        console.log(sum)
        if (sum > 30) {
            $("#to-part").html("");
            $("#part-error").removeClass("d-none");
            $("#to-part-text").addClass("d-none");
        } else {
            $("#to-part").html(sum);
        }
    }

    $('#subject-select').change(function () {
        changeToPartField1();
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
    onlyNumbers($("#phone"));
    onlyNumbers($("#phone-confirm"));

    //allow only numbers between 1-30
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

    //get quran subjects
    $.ajax({
        type: "get",
        url: "http://pure-journey-56274.herokuapp.com/api/quran_subjects",
        dataType: "json"
    }).done(function (data) {
        var i;
        for (i in data) {
            $('#subject-select').append($('<option>', {
                value: data[i].id,
                text: data[i].name,
                "data-multi": data[i].multi,
                "data-count": data[i].count
            }));
        }
        $('#subject-select')[0].sumo.reload();
    });


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

            var parts;
            data = $(this).serializeArray();
            if ($("#subject-select").find('option:selected').data("multi")) {
                parts = $("#from-part").val() + "," + Number($("#to-part").text());
                data.push({
                    name: "parameter-notes",
                    value: parts
                });
            }

            console.log(data);

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
    });

    //    $('#error-modal').modal("show")
    //    $('#success-modal').modal("show")

    //initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //    var template = document.getElementById('invalid-msg-template').innerHTML;
    //    var rendered = Mustache.render(template);
    //    document.getElementById('target').innerHTML = rendered;

});
