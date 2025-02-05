document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        let codeBlock = button.closest('.code-block');
        let codeElement = codeBlock.querySelector('code');

        codeBlock.classList.toggle('expanded');

        if (codeBlock.classList.contains('expanded')) {
            if (!codeElement.dataset.highlighted) { // Ensure it runs only once
                hljs.highlightElement(codeElement);
                codeElement.dataset.highlighted = "true";
            }
        }
    });
});
