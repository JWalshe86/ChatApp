document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            if (codeBlock) {
                codeBlock.classList.toggle("expanded");
                console.log("Expanded class applied:", codeBlock.classList.contains("expanded"));
                
                // Re-run syntax highlighting
                setTimeout(() => {
                    codeBlock.querySelectorAll("pre code").forEach(el => {
                        el.classList.remove("hljs"); // Reset existing styles
                        if (typeof hljs !== "undefined") {
                            hljs.highlightElement(el);
                        }
                    });
                }, 50);
            } else {
                console.log("No .code-block found!");
            }
        });
    });
});
