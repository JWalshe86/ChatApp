document.addEventListener("DOMContentLoaded", function () {
    let originalCode = `public class ChatHub : Hub {
        public async Task SendMessage(string user, string message) {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }`;

    let updatedCode = `using ChatApp.Models;
    namespace ChatApp.Hubs {
        public class ChatHub : Hub {
            private readonly AppDbContext _context;
            public ChatHub(AppDbContext context) {
                _context = context;
            }
            public async Task SendMessage(string user, string message) {
                var newMessage = new Message {
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

    let diff = JsDiff.diffLines(originalCode, updatedCode);
    let diffHtml = '';

    diff.forEach(part => {
        if (part.added) {
            diffHtml += `<span class="added-line">${escapeHtml(part.value)}</span>`;
        } else if (part.removed) {
            // Ignore removed code (optional)
        } else {
            diffHtml += `<span class="unchanged-code">${escapeHtml(part.value)}</span>`;
        }
    });

    let codeElement = document.querySelector(".updated-code code");
    codeElement.innerHTML = diffHtml;

    // Apply syntax highlighting after inserting diff
    hljs.highlightElement(codeElement);
});

// Function to escape HTML characters
function escapeHtml(unsafe) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Expand button functionality
document.querySelector(".expand-button").addEventListener("click", function () {
    document.querySelector(".updated-code").classList.toggle("expanded");
});
