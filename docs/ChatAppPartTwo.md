---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2 Abstract Classes**  
## **Real-Time Messaging using SignalR**

![ChatApp](images/ChatApp.png)

---
<div class="container mt-5">
    <p>
    This <span class="text-primary" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal">
            abstract class
        </span> serves as a blueprint for different message types in the chat app, ensuring they share common properties and behaviors.
    </p>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Understanding Abstract Classes in C#</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    An <b>abstract class</b> in C# is a class that cannot be instantiated directly. 
                    It serves as a base class for other classes and can contain both abstract methods 
                    (without implementation) and concrete methods (with implementation).

                    <pre><code class="language-csharp">
// Abstract class example
public abstract class Animal
{
    public string Name { get; set; }
    public abstract void MakeSound();
}

// Concrete class implementing the abstract method
public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof! Woof!");
    }
}
                    </code></pre>

                    Abstract classes allow for shared behavior while enforcing a contract for derived classes.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">MessageBase.cs</span>

<!-- Toggle Button -->
        <button class="toggle-button" id="toggleButton" data-target="messagebase">💬 Show Explanation</button>
        
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <!-- Code View (Default) -->
<!-- Code View (Default) -->
<div id="code-tab-messagebase"  class="tab-content active" style="display:block;">
    <div class="code-container">
        <pre class="updated-code language-csharp"><code>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> abstract class MessageBase
        <span class="tooltip">Defines a base class for different types of messages.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> int Id { get; set; }
        <span class="tooltip">Unique identifier for each message.</span>
    </span>
</span>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> string Sender { get; set; }
        <span class="tooltip">Stores the sender's name.</span>
    </span>
</span>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> DateTime Timestamp { get; set; }
        <span class="tooltip">Records when the message was sent.</span>
    </span>
</span>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> abstract string DisplayContent();
        <span class="tooltip">Forces child classes to define how content is displayed.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ }</span>          
        </code></pre>
    </div>
</div>

<!-- Explanation View (Initially Hidden) -->
<div id="explanation-tab-messagebase" class="tab-content" style="display:none;">
    <p>
        <strong>📌 <code>public abstract class MessageBase</code></strong> - 
        This abstract class serves as a <strong>blueprint</strong> for different message types in the chat app, 
        ensuring they share <strong>common properties</strong> and behaviors.
        It includes:
    </p>
    <ul>
        <li><strong><code>Id</code></strong> - Uniquely identifies each message for <strong>tracking or database storage</strong>.</li>
        <li><strong><code>Sender</code></strong> - Holds the <strong>sender's name or identifier</strong>.</li>
        <li><strong><code>Timestamp</code></strong> - Records <strong>when the message was sent</strong>.</li>
    </ul>
    <p>
        Additionally, the class defines an <strong>abstract method</strong> <code>DisplayContent()</code>, which forces all derived classes 
        (such as <code>TextMessage</code> or <code>ImageMessage</code>) to <strong>implement their own way</strong> of displaying message content.
        This <strong>enforces consistency</strong> across all message types while allowing <strong>flexibility</strong> in how messages are presented.
    </p>
</div>

    </div>

---

## **Derived Text Message Class**

<div class="container mt-5">
    <p>
        This <span class="text-primary" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#derivedClassModal">
            derived class
        </span> extends `MessageBase` and implements its abstract method, defining how a text message should be displayed in the chat app.
    </p>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="derivedClassModal" tabindex="-1" aria-labelledby="derivedClassModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="derivedClassModalLabel">Understanding Derived Classes in C#</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    A <b>derived class</b> in C# is a class that **inherits from a base class**, meaning it gains all the properties and methods of the base class but can also provide its own unique functionality. In this chat application, `TextMessage` is a derived class of `MessageBase`, meaning it follows the structure defined in `MessageBase` but also provides a custom implementation for `DisplayContent()`.

                    <pre><code class="language-csharp">
using System;

namespace ChatApp.Models
{
    // Derived class for text messages
    public class TextMessage : MessageBase
    {
        public string Text { get; set; }

