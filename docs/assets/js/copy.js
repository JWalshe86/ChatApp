document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Select all code blocks inside the code container
            block.querySelectorAll("pre code").forEach(codeBlock => {
                codeText += codeBlock.innerText + "\n"; // Collect all code into a single string
            });

            // Remove "🔽 Show Original Code..." from the copied text
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
