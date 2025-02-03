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
                // ✅ Change SVG icon directly instead of replacing button content
                let originalIcon = button.innerHTML; // Store original HTML
                button.innerHTML = `
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                        <path fill-rule="evenodd"
                            d="M13 3H7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 4h6c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z"></path>
                    </svg> Copied!`; // Change icon + message

                setTimeout(() => {
                    button.innerHTML = originalIcon; // Restore original icon
                }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeContainer = button.closest(".code-block").querySelector(".code-container");
            codeContainer.classList.toggle("expanded");

            // ✅ Delay Prism re-highlight to ensure classes are applied first
            setTimeout(() => {
                reapplyCodeStyles(codeContainer); // Custom function to restore spans
                Prism.highlightElement(codeContainer.querySelector("code"));
            }, 100);
        });
    });
});

/**
 * ✅ Function to reapply 'unchanged-code' and 'added-line' spans after expansion
 */
function reapplyCodeStyles(codeContainer) {
    const codeElement = codeContainer.querySelector("code");

    // Reset previous spans to avoid duplication
    codeElement.innerHTML = codeElement.innerHTML
        .replace(/<span class="unchanged-code">/g, "")
        .replace(/<\/span>/g, "");

    // Wrap unchanged lines inside spans again
    let lines = codeElement.innerHTML.split("\n").map(line => {
        if (line.trim().startsWith("using Microsoft.AspNetCore.SignalR") ||
            line.trim().startsWith("public class ChatHub") ||
            line.trim().startsWith("await Clients.All.SendAsync")) {
            return `<span class="unchanged-code">${line}</span>`;
        }
        return line;
    });

    codeElement.innerHTML = lines.join("\n");
}
