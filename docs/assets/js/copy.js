document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 🖌️ Apply Syntax Highlighting & Track Diff Changes
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) => {
                let trimmed = line.trim();

                if (trimmed.startsWith("+")) {
                    return `<div class="added-line"><span class="diff-symbol">+</span> ${trimmed.substring(1).trim()}</div>`;
                } else if (trimmed.startsWith("-")) {
                    return `<div class="removed-line"><span class="diff-symbol">-</span> ${trimmed.substring(1).trim()}</div>`;
                }

                // ✅ Ensure `_context = context;` stays as updated code with tooltip
                if (trimmed.includes("_context = context;")) {
                    return `<div class="added-line tooltip-container">
                                <span class="tooltip-trigger">${trimmed}
                                    <span class="tooltip">Assigns the injected database context to the private field for use in this class.</span>
                                </span>
                            </div>`;
                }

                // ✅ Only wrap non-modified lines in `original-code`
                return `<div class="original-code hidden">${line}</div>`;
            })
            .join("\n");
    });

    // ✅ Prevent Highlight.js from affecting explanations
    document.querySelectorAll("pre code").forEach((block) => {
        block.innerHTML = block.innerHTML.replace(/(<span class="tooltip">.*?<\/span>)/g, "<!--hljs-ignore-->$1");
    });

    // ✅ Apply Highlight.js after modifications
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    // 🔄 Expand button functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // ✅ Toggle Expand/Collapse Icons
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    // 📝 Copy Button
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            // ✅ Collect all visible lines (both original and updated)
            let lines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = lines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();

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
