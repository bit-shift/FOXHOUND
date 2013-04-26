self.on("message", function(flashText) {
    var flasherContainer = document.getElementById("foxhound-flasher-container");
    var flasher = document.getElementById("foxhound-flasher");

    if(!flasher) {
        flasherContainer = document.createElement("div");
        flasherContainer.id = "foxhound-flasher-container";

        var flasherCloser = document.createElement("button");
        flasherCloser.textContent = "Close";
        flasherCloser.addEventListener("click", function() {
            flasherContainer.classList.remove("active");
        });

        flasher = document.createElement("p");
        flasher.id = "foxhound-flasher";

        flasherContainer.appendChild(flasherCloser);
        flasherContainer.appendChild(flasher);
        document.body.appendChild(flasherContainer);
    }

    flasherContainer.classList.add("active");
    flasher.textContent = flashText;
});
