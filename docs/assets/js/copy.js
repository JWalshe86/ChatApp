document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    // ✨ Apply Highlight.js first
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    console.log("Highlight.js applied");

    // 🛠 AFTER Highlight.js runs, inject `.original-code` where needed
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n");

        block.innerHTML = lines
            .map((line) =>
                line.trim().startsWith("+") // If line starts with `+`, it's an addition
                    ? `<span class="added-line">${line.substring(1).trim()}</span>` // ✅ Keep new code
                    : `<span class="original-code hidden">${line}</span>` // ❌ Hide original code
            )
            .join("\n");
    });

    console.log("Injected .original-code after Highlight.js applied.");
});
