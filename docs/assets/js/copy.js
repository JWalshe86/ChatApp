document.addEventListener("click", function (event) {
    if (event.target.closest(".expand-button")) {
        let button = event.target.closest(".expand-button");
        let codeBlock = button.closest(".code-block");
        console.log("Expand button clicked!", button);

        if (codeBlock) {
            codeBlock.classList.toggle("expanded");
            console.log("Expanded class now:", codeBlock.classList.contains("expanded"));
        } else {
            console.warn("No parent .code-block found for this button.");
        }
    }
});
