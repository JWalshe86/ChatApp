document.addEventListener("DOMContentLoaded", function () {
    // Ensure original code is fully removed from layout impact
document.querySelectorAll(".original-code").forEach(line => {
    line.style.display = "none";
    line.style.visibility = "hidden";
    line.style.opacity = "0";
    line.style.height = "0px"; // Ensure it does not take up space
    line.style.margin = "0"; // Remove margin spacing
    line.style.padding = "0"; // Remove padding

    console.log("❌ Fully removed original code from layout:", getComputedStyle(line));
});

// Double-check all parent containers to remove forced height or overflow
document.querySelectorAll(".code-container, .code-block").forEach(container => {
    container.style.removeProperty("display");
    container.style.removeProperty("visibility");
    container.style.removeProperty("opacity");
    container.style.removeProperty("max-height");
    container.style.removeProperty("overflow");

    console.log("✅ Ensured all parent containers have no forced height/overflow.");
});

});
