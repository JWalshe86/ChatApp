document.addEventListener("DOMContentLoaded", function () {
    // Ensure syntax highlighting doesn't interfere with expand functionality
    setTimeout(() => {
        document.querySelectorAll(".expand-button").forEach(button => {
            button.addEventListener("click", function () {
                let codeBlock = this.closest(".code-block");
                let originalCode = codeBlock.querySelectorAll(".original-code");

                originalCode.forEach(line => {
                    line.classList.toggle("hidden");
                });

                this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
            });
        });
    }, 500); // Give syntax highlighting some time to process
});
