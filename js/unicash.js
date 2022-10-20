jQuery(document).ready(function($) {

	// Yandex.Metrika
	$('body').on('click', '#exchanger .step#result .form-group.btn button', function() {
		ym(61213498,'reachGoal','obmen');
	});

	if(window.preset_from && window.preset_to) {
		var preset_from = window.preset_from;
		var preset_to = window.preset_to;
		setTimeout(function(){
			$('#exchanger .step#from .currencies-list .items-list .item[data-name="' + preset_from + '"]').trigger('click');
		}, 1000);
		setTimeout(function(){
			$('#exchanger .step#to .currencies-list .items-list .item[data-name="' + preset_to + '"]').trigger('click');
		}, 2000);
	}

	$('.warning_message_text_ins').addClass('text');

	$('.call-modal').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$('#about .block .image').each(function() {
		var target = $(this).closest('.block').find('.content .common-heading');
		$(this).clone().insertAfter(target);
	});

	$('#menu-opener').click(function(){
		$(this).toggleClass('opened closed');
		$('#header #theme-switch,#header .menu,#header #languages,#header #accounting').fadeToggle(500);
	});

	$('form.ajax_post_form').wrap('<div class="form"></div>');

	$('.block_statusbid_title').wrapInner('<h1></h1>');

	$('.block_instruction_ins').addClass('text');
	$('.block_paybutton .cancel_paybutton').addClass('button').addClass('transparent');
	$('.block_paybutton .success_paybutton').addClass('button');

	$('#faq .question').click(function(){
		var index = $(this).data('index');
		var target = $('#faq .answers').find('#answer-' + index);
		$('#faq .question').removeClass('active');
		$(this).addClass('active');
		$('#faq .answer').removeClass('active');
		if( target.length ) {
			target.addClass('active');
			/*
			//if ($(window).width() < 768) {
				console.log(target.offset());
				$('html, body').animate({
		            scrollTop: target.offset().top - 30
		        }, 2000);
			//}*/
		}
		return false;
	});


	if( !Cookies.get('active_theme') ) {
		Cookies.set('active_theme', 'night', { expires: 7 });
	}
    var active_theme = Cookies.get('active_theme');

    $("#preloader-wrap").delay(1000).fadeOut(300);

    $('#theme-switch > div').click(function(){
        Cookies.set('active_theme', $(this).data('theme'), { expires: 7 });
        location.reload();
    });

	$('#languages a.active').click(function(e){
		e.preventDefault();
		$(this).siblings('a').fadeToggle(300);
		$(this).parent('#languages').toggleClass('opened closed');
	});

	if( active_theme == 'day' ) {
		var scroll_bar_theme = "os-theme-dark";
	} else {
		var scroll_bar_theme = "os-theme-light";

	}
	$('body, .currencies-list').overlayScrollbars({
		className: scroll_bar_theme,
		scrollbars : {
	        autoHide         : "leave"
	    },
	});

});