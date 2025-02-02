document.addEventListener("DOMContentLoaded", function () {
    // Handle "Show Original Code" toggle
    document.querySelectorAll("details").forEach(detail => {
        const summary = detail.querySelector("summary");

        summary.addEventListener("click", function () {
            setTimeout(() => {
                if (detail.open) {
                    summary.innerHTML = "🔼 Original Code...";
                } else {
                    summary.innerHTML = "🔽 Show Original Code...";
                }
            }, 100); // Ensures toggle state is applied before changing text
        });
    });

    // Handle Copy Button Clicks
    document.querySelectorAll(".code-block .copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeText = "";

            // Get the closest .code-block container
            let codeBlock = button.closest(".code-block");

            // Find the original and updated code (if they exist)
            let originalCodeBlock = codeBlock.querySelector("details .original-code");
            let updatedCodeBlock = codeBlock.querySelector(".updated-code");

            // Ensure details tag is open while copying
            let details = codeBlock.querySelector("details");
            let wasClosed = false;

            if (details && !details.open) {
                details.open = true; // Temporarily expand details
                wasClosed = true;
            }

            if (originalCodeBlock) {
                codeText += originalCodeBlock.innerText.trim() + "\n\n"; // Add original code first
            }

            if (updatedCodeBlock) {
                codeText += updatedCodeBlock.innerText.trim(); // Then add updated code
            }

            // If there's no original or updated code, copy the only available code block
            if (!originalCodeBlock && !updatedCodeBlock) {
                let singleCodeBlock = codeBlock.querySelector("pre code");
                if (singleCodeBlock) {
                    codeText = singleCodeBlock.innerText.trim();
                }
            }

            // Restore details tag state if it was closed before
            if (details && wasClosed) {
                details.open = false;
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
