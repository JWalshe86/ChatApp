document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // Apply Highlight.js
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

            // 🚀 Fix: Keep the "added-line" class if already present!
            if (line.includes("_context = context;")) {
                return `<div class="added-line tooltip" data-tooltip="Assigns the injected database context to the private field for use in this class.">${line}</div>`;
            }

            return `<div class="original-code hidden">${line}</div>`;
        })
        .join("\n");
});



// Handle GitHub-Style Copy Button Clicks
document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", function () {
        let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

        // Collect both original and updated lines
        let lines = [...codeBlock.querySelectorAll(".added-line, .original-code")];

        // Extract text content, removing any `+` at the start
        let codeText = lines.map(line => line.textContent.replace(/^\+\s*/, "")).join("\n").trim();

        // Copy to clipboard
        navigator.clipboard.writeText(codeText).then(() => {
            let originalIcon = button.innerHTML;
            button.innerHTML = `
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                    <path fill-rule="evenodd"
                        d="M13 3H7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 4h6c.6 0 1 .4 1 1v7c0 .6-.4 1-1-1V5c0-.6.4-1 1-1z"></path>
                </svg> Copied!`;

            // Restore icon after 1.5s
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 1500);
        }).catch(err => console.error("Failed to copy:", err));
    });
});

    // Expand button functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

document.querySelectorAll(".tooltip-trigger").forEach(trigger => {
    trigger.addEventListener("click", function () {
        let tooltip = this.querySelector(".tooltip");
        tooltip.style.visibility = tooltip.style.visibility === "visible" ? "hidden" : "visible";
        tooltip.style.opacity = tooltip.style.opacity === "1" ? "0" : "1";
    });
});

});
