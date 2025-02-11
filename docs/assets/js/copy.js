document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 🖌️ Apply Syntax Highlighting (only for elements without 'nohighlight')
    document.querySelectorAll("pre code:not(.nohighlight)").forEach((block) => {
        hljs.highlightElement(block);

        // ✅ Ensure Highlight.js does NOT strip tooltips inside added-line
        block.querySelectorAll(".tooltip-container").forEach((tooltip) => {
            tooltip.classList.add("nohighlight");
        });
    });

    setTimeout(() => {
    document.querySelectorAll(".added-line").forEach((line) => {
        let content = line.innerHTML;

        // Ensure tooltips are restored inside added-line
        if (content.includes("tooltip-trigger")) {
            line.innerHTML = `<span class="tooltip-container">${content}</span>`;
        }
    });
}, 500);


    // 🖌️ Track Diff Changes & Keep Tooltips
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n").map(line => line.trim()).filter(line => line !== ""); // ✅ Trim & remove blank lines

        block.innerHTML = lines
            .map((line) => {
                if (line.startsWith("+")) {
                    return `<div class="added-line"><span class="diff-symbol">+</span> ${line.substring(1).trim()}</div>`;
                } else if (line.startsWith("-")) {
                    return `<div class="removed-line"><span class="diff-symbol">-</span> ${line.substring(1).trim()}</div>`;
                }

                if (line.includes("_context = context;")) {
                    return `<div class="added-line tooltip-container">
                                <span class="tooltip-trigger">${line}
                                    <span class="tooltip">Assigns the injected database context to the private field for use in this class.</span>
                                </span>
                            </div>`;
                }

                return `<div class="original-code hidden">${line}</div>`;
            })
            .join("\n");

        console.log("✅ Updated script applied, empty lines removed!");
    });

    // ✅ Extra Cleanup: Remove any remaining empty `.original-code.hidden` or `.added-line` elements
    document.querySelectorAll(".original-code.hidden, .added-line").forEach(el => {
        if (!el.textContent.trim()) {
            el.remove();
            console.log("❌ Removed empty element:", el);
        }
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

  
