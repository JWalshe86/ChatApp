document.addEventListener("DOMContentLoaded", function () {
    // Find all code blocks that are inside a div with class "code-block"
    document.querySelectorAll(".code-block").forEach(block => {
        // Create the copy button
        let button = document.createElement("button");
        button.className = "copy-button";
        button.innerText = "📋 Copy";
        
        // Insert the button before the code block
        block.prepend(button);

        // Add event listener for copying
        button.addEventListener("click", function () {
            let codeText = "";
            
            // Get all code elements inside the div
            block.querySelectorAll("code").forEach(codeBlock => {
                codeText += codeBlock.innerText + "\n"; // Collect all code into a single string
            });

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
