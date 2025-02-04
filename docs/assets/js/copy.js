document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            codeBlock.classList.toggle("expanded");

            // ✅ Select the <code> element inside the expanded block
            let codeElement = codeBlock.querySelector("pre code");

            // ✅ Clear previous highlighting classes
            codeElement.classList.remove("hljs"); // If using Highlight.js
            codeElement.classList.remove("language-csharp"); // If using Prism.js

            // ✅ Delay to allow reflow before reapplying syntax highlighting
            setTimeout(() => {
                if (typeof hljs !== "undefined") {
                    hljs.highlightElement(codeElement); // 🔹 For Highlight.js
                }
                if (typeof Prism !== "undefined") {
                    Prism.highlightElement(codeElement); // 🔹 For Prism.js
                }
            }, 10); // Small delay to allow class toggle to take effect
        });
    });
});
