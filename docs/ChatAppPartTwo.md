---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2**  
## **Real-Time Messaging using SignalR**

![ChatApp](images/ChatApp.png)

---

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="expand-button" aria-label="Expand all lines">Expand all</button>
        <button class="copy-button" aria-label="Copy code">Copy</button>
    </div>

    <div class="code-container">
        <pre class="updated-code language-csharp">
<code>
<span class="added-line">using ChatApp.Models;</span>

<span class="original-code hidden">using Microsoft.AspNetCore.SignalR;</span>
<span class="original-code hidden">public class ChatHub : Hub</span>
<span class="original-code hidden">{</span>

<span class="added-line">namespace ChatApp.Hubs</span>  
<span class="added-line">{</span>
<span class="added-line">private readonly AppDbContext _context;</span>
<span class="added-line">public ChatHub(AppDbContext context)</span>
<span class="added-line">{</span>
<span class="added-line">_context = context;</span>
<span class="added-line">}</span>

<span class="original-code hidden">public async Task SendMessage(string user, string message)</span>
<span class="original-code hidden">{</span>

<span class="added-line">    var newMessage = new Message</span>
<span class="added-line">    {</span>
<span class="added-line">        User = user,</span>
<span class="added-line">        Content = message,</span>
<span class="added-line">        Timestamp = DateTime.UtcNow</span>
<span class="added-line">    };</span>

<span class="added-line">    _context.Messages.Add(newMessage);</span>
<span class="added-line">    await _context.SaveChangesAsync();</span>

<span class="original-code hidden">await Clients.All.SendAsync("ReceiveMessage", user, message);</span>
<span class="original-code hidden">}</span>
<span class="original-code hidden">}</span>
</code>
        </pre>
    </div>
</div>
