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

    // 🔄 Restore our classes after Highlight.js modifies the DOM
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

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });
});
