document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");
        let details = block.querySelector("details"); // Find the <details> element

        button.addEventListener("click", function () {
            let wasClosed = details && !details.open; // Check if <details> was collapsed

            if (wasClosed) {
                details.open = true; // Temporarily expand
            }

            let codeText = block.querySelector("pre code").innerText;

            if (wasClosed) {
                details.open = false; // Collapse it back
            }

            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerText = "✅ Copied!";
                setTimeout(() => { button.innerText = "📋 Copy"; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
