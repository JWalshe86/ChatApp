document.querySelectorAll(".expand-button").forEach(button => {
    button.addEventListener("click", function () {
        let codeBlock = button.closest(".code-block");
        codeBlock.classList.toggle("expanded");

        let codeElement = codeBlock.querySelector("pre code");
        if (!codeElement) return;

        // ✅ Temporarily remove & re-add the code block to force re-render
        let parent = codeElement.parentElement;
        let clonedCode = codeElement.cloneNode(true);
        parent.replaceChild(clonedCode, codeElement);

        // ✅ Wait and reapply Highlight.js
        setTimeout(() => {
            if (typeof hljs !== "undefined") {
                hljs.highlightElement(clonedCode);
                console.log("Highlight.js applied to expanded block");
            }
        }, 100);
    });
});
