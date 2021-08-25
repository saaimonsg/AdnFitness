(function($) {
    "use strict";

    /**
     * [isMobile description]
     * @type {Object}
     */
    window.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
    window.windowHeight = window.innerHeight;
    window.windowWidth = window.innerWidth;

    /**
     * Match height
     */
    $('.row-eq-height > [class*="col-"]').matchHeight();

    var myEfficientFn = debounce(function() {
        $('.row-eq-height > [class*="col-"]').matchHeight();
    }, 250);

    window.addEventListener('resize', myEfficientFn);

    /**
     * [debounce description]
     * @param  {[type]} func      [description]
     * @param  {[type]} wait      [description]
     * @param  {[type]} immediate [description]
     * @return {[type]}           [description]
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Masonry
     */
    $('.grid__inner').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
    });

    /**
     * grid css
     */
    function work() {
        $('.grid-css').each(function() {
            var workWrapper = $(this),
                workContainer = $('.grid__inner', workWrapper),
                filters = $('.filter', workWrapper),
                filterCurrent = $('.current a', filters),
                filterLiCurrent = $('.current', filters),
                duration = 0.3;
            workContainer.imagesLoaded(function() {
                workContainer.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.grid-item',
                    transitionDuration: duration + 's',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    },
                    // hiddenStyle: {},
                    // visibleStyle: {}
                });
            });
            filters.on('click', 'a', function(e) {
                e.preventDefault();
                var $el = $(this);
                var selector = $el.attr('data-filter');
                filters.find('.current').removeClass('current');
                $el.parent().addClass('current');
                workContainer.isotope({
                    filter: selector
                });
            });
        });
    }

    work();

    /**
     * Swiper
     */
    $('.swiper').each(function() {
        var self = $(this),
            wrapper = $('.swiper-wrapper', self),
            optData = eval('(' + self.attr('data-options') + ')'),
            optDefault = {
                paginationClickable: true,
                pagination: self.find('.swiper-pagination-custom'),
                nextButton: self.find('.swiper-button-next-custom'),
                prevButton: self.find('.swiper-button-prev-custom'),
                spaceBetween: 30,
                autoplay: 6000,
                autoHeight: true
            },
            options = $.extend(optDefault, optData);
        wrapper.children().wrap('<div class="swiper-slide"></div>');
        var swiper = new Swiper(self, options);

        function thumbnails(selector) {

            if (selector.length > 0) {
                var wrapperThumbs = selector.children('.swiper-wrapper'),
                    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
                    optDefaultThumbs = {
                        spaceBetween: 10,
                        centeredSlides: true,
                        slidesPerView: 3,
                        touchRatio: 0.3,
                        slideToClickedSlide: true,
                        pagination: selector.find('.swiper-pagination-custom'),
                        nextButton: selector.find('.swiper-button-next'),
                        prevButton: selector.find('.swiper-button-prev'),
                    },

                    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
                wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
                var swiperThumbs = new Swiper(selector, optionsThumbs);
                swiper.params.control = swiperThumbs;
                swiperThumbs.params.control = swiper;
            }

        }

        thumbnails(self.next('.swiper-thumbnails'));
    });
    var planesSwiper = new Swiper(".planSwiper", {
        slidesPerView: 3,
        spaceBetween: 5,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    /**
     * Header
     */

    var header_main = $('header'),
        toggle_search = $('.search-btn'),
        close_search = $('.searchbar__close'),
        toggleMenu = $('.header-menu__toggle'),
        headerMenu = $('.header-01__menu');

    toggle_search.on('click', function() {
        header_main.toggleClass("search-active");
    });

    close_search.on('click', function() {
        header_main.removeClass("search-active");
    });

    $(document).on('click', function() {
        $('.page-wrap').removeClass('active');
    });

    $('.searchbar__close').on('click', function(e) {
        e.stopPropagation();
    });

    $(window).on('load resize', function() {
        var hHeader = $('header').height();

        if (header_main.hasClass('header-fixheight')) {

            if ($('.md-content').children('.fix-header').length == 0) {
                $('.md-content').prepend('<div class="fix-header" style="height:' + hHeader + 'px"></div>')
            } else {
                $('.fix-header').css('height', hHeader);
            }
        }
    }).trigger('resize');

    $('.raising-nav').dropdownMenu({
        menuClass: 'raising-menu',
        breakpoint: 1200,
        toggleClass: 'active',
        classButtonToggle: 'navbar-toggle',
        subMenu: {
            class: 'sub-menu',
            parentClass: 'menu-item-has-children',
            toggleClass: 'active'
        }
    });


    $('.navbar-toggle').on('click', function() {
        $('.raising-menu').toggleClass('active');
        $('.page-wrap').toggleClass('active');
    });

    function swiperBuilder(tagClass, slides, space) {
        return new Swiper(tagClass, {
            slidesPerView: slides,
            spaceBetween: space,
            pagination: {

                clickable: false,
            },
        });
    }

    $(window).on('resize', function() {
        var ww = $(window).width();
        $("div.swiper-pagination").css('display', 'contents');
        if (ww < 375) {
            var swiper = swiperBuilder(".mySwiper", 1, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 1, 5);
            $("div.swiper-pagination").css('display', 'none');
        } else
        if (ww < 420) {
            var swiper = swiperBuilder(".mySwiper", 2, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 1, 5);
            $("div.swiper-pagination").css('display', 'none');
        } else
        if (ww < 640) {
            var swiper = swiperBuilder(".mySwiper", 2, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 1, 5);
            $("div.swiper-pagination").css('display', 'none');
        } else
        if (ww < 766) {
            var swiper = swiperBuilder(".mySwiper", 3, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 1, 5);
            $("div.swiper-pagination").css('display', 'none');
        } else
        if (ww < 992) {
            var swiper = swiperBuilder(".mySwiper", 4, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 1, 5);
            $("div.swiper-pagination").css('display', 'none');
        } else
        if (ww < 1130) {
            var swiper = swiperBuilder(".mySwiper", 4, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 2, 5);
        } else {
            var swiper = swiperBuilder(".mySwiper", 4, 5, );
            var planesSwiper = new swiperBuilder(".planSwiper", 3, 5);

            // $("div.swiper-container").removeClass("swiper-container-vertical").addClass("swiper-container-horizontal")
            $('.page-wrap').removeClass('active');
        }
    }).trigger('resize');

    var header_height = header_main.height();

    $('.raising-nav').onePageNav({
        currentClass: 'current',
        scrollOffset: header_height
    });
    /**
     * Gallery
     */
    $('.gallery-wrap').each(function() {
        var gallery = $(this);
        if (gallery.length) {
            if (gallery.hasClass('gallery-album') == false) {
                gallery.magnificPopup({
                    type: 'image',
                    delegate: 'a',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    callbacks: {
                        beforeOpen: function() {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    image: {
                        verticalFit: true
                    },

                });
            } else {
                gallery.magnificPopup({
                    gallery: {
                        enabled: true,
                        preload: [0, 1]
                    },
                    delegate: 'a',
                    type: 'image',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function() {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        },
                        buildControls: function() {
                            // re-appends controls inside the main container
                            this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                        }
                    },
                    image: {
                        verticalFit: true,
                    },
                    closeOnContentClick: false,
                    showCloseBtn: false,
                    midClick: false, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                });
            }
        }
    })


})(jQuery);