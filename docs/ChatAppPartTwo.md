
# **ChatApp Part 2 - Real-Time Messaging with SignalR**

![ChatApp](images/ChatApp.png)

## **Introduction**
After successfully setting up real-time messaging with SignalR, I enhanced the app with:
- **Persistent chat storage**, ensuring messages are saved even after the application restarts.
- **User notifications**, so participants are informed when someone joins or leaves.
- **Rich media support**, allowing users to send images, videos, and files.
- **Private messaging**, enabling direct communication between users.
- **Message history with pagination**, so users can load older messages on demand.
- **User profiles and avatars**, adding personalization.
- **Security enhancements**, including authentication, rate-limiting, and HTTPS.

## **Initial Housekeeping**
To prevent conflicts with the previous project (which used `IdentityDbContext`), I performed a **fresh start** by:
- Deleting the **existing database** (`ChatApp.db`).
- Removing **migrations** from the previous project.

---

# **Persistent Message Storage**
## **Creating the `Message` Class**
Initially, messages were stored as simple strings. However, to persist messages between logins, they needed to be stored in a **database** as objects.

I created a `Message` class that Entity Framework (EF) maps into a database table.

```csharp
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
```

To keep the project organized, I placed `Message.cs` inside a **Models** folder.

---

## **Creating `AppDbContext`**
Previously, `IdentityDbContext<IdentityUser>` handled user authentication. However, to store custom entities like messages, I created an `AppDbContext` that **inherits** from `IdentityDbContext<IdentityUser>`.

```csharp
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChatApp.Models;

namespace ChatApp
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Message> Messages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}
```

### **Key Updates**
- `DbSet<Message>` tells EF that `Message` should be included in the database.
- The **identity framework** is still supported, allowing user authentication.
- `AppDbContext` is registered in **Program.cs**:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
```

---

# **Database Migrations**
Before migrating, I ensured `AppDbContext` was saved, as missing updates **caused issues earlier**.

### **Commands to Create and Update the Database**
```sh
dotnet ef migrations add AddMessagesTable
dotnet ef database update
```

### **Migration Output**
![Migrations](images/Migrations.png)

---

# **SignalR Integration**
### **Updating `ChatHub` to Save Messages in Database**
Previously, messages were sent via SignalR but were **not persisted**. Now, messages are saved to the database before being broadcast.

```csharp
using ChatApp.Models;
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
}
```

### **Key Changes**
- `SendMessage()` now **saves messages to the database** before broadcasting them.
- **Entity Framework** manages message persistence.

---

# **Message Display Updates**
Since messages are now stored as **objects** (not plain strings), the Razor page needed to be updated.

```razor
<ul id="messagesList">
    @foreach (var message in Model.Messages)
    {
        <li>
            <strong>@message.User</strong>: 
            @if (message.Content.StartsWith("/uploads/"))
            {
                var fileName = System.IO.Path.GetFileName(message.Content);
                <a href="@message.Content" target="_blank">@fileName</a>
            }
            else
            {
                @message.Content
            }
            (@message.Timestamp)
        </li>
    }
</ul>
```

---

# **Real-Time User Presence**
Users now receive **join/leave notifications**.

```javascript
connection.on("UserJoined", function (user) {
    const li = document.createElement("li");
    li.textContent = `${user} has joined the chat.`;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("UserLeft", function (user) {
    const li = document.createElement("li");
    li.textContent = `${user} has left the chat.`;
    document.getElementById("messagesList").appendChild(li);
});
```

### **Tracking Online Users in `ChatHub`**
```csharp
private static readonly HashSet<string> OnlineUsers = new();

public override async Task OnConnectedAsync()
{
    string userName = Context.User?.Identity?.Name;
    if (!string.IsNullOrEmpty(userName))
    {
        OnlineUsers.Add(userName);
        await Clients.All.SendAsync("UserJoined", userName);
    }
}

public override async Task OnDisconnectedAsync(Exception? exception)
{
    string userName = Context.User?.Identity?.Name;
    if (!string.IsNullOrEmpty(userName))
    {
        OnlineUsers.Remove(userName);
        await Clients.All.SendAsync("UserLeft", userName);
    }
}
```

---

# **File Upload & Image Preview**
### **Client-Side File Upload Handling**
```javascript
document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreview").style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById("imagePreview").style.display = "none";
    }
});
```

### **Uploading Files to Server**
```csharp
public async Task<IActionResult> OnPostAsync(IFormFile file)
{
    if (file != null && file.Length > 0)
    {
        var filePath = Path.Combine("wwwroot/uploads", file.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return Content($"/uploads/{file.FileName}");
    }
    return Content("No file selected.");
}
```

---

# **Private Messaging**
### **Updating `Message` Class**
```csharp
public class Message
{
    public int Id { get; set; }
    public string User { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
    public bool IsPrivate { get; set; }
    public string? Recipient { get; set; }
}
```

### **Sending Private Messages**
```csharp
public async Task SendPrivateMessage(string recipientUserName, string message)
{
    var senderUserName = Context.User?.Identity?.Name;
    await Clients.User(recipientUserName).SendAsync("ReceivePrivateMessage", senderUserName, message);
}
```

---

# **Next Steps**
1. **Deploy the app to the cloud** (Azure/AWS/Heroku).
2. **Enhance security** (rate-limiting, CSRF protection, HTTPS).
3. **Add unit & integration tests**.

---
