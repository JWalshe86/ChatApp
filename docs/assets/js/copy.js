document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");
    console.log("Expand buttons found:", document.querySelectorAll(".expand-button"));

    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            console.log("Expand button clicked!");
            console.log("Found code block:", codeBlock);

            if (codeBlock) {
                codeBlock.classList.toggle("expanded");
                console.log("Expanded class now:", codeBlock.classList.contains("expanded"));
            } else {
                console.warn("No parent .code-block found for this button.");
            }
        });
    });
});
