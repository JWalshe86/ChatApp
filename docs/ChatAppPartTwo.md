<div class="code-container">
        <pre class="updated-code"><code>
            <span class="added-line hljs-namespace tooltip-container">
                <span class="tooltip-trigger">+ using ChatApp.Models;
                    <span class="tooltip">Imports the ChatApp models for use in this file.</span>
                </span>
            </span>
            <span class="original-code hidden hljs-namespace">using Microsoft.AspNetCore.SignalR;</span>
            <span class="original-code hidden hljs-keyword">public</span> <span class="hljs-class-name">class ChatHub</span> : <span class="hljs-class-name">Hub</span>
            <span class="original-code hidden">{</span>
            <span class="added-line hljs-namespace tooltip-container">
                <span class="tooltip-trigger">+ namespace ChatApp.Hubs
                    <span class="tooltip">Defines the namespace for the ChatHub class.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ {
                    <span class="tooltip">Opens the namespace block.</span>
                </span>
            </span>
            <span class="added-line hljs-keyword tooltip-container">
                <span class="tooltip-trigger">private readonly AppDbContext _context;
                    <span class="tooltip">Declares a private field for the database context.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">
                    <span class="hljs-keyword">public</span> <span class="hljs-class-name">ChatHub</span>(<span class="hljs-params">AppDbContext context</span>)
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
            <span class="original-code hidden hljs-keyword">public async</span> <span class="hljs-class-name">Task</span> <span class="hljs-function">SendMessage</span>(<span class="hljs-params"><span class="hljs-keyword">string</span> user, <span class="hljs-keyword">string</span> message</span>)
            <span class="original-code hidden">{</span>
            <span class="added-line hljs-keyword tooltip-container">
                <span class="tooltip-trigger">+ var newMessage = new Message
                    <span class="tooltip">Creates a new Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+ {
                    <span class="tooltip">Opens the Message object initialization block.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     User = user,
                    <span class="tooltip">Assigns the user to the Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     Content = message,
                    <span class="tooltip">Assigns the message content to the Message object.</span>
                </span>
            </span>
            <span class="added-line tooltip-container">
                <span class="tooltip-trigger">+     Timestamp = DateTime.UtcNow
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
                <span class="tooltip-trigger">+ await _context.SaveChangesAsync();
                    <span class="tooltip">Saves the message asynchronously to the database.</span>
                </span>
            </span>
            <span class="original-code hidden hljs-keyword">await</span> Clients.All.SendAsync(<span class="hljs-string">"ReceiveMessage"</span>, user, message);</span>
            <span class="original-code hidden">}</span>
            <span class="original-code hidden">}</span>
        </code></pre>
    </div>
</div>
