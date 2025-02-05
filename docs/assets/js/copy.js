document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running"); 

    document.querySelectorAll("pre code").forEach((block) => {
        block.innerHTML = block.innerHTML.replace(
            /(using|namespace|public|private|await|var|class|function)/g,
            (match) => `<span class="original-code">${match}</span>`
        );
    });

    console.log("Injected .original-code into pre code blocks.");

    // Apply Highlight.js AFTER ensuring original-code is present
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // ✅ Fix Expand Button
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Toggle clicked!");
            let codeBlock = this.closest(".code-block");
            let originalCode = codeBlock.querySelectorAll(".original-code");

            console.log("Original code found:", originalCode);

            originalCode.forEach((line) => {
                line.classList.toggle("hidden");
            });

            this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
        });
    });
});
