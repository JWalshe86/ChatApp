document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        // Prevent duplicate buttons
        if (!block.querySelector(".copy-button")) {
            let button = document.createElement("button");
            button.className = "copy-button";
            button.innerText = "📋 Copy";

            // Insert the button before the pre block
            block.insertBefore(button, block.firstChild);

            button.addEventListener("click", function () {
                let codeText = "";
                
                block.querySelectorAll("code").forEach(codeBlock => {
                    codeText += codeBlock.innerText + "\n";
                });

                navigator.clipboard.writeText(codeText).then(() => {
                    button.innerText = "✅ Copied!";
                    setTimeout(() => {
                        button.innerText = "📋 Copy";
                    }, 1500);
                }).catch(err => console.error("Failed to copy:", err));
            });
        }
    });
});
