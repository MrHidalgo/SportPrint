$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  // BREAKPOINT SETTINGS
  var bp = {
    mobileS: 375,
    mobile: 568,
    tablet: 768,
    desktop: 992,
    wide: 1336,
    hd: 1680
  }

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    updateHeaderActiveClass();
    initHeaderScroll();

    initPopups();
    initSliders();
    initScrollMonitor();
    initMasks();
    initLazyLoad();
    initValidations();
  }

  // this is a master function which should have all functionality
  pageReady();

  var sceneBasketball = document.getElementById('scene-basketball');
  var sceneVolleyball = document.getElementById('scene-volleyball');
  var sceneRugby = document.getElementById('scene-rugby');
  var sceneFootball = document.getElementById('scene-football')
  var sceneHockey = document.getElementById('scene-hockey')

  var parallaxBasketball = {}, parallaxVolleyball = {}, parallaxRugby = {}, parallaxFootball = {}, parallaxHockey = {};

  parallaxBasketball = new Parallax(sceneBasketball);
  parallaxVolleyball = new Parallax(sceneVolleyball);
  parallaxRugby = new Parallax(sceneRugby);
  parallaxFootball = new Parallax(sceneFootball);
  parallaxHockey = new Parallax(sceneHockey);

  // some plugins work best with onload triggers
  _window.on('load', function(){
    // your functions
  });




  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: true,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', 'a[href^="#section"]', function() { // section scroll
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
      });


  // SMOOTH SCROLL
  // ====================
  $(".menu").on("click", "a", function (e) {
    e.preventDefault();

    var id          = $(this).attr('href'),
      navHeight   = $(".header").outerHeight(),
      topHeightOffset;

    if ($(window).width() >= bp.tablet) {
      topHeightOffset = $(id).offset().top - navHeight
    } else {
      topHeightOffset = $(id).offset().top;
    }

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, 1000);
  });


  // LOGO: return to homepage
  // ====================
  _document.on('click', ".logo__img", function (e) {
    $('body, html').animate({
      scrollTop: 0
    }, 1000);
  });


  // BANNER FOG SCROLL
  _window.on('scroll', throttle(function(e){
    var fog = $('.banner__img-fog');
    var wScroll = _window.scrollTop();
    var power = 3;

    var transformVal = wScroll / power;
    fog.css({
      'transform': 'translate3d(0,-'+transformVal+'px,0)'
    });
  }, 10))


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  function initHeaderScroll(){
    _window.on('scroll', throttle(function(e) {
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var firstSection = _document.find('.page__content div:first-child()').height() - headerHeight;
      var visibleWhen = Math.round(_document.height() / _window.height()) >  2.5;

      if (visibleWhen){
        if ( vScroll > 0 ){
          header.addClass('is-fixed');
        } else {
          header.removeClass('is-fixed');
        }
        if ( vScroll > firstSection ){
          header.addClass('is-fixed-visible');
        } else {
          header.removeClass('is-fixed-visible');
        }
      }
    }, 10));
  }


  // HAMBURGER TOGGLER
  _document.on('click', '[js-hamburger]', function(){
    $('.menu__mobile').addClass('is-active');
    $(".menu__mobile .menu, .menu__mobile .menu__mobile-close").addClass('slideInLeft')
  });
  _document.on('click', '[js-menuClose]', function(){
    $('.menu__mobile').removeClass('is-active');
    $(".menu__mobile .menu, .menu__mobile .menu__mobile-close").removeClass('slideInLeft')
  });

  function closeMobileMenu(){
    $('[js-hamburger]').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');
  }


  // BANNER: change theme...
  // ====================
  _document.on("click", "[js-bannerBtn]", function(e) {
    var elem = $(e.target),
      elemAttr = $(e.target).attr("data-banner"),
      bannerImg = $(".banner__img");

    $("[js-bannerBtn]").removeClass("is-active");

    if(bannerImg.hasClass('is-active')) {
      bannerImg.removeClass("is-active fadeIn");
    }

    elem.addClass("is-active");

    $("[data-img='"+ elemAttr +"']").addClass("is-active fadeIn");
  });


  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }

  //////////
  // SLIDERS
  //////////

  function initSliders(){
    var slickNextArrow = '<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>';
    var slickPrevArrow = '<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>'

    // General purpose sliders
    $('[js-slider]').each(function(i, slider){
      var self = $(slider);

      // set data attributes on slick instance to control
      if (self && self !== undefined) {
        self.slick({
          autoplay: self.data('slick-autoplay') !== undefined ? true : false,
          dots: self.data('slick-dots') !== undefined ? true : false,
          arrows: self.data('slick-arrows') !== undefined ? true : false,
          prevArrow: slickNextArrow,
          nextArrow: slickPrevArrow,
          infinite: self.data('slick-infinite') !== undefined ? true : true,
          speed: 300,
          slidesToShow: 1,
          accessibility: false,
          adaptiveHeight: true,
          draggable: self.data('slick-no-controls') !== undefined ? false : true,
          swipe: self.data('slick-no-controls') !== undefined ? false : true,
          swipeToSlide: self.data('slick-no-controls') !== undefined ? false : true,
          touchMove: self.data('slick-no-controls') !== undefined ? false : true
        });
      }

    })

    // other individual sliders goes here
    $('.js-clientSlider').not('.slick-initialized').slick({
      dots: true,
      pauseOnDotsHover: true,
      prevArrow: false,
      nextArrow: false,
      speed: 550,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 8,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ],
      customPaging: function() {
        return '<div></div>';
      }
    })

    // SWIPER
    var swiperExample = new Swiper('.js-sliderExample', {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });

    var swiperReviews = new Swiper('.js-sliderReviews', {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });


    // REVIEW SLIDER: current index and main count
    // ====================
    var reviewCurrent = document.querySelector("[js-reviewCurrent]"),
      reviewMain = document.querySelector("[js-reviewMain]");

    reviewMain.innerHTML = (swiperReviews.slides.length);

    swiperReviews.on('slideChange', function() {
      reviewCurrent.innerHTML = swiperReviews.activeIndex + 1;
    });


    // EXAMPLE SLIDER: current index and main count
    // ====================
    var exampleCurrent = document.querySelector("[js-exampleCurrent]"),
      exampleMain = document.querySelector("[js-exampleMain]");

    // -2 because slider loop, and we remove duplicate
    exampleMain.innerHTML = swiperExample.slides.length - 2;

    swiperExample.on('slideChange', function() {
      exampleCurrent.innerHTML = swiperExample.realIndex + 1;
    });

  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'show',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('[js-popup-gallery]').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
  	});
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }

  // tooltip
  $('[data-toggle="tooltip"]').tooltip();


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }


  //////////
  // LAZY LOAD
  //////////
  function initLazyLoad(){
    _document.find('[js-lazy]').Lazy({
      threshold: 500,
      enableThrottle: true,
      throttle: 100,
      scrollDirection: 'vertical',
      effect: 'fadeIn',
      effectTime: 350,
      // visibleOnly: true,
      // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
      onError: function(element) {
          console.log('error loading ' + element.data('src'));
      },
      beforeLoad: function(element){
        // element.attr('style', '')
      }
    });
  }

  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var deferred = Barba.Utils.deferred();

      anime({
        targets: this.oldContainer,
        opacity : .5,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim){
          deferred.resolve();
        }
      })

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : .5
      });

      anime({
        targets: "html, body",
        scrollTop: 0,
        easing: easingSwing, // swing
        duration: 150
      });

      anime({
        targets: this.newContainer,
        opacity: 1,
        easing: easingSwing, // swing
        duration: 300,
        complete: function(anim) {
          triggerBody()
          _this.done();
        }
      });
    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };

  Barba.Prefetch.init();
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

    pageReady();
    closeMobileMenu();

  });

  // some plugins get bindings onNewPage only that way
  function triggerBody(){
    $(window).scroll();
    $(window).resize();
  }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  function initValidations(){
    var validateErrorPlacement = function(error, element) {
      error.addClass('ui-input__validation');
      error.appendTo(element.parent("div"));
    }
    var validateHighlight = function(element) {
      $(element).parent('div').addClass("has-error");
    }
    var validateUnhighlight = function(element) {
      $(element).parent('div').removeClass("has-error");
    }

    var validatePhone = {
      required: true,
      normalizer: function(value) {
          var PHONE_MASK = '+X (XXX) XXX-XXXX';
          if (!value || value === PHONE_MASK) {
              return value;
          } else {
              return value.replace(/[^\d]/g, '');
          }
      },
      minlength: 11,
      digits: true
    }


    $.validator.setDefaults({
      ignore: [],
      // any other default options and/or rules
    });

    /////////////////////
    // CB FORM
    ////////////////////
    $("[js-modal]").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: function(form) {
        $(form).addClass('loading');
        $.ajax({
          type: "POST",
          url: 'php/callback.php',
          data: $(form).serialize(),
          success: function(response) {
            $(form).removeClass('loading');
            var data = $.parseJSON(response);
            if (data.success == true) {
              // blank all values
              $(form).find('input').val('');
              // hide form
              // closeMfp();

              // paste sucess message
              $('#thanks').find('[data-message]').html(data.message);

              // show modal
              $.magnificPopup.open({
                items: {
                  src: '#thanks'
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'show',
              });

            } else {
              $(form).find('[data-message]').html(data.message);
            }
          }
        })

      },
      rules: {
        name: "required",
        agree: "required",
        email: {
          required: true,
          email: true
        },
        phone: validatePhone
      },
      messages: {
        name: "Заполните это поле",
        email: {
            required: "Заполните это поле",
            email: "Email содержит неправильный формат"
        },
        phone: {
          required: "Заполните это поле",
          minlength: "Введите не менее 11 символов",
          phone: "Введите корректный телефон"
        },
        agree: "Вы должны согласиться с условиями"
      }
    });
  }

});
