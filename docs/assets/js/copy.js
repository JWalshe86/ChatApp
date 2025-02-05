document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded! JavaScript is running.");

    // Select all expand buttons
    let expandButtons = document.querySelectorAll(".expand-button");
    console.log(`🔍 Found ${expandButtons.length} expand buttons.`);

    if (expandButtons.length === 0) {
        console.warn("⚠️ No expand buttons found! Check your HTML structure.");
    }

    expandButtons.forEach(button => {
        console.log("🛠️ Adding event listener to:", button);

        button.addEventListener("click", function () {
            console.log("🔥 Expand button clicked!");

            // Find the nearest code block
            let codeBlock = button.closest(".code-block");
            console.log("🔍 Closest code block:", codeBlock);

            if (!codeBlock) {
                console.error("❌ No .code-block found! Check the HTML structure.");
                return;
            }

            // Toggle the expanded class
            codeBlock.classList.toggle("expanded");
            let isExpanded = codeBlock.classList.contains("expanded");
            console.log(`🔄 Toggled 'expanded' class. Now expanded: ${isExpanded}`);

            // Reapply syntax highlighting if expanded
            if (isExpanded) {
                console.log("🎨 Applying syntax highlighting...");
                document.querySelectorAll("pre code").forEach(el => {
                    console.log("🔦 Highlighting element:", el);
                    hljs.highlightElement(el);
                });
            } else {
                console.log("⬅️ Removing expanded styles (if necessary).");
                // If you need to reset styles, you can add a function here
            }
        });
    });
});
