(function ($) {
    $.fn.limitkeypress = function (options) {
        var defaults = { rexp: /^[-+]?\d*\.?\d*$/ }; var options = $.extend(defaults, options); return this.each(function () {
            var regExpression = options.rexp; $(this).blur(function () { sanitize(this); }); $(this).keypress(function (e) {
                if (e.which == "0" || e.which == "8" || e.which == "13" || e.ctrlKey || e.altKey) { return; }
                sanitizeWithSelection(this); var pressedChar = String.fromCharCode(e.which), updatedInput = this.value.substring(0, getSelectionStart(this)) + pressedChar + this.value.substring(getSelectionEnd(this), this.value.length); if (!regExpression.test(updatedInput)) { e.preventDefault(); return; }
                return;
            }); function sanitizeWithSelection(o) {
                var startCaretPos = getSelectionStart(o), endCaretPos = getSelectionEnd(o), temp = "", testPlusChar = "", selectionCharInfo = []; for (i = 0; i < o.value.length; i++) { if (startCaretPos > i) { selectionCharInfo[i] = 'beforeSelection'; } else if ((startCaretPos <= i) && (endCaretPos > i)) { selectionCharInfo[i] = 'inSelection'; } }
                for (i = 0; i < o.value.length; i++) { var iPlusOne = i + 1; testPlusChar += o.value.substring(i, iPlusOne); if ((!regExpression.test(testPlusChar))) { var lastChar = testPlusChar.length - 1; temp = testPlusChar.substring(0, lastChar); testPlusChar = temp; if (selectionCharInfo[i] == 'beforeSelection') { startCaretPos = startCaretPos - 1; endCaretPos = endCaretPos - 1; } else if (selectionCharInfo[i] == 'inSelection') { endCaretPos = endCaretPos - 1; } } }
                o.value = testPlusChar; setSelectionRange(o, startCaretPos, endCaretPos);
            }
            function sanitize(o) {
                var temp = "", testPlusChar = ""; for (i = 0; i < o.value.length; i++) { var iPlusOne = i + 1; testPlusChar += o.value.substring(i, iPlusOne); if ((!regExpression.test(testPlusChar))) { var lastChar = testPlusChar.length - 1; temp = testPlusChar.substring(0, lastChar); testPlusChar = temp; } }
                o.value = testPlusChar;
            }
            function getSelectionStart(o) {
                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate()
                    r.moveEnd('character', o.value.length)
                    if (r.text == '') return o.value.length
                    return o.value.lastIndexOf(r.text)
                } else return o.selectionStart
            }
            function getSelectionEnd(o) {
                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate()
                    r.moveStart('character', -o.value.length)
                    return r.text.length
                } else return o.selectionEnd
            }
            function setSelectionRange(input, selectionStart, selectionEnd) {
                if (input.setSelectionRange) { input.focus(); input.setSelectionRange(selectionStart, selectionEnd); }
                else if (input.createTextRange) { var range = input.createTextRange(); range.collapse(true); range.moveEnd('character', selectionEnd); range.moveStart('character', selectionStart); range.select(); }
            }
        });
    };
})(jQuery);