        // Implementing abstract method
        public override string DisplayContent()
        {
            return $"{Sender}: {Text} (Sent at {Timestamp})";
        }
    }
}
                    </code></pre>

                    The `TextMessage` class **inherits** all the properties from `MessageBase`, including `Id`, `Sender`, and `Timestamp`, ensuring all message types share these attributes. However, since `MessageBase` is an **abstract class**, `TextMessage` must implement the `DisplayContent()` method, which defines how text messages are formatted when displayed.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
---
<div class="code-block">
    <div class="code-header">
        <span class="code-filename">TextMessage.cs</span>

        <!-- Toggle Button -->
        <button class="toggle-button" id="toggleButtonTextMessage" data-target="textmessage">💬 Show Explanation</button>
        
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <!-- Code View (Default) -->
    <div id="code-tab-textmessage" class="tab-content active" style="display:block;">
        <div class="code-container">
            <pre class="updated-code language-csharp"><code>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">using</span> System;
        <span class="tooltip">Includes system functionalities such as DateTime.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">namespace</span> ChatApp.Models
        <span class="tooltip">Defines the namespace for organizing related classes.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> class TextMessage : MessageBase
        <span class="tooltip">This class extends `MessageBase` to handle text messages.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> string Text { get; set; }
        <span class="tooltip">Holds the actual text content of the message.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> override string DisplayContent()
        <span class="tooltip">Overrides `DisplayContent()` to define how text messages are displayed.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">return</span> $"{Sender}: {Text} (Sent at {Timestamp})";
        <span class="tooltip">Formats the message display string with sender, text, and timestamp.</span>
    </span>
</span>

<span class="added-line tooltip-container">+ }</span> <!-- Closing DisplayContent Method -->
<span class="added-line tooltip-container">+ }</span> <!-- Closing TextMessage Class -->
<span class="added-line tooltip-container">+ }</span> <!-- Closing Namespace -->
            </code></pre>
        </div>
    </div>

    <!-- Explanation View (Initially Hidden) -->
    <div id="explanation-tab-textmessage" class="tab-content" style="display:none;">
    <p>
        <strong>📌 <code>public class TextMessage : MessageBase</code></strong> - 
        This class <strong>inherits</strong> from <code>MessageBase</code>, making it a <strong>derived class</strong>. 
        It specializes in handling <strong>text-based messages</strong> while maintaining the 
        <strong>shared properties</strong> of all messages.
    </p>
    <ul>
        <li><strong><code>Text</code></strong> - Holds the <strong>actual message content</strong>.</li>
    </ul>
    <p>
        Additionally, it <strong>overrides</strong> the <strong>abstract method</strong> <code>DisplayContent()</code>, 
        providing a <strong>custom format</strong> for displaying text messages in the chat application. 
        This ensures that each message type can <strong>define its own structure</strong> while still 
        adhering to a <strong>common contract</strong>.
    </p>
</div>

</div> <!-- Closing .code-block -->

## **Derived Image Message Class**

<div class="container mt-5">
    <p>
        This <span class="text-primary" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#derivedImageClassModal">
            derived class
        </span> extends `MessageBase` and implements its abstract method, defining how an image message should be displayed in the chat app.
    </p>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="derivedImageClassModal" tabindex="-1" aria-labelledby="derivedImageClassModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="derivedImageClassModalLabel">Understanding Derived Classes in C#</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    A <b>derived class</b> in C# is a class that **inherits from a base class**, meaning it gains all the properties and methods of the base class but can also provide its own unique functionality. In this chat application, `ImageMessage` is a derived class of `MessageBase`, meaning it follows the structure defined in `MessageBase` but also provides a custom implementation for `DisplayContent()`.

                    <pre><code class="language-csharp">
using System;

namespace ChatApp.Models
{
    // Derived class for image messages
    public class ImageMessage : MessageBase
    {
        public string ImageUrl { get; set; }

