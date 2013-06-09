self.on("click", function() {
    var unicode_sel = decodeURIComponent(escape(window.getSelection().toString()));
    self.postMessage(window.atob(unicode_sel));
});
