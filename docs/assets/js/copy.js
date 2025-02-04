document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            console.log("Found code block:", codeBlock);
            codeBlock.classList.toggle("expanded");
            console.log("Expanded class now:", codeBlock.classList.contains("expanded"));
        });
    });
});
