/*
 *  @ Project: Netville Javascript Scroll Plugin
 *  @ Description: Netville Javascript Scroll Plugin
 *  @ Author: Netville
 *  @ Version: 1.00 (31-DEC-2012)
 *  @ requires jQuery v1.8.0 or later 
 *  @ License: the semi-colon before function invocation is a safety net against concatenated
 *           scripts and/or other plugins which may not be closed properly. 
 */
(function($) {
    
	//Scroll
    $.nj.scroll = function( objId, down, method) {
        
        // Set Scroll Data
        $.nj.scroll.obj = $("#" + objId);
        $.nj.scroll.direction = (down ? "down" : "top");
        $.nj.scroll.method = method;
        
        // Scroll Available
        $.nj.scroll.obj.mouseout(function(){
            //$("#mouseIn").text("Mouse Out");
            $.nj.scroll.able = false;
        }).mouseover(function(){
            //$("#mouseIn").text("Mouse In");
            $.nj.scroll.able = true;
        });
            
        // Window mouse wheel event
        $(window).mousewheel(function() {
            if($.nj.scroll.able && !$.nj.scroll.loading) {
                //$("#scrollPosition").text("scrollTop[" + $.nj.scroll.obj.scrollTop() +"] + $.nj.scroll.obj[0].clientHeight:[" + $.nj.scroll.obj[0].clientHeight + "] >= $.nj.scroll.obj[0].scrollHeight:" + $.nj.scroll.obj[0].scrollHeight);
                $.nj.scroll.action();
            }
        });
        
        // Div scroll event
        $.nj.scroll.obj.scroll( function() {
            if($.nj.scroll.able && !$.nj.scroll.loading) {
                //$("#scrollPosition").text("scrollTop[" + $.nj.scroll.obj.scrollTop() +"] + $.nj.scroll.obj[0].clientHeight:[" + $.nj.scroll.obj[0].clientHeight + "] >= $.nj.scroll.obj[0].scrollHeight:" + $.nj.scroll.obj[0].scrollHeight);
                $.nj.scroll.action();
            }
        });  
    } ;
    
    // scroll 대상 여부
    $.nj.scroll.able = false;
    // scroll loading now
    $.nj.scroll.loading = false;
    // scroll Object
    $.nj.scroll.obj = null;
    // scroll 방향
    $.nj.scroll.direction = 'down';
    // scroll call method
    $.nj.scroll.method = null;
    // scroll action
    $.nj.scroll.action = function() {
        var methodAvail = $.nj.scroll.method != null && $.type($.nj.scroll.method) === "function";
        if( methodAvail && !$.nj.scroll.loading ) {
            if($.nj.scroll.direction == 'down' 
                && ( $.nj.scroll.obj.scrollTop() + $.nj.scroll.obj[0].clientHeight >= $.nj.scroll.obj[0].scrollHeight ) ) {
                $.nj.scroll.loading = true;
                //&& ( $.nj.scroll.obj.scrollTop() + $.nj.scroll.obj[0].clientHeight +5 >= $.nj.scroll.obj[0].scrollHeight ) ) {
                $.when($.nj.scroll.method()).done(function () {
                    //$.nj.scroll.obj.scrollTop($.nj.scroll.obj[0].scrollHeight - $.nj.scroll.obj[0].clientHeight - 20);
                    $.nj.scroll.loading = false;
                });
            } else if( $.nj.scroll.direction == 'top' && ( $.nj.scroll.obj.scrollTop() <= 0 ) ) {
                $.nj.scroll.loading = true;
                var rememberTop = $.nj.scroll.obj[0].scrollHeight - $.nj.scroll.obj[0].clientHeight;
                $.when($.nj.scroll.method()).done(function () {
                    //$.nj.scroll.obj.scrollTop(20);
                    rememberTop = $.nj.scroll.obj[0].scrollHeight - rememberTop - $.nj.scroll.obj[0].clientHeight ;
                    $.nj.scroll.obj.scrollTop(rememberTop);
                    $.nj.scroll.loading = false;
                });
            }//:~if($.nj.scroll.direction == 'down'
        }//:~if( methodAvail ) {
    };
  
})(jQuery);