document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Select code blocks properly, ensuring C# generics aren't treated as HTML
            let allCodeBlocks = block.querySelectorAll("pre code, pre .original-code");

            if (allCodeBlocks.length > 0) {
                allCodeBlocks.forEach(codeBlock => {
                    codeText += codeBlock.innerText + "\n"; // Use innerText instead of textContent
                });

                // Remove "🔽 Show Original Code..." from copied text
                codeText = codeText.replace(/🔽 Show Original Code...\n?/g, "").trim();
            } else {
                // No original code, just copy the main block
                codeText = block.querySelector("pre code").innerText.trim();
            }

            // Fix for C# Generics: Convert "<T>" into safe characters before copying
            codeText = codeText.replace(/<([^>]+)>/g, "<$1>"); // Ensures angle brackets are not removed

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
