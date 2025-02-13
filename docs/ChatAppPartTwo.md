---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2 Code Expand & Collapse - content display extend issue**  
## **Real-Time Messaging using SignalR**

![ChatApp](images/ChatApp.png)

---

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>

<!-- Toggle Button -->
        <button class="toggle-button" id="toggleButton">💬 Show Code</button>
        
        <button class="expand-button" aria-label="Expand all lines: ChatHub.cs">
            <!-- Expand (Unfold) Icon - Initially Visible -->
            <svg aria-hidden="true" class="octicon unfold-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.25 10.75a.75.75 0 0 1 1.5 0V12h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0l-2.896-2.896A.25.25 0 0 1 5.104 12H7.25v-1.25Zm-5-2a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"></path>
            </svg>

            <!-- Collapse (Fold) Icon - Initially Hidden -->
            <svg aria-hidden="true" class="octicon fold-icon hidden" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M10.896 2H8.75V.75a.75.75 0 0 0-1.5 0V2H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 2ZM8.75 15.25a.75.75 0 0 1-1.5 0V14H5.104a.25.25 0 0 1-.177-.427l2.896-2.896a.25.25 0 0 1 .354 0l2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25Zm-6.5-6.5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"></path>
            </svg>
        </button>

         <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <!-- Explanation View (Default) -->
    <div id="explanation-tab" class="tab-content active">
        <p><strong>📌 `using ChatApp.Models;`</strong> - Imports the necessary models for database operations.</p>
        <p><strong>📌 `namespace ChatApp.Hubs`</strong> - Groups related classes together under a namespace.</p>
        <p><strong>📌 `private readonly AppDbContext _context;`</strong> - Stores the database context for interacting with the database.</p>
        <p><strong>📌 `public ChatHub(AppDbContext context)`</strong> - Constructor that injects the database context.</p>
        <p><strong>📌 `_context = context;`</strong> - Assigns the injected database context to a private variable for use.</p>
    </div>

<!-- Code View (Initially Hidden) -->
    <div id="code-tab" class="tab-content" style="display:none;">
<div class="code-container">
        <pre class="updated-code language-csharp"><code>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">using</span> ChatApp.Models;
                    <span class="tooltip">Imports the ChatApp models for use in this file.</span>
                </span>
            </span>
            <span class="original-code hidden"><span class="hljs-keyword">using</span> Microsoft.AspNetCore.SignalR;</span>
            <span class="original-code hidden"><span class="hljs-keyword">public</span> <span class="hljs-class-name">class ChatHub</span> : <span class="hljs-class-name">Hub</span></span>
            <span class="original-code hidden">{</span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">namespace</span> ChatApp.Hubs
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ {
                    <span class="tooltip">Opens the namespace block.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger"><span class="hljs-keyword">private readonly</span> <span class="hljs-class-name">AppDbContext</span> _context;
                    <span class="tooltip">Declares a private field for the database context.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> <span class="hljs-class-name">ChatHub</span>(<span class="hljs-class-name">AppDbContext</span> context)
                    <span class="tooltip">Constructor that initializes the ChatHub with a database context.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ {
                    <span class="tooltip">Opens the constructor block.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">_context = context;
                    <span class="tooltip">Assigns the injected database context to the private field.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ }
                    <span class="tooltip">Closes the constructor block.</span>
                </span>
            </span>
            <span class="original-code hidden"><span class="hljs-keyword">public async</span> <span class="hljs-class-name">Task</span> <span class="hljs-function">SendMessage</span>(<span class="hljs-keyword">string</span> user, <span class="hljs-keyword">string</span> message)</span>
            <span class="original-code hidden">{</span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">var</span> newMessage = <span class="hljs-keyword">new</span> <span class="hljs-class-name">Message</span>
                    <span class="tooltip">Creates a new Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ {
                    <span class="tooltip">Opens the Message object initialization block.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     <span class="hljs-keyword">User</span> = user,
                    <span class="tooltip">Assigns the user to the Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     <span class="hljs-keyword">Content</span> = message,
                    <span class="tooltip">Assigns the message content to the Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     <span class="hljs-keyword">Timestamp</span> = DateTime.UtcNow
                    <span class="tooltip">Sets the timestamp of the message to the current UTC time.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ };
                    <span class="tooltip">Closes the Message object initialization block.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ _context.Messages.Add(newMessage);
                    <span class="tooltip">Adds the new message to the database context.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">await</span> _context.SaveChangesAsync();
                    <span class="tooltip">Saves the message asynchronously to the database.</span>
                </span>
            </span>
            <span class="original-code hidden"><span class="hljs-keyword">await</span> Clients.All.SendAsync(<span class="hljs-string">"ReceiveMessage"</span>, user, message);</span>
            <span class="original-code hidden">}</span>
            <span class="original-code hidden">}</span>
        </code></pre>
            </div>
        </div>
    </div>
