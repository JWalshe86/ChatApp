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
    <button class="copy-button">📋 Copy</button>
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

---

### **Updating `ChatHub.cs` to Save Messages in Database**
Previously, messages were sent via SignalR but were **not persisted**. Now, messages are saved to the database before being broadcast.

<div class="code-block">
    <button class="copy-button">📋 Copy</button>

    <details>
        <summary>🔽 Show Original Code...</summary>
        <pre><code class="original-code">
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {   
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
        </code></pre>
    </details>

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

---

### **Tracking Online Users & Notifications**
Chat now displays **online users** and **notifies when users join or leave**.

<div class="code-block">
    <button class="copy-button">📋 Copy</button>

    <details>
        <summary>🔽 Show Original Code...</summary>
        <pre><code class="original-code">
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
        </code></pre>
    </details>

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

<mark>public override async Task OnDisconnectedAsync(Exception exception)
{
    if (OnlineUsers.TryRemove(Context.ConnectionId, out string userName))
    {
        await Clients.All.SendAsync("UserLeft", userName);
        await SendOnlineUsers();
    }

    await base.OnDisconnectedAsync(exception);
}</mark>

<mark>private async Task SendOnlineUsers()
{
    var users = OnlineUsers.Values.Distinct().ToList();
    await Clients.All.SendAsync("UpdateOnlineUsers", users);
}</mark>
    </code></pre>
</div>

---

### **Updating `Chat.cshtml` for Online Users**
Previously, the chat only handled messages, but now **online users are tracked**, and users joining or leaving are displayed.

<div class="code-block">
    <button class="copy-button">📋 Copy</button>
    <pre><code class="updated-code">
<mark>&lt;h3&gt;Online Users&lt;/h3&gt;</mark>
<mark>&lt;ul id="onlineUsers"&gt;&lt;/ul&gt;</mark>
    </code></pre>
</div>

---

### **JavaScript Updates for Real-Time User Notifications**
Handles **user join/leave events** and displays online users dynamically.

<div class="code-block">
    <button class="copy-button">📋 Copy</button>
    <pre><code class="updated-code">
&lt;script&gt;
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", function (user, message) {
    const msg = `${user}: ${message}`;
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);
});

<mark>
// Handle user joining the chat
connection.on("UserJoined", function (user) {
    const li = document.createElement("li");
    li.textContent = `${user} has joined the chat.`;
    document.getElementById("messagesList").appendChild(li);
});
</mark>

<mark>
// Handle user leaving the chat
connection.on("UserLeft", function (user) {
    const li = document.createElement("li");
    li.textContent = `${user} has left the chat.`;
    document.getElementById("messagesList").appendChild(li);
});
</mark>

<mark>
// Update online users list
connection.on("OnlineUsers", function (users) {
    const userList = document.getElementById("onlineUsers");
    userList.innerHTML = ""; // Clear the list
    users.forEach(function (user) {
        const li = document.createElement("li");
        li.textContent = user;
        userList.appendChild(li);
    });
});
</mark>

<mark>
// Request online users on connection start
connection.start().then(() => {
    connection.invoke("GetOnlineUsers");
}).catch(err => console.error(err.toString()));
</mark>
&lt;/script&gt;
    </code></pre>
</div>

---

# **3. Username for Messages Taken from Signed-in User**
Previously, users manually entered their name before sending a message. Now, messages **automatically use the signed-in user's name**.

### **Updated `ChatHub.cs` to Remove Username Parameter**
We no longer need the client to send the username—SignalR retrieves it from the authentication context.

```csharp
public async Task SendMessage(string message)
{
    string user = Context.User.Identity.Name;

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
```

### **Updated JavaScript for Sending Messages**
```js
function sendMessage() {
    const messageInput = document.getElementById("messageInput");

    if (!messageInput) {
        console.error("Message input field not found.");
        return;
    }

    const message = messageInput.value.trim();

    if (!message) {
        console.error("Cannot send an empty message.");
        return;
    }

    connection.invoke("SendMessage", message).catch(function (err) {
        console.error(err.toString());
    });

    messageInput.value = ""; // Clear the input field after sending
}
```

### **Updated Razor Page**
```razor
<!-- Message input field -->
<input type="text" id="messageInput" placeholder="Type your message..." />
<button onclick="sendMessage()">Send</button>
```

### **Key Changes**
- **Removed `userInput`** from JavaScript.
- **SignalR now automatically uses `User.Identity.Name`**.
- **No need for clients to pass their username** anymore.

---

