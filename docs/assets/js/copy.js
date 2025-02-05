document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running"); // ✅ Debugging: Check if script loads

    // ✅ Debugging: Check if expand buttons exist
    let expandButtons = document.querySelectorAll(".expand-button");
    console.log("Found expand buttons:", expandButtons);

    if (expandButtons.length === 0) {
        console.warn("No expand buttons found! Check HTML structure.");
        return; // Stop execution if buttons are missing
    }

    // ✅ Preserve custom classes before Highlight.js runs
    document.querySelectorAll("pre code").forEach((block) => {
        block.innerHTML = block.innerHTML.replace(
            /<span class="(added-line|original-code)">(.*?)<\/span>/g,
            (match, className, content) =>
                `<span data-custom-class="${className}">${content}</span>`
        );
    });

    // ✅ Apply Highlight.js syntax highlighting
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    // ✅ Restore classes after Highlight.js runs
    document.querySelectorAll("pre code span[data-custom-class]").forEach((span) => {
        span.classList.add(span.getAttribute("data-custom-class"));
        span.removeAttribute("data-custom-class");
    });

    // ✅ Add event listeners for toggle button
    expandButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Toggle clicked!"); // ✅ Debugging: Check if button works
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            console.log("Original code found:", originalCode);

            if (originalCode.length === 0) {
                console.warn("No original code elements found. Check HTML.");
                return;
            }

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // Ensure Highlight.js doesn't strip custom classes
            applyHighlightingFix(codeBlock);

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });

    // ✅ Function to reapply styles after Highlight.js modifies DOM
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

    // ✅ Ensure the styles are applied initially
    document.querySelectorAll(".code-block").forEach(block => applyHighlightingFix(block));
});
