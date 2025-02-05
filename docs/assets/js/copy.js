function toggleExpand(button) {
    let codeBlock = button.closest(".code-block");
    let originalCode = codeBlock.querySelectorAll(".original-code");

    originalCode.forEach(line => {
        line.classList.toggle("hidden");
    });

    button.textContent = button.textContent === "Expand all" ? "Collapse" : "Expand all";
}
