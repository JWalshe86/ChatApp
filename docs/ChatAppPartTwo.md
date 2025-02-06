<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="expand-button" aria-label="Expand all lines">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-unfold" 
                viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0Z"></path>
            </svg>
        </button>
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-unfold" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.25 10.75a.75.75 0 0 1 1.5 0V12h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0l-2.896-2.896A.25.25 0 0 1 5.104 12H7.25v-1.25Zm-5-2a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"></path></svg>
        </button>
    </div>

    <!-- ✅ Wraps the code inside code-container (inside .code-block) -->
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
    </div>
</div> <!-- ✅ Properly closed .code-block -->
