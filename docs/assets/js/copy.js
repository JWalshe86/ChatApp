document.addEventListener("DOMContentLoaded", function () {
    // Handle "Show Original Code" toggle
    document.querySelectorAll("details").forEach(detail => {
        const summary = detail.querySelector("summary");

        summary.addEventListener("click", function () {
            setTimeout(() => {
                if (detail.open) {
                    summary.innerHTML = "🔼 Original Code...";
                } else {
                    summary.innerHTML = "🔽 Show Original Code...";
                }
            }, 100); // Ensures toggle state is applied before changing text
        });
    });

    // Handle GitHub-Style Copy Button Clicks
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");
            let codeText = codeBlock.innerText.trim();

            // Copy text to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                    <path fill-rule="evenodd"
                        d="M13 3H7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 4h6c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z"></path>
                </svg>`; // Show "Copied" icon

                setTimeout(() => {
                    button.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                        <path fill-rule="evenodd"
                            d="M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z"></path>
                    </svg>`; // Restore original copy icon
                }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
