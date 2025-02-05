document.querySelectorAll(".expand-button").forEach(button => {
    button.addEventListener("click", () => {
        console.log("🔥 Expand button clicked!");

        let codeBlock = button.closest(".code-block");
        console.log("🔍 Closest code block:", codeBlock);

        let wasExpanded = codeBlock.classList.contains("expanded");
        codeBlock.classList.toggle("expanded");
        console.log("🔄 Toggled 'expanded' class. Now expanded:", !wasExpanded);

        if (!wasExpanded) {
            console.log("🎨 Applying syntax highlighting...");
            codeBlock.querySelectorAll("pre code").forEach(el => {
                hljs.highlightElement(el);
                console.log("🔦 Highlighting element:", el);
            });
        } else {
            console.log("⬅️ Removing expanded styles (if necessary).");
            codeBlock.querySelectorAll("pre code").forEach(el => {
                el.classList.remove("hljs");  // Remove Highlight.js styles
                console.log("🚫 Removed syntax highlighting from:", el);
            });
        }
    });
});
