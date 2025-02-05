document.addEventListener("DOMContentLoaded", function () {
    // 🛠 Preserve custom classes before Highlight.js runs
    document.querySelectorAll("pre code").forEach((block) => {
        block.innerHTML = block.innerHTML.replace(
            /<span class="(added-line|original-code)">(.*?)<\/span>/g,
            (match, className, content) =>
                `<span data-custom-class="${className}">${content}</span>`
        );
    });

    // ✨ Apply Highlight.js (without `highlightAll` to avoid conflicts)
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    // 🔄 Restore classes after Highlight.js modifies the DOM
    document.querySelectorAll("pre code span[data-custom-class]").forEach((span) => {
        span.classList.add(span.getAttribute("data-custom-class"));
        span.removeAttribute("data-custom-class"); // Cleanup
    });

    // ✅ Fix Toggle Button
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // Ensure Highlight.js doesn't strip our classes
            applyHighlightingFix(codeBlock);

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });

    // 🚀 Function to reapply classes after Highlight.js modifies the DOM
    function applyHighlightingFix(container) {
        container.querySelectorAll(".hljs-keyword, .hljs-title, .hljs-string").forEach(span => {
            let parent = span.closest("span");

            if (parent) {
                if (parent.classList.contains("added-line")) {
                    span.classList.add("added-line");
                }
                if (parent.classList.contains("original-code")) {
                    span.classList.add("original-code");
                }
            }
        });
    }

    // 🔄 Reapply Highlight Fix on Page Load
    document.querySelectorAll(".code-block").forEach(block => applyHighlightingFix(block));
});
