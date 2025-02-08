document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 🖌️ Apply Syntax Highlighting & Track Diff Changes BEFORE Highlight.js runs
    document.querySelectorAll("pre code").forEach((block) => {
        let lines = block.innerHTML.split("\n");

        // 🚀 Apply line modifications first
        let modifiedHTML = lines
            .map((line) => {
                let trimmed = line.trim();

                if (trimmed.startsWith("+")) {
                    return `<div class="added-line"><span class="diff-symbol">+</span> ${trimmed.substring(1).trim()}</div>`;
                } else if (trimmed.startsWith("-")) {
                    return `<div class="removed-line"><span class="diff-symbol">-</span> ${trimmed.substring(1).trim()}</div>`;
                }

                // ✅ Ensure tooltip stays inside added-line, NOT original-code
                if (trimmed.includes("_context = context;")) {
                    return `<div class="added-line tooltip-container">
                                <span class="tooltip-trigger">${trimmed}
                                    <span class="tooltip">Assigns the injected database context to the private field for use in this class.</span>
                                </span>
                            </div>`;
                }

                return `<div class="original-code hidden">${trimmed}</div>`;
            })
            .join("\n");

        // ✅ Replace block content BEFORE Highlight.js runs
        block.innerHTML = modifiedHTML;
    });

    // ✅ Only run Highlight.js if it's loaded
    if (typeof hljs !== "undefined" && hljs.highlightElement) {
        console.log("Applying Highlight.js...");
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });
    } else {
        console.warn("⚠️ Highlight.js is not loaded!");
    }

    // 🔄 Expand button functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCodeLines = codeBlock.querySelectorAll(".original-code");

            // Toggle visibility of original code
            originalCodeLines.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // Toggle expand/collapse icons
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    // 📝 Copy Button Functionality
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            // Collect all visible lines (both original and updated)
            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });

    // ℹ️ Tooltip Hover Effect
    document.querySelectorAll(".tooltip-trigger").forEach(trigger => {
        trigger.addEventListener("mouseover", function () {
            let tooltip = this.querySelector(".tooltip");
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
        });
        trigger.addEventListener("mouseout", function () {
            let tooltip = this.querySelector(".tooltip");
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        });
    });

});
