<!DOCTYPE HTML>
<html lang="ar">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>
        ALM
    </title>
    <!--  bootstrap  -->
    <link rel="stylesheet" href="{{ asset('/registration form/css/bootstrap.min.css') }}" />
    <!--  sumo select  -->
    <link rel="stylesheet" href="{{ asset('/registration form/css/sumoselect.min.css') }}" />
    <!--  intlTelInput  -->
    <link rel="stylesheet" href="{{ asset('/registration form/css/intlTelInput.min.css') }}">
    <!--  main css style file  -->
    <link rel="stylesheet" href="{{ asset('/registration form/css/style.css') }}" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body class="register-page">
    <section class="loading-overlay" style="display: block">
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </section>

    <div class="page-content-wrapper">
        <div class="container">
            <header>
                <div class="row mb-5">
                    <div class="col-3">
                        <div class="logo-wrapper">
                            <a class="logo-link" href="#">
                                <img src="{{ asset('/registration form/images/alm.png') }}" class="logo" />
                            </a>
                        </div>
                    </div>
                    <div class="col">
                        <h2 class="title">المقرأة الإلكترونية</h2>
                        <?php
                            $course_arabic= '';
                            foreach ($quranCourse->languages as $language)
                            {
                                if ($language->iso_code == 'ar')
                                {
                                    $course_arabic = 'الدورة ' . $quranCourse->order_number . ' لعام ' . $quranCourse->year;
                                    break;
                                }
                            }
                        ?>
                        <div class="course">{{$course_arabic}}</div>
                        <p class="details">
                            .أهلاً بك في {{$course_arabic}} لتسميع القرآن الكريم عن بعد
                            <br>.الرجاء تعبئة الاستمارة أدناه لمن تود الالتحاق بهذه الدورة
                        </p>
                        <small class="star-note">ملاحظة: الخانات الملحقة ب* خانات إلزامية</small>
                    </div>
                </div>
            </header>

            <form id="register-form" class="needs-validation" novalidate>
                <input type="hidden" name="id">
                <section>
                    <div class="section-header">
                        <div class="title"> مــعـلــومــــات عـــامـــــة</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="first_name">الاسم الأول*</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" placeholder="الرجاء الإدخال" maxlength="20" required>
                            <!--
                            <div class="invalid-feedback">
                                الرجاء تعبئة هذة الخانة
                            </div>
