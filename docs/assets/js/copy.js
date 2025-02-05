document.addEventListener("DOMContentLoaded", function () {
    hljs.highlightAll(); // Run syntax highlighting first

    // Reapply original-code and added-line classes
    document.querySelectorAll(".original-code").forEach(originalElement => {
        let highlightedElements = originalElement.parentNode.querySelectorAll("span");

        highlightedElements.forEach(span => {
            span.classList.add("original-code");
        });
    });

    document.querySelectorAll(".added-line").forEach(addedElement => {
        let highlightedElements = addedElement.parentNode.querySelectorAll("span");

        highlightedElements.forEach(span => {
            span.classList.add("added-line");
        });
    });

    // ✅ Fix the Toggle Function
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            originalCode.forEach(line => {
                line.classList.toggle("hidden");
            });

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });
});
