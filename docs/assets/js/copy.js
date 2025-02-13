document.addEventListener("DOMContentLoaded", function () {

    // Toggle between Code & Explanation tabs
    document.getElementById('toggleButton').addEventListener('click', function () {
        const explanationTab = document.getElementById('explanation-tab');
        const codeTab = document.getElementById('code-tab');

        if (codeTab.style.display === 'none') {
            codeTab.style.display = 'block';
            explanationTab.style.display = 'none';
            this.textContent = '📜 Show Explanation';
        } else {
            codeTab.style.display = 'none';
            explanationTab.style.display = 'block';
            this.textContent = '💻 Show Code';
        }
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

            // Clean up text to remove leading `+` or `-`
            let codeText = visibleLines.map(line => line.textContent.replace(/^\s*[+-]\s*/, "").trim()).join("\n");

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
