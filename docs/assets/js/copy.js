document.addEventListener("DOMContentLoaded", function () {
    const tooltipMessages = {
        "public ChatHub(AppDbContext context)": "Constructor initializing ChatHub with a database context.",
        "await _context.SaveChangesAsync();": "Saves the message to the database asynchronously.",
        "await Clients.All.SendAsync(\"ReceiveMessage\", user, message);": "Broadcasts the message to all connected clients.",
        "using Microsoft.AspNetCore.SignalR;": "Imports SignalR for real-time communication.",
    };

   document.querySelectorAll("pre code").forEach((block) => {
    const lines = block.innerHTML.split("\n").map(line => line.trim()).filter(line => line !== "");

    block.innerHTML = lines.map((line) => {
        let lineWithoutDiffSymbol = line.replace(/^[+-]\s*/, "").trim();
        let tooltipText = tooltipMessages[lineWithoutDiffSymbol] || "No additional information.";

        if (line.startsWith("+")) {
            return `<div class="added-line tooltip-container">
                        <span class="tooltip-trigger"><span class="diff-symbol">+</span> ${lineWithoutDiffSymbol}
                            <span class="tooltip">${tooltipText}</span>
                        </span>
                    </div>`;
        } else if (line.startsWith("-")) {
            return `<div class="removed-line tooltip-container">
                        <span class="tooltip-trigger"><span class="diff-symbol">-</span> ${lineWithoutDiffSymbol}
                            <span class="tooltip">Removed: ${tooltipText}</span>
                        </span>
                    </div>`;
        } else if (!line.startsWith("+") && !line.startsWith("-")) { // ✅ Only unchanged lines should be marked as original-code
            return `<div class="original-code hidden">${line}</div>`;
        }

        return line; // Ensure nothing else is unintentionally converted
    }).join("\n");
});

    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            codeBlock.querySelectorAll(".original-code").forEach((line) => line.classList.toggle("hidden"));
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");
            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();
            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            });
        });
    });
});
