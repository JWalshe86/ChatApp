document.addEventListener("DOMContentLoaded", function () {
    hljs.highlightAll(); // Apply syntax highlighting first

    // Reapply 'original-code' and 'new-line' classes after highlight.js modifies DOM
    document.querySelectorAll(".original-code").forEach(originalElement => {
        let highlightedElements = originalElement.parentNode.querySelectorAll("span");

        highlightedElements.forEach(span => {
            // Ensure each highlighted span inside the original code keeps its class
            span.classList.add("original-code");
        });
    });

    document.querySelectorAll(".new-line").forEach(line => {
        let highlightedElements = line.parentNode.querySelectorAll("span");

        highlightedElements.forEach(span => {
            span.classList.add("new-line");
        });
    });
});
