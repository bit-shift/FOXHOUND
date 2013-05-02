self.on('click', function() {
    self.postMessage(window.getSelection().toString().replace(/./g, function(c) {
        if((c.toLowerCase() >= 'a') && (c.toLowerCase() <= 'm')) {
            return String.fromCharCode(c.charCodeAt() + 13);
        } else if((c.toLowerCase() >= 'n') && (c.toLowerCase() <= 'z')) {
            return String.fromCharCode(c.charCodeAt() - 13);
        } else {
            return c;
        }
    }));
});
