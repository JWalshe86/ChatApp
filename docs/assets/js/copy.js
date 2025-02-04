document.addEventListener("DOMContentLoaded", function () {
    // Expand Button Toggle Functionality
    document.querySelector(".expand-button").addEventListener("click", function () {
        let updatedCodeBlock = document.querySelector(".updated-code");
        
        if (updatedCodeBlock.classList.contains("expanded")) {
            updatedCodeBlock.classList.remove("expanded");
            this.textContent = "Expand";
        } else {
            updatedCodeBlock.classList.add("expanded");
            this.textContent = "Collapse";
        }
    });
});
