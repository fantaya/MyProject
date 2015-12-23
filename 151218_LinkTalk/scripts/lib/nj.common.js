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

	var $window = $(window);
	var $document = $(document);
	
	// Backspace: 8
	// Tab: 9
	// Enter: 13
	// SpaceBar: 32 
	// PageUp: 33, PageDown: 34
	// Home: 36, End: 35
	// Left: 37, Up: 38, Right: 39, Down: 40
	var eventKeys = [8, 9, 13, 32, 33, 34, 35, 36, 37, 38, 39, 40];

	// Context
	$.context = '/';

	// Global
	$.nj = {};

	// Data
	$.nj.data = {};
	// Tiles
	$.nj.tiles = {};

	// Alert
	var defaultAlertType = "alert";
	var customAlertFunc = function (message) {
		alert(message);
	};
	$.nj.alert = function(args, args2) {
		var alertType = defaultAlertType;
		var focusObj = null;
		var href = null;
		var message = null;
		var params = args;
		if (typeof args=='string') {
			message = args;
			params = args2;
		}
		if (params) {
			if (typeof params.message!='undefined') {
				message = params.message;
			}
			if (typeof params.alertType!='undefined') {
				alertType = params.alertType;
			}
			if (typeof params.focusObj!='undefined') {
				focusObj = params.focusObj;
			}
			if (typeof params.href!='undefined') {
				href = params.href;
			}
		}
		//focus
		if(!href && focusObj && $(focusObj).attr('type') != 'hidden') {
			$(focusObj).focus();
		}
		//display alert
		if (alertType === 'alert') {
			alert(message);
		} else {
			customAlertFunc(message);
		}
		//redirect
		if (href) {
			document.location.href = href;
		}
	};

	/*
	 * Get locale
	 */
	$.nj.getLocale = function() {
		if (navigator) {
			if (navigator.language) {
				return navigator.language;
			} else if (navigator.browserLanguage) {
				return navigator.browserLanguage;
			} else if (navigator.systemLanguage) {
				return navigator.systemLanguage;
			} else if (navigator.userLanguage) {
				return navigator.userLanguage;
			}
		}
	};

	var normalizeExtension = function(ext) {
		var normalized = '';
		if (ext) {
			var target = $.trim(ext).toLowerCase();
			if (target==='bmp') {
				normalized = 'bmp';
			} else if (target==='doc' || target==='docx') {
				normalized = 'doc';
			} else if (target==='gif') {
				normalized = 'gif';
			} else if (target==='hwp') {
				normalized = 'hwp';
			} else if (target==='jpg' || target==='jpeg') {
				normalized = 'jpg';
			} else if (target==='pdf') {
				normalized = 'pdf';
			} else if (target==='png') {
				normalized = 'png';
			} else if (target==='ppt' || target==='pptx') {
				normalized = 'ppt';
			} else if (target==='xls' || target==='xlsx') {
				normalized = 'xls';
			} else if (target==='zip' || target==='zip') {
				normalized = 'zip';
			}
		}
		return normalized;
	};

	/*
	 * Get getAttachmentExt
	 */
	$.nj.getAttachmentExt = function(fileName){
		if( fileName.indexOf(".") <= 0) { 
			return '';
		};
		var ext = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
		return normalizeExtension(ext);
	};

	var fileExtensionImageList = ['bmp', 'gif', 'jpg', 'jpeg', 'png'];
	// 이미지 파일 인지 반환
	$.nj.isImageExt = function(fileName, isFullName) {
		var fileExtName = $.trim(fileName).toLowerCase();
		if (!fileExtName || fileExtName=='') {
			return false;
		}
		if (typeof isFullName=='undefined' || isFullName) {
			fileExtName = $.nj.getAttachmentExt( fileName );
		} else {
			fileExtName = fileName;
		}
		if ($.inArray(fileExtName, fileExtensionImageList) > -1) {
			return true;
		} else { 
			return false;
		}
	};

	var fileExtensionRequirePDFView = ['doc', 'ppt', 'pdf', 'hwp'];
	//PDFViewer
	$.nj.requirePDFView = function(fileExtension) {
		var target = normalizeExtension(fileExtension);
		if (!target || target=='') {
			return false;
		}
		if ($.inArray(target, fileExtensionRequirePDFView) > -1) {
			return true;
		} else { 
			return false;
		}
	};

	var fileExtensionSmallIconList = ['bmp', 'doc', 'gif', 'hwp', 'jpg', 'pdf', 'png', 'ppt', 'xls', 'zip'];

	$.nj.fileExtensionSmallIcon = function(fileExtension) {
		var normalized = normalizeExtension(fileExtension);
		if($.inArray(normalized, fileExtensionSmallIconList) > -1) {
			return '/images/file/file-extension-'+normalized+'-icon-s.png';
		}
		return '/images/file/file-extension-etc-icon-s.png';
	};

	var fileExtensionIconList = ['bmp', 'doc', 'gif', 'hwp', 'jpg', 'pdf', 'png', 'ppt', 'xls', 'zip'];

	$.nj.fileExtensionIcon = function(fileExtension) {
		var normalized = normalizeExtension(fileExtension);
		if($.inArray(normalized, fileExtensionIconList) > -1) {
			return '/images/file/file-extension-'+normalized+'-icon.png';
		}
		return '/images/file/file-extension-etc-icon.png';
	};

	// log
	$.nj.log = function(jsonData, descStr) {
		if (descStr && descStr != undefined) {
			$.nj.alert("[" + descStr + "] : " + JSON.stringify(jsonData));
		} else {
			$.nj.alert(JSON.stringify(jsonData));
		}
	};

	// Common Json Function
	$.nj.json = function(url, params, type) {
		var requestType = 'GET';
		if (typeof type != 'undefined') {
			requestType = type;
		}

		var dfd = $.Deferred();

		$.ajax({
			type: requestType,
			url: url,
			data: params,
			dataType: 'json'
		}).done(function(data) {
			if(data && data.status == "200") {
				//return Success
				dfd.resolve(data);
			} else {
				if (data && data['status-message']) {
					//Alert Somthing
					$.nj.alert(data['status-message']);
				} else {
					$.nj.alert('시스템 오류입니다. 빠른 시간내에 조치하겠습니다.');
				}
				dfd.reject(data);
			}//:~if(data.status == "200") {
		}).fail(function(request, status, error) {
			//$.nj.alert("Unable to connect the server.[" + url +"]");
		});
		return dfd.promise();
	};

	$.nj.upload = function (url, fileElement, args) {
		$.ajaxFileUpload({
			url : url,
			secureuri : false,
			fileElement : fileElement,
			dataType : 'json',
			data : (args && args.data)? args.data : undefined,
			success : function(data, status) {
				if(data && data.status == "200") {
					if (args && typeof args.successCallback=='function') {
						args.successCallback(data);
					}
				} else if (data && data['status-message']) {
					//Alert Somthing
					$.nj.alert(data['status-message']);
				} else {
					$.nj.alert('시스템 오류입니다. 빠른 시간내에 조치하겠습니다.');
				}//:~if(data.status == "200") {
			},
			error : function(data, status, e) {
				if (args && typeof args.failCallback=='function') {
					args.failCallback();
				}
				//$.nj.alert(e);
				$.nj.alert('시스템 오류입니다. 빠른 시간내에 조치하겠습니다.');
			},
			complete : function() {
				if (args && typeof args.completeCallback=='function') {
					args.completeCallback();
				}
			}
		});
	};
	

    // noImage 출력
    $.nj.noImage = function( obj, type ) {
        if(obj) {
            // TitleUser 47 x 47
            if(type && type == "T") {
                obj.src = $.context + "/images/no_images.png";
            // profile 32 x 32
            } else if(type && type == "U") {
                obj.src = $.context + "/images/no_images.png";
            // link
            } else if(type && type == "L") {
                obj.src = $.context + "/images/no_images.png";
            // preview
            } else if(type && type == "P") {
                obj.src = $.context + "/images/no_images.png";
            } else {
                obj.src = $.context + "/images/no_images.png";
            }
        }
    };

	// byte를 MB로 변환
	$.nj.getMbyte = function(size) {
		var unitArray = ['Byte', 'KB', 'MB', 'GB', 'TB'];
		if (size<=0) {
			return 0 + unitArray[0];
		}
		var i = Math.floor( Math.log(size) / Math.log(1024) );
		if (i>=unitArray.length) {
			i = unitArray.length-1;
		}
		var readable = (Math.floor(( size / Math.pow(1024, i) ) * 10) /10).toFixed(1)*1/1;
		var reg = /(^[+-]?\d+)(\d{3})/;
		readable += '';

		while (reg.test(readable)) {
			readable = readable.replace(reg, '$1' + ',' + '$2');
		}
		return readable + unitArray[i];
	};

    // cut String
    $.nj.substring = function( src, cutLength, replaceStr ) {
        if(!src || src == undefined || src == "null") return "";
        var cur = 0;
        for (var i=0; i < src.length; i++) {
            cur += (src.charCodeAt(i) > 128) ? 2 : 1;
            if (cur > cutLength){
            	return src.substring(0, i) + replaceStr;
            } 
                
        }
        return src;
    };
    
    $.nj.searchSubstring = function( src, search, replaceStr ) {
        if(!src || src == undefined || src == "null") return "";
        var sStr = '';
        if(src.length > 70){
        	var iValue = src.indexOf(search);
    		sStr = replaceStr+src.substring(iValue , src.length).replace(search, '<span class="highlight">'+search+'</span>');
        }else{
        	sStr = src.replace(search, '<span class="highlight">'+search+'</span>');
        }
        return sStr;
    };
    
    /**
     * 화면 중앙에 팝업 생성
     * 
     * @param url 팝업 URL
     * @param name 팝업명
     * @param width 가로크기
     * @param height 세로크기
     * @param scroll yes/no
     * @param resizable yes/no
     */    
    $.nj.popup = function(url, name, width, height, scrollbars, resizable) {
        if(!scrollbars) scrollbars = "no";
        if(!resizable) resizable = "no";
        window.open(url, name,
                "width=" + width + ", height=" + height
                + ", left=" + (screen.width/2-parseInt(width)/2) + ", top=" + (screen.height/2-parseInt(height)/2)
                + ", scrollbars=" + scrollbars + ", resizable=" + resizable
                + ", toolbar=no, directories=no, status=no, menubar=no");
    };

	/**
	 * 본인여부 체크 : 같다 하더라도 API에서 거르니 걱정말라.
	 */
	$.nj.isAvailContents = function( deleteYn, userKey ) {
		if( deleteYn != 'N' ) return "D";
		if( $.loginUserKey == userKey ) return "U";
		else return "V";
	};

	// \n --> <BR/>
	$.nj.carriageReturnHtml = function( src ){
		if( src && src != undefined && src != null) {
			var replaceStr = src.replace(/\n/g, "<br />");
			// find url
			replaceStr = replaceStr.replace(/((http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/g, "<a href='$1' target='_blank'>$1</a>");
			return replaceStr;
		}
		return '';
	};

	$.nj.contentsPrint = function( contentsKey ){
		var url ="/print/"+$.currentGroup.companyName()+"/"+$.currentGroup.fieldName()+"/"+$.currentGroup.groupName()+"/"+contentsKey;
		$.nj.popup(url , "print" , "500" , "500" , "yes" , "yes");
	};

	$.nj.getDownload = function( companyKey , fieldKey , groupKey , fileName , fileOrgName){
		return '/api/download/'+ companyKey +'/'+ fieldKey +'/'+ groupKey+'?fileName='+fileName+'&fileOrgName='+fileOrgName; 
	};

	$.nj.fileDownload = function (src) {
		location.href = src;
	};

	$.nj.replaceBRtoReturn = function(src) {
		if (src) {
			return src.replace(/\<br\s*\>/g, '\r\n');
		}
		return '';
	};

	$.nj.replaceReturnToBR = function(src) {
		if (src) {
			return src.replace(/\r\n/g, '<br />').replace(/\r/g, '<br />').replace(/\n/g, '<br />');
		}
		return '';
	};

	$.nj.escapeHtml = function(src) {
		if (src) {
			return src.replace(/&/g, '&amp;')
			.replace(/>/g, '&gt;')
			.replace(/</g, '&lt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
		}
		return '';
	};

	var keydownEventHandler = function(e) {
		for (var i = 0; i < eventKeys.length; i++) {
			if (e.keyCode === eventKeys[i]) {
				e.preventDefault();
				return;
			}
		}
	};

	$.nj.disableScroll = function() {
		$window.on("mousewheel.nj.disableScroll DOMMouseScroll.nj.disableScroll", function(e) {
			e.preventDefault();
			return;
		});
		$document.on("mousewheel.nj.disableScroll DOMMouseScroll.nj.disableScroll", function(e) {
			e.preventDefault();
			return;
		});
		$window.on("keydown.nj.disableScroll", function(e) {
			keydownEventHandler(e);
			return;
		});
		$document.on("keydown.nj.disableScroll", function(e) {
			keydownEventHandler(e);
			return;
		});
	};

	$.nj.enableScroll = function() {
		$window.off(".nj.disableScroll");
		$document.off(".nj.disableScroll");
	};

})(jQuery);