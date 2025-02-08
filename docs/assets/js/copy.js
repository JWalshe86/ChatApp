document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // 🖌️ Apply Syntax Highlighting & Track Diff Changes BEFORE Highlight.js runs
    document.querySelectorAll("pre code").forEach((block) => {
        let lines = block.innerHTML.split("\n");
        let modifiedHTML = lines
            .map((line) => {
                let trimmed = line.trim();

                if (trimmed.startsWith("+")) {
                    return `<div class="added-line"><span class="diff-symbol">+</span> ${trimmed.substring(1).trim()}</div>`;
                } else if (trimmed.startsWith("-")) {
                    return `<div class="removed-line"><span class="diff-symbol">-</span> ${trimmed.substring(1).trim()}</div>`;
                }

                // ✅ Ensure tooltip stays inside the added-line
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

        block.innerHTML = modifiedHTML;
    });

    console.log("✅ Code transformations applied.");

    // ✅ Safe Highlight.js Execution (Prevents Crash)
    if (typeof hljs !== "undefined" && typeof hljs.highlightElement === "function") {
        console.log("Applying Highlight.js...");
        document.querySelectorAll("pre code").forEach((block) => {
            try {
                hljs.highlightElement(block);
            } catch (error) {
                console.error("⚠️ Highlight.js Error:", error);
            }
        });
    } else {
        console.warn("⚠️ Highlight.js not found. Skipping syntax highlighting.");
    }

    // 🔄 Expand button functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCodeLines = codeBlock.querySelectorAll(".original-code");

            originalCodeLines.forEach((line) => {
                line.classList.toggle("hidden");
            });

            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    console.log("✅ Expand button functionality added.");

    // 📝 Copy Button Functionality
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });

    console.log("✅ Copy button functionality added.");

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

    console.log("✅ Tooltip functionality added.");
});