        // Implementing abstract method
        public override string DisplayContent()
        {
            return $"{Sender} shared an image: {ImageUrl} (Sent at {Timestamp})";
        }
    }
}
                    </code></pre>

                    The `ImageMessage` class **inherits** all the properties from `MessageBase`, including `Id`, `Sender`, and `Timestamp`, ensuring all message types share these attributes. However, since `MessageBase` is an **abstract class**, `ImageMessage` must implement the `DisplayContent()` method, which defines how image messages are formatted when displayed. The addition of the `ImageUrl` property allows this class to handle image-specific data.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

---

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ImageMessage.cs</span>

        <!-- Toggle Button -->
        <button class="toggle-button" id="toggleButtonImageMessage" data-target="imagemessage">💬 Show Explanation</button>
        
        <button class="copy-button" aria-label="Copy code">
            <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
    </div>

    <!-- Code View (Default) -->
    <div id="code-tab-imagemessage" class="tab-content active" style="display:block;">
        <div class="code-container">
            <pre class="updated-code language-csharp"><code>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">using</span> System;
        <span class="tooltip">Includes system functionalities such as DateTime.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">namespace</span> ChatApp.Models
        <span class="tooltip">Defines the namespace for organizing related classes.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> class ImageMessage : MessageBase
        <span class="tooltip">This class extends `MessageBase` to handle image messages.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> string ImageUrl { get; set; }
        <span class="tooltip">Holds the URL for the image being sent.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> override string DisplayContent()
        <span class="tooltip">Overrides `DisplayContent()` to define how image messages are displayed.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">return</span> $"{Sender} shared an image: {ImageUrl} (Sent at {Timestamp})";
        <span class="tooltip">Formats the message display string with sender, image URL, and timestamp.</span>
    </span>
</span>

<span class="added-line tooltip-container">+ }</span> <!-- Closing DisplayContent Method -->
<span class="added-line tooltip-container">+ }</span> <!-- Closing ImageMessage Class -->
<span class="added-line tooltip-container">+ }</span> <!-- Closing Namespace -->
            </code></pre>
        </div>
    </div>

    <!-- Explanation View (Initially Hidden) -->
    <div id="explanation-tab-imagemessage" class="tab-content" style="display:none;">
    <p>
        <strong>📌 <code>public class ImageMessage : MessageBase</code></strong> - 
        This class inherits from <code>MessageBase</code>, making it a <strong>derived class</strong>. 
        It specializes in handling <strong>image-based messages</strong> while maintaining the shared properties of all messages.
        It includes a unique property, <code>ImageUrl</code>, which holds the <strong>URL of the image</strong> being sent. 
        Additionally, it <strong>overrides the abstract method</strong> <code>DisplayContent()</code>, 
        providing a custom format for displaying image messages in the chat application. 
        This ensures each message type can define its own structure while still adhering to a common contract.
    </p>
</div>


</div> <!-- Closing .code-block -->

-----
## **Updating ChatHub.cs**

<div class="container mt-5">
    <p>
        I had to update the 
        <span class="text-primary" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#hubExplanationModal">
            Hub
        </span> 
        to support multiple message types and database integration.
    </p>

    <!-- Bootstrap Modal for Hub Explanation -->
    <div class="modal fade" id="hubExplanationModal" tabindex="-1" aria-labelledby="hubExplanationModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="hubExplanationModalLabel">Understanding SignalR Hubs</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    A <b>Hub</b> in SignalR is a **central communication point** that allows clients and the server to interact in real-time. 
                    It acts as a **WebSocket-based hub**, managing connections, broadcasting messages, and handling events.

                    <ul>
                        <li><strong>Handles Client-Server Communication</strong> - Allows real-time messaging between users.</li>
                        <li><strong>Manages Connections</strong> - Tracks online users and disconnects.</li>
                        <li><strong>Supports Multiple Message Types</strong> - Like text and image messages.</li>
                    </ul>

                    **Example Hub Code:**
                    <pre><code class="language-csharp">
using Microsoft.AspNetCore.SignalR;
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
                    </code></pre>

                    In the updated `ChatHub.cs`, we extended this by allowing **different message types**, integrating a **database context**, 
                    and ensuring messages persist.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="code-block">
    <div class="code-header">
        <span class="code-filename">ChatHub.cs</span>

        <!-- Toggle Button -->
