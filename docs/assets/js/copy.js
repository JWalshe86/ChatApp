document.addEventListener("DOMContentLoaded", function () {

// Function to toggle between Code, Explanation, and Tests tabs
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        console.log(`Button clicked for target: ${targetId}`);

        // Find related sections
        const codeTab = document.getElementById(`code-tab-${targetId}`);
        const explanationTab = document.getElementById(`explanation-tab-${targetId}`);
        const testTab = document.getElementById(`test-${targetId}`);

        console.log(`Code Tab Found:`, codeTab);
        console.log(`Explanation Tab Found:`, explanationTab);
        console.log(`Test Tab Found:`, testTab);

        if (codeTab && explanationTab && testTab) {
            // Hide all related sections
            codeTab.style.display = "none";
            explanationTab.style.display = "none";
            testTab.style.display = "none";

            // Show the selected section
            if (this.classList.contains('code-btn')) {
                console.log(`Showing code for ${targetId}`);
                codeTab.style.display = "block";
            } else if (this.classList.contains('doc-btn')) {
                console.log(`Showing explanation for ${targetId}`);
                explanationTab.style.display = "block";
            } else if (this.classList.contains('test-btn')) {
                console.log(`Showing tests for ${targetId}`);
                testTab.style.display = "block";
            }
        } else {
            console.error(`Missing elements for ${targetId}`);
        }
    });
});


// 🔄 Expand Button Functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCodeLines = codeBlock.querySelectorAll(".original-code");

            // Toggle visibility of original code
            originalCodeLines.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // Toggle expand/collapse icons
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

   // 📝 Copy Button Functionality
document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", function () {
        let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("pre code");

        // Collect all visible lines (both original and updated)
        let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];

        // Extract only the text content of the main code, ignoring tooltips
        let codeText = visibleLines.map(line => {
            let clonedLine = line.cloneNode(true); // Clone the node to modify it without affecting UI
            clonedLine.querySelectorAll(".tooltip").forEach(tooltip => tooltip.remove()); // Remove tooltips
            return clonedLine.textContent.replace(/^\s*[+-]\s*/, "").trim(); // Clean up leading +/-
        }).join("\n");

        navigator.clipboard.writeText(codeText).then(() => {
            let originalIcon = button.innerHTML;
            button.innerHTML = `✅ Copied!`;
            setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
        }).catch(err => console.error("Failed to copy:", err));
    });
});

});
