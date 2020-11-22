$(function () {
    //    $('#ad-modal .location-select')[0].sumo.reload();
    //    $('.type-select').change(function () {
    $('.register-page ').on("change", "#country-select", function () {
        //        console.log("ss");
        $('#state-select')[0].sumo.reload();
    });

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
            $("select.form-control:invalid").each(function(){
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
