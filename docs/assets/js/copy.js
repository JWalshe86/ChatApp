document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");

            // Toggle expanded class
            codeBlock.classList.toggle("expanded");

            // Show or hide the correct code blocks
            let updatedCode = codeBlock.querySelector(".updated-code");
            let fullCode = codeBlock.querySelector(".full-code");

            if (codeBlock.classList.contains("expanded")) {
                updatedCode.style.display = "none";
                fullCode.style.display = "block";
            } else {
                updatedCode.style.display = "block";
                fullCode.style.display = "none";
            }
        });
    });

    // Ensure updated code is visible by default
    document.querySelectorAll(".updated-code").forEach(code => {
        code.style.display = "block";
    });

    document.querySelectorAll(".full-code").forEach(code => {
        code.style.display = "none";
    });
});
