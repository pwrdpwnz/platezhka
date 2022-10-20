jQuery(function($){
 	$('.ajax_post_form').ajaxForm({
		dataType: 'json',
		beforeSubmit: function(a,f,o) {
			f.addClass('thisactive');
			$('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',true);
			$('.thisactive').find('.ajax_submit_ind').show();
		},
		error: function(res, res2, res3) {
					console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
			},
		success: function(res) {
					
			if(res['status'] == 'error'){
				if(res['status_text']){
					$('.thisactive .resultgo').html('<div class="resultfalse"><div class="resultclose"></div>'+res['status_text']+'</div>');
				}
			}			
			if(res['status'] == 'success'){
				if(res['status_text']){
					$('.thisactive .resultgo').html('<div class="resulttrue"><div class="resultclose"></div>'+res['status_text']+'</div>');
				}
			}
			
			if(res['clear']){
				$('.thisactive input[type=text]:not(.notclear), .thisactive input[type=password]:not(.notclear), .thisactive textarea:not(.notclear)').val('');
			}

			if(res['show_hidden']){
				$('.thisactive .hidden_line').show();
			}			
					
			if(res['url']){
				window.location.href = res['url']; 
			}
						
					if(res['ncapt1']){
			$('.captcha1').attr('src',res['ncapt1']);
		}
		if(res['ncapt2']){
			$('.captcha2').attr('src',res['ncapt2']);
		}
		if(res['nsymb']){
			$('.captcha_sym').html(res['nsymb']);
		}	
						
			$('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',false);
			$('.thisactive').find('.ajax_submit_ind').hide();
			$('.thisactive').removeClass('thisactive');	
		}
	});	
	
	if(window.parent.frames.length > 0){
		$('.not_frame').remove();
	} 
	
	});		
  jQuery(function($){

  var showBaner = document.cookie.match(/showBaner=(.+?);/);
  if ( showBaner == undefined && showBaner == null ) {
    var src=$('#src-baner').val();
    if (src.length > 0) {

    $.magnificPopup.open({
    items: {
    src: src
    },
    type: 'image',
    callbacks: {
    close: function() {
    document.cookie = "showBaner=1; max-age=1800";
    }
    }
    });
    }
  }


  function get_exchange_step1(id){

  var id1 = $('#select_give .item.active').attr("data-direction-id");
  var id2 = $('#select_get .item.active').attr("data-direction-id");

  $('.exch_ajax_wrap_abs').show();

  var param='id='+id+'&id1=' + id1 + '&id2=' + id2;
  $.ajax({
  type: "POST",
  url: "https://unicash.pro/premium_action-exchange_stepselect.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
  dataType: 'json',
  data: param,
  error: function(res, res2, res3){

    },
  success: function(res)
  {
//console.log(res);
  $('.exch_ajax_wrap_abs').hide();

  if(res['status'] == 'success'){
  $('#exch_html').html(res['html']);

  if($('#the_title_page').length > 0){
  $('#the_title_page, .direction_title').html(res['titlepage']);
  }

  $('title').html(res['title']);

  if($('meta[name=keywords]').length > 0){
  $('meta[name=keywords]').attr('content', res['keywords']);
  }
  if($('meta[name=description]').length > 0){
  $('meta[name=description]').attr('content', res['description']);
  }

  if(res['url']){
  window.history.replaceState(null, null, res['url']);
  }
  	$(document).JTimer();
	  } else {
  location.replace("https://unicash.pro/")
    }
  }
  });

  }


  function create_icons_redz(){

    $('.js_icon_left_redz').hide();
    $('.js_icon_left_redz:first').show();

    $('.js_item_left_redz').each(function(){
      var vtype = $(this).attr('data-type');

       $('.js_icon_left_redz_' + vtype).show();
    });

    $('.js_icon_right_redz').hide();
    $('.js_icon_right_redz:first').show();


    $('.js_item_right_redz').each(function(){

       var vtype = $(this).attr('data-type');
      $('.js_icon_right_' + vtype).show();
     });

    if($('.js_icon_right_redz.active:visible').length == 0){
      $('.js_item_right_redz').show();
      $('.js_icon_right_redz').removeClass('active');
      $('.js_icon_right_redz:first').addClass('active');
    }

  }
  create_icons_redz();

  $(document).on('click',".js_icon_left_redz",function () {
    if(!$(this).hasClass('active')){
      var vtype = $(this).attr('data-type');
      $(".js_icon_left_redz").removeClass('active');
      $(this).addClass('active');
      if(vtype == 0){
        $('.js_item_left_redz').show();
      } else {
         $('.js_item_left_redz').hide();
          $('.js_item_left_redz_'+vtype).show();
      }
      go_active_left_col_redz();
    }
    return false;
  });

  $(document).on('click',".js_icon_right_redz",function () {

  if(!$(this).hasClass('active')){
  var vtype = $(this).attr('data-type');
  $(".js_icon_right_redz").removeClass('active');
  $(this).addClass('active');

  if(vtype == 0){
  $('.js_item_right_redz').show();
  } else {


  $('.js_item_right_redz').hide();
  $('.js_item_right_redz_'+vtype).show();
  }
  }
  return false;
  });

  $(document).on('click',"#select_give .item",function(){
  //console.log(this);

  if(!$(this).hasClass('active')){
  $("#select_give .item").removeClass('active');
  $(this).addClass('active');
  get_exchange_step1(1);
  console.log('111');
  $('.currencies-list').overlayScrollbars({
      className: 'os-theme-dark',
      scrollbars : {
          autoHide         : "leave"
      },
  });
  }

  return false;
  });

  $(document).on('click',"#select_get .item",function(){
  //console.log(this);

  if(!$(this).hasClass('active')){
  $("#select_get .item").removeClass('active');
  $(this).addClass('active');
  get_exchange_step1(2);
  console.log('222');
  $('.currencies-list').overlayScrollbars({
      className: 'os-theme-dark',
      scrollbars : {
          autoHide         : "leave"
      },
  });
  }

  return false;
  });

  $(document).on('change', '#select_give', function(){
  get_exchange_step1(1);
  });
  $(document).on('change', '#select_get', function(){
  get_exchange_step1(2);
  });

  });
  jQuery(function($){ 
	
	var res_timer = 1;
	function start_res_timer(){
		$('.res_timer').html('0');
		
		if(res_timer == 1){
			res_timer = 0;
			setInterval(function(){ 
				if($('.res_timer').length > 0){
					var num_t = parseInt($('.res_timer').html());
					num_t = num_t + 1;
					$('.res_timer').html(num_t);
				}
			},1000);
		}
	}	
	
	$('#check_rule_step').on('change',function(){
		if($(this).prop('checked')){
			$('#check_rule_step_input').prop('disabled',false);
		} else {
			$('#check_rule_step_input').prop('disabled',true);
		}
	});

	$('#check_rule_step_input').on('click',function(){
		$(this).parents('.ajax_post_form').find('.resultgo').html('<div class="resulttrue">Идет обработка. Пожалуйста подождите (<span class="res_timer">0</span>)</div>');
		start_res_timer();
	});
	
	$('.iam_pay_bids').on('click', function(){
		if (!confirm("Вы уверены, что уже оплатили заявку?")){
			return false;
		}
	});		
			
});		
jQuery(function($){
	
	if($('.check_payment_hash').length > 0){
		var nowdata = 0;
		var redir = 0;
			
		function check_payment_now(){
			var second = parseInt($('.check_payment_hash').attr('data-time'));
		
			nowdata = parseInt(nowdata) + 1;

				$('.block_check_payment_abs').html(nowdata);
	$('.block_check_payment').show();
	var wid = $('.block_check_payment').width();
	if(wid > 1){
		var onepr = wid / second;
		var nwid = onepr * nowdata;
		if(nwid > wid){ nwid = wid; }
		$('.block_check_payment_ins').animate({'width': nwid},500);
	}
				
			if(nowdata >= second){
				if(redir == 0){
					var durl = $('.check_payment_hash').attr('data-hash');
					redir = 1;
					if(durl.length > 0){
						$('.exchange_status_abs').show();
						
						var param = 'hashed='+durl;
						$.ajax({
							type: "POST",
							url: "https://unicash.pro/premium_action-refresh_status_bids.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru&auto_check=1",
							dataType: 'json',
							data: param,
							error: function(res, res2, res3){
										console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
								},			
							success: function(res)
							{
								$('.exchange_status_abs').hide();
								if(res['html']){
									$('#exchange_status_html').html(res['html']);
										$(document).JTimer();
										redir = 0;
									nowdata = 0;
								} 
							}
						});	
					}					
				}
			}
		}
		setInterval(check_payment_now,1000);
	}
	
});		
	jQuery(function($){
		var clipboard = new ClipboardJS('.pn_copy');
		clipboard.on('success', function(e) {
			$('.pn_copy').removeClass('copied');
			$(e.trigger).addClass('copied');	
		});	
	});
		
	jQuery(function($){ 
		$(document).on('click', '.js_window_login', function(){
			$(document).JsWindow('show', {
				window_class: 'update_window',
				title: 'Авторизация',
				content: $('.loginform_box_html').html(),
				insert_div: '.loginform_box',
				shadow: 1
			});		
			
			var new_url = window.location.href;
			$('input[name=return_url]').val(new_url);
			
			return false;
		});	
	});	
		
	jQuery(function($){ 
		$(document).on('click', '.js_window_join', function(){
			$(document).JsWindow('show', {
				window_class: 'update_window',
				title: 'Регистрация',
				content: $('.registerform_box_html').html(),
				insert_div: '.registerform_box',
				shadow: 1
			});		
			
			var new_url = window.location.href;
			$('input[name=return_url]').val(new_url);
			
			return false;
		});	
	});	
		jQuery(function($){ 
		$(document).on('click', '.captcha_reload', function(){
			var thet = $(this);
			thet.addClass('act');
			var param ='have=reload';
			$.ajax({
				type: "POST",
				url: "https://unicash.pro/premium_action-captcha_reload.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
				dataType: 'json',
				data: param,
				error: function(res,res2,res3){
							console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
					},		
				success: function(res)
				{
					if(res['ncapt1']){
						$('.captcha1').attr('src',res['ncapt1']);
					}
					if(res['ncapt2']){
						$('.captcha2').attr('src',res['ncapt2']);
					}
					if(res['nsymb']){
						$('.captcha_sym').html(res['nsymb']);
					}			
					
					thet.removeClass('act');
				}
			});
			
			return false;
		});
	});	
		 
	jQuery(function($){ 
		
		$(document).on('click', '.js_hnotice_close', function(){
			var id = $(this).parents('.js_hnotice').attr('id').replace('hnotice_','');
			Cookies.set("hm"+id, 1, { expires: 1, path: '/' });
			
			$('#hnotice_' + id).hide();
		});

	});	
		
