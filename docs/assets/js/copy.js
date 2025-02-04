document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeContainer = button.closest(".code-block").querySelector(".updated-code");
            codeContainer.classList.toggle("expanded");

            if (codeContainer.classList.contains("expanded")) {
                button.textContent = "Collapse"; // Change button text
            } else {
                button.textContent = "Expand"; // Change back
            }
        });
    });

    // Copy Button Functionality
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block").querySelector("code");
            let codeText = codeBlock.innerText.trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = "✔ Copied!";
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
