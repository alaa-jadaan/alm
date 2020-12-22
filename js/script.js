$(function () {
    //Sorting options alphabetically and reinitialize sumo select
    setTimeout(function () {
        //remove the plugin default placeholder
        //        $("#nationality-select option[value=''], #country-select option[value='']").remove();

        //        var my_options = $("#nationality-select option");
        //
        //        my_options.sort(function (a, b) {
        //            if (a.text > b.text) return 1;
        //            if (a.text < b.text) return -1;
        //            return 0
        //        });

        //add my placeholder
        $("#nationality-select option[value=''], #country-select option[value='']").addClass("d-none").text("");
        //        $("#nationality-select, #country-select").empty().append('<option disabled class="d-none" value=""></option>');
        //        $("#nationality-select, #country-select").append('<option disabled class="d-none" value=""></option>');
        //append sorted options
        //        $("#nationality-select, #country-select").append(my_options);
        //to select the placeholder option
        //        var placeholder1 = $("#nationality-select option[value='']");
        //        var placeholder2 = $("#country-select option[value='']");
        //        $("#nationality-select").val(placeholder1);
        //        $("#country-select").val(placeholder2);

        $('#nationality-select')[0].sumo.reload();
        $('#country-select')[0].sumo.reload();
    }, 0);
    //
    $('.register-page ').on("change", "#country-select", function () {
        //        //Sorting options alphabetically and reinitialize sumo select
        //        //remove the plugin default placeholder
        //        $("#city-select option[value='']").remove();
        //        var my_options = $("#city-select option");
        //
        //        my_options.sort(function (a, b) {
        //            if (a.text > b.text) return 1;
        //            if (a.text < b.text) return -1;
        //            return 0
        //        });
        //
        //        //add my placeholder
        $("#city-select option[value='']").addClass("d-none").text("");
        //        $("#city-select").empty().append('<option disabled class="d-none" value=""></option>');
        //        //append sorted options
        //        $("#city-select").append(my_options);
        //        //to select the placeholder option
        $("#city-select").attr("placeholder", "الرجاء الاختيار");
        //        var placeholder = $("#city-select option[value='']");
        //        $("#city-select").val(placeholder);
        //        
        $('#city-select')[0].sumo.reload();
    });

    $('#nationality-select, #country-select').change(function () {
        //        $("option:selected", this)
        if ($("option:selected", this).data("class") == "il") {
            console.log("af");
            //            $("#country-select").val($("#country-select option").data("class", "ps").val())
            $("option[data-class='ps']", this).attr("selected", "selected");
            $(this)[0].sumo.reload();
        }
    });

    $('#study-select').change(function () {
        if ($("#study-select").val() == "4" || $("#study-select").val() == "5") {
            $("#study-sp-wrapper").removeClass("d-none");
        } else {
            $("#study-sp-wrapper").addClass("d-none");
            $("#study-sp").val("");
        }
    });

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

    $("select.form-control").change(function () {
        if ($(this).siblings(".CaptionCont").hasClass("sumo-invalid")) {
            $(this).siblings(".CaptionCont").removeClass("sumo-invalid")
        }
    });

    $("#register-form").submit(function (evnt) {
        event.preventDefault();
        event.stopPropagation();

        $("#error-message").addClass("d-none");
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
                var arabicCharUnicodeRange = /[\u0600-\u06FF]/;

                var first_name = $("#first_name").val();
                var father_name = $("#father_name").val();
                var last_name = $("#last_name").val();

                if (!arabicCharUnicodeRange.test(first_name) || !arabicCharUnicodeRange.test(father_name) || !arabicCharUnicodeRange.test(last_name)) {
                    $("html, body").animate({
                        scrollTop: $("form").offset().top
                    }, "slow");
                    $("#error-message").html("*الرجاء إدخال الاسم باللغة العربية");

                    $("#error-message").removeClass("d-none");
                    return false;
                }
                //validate phone
                if (!($("#error-msg").hasClass("d-none"))) {
                    $("#error-message").html("*الرجاء كتابة رقم الوتساب بشكل صحيح");
                    $("#error-message").removeClass("d-none");
                    return false;
                }
                //validate phone and phone-confirm match
                var phone = $("#phone").val();
                var confirmPhone = $("#phone-confirm").val();

                if (phone !== confirmPhone) {
                    $("html, body").animate({
                        scrollTop: $("form").offset().top
                    }, "slow");
                    $("#error-message").html("*الرجاء إعادة كتابة رقم الوتساب بشكل صحيح");

                    $("#error-message").removeClass("d-none");
                    return false;
                }

                //validate arabic specialization
                if ($("#study-select").val() == "4" || $("#study-select").val() == "5") {
                    var specialization = $("#study-sp").val();
                    if (specialization != "") {
                        if (!arabicCharUnicodeRange.test(specialization)) {
                            $("html, body").animate({
                                scrollTop: $("form").offset().top
                            }, "slow");
                            $("#error-message").html("*الرجاء إدخال الاختصاص باللغة العربية");
                            $("#error-message").removeClass("d-none");
                            return false;
                        }
                    }

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

        }
    });

    //    $('#error-modal').modal("show")
    //    $('#success-modal').modal("show")

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


});
