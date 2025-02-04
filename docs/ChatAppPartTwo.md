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
        
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div> <!-- Closing code-header -->

    <pre><code class="updated-code">
        <span class="added-line">namespace ChatApp.Models</span>
        <span class="added-line">{</span>
        <span class="added-line">    public class Message</span>
        <span class="added-line">    {</span>
        <span class="added-line">        public int Id { get; set; } // Primary key</span>
        <span class="added-line">        public string User { get; set; } // Username of the sender</span>
        <span class="added-line">        public string Content { get; set; } // The actual message content</span>
        <span class="added-line">        public DateTime Timestamp { get; set; } // When the message was sent</span>
        <span class="added-line">    }</span>
        <span class="added-line">}</span>
    </code></pre>
</div> <!-- Closing code-block -->


---
<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>
        <button class="expand-button" aria-label="Expand all lines">Expand</button>
    </div>

    <div class="code-container">
        <pre class="updated-code"><code class="language-csharp"></code></pre>
    </div>
</div>
