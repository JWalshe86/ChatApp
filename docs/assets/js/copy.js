document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            let originalCode = codeBlock ? codeBlock.querySelectorAll(".original-code") : [];

            if (!originalCode.length) {
                console.error("Error: .original-code not found.");
                return;
            }

            let isExpanded = codeBlock.classList.toggle("expanded");

            originalCode.forEach(line => {
                line.style.display = isExpanded ? "block" : "none";
            });

            if (isExpanded) {
                button.querySelector(".octicon-chevron-down").classList.add("hidden");
                button.querySelector(".octicon-fold").classList.remove("hidden");
            } else {
                button.querySelector(".octicon-chevron-down").classList.remove("hidden");
                button.querySelector(".octicon-fold").classList.add("hidden");
            }
        });
    });
});
