document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Find the nearest parent container and select both original & updated code
            let container = block.closest("div"); 
            let originalCodeBlock = container.querySelector(".original-code"); 
            let updatedCodeBlock = container.querySelector(".updated-code");

            if (originalCodeBlock) {
                codeText += originalCodeBlock.innerText + "\n\n"; // Add original code first
            }
            
            if (updatedCodeBlock) {
                codeText += updatedCodeBlock.innerText; // Then add updated code
            }

            // Remove any "Show Original Code..." text from the copied output
            codeText = codeText.replace(/🔽 Show Original Code...\n?/g, "").trim();

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
