document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Select both original and updated code blocks inside the same container
            let allCodeBlocks = block.closest("div").querySelectorAll("pre code, pre .original-code");

            if (allCodeBlocks.length > 0) {
                allCodeBlocks.forEach(codeBlock => {
                    codeText += codeBlock.innerText + "\n"; // Use innerText instead of textContent
                });

                // Remove "🔽 Show Original Code..." from copied text
                codeText = codeText.replace(/🔽 Show Original Code...\n?/g, "").trim();
            } else {
                // If no original code is found, just copy the updated block
                codeText = block.querySelector("pre code").innerText.trim();
            }

            // Fix C# Generics: Convert "<T>" into safe characters before copying
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
