document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // 🛠 Preserve entire lines before Highlight.js modifies them
    document.querySelectorAll("pre code").forEach((block) => {
        block.innerHTML = block.innerHTML
            .split("\n")
            .map((line) =>
                line.trim().startsWith("+") // If line is an addition
                    ? `<span class="added-line">${line}</span>` // Preserve added lines
                    : `<span class="original-code hidden">${line}</span>` // Preserve original lines
            )
            .join("\n");
    });

    console.log("Injected .original-code into pre code blocks.");

    // ✨ Apply Highlight.js AFTER ensuring original-code is present
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // ✅ Fix Expand Button
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Toggle clicked!");
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            console.log("Original code found:", originalCode);

            if (originalCode.length === 0) {
                console.warn("⚠ No original code elements found. Check HTML.");
                return;
            }

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });
});
