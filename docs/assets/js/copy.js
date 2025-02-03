document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".expand-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            codeBlock.classList.toggle("expanded");
        });
    });

    // Auto-Detect Added and Unchanged Lines
    document.querySelectorAll(".full-code code").forEach(block => {
        let lines = block.innerHTML.split("\n");
        block.innerHTML = lines.map(line => {
            if (line.includes("using ChatApp.Models;") ||
                line.includes("namespace ChatApp.Hubs") ||
                line.includes("private readonly AppDbContext _context;") ||
                line.includes("public ChatHub(AppDbContext context)") ||
                line.includes("_context = context;") ||
                line.includes("var newMessage = new Message") ||
                line.includes("_context.Messages.Add(newMessage)") ||
                line.includes("await _context.SaveChangesAsync()")) {
                return `<span class="added-line">${line}</span>`;
            }
            return `<span class="unchanged-code">${line}</span>`;
        }).join("\n");
    });

    // Copy Button Functionality
    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let code = this.closest(".code-block").querySelector(".updated-code code").innerText;
            navigator.clipboard.writeText(code);
        });
    });
});
