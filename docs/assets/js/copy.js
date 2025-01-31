document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = "";

            // Get all code inside the code block, even hidden ones
            block.querySelectorAll("pre code span, pre code").forEach(codeBlock => {
                codeText += codeBlock.innerText + "\n";
            });

            // Copy the extracted text
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerText = "✅ Copied!";
                setTimeout(() => { button.innerText = "📋 Copy"; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