<button class="toggle-button" data-target="chathub">
    📜 Show Explanation
</button>

        <button class="expand-button" aria-label="Expand all lines: ChatHub.cs">
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

  <!-- Code View (Default) -->
   <div id="code-tab-chathub" class="tab-content active" style="display:block;">
        <div class="code-container">
            <pre class="updated-code language-csharp"><code>
<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">using</span> ChatApp.Models;
        <span class="tooltip">Imports the ChatApp models for use in this file.</span>
    </span>
</span>
<span class="original-code hidden"><span class="hljs-keyword">using</span> Microsoft.AspNetCore.SignalR;</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">namespace</span> ChatApp.Hubs
        <span class="tooltip">Defines the namespace for the ChatHub class.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ {</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">private readonly</span> <span class="hljs-class-name">AppDbContext</span> _context;
        <span class="tooltip">Declares a private field for the database context.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">public</span> <span class="hljs-class-name">ChatHub</span>(<span class="hljs-class-name">AppDbContext</span> context)
        <span class="tooltip">Constructor that initializes the ChatHub with a database context.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ { _context = context; }</span>

<span class="original-code hidden"><span class="hljs-keyword">public async</span> <span class="hljs-class-name">Task</span> <span class="hljs-function">SendMessage</span>(<span class="hljs-keyword">string</span> user, <span class="hljs-keyword">string</span> message)</span>
<span class="original-code hidden">{</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">MessageBase</span> newMessage;
        <span class="tooltip">Declares a variable to hold the appropriate message type.</span>
    </span>
</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">if</span> (messageType == "text")
        <span class="tooltip">Checks if the message is a text message.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ { newMessage = <span class="hljs-keyword">new</span> <span class="hljs-class-name">TextMessage</span> { Sender = user, Text = content, Timestamp = DateTime.UtcNow }; }</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ <span class="hljs-keyword">else if</span> (messageType == "image")
        <span class="tooltip">Checks if the message is an image message.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ { newMessage = <span class="hljs-keyword">new</span> <span class="hljs-class-name">ImageMessage</span> { Sender = user, ImageUrl = content, Timestamp = DateTime.UtcNow }; }</span>

<span class="added-line tooltip-container">
    <span class="tooltip-trigger">+ _context.Messages.Add(newMessage);
        <span class="tooltip">Saves the message to the database.</span>
    </span>
</span>
<span class="added-line tooltip-container">+ await _context.SaveChangesAsync();</span>
<span class="added-line tooltip-container">+ await Clients.All.SendAsync("ReceiveMessage", newMessage);</span>

</code></pre>
        </div>
    </div>
</div>

<!-- Explanation View (Initially Hidden) -->
<div id="explanation-tab-chathub" class="tab-content" style="display:none;">
    <p>
        <strong>📌 <code>ChatHub</code></strong> - The <code>ChatHub</code> class acts as the <strong>real-time communication hub</strong> for the chat application, enabling users to send and receive messages instantly. It leverages <strong>SignalR</strong> to manage connections and broadcast messages to all connected clients.
    </p>
    <p>
        This hub is integrated with <strong>Entity Framework</strong> to store messages persistently in a database. The <strong>database context (<code>AppDbContext</code>)</strong> is injected into the <code>ChatHub</code> constructor to allow seamless interaction with the database.
    </p>
    <p>
        The <code>SendMessage</code> method is responsible for processing incoming messages. Based on the <strong>message type (<code>text</code> or <code>image</code>)</strong>, it dynamically creates a <code>TextMessage</code> or <code>ImageMessage</code> object, ensuring that different types of messages are properly handled.
    </p>
    <p>
        Once the message is created, it is <strong>saved to the database</strong> and then <strong>broadcasted</strong> to all connected clients using SignalR’s <code>Clients.All.SendAsync</code> method. This ensures that every user in the chat receives messages in real-time, even if they were sent from another client.
    </p>
    <p>
        This approach keeps the <strong>chat system scalable</strong>, allowing for future expansion with new message types while ensuring consistency in data storage and real-time delivery.
    </p>
</div>


