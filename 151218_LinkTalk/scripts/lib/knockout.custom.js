	ko.bindingHandlers.slideVisible = {
		update: function(element, valueAccessor, allBindingsAccessor) {
			var allBindings = allBindingsAccessor();
			var duration = allBindings.slideDuration || 400;
			if (ko.utils.unwrapObservable(valueAccessor())) { 
				$(element).slideDown(duration);
			} else {
				$(element).slideUp(duration);
			}
		}
	};

	ko.bindingHandlers.textWithReturn = {
		update: function(element, valueAccessor, allBindingsAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			var text = null;
			var requireEllipsis = false;
			if (typeof value=='object') {
				text = value.text;
				if (value.characters) {
					requireEllipsis = true;
				}
			} else {
				text = value;
			}
			if (text) {
				text = $.nj.replaceBRtoReturn(text);
			}
			text = $.nj.escapeHtml(text);
			text = $.nj.replaceReturnToBR(text);
			ko.bindingHandlers.html.update(element, function () {
				return requireEllipsis ? $.nj.substring(text, value.characters, '...') : text; 
			});
		}
	};

	ko.bindingHandlers.ellipsis = {
		update: function(element, valueAccessor, allBindingsAccessor) {
			var originalText = ko.utils.unwrapObservable(valueAccessor());
			originalText = $.nj.escapeHtml(originalText);
			var allBindings = allBindingsAccessor();
			var lines = allBindings.lines || 3;
			ko.bindingHandlers.text.update(element, function () {
				return originalText; 
			});
			$(element).ellipsis({
				lines: lines,
				ellipClass: 'ellip'
			});
		}
	};

	ko.bindingHandlers.enterKeyPress = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			$(element).keypress(function(e) {
				if (e.which === 13) {
					value.call();
				}
			});
		}
	};
