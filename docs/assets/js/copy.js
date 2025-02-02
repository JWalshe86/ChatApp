document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block .copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeText = "";

            // Get the closest .code-block container
            let codeBlock = button.closest(".code-block");

            // Detect original and updated code sections (if present)
            let originalCodeBlock = codeBlock.querySelector(".original-code"); 
            let updatedCodeBlock = codeBlock.querySelector("pre code:not(.original-code)"); // Select any code block that isn't marked as original

            if (originalCodeBlock) {
                codeText += originalCodeBlock.innerText.trim() + "\n\n"; // Add original code first
            }
            
            if (updatedCodeBlock) {
                codeText += updatedCodeBlock.innerText.trim(); // Then add updated code
            }

            // If no original code exists, just copy the single code block
            if (!originalCodeBlock && !updatedCodeBlock) {
                codeText = codeBlock.querySelector("pre code").innerText.trim();
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
