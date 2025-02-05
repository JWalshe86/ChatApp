---
layout: default
title: ChatApp Part Two
---

# **ChatApp Part 2**  
## **Real-Time Messaging with SignalR**

![ChatApp](images/ChatApp.png)

---

<div class="diff-container">
  <div class="diff-header">1 file changed, +10 -30</div>
  <table class="diff-table">
    <tr>
      <td class="line-num">1</td>
      <td class="line-num"></td>
      <td class="removed">- console.log("DOM fully loaded!");</td>
    </tr>
    <tr>
      <td class="line-num"></td>
      <td class="line-num">1</td>
      <td class="added">+ document.querySelectorAll('.expand-button').forEach(button => {</td>
    </tr>
    <tr>
      <td class="line-num"></td>
      <td class="line-num">2</td>
      <td class="added">+ button.addEventListener('click', () => {</td>
    </tr>
  </table>
</div>
