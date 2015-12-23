/*
 *  @ Project: Netville Javascript Common Plugin
 *  @ Description: Netville Javascript Common Plugin
 *  @ Author: Netville
 *  @ Version: 1.00 (31-DEC-2012)
 *  @ requires jQuery v1.8.0 or later 
 *  @ License: the semi-colon before function invocation is a safety net against concatenated
 *           scripts and/or other plugins which may not be closed properly. 
 */
(function($) {
	var currentDateTime = new Date();

    // date
    $.nj.date = {};
    
    // GMT offset
    $.nj.date.offsetTime = '';
    $.nj.date.convertGmtDate = function( time ) {
        var tempObj = new Date();
        // Convert To GMT0
        if($.nj.date.offsetTime != '') {
            return new Date(time + tempObj.getTimezoneOffset() * 60000 + parseInt($.nj.date.offsetTime));
        }
        return new Date(time + tempObj.getTimezoneOffset() * 60000);
    };

	//Month Array
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthNamesShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	//Week Array
	$.nj.date.week = new Array('SUN','MON','TUE','WED','THU','FRI','SAT');

    //Get Today
    $.nj.date.getToday = function() {
        return $.nj.date.dateToString(new Date());
    };
   
    //Get Plus Day
    $.nj.date.getIntervalDate = function(time, plus) {
        var result = $.nj.date.stringToDate(time);
        result.setDate(result.getDate() + parseInt(plus));
        return $.nj.date.dateToString(result);
    };
        
    //Get Week
    $.nj.date.getIntervalWeek = function(time, interval) {
        var result = {first:0, last:0};
        
        var curr = $.nj.date.stringToDate(time);    
        curr.setDate(curr.getDate() + (parseInt(interval) * 7) - curr.getDay());
        
        result.first = $.nj.date.dateToString(curr);
        result.last = $.nj.date.getIntervalDate(result.first, 6);
        
        return result;
    };
    
    //Get Interval Month
    $.nj.date.getIntervalMonth = function(time, interval) {
        var result = {first:0, last:0};
        
        var firstday = $.nj.date.stringToDate(time);
        firstday.setDate(1);
        firstday.setMonth(firstday.getMonth()+parseInt(interval));
        
        var lastday = $.nj.date.stringToDate($.nj.date.dateToString(firstday));
        lastday.setDate(1);
        lastday.setMonth(lastday.getMonth()+1);
        lastday.setHours(-1);
        
        result.first = $.nj.date.dateToString(firstday);
        result.last = $.nj.date.dateToString(lastday);
        
        return result;
    };
    
    //Get Month of Week
    $.nj.date.getMonthOfWeek = function(time) {
    	var result = {first:0, last:0};
    	var firstday = $.nj.date.stringToDate(time);    	
    	firstday.setDate(1);
        firstday.setMonth(firstday.getMonth());
        firstday.setDate(firstday.getDate() - firstday.getDay());
        
        var lastday = $.nj.date.stringToDate(time);
        lastday.setDate(1);
        lastday.setMonth(lastday.getMonth()+1);
        lastday.setHours(-1);
        lastday.setDate(lastday.getDate() - lastday.getDay() + 6);
        
        result.first = $.nj.date.dateToString(firstday);
        result.last = $.nj.date.dateToString(lastday);
        
        return result;
    };
    
    
    //Get DayOfWeek
    $.nj.date.getDayOfWeek = function(time) {
        var strDate = time + "";
        var week = $.nj.week[$.nj.date.stringToDate(strDate).getDay()];
        return week;
    };

	/**
	 *Get Name of month
	 */ 
	$.nj.date.getNameOfMonth = function(date) {
		var month = '';
		try {
			if (typeof date == 'number') {
				month = monthNames[date-1];
			} else if(typeof date == 'string') {
				month = monthNames[parseInt(date)-1];
			} else {
				month = monthNames[date.getMonth()];
			}
		} catch(e) {
			month = '';
		}
		return month;
	};
	$.nj.date.getShortNameOfMonth = function(date) {
		var month = '';
		try {
			if (typeof date == 'number') {
				month = monthNamesShort[date-1];
			} else if(typeof date == 'string') {
				month = monthNamesShort[parseInt(date)-1];
			} else {
				month = monthNamesShort[date.getMonth()];
			}
		} catch(e) {
			month = '';
		}
		return month;
	};
	
	//is Same Date
    $.nj.date.isToday = function(strDate){
        var curr = new Date();
        var curDate = $.nj.date.dateToString(curr);
        if(curDate == strDate) {
            return true;
        } else {
            return false;
        }
    };
    
	// 20130405 -> 2013.04.05
	$.nj.date.scheduleToDate = function(str) {
		str = str+ "";
		if(str != null && str != ""){
			var year  = str.substring(0,4);
			var month = str.substring(4,6);
			var day   = str.substring(6,8);
			return year + "." + month + "."+ day;
		}else{
			return "";
		}
	};
    
    //String To Date
    $.nj.date.stringToDate = function(time) {
        var yearMonth = parseInt(time.substring(0,6)) - 1;
        var yearMonthStr = yearMonth + "";
        var year  = yearMonthStr.substring(0,4);
        var month = yearMonthStr.substring(4,6);
        var day   = time.substring(6,8);
        return new Date(year, month ,day);
    };
    
     //String To DateTime
    $.nj.date.stringToDateTime = function(time) {
        var yearMonth = parseInt(time.substring(0,6)) - 1;
        var yearMonthStr = yearMonth + "";
        var year  = yearMonthStr.substring(0,4);
        var month = yearMonthStr.substring(4,6);
        var day   = time.substring(6,8);
        var hour = time.substring(8,10);
        var min = time.substring(10,12);
        var sec = time.substring(12,14);
        var parseDate = new Date(year, month ,day);
        parseDate.setHours(hour, min, sec);
        return $.nj.date.convertGmtDate(parseDate.valueOf());
    };
    
    //Date To String
    $.nj.date.dateToString = function(curr) {
        var year = curr.getFullYear();
        var month = (curr.getMonth()+1);
        var day = curr.getDate();
        return year + "" + ((parseInt(month) > 9) ? month : "0" + month) + "" + ((parseInt(day) > 9) ? day : "0" + day); 
    };    

	$.nj.date.toDate = function(time) {
		if (!time) {
			return '';
		}
		var formatted = '';
		var date = $.nj.date.convertGmtDate(time);
		if (date) {
			var isSameYear = currentDateTime.getFullYear()===date.getFullYear();
			if (!isSameYear) {
				formatted += ('0000'+date.getFullYear()).substr(-4, 4) + '.';
			}
			formatted += ('0' + (date.getMonth() + 1)).substr(-2, 2) + '.'
						+ ('0' + date.getDate()).substr(-2, 2);
			if (isSameYear) {
				formatted += ' <em>'
						+ ('0' + (date.getHours())).substr(-2, 2) + ':'
						+ ('0' + (date.getMinutes())).substr(-2, 2)
						+ '</em>';
			}
		}
		return formatted;
	};
	
	$.nj.date.toDateSchedule = function(date) {
		var formatted = '';
		if (!date) {
			return '';
		}
		if (date) {
			formatted += ('0000'+date.getFullYear()).substr(-4, 4) + '-';
			formatted += ('0' + (date.getMonth() + 1)).substr(-2, 2) + '-'
						+ ('0' + date.getDate()).substr(-2, 2);
		}
		return formatted;
	};

	$.nj.getScheduleDate = function(startDate, endDate, startTime, endTime) {
		var formatted = '';
		if(startDate && endDate) {
			var startDateStr = startDate.substring(2, 4)+ '.' + startDate.substring(4, 6) + '.' + startDate.substring(6, 8);
			var endDateStr = endDate.substring(2, 4)+ '.' + endDate.substring(4, 6) + '.' + endDate.substring(6, 8);
			if (startTime && endTime) {
				startDateStr += " <em>"+startTime.substring(0, 2)+":"+startTime.substring(2, 4)+"</em>";
				endDateStr += " <em>"+endTime.substring(0, 2)+":"+endTime.substring(2, 4)+"</em>";
			}
			formatted += startDateStr + ' ~ ' +endDateStr;
		}
		return formatted;
	};

})(jQuery);