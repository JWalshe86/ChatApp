---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2 Abstract Classes**  
## **Real-Time Messaging using SignalR**

![ChatApp](images/ChatApp.png)

---

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">MessageBase.cs</span>

<!-- Toggle Button -->
        <button class="toggle-button" id="toggleButton">💬 Show Explanation</button>
        
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <!-- Code View (Default) -->
    <div id="code-tab" class="tab-content active" style="display:block;">
<div class="code-container">
        <pre class="updated-code language-csharp"><code>
            <span class="added-line tooltip-container">
                + { 
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> int ID { get; set; }
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> string Sender { get; set; }
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> DateTime TimeStamp { get; set; }
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> abstract string DisplayContent();
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
             <span class="added-line tooltip-container">
                + }
            </span>            
           
        </code></pre>
            </div>
    </div>
        
        <!-- Explanation View (Initially Hidden) -->
    <div id="explanation-tab" class="tab-content" style="display:none;">
        <p><strong>📌 `using ChatApp.Models;`</strong> - Imports the necessary models for database operations.</p>
        <p><strong>📌 `namespace ChatApp.Hubs`</strong> - Groups related classes together under a namespace.</p>
        <p><strong>📌 `private readonly AppDbContext _context;`</strong> - Stores the database context for interacting with the database.</p>
        <p><strong>📌 `public ChatHub(AppDbContext context)`</strong> - Constructor that injects the database context.</p>
        <p><strong>📌 `_context = context;`</strong> - Assigns the injected database context to a private variable for use.</p>
    </div>
    </div>
