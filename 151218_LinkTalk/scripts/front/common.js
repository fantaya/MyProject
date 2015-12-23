/************************************************************************
함수명 : replaceAll
설 명  : 문자값중에 같은 내용을 다른 내용으로 대체한다.
인 자  : str1 : 대상문자 str2 : 바꿀문자
사용법 : replaceAll(str1,str2)
작성일 : 2012-04-20
작성자 : jkKim
수정일     수정자     수정내용
------   ------    -------------------
************************************************************************/
String.prototype.replaceAll = function (str1,str2){
    var str    = this;     
    var result   = str.replace(eval("/"+str1+"/gi"),str2);
    return result;
};


/************************************************************************
함수명 : appendMETA
설 명  : 메타 태그에 내용을 추가 한다.
인 자  : name : 메타태그 이름 val : 추가할 값
사용법 : replaceAll(str1,str2)
작성일 : 2012-04-20
작성자 : jkKim
수정일     수정자     수정내용
------   ------    -------------------
************************************************************************/
function appendMETA(name,val){
    var taget = $("meta[name='"+name+"']");
    if(taget){
        taget.attr("content",taget.attr("content")+"_"+val);
    }
}

/************************************************************************
함수명 : openPopup
설 명  : 팝업
인 자  :
사용법 : openPopup(path)
작성일 : 2012-04-20
작성자 : jkKim
수정일     수정자     수정내용
------   ------    -------------------
************************************************************************/
function openPopup(path){
   window.open(path,'POPUP','');
}

/************************************************************************
함수명 : carComp
설 명  : 팝업
인 자  :
사용법 : carComp()
작성일 : 2012-07-06
작성자 : isChoi
수정일     수정자     수정내용
------   ------    -------------------
************************************************************************/
function carComp(){
    var carCd = $('#carCd1').val();
    if (carCd!=null) {
        location.href="/kr/estimation/compare.do?carCd="+carCd;
    } else {
        location.href="/kr/estimation/compare.do";
    }  
}

function htmlCSSReplace(str){
    str = str.replaceAll("<","&lt;");//HTML tag를 모두 제거
    str = str.replaceAll(">","&gt;");
    str = str.replaceAll("&lt;p&gt;", "<p>");
    str = str.replaceAll("&lt;P&gt;", "<P>");
    str = str.replaceAll("&lt;br&gt;", "<br>");
    str = str.replaceAll("&lt;BR&gt;", "<BR>");
    
    return str;
}































