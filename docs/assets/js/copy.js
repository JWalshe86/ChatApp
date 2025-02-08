document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // Apply Highlight.js
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // Inject .original-code for full lines & ensure no gaps
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) => {
                if (line.trim().startsWith("+")) {
                    return `<span class="added-line">${line.substring(1).trim()}</span>`; // Remove `+`
                } else if (line.trim() !== "") {
                    return `<span class="original-code hidden">${line}</span>`; // Hide properly
                }
                return ""; // Prevent empty lines
            })
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");

    // ✅ Expand Button Fix with No Gaps
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Expand button clicked!");

            let codeBlock = this.closest(".code-block");
            let codeContainer = codeBlock.querySelector(".code-container");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            if (originalCode.length === 0) {
                console.warn("⚠ No original code elements found. Check HTML.");
                return;
            }

            let isExpanded = codeBlock.classList.toggle("expanded");

            if (isExpanded) {
                console.log("📂 Expanding...");
                originalCode.forEach(line => {
                    line.style.display = "inline"; // Show in-line to avoid gaps
                    line.style.height = "auto"; // Allow expansion naturally
                    line.classList.remove("hidden");
                });
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Smooth expand
            } else {
                console.log("📂 Collapsing...");
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Preserve height
                setTimeout(() => {
                    originalCode.forEach(line => {
                        line.style.display = "none"; // Hide fully with no gaps
                        line.style.height = "0"; 
                        line.classList.add("hidden");
                    });
                    codeContainer.style.maxHeight = "0px"; // Collapse smoothly
                }, 200);
            }

            // Toggle icons
            let unfoldIcon = this.querySelector(".unfold-icon");
            let foldIcon = this.querySelector(".fold-icon");

            if (unfoldIcon && foldIcon) {
                unfoldIcon.classList.toggle("hidden");
                foldIcon.classList.toggle("hidden");
            }
        });
    });

    console.log("✅ JavaScript fully loaded!");
});
