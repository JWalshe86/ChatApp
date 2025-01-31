document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Select only the code inside <pre><code>, ignoring the toggle button
            block.querySelectorAll("pre code").forEach(codeBlock => {
                codeText += codeBlock.innerText + "\n"; // Collect all code into a single string
            });

            // Copy text to clipboard
            navigator.clipboard.writeText(codeText.trim()).then(() => {
                button.innerText = "✅ Copied!";
                setTimeout(() => {
                    button.innerText = "📋 Copy";
                }, 1500); // Reset button text after 1.5 seconds
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
