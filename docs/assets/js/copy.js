document.addEventListener("DOMContentLoaded", () => {
    alert("✅ DOM fully loaded!");

    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", () => {
            let codeBlock = button.closest(".code-block");
            alert("Found code block:", codeBlock);
            codeBlock.classList.toggle("expanded");

            alert("Expanded class now:", codeBlock.classList.contains("expanded"));

            // Apply syntax highlighting after expanding
            setTimeout(() => {
                codeBlock.querySelectorAll("pre code").forEach(el => {
                    hljs.highlightElement(el);
                    alert("Applied syntax highlighting to:", el);
                });
            }, 100);
        });
    });
});
