$(document).ready(function(){function e(){i(),t(),a(),s(),o(),l(),r(),c(),u()}function i(){svg4everybody(),window.viewportUnitsBuggyfill.init({force:!0,refreshDebounceWait:150,appendToBody:!0})}function a(){m.on("scroll",throttle(function(e){var i=m.scrollTop(),a=$(".header").not(".header--static"),n=a.height(),t=p.find(".page__content div:first-child()").height()-n;Math.round(p.height()/m.height())>2.5&&(i>0?a.addClass("is-fixed"):a.removeClass("is-fixed"),i>t?a.addClass("is-fixed-visible"):a.removeClass("is-fixed-visible"))},10))}function n(){$("[js-hamburger]").removeClass("is-active"),$(".mobile-navi").removeClass("is-active")}function t(){$(".header__menu li").each(function(e,i){$(i).find("a").attr("href")==window.location.pathname.split("/").pop()?$(i).addClass("is-active"):$(i).removeClass("is-active")})}function o(){function e(){var e=$(".reviews__row");if(m.width()<575){e.find(".swiper-slide-active");var i=0;i+=$(".reviews__row-center").outerHeight(),i+=$(".reviews__row-right").outerHeight(),e.css({height:i+30})}else e.css({height:590})}$("[js-slider]").each(function(e,i){var a=$(i);a&&void 0!==a&&a.slick({autoplay:void 0!==a.data("slick-autoplay"),dots:void 0!==a.data("slick-dots"),arrows:void 0!==a.data("slick-arrows"),prevArrow:'<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>',nextArrow:'<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>',infinite:(a.data("slick-infinite"),!0),speed:300,slidesToShow:1,accessibility:!1,adaptiveHeight:!0,draggable:void 0===a.data("slick-no-controls"),swipe:void 0===a.data("slick-no-controls"),swipeToSlide:void 0===a.data("slick-no-controls"),touchMove:void 0===a.data("slick-no-controls")})}),$(".js-clientSlider").not(".slick-initialized").slick({dots:!0,pauseOnDotsHover:!0,prevArrow:!1,nextArrow:!1,speed:550,infinite:!0,slidesToShow:8,slidesToScroll:8,responsive:[{breakpoint:1440,settings:{slidesToShow:6,slidesToScroll:6}},{breakpoint:1024,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:576,settings:{slidesToShow:2,slidesToScroll:2}}],customPaging:function(){return"<div></div>"}});new Swiper(".js-sliderExample",{slidesPerView:1,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0}});var i=new Swiper(".js-sliderReviews",{direction:"vertical",slidesPerView:1,spaceBetween:30,mousewheel:!1,pagination:{el:".swiper-pagination",clickable:!0},on:{init:function(){e()}}});m.on("resize",debounce(e,200));var a=document.querySelector("[js-reviewCurrent]");document.querySelector("[js-reviewMain]").innerHTML=i.slides.length,i.on("slideChange",function(){a.innerHTML=i.activeIndex+1})}function s(){var e=0;$("[js-popup]").magnificPopup({type:"inline",fixedContentPos:!0,fixedBgPos:!0,overflowY:"auto",closeBtnInside:!0,preloader:!1,midClick:!0,removalDelay:300,mainClass:"show",callbacks:{beforeOpen:function(){e=m.scrollTop()},close:function(){m.scrollTop(e)}}}),$("[js-popup-gallery]").magnificPopup({delegate:"a",type:"image",tLoading:"Загрузка #%curr%...",mainClass:"popup-buble",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{tError:'<a href="%url%">The image #%curr%</a> could not be loaded.'}})}function r(){$("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"}),$("input[type='tel']").mask("+7 (000) 000-0000",{placeholder:"+7 (___) ___-____"})}function l(){$(".wow").each(function(e,i){var a,n=scrollMonitor.create($(i));a=$(window).width()<768?0:$(i).data("animation-delay");var t=$(i).data("animation-class")||"wowFadeUp",o=$(i).data("animation-name")||"wowFade";n.enterViewport(throttle(function(){$(i).addClass(t),$(i).css({"animation-name":o,"animation-delay":a,visibility:"visible"})},100,{leading:!0}))})}function c(){p.find("[js-lazy]").Lazy({threshold:500,enableThrottle:!0,throttle:100,scrollDirection:"vertical",effect:"fadeIn",effectTime:350,onError:function(e){console.log("error loading "+e.data("src"))},beforeLoad:function(e){}})}function d(){$(window).scroll(),$(window).resize()}function u(){var e={required:!0,normalizer:function(e){return e&&"+X (XXX) XXX-XXXX"!==e?e.replace(/[^\d]/g,""):e},minlength:11,digits:!0};$.validator.setDefaults({ignore:[]}),$("[js-modal]").validate({errorPlacement:function(e,i){e.addClass("ui-input__validation"),e.appendTo(i.parent("div"))},highlight:function(e){$(e).parent("div").addClass("has-error")},unhighlight:function(e){$(e).parent("div").removeClass("has-error")},submitHandler:function(e){$(e).addClass("loading"),$.ajax({type:"POST",url:"php/callback.php",data:$(e).serialize(),success:function(i){$(e).removeClass("loading");var a=$.parseJSON(i);1==a.success?($(e).find("input").val(""),console.log(a.message),$("#thanks").find("[data-message]").html(a.message),$.magnificPopup.open({items:{src:"#thanks"},type:"inline",fixedContentPos:!0,fixedBgPos:!0,overflowY:"auto",closeBtnInside:!0,preloader:!1,midClick:!0,removalDelay:300,mainClass:"show"})):$(e).find("[data-message]").html(a.message)}})},rules:{name:"required",agree:"required",email:{required:!0,email:!0},phone:e},messages:{name:"Заполните это поле",email:{required:"Заполните это поле",email:"Email содержит неправильный формат"},phone:{required:"Заполните это поле",minlength:"Введите не менее 11 символов",phone:"Введите корректный телефон"},agree:"Вы должны согласиться с условиями"}})}var m=$(window),p=$(document),h={mobileS:375,mobile:568,tablet:768,desktop:992,wide:1336,hd:1680},f=[.02,.01,.47,1];e();var v=document.getElementById("scene-basketball"),g=document.getElementById("scene-volleyball"),w=document.getElementById("scene-rugby"),b=document.getElementById("scene-football"),y=document.getElementById("scene-hockey");new Parallax(v),new Parallax(g),new Parallax(w),new Parallax(b),new Parallax(y),m.on("load",function(){}),p.on("click",'[href="#"]',function(e){e.preventDefault()}).on("click",'a[href^="#section"]',function(){var e=$(this).attr("href");return $("body, html").animate({scrollTop:$(e).offset().top},1e3),!1}),$(".menu").on("click","a",function(e){e.preventDefault();var i,a=$(this).attr("href"),n=$(".header").outerHeight();i=$(window).width()>=h.tablet?$(a).offset().top-n:$(a).offset().top,$("body, html").animate({scrollTop:i},1e3)}),p.on("click",".logo__img",function(e){$("body, html").animate({scrollTop:0},1e3)}),m.on("scroll",throttle(function(e){var i=$(".banner__img-fog"),a=m.scrollTop()/3;i.css({transform:"translate3d(0,-"+a+"px,0)"})},10)),p.on("click","[js-hamburger]",function(){$(".menu__mobile").addClass("is-active"),$(".menu__mobile .menu, .menu__mobile .menu__mobile-close").addClass("slideInLeft")}),p.on("click","[js-menuClose]",function(){$(".menu__mobile").removeClass("is-active"),$(".menu__mobile .menu, .menu__mobile .menu__mobile-close").removeClass("slideInLeft")}),p.on("click","[js-bannerBtn]",function(e){var i=$(e.target),a=$(e.target).attr("data-banner"),n=$(".banner__img");$("[js-bannerBtn]").removeClass("is-active"),n.hasClass("is-active")&&n.removeClass("is-active fadeIn"),i.addClass("is-active"),$("[data-img='"+a+"']").addClass("is-active fadeIn")});var _=document.querySelectorAll("[inputfile-js]");Array.prototype.forEach.call(_,function(e){var i=e.nextElementSibling,a=i.innerHTML;e.addEventListener("change",function(e){var n="";(n=e.target.value.split("\\").pop())?i.querySelector("span").innerHTML=n:i.innerHTML=a})}),$("[zoom-img-js]").wrap('<span style="display:inline-block"></span>').css("display","block").parent().zoom({on:"mouseover",onZoomIn:function(){$(".example__img").hide()},onZoomOut:function(){$(".example__img").show()}}),p.one("focus.autoExpand",".ui-group textarea",function(){var e=this.value;this.value="",this.baseScrollHeight=this.scrollHeight,this.value=e}).on("input.autoExpand",".ui-group textarea",function(){var e,i=0|this.getAttribute("data-min-rows");this.rows=i,e=Math.ceil((this.scrollHeight-this.baseScrollHeight)/17),this.rows=i+e}),$('[data-toggle="tooltip"]').tooltip(),Barba.Pjax.Dom.containerClass="page";var k=Barba.BaseTransition.extend({start:function(){Promise.all([this.newContainerLoading,this.fadeOut()]).then(this.fadeIn.bind(this))},fadeOut:function(){var e=Barba.Utils.deferred();return anime({targets:this.oldContainer,opacity:.5,easing:f,duration:300,complete:function(i){e.resolve()}}),e.promise},fadeIn:function(){var e=this,i=$(this.newContainer);$(this.oldContainer).hide(),i.css({visibility:"visible",opacity:.5}),anime({targets:"html, body",scrollTop:0,easing:f,duration:150}),anime({targets:this.newContainer,opacity:1,easing:f,duration:300,complete:function(i){d(),e.done()}})}});Barba.Pjax.getTransition=function(){return k},Barba.Prefetch.init(),Barba.Pjax.start(),Barba.Dispatcher.on("newPageReady",function(i,a,t,o){e(),n()})});