//burger
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__list'),
        menuItem = document.querySelectorAll('.header__link'),
        hamburger = document.querySelector('.header__burger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('burger_active');
            menu.classList.toggle('menu_active');
        })
    })
})




//slowScroll
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}



$(document).ready(function () {



    //currentLight
    jQuery(window).scroll(function () {
        var $sections = $('.xsection');
        $sections.each(function (i, el) {
            var top = $(el).offset().top - 100;
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('a.active').removeClass('active');
                $('a[href="#' + id + '"]').addClass('active');

            }

            if (top == 150) {
                $('a.active').removeClass('active');
            }
        })
    });


    //меняем цвет плашке
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 50) {
            jQuery('.header').addClass('bgc-fff');
            jQuery('.header').removeClass('bgc-fff-no');
        }
        else {
            jQuery('.header').addClass('bgc-fff-no');
        }
    });






    //calc



    //взаимоисключаем селекеты
    $('select').change(function () {
        //select
        var color = $('#color').val();
        var paper = $('#paper').val();
        var format = $('#format').val();
        var amount = $('#amount').val();
        var corner = $('#corner').val();




        //убираем А3 и визитки при ч/б
        if (color == 1) {
            $('#format option[value="5"]').prop('disabled', true);
            $('#format option[value="6"]').prop('disabled', true);
            $('#format option[value="5"]').prop('selected', false);
            $('#format option[value="6"]').prop('selected', false);


        } else {
            $('#format option[value="5"]').prop('disabled', false);
            $('#format option[value="6"]').prop('disabled', false);
        }

        //убираем А3 при 2 цветах
        if (color == 2) {
            $('#format option[value="5"]').prop('disabled', true);
            $('#format option[value="5"]').prop('selected', false);
        }


        //если чб или двухцветная - только офсет бумага
        if (color == 1 || color == 2) {
            // b/w
            $('#paper option[value="2"]').prop('disabled', true);
            $('#paper option[value="2"]').prop('selected', false);


            //отключаем выбор сторон и скрываем
            $('#checkbox-ios2').prop('checked', false);
            $('.one_or_two').hide();

        } else {
            // 2 color
            $('#paper option[value="2"]').prop('disabled', false);

            $('.one_or_two').show();
        }


        $('#corner').prop('disabled', true);
        if (color == 3 && paper == 2) {
            $('#corner').prop('disabled', false);
        }




    })
    //взаимоисключаем селекеты


    $('.calc-btn').click(function () {

        //select
        var color = $('#color').val();
        var paper = $('#paper').val();
        var format = $('#format').val();
        var amount = $('#amount').val();
        var corner = $('#corner').val();

        // b/w
        if (color == 1 && (format == 1 || format == 2)) {

            $('.result').html(Math.round(amount * .28))

        } else if (color == 1 && format == 3) {

            $('.result').html(Math.round(amount * .40))


        } else if (color == 1 && format == 4) {

            $('.result').html(Math.round(amount * .75))

        }
        // b/w

        // визитки

        if (format == 6) {
            $('.result').html(Math.round(amount * .7))
        }

        // визитки


        // colors print глянец две стороны
        if ($('#checkbox-ios2').prop('checked') && color == 3 && paper == 2) {

            //colors - 2 side      цветная печать, глянцевая бумага a6 на двух сторонах
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .55) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10001) {

                $('.result').html(Math.round(amount * .50) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на двух сторонах
            if (format == 3 && amount <= 5000) {

                $('.result').html(Math.round(amount * .95) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .75) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10001) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на двух сторонах
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.30) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.20) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10001) {

                $('.result').html(Math.round(amount * 1.15) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на двух сторонах
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.30) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.20) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10001) {

                $('.result').html(Math.round(amount * 2.15) + Math.round(amount * corner))

            }

        }
        else if (color == 3 && paper == 2) {
            //colors              цветная печать, глянцевая бумага a6 на одной стороне
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .65) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .50) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10001) {

                $('.result').html(Math.round(amount * .45) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на одной стороне
            if (format == 3 && amount <= 5000) {

                $('.result').html(Math.round(amount * .90) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10001) {

                $('.result').html(Math.round(amount * .65) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на одной стороне
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.25) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.15) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10001) {

                $('.result').html(Math.round(amount * 1.10) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на одной стороне
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.25) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.15) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10001) {

                $('.result').html(Math.round(amount * 2.10) + Math.round(amount * corner))

            }

        }



        // colors print офсет две стороны
        if ($('#checkbox-ios2').prop('checked') && color == 3 && paper == 1) {

            //colors - 2 side      цветная печать, глянцевая бумага a6 на двух сторонах
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .63) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .48) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10001) {

                $('.result').html(Math.round(amount * .43) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на одной стороне
            if (format == 3 && amount <= 5000) {

                $('.result').html(Math.round(amount * .88) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .68) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10001) {

                $('.result').html(Math.round(amount * .63) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на одной стороне
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.23) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.13) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10001) {

                $('.result').html(Math.round(amount * 1.08) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на одной стороне
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.23) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.13) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10001) {

                $('.result').html(Math.round(amount * 2.08) + Math.round(amount * corner))

            }

        }
        else if (color == 3 && paper == 1) {

            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .58) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .43) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10001) {

                $('.result').html(Math.round(amount * .38) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на двух сторонах
            if (format == 3 && amount <= 5000) {

                $('.result').html(Math.round(amount * .83) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .63) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10001) {

                $('.result').html(Math.round(amount * .58) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на двух сторонах
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.18) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.08) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10001) {

                $('.result').html(Math.round(amount * 1.03) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на двух сторонах
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.18) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.08) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10001) {

                $('.result').html(Math.round(amount * 2.03) + Math.round(amount * corner))

            }

        }



        // only 2 color
        if (color == 2) {
            // двухцветная печать на одной стороне формат а6
            if (format == 2 && amount <= 5000) {
                $('.result').html(Math.round(amount * .47) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .45) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10001) {

                $('.result').html(Math.round(amount * .40) + Math.round(amount * corner))

            }

            // двухцветная печать на одной стороне формат а5
            if (format == 3 && amount <= 5000) {
                $('.result').html(Math.round(amount * .57) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .55) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10001) {

                $('.result').html(Math.round(amount * .50) + Math.round(amount * corner))

            }

            // двухцветная печать на одной стороне формат а4
            if (format == 4 && amount <= 5000) {
                $('.result').html(Math.round(amount * 1.12) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.10) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10001) {

                $('.result').html(Math.round(amount * 1.08) + Math.round(amount * corner))

            }
        }

    });
    // btn-calc

    //цвет текста при чекед
    $('#checkbox-ios2').click(function () {
        if ($('#checkbox-ios2').prop('checked')) {
            $('.span_two_side').addClass('span_checked_color')
            $('.span_one_side').removeClass('span_checked_color')
        } else {
            $('.span_one_side').addClass('span_checked_color')
            $('.span_two_side').removeClass('span_checked_color')
        }
    })



});



