document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✨ Apply Highlight.js first
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
                    ? `<span class="added-line">${line.substring(1).trim()}</span>` // ✅ Remove `+` from code, but keep styling
                    : `<span class="original-code hidden">${line}</span>`
            )
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");

    // ✅ Fix Expand Button for SVG-based UI
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

            // ✅ Instead of changing text, toggle an "expanded" class
            this.classList.toggle("expanded");

            // Optional: Change the SVG icon based on the state
            let icon = this.querySelector("svg path");
            if (icon) {
                if (this.classList.contains("expanded")) {
                    icon.setAttribute("d", "M2 6h12M2 10h12"); // Example collapse icon
                } else {
                    icon.setAttribute("d", "M2 6h12M2 10h12M2 14h12"); // Example expand icon
                }
            }
        });
    });

    // ✅ Fix Copy Button (so it doesn't copy the `+` signs)
    document.querySelectorAll(".copy-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let codeText = [...codeBlock.querySelectorAll("code .added-line, code .original-code")]
                .map(span => span.textContent.replace(/^\+\s*/, "")) // ✅ Remove the `+` when copying
                .join("\n");

            navigator.clipboard.writeText(codeText).then(() => {
                console.log("✅ Code copied!");
            }).catch(err => console.error("❌ Copy failed", err));
        });
    });
});
