document.addEventListener("click", function (event) {
    let button = event.target.closest(".expand-button");
    if (!button) return;

    console.log("🎯 Expand button clicked!", button);
    let codeBlock = button.closest(".code-block");
    console.log("📦 Found code block:", codeBlock);

    if (codeBlock) {
        codeBlock.classList.toggle("expanded");
        console.log("✅ Expanded class now:", codeBlock.classList.contains("expanded"));
    } else {
        console.warn("⚠️ No parent .code-block found for this button.");
    }
});
