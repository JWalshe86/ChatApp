document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✨ Apply Highlight.js first
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // 🛠 AFTER Highlight.js runs, inject `.original-code` where needed
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) =>
                line.trim().startsWith("+") // If line starts with `+`, it's an addition
                    ? `<span class="added-line">${line.substring(1).trim()}</span>` // ✅ Keep new code
                    : `<span class="original-code hidden">${line}</span>` // ❌ Hide original code initially
            )
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");

    // ✅ Expand Button Click Event - Toggle original code visibility
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Expand button clicked");

            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            if (originalCode.length === 0) {
                console.warn("⚠ No original code elements found. Check HTML.");
                return;
            }

            // ✅ Toggle visibility of original code
            let isExpanded = [...originalCode].some(line => line.classList.contains("hidden"));

            originalCode.forEach((line) => {
                line.classList.toggle("hidden", !isExpanded);
            });

            // ✅ Toggle Expand/Collapse Text
            this.textContent = isExpanded ? "Collapse" : "Expand";

            console.log(`🔄 Toggled original code, isExpanded: ${isExpanded}`);
        });
    });
});
