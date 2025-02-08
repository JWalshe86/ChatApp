document.addEventListener("DOMContentLoaded", function () {
    console.log("JS is running");

    document.querySelectorAll(".expand-button").forEach((button) => {
        button.addEventListener("click", function () {
            let codeBlock = this.closest(".code-block");
            let placeholder = codeBlock.querySelector(".original-code-placeholder");

            if (placeholder.innerHTML.trim() === "") {
                // Insert original code dynamically
                placeholder.innerHTML = `
                    <code class="original-code">
                        using System.Text;
                        public class Test {
                        public void Run() { Console.WriteLine("Hello"); }
                        }
                    </code>
                `;
                console.log("✅ Original code inserted.");
            } else {
                // Remove original code when collapsing
                placeholder.innerHTML = "";
                console.log("❌ Original code removed.");
            }

            this.textContent = this.textContent === "Expand" ? "Collapse" : "Expand";
        });
    });

    console.log("✅ JavaScript fully loaded!");
});
