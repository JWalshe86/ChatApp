document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre code").forEach((block) => {
        const lines = block.innerHTML.split("\n").map(line => line.trim()).filter(line => line !== "");

        block.innerHTML = lines.map((line) => {
            let isAdded = line.startsWith("+");
            let isRemoved = line.startsWith("-");
            let lineWithoutDiffSymbol = line.replace(/^[+-]\s*/, "").trim();

            if (isAdded) {
                return `<span class="added-line">${lineWithoutDiffSymbol}</span>`;
            } else if (isRemoved) {
                return `<span class="removed-line">${lineWithoutDiffSymbol}</span>`;
            } else {
                return `<span class="original-code hidden">${lineWithoutDiffSymbol}</span>`;
            }
        }).join("\n");
    });

    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            codeBlock.querySelectorAll(".original-code").forEach((line) => line.classList.toggle("hidden"));
            this.querySelector(".unfold-icon").classList.toggle("hidden");
            this.querySelector(".fold-icon").classList.toggle("hidden");
        });
    });

    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", function () {
            let codeBlock = button.closest(".code-header").nextElementSibling.querySelector("code");
            let visibleLines = [...codeBlock.querySelectorAll(".added-line, .original-code:not(.hidden)")];
            let codeText = visibleLines.map(line => line.textContent.replace(/^[+-]\s*/, "")).join("\n").trim();
            navigator.clipboard.writeText(codeText).then(() => {
                let originalIcon = button.innerHTML;
                button.innerHTML = `✅ Copied!`;
                setTimeout(() => { button.innerHTML = originalIcon; }, 1500);
            });
        });
    });
});
