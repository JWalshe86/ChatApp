document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // Ensure all original code is hidden at the start
    document.querySelectorAll(".original-code").forEach(line => {
        line.classList.add("hidden");
    });

    console.log("✅ Original code hidden on page load");

    // Expand button functionality
    document.querySelector(".expand-button").addEventListener("click", function () {
        let codeBlock = this.closest(".code-block");
        let originalCode = codeBlock.querySelectorAll(".original-code");
        let codeContainer = codeBlock.querySelector(".code-container");

        let isExpanded = codeBlock.classList.toggle("expanded");

        if (isExpanded) {
            console.log("📂 Expanding...");
            codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Smooth expansion
            setTimeout(() => {
                originalCode.forEach(line => line.classList.remove("hidden")); // Show original code
            }, 300);
        } else {
            console.log("📂 Collapsing...");
            originalCode.forEach(line => line.classList.add("hidden")); // Hide original code first
            setTimeout(() => {
                codeContainer.style.maxHeight = "0px"; // Collapse smoothly
            }, 300);
        }
    });

    console.log("✅ JavaScript fully loaded!");
});
