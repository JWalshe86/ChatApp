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
        <button class="expand-button" aria-label="Expand all lines">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-unfold" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.25 10.75a.75.75 0 0 1 1.5 0V12h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0l-2.896-2.896A.25.25 0 0 1 5.104 12H7.25v-1.25Z"></path>
            </svg>
        </button>
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <div class="code-container">
        <pre class="updated-code language-csharp"><code>
<span class="added-line">+ using ChatApp.Models;</span>

<span class="original-code hidden">using Microsoft.AspNetCore.SignalR;</span>
<span class="original-code hidden">public class ChatHub : Hub</span>
<span class="original-code hidden">{</span>

<span class="added-line">+ namespace ChatApp.Hubs</span>
<span class="added-line">+ {</span>
<span class="added-line">+ private readonly AppDbContext _context;</span>
<span class="added-line">+ public ChatHub(AppDbContext context)</span>
<span class="added-line">+ {</span>
<span class="added-line">+ _context = context;</span>
<span class="added-line">+ }</span>

<span class="original-code hidden">public async Task SendMessage(string user, string message)</span>
<span class="original-code hidden">{</span>

<span class="added-line">+ var newMessage = new Message</span>
<span class="added-line">+ {</span>
<span class="added-line">+     User = user,</span>
<span class="added-line">+     Content = message,</span>
<span class="added-line">+     Timestamp = DateTime.UtcNow</span>
<span class="added-line">+ };</span>

<span class="added-line">+ _context.Messages.Add(newMessage);</span>
<span class="added-line">+ await _context.SaveChangesAsync();</span>

<span class="original-code hidden">await Clients.All.SendAsync("ReceiveMessage", user, message);</span>
<span class="original-code hidden">}</span>
<span class="original-code hidden">}</span>
</code></pre>
    </div> <!-- ✅ Moved closing </div> to wrap everything inside .code-block -->
</div> <!-- ✅ Closing .code-block div -->
