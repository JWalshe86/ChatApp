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

----
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
<!-- Code View (Default) -->
<div id="code-tab" class="tab-content active" style="display:block;">
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
   <!-- Explanation View (Initially Hidden) -->
<div id="explanation-tab" class="tab-content" style="display:none;">
    <p><strong>📌 `public abstract class MessageBase`</strong> - This abstract class serves as a blueprint for different message types in the chat app, ensuring they share common properties and behaviors. It includes <strong>`Id`</strong>, which uniquely identifies each message for tracking or database storage, <strong>`Sender`</strong>, which holds the sender's name or identifier, and <strong>`Timestamp`</strong>, which records when the message was sent. Additionally, the class defines an abstract method <strong>`DisplayContent()`</strong>, which forces all derived classes (such as `TextMessage` or `ImageMessage`) to implement their own way of displaying message content. This approach enforces consistency across all message types while allowing flexibility in how messages are presented.</p>
</div>

    </div>

---
<div class="container mt-5">
    <p>
        This <span class="text-primary" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal">
            derived class
        </span> extends `MessageBase` and implements its abstract method, defining how a text message should be displayed in the chat app.
    </p>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Understanding Derived Classes in C#</h5>
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




