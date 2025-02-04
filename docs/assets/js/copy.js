document.addEventListener("DOMContentLoaded", function () {
    if (typeof Diff === "undefined") {
        console.error("jsdiff library is not loaded!");
        return;
    }

    let originalCode = `using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}`;

    let updatedCode = `using ChatApp.Models;
namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        public ChatHub(AppDbContext context)
        {
            _context = context;
        }
        public async Task SendMessage(string user, string message)
        {
            var newMessage = new Message
            {
                User = user,
                Content = message,
                Timestamp = DateTime.UtcNow
            };
            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}`;

    let diff = Diff.diffLines(originalCode, updatedCode);
    let diffHtml = '';

    diff.forEach(part => {
        if (part.added) {
            diffHtml += `<span class="added-line">+ ${escapeHtml(part.value)}</span>`;
        } else if (part.removed) {
            diffHtml += `<span class="removed-line">- ${escapeHtml(part.value)}</span>`; // Hidden by default
        } else {
            diffHtml += `<span class="unchanged-code">${escapeHtml(part.value)}</span>`; // Hidden by default
        }
    });

    let codeElement = document.querySelector(".updated-code code");
    if (codeElement) {
        codeElement.innerHTML = diffHtml;
        hljs.highlightElement(codeElement);
    }

    // Expand Button
    document.querySelector(".expand-button").addEventListener("click", function () {
        document.querySelector(".updated-code").classList.toggle("expanded");
    });
});

// Function to escape HTML characters
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
}
