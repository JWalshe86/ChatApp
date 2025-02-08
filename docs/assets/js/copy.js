document.querySelectorAll(".updated-code").forEach(codeBlock => {
    codeBlock.classList.remove("hidden"); // Ensure updated code is always visible
    codeBlock.style.display = "block"; // Override any hidden styles
    console.log("✅ Ensured updated code is visible:", codeBlock);
});
