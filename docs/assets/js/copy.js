document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".original-code").forEach(line => {
        line.classList.add("hidden"); // Hide original code by default
    });
    console.log("✅ Original code hidden on page load");

    document.querySelector(".expand-button").addEventListener("click", function () {
        let codeBlock = this.closest(".code-block");
        let codeContainer = codeBlock.querySelector(".code-container");
        let originalCode = codeBlock.querySelectorAll(".original-code");

        let isExpanded = codeBlock.classList.toggle("expanded");

        if (isExpanded) {
            console.log("Expanding...");
            codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Expand smoothly

            setTimeout(() => {
                originalCode.forEach(line => line.classList.remove("hidden")); // Show original code
            }, 300);
        } else {
            console.log("Collapsing...");
            originalCode.forEach(line => line.classList.add("hidden")); // Hide original code first

            setTimeout(() => {
                codeContainer.style.maxHeight = "0px"; // Collapse smoothly
            }, 300);
        }
    });
});