-->
                        </div>
                        <div class="form-group col-md-6">
                            <label for="father_name">اسم الأب*</label>
                            <input type="text" class="form-control" id="father_name" name="father_name" placeholder="الرجاء الإدخال" maxlength="20" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="last_name">الكنية*</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" placeholder="الرجاء الإدخال" maxlength="20" required>
                        </div>
                        <div class="w-100"></div>
                        <div class="form-group col-md-6">
                            <label for="phone">رقم الوتساب الخاص بالطالبة*</label>
                            <input type="tel" class="form-control phone-input" id="phone" name="phoneNoCode" maxlength="15" required>
                            <!--                            <small>يرجى إدخال رقم الوتس الخاص بالطالبة حصراً</small>-->
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">إعادة إدخال رقم الوتساب للتأكد*</label>
                            <input type="text" class="form-control phone-input" id="phone-confirm" placeholder="" name="" maxlength="15" required>
                        </div>

                        <div class="col-12 mb-3 mt-n3 d-none">
                            <div id="phone-match-note" class="text-danger"></div>
                        </div>


                        <div class="form-group col-md-6">
                            <label for="">حسابك على السكايب</label>
                            <input type="text" class="form-control" id="" name="skype" placeholder="اسم الحساب">
                            <img src="images/Question%20Mark.svg" class="info-icon" alt="Details" data-toggle="tooltip" data-placement="bottom" title="اسم الحساب على السكايب">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">تاريخ الميلاد*</label>
                            <input type="date" class="form-control" id="" name="birthday" placeholder="الرجاء الإدخال" required>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="section-header">
                        <div class="title"> مــكــان الإقــامـــة</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="">الجنسية*</label>
                            <select name="nationality" class="sumo-select-search form-control" id="nationality-select" required placeholder="الرجاء الاختيار">
                                <!--first option is to display placeholder-->
                                <option selected disabled class="d-none" value=""></option>
                            </select>
                        </div>
                        <div class="w-100"></div>
                        <div class="form-group col-md-6">
                            <label for="">بلد الإقامة*</label>
                            <select name="country" class="sumo-select-search form-control" id="country-select" required placeholder="الرجاء الاختيار">
                                <option selected disabled class="d-none" value=""></option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">المدينة*</label>
                            <select name="city" class="sumo-select-search form-control" id="state-select" required placeholder="الرجاء الاختيار">
                                <option selected disabled class="d-none" value=""></option>
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="section-header">
                        <div class="title"> عن الدورة</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="">مجموعة الحفظ*</label>
                            <select name="quranSubject" class="sumo-select form-control" id="subject-select" placeholder="الرجاء الاختيار" required>
                                <option selected disabled class="d-none" value=""></option>
                                @if ($subjects != null && count($subjects) > 0)
                                    {{-- @for($i=0; $i<count($subjects); $i++)
                                        <option value="{{$subjects[$i]->id}}">{{$subjects[$i]->languages[0]->pivot->value}}</option>
                                    @endfor --}}
                                @endif
                            </select>
                        </div>
                        <div class="form-group col-md-6 d-none" id="part-wrapper">
                            <label for="" class="d-block">من الجزء*</label>
                            <input type="text" class="form-control" id="from-part" name="" placeholder="10" required>
                            <span id="part-error">الرجاء إدخال قيمة صحيحة</span><span id="to-part-text">إلى الجزء</span> <span id="to-part"></span>
                        </div>
                        <div class="w-100"></div>

                        <div class="form-group col-md-6">
                            <label for="">المؤهل الدراسي*</label>
                            <select name="study" class="sumo-select form-control" id="study-select" placeholder="الرجاء الاختيار" required>
                                <option selected disabled class="d-none" value=""></option>
                                <option value="1">لا يوجد</option>
                                <option value="1">شهادة إعدادية</option>
                                <option value="2">شهادة الثانوية العامة</option>
                                <option value="3">إجازة جامعية</option>
                                <option value="4">دراسات عليا</option>
                            </select>
                        </div>
                    <!--
                        <div class="form-group col-md-6 d-none" id="">
                        <label for="study-sp">الاختصاص</label>
                        <input type="text" class="form-control" id="study-sp" name="" placeholder="الرجاء الإدخال">
                        </div>
                    -->
                        <div class="w-100"></div>
                        <div class="form-group col-12">
                            <label class="d-block">هل أنت مجازة في القرآن الكريم؟*</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="holy_quran" id="holy_quran1" value="1" required>
                                        <label class="form-check-label radio-text" for="holy_quran1">نعم لقد أجزت من قبل</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="holy_quran" id="holy_quran2" value="0">
                                        <label class="form-check-label radio-text" for="holy_quran2">لا لم أجز من قبل</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mb-5">
                    <div class="section-header">
                        <div class="title">
                            شروط الانتساب
                            <hr>
                        </div>
                    </div>
                    <div class="policies">
                        وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم." "سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم سيكيواي نيسكايونت. نيكيو بوررو كيوايسكيوم ايست,كيواي دولوريم ايبسيوم كيوا دولار سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام ألايكيوام كيوايرات فوليوبتاتيم. يوت اينايم أد مينيما فينيام, كيواس نوستريوم أكسيركايتاشيم يلامكوربوريس سيوسكايبيت لابورايوسام, نايساي يوت ألايكيوايد أكس أيا كوموداي كونسيكيواتشر؟ كيوايس أيوتيم فيل أيوم أيوري ريبريهينديرايت كيواي ان إيا فوليوبتاتي فيلايت ايسسي كيوم نايهايل موليستايا كونسيكيواتيو,فيلايليوم كيواي دولوريم أيوم فيوجايات كيو فوليوبتاس نيولا باراياتيور؟" " أت فيرو ايوس ايت أكيوساميوس ايت
                    </div>
                    <hr class="policies-line">
                    <div class="form-group col-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="accept" value="1" required>
                            <label class="form-check-label" for="accept">قرأت كامل الشروط وأنا موافقة عليهم تماماً مع تحمل كامل المسؤولية</label>
                        </div>
                    </div>
                </section>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary" form="register-form">إرسال الاستمارة</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Success Modal -->
    <div id="success-modal" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header pb-0">
                    <img src="images/Success.svg" id="success-icon" class="modal-header-icon" alt="success">
                </div>
                <div class="modal-body text-center py-0">
                    <div class="mb-4 title">تم إرسال الاستمارة بنجاح</div>
                    <p class="text">تتمنى لك إدارة ألف لام ميم المثابرة بإذنه تعالى</p>
                </div>
                <div class="modal-footer mb-2">
                    <a href="#" role="button" class="btn btn-light">متابعة</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div id="error-modal" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header pb-0">
                    <img src="images/Error.svg" id="error-icon" class="modal-header-icon" alt="Error">
                </div>
                <div class="modal-body text-center py-0">
                    <div class="mb-4 title">لم تتم عملية الإرسال بنجاح</div>
                    <p class="text"> الرجاء إعادة المحاولة لاحقاً</p>
                </div>
                <div class="modal-footer mb-2">
                    <a href="#" role="button" class="btn btn-light">تراجع</a>
                </div>
            </div>
        </div>
    </div>
    
    <script id="invalid-msg-template" type="text/template">
        <div class="invalid-feedback">
                                الرجاء تعبئة هذه الخانة
        </div>
    </script>

    <!-- jQuery library -->
    <script src="{{ asset('/registration form/js/jquery-3.5.1.min.js') }}"></script>
    <!--  bootstrap  -->
    <script src="{{ asset('/registration form/js/popper.min.js') }}"></script>
    <script src="{{ asset('/registration form/js/bootstrap.min.js') }}"></script>
    <!--  mustache  -->
    <script src="{{ asset('/registration form/js/mustache.min.js') }}"></script>
    <!--  sumo select  -->
    <script src="{{ asset('/registration form/js/jquery.sumoselect.min.js') }}"></script>
    <!--  intlTelInput  -->
    <script src="{{ asset('/registration form/js/intlTelInput.min.js') }}"></script>
    <script>
        var input = document.querySelector("#phone");
        window.intlTelInput(input, {
            // any initialisation options go here
            preferredCountries: [],
            initialCountry: "auto",
            geoIpLookup: function(success, failure) {
                $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "us";
                    success(countryCode);
                });
            },
            utilsScript: "{{ asset('/registration form/js/utils.js') }}", //for formatting/placeholders etc
            separateDialCode: true,
            hiddenInput: "phone" //Submitting the full international number
        });
    </script>
    <!--  countries  -->
    <script src="{{ asset('/registration form/js/countries.js') }}"></script>
    <script>
        debugger;
        var subjects = @json($subjects);
        var courseId = '{{$quranCourse->id}}';
        $(document).ready(function() {
            populateCountries("country-select", "state-select"); // first parameter is id of country drop-down and second parameter is id of state drop-down
            populateCountries("nationality-select");
            //initialize sumo select
            $(".sumo-select").SumoSelect();
            $(".sumo-select-search").SumoSelect({
                search: true
            });
        });
    </script>

    <!--  main js file  -->
    <script src="{{ asset('/registration form/js/script.js') }}"></script>
</body></html>
