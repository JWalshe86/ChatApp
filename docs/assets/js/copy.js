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

        // ✅ Toggle "expanded" class
        this.classList.toggle("expanded");

        // ✅ Fix SVG Icon Change
        let icon = this.querySelector("svg");
        let path = icon.querySelector("path");

        if (this.classList.contains("expanded")) {
            // Switch to "fold" (collapse) icon
            icon.classList.replace("octicon-unfold", "octicon-fold");
            path.setAttribute("d", "M10.896 2H8.75V.75a.75.75 0 0 0-1.5 0V2H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 2Z");
        } else {
            // Switch to "unfold" (expand) icon
            icon.classList.replace("octicon-fold", "octicon-unfold");
            path.setAttribute("d", "m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0Z");
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

}); // ✅ Closing `DOMContentLoaded` event listener
