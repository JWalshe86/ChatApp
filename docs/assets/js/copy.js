document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");

            // Toggle expanded class
            codeBlock.classList.toggle("expanded");

            // Show or hide the correct code blocks
            let updatedCode = codeBlock.querySelector(".updated-code");
            let fullCode = codeBlock.querySelector(".full-code");

            if (codeBlock.classList.contains("expanded")) {
                updatedCode.style.display = "none";
                fullCode.style.display = "block";
            } else {
                updatedCode.style.display = "block";
                fullCode.style.display = "none";
            }
        });
    });

    // Interweave updated lines dynamically
    document.querySelectorAll(".full-code code").forEach(block => {
        let lines = block.innerHTML.split("\n");
        block.innerHTML = lines.map(line => {
            if (line.includes("ChatApp.Models") || line.includes("_context = context;")) {
                return `<span class="added-line">${line}</span>`;
            }
            return `<span class="unchanged-code">${line}</span>`;
        }).join("\n");
    });
});
