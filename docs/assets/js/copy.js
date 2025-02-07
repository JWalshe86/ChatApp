document.querySelectorAll(".expand-button").forEach((button) => {
    button.addEventListener("click", function () {
        let codeBlock = this.closest(".code-block");
        let codeContainer = codeBlock.querySelector(".code-container");
        let originalCode = codeBlock.querySelectorAll(".original-code");

        if (!codeContainer || originalCode.length === 0) {
            console.warn("⚠ Missing elements. Check HTML.");
            return;
        }

        let isExpanded = codeBlock.classList.toggle("expanded");

        if (isExpanded) {
            // ✅ Step 1: Expand container
            codeContainer.style.maxHeight = codeContainer.scrollHeight + "px";

            // ✅ Step 2: Reveal original code after transition
            setTimeout(() => {
                originalCode.forEach(line => line.style.display = "block");
            }, 300);
        } else {
            // ✅ Step 1: Hide original code before collapsing
            originalCode.forEach(line => line.style.display = "none");

            // ✅ Step 2: Collapse smoothly
            codeContainer.style.maxHeight = "0px";
        }

        console.log(`✅ Expand state: ${isExpanded}`);
    });
});
