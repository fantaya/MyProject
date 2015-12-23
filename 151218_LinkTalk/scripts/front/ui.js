(function($){
	$.fn.extend({
		pngFadeinOut:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			if( $.browser.msie && parseInt($.browser.version) < 9 ) {
				_this.each(function(){
					$(this).attr('width', $(this).outerWidth());
					$(this).attr('height', $(this).outerHeight());
					$(this).css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='"+$(this).attr('src')+"')");
					$(this).attr('src', '/kr/images/common/transparent.gif');
				});
			}
		},
		layerSelect:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.each(function() {
				var _this = $(this),
					targetobj = _this.find('>.select-layer'),
					showList = _this.find('>ul');
				showList.hide();
				showList.css({top:-(showList.outerHeight(true)-1)})
				targetobj.bind({
					'click':function() {
						showList.toggle();
						//$(document).click(function() {showList.hide();})
					}
				})
						
			})	
		},
		autoListsize:function() {
			var _this = $(this),	
				$targetObj = _this.find('li'),
				targetObjlength = $targetObj.length,
				autoHeight = _this.height() / targetObjlength;
			autoHeight = autoHeight+""
			autoHeight = eval(autoHeight.split('.')[0])
			$targetObj.css('height',autoHeight)
		},
		bwRevt:function(opt){
			var _t=$(this),a={a:function(){return $(window).height()},s:700,e:900},GIO=function(a,b,c,d,i){var p=d-c,t=b-a,r=p/t+"",y,t,x;x=(r.indexOf('.')!=-1)?x=eval(r.substr(0,r.indexOf('.')+5)):eval(r);y=(a+i/x)+"";t=(y.indexOf('.')!= -1)?y.substr(0,y.indexOf('.')):t=y;return eval(t)},m=function(tval){switch(opt.c){case'top':_t.css('top',tval);case'height':_t.css('height',tval);break;case'paddingTop':_t.css('paddingTop',tval);break;case'paddingBottom':_t.css('paddingBottom',tval);break}},v=GIO(opt.a,opt.b,a.s,a.e, a.a()-a.s);if(a.a()>a.s&&a.a()<a.e) m(v);else if(a.a()<a.s) m(opt.a);else if(a.a()>a.e) m(opt.b);
			if (!_t.get(0)){return false}
		},
		MenuList:function(){
			var _this = $(this),
				_wrap = _this.find('ul'),
				itemsWrap = _this.find('li'),
				items = _this.find('li div');
			if (!_this.get(0)){return false}
			$.each(itemsWrap,function(index) {
				$(this).attr('num',index+1)
			})
			items.bind({
				'click':function(){
					var item = $(this),
						hideItem = _wrap.find('.fn-on');
					hideItem.removeClass('fn-on');
					item.parent().addClass('fn-on')
					$('#main-header-wrap').attr('num',$(this).parent().attr('num'));
					$('#main-header-wrap').find('.v-on').removeClass('v-on');
					$('#mainvisual-motion').mainmotion();
					return false;
				}
			})

		},
		mainscrollMove:function() {
			var _this = $(this),
				target = _this.find('.go');
			if (!_this.get(0)){return false}
			target.click(function() {
				var movepoint = $('#main-container').offset().top;
				$('html, body').animate({scrollTop:movepoint},600);
				return false;
			})
		},
		screenModify:function(){
			function a(){
				$('#main-header-wrap').bwRevt({a:620,b:840,c:'height'})
				$('.motion-copy-wrap').bwRevt({a:75,b:205,c:'height'})
				$('.motion-car-wrap').bwRevt({a:414,b:467,c:'height'})
				$('.motioncar-list-wrap').bwRevt({a:396,b:485,c:'top'})
				$('.motioncar-list-wrap').bwRevt({a:224,b:355,c:'height'})
				$('.motioncar-list-wrap').MenuList();
				$('.motioncar-list').bwRevt({a:224,b:355,c:'height'})
				$('.motioncar-list').autoListsize();
			}a();
			$(window).resize(function(){a()})
		},
		mainmotion:function() {
			var _this = $(this),
				targetBody = _this.find('.mainvisual-motion-inner >div'),
				target = _this.find('.motion-copy-wrap img'),
				target2 = _this.find('.motion-car-wrap img');
				target3 = _this.find('.motion-icon-wrap');
			target.hide();
			target2.hide();
			target3.hide();
			targetBody.eq(_this.parent().attr('num')-1).addClass('v-on');
			_this.parent().addClass('motion-cont-1')
			$.each(targetBody,function(index) {
				$(this).attr('id','motion-cont-'+(index+1));
				if ($(this).is('.v-on')) {
					_this.parent().removeAttr('class');
					_this.parent().addClass($(this).attr('id'));
				}
			})
			target.animate({marginLeft:17},10).fadeIn(800,'easeInExpo');
			target2.animate({marginRight:0},1000).fadeIn(800,'easeInExpo',function() {
				target3.show();
			})
		},
		listcutter:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.each(function (opt) {
				var _this = $(this),
					_$this = _this.find('ul'),
					_$thisItem = _$this.find('>li'),
					_$next = _this.prev().find('.nextbutton'),
					_$prev = _this.prev().find('.prevbutton'),
					_$thisItemLength = _$thisItem.length,
					_itemWidth = _$thisItem.css('float') == 'left' ? _$thisItem.outerWidth(true) : _$thisItem.outerHeight(true),
					_thisClassname = _$this.attr('class'),
					_thisClassname2 = _$thisItem.css('float') == 'left' ? _thisClassname.replace('col','') : _thisClassname.replace('row',''),
					_bodyWidth = _itemWidth*_$thisItemLength,
					checkDistance = _this.width() - _bodyWidth,
					_thisWidth = _$thisItem.css('float') == 'left' ? _this.outerWidth(true) : _this.outerHeight(true),
					_$thisWidth = _$thisItem.css('float') == 'left' ? _$this.outerWidth(true) : _$this.outerHeight(true);
				if(_$thisItem.css('float') == 'left') {_$this.css({width:_bodyWidth})}
				if(_$thisItem.css('float') == 'left') {_$thisItem.last().css({background:'none'})}
				var returnNumber = parseFloat(_thisClassname2);
				var moveDistance = _itemWidth;
				var speed = 500;
				//var speed = _$thisItem.css('float') == 'left' ? 500 : 800;
				var currentnum = 0;
				if ( currentnum == 0 && _$thisItem.css('float') != 'left' ) {_$prev.addClass('disabled').attr('disabled','disabled')};
				if ( currentnum == 0 ) {_$prev.addClass('disabled')};
				if (_thisWidth >= _bodyWidth) {
					_$next.addClass('disabled').attr('disabled','disabled')
					_$prev.addClass('disabled').attr('disabled','disabled')
				} else if (_thisWidth >= _bodyWidth && _$thisItem.css('float') == 'left') {
					_$next.addClass('disabled')
					_$prev.addClass('disabled')
				}
				if (_thisWidth >= _bodyWidth && _$thisItem.css('float') == 'left') {
					_this.css({width:_bodyWidth})
					_this.find('>div').css({width:_bodyWidth})
				}

				var nextSlide = function() {
					currentnum +=returnNumber;
					_$this.animate({marginTop:-(moveDistance*currentnum)},speed);
					if (currentnum <= _$thisItemLength-returnNumber || currentnum >= _$thisItemLength-returnNumber) {_$next.addClass('disabled').attr('disabled','disabled');}
					if (currentnum == returnNumber) {if (_$prev.is('.disabled')) {_$prev.removeClass('disabled').removeAttr('disabled');}}
				}
				var prevSlide = function() {
					currentnum -=returnNumber
					_$this.animate({marginTop:-moveDistance*currentnum},speed);
					if (currentnum < returnNumber) {_$prev.addClass('disabled').attr('disabled','disabled');}
					if (currentnum != _$thisItemLength) {if (_$next.is('.disabled')) {_$next.removeClass('disabled').removeAttr('disabled');}}
				}
				var nextSlide2 = function() {
					currentnum +=returnNumber;
					_$this.animate({marginLeft:-(moveDistance*currentnum)},speed);
					if (-(moveDistance*currentnum) == checkDistance || -(moveDistance*currentnum) < checkDistance) {_$next.addClass('disabled');}
					if (currentnum == returnNumber) {if (_$prev.is('.disabled')) {_$prev.removeClass('disabled');}}
				}
				var prevSlide2 = function() {
					currentnum -=returnNumber;
					_$this.animate({marginLeft:-moveDistance*currentnum},speed);
					if (currentnum < returnNumber) {_$prev.addClass('disabled');}
					if (currentnum != _$thisItemLength) {if (_$next.is('.disabled')) {_$next.removeClass('disabled');}}
				}
				if (_$thisItem.css('float') == 'left') {
					_$next.click(function() {nextSlide2();})
					_$prev.click(function() {prevSlide2();})
				} else {
					_$next.click(function() {nextSlide();})
					_$prev.click(function() {prevSlide();})
				}

				_this.touchwipe({
					wipeUp: function(){
						if(!_$prev.is('.disabled')){
							_$prev.trigger('click')	
						}
					},
					wipeDown: function(){
						if(!_$next.is('.disabled')){
							_$next.trigger('click')
						}
					},
					wipeLeft: function(){
						if(!_$prev.is('.disabled') && _$thisItem.css('float') == 'left'){
							_$prev.trigger('click')	
						}
					},
					wipeRight: function(){
						if(!_$next.is('.disabled') && _$thisItem.css('float') == 'left'){
							_$next.trigger('click')
						}
					},
					min_move_x: 20,
					min_move_y: 20,
					preventDefaultEvents: true
				});

			})
		},
		mainNewsControl:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			var target = _this.find('a'),
				obj = _this.parent().find('.news-thumb');
			$.each(target,function(index) {$(this).attr('href','#news-thumb-target-'+(index+1));});
			$.each(obj,function(index) {$(this).attr('id','news-thumb-target-'+(index+1));});
			obj.hide();
			target.bind({
				'click':function() {
					if ($(this).parent().attr('class') != 'on')	{
						var targetobj = _this.parent().find($(this).attr('href'));
						var hideparent = _this.find('.on');
						var hideobj = _this.parent().find('.view');
						hideparent.removeClass('on');
						hideobj.removeClass('view').hide();
						$(this).parent().addClass('on');
						targetobj.fadeIn().addClass('view');
						return false;
					} else {
						return false;
					}
				}
			})
			target.eq(0).parent().addClass('on');
			obj.eq(0).show().addClass('view');
		},
		subpageControl:function() {
			var _this = $(this),
				targetVisual = _this.find('.depth-visual'),
				targetNavi = _this.find('#subnavigation-wrap'),
				targetButton = _this.find('.snb-control'),
				ButtonSrc = targetButton.find('>img'),
				actionPoint = targetNavi.offset(),
				activeNavi = _this.find('.subnavigation-inner'),
				runpoint;
			if (!_this.get(0)){return false};
			if (targetNavi.is(':visible')) {
				$(window).scroll(function() {
					if ($(window).scrollTop() >= actionPoint.top) {
						if (!runpoint) {
							_this.parent().addClass('fixed');
							ButtonSrc.attr('src',ButtonSrc.attr('src').replace('_up','_down'));
							runpoint = 1;
						}
					} else {
						if (runpoint) {
							_this.parent().removeClass('fixed');
							ButtonSrc.attr('src',ButtonSrc.attr('src').replace('_down','_up'));
							runpoint = 0;
						}
					}
				})
			}
			targetButton.click(function() {
				var imgSrc = $(this).find('>img').attr('src');
				$(this).find('>img').attr('src',/_up/.test(imgSrc) ? imgSrc.replace('_up','_down') : imgSrc.replace('_down','_up'))
				if ($(window).scrollTop() >= actionPoint.top) {
					$('html,body').animate({scrollTop:0},400)
				} else {
					$('html,body').animate({scrollTop:actionPoint.top},400)
				}
				return false
			})
		},
		snsControl:function() {
			var _this = $(this),
				targetbox = _this.find('>div'),
				tooltip = _this.find('.null-msg');
			if (!_this.get(0)){return false}
			$.each(tooltip,function() {
				var tooltipwidth = $(this).outerWidth(true);
				$(this).css({marginLeft:-(tooltipwidth/2)})		
			})
			$.each(targetbox,function() {
				if($(this).is('.null-sns')) {
					$(this).mouseenter(function() {
						$(this).find('.null-msg').show()
					}).mouseleave(function() {
						$(this).find('.null-msg').hide()
					})
				}
			})
		},
		surveyControl:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.find('>div').first().css({paddingTop:47})
			_this.find('>div').last().css({paddingBottom:30})
			_this.find('>div:even').addClass('odd');
		},
		eventBannerControl:function() {
			var _this = $(this),
				cont = _this.find('.spot-cont'),
				contLength = cont.length,
				circleWrap = $('<div class="circle-wrap"></div>'),
				cnt = 0,
				bannerInt,
				bannerInterval = 3000;
			if (!_this.get(0)){return false}
				cont.hide();
				circleWrap.appendTo(_this);
				_this.attr('num',cnt);
			$.each(cont,function(index) {
				$(this).css({zIndex:contLength-index});
				$(this).attr('id','spot-cont-'+index);
				$('<a href="#'+'spot-cont-'+index+'" class="circle"></a>').appendTo(circleWrap);
			})
			var contBtn = _this.find('.circle');
			var bannerControl = function() {
				cnt ++;
				_this.attr('num',cnt);
				var hideCont = _this.find('.show-banner');
				var hideCircle = _this.find('.circle-on');
				hideCont.fadeOut().removeClass('show-banner');
				hideCircle.removeClass('circle-on');
				contBtn.eq(cnt).addClass('circle-on');
				
				if (cnt == contLength) {
					if (_this.attr('num') == contLength) {
						cnt = 0;
						_this.attr('num',cnt);
						contBtn.eq(cnt).addClass('circle-on');
						$('#'+contBtn.eq(cnt).attr('href').split('#')[1]).addClass('show-banner').fadeIn(2000);
					}
				}
				$('#'+contBtn.eq(cnt).attr('href').split('#')[1]).addClass('show-banner').fadeIn(2000);
				bannerControlTime();
			}
			var bannerControlTime = function() {
				clearTimeout(bannerInt);
				bannerInt = setTimeout(function() {bannerControl();},bannerInterval);
			}
			$.each(contBtn,function(index) {
				$(this).click(function() {
					if (!$(this).is('.circle-on')) {
						var hideCont = _this.find('.show-banner');
						var hideCircle = _this.find('.circle-on');
						hideCont.hide().removeClass('show-banner');
						hideCircle.removeClass('circle-on');
						$(this).addClass('circle-on');
						$($(this).attr('href')).addClass('show-banner').fadeIn(2000);
						var overnum = $(this).index();
						cnt = overnum;
						_this.attr('num',overnum);
						return false;
					}	
				})
			})
			_this.mouseenter(function() {
				clearTimeout(bannerInt);
			}).mouseleave(function() {
				bannerControlTime();
			})
			bannerControlTime();
			cont.eq(0).show().addClass('show-banner');
			contBtn.eq(0).addClass('circle-on');
		},
		dimmedFrame:function() {
			var _this = $(this),
				prependFrame = $('<div class="dimmed-frame"></div>');
			if (!_this.get(0)){return false}
			prependFrame.css({height:$('#wrap').outerHeight(true),opacity:0.5})
			prependFrame.prependTo(_this);
		},
		layerpopupControl:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.click(function() {
				$('body').dimmedFrame();
				$($(this).attr('href')).css({top:$(window).scrollTop()+250}).show();	
				return false;
			})
		},
		layerpopupClose:function() {
			var _this = $(this),
				closeBtn = _this.find('.close');
			if (!_this.get(0)){return false}
			closeBtn.click(function() {
				$('.dimmed-frame').remove();
				_this.hide();	
			})
		},
		estimationControl:function() {
			var _this = $(this),
				target = _this.find('.step-wrap'),
				targetCont = target.find('.step-cont'),
				targetNext = target.find('.btn-next'),
				targetPrev = target.find('.btn-prev');
				targetCont.hide();
				target.first().addClass('step-on');
				target.first().find('>.step-cont').show();
			if (!_this.get(0)){return false}
			targetNext.click(function() {
				var hidecont = _this.find('.step-on'),
					hidecont2 = hidecont.find('>.step-cont');
				hidecont2.hide();
				hidecont.removeClass('step-on');
				$(this).parent().next().addClass('step-on');
				$(this).parent().next().find('>.step-cont').show();
			});
			targetPrev.click(function() {
				var hidecont = _this.find('.step-on'),
					hidecont2 = hidecont.find('>.step-cont');
				hidecont2.hide();
				hidecont.removeClass('step-on');
				$(this).parent().prev().addClass('step-on');
				$(this).parent().prev().find('>.step-cont').show();
			});
		},
		carTabcontrol:function() {
			var _this = $(this),
				tab = _this.find('>.car-tab'),
				tabanc = tab.find('a'),
				tabcont = _this.find('>.car-tab-cont');
				tabcont.hide();
			if (!_this.get(0)){return false}
			$.each(tabcont,function(index) {
				$(this).attr('id','tab-cont-'+index);
			})
			$.each(tabanc,function(index) {
				$(this).attr('href','#tab-cont-'+index);
				$(this).click(function() {
					var hidecont = _this.find('.on-view'),
						hideparent = _this.find('.on-anc');
					hidecont.removeClass('on-view').hide();
					hideparent.removeClass('on-anc');
					$(this).parent().addClass('on-anc');
					$($(this).attr('href')).addClass('on-view').show();
					return false;
				})
			})
			tabanc.first().parent().addClass('on-anc');
			tabcont.first().addClass('on-view').show();
		},
		insuranceNavi:function() {
			var _this = $(this),
				naviAnc = _this.find('a');
			if (!_this.get(0)){return false}
			if (!_this.parent().is('.person-info-protect')) {
				naviAnc.click(function() {
					scrollPoint = $($(this).attr('href')).offset().top;
					$('html,body').animate({scrollTop:scrollPoint-120},500);
					return false;
				})
			} else {
				naviAnc.click(function() {
					scrollPoint = $($(this).attr('href')).offset().top;
					$('html,body').animate({scrollTop:scrollPoint-20},500);
					return false;
				})
			}
				
		},
		footerMenuNavi:function() {
			var _this = $(this),
				naviAnc = _this.find('a');
			if (!_this.get(0)){return false}
			naviAnc.click(function() {
				scrollPoint = $($(this).attr('href')).offset().top;
				$('html,body').animate({scrollTop:scrollPoint-20},500);
				return false;
			})
		},
		testdriveControl:function() {
			var _this = $(this),
				target = _this.find('.step-wrap'),
				targetCont = target.find('.step-cont'),
				targetNext = target.find('.btn-next'),
				targetPrev = target.find('.btn-prev');
				targetCont.hide();
				target.first().addClass('step-on');
				target.first().find('>.step-cont').show();
			if (!_this.get(0)){return false}
			targetNext.click(function() {
				var hidecont = _this.find('.step-on'),
					hidecont2 = hidecont.find('>.step-cont');
				hidecont2.hide();
				hidecont.removeClass('step-on');
				$(this).parent().next().addClass('step-on');
				$(this).parent().next().find('>.step-cont').show();
			});
			targetPrev.click(function() {
				var hidecont = _this.find('.step-on'),
					hidecont2 = hidecont.find('>.step-cont');
				hidecont2.hide();
				hidecont.removeClass('step-on');
				$(this).parent().prev().addClass('step-on');
				$(this).parent().prev().find('>.step-cont').show();
			});
		},
		testdriveCarselected:function() {
			var _this = $(this),
				checked = _this.find('input[type="radio"]');
			if (!_this.get(0)){return false}
			$.each(checked,function() {
				checked.click(function() {
					if (checked.is(':checked')) {
						var falseCont = _this.find('.info-on');
						var falseChecked = _this.find('input:radio');
						falseCont.removeClass('info-on');
						falseChecked.attr('checked',false);
						$(this).attr('checked',true);
						$(this).parent().addClass('info-on');
					}
				})
			})
		},
		comparedriveCarselected:function() {
			var _this = $(this),
				checked = _this.find('input[type="radio"]');
			if (!_this.get(0)){return false}
			$.each(checked,function() {
				checked.click(function() {
					if (checked.is(':checked')) {
						var falseCont = _this.find('.section-on');
						var falseChecked = _this.find('input:radio');
						falseCont.removeClass('section-on');
						falseChecked.attr('checked',false);
						$(this).attr('checked',true);
						$(this).parent().addClass('section-on');
					}
				})
			})
		},
		togglelistControl:function() {
			var _this = $(this),
				subject = _this.find('.subject');
				answer = _this.find('.answer');
			if (!_this.get(0)){return false}
			answer.hide();
			$.each(subject,function() {
				$(this).click(function() {
					if (!$(this).parent().parent().is('.row-on')) {
						$(this).parent().parent().addClass('row-on');
						$(this).parent().next().slideDown().addClass('answer-on');
					} else {
						$(this).parent().parent().removeClass('row-on');
						$(this).parent().next().slideUp().removeClass('answer-on');
					}
					/*
					if (!$(this).parent().parent().is('.row-on')) {
						var closeParent = _this.find('.row-on'),
						hideAnswer = _this.find('.answer-on'); 	
						closeParent.removeClass('row-on');
						hideAnswer.hide();
						$(this).parent().parent().addClass('row-on');
						$(this).parent().next().slideDown().addClass('answer-on');
					}
					*/
				})
			})
		},
		categorysortControl:function() {
			var _this = $(this),
				focusTarget = _this.find('a');
			if (!_this.get(0)){return false}
			$.each(focusTarget,function() {
				if (!$(this).is('.focus')) {
					$(this).click(function() {
						var removeFocus = _this.find('.focus');
						removeFocus.removeClass('focus');
						$(this).addClass('focus');
						return false;
					});
				}
				
			})
		},
		galleryControl2:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.each(function() {
				var _this = $(this);	
				var moveContwraper = _this.find('.gallery-cutter02');
				var moveContwrap = _this.find('.move-body');
				var moveContchild = moveContwrap.find('div');
				var moveDistance = moveContchild.outerWidth();
				var movebyDistance = moveContchild.length;
				var moveControlarea = _this.find('.control-area');
				var Leftbtn = moveControlarea.find('.prev-btn');
				var Rightbtn = moveControlarea.find('.next-btn');
				var circleWrap = $('<div class="circle-area"></div>');
				_this.parent().append(circleWrap);
				$.each(moveContchild,function(index) {$('<span class="circle"></span>').appendTo(circleWrap);});
				var circleChild = _this.next().find('.circle');
				var currentitem = 0;
				var speed = 600;
				moveContwrap.attr('num',currentitem);
				circleChild.first().addClass('circle-on');
				moveContwrapWidth = moveDistance*movebyDistance;
				moveContwrap.css({width:moveContwrapWidth});
				moveControlarea.hide();
				Leftbtn.hide().addClass('disabled');
				
				if (moveContwrapWidth > moveContwraper.outerWidth()) {
					_this.mouseenter(function() {moveControlarea.show();}).mouseleave(function() {moveControlarea.hide();})
				}
				var moveNext = function() {
					currentitem +=1;
					moveContwrap.stop().animate({marginLeft:-moveDistance*currentitem},speed)
					moveContwrap.attr('num',currentitem);

					if (moveContwrap.attr('num')==movebyDistance-1) {Rightbtn.hide().addClass('disabled');}
					else if (moveContwrap.attr('num')!=0) {Leftbtn.show().removeClass('disabled')}

					circleAdmin();
				}
				var movePrev = function() {
					currentitem -=1;
					moveContwrap.stop().animate({marginLeft:-moveDistance*currentitem},speed)
					moveContwrap.attr('num',currentitem);
					
					if (moveContwrap.attr('num')=="0") {Leftbtn.hide().addClass('disabled');}
					else if (moveContwrap.attr('num')!=movebyDistance-1) {Rightbtn.show().removeClass('disabled');}
					circleAdmin();
				}
				Leftbtn.click(function() {
					movePrev();
				})
				Rightbtn.click(function() {
					moveNext();
				})
				var circleAdmin = function() {
					var overnumtmp = moveContwrap.attr('num');
					var overnum = parseFloat(overnumtmp);
					var offCircle = _this.next().find('.circle-on');
					offCircle.removeClass('circle-on');
					_this.next().find('.circle').eq(overnum).addClass('circle-on');
				}
				$.each(circleChild,function(index) {
					$(this).click(function() {
						var offCircle = $(this).parent().find('.circle-on');
						offCircle.removeClass('circle-on');
						$(this).addClass('circle-on');
						moveContwrap.stop().animate({marginLeft:-moveDistance*index},speed)
						var overnum = $(this).index();
						currentitem = overnum;
						if (overnum !=movebyDistance-1 && overnum != '0') {
							Rightbtn.show();
							Leftbtn.show();//.hide().addClass('disabled');
						}
						else if (overnum==movebyDistance-1) {
							Leftbtn.show();
							Rightbtn.hide().addClass('disabled');
						}
						else if (overnum=='0') {
							Rightbtn.show();
							Leftbtn.hide().addClass('disabled');
						}

						moveContwrap.attr('num',overnum);
					})
				})
				_this.touchwipe({
					wipeRight: function(){
						if(!Leftbtn.is('.disabled')){
							Leftbtn.trigger('click')	
						}
					},
					wipeLeft: function(){
						if(!Rightbtn.is('.disabled')){
							Rightbtn.trigger('click')
						}
					},
					min_move_x: 20,
					min_move_y: 20,
					preventDefaultEvents: true
				});
			})
		},
		hashNavi:function() {
			var _this = $(this),
				naviAnc = _this.find('a');
			if (!_this.get(0)){return false}
			naviAnc.click(function() {
				scrollPoint = $($(this).attr('href')).offset().top;
				$('html,body').animate({scrollTop:scrollPoint-130},500);
				return false;
			})
		},
		trimdataControl:function() {
			var _this = $(this),
				movebody = _this.find('.trim-data'),
				datatable = movebody.find('>table'), 
				modelSort = _this.find('.model'),
				modelDistance = modelSort.outerWidth() + 1,
				$next = _this.prev().find('.next'),
				$prev = _this.prev().find('.prev'),
				maxNum = modelSort.length - 4,
				num = 0; 
			if (!_this.get(0)){return false}
				$prev.addClass('disabled').attr('disabled','disabled');
				_this.find('tbody > tr:even').addClass('odd');
			if (datatable.outerWidth() <= _this.outerWidth()) {
				$prev.addClass('disabled').attr('disabled','disabled');
				$next.addClass('disabled').attr('disabled','disabled');
			}
			$next.click(function() {
				num ++;
				movebody.animate({marginLeft:-(modelDistance*num)},500)
				if (num == maxNum) {$next.addClass('disabled').attr('disabled','disabled');}
				if (num == 1 && $prev.is('.disabled')) {$prev.removeClass('disabled').removeAttr('disabled');}
			})
			$prev.click(function() {
				num --;
				movebody.animate({marginLeft:-(modelDistance*num)},500)
				if (num !== maxNum && $next.is('.disabled')) {$next.removeClass('disabled').removeAttr('disabled'); console.log('aa')}
				if (num < 1) {$prev.addClass('disabled').attr('disabled','disabled');}
			})
			_this.touchwipe({
				wipeRight: function(){
					if(!$prev.is('.disabled')){
						$prev.trigger('click')	
					}
				},
				wipeLeft: function(){
					if(!$next.is('.disabled')){
						$next.trigger('click')
					}
				},
				min_move_x: 20,
				min_move_y: 20,
				preventDefaultEvents: true
			});
		},
		trimdataView:function() {
			var _this = $(this);
			if (!_this.get(0)){return false}
			_this.click(function() {
				$('body').dimmedFrame();
				$($(this).attr('href')).css({top:$(window).scrollTop()+250}).show();
				$('.trim-data-cutter').trimdataControl();
				return false;
			})
		},
		snsNavi:function() {
			var _this = $(this),	
				stickyPoint,
				runpoint;
			if (!_this.get(0)){return false}	
			$(window).load(function() {
				stickyPoint = _this.offset();
				_this.find('a').click(function() {
					var scrollcu = $($(this).attr('href')).offset().top;
					$('html, body').animate({scrollTop:scrollcu - _this.outerHeight()},{duration:500, easing:'easeInOutQuart'})
					return false;
				})
				$(window).scroll(function() {
					if ( $(window).scrollTop() > stickyPoint.top ) {
						if (!runpoint) {
							_this.parent().addClass('snsnavi-sticky');
							runpoint = 1;
						}
					} else {
						if (runpoint) {
							_this.parent().removeClass('snsnavi-sticky');
							runpoint = 0;
						}
					}
				});
			});
		},
		placeGallery:function() {
			var _this = $(this),
				targetImg = _this.find('.place-list-wrap ul img.thumb'),
				placeImg = 	_this.find('.view-place img'),
				placeSrc = targetImg.first().attr('src');
			$.each(targetImg,function() {
				$(this).click(function() {
					var imgSrc = $(this).attr('src')
						hideParent = _this.find('.on-frame');
					hideParent.removeClass('on-frame');
					placeImg.attr('src',imgSrc);
					$(this).parent().addClass('on-frame');
				})
			})
			placeImg.attr('src',placeSrc);
			targetImg.first().parent().addClass('on-frame');
		},
		detailHashLink:function() {
		    var _this = $(this),
		        hashBtn = _this.find('div.btn a');
		    if (!_this.get(0)){return false}
		    $.each(hashBtn,function() {
		        $(this).click(function() {
		            $('html, body').animate({scrollTop:$($(this).attr('href')).offset().top-109},500)  
		        })
		    })
		},
		/* 3depth navigation */
		subnaviTool:function(num) {
			var _this = $(this),
				targetLi = _this.find('>li'),
				targetImg = targetLi.eq(num).find('>a img'),
				imgSrc = targetImg.attr('src'),
				replaceSrc = imgSrc.replace('_out','_over');
				targetImg.attr('src',replaceSrc)
		}
		/* //3depth navigation */
	})
	$(document).ready(function() {
		$('.fadeElement').pngFadeinOut();
		$('.select-layer-wrap').layerSelect();
		$('#main-header-wrap').screenModify();
		$('.motioncar-list li').first().addClass('fn-on');
		$('.contview-btn-wrap').mainscrollMove();
		$('#mainvisual-motion').mainmotion();
		$('.news-notice-area .list').mainNewsControl();
		$('.listcutter').listcutter();
		$('#sub-header-wrap').subpageControl();
		$('.sns-area').snsControl();
		$('.survey-wrap').surveyControl();
		$('.event-spot-wraper').eventBannerControl();
		$('.layer-control').layerpopupControl();
		$('.trimdata-control').trimdataView();
		$('.layerpopup').layerpopupClose();
		$('.movieplayerpopup').layerpopupClose();
		$('.estimation-wrap').estimationControl();
		$('.car-tab-wrap').carTabcontrol();
		$('.insurance-article-navi').insuranceNavi();
		$('.testdrive-apllication-step').testdriveControl();
		$('.car-select-wrap').testdriveCarselected();
		$('.car-select-wrap02').comparedriveCarselected();
		$('.footer-menu-navi').footerMenuNavi();
		$('.toggle_list_wrap').togglelistControl();
		$('.category-sort-select').categorysortControl();
		$('.gallery-wrap02').galleryControl2();
		$('.scroll-control-wrap').hashNavi();
		$('.social-service-navigation').snsNavi();
		$('.place-guide-wrap').placeGallery();
		$('#detail-hash').detailHashLink();
		//$('#sub-navigation').subnaviTool();
	})
})(jQuery)



