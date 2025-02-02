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
<div class=&quot;code-block&quot;>
    <div class=&quot;code-header&quot;>
        <span class=&quot;code-filename&quot;>Message.cs</span>
        <button class=&quot;copy-button&quot; aria-label=&quot;Copy code&quot;>
            <svg aria-hidden=&quot;true&quot; height=&quot;16&quot; viewBox=&quot;0 0 16 16&quot; width=&quot;16&quot;>
                <path fill-rule=&quot;evenodd&quot; d=&quot;M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z&quot;></path>
            </svg>
        </button>
    </div>
    <pre><code class=&quot;updated-code&quot;>
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
<div class=&quot;code-block&quot;>
    <div class=&quot;code-header&quot;>
        <span class=&quot;code-filename&quot;>ChatHub.cs</span>
        <button class=&quot;copy-button&quot; aria-label=&quot;Copy code&quot;>
            <svg aria-hidden=&quot;true&quot; height=&quot;16&quot; viewBox=&quot;0 0 16 16&quot; width=&quot;16&quot;>
                <path fill-rule=&quot;evenodd&quot; d=&quot;M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z&quot;></path>
            </svg>
        </button>
    </div>
    <pre><code class=&quot;updated-code&quot;>
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {   
        &lt;mark&gt;private readonly AppDbContext _context;&lt;/mark&gt;

        &lt;mark&gt;public ChatHub(AppDbContext context)
        {
            _context = context;
        }&lt;/mark&gt;

        public async Task SendMessage(string user, string message)
        {
            &lt;mark&gt;var newMessage = new Message
            {
                User = user,
                Content = message,
                Timestamp = DateTime.UtcNow
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();&lt;/mark&gt;

            await Clients.All.SendAsync(&quot;ReceiveMessage&quot;, user, message);
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
<div class=&quot;code-block&quot;>
    <div class=&quot;code-header&quot;>
        <span class=&quot;code-filename&quot;>ChatHub.cs</span>
        <button class=&quot;copy-button&quot; aria-label=&quot;Copy code&quot;>
            <svg aria-hidden=&quot;true&quot; height=&quot;16&quot; viewBox=&quot;0 0 16 16&quot; width=&quot;16&quot;>
                <path fill-rule=&quot;evenodd&quot; d=&quot;M0 1.75A1.75 1.75 0 011.75 0h6.5A1.75 1.75 0 0110 1.75v1.5h3.25A1.75 1.75 0 0115 5v9.25A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V5a1.75 1.75 0 011.75-1.75H8v-1.5H1.75a.25.25 0 00-.25.25v13.5a.25.25 0 00.25.25h11.5a.25.25 0 00.25-.25V5a.25.25 0 00-.25-.25H10v8.75A1.75 1.75 0 018.25 15h-6.5A1.75 1.75 0 010 13.25V1.75z&quot;></path>
            </svg>
        </button>
    </div>
    <pre><code class=&quot;updated-code&quot;>
&lt;mark&gt;public override async Task OnConnectedAsync()
{
    string userName = Context.User.Identity.Name;

    if (!OnlineUsers.ContainsKey(Context.ConnectionId))
    {
        OnlineUsers[Context.ConnectionId] = userName;
        await Clients.All.SendAsync(&quot;UserJoined&quot;, userName);
        await SendOnlineUsers();
    }

    await base.OnConnectedAsync();
}&lt;/mark&gt;
    </code></pre>
</div>
```

---

This ensures **all code blocks render correctly** by replacing angle brackets and special characters with HTML entities. Let me know if you need more refinements! 🚀

