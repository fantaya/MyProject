(function($){
	$.fn.extend({
		showroomNavicontrol:function() {
			var _this = $(this);
			var target = _this.find('.carbrand-menu li');
			var target2 = _this.find('.carspec-area li');
			var target3 = target2.find('>a');
			var target4 = _this.find('#quick .top-button >a');
			target.first().addClass('first')
			$.each(target3,function(index) {
				$(this).attr('href','#showroom-cont-'+index)
			})
			target4.click(function() {
				var movepoint = $('#showroom-container').offset().top;
				$('html,body').animate({scrollTop:movepoint},500)
			})
		},
		showroomNavifollow:function() {
			var _this = $(this);
			var ScrollLi = [];
			var ScrollAA;
			var ScrollPoint;
			var runpoint;
			$(window).load(function() {
				ScrollAA = _this.offset().top;
				ScrollPoint = _this.find('#showroom-navigation-wrap').height();
				$('.carspec-area li a').click(function() {
					var ScrollCu = $($(this).attr('href')).offset().top;
					$('html, body').animate({scrollTop:ScrollCu-ScrollPoint},{duration:500, easing:'easeInOutQuart'})
					return false;
				});
				
				$('.showroom-contents').each(function(index) {
					ScrollLi[index] = parseInt($(this).offset().top,10);
				});
				$(window).scroll(function() {
					if ( $(window).scrollTop() > ScrollAA ) {
						if (!runpoint) {
							_this.addClass('sticky');
							runpoint = 1;
						}
					} else {
						if (runpoint) {
							_this.removeClass('sticky');
							runpoint = 0;
						}
					}
				});

			})
		},
		showroomContentscontrol:function() {
			var _this = $(this);	
			var childContents = _this.find('.showroom-contents');
			var closeChild = childContents.find('.close-child');
			var controlbutton = childContents.find('.contents_control');
			//closeChild.hide();
			childContents.first().css({borderTop:0});
			$.each(childContents,function(index) {
				var $this = $(this);
				var childContents2 = $this.find('.section-line');
				$this.attr('id','showroom-cont-'+index)
				childContents2.first().addClass('section-first');
				if (!$this.find('.close-child').is('.close-child')) {
					/*var imgSrc = $this.find('h3').find('img').attr('src');
					var replaceimgSrc = imgSrc.replace('_out','_over');
					$this.find('h3').find('img').attr('src',replaceimgSrc);*/
					$this.find('button.contents_control').addClass('open-child');
				}
			})
			//childContents.last().find('.showroom-contents-child').css({paddingBottom:0})
			controlbutton.bind({
				'click':function() {
					$(this).toggleClass('open-child');
					/*var imgSrc = $(this).prev().find('img').attr('src');
					$(this).prev().find('img').attr('src',/_out/.test(imgSrc) ? imgSrc.replace('_out','_over') :  imgSrc.replace('_over','_out'));*/
					if ($(this).next().is('.close-child')) {
						$(this).next().show().removeClass('close-child');
						//$(this).next().slideDown(600,'easeInQuart').removeClass('close-child');
					} else {
						$(this).next().hide().addClass('close-child');
						//$(this).next().slideUp(600,'easeInQuint').addClass('close-child');
					}
				}
			})
			_this.showroomNavifollow()
		},
		galleryControl:function() {
			var _this = $(this);
			_this.each(function() {
				var _this = $(this);	
				var moveContwraper = _this.find('.gallery-cutter');
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
					if (moveContwrap.attr('num')!=0) {Leftbtn.show().removeClass('disabled')}

					circleAdmin();
				}
				var movePrev = function() {
					currentitem -=1;
					moveContwrap.stop().animate({marginLeft:-moveDistance*currentitem},speed)
					moveContwrap.attr('num',currentitem);
					
					if (moveContwrap.attr('num')=="0") {Leftbtn.hide().addClass('disabled');}
					if (moveContwrap.attr('num')!=movebyDistance-1) {Rightbtn.show().removeClass('disabled');}
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
		fullsizePopup:function() {
			var _this = $(this);
			_this.click(function() {
				window.open('driving.html','newWin','toolbar=no,location=no,scrollbars=no,resizable=no,width='+$(window).width()+',height='+$(window).height()+',left=0,top=0');
				return false;
			})
		},
		detailTabcontrol:function() {
			var _this = $(this),
				tab = _this.find('>.tabwrap'),
				tabanc = tab.find('a'),
				tabcont = _this.find('>.price-table-style');
				tabcont.hide();
			if (!_this.get(0)){return false}
			$.each(tabcont,function(index) {
				$(this).attr('id','tab-cont-'+index);
			})
			$.each(tabanc,function(index) {
				$(this).attr('href','#tab-cont-'+index);
				$(this).click(function() {
					var hidecont = _this.find('.on-view'),
						hideparent = _this.find('.on');
					hidecont.removeClass('on-view').hide();
					hideparent.removeClass('on');
					$(this).parent().addClass('on');
					$($(this).attr('href')).addClass('on-view').show();
					return false;
				})
			})
			tabanc.first().parent().addClass('on');
			tabcont.first().addClass('on-view').show();
		},
		storyControl:function() {
			var _this = $(this),
				childCont = _this.find('>.storybook-contents'),
				childCont2 = _this.find('.inner-contents'),
				childBtn = childCont.find('.open-btn');
				check = childCont.length;
			if (!_this.get(0)){return false}
			childCont2.hide();
			childCont2.eq(0).show();
			childBtn.eq(0).addClass('close');
			$.each(childCont,function(index) {
				contRolbtn = $(this).find('.open-btn')
				$(this).css({zIndex:check-index});
				contRolbtn.click(function() {
					$(this).toggleClass('close');
					$(this).prev().find('>.inner-contents').toggle();
				})
			})
		}
	})
})(jQuery)