## **Final Thoughts**
### ✅ **SignalR Integration**
- Messages are now stored in the database.
![Screenshot 2025-01-28 171737](https://github.com/user-attachments/assets/cac8d0d7-2ba2-421a-85c8-e0ad3ac2566a)

### ✅ **Online Users Display**
- Users appear/disappear in the online list dynamically.
- Notifications when users join/leave.
- ![image](https://github.com/user-attachments/assets/e8f7eeb0-dd76-4e47-b943-48748b80208f)

### ✅ **Username for Messages from Signed-in User**
- No need for users to type their name.
- Messages are automatically attributed to the authenticated user.
![signinAsUserName](https://github.com/user-attachments/assets/4628f845-803e-41a4-9db9-47aeec72509d)


This structure ensures a **smooth, real-time chat experience with proper authentication and user tracking**. 🚀

### **Recap of Changes**
- The **Chat Model** was updated to use structured message objects (`Message` class) instead of simple strings.
- Messages now **persist in the database**, ensuring that they remain available even after a server restart or page refresh.
- The chat UI dynamically **retrieves messages** from the database and updates in real time using SignalR.
- **Hardcoded test messages were removed**, ensuring that only actual messages sent by users appear.

With these improvements, the chat application has evolved into a **fully functional real-time messaging system with database-backed persistence**. 🎉

---

# **✅ File Upload & Image Preview**
## **🔹 Client-Side File Upload Handling**
This code enables **file selection and preview** before uploading.

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
✅ **Ensures selected images are displayed before uploading.**

---

# **✅ Fixes Implemented**
### **🛠 Fix 1: Ensuring Both Text & Files Send Correctly**
**Problem:** Previously, only text messages worked, and uploaded images **did not persist** in chat.  
**Fix:** Updated `sendMessage()` function to check for **both** text and file inputs.

#### **✅ Updated `sendMessage()`**
```javascript
function sendMessage() {
    const message = messageInput.value.trim();
    const file = fileInput.files[0];
    const user = "@User.Identity.Name"; // Get logged-in user's name

    if (!file && message === "") {
        console.warn("Message is empty, not sending.");
        return;
    }

    if (file) {
        const formData = new FormData();
        const token = uploadForm.querySelector('input[name="__RequestVerificationToken"]').value;

        formData.append("file", file);
        formData.append("__RequestVerificationToken", token);

        console.log("Uploading file...");

        fetch(uploadForm.action, {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Upload failed");
            }
            return response.text();
        })
        .then(fileUrl => {
            console.log("File uploaded successfully:", fileUrl);

            // ✅ Send the file URL as a message
            connection.invoke("SendMessage", user, fileUrl)
                .then(() => console.log("File message sent successfully"))
                .catch(err => console.error("Error sending file message:", err));

            // ✅ Reset input fields
            messageInput.value = "";
            fileInput.value = "";
            imagePreview.style.display = "none";
            imagePreview.src = "";
        })
        .catch(error => console.error("Error uploading file:", error));
    } else {
        console.log("Sending text message:", message);

        connection.invoke("SendMessage", user, message)
            .then(() => console.log("Text message sent successfully"))
            .catch(err => console.error("Error sending text message:", err));

        messageInput.value = "";
    }
}
```
✅ **Now supports both file uploads and text messages in chat.**  

---

### **🛠 Fix 2: Ensure Messages Persist Instead of Being Overwritten**
**Problem:** The message list was being reset when new messages arrived.  
**Fix:** **Append new messages** instead of clearing the message list.

#### **✅ Updated `ReceiveMessage` Handler**
```javascript
connection.on("ReceiveMessage", function (user, message) {
    const messagesList = document.getElementById("messagesList");
    const li = document.createElement("li");

    if (typeof message === "string" && message.startsWith("/uploads/")) {
        const fileLink = document.createElement("a");
        fileLink.href = message;
        fileLink.textContent = message.split("/").pop(); // Extracts file name
        fileLink.target = "_blank";

        li.textContent = `${user}: `;
        li.appendChild(fileLink);
    } else {
        li.textContent = `${user}: ${message}`;
    }

    // ✅ Ensure the message is ADDED to the list instead of replacing it
    messagesList.appendChild(li);
});
```
✅ **Messages and uploaded files now stay in the chat history.**

---

### **🛠 Fix 3: Ensure Online Users Stay Visible**
**Problem:** The online users list was being **reset improperly**.  
**Fix:** **Ensure `OnlineUsers` updates properly in `ChatHub.cs`**.

#### **✅ Updated `ChatHub.cs`**
```csharp
private static readonly HashSet<string> OnlineUsers = new();

public override async Task OnConnectedAsync()
{
    string userName = Context.User?.Identity?.Name;
    if (!string.IsNullOrEmpty(userName))
    {
        OnlineUsers.Add(userName);
        await Clients.All.SendAsync("UserJoined", userName);
        await Clients.All.SendAsync("OnlineUsers", OnlineUsers); // ✅ Send updated list
    }
}

public override async Task OnDisconnectedAsync(Exception? exception)
{
    string userName = Context.User?.Identity?.Name;
    if (!string.IsNullOrEmpty(userName))
    {
        OnlineUsers.Remove(userName);
        await Clients.All.SendAsync("UserLeft", userName);
        await Clients.All.SendAsync("OnlineUsers", OnlineUsers); // ✅ Send updated list
    }
}

// ✅ Allow users to manually request the current online users list
public Task GetOnlineUsers()
{
    return Clients.Caller.SendAsync("OnlineUsers", OnlineUsers);
}
```
✅ **Ensures online users update correctly when someone joins or leaves.**

---

# **🎉 Final Working Version**
Everything is now working:
✅ **Text messages persist in the chat.**  
✅ **File uploads work, and images appear as clickable links.**  
✅ **Online users remain visible and update correctly.**  

---

## **📌 Chat Interface with Uploaded Image & Messages**
✨ **File upload, preview, and real-time messaging fully functional!**

<table align="center" style="border: 2px solid #ddd; border-radius: 10px; padding: 10px; background: #fff;">
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/f45fcb37-8140-45de-a6ee-f9863efb8059" width="90%">
    </td>
  </tr>
</table>

---

## **📌 `money.png` Successfully Uploaded & Stored**
✨ **File uploaded and stored in `wwwroot/uploads` directory.**

<div align="center" style="border: 2px solid #ddd; padding: 8px; border-radius: 8px; background: #fff; display: inline-block;">
    <img src="https://github.com/user-attachments/assets/d4879f2a-6631-4fae-a83a-f02fb2205678" width="85%">
</div>

---

### ✅ **Key Takeaways**
- 🏆 **Real-time chat messages and file uploads work seamlessly.**
- 🖼️ **Image preview appears inside the message box before sending.**
- 📂 **Files are correctly stored in the server and accessible via links.**
- 🚀 **Chat updates dynamically with online users and messages.**

💡 **Next Step?** Consider adding a delete button (❌) to remove uploaded files before sending! 🎯

---


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
Here's how you can continue your Markdown documentation with the latest changes, including the **image preview inside the message container**.

---

```markdown
# **Preview image displays in message container**
To enhance the file upload experience, an image preview now **appears directly inside the message input field** before sending. This ensures users can see the selected image clearly before it is uploaded.

![Image Preview in Message Box](https://github.com/user-attachments/assets/KWdKGvuGxPQ7dg6qhjFbdi)

---

### **💡 Changes Implemented**
To achieve this, the following updates were made:

## **1️⃣ HTML Changes**
The **image preview element** was moved inside the **message input container** for better alignment.

```html
<form id="chatForm" method="post" enctype="multipart/form-data" asp-antiforgery="true" action="/Chat">
    @Html.AntiForgeryToken()

    <div class="chat-container">
        <!-- ✅ Wraps input field and image preview together -->
        <div class="message-input-container">
            <input type="text" id="messageInput" placeholder="Type your message..." />
            <img id="imagePreview" style="display: none;" />
        </div>

        <label for="fileInput" class="file-upload">
            📎
            <input type="file" id="fileInput" name="file" />
        </label>

        <button id="sendButton" type="button">Send</button>
    </div>
</form>
```
🔹 **Key Change**: `#imagePreview` is now inside `.message-input-container` rather than floating separately.

---

## **2️⃣ CSS Fixes**
Adjustments were made to **properly align** the image inside the message input field.

```css
.chat-container {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 8px 12px;
    background-color: #f9f9f9;
    max-width: 600px;
    margin: auto;
    position: relative;
}

.message-input-container {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    border-radius: 8px;
    background: #fff;
    padding: 4px;
}

#messageInput {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
}

#imagePreview {
    height: 140px;  /* ✅ Ensures proper size */
    width: 140px;
    object-fit: cover; /* ✅ Keeps aspect ratio */
    border-radius: 8px;
    margin-left: 10px; /* ✅ Adds spacing between text input and image */
}
```
🔹 **Key Change**: `#imagePreview` now stays inside `.message-input-container` and is properly aligned with a **fixed size of 140px**.

---

## **3️⃣ JavaScript Enhancements**
The file input change event was updated to correctly **display the preview inside the message box**.

```js
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
🔹 **Key Change**: The preview is dynamically shown **inside the message input field** when a file is selected.

---

## **🎯 Final Outcome**
With these changes:
✅ **Users now see a preview of their selected image before sending.**  
✅ **The preview appears directly inside the message input field.**  
✅ **Improved UI experience, making file uploads feel more intuitive.**  
![Screenshot 2025-01-29 181445](https://github.com/user-attachments/assets/93034f3b-fd59-4d4b-b4df-23a746309a95)

---

**Next Steps:**  
Now that the image preview is inside the message box, the next improvement could be **adding a close button (❌) on the preview** to allow users to remove an uploaded file before sending. 🚀

---



---

## **🔒 Private Messaging Implementation**
Now that **public messaging and file uploads** are working, let's add **private messaging** so users can send **direct messages** to each other.

---

### **1️⃣ Updating `Message` Class**
First, modify your `Message` class to support **private messages**.

```csharp
public class Message
{
    public int Id { get; set; }
    public string User { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
    public bool IsPrivate { get; set; } // ✅ True for private messages
    public string? Recipient { get; set; } // ✅ Null for public messages
}
```

---

### **2️⃣ Keeping Track of Connected Users**
Modify `ChatHub.cs` to maintain a **dictionary** of connected users.

```csharp
private static readonly Dictionary<string, string> ConnectedUsers = new();

public override async Task OnConnectedAsync()
{
    var userName = Context.User?.Identity?.Name ?? Context.ConnectionId;
    ConnectedUsers[userName] = Context.ConnectionId;

    // Notify clients about online users
    await Clients.All.SendAsync("OnlineUsers", ConnectedUsers.Keys);
    await base.OnConnectedAsync();
}

public override async Task OnDisconnectedAsync(Exception? exception)
{
    var userEntry = ConnectedUsers.FirstOrDefault(x => x.Value == Context.ConnectionId);
    if (!string.IsNullOrEmpty(userEntry.Key))
    {
        ConnectedUsers.Remove(userEntry.Key);
        await Clients.All.SendAsync("OnlineUsers", ConnectedUsers.Keys);
    }
    await base.OnDisconnectedAsync(exception);
}
```

---

### **3️⃣ Sending & Receiving Private Messages**
Now, **add private messaging** to `ChatHub.cs`:

```csharp
public async Task SendPrivateMessage(string recipientUserName, string message)
{
    var senderUserName = Context.User?.Identity?.Name ?? Context.ConnectionId;

    if (ConnectedUsers.TryGetValue(recipientUserName, out var recipientConnectionId))
    {
        // ✅ Send the private message only to the recipient
        await Clients.Client(recipientConnectionId).SendAsync("ReceivePrivateMessage", senderUserName, message);

        // ✅ Send acknowledgment to sender
        await Clients.Caller.SendAsync("PrivateMessageSent", recipientUserName, message);
    }
    else
    {
        // ✅ Notify sender if recipient is offline
        await Clients.Caller.SendAsync("UserNotAvailable", recipientUserName);
    }
}
```

---

### **4️⃣ Updating the Chat Page (`Chat.cshtml`)**
Modify the **UI** to include **private messaging**:

```html
<h3>🔒 Private Messaging</h3>
<div>
    <select id="privateRecipient">
        <option value="" disabled selected>Select a user</option>
    </select>
    <input type="text" id="privateMessageInput" placeholder="Type your private message..." />
    <button id="sendPrivateMessage">Send Private Message</button>
</div>
```

---

### **5️⃣ JavaScript for Private Messaging**
Now, **update JavaScript** in `Chat.cshtml` to handle **sending & receiving private messages**:

```javascript
// ✅ Send a private message
function sendPrivateMessage() {
    const recipient = document.getElementById("privateRecipient").value;
    const message = document.getElementById("privateMessageInput").value.trim();

    if (!recipient || !message) {
        alert("Please select a recipient and enter a message.");
        return;
    }

    connection.invoke("SendPrivateMessage", recipient, message)
        .catch(err => console.error(err.toString()));

    document.getElementById("privateMessageInput").value = "";
}

// ✅ Listen for private messages
connection.on("ReceivePrivateMessage", (senderUserName, message) => {
    const privateLi = document.createElement("li");
    privateLi.innerHTML = `<strong>${senderUserName} (private)</strong>: ${message}`;
    privateLi.classList.add("private-message");
    document.getElementById("messagesList").appendChild(privateLi);
});

// ✅ Populate dropdown with online users
connection.on("OnlineUsers", function (users) {
    const userDropdown = document.getElementById("privateRecipient");
    userDropdown.innerHTML = '<option value="" disabled selected>Select a user</option>';
    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user;
        option.textContent = user;
        userDropdown.appendChild(option);
    });
});

// ✅ Attach event listener to button
document.getElementById("sendPrivateMessage").addEventListener("click", sendPrivateMessage);
```

---

### **6️⃣ UI Styling for Private Messages**
Add **CSS styling** to highlight **private messages**.

```css
.private-message {
    background-color: #f0f8ff;
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
    font-style: italic;
}
```

---

## **📸 Final Working Screenshot**

![Screenshot 2025-01-29 205338](https://github.com/user-attachments/assets/9b42b81d-fcf6-476b-b1a4-4941b441b2b2)


# **Next Steps**
1. **Deploy the app to the cloud** (Azure/AWS/Heroku).
2. **Enhance security** (rate-limiting, CSRF protection, HTTPS).
3. **Add unit & integration tests**.

---
