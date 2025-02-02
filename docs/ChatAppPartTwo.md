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

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">Message.cs</span>
        <button class="copy-button" aria-label="Copy code">📋 Copy</button>
    </div>
    <pre><code class="updated-code">namespace ChatApp.Models
{
    public class Message
    {
        public int Id { get; set; } // Primary key
        public string User { get; set; } // Username of the sender
        public string Content { get; set; } // The actual message content
        public DateTime Timestamp { get; set; } // When the message was sent
    }
}</code></pre>
</div>

---

### **Updating `ChatHub.cs` to Save Messages in Database**
Previously, messages were sent via SignalR but were **not persisted**. Now, messages are saved to the database before being broadcast.

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="copy-button" aria-label="Copy code">📋 Copy</button>
    </div>
    <pre><code class="updated-code">using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

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
}</code></pre>
</div>

---

### **Tracking Online Users & Notifications**
Chat now displays **online users** and **notifies when users join or leave**.

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="copy-button" aria-label="Copy code">📋 Copy</button>
    </div>
    <pre><code class="updated-code">public override async Task OnConnectedAsync()
{
    string userName = Context.User.Identity.Name;

    if (!OnlineUsers.ContainsKey(Context.ConnectionId))
    {
        OnlineUsers[Context.ConnectionId] = userName;
        await Clients.All.SendAsync("UserJoined", userName);
        await SendOnlineUsers();
    }

    await base.OnConnectedAsync();
}

public override async Task OnDisconnectedAsync(Exception exception)
{
    if (OnlineUsers.TryRemove(Context.ConnectionId, out string userName))
    {
        await Clients.All.SendAsync("UserLeft", userName);
        await SendOnlineUsers();
    }

    await base.OnDisconnectedAsync(exception);
}

private async Task SendOnlineUsers()
{
    var users = OnlineUsers.Values.Distinct().ToList();
    await Clients.All.SendAsync("UpdateOnlineUsers", users);
}</code></pre>
</div>

---

This update ensures all code blocks have **GitHub-style headers and copy buttons** while maintaining correct formatting for **HTML entities** in Markdown. Let me know if you need any further refinements! 🚀

