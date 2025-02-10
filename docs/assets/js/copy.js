document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 🖌️ Apply Syntax Highlighting (only for elements without 'nohighlight')
    document.querySelectorAll("pre code:not(.nohighlight)").forEach((block) => {
        hljs.highlightElement(block);
    });

    // ✅ Reapply added-line styles after Highlight.js modifies the DOM
    setTimeout(() => {
        document.querySelectorAll(".added-line").forEach((line) => {
            line.style.backgroundColor = "#e6ffed"; // Light green background
            line.style.borderLeft = "3px solid #28a745"; // Green left border
            line.style.display = "inline-block"; // Ensures full row highlighting
            line.style.width = "100%";
        });
    }, 500);

    // 🖌️ Track Diff Changes & Keep Tooltips
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

                // ✅ Keep tooltips inside the added-line
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
    });

    // 🔄 Expand Button Functionality
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

    // ✅ Ensure Highlight.js modifications don't override custom styles
    function applyHighlightingFix(container) {
        container.querySelectorAll(".hljs-keyword, .hljs-title, .hljs-string").forEach(span => {
            let parent = span.closest("span");

            if (parent) {
                if (parent.classList.contains("added-line")) {
                    span.classList.add("added-line");
                }
                if (parent.classList.contains("original-code")) {
                    span.classList.add("original-code");
                }
            }
        });
    }
});
