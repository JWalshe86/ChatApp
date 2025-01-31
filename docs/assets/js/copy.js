document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(block => {
        let button = block.querySelector(".copy-button");

        button.addEventListener("click", function () {
            let codeText = block.querySelector("pre code").innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerText = "✅ Copied!";
                setTimeout(() => { button.innerText = "📋 Copy"; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
