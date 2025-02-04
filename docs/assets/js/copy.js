document.querySelectorAll(".expand-button").forEach(button => {
    button.addEventListener("click", function () {
        let codeBlock = button.closest(".code-block");
        codeBlock.classList.toggle("expanded");

        let unchangedLines = codeBlock.querySelectorAll(".unchanged-code, .removed-line");

        if (codeBlock.classList.contains("expanded")) {
            unchangedLines.forEach(line => line.style.display = "inline-block");
            button.innerText = "Collapse";
        } else {
            unchangedLines.forEach(line => line.style.display = "none");
            button.innerText = "Expand";
        }

        // ✅ Reapply syntax highlighting after a small delay
        setTimeout(() => {
            document.querySelectorAll("pre code").forEach(codeElement => {
                if (typeof hljs !== "undefined") {
                    hljs.highlightElement(codeElement);
                }
                if (typeof Prism !== "undefined") {
                    Prism.highlightElement(codeElement);
                }
            });
        }, 10);
    });
});
