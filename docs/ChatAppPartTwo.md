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

<!-- Tabs Section - START -->

    <div class="tabs">
        <div class="tab active" data-target="code-tab">💻 Code</div>
        <div class="tab" data-target="explanation-tab">📜 Explanation</div>
    </div>

    <!-- Code Content -->
    <div id="code-tab" class="content active">




<div class="code-container">

    <pre class="updated-code language-csharp"><code>
<span class="tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">using</span> ChatApp.Models;</span>
    <span class="tooltip">Imports ChatApp models.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">namespace</span> ChatApp.Hubs</span>
    <span class="tooltip">Defines the namespace.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ {</span>
    <span class="tooltip">Opens namespace.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">private readonly</span> AppDbContext _context;</span>
    <span class="tooltip">Database context field.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> ChatHub(AppDbContext context)</span>
    <span class="tooltip">Constructor with dependency injection.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ {</span>
    <span class="tooltip">Opens constructor.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">_context = context;</span>
    <span class="tooltip">Assigns database context.</span>
</span>

<span class="tooltip-container">
    <span class="tooltip-trigger">+ }</span>
    <span class="tooltip">Closes constructor.</span>
</span>
            </code></pre>
    </div>
</div>
<!-- Explanation Content -->
    <div id="explanation-tab" class="content">
        <p><strong>📌 `using ChatApp.Models;`</strong> - Imports the necessary models for database operations.</p>
        <p><strong>📌 `namespace ChatApp.Hubs`</strong> - Groups related classes together under a namespace.</p>
        <p><strong>📌 `private readonly AppDbContext _context;`</strong> - Stores the database context for interacting with the database.</p>
        <p><strong>📌 `public ChatHub(AppDbContext context)`</strong> - Constructor that injects the database context.</p>
        <p><strong>📌 `_context = context;`</strong> - Assigns the injected database context to a private variable for use.</p>
    </div>
    </div>
