document.addEventListener("DOMContentLoaded", function () {

    // ✅ Hide original code on load and remove empty elements
    document.querySelectorAll(".original-code.hidden").forEach(el => {
        if (!el.textContent.trim()) {
            el.remove(); // Remove empty lines to prevent gaps
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
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            // Collect all visible lines (both original and updated)
            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
