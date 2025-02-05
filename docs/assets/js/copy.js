document.querySelectorAll(".expand-button").forEach((button) => {
    button.addEventListener("click", function () {
        let codeBlock = this.closest(".code-block");
        let originalCode = codeBlock.querySelectorAll(".original-code");

        originalCode.forEach((line) => {
            line.classList.toggle("hidden");
        });

        this.classList.toggle("expanded");

        // ✅ Update SVG icon dynamically
        let icon = this.querySelector("svg path");
        if (icon) {
            if (this.classList.contains("expanded")) {
                icon.setAttribute("d", "M2 6h12M2 10h12"); // Example collapse icon
            } else {
                icon.setAttribute("d", "M2 6h12M2 10h12M2 14h12"); // Example expand icon
            }
        }
    });
});

// ✅ Fix Copy Button (if it doesn't work)
document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", function () {
        let codeBlock = this.closest(".code-block");
        let codeText = codeBlock.querySelector("code").innerText.trim();

        navigator.clipboard.writeText(codeText).then(() => {
            console.log("✅ Code copied!");
        }).catch(err => console.error("❌ Copy failed", err));
    });
});
