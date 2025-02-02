document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block .copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeText = "";

            // Find the closest .code-block container that holds the button
            let codeBlock = button.closest(".code-block");

            // Find the closest parent section that holds both original & updated code
            let container = codeBlock.closest("section, div"); 
            let originalCodeBlock = container.querySelector(".original-code"); 
            let updatedCodeBlock = codeBlock.querySelector("pre code"); // Now correctly finds updated code in its block

            if (originalCodeBlock && codeBlock.contains(originalCodeBlock)) {
                codeText += originalCodeBlock.innerText.trim() + "\n\n"; // Add original code first if in the same section
            }
            
            if (updatedCodeBlock) {
                codeText += updatedCodeBlock.innerText.trim(); // Then add updated code
            }

            // Remove "🔽 Show Original Code..." from copied text
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
