self.on("click", function() {
    var utf8_sel = unescape(encodeURIComponent(window.getSelection().toString()));
    self.postMessage(window.btoa(utf8_sel));
});