$(function(){ // step Tab 메뉴
	$("div.joinContainer .section:not("+$("ol.step li a.on").attr("href")+")").hide()
	$("ol.step li a").click(function(){
		$("ol.step  li a").removeClass("on");
		$(this).addClass("on");
		$("div.joinContainer .section").hide();
		$($(this).attr("href")).show();
		return false;
	});
});

$(function(){ // CLOSE BUTTON
	$(".joinContainer .btnLayerClose button.btnClose").click(function(){
		$(".joinContainerWrap").hide();
	});
	$(".joinContainer .errorMesg button.btnClose").click(function(){
		$(".joinContainer .errorMesg").hide();
	});
});


$(function(){ // FAQ
	$(".faqList dd:not(:first)").css("display","none");
	$("dl dt").click(function(){
		if($("+dd",this).css("display")=="none"){
			$(this).siblings("dd").slideUp();
			$("+dd",this).slideDown();
		}
	});
}); 

$(function(){	
	$('.featuresList li:even').addClass('odd');
});


$(document).ready( function(){

   var quick_menu = $('.quickMenu');
   var quick_top = 10;            
   quick_menu.css('top', $(window).height);
   quick_menu.animate({"top" : $(document).scrollTop() + quick_top + "px"}, 100);

   $(window).scroll(function(){
		   quick_menu.stop();
		   quick_menu.animate({"top" : $(document).scrollTop() + quick_top + "px"}, 1000);
   })
});