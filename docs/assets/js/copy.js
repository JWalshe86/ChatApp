document.addEventListener("DOMContentLoaded", function () {
    // Smooth Expand/Collapse for Original Code
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            let codeContainer = codeBlock ? codeBlock.querySelector(".code-container") : null;

            if (!codeContainer) {
                console.error("Error: .code-container not found inside .code-block");
                return;
            }

            if (codeContainer.style.maxHeight) {
                // Collapse
                codeContainer.style.maxHeight = null;
                button.querySelector(".unfold-icon").classList.remove("hidden");
                button.querySelector(".fold-icon").classList.add("hidden");
            } else {
                // Expand
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px";
                button.querySelector(".unfold-icon").classList.add("hidden");
                button.querySelector(".fold-icon").classList.remove("hidden");
            }
        });
    });
});