/*****메뉴고정***/

    function showChaildView(id, seq, iconYn, dspMenuNm, dspCtgrSn){
        if($.trim($("#"+id).html()).length != 0){
            return;   
        }   
        $.ajax({
            type: "POST",
            dataType : "text",
            url: "/kr/childView.do",
            data: {
                'dspCtgrSn' : seq,
                'iconYn' : iconYn
            },
            success: function(data){
                if(data){
                    $("#"+id).html('');   
                    $("#"+id).append(data);
                    setContentsImg(id, "http://www.hyundai.com/", dspMenuNm, dspCtgrSn);
                }  
            }
         });        
    } 
    
    var event = false;
    function showEventView(id){
        var carCd1 = $('#carCd1').val();
        var carCd2 = $('#carCd2').val();
        $.ajax({
            type: "POST",
            dataType : "text",
            url: "/kr/dsp/selectEvntMnList.do",
            data: {
                'carCd1' : carCd1,
                'carCd2' : carCd1+carCd2
            },
            success: function(data){
                if(data){
                    $("#"+id).html('');   
                    $("#"+id).append(data);
                }  
            }
         });        
    } 
    function showroomPrint(o) {
        var Parea = $(o).parent().parent().parent().parent().attr('id');
        $('#'+Parea).printArea({mode: 'popup', popupClose: false});
  
        return false;
    }
    
    var vrCarObj = [];
    var vrCarObj2 = [];
    function vrCar(carPath, imgframe, ext, id, frame, pot, re){  
        if(!imgframe){
            imgframe=1;
        }
        if(!id){
            id="vr-car";
        }
        if(imgframe != 0){
            vrCarObj[id]=imgframe;
        }else{
            imgframe = vrCarObj[id];
        }
        if(!frame){ 
           frame=60;
        }
        var carImgArray=[];
        
       if(pot && pot=="left"){
           for(var i=frame; i>0; i=i-imgframe) {
               var imgPath = i+"";
               if(imgPath.length == 1){
                   imgPath = "0000"+imgPath;
               }else if(imgPath.length == 2){
                   imgPath = "000"+imgPath;
               }else if(imgPath.length == 3){
                   imgPath = "00"+imgPath;
               }else if(imgPath.length == 4){
                   imgPath = "0"+imgPath;
               }
               imgPath+="."+ext;
               carImgArray.push(imgPath);
           }
       }else{
           for(var i=1; i<=frame; i=i+imgframe) {
               var imgPath = i+"";
               if(imgPath.length == 1){
                   imgPath = "0000"+imgPath;
               }else if(imgPath.length == 2){
                   imgPath = "000"+imgPath;
               }else if(imgPath.length == 3){
                   imgPath = "00"+imgPath;
               }else if(imgPath.length == 4){
                   imgPath = "0"+imgPath;
               }
               imgPath+="."+ext;
               carImgArray.push(imgPath);
           }  
       }
       $('#' + id).width("880").height("415");
       /*
       if(re){
           $('#' + id).attr('src', '/kr/images/common/880_415_loader.gif');
           $('#' + id).reel({
               cw : false,
               frame : 1,
               speed : 0,
               path : carPath,
               images : carImgArray
           });
           if(vrCarObj2[id]){
               vrCarObj2[id] = "";
           }
       }else{
           $('#' + id).click(function() {
               $('#' + id).attr('src', '/kr/images/common/880_415_loader.gif');
               $('#' + id).reel({
                   cw : false,
                   frame : 1,
                   speed : 0,
                   path : carPath,
                   images : carImgArray
               });
               if(vrCarObj2[id]){
                   vrCarObj2[id] = "";
               }
           });
           vrCarObj2[id] = {
               'carPath' : carPath,
               'imgframe' : imgframe,
               'id' : id,
               'ext' : ext,
               'frame' : frame,
               'pot' : pot
           };
       }
       */
       $('#' + id).reel({
           cw : false,
           frame : 1,
           speed : 0,
           path : carPath,
           images : carImgArray
       });
    }
      
    function vrPathChange(o, path, id){ 
        if(!id){
            id="vr-car";
        }
        
        //if(vrCarObj2[id]) {
        ///    var taget = vrCarObj2[id];
        //    vrCar(path, taget.imgframe, taget.ext, id, taget.frame, taget.pot,"true");
        //} else {
            var imgPath = $('#' + id).attr("src");
            var frame = imgPath.substring(imgPath.lastIndexOf("/"), imgPath.length);
            $('.vr-path-change').parent().each(function(idx) {
                $(this).attr('_idx', idx);  
            }); 
            //$('#' + id).find('.jquery-reel').eq($(o).parent().attr('_idx')).data('Toverlay').fnchg(path, frame);
            if($('.jquery-reel').size() == 1 && $(o).parent().attr('_idx') == 1){
                $('.jquery-reel').eq(0).data('Toverlay').fnchg(path, frame);
            }else{
                $('.jquery-reel').eq($(o).parent().attr('_idx')).data('Toverlay').fnchg(path, frame);
            }
        //} 
    }  
    
    function setContentsImg(id, http, dspMenuNm, dspCtgrSn){
        if($("#"+id).find("img").attr("src")){
            if($("#"+id).find("img").attr("src").indexOf("kr")> 0) {
                $("#"+id).find(".snml_type2").find(".snml_img").html(http+$("#"+id).find("img").attr("src"));
            }else{
                $("#"+id).find(".snml_type2").find(".snml_img").html(http+"kr/"+$("#"+id).find("img").attr("src"));
            }
        }
        var car_name = $("#car_name").val();
        $("#"+id).find(".snml_type2").find(".snml_title").html(car_name+" "+dspMenuNm+" 을(를) %nick님이 관심있어 합니다.");
        $("#"+id).find(".snml_type2").find(".snml_description").html($('#showroom_description').val());
        var link = location.href;
        var lastNum = link.lastIndexOf("#");
        if(lastNum > 0){
            test = link.substring(0, lastNum)+"#showroom-cont-"+dspCtgrSn;
            $("#"+id).find(".snml_type2").find(".snml_URL").html(link.substring(0, lastNum)+"#showroom-cont-"+dspCtgrSn);
        }else{
            $("#"+id).find(".snml_type2").find(".snml_URL").html(link+"#showroom-cont-"+dspCtgrSn);
        }
    }
    
    function changeImg(o, imgPath){
        $(o).attr("src", imgPath);
    }
    $(document).ready(function() {
       // NetFunnel_goComplete({"port" : "8200","proto" : "http", cookie_id:"NetFunnel_ID7"});
        $('#showroom-navigation').showroomNavicontrol();
        $('#showroom-container').showroomContentscontrol();
        
        $('.showroom-contents').each(function(){
            var that = this;
            var imgSrc1 = $(this).find('img').eq(0);
            var imgSrc2 = $(this).find('img').eq(1);
           $(that).find(".contents_control").click(function(){
               if($(this).hasClass("close-child")){
                   $(this).removeClass('close-child');
                   $(this).addClass('open-child'); 
                   
                   $(that).find(".showroom-contents-child").show();
                   imgSrc1.hide();
                   imgSrc2.show();  
                   
               }else{
                   $(this).removeClass('open-child');
                   $(this).addClass('close-child');
                   $(that).find(".showroom-contents-child").hide();
                   imgSrc2.hide();
                   imgSrc1.show();   
               } 
           });        
        });
        
        $('.popupOpen').fullsizePopup();        
        $('.showroom-storybook').storyControl();
        
        
        $("#snml").find(".snml_description").html($('#showroom_description').val());
        $("#snml").find(".snml_URL").html(location.href);
        
        var us = navigator.userAgent;
        
        if(us.indexOf("iPhone")> 0) {
            $('#quick').hide();
        } else if(us.indexOf("iPad")> 0) {  // iPad
            $('#quick').hide();
        } else if(us.indexOf("Android")> 0) {
            $('#quick').hide();
        } else {
            $('#quick').show();            
        }   
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

(function($){
    $.fn.extend({
        naviTool:function() {
            var _$this = $(this),
                _$thisItem = _$this.find('>li'),
                _$thisItemanc = _$thisItem.find('>.item a'),
                targetClose = _$thisItem.find('.close');
            if (!_$this.get(0)){return false}
            _$thisItem.eq(0).css('marginLeft',0);_$thisItem.eq(2).css('marginLeft',6);_$thisItem.eq(3).css('marginLeft',16);_$thisItem.eq(4).css('marginLeft',63);_$thisItem.eq(5).css('marginLeft',19);_$thisItem.eq(6).css('marginLeft',19)
            _$thisItemanc.bind({
                'click':function() {
                    if ($(this).parent().parent().attr('class') != 'li-over') {
                        var parentBody = _$this,
                            removetarget = parentBody.find('.li-over'),
                            removetarget2 = parentBody.find('.onview');
                        if (parentBody.find('.onview').is('.onview')) {
                            var changeSrc = removetarget2.prev().find('img').attr('src');
                            removetarget2.prev().find('img').attr('src',changeSrc.replace('_over','_out'));
                        }
                        removetarget.removeClass('li-over');
                        removetarget2.removeClass('onview').hide();
                        var target = $(this).parent().next();
                        var targetsrc = $(this).find('img').attr('src');
                        $(this).find('img').attr('src',targetsrc.replace('_out','_over'));
                        $(this).parent().addClass('li-over')
                        target.stop().addClass('onview').stop().slideDown();
                        return false;
                    }
                }
            })
            targetClose.bind({
                'click':function() {
                    $(this).parent().parent().parent().removeClass('li-over');
                    $(this).parent().parent().slideUp().removeClass('onview');
                    var changeSrc = $(this).parent().parent().prev().find('img').attr('src');
                    $(this).parent().parent().prev().find('img').attr('src',changeSrc.replace('_over','_out'))
                    return false;
                }
            })
        }
    })
})(jQuery)
    