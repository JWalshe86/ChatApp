document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // If there's an original code block, include both original & updated code
            let allCodeBlocks = block.querySelectorAll("pre code, pre .original-code");

            if (allCodeBlocks.length > 0) {
                allCodeBlocks.forEach(codeBlock => {
                    codeText += codeBlock.textContent + "\n"; // Collect all code
                });

                // Remove "🔽 Show Original Code..." from copied text
                codeText = codeText.replace(/🔽 Show Original Code...\n?/g, "").trim();
            } else {
                // No original code, just copy the main block
                codeText = block.querySelector("pre code").textContent.trim();
            }

            // Copy text to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerText = "✅ Copied!";
                setTimeout(() => {
                    button.innerText = "📋 Copy";
                }, 1500); // Reset button text after 1.5 seconds
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