jQuery(function($){ 
    $(".promo_menu li a").on('click',function () {
        if(!$(this).hasClass('act')){
		    $(".pbcontainer, .promo_menu li").removeClass('act');
		    $(".pbcontainer").filter(this.hash).addClass('act');
		    $(this).parents('li').addClass('act');
        }
        return false;
    });
	
    $(".bannerboxlink a").on('click',function() {
        var text = $(this).text();
		var st = $(this).attr('show-title');
		var ht = $(this).attr('hide-title');
        if(text == st){
            $(this).html(ht);
        } else {
            $(this).html(st);
        }
        $(this).parents(".bannerboxone").find(".bannerboxtextarea").toggle();
	    $(this).toggleClass('act');

        return false;
    });
});	
	
jQuery(function($){
	
function create_icons(){
	$('.js_icon_left').hide();
	$('.js_icon_left:first').show();
	
	$('.js_item_left').each(function(){
		var vtype = $(this).attr('data-type');
		$('.js_icon_left_' + vtype).show();
	});	
	
	$('.js_icon_right').hide();
	$('.js_icon_right:first').show();	
		
	$('.js_line_tab.active .js_item_right, #xtt_right_col_html .js_item_right').each(function(){
		var vtype = $(this).attr('data-type');
		$('.js_icon_right_' + vtype).show();
	});	
	
	if($('.js_icon_right.active:visible').length == 0){
		$('.js_item_right').show();
		$('.js_icon_right').removeClass('active');
		$('.js_icon_right:first').addClass('active');
	}
}

function go_active_left_col(){
	if($('.xtt_html_abs').length > 0){
		if($('.js_item_left:visible.active').length == 0){
			$('.js_item_left').removeClass('active');
			$('.js_item_left:visible:first').addClass('active');
		}		
		var valid = $('.js_item_left.active').attr('data-id');
		 	
					$('.xtt_html_abs').show();
			var param ='id=' + valid;
			$.ajax({
				type: "POST",
				url: "https://unicash.pro/premium_action-table1_change.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
				dataType: 'json',
				data: param,
				error: function(res, res2, res3){
							console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
					},       
				success: function(res)
				{
					$('.xtt_html_abs').hide();
					if(res['status'] == 'success'){
						$('#xtt_right_col_html').html(res['html']);
					} 	
					create_icons();
				}
			});	
			}
}
	go_active_left_col();
	
    $(document).on('click',".js_item_left",function(){
        if(!$(this).hasClass('active')){
			$(".js_item_left").removeClass('active');
			$(this).addClass('active');
			go_active_left_col();
        }
        return false;
    });
	
    $(document).on('click',".js_icon_left",function () {
        if(!$(this).hasClass('active')){
			var vtype = $(this).attr('data-type');
			$(".js_icon_left").removeClass('active');
			$(this).addClass('active');
			if(vtype == 0){
				$('.js_item_left').show();
			} else {
				$('.js_item_left').hide();
				$('.js_item_left_'+vtype).show();
			}
			go_active_left_col();
        }
        return false;
    });
	
    $(document).on('click',".js_icon_right",function () {
        if(!$(this).hasClass('active')){
			var vtype = $(this).attr('data-type');
			$(".js_icon_right").removeClass('active');
			$(this).addClass('active');
			if(vtype == 0){
				$('.js_item_right').show();
			} else {
				$('.js_item_right').hide();
				$('.js_item_right_'+vtype).show();
			}
        }
        return false;
    });
});			
	
