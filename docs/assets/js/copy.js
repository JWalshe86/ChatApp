document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded!");

    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", () => {
            let codeBlock = button.closest(".code-block");
            console.log("Found code block:", codeBlock);
            codeBlock.classList.toggle("expanded");

            console.log("Expanded class now:", codeBlock.classList.contains("expanded"));

            // Apply syntax highlighting after expanding
            setTimeout(() => {
                codeBlock.querySelectorAll("pre code").forEach(el => {
                    hljs.highlightElement(el);
                    console.log("Applied syntax highlighting to:", el);
                });
            }, 100);
        });
    });
});
