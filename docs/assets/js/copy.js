document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Select ALL code including hidden parts
            let allCodeBlocks = block.querySelectorAll("pre code, pre .original-code");

            allCodeBlocks.forEach(codeBlock => {
                codeText += codeBlock.textContent + "\n"; // Collect all code
            });

            // Remove "🔽 Show Original Code..." from copied text
            codeText = codeText.replace(/🔽 Show Original Code...\n?/g, "").trim();

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
