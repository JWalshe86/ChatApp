document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 📝 Normalize Whitespace & Apply Syntax Highlighting
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML
            .trim()
            .split(/\n+/) // Normalize multiple newlines
            .map(line => line.trim()); // Trim each line

        block.innerHTML = lines.map((line) => {
            let trimmed = line.trim();

            if (trimmed.startsWith("+")) {
                return `<div class="added-line"><span class="diff-symbol">+</span> ${trimmed.substring(1).trim()}</div>`;
            } else if (trimmed.startsWith("-")) {
                return `<div class="removed-line"><span class="diff-symbol">-</span> ${trimmed.substring(1).trim()}</div>`;
            }

            // ✅ Ensure tooltip stays inside added-line and doesn't get wrapped as original-code
            if (trimmed.includes("_context = context;")) {
                return `<div class="added-line tooltip-container">
                            <span class="tooltip-trigger">${trimmed}</span>
                            <span class="tooltip">Assigns the injected database context to the private field for use in this class.</span>
                        </div>`;
            }

            return `<div class="original-code hidden">${line}</div>`; // Ensures only unchanged lines are marked as original
        }).join("\n");
    });

    // ✅ Delay Highlight.js execution to avoid interfering with transformations
    setTimeout(() => {
        document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
    }, 200);

    // 🔽 Handle Expand/Collapse
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeContainer = button.closest(".code-block").querySelector(".code-content");

            if (codeContainer.style.maxHeight) {
                codeContainer.style.maxHeight = null; // Collapse
                button.innerHTML = "🔽 Show Original Code...";
            } else {
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Expand
                button.innerHTML = "🔼 Hide Original Code...";
            }
        });
    });

    // 📝 GitHub-Style Copy Button
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            // Collect visible lines (both original & updated)
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
