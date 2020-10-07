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


//popups
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const timeout = 800;
let unlock = true;

// Удаление хеша из ссылки
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}


//закрытие по клику на эл-ты с классом .popup__close
const popupCloseIcon = document.querySelectorAll('.popup-close');

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

//открытие попапа
function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupCloseIcon(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

//закрытие попапа
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}



//убираем сдвиг контента из-за появления/скрытия скроллбара
function bodyLock() {

    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

//убираем сдвиг поппапа из-за появления скроллбара
function bodyUnlock() {

    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// закрытие по клику на esc
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


//полифилы IE11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if (!Element.prototype.mathes) {
        Element.prototype.mathes = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.msMathesSelector;
    }
})();



$(document).ready(function () {

    //slowScroll
    var $page = $('html, body');
    $('a[href*="#"]').click(function () {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 3000);
        return false;
    });

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

            if (top = 0) {
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
        } else {
            $('#format option[value="5"]').prop('disabled', false);
            $('#format option[value="6"]').prop('disabled', false);
        }


        //если чб или двухцветная - только офсет бумага
        if (color == 1 || color == 2) {
            // b/w
            $('#paper option[value="2"]').prop('disabled', true);

            //отключаем выбор сторон и скрываем
            $('#checkbox-ios2').prop('checked', false);
            $('.one_or_two').hide();

        } else {
            // 2 color
            $('#paper option[value="2"]').prop('disabled', false);

            $('.one_or_two').show();
        }


        //убираем А3 при ч/б
        if (format == 6) {
            $('#corner').prop('disabled', true);
        } else {
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

            $('.result').html(Math.round(amount * .28) + Math.round(amount * corner))

        } else if (color == 1 && format == 3) {

            $('.result').html(Math.round(amount * .40) + Math.round(amount * corner))


        } else if (color == 1 && format == 4) {

            $('.result').html(Math.round(amount * .75) + Math.round(amount * corner))

        }
        // b/w



        // colors print одна сторона
        if ($('#checkbox-ios2').prop('checked', false) && color == 3 && paper == 2) {
            //colors              цветная печать, глянцевая бумага a6 на одной стороне
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .65) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .50) + Math.round(amount * corner))

            } else if (format == 2 && amount >= 10000) {

                $('.result').html(Math.round(amount * .45) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на одной стороне
            if (format == 3 && amount <= 5000) {

                $('.result').html(Math.round(amount * .90) + Math.round(amount * corner))

            } else if (format == 3 && amount <= 10000) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10000) {

                $('.result').html(Math.round(amount * .65) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на одной стороне
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.25) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.15) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10000) {

                $('.result').html(Math.round(amount * 1.10) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на одной стороне
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.25) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.15) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10000) {

                $('.result').html(Math.round(amount * 2.10) + Math.round(amount * corner))

            }

        } else if ($('#checkbox-ios2').prop('checked', true) && color == 3 && paper == 2) { // две стороны
            //colors - 2 side      цветная печать, глянцевая бумага a6 на двух сторонах
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .55) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10000) {

                $('.result').html(Math.round(amount * .50) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a5 на двух сторонах
            if (format == 2 && amount <= 5000) {

                $('.result').html(Math.round(amount * .95) + Math.round(amount * corner))

            } else if (format == 2 && amount <= 10000) {

                $('.result').html(Math.round(amount * .75) + Math.round(amount * corner))

            } else if (format == 3 && amount >= 10000) {

                $('.result').html(Math.round(amount * .70) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a4 на двух сторонах
            if (format == 4 && amount <= 5000) {

                $('.result').html(Math.round(amount * 1.30) + Math.round(amount * corner))

            } else if (format == 4 && amount <= 10000) {

                $('.result').html(Math.round(amount * 1.20) + Math.round(amount * corner))

            } else if (format == 4 && amount >= 10000) {

                $('.result').html(Math.round(amount * 1.15) + Math.round(amount * corner))

            }

            //                      цветная печать, глянцевая бумага a3 на двух сторонах
            if (format == 5 && amount <= 5000) {

                $('.result').html(Math.round(amount * 2.30) + Math.round(amount * corner))

            } else if (format == 5 && amount <= 10000) {

                $('.result').html(Math.round(amount * 2.20) + Math.round(amount * corner))

            } else if (format == 5 && amount >= 10000) {

                $('.result').html(Math.round(amount * 2.15) + Math.round(amount * corner))

            }
        }








    });

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



