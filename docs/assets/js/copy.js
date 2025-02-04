document.querySelectorAll(".expand-button").forEach(button => {
    button.addEventListener("click", function () {
        let codeBlock = button.closest(".code-block");
        codeBlock.classList.toggle("expanded");

        let codeElement = codeBlock.querySelector("pre code");
        if (!codeElement) return;

        // ✅ Wait a moment before applying highlighting
        setTimeout(() => {
            if (typeof hljs !== "undefined") {
                hljs.highlightElement(codeElement);
                console.log("Highlight.js applied to expanded block");
            }
        }, 100);
    });
});
