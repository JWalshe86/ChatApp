document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✨ Apply Highlight.js FIRST
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // 🛠 AFTER Highlight.js runs, inject .original-code for full lines
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) =>
                line.trim().startsWith("+") // If line is an addition
                    ? `<span class="added-line">${line}</span>` // Preserve added lines
                    : `<span class="original-code hidden">${line}</span>` // Preserve original lines
            )
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");

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
