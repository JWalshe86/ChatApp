document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            codeBlock.classList.toggle("expanded");

            // ✅ Log expansion state
            console.log("Toggled expansion:", codeBlock.classList.contains("expanded"));

            // ✅ Select the <code> element inside the expanded block
            let codeElement = codeBlock.querySelector("pre code");
            if (!codeElement) {
                console.warn("Code element not found inside expanded block");
                return;
            }

            // ✅ Log before applying highlight
            console.log("Applying syntax highlighting to:", codeElement);

            // ✅ Clear previous highlighting classes
            codeElement.classList.remove("hljs"); // If using Highlight.js
            codeElement.classList.remove("language-csharp"); // If using Prism.js

            // ✅ Apply syntax highlighting after a short delay
            setTimeout(() => {
                if (typeof hljs !== "undefined") {
                    hljs.highlightElement(codeElement);
                    console.log("Highlight.js applied");
                }
                if (typeof Prism !== "undefined") {
                    Prism.highlightElement(codeElement);
                    console.log("Prism.js applied");
                }
            }, 50);
        });
    });
});
