<script>
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    // Reapply added-line styling AFTER syntax highlighting runs
    setTimeout(() => {
        document.querySelectorAll(".added-line").forEach((line) => {
            line.style.backgroundColor = "#e6ffed"; // Reapply green color
            line.style.borderLeft = "3px solid #28a745"; // Reapply left border
            line.style.display = "inline-block"; // Ensures background extends full width
            line.style.width = "100%";
        });
    }, 500); // Give time for Highlight.js to modify DOM
});
</script>
