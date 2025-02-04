document.addEventListener("DOMContentLoaded", function () {
    // Handle "Show Original Code" toggle
    document.querySelectorAll("details").forEach(detail => {
        const summary = detail.querySelector("summary");
        summary.addEventListener("click", function () {
            setTimeout(() => {
                summary.innerHTML = detail.open ? "🔼 Original Code..." : "🔽 Show Original Code...";
            }, 100);
        });
    });

    // Handle GitHub-Style Copy Button Clicks
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");
            let codeText = codeBlock.innerText.trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                        <path fill-rule="evenodd"
                            d="M13 3H7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h6c.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 4h6c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z"></path>
                    </svg> Copied!`;

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });

    // Expand button behavior and reapply syntax highlighting
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            codeBlock.classList.toggle("expanded");

            // Wait for the DOM to update
            setTimeout(() => {
                let codeElement = codeBlock.querySelector("pre code");

                // Ensure it has the proper class for highlighting
                codeElement.classList.add("hljs");

                // Reapply syntax highlighting
                if (typeof hljs !== "undefined") {
                    hljs.highlightElement(codeElement);
                }
            }, 50);
        });
    });

    // Ensure all visible code blocks are initially highlighted
    document.querySelectorAll("pre code").forEach(el => {
        hljs.highlightElement(el);
    });
});
