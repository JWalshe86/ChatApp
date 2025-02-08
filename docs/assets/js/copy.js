document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✅ Expand Button Click Event
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Expand button clicked");

            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            if (originalCode.length === 0) {
                console.warn("⚠ No original code elements found. Check HTML.");
                return;
            }

            // ✅ Toggle the visibility of original code
            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // ✅ Toggle Expand/Collapse Text
            if (this.textContent.trim() === "Expand") {
                this.textContent = "Collapse";
            } else {
                this.textContent = "Expand";
            }

            console.log("Original code visibility toggled");
        });
    });
});
