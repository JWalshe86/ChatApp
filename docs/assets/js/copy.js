document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✅ Ensure original code is hidden on page load
    document.querySelectorAll(".original-code").forEach((line) => {
        line.classList.add("hidden");
    });

    console.log("✅ Original code hidden on page load");

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

            // ✅ Toggle visibility of original code
            let isExpanded = [...originalCode].some(line => line.classList.contains("hidden"));

            originalCode.forEach((line) => {
                line.classList.toggle("hidden", !isExpanded);
            });

            // ✅ Toggle Expand/Collapse Text
            this.textContent = isExpanded ? "Collapse" : "Expand";

            console.log(`🔄 Toggled original code, isExpanded: ${isExpanded}`);
        });
    });
});
