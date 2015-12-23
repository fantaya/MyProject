/*
 *  @ Project: Netville Javascript Validator Plugin
 *  @ Description: Netville Javascript Validator Plugin
 *  @ Author: Netville
 *  @ Version: 1.00 (31-DEC-2012)
 *  @ requires jQuery v1.8.0 or later 
 *  @ License: the semi-colon before function invocation is a safety net against concatenated
 *           scripts and/or other plugins which may not be closed properly. 
 */
(function($) {
    
    // Validator
    $.nj.validator = {};
    
    // Not Null Check
    $.nj.validator._is_not_null = function( str ) {
        return ( str && str != '' && str != null );
    };
    
    // Not Null Check    
    $.nj.validator.isNull = function( str ) {
        return !$.nj.validator._is_not_null(str);       
    };
    
    // IS URL
    $.nj.validator.isUrl = function( str ) {
        if($.nj.validator.isNull( str )) 
            return null;
        var regExp = /(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/; 
        return regExp.test(str);
    };
    
    // to lower case
    $.nj.validator._to_lower_case = function( str ) {
        return ( str + '' ).toLowerCase();
    };    
    
    // Char length
    $.nj.validator._get_byte_length = function( str ) {
        var byteLength = 0;
        for ( var i=0 ; i<str.length ; i++ ){
            var ch = escape( str.charAt( i ) );
            if( ch.length == 1 ){ 
                byteLength++;
            } else if ( ch.indexOf( "%u" ) != -1 ) {
                byteLength += 2;
            } else if ( ch.indexOf( "%" ) != -1 ) {
                byteLength += ch.length / 3;
            }
        }
        return byteLength;
    };
    
    // Is Number
    $.nj.validator._is_number = function( str ) {
        str = (str += '').replace( /^\s*|\s*$/g, '' ); // trim
        
        if( str == '' ) return false;
        var re = /^[0-9]*$/;
        return re.test( str );
    };
    
    // Is Number
    $.nj.validator._checkObj_numberOnly = function( obj ) {
        return $.nj.validator._is_number( $(obj).validator() );
    };
    
    // Is Date
    $.nj.validator._is_date = function( str ) {
        while(str.indexOf('-')>=0){ str = str.replace('-', ''); }      
        return $.nj.validator._is_date8(str);
    };
    
    // Is Date8
    $.nj.validator._is_date8 = function( str ) {
        if(str.length != 8) return false;

        var yyyy = str.substring(0, 4);
        
        /* 12월일 경우 날짜 생성해서 보면 getMonth()로 보면 0으로 리턴되므로 1을 빼준다. */
        var mm = str.substring(4, 6) - 1;
        var dd = str.substring(6);
        var checkDate = new Date( yyyy, mm, dd );

        if ( checkDate.getFullYear() != yyyy ||    checkDate.getMonth() != mm || checkDate.getDate() != dd ){
            return false;
        }
        
        return true;   
    };
    
    $.nj.validator._checkObj_notNull = function( obj ) {
        
        var val = ($(obj).validator()+'').replace( /^\s*|\s*$/g, '' ); // trim
        if ($.nj.validator._is_notNull(val)) {

            //alert('tag='+$(obj).get(0).tagName+', size='+$(obj).attr('size')+', name='+$(obj).attr('name')+', id='+$(obj).attr('id')+', title='+$(obj).attr('title')+', type='+$(obj).attr('type')+', val='+$(obj).validator()+', notNull='+$(obj).attr('notNull'));
            if ( $(obj).get(0).tagName.toLowerCase() == 'select' && $(obj).attr( 'size' ) > 0 ) {
                return ( val == 'null' ? false : true );
            } else {
                return true;
            }
        } else {
            return false;
        }
    };
        
    // Is Email
    $.nj.validator._is_email = function( str ){
        var re = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
        return re.test(str);
    };
    
    // Check Byte
    $.nj.validator._check_byte = function( str, size, isMax ){
        var checkLength = parseInt(size);
        var byteLength = $.nj.validator._get_byte_length(str);
        if( isMax ) {
            return (byteLength <= checkLength ? false : true);
        } else {
            return (byteLength >= checkLength ? false : true);
        }
    };
    
    // str > size
    $.nj.validator.checkByteEqualGreater = function( str, size ) {
        return $.nj.validator._check_byte( str, size, true);
    };
    
    // str < size
    $.nj.validator.checkByteEqualLower = function( str, size) {
        return $.nj.validator._check_byte( str, size, false);
    };
    
    // str1 <= str <= str2
    $.nj.validator.checkByteBetween = function( str, size1, size2 ) {
        return !$.nj.validator._check_byte( str, size1, false ) && !$.nj.validator._check_byte( str, size2, true );
    };
    
    // Check Type
    $.nj.validator.checkType = function( str, methodType ){
        var userchar = '';
        var chartypeReg = "";
        
        switch(methodType) {
            case "num":
                chartypeReg = "^([0-9]" + userchar + ")+$";
                break;
            case "eng":
                chartypeReg = "^([a-zA-Z]" + userchar + ")+$" ;
                break;
            case "engnum":
                chartypeReg = "^([a-zA-Z0-9]" + userchar + ")+$";
                break;              
            case "kor":
                chartypeReg = "^([\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]" + userchar + ")+$";
                break;
            case "kornum":
                chartypeReg = "^([\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]|\\d" + userchar + ")+$";
                break;
            case "koreng":
                chartypeReg = "^([\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]|[a-zA-Z]" + userchar + ")+$";
                break;  
            case "korengnum":
                chartypeReg = "^([\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]|[a-zA-Z]|\\d" + userchar + ")+$";
                break;  
            case "date":
                return $.nj.validator._is_date(str);
            case "email":
                return $.nj.validator._is_email(str);
            default:
                break;
        }       
        
        var chkReg = new RegExp(chartypeReg);
        if(str.length > 0 && !chkReg.test(str)) {
            return false;
        }
        return true;
    };
    
})(jQuery);