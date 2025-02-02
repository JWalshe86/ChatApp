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
            }, 100);
        });
    });

    // Handle GitHub-Style Copy Button Clicks
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");
            let codeText = codeBlock.innerText.trim();

            navigator.clipboard.writeText(codeText).then(() => {
                button.innerHTML = "✅ Copied!";
                setTimeout(() => {
                    button.innerHTML = "📋 Copy";
                }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
