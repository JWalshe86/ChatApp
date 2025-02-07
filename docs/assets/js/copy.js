document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            let codeContainer = codeBlock ? codeBlock.querySelector(".code-container") : null;

            if (!codeContainer) {
                console.error("Error: .code-container not found.");
                return;
            }

            let isExpanded = codeBlock.classList.toggle("expanded"); // Toggle class

            if (isExpanded) {
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Expand dynamically
                button.querySelector(".octicon-chevron-down").classList.add("hidden");
                button.querySelector(".octicon-fold").classList.remove("hidden");
            } else {
                codeContainer.style.maxHeight = null; // Collapse smoothly
                button.querySelector(".octicon-chevron-down").classList.remove("hidden");
                button.querySelector(".octicon-fold").classList.add("hidden");
            }
        });
    });
});
