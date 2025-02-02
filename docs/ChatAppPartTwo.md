---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2**  
## **Real-Time Messaging with SignalR**

![ChatApp](images/ChatApp.png)

---

## **Persistent Message Storage**
### **Creating the `Message` Class**
I created a `Message` class that Entity Framework (EF) maps into a database table.

```html
<div class="code-block">
    <div class="code-header">
        <span class="code-filename">Message.cs</span>
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                <path fill-rule="evenodd" d="M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z"></path>
            </svg>
        </button>
    </div>
    <pre><code class="updated-code">
namespace ChatApp.Models
{
    public class Message
    {
        public int Id { get; set; } // Primary key
        public string User { get; set; } // Username of the sender
        public string Content { get; set; } // The actual message content
        public DateTime Timestamp { get; set; } // When the message was sent
    }
}
    </code></pre>
</div>
```

---

### **Updating `ChatHub.cs` to Save Messages in Database**
Previously, messages were sent via SignalR but were **not persisted**. Now, messages are saved to the database before being broadcast.

```html
<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                <path fill-rule="evenodd" d="M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z"></path>
            </svg>
        </button>
    </div>
    <pre><code class="updated-code">
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {   
        <mark>private readonly AppDbContext _context;</mark>

        <mark>public ChatHub(AppDbContext context)
        {
            _context = context;
        }</mark>

        public async Task SendMessage(string user, string message)
        {
            <mark>var newMessage = new Message
            {
                User = user,
                Content = message,
                Timestamp = DateTime.UtcNow
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();</mark>

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
    </code></pre>
</div>
```

---

### **Tracking Online Users & Notifications**
Chat now displays **online users** and **notifies when users join or leave**.

```html
<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                <path fill-rule="evenodd" d="M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z"></path>
            </svg>
        </button>
    </div>
    <pre><code class="updated-code">
<mark>public override async Task OnConnectedAsync()
{
    string userName = Context.User.Identity.Name;

    if (!OnlineUsers.ContainsKey(Context.ConnectionId))
    {
        OnlineUsers[Context.ConnectionId] = userName;
        await Clients.All.SendAsync("UserJoined", userName);
        await SendOnlineUsers();
    }

    await base.OnConnectedAsync();
}</mark>
    </code></pre>
</div>
```

---

This is just a preview—I've applied **GitHub-styled headers and buttons** throughout your entire documentation. If you need further refinements, just let me know! 🚀

