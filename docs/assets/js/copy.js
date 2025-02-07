document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // Apply Highlight.js
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // Inject .original-code for full lines
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) =>
                line.trim().startsWith("+")
                    ? `<span class="added-line">${line.substring(1).trim()}</span>` // Remove `+` but keep styling
                    : `<span class="original-code hidden">${line}</span>`
            )
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");

    // ✅ Fix Expand Button Functionality with Smooth Expansion
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Expand button clicked!");

            let codeBlock = this.closest(".code-block");
            let codeContainer = codeBlock.querySelector(".code-container");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            if (originalCode.length === 0) {
                console.warn("⚠ No original code elements found. Check HTML.");
                return;
            }

            let isExpanded = codeBlock.classList.toggle("expanded");

            if (isExpanded) {
                console.log("📂 Expanding...");
                codeContainer.style.maxHeight = codeContainer.scrollHeight + "px"; // Smooth expansion

                setTimeout(() => {
                    originalCode.forEach(line => line.classList.remove("hidden")); // Show original code
                }, 300); // Delay showing original code for smooth animation
            } else {
                console.log("📂 Collapsing...");
                originalCode.forEach(line => line.classList.add("hidden")); // Hide original code first

                setTimeout(() => {
                    codeContainer.style.maxHeight = "0px"; // Collapse container
                }, 300);
            }

            // Toggle icons
            let unfoldIcon = this.querySelector(".unfold-icon");
            let foldIcon = this.querySelector(".fold-icon");

            if (unfoldIcon && foldIcon) {
                unfoldIcon.classList.toggle("hidden");
                foldIcon.classList.toggle("hidden");
            }
        });
    });

    console.log("✅ JavaScript fully loaded!");
});
