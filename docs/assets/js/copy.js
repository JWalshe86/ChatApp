document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            codeBlock.classList.toggle("expanded");

            let codeElement = codeBlock.querySelector("pre code");

            // ✅ Reapply syntax highlighting after expansion
            if (typeof hljs !== "undefined") {
                hljs.highlightElement(codeElement); 
            }
            if (typeof Prism !== "undefined") {
                Prism.highlightElement(codeElement);
            }
        });
    });
});
