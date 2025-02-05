document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", () => {
            const codeBlock = button.closest(".code-block");
            const originalCode = codeBlock.querySelectorAll(".original-code");
            const addedCode = codeBlock.querySelectorAll(".added-line");

            originalCode.forEach(line => {
                line.classList.toggle("hidden");
            });

            // Change button text
            button.textContent = button.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });
});
