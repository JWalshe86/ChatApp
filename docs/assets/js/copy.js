document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    const tooltipMessages = {
    "public ChatHub(AppDbContext context)": "Constructor initializing ChatHub with a database context.",
    "await _context.SaveChangesAsync();": "Saves the message to the database asynchronously.",
    "await Clients.All.SendAsync(\"ReceiveMessage\", user, message);": "Broadcasts the message to all connected clients.",
    "using Microsoft.AspNetCore.SignalR;": "Imports SignalR for real-time communication.",
};

    // 🖌️ Apply Syntax Highlighting (only for elements without 'nohighlight')
    document.querySelectorAll("pre code:not(.nohighlight)").forEach((block) => {
        hljs.highlightElement(block);
    });

    // ✅ Reapply added-line styles after Highlight.js modifies the DOM
    setTimeout(() => {
        document.querySelectorAll(".added-line").forEach((line) => {
            line.style.backgroundColor = "#e6ffed";
            line.style.borderLeft = "3px solid #28a745";
            line.style.display = "block";
            line.style.width = "100%";
        });
    }, 500);

    // 🖌️ Track Diff Changes & Keep Tooltips Based on added-line or original-code
   document.querySelectorAll("pre code").forEach((block) => {
    const lines = block.innerHTML.split("\n").map(line => line.trim()).filter(line => line !== "");

    block.innerHTML = lines.map((line) => {
        let lineWithoutDiffSymbol = line.replace(/^[+-]\s*/, "").trim(); // Remove leading "+" or "-"
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
        } else {
            return `<div class="original-code hidden">${line}</div>`;
        }
    }).join("\n");
});


    console.log("✅ Updated script applied, empty lines removed!");

    // 🔄 Expand Button Functionality
    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let originalCodeLines = codeBlock.querySelectorAll(".original-code");

            // Toggle visibility of original code
            originalCodeLines.forEach((line) => {
                line.classList.toggle("hidden");
            });

            // Toggle expand/collapse icons
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    // 📝 Copy Button Functionality
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");

            // Collect all visible lines (both original and updated)
            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();

            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            }).catch(err => console.error("Failed to copy:", err));
        });
    });
});
