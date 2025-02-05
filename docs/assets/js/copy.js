document.querySelector(".expand-button").addEventListener("click", function () {
    let originalLines = document.querySelectorAll(".original-code");
    originalLines.forEach(line => line.classList.toggle("hidden"));

    // Toggle button text
    this.textContent = this.textContent === "Expand all" ? "Collapse" : "Expand all";
});