jQuery(function($){ 
	if($('#hexch_html').length > 0){
		$(document).on('click', '.js_exchange_link', function(){
			if(!$(this).hasClass('active')){
				
				var direction_id = $(this).attr('data-direction-id'); 
				
				$('.hexch_ajax_wrap_abs').show();
				
				var tscroll = $('#hexch_html').offset().top - 100;
				$('body,html').animate({scrollTop : tscroll}, 500);
				
				var param = 'direction_id=' + direction_id;
				$.ajax({
					type: "POST",
					url: "https://unicash.pro/premium_action-exchange_widget.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
					dataType: 'json',
					data: param,
					error: function(res, res2, res3){
								console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
						},					
					success: function(res)
					{
						if(res['html']){
							$('#hexch_html').html(res['html']);
						}
						if(res['status'] == 'error'){
							$('#hexch_html').html('<div class="resultfalse"><div class="resultclose"></div>'+res['status_text']+'</div>');
						}
							$(document).JTimer();
							$('.hexch_ajax_wrap_abs').hide();						
					}
				});	

			}
			
			return false;
		});
	}	
});
	
jQuery(function($){
	
	function checknumbr(mixed_var) {
		return ( mixed_var == '' ) ? false : !isNaN( mixed_var );
	}	
	$(document).on('change', 'input', function(){
		$(this).parents('.js_wrap_error').removeClass('error');
	});
	$(document).on('click', 'input', function(){
		$(this).parents('.js_wrap_error').removeClass('error');
	});	
	
	$(document).on('click', '.js_amount', function(){
		var amount = $(this).html();
		var id = $(this).attr('data-id');
		$('input.js_'+id).val(amount).trigger('change');
		$('.js_'+id + '_html').html(amount);
	});	
	
	function cache_exchange_data(thet){
		var ind = 1;
		if(thet.hasClass('check_cache')){
			var not_check_data = Cookies.get('not_check_data');
			if(not_check_data == 1){
				ind = 0;
			}	
		} 
		if(ind == 1){
			var id = thet.attr('cash-id');
			var v = thet.val();
			Cookies.set("cache_"+id, v, { expires: 7, path: '/' });	
		}
	}
	
	$(document).on('change', '.cache_data', function(){
		cache_exchange_data($(this));
	});
	$(document).on('keyup', '.cache_data', function(){
		cache_exchange_data($(this));
	});	
	
	$(document).on('change', '#not_check_data', function(){
		if($(this).prop('checked')){
			Cookies.set("not_check_data", 1, { expires: 7, path: '/' });
			$('.check_cache').each(function(){
				var id = $(this).attr('cash-id');
				Cookies.remove("cache_"+id);
			});	
		} else {
			Cookies.set("not_check_data", 0, { expires: 7, path: '/' });
			$('.check_cache').each(function(){
				var id = $(this).attr('cash-id');
				var v = $(this).val();
				Cookies.set("cache_"+id, v, { expires: 7, path: '/' });
			});		
		}
	});
	
	$(document).on('click', '.ajax_post_bids input[type=submit]', function(){
		var count_window = $('.window_message').length;
		if(count_window > 0){
			
			$(document).JsWindow('show', {
				window_class: 'update_window',
				close_class: 'js_direction_window_close',
				title: 'Внимание!',
				content: $('.window_message').html(),
				shadow: 1,
				enable_button: 1,
				button_title: 'OK',
				button_class: 'js_window_close js_direction_window_close'
			});			
			
			return false;
		} 
	});
	
    $(document).on('click', '.js_direction_window_close', function(){
		$('.ajax_post_bids').submit();
    });	
	
	function add_error_field(id, text){
		$('.js_'+ id).parents('.js_wrap_error').addClass('error');
		if(text.length > 0){
			$('.js_'+ id +'_error').html(text);
		}
	}	
	function remove_error_field(id){
		$('.js_'+ id).parents('.js_wrap_error').removeClass('error');
	}	
	
	var res_timer = 1;
	function start_res_timer(){
		$('.res_timer').html('0');
		
		if(res_timer == 1){
			res_timer = 0;
			setInterval(function(){ 
				if($('.res_timer').length > 0){
					var num_t = parseInt($('.res_timer').html());
					num_t = num_t + 1;
					$('.res_timer').html(num_t);
				}
			},1000);
		}
	}
	
    $('.ajax_post_bids').ajaxForm({
        dataType:  'json',
		beforeSubmit: function(a,f,o) {
			f.addClass('thisactive');
			$('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',true);
			$('.ajax_post_bids_res').html('<div class="resulttrue">Идет обработка. Пожалуйста подождите (<span class="res_timer">0</span>)</div>');
			start_res_timer();
			        },
		error: function(res, res2, res3) {
			res_timer = 0;
					console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
			},		
        success: function(res) { 
			if(res['error_fields']){
				$.each(res['error_fields'], function(index, value){
					add_error_field(index, value);
				});					
			}			
			if(res['status'] && res['status'] == 'error'){
				$('.ajax_post_bids_res').html('<div class="resultfalse"><div class="resultclose"></div>'+res['status_text']+'</div>');
				if($('.js_wrap_error.error').length > 0){
					var ftop = $('.js_wrap_error.error:first').offset().top - 100;
					$('body,html').animate({scrollTop: ftop},500);
				}
			}
			if(res['status'] && res['status'] == 'success'){
				$('.ajax_post_bids_res').html('<div class="resulttrue"><div class="resultclose"></div>'+res['status_text']+' (<span class="res_timer">0</span>)</div>');
			}				
		
			if(res['url']){
				window.location.href = res['url']; 
			}
			
					if(res['ncapt1']){
			$('.captcha1').attr('src',res['ncapt1']);
		}
		if(res['ncapt2']){
			$('.captcha2').attr('src',res['ncapt2']);
		}
		if(res['nsymb']){
			$('.captcha_sym').html(res['nsymb']);
		}	
			
		    $('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',false);
			$('.thisactive').removeClass('thisactive');
        }
    });	
	
	function calc_set_value(the_obj, the_num){
		$(the_obj).val(the_num);	}
	
	function calc_set_html(the_obj, the_num){
		$(the_obj).html(the_num);	}	
	
	function go_exchange_calc(sum, dej){
		
		var id = $('.js_direction_id:first').val();
		var param = 'id='+id+'&sum='+sum+'&dej='+dej;
		
		$('.exch_ajax_wrap_abs, .hexch_ajax_wrap_abs, .js_loader').show();
		
        $.ajax({
            type: "POST",
            url: "https://unicash.pro/premium_action-exchange_calculator.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
            data: param,
	        dataType: 'json',
 			error: function(res, res2, res3){
						console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
				},           
			success: function(res){ 

//REDZ
      calc_set_html('#step-chage-inde1 .price', res['sum1']);
      calc_set_html('#step-chage-inde2 .price', res['sum2']);
//REDZ - END
        if(dej !== 1){
					calc_set_value('input.js_sum1', res['sum1']);
					calc_set_html('.js_sum1_html', res['sum1']);
					Cookies.set("cache_sum", res['sum1'], { expires: 7, path: '/' });
				}
				if(dej !== 2){
					calc_set_value('input.js_sum2', res['sum2']);
					calc_set_html('.js_sum2_html', res['sum2']);					
				}
				if(dej !== 3){
					calc_set_value('input.js_sum1c', res['sum1c']);
					calc_set_html('.js_sum1c_html', res['sum1c']);					
				}
				if(dej !== 4){
					calc_set_value('input.js_sum2c', res['sum2c']);
					calc_set_html('.js_sum2c_html', res['sum2c']);					
				}								
				
				$('.js_comis_text1').html(res['comis_text1']);
				$('.js_comis_text2').html(res['comis_text2']);				
				
				remove_error_field('sum1');
				remove_error_field('sum2');
				remove_error_field('sum1c');
				remove_error_field('sum2c');
				
				if(res['error_fields']){
					$.each(res['error_fields'], function(index, value){
						add_error_field(index, value);
					});					
				}				
				
				if(res['curs_html'] && res['curs_html'].length > 0){
					$('.js_curs_html').html(res['curs_html']);
					$('input.js_curs_html').val(res['curs_html']);
				}			
				if(res['reserv_html'] && res['reserv_html'].length > 0){
					$('.js_reserv_html').html(res['reserv_html']);
					$('input.js_reserv_html').val(res['reserv_html']);
				}
				if(res['user_discount'] && res['user_discount'].length > 0){
					$('.js_direction_user_discount').html(res['user_discount']);
					$('input.js_direction_user_discount').html(res['user_discount']);
				}	
				if(res['viv_com1'] && res['viv_com1'] == 1){
					$('.js_viv_com1').show();
				} else {
					$('.js_viv_com1').hide();
				}
				if(res['viv_com2'] && res['viv_com2'] == 1){
					$('.js_viv_com2').show();
				} else {
					$('.js_viv_com2').hide();
				}			

				if($('.verifybysum').length > 0){
	if(res['sum1']){
		var verifybysum = $('.verifybysum').val().replace(/,/g,'.');
		verifybysum = verifybysum * 1;
		var res_sum1 = res['sum1'] * 1;
		if (checknumbr(verifybysum)){
			if(res_sum1 >= verifybysum){
				$('.verifybysum_wrap').show();
				add_error_field('sum1', 'пройдите верификацию личности');
				add_error_field('sum2', 'пройдите верификацию личности');
				add_error_field('sum1c', 'пройдите верификацию личности');
				add_error_field('sum2c', 'пройдите верификацию личности');
			} else {
				$('.verifybysum_wrap').hide();				
			}
		}
	}
}
				
				$('.exch_ajax_wrap_abs, .hexch_ajax_wrap_abs, .js_loader').hide();
            }
		});	
	}
	
		var gp = 0;
		var go_int = 0;
		var field_id = '';
		var old_field_id = '';
		var now_sum = 0;
		var old_sum = 0;
		var up_form = 0;
		var start_ex_timer = 1;
		
		function clear_ind(){
			gp=0;
		}
		
		function start_exchange_timer(){
			if(start_ex_timer == 1){
				start_ex_timer = 0;
				
				setInterval(function(){
					if(go_int == 1 && gp == 0){
						go_int = 0;
						if(now_sum !== old_sum || field_id != old_field_id || up_form == 1){ 
							old_sum = now_sum;
							old_field_id = field_id;
							go_exchange_calc(now_sum, field_id);
						}
					}	
				}, 500);
			}
		}

		function go_calc(obj, f_id, req){
			var vale = obj.val().replace(/,/g,'.');
			if (checknumbr(vale)){
				
				obj.parents('.js_wrap_error').removeClass('error');
				
				if(f_id == 1){
					$('input.js_sum1:not(:focus)').val(vale);
					$('.js_sum1_html').html(vale);
				} else if(f_id == 2){
					$('input.js_sum2:not(:focus)').val(vale);
					$('.js_sum2_html').html(vale);					
				} else if(f_id == 3){
					$('input.js_sum1c:not(:focus)').val(vale);
					$('.js_sum1c_html').html(vale);
				} else if(f_id == 4){
					$('input.js_sum2c:not(:focus)').val(vale);
					$('.js_sum2c_html').html(vale);				
				}				
				
				field_id = f_id;
				now_sum = vale;
				up_form = req;
				go_int = 1;
				gp = 1;
				setTimeout(clear_ind, 1000);			
			} else {
				obj.parents('.js_wrap_error').addClass('error');
			}
			start_exchange_timer();
		}		
		
		$(document).on('keyup', '.js_sum1', function(){
			go_calc($(this),1,0);
		});
		$(document).on('change', '.js_sum1', function(){
			go_calc($(this),1,0);
		});
		$(document).on('keyup', '.js_sum2', function(){
			var thet = $(this);
			go_calc($(this),2,0);
		});
		$(document).on('change', '.js_sum2', function(){
			go_calc($(this),2,0);
		});
		$(document).on('keyup', '.js_sum1c', function(){
			go_calc($(this),3,0);
		});
		$(document).on('change', '.js_sum1c', function(){
			go_calc($(this),3,0);
		});
		$(document).on('keyup', '.js_sum2c', function(){
			go_calc($(this),4,0);
		});
		$(document).on('change', '.js_sum2c', function(){
			go_calc($(this),4,0);
		});			
	
	function set_input_decimal(obj){
		var dec = obj.attr('data-decimal');
		var sum = obj.val().replace(new RegExp(",",'g'),'.');
		var len_arr = sum.split('.');
		var len_data = len_arr[1];
		if(len_data !== undefined){
			var len = len_data.length;
			if(len > dec){
				var new_data = len_data.substr(0, dec);
				obj.val(len_arr[0]+'.'+new_data);
			}
		}			
	}
		
	$(document).on('keyup', '.js_decimal', function(){
		set_input_decimal($(this));
	});
	$(document).on('change', '.js_decimal', function(){
		set_input_decimal($(this));
	});	
	
	});	

  function get_exchange_step1_redz(id){

  //var id1 = $('#select_give').val();
  //var id2 = $('#select_get').val();
  var id1 = $('.js_item_right_redz.active').data('valsid1');
  var id2 = $('.js_item_right_redz.active').data('valsid2');
  //console.log(id2);

  $('.exch_ajax_wrap_abs').show();

  var param='id='+id+'&id1=' + id1 + '&id2=' + id2;
  $.ajax({
  type: "POST",
  url: "https://unicash.pro/premium_action-exchange_step1_redz.html?meth=post&yid=3d3fa1e057a0&ynd=0&lang=ru",
  dataType: 'json',
  data: param,
  error: function(res, res2, res3){
  		console.log('Текст ошибки, text1: ' + res2 + ',text2:' + res3);
		for (key in res) {
			console.log(key + ' = ' + res[key]);
		}
	  },
  success: function(res)
  {
  $('.exch_ajax_wrap_abs').hide();

  if(res['status'] == 'success'){
  $('#exch_html').html(res['html']);

  if($('#the_title_page').length > 0){
  $('#the_title_page, .direction_title').html(res['titlepage']);
  }

  $('title').html(res['title']);

  if($('meta[name=keywords]').length > 0){
  $('meta[name=keywords]').attr('content', res['keywords']);
  }
  if($('meta[name=description]').length > 0){
  $('meta[name=description]').attr('content', res['description']);
  }

  // if(res['url']){
  //   window.history.replaceState(null, null, res['url']);
  // }

  	$(document).JTimer();
	  } else {
  		if(res['status_text']){
			alert(res['status_text']);
		}
	  }
  }
  });

  }

  