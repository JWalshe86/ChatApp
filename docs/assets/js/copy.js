document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            let codeContainer = codeBlock ? codeBlock.querySelector(".code-container") : null;

            if (!codeContainer) {
                console.error("Error: .code-container not found inside .code-block");
                return;
            }

            let isExpanded = codeBlock.classList.toggle("expanded"); // Toggle class

            if (isExpanded) {
                // Expand
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px";
                button.querySelector(".unfold-icon").classList.add("hidden");
                button.querySelector(".fold-icon").classList.remove("hidden");
            } else {
                // Collapse
                codeContainer.style.maxHeight = null;
                button.querySelector(".unfold-icon").classList.remove("hidden");
                button.querySelector(".fold-icon").classList.add("hidden");
            }
        });
    });
});
