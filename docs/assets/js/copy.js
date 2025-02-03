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
            // Find the closest code block inside Rouge's .highlight container
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector(".highlight pre");
            let codeText = codeBlock ? codeBlock.innerText.trim() : "";

            if (codeText) {
                navigator.clipboard.writeText(codeText).then(() => {
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
            }
        });
    });

    // Handle expand button
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-block");
            codeBlock.classList.toggle("expanded");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".updated-code code").forEach(block => {
        let lines = block.innerHTML.split("\n");
        block.innerHTML = lines.map(line => {
            if (line.includes("using ChatApp.Models;")) {
                return `<span class="added-line">${line}</span>`;
            }
            return `<span class="unchanged-code">${line}</span>`;
        }).join("\n");
    });
});
