self.on("message", function(injectedCSS) {
    var styleElem = document.createElement("style");
    styleElem.innerHTML = injectedCSS;

    document.getElementsByTagName("head")[0].appendChild(styleElem);
});
