document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded! JavaScript is running.");

    document.querySelectorAll(".expand-button").forEach(button => {
        console.log("🛠️ Adding event listener to:", button);
        
        button.addEventListener("click", () => {
            console.log("🔥 Expand button clicked!");

            let codeBlock = button.closest(".code-block");
            console.log("🔍 Closest code block:", codeBlock);

            let wasExpanded = codeBlock.classList.contains("expanded");
            codeBlock.classList.toggle("expanded");
            console.log("🔄 Toggled 'expanded' class. Now expanded:", !wasExpanded);

            let codeElements = codeBlock.querySelectorAll("pre code");

            if (!wasExpanded) {
                console.log("🎨 Applying syntax highlighting...");
                codeElements.forEach(el => {
                    hljs.highlightElement(el);
                    console.log("🔦 Highlighting element:", el);
                });
            } else {
                console.log("⬅️ Removing syntax highlighting...");
                codeElements.forEach(el => {
                    el.classList.remove("hljs");  // Remove Highlight.js styles
                    el.innerHTML = el.textContent; // Strip any formatted HTML
                    console.log("🚫 Removed syntax highlighting from:", el);
                });
            }
        });
    });
});
