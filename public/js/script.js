document.addEventListener('DOMContentLoaded', () => {

  console.log("DOM loaded");
  const form = document.getElementById("form");
  const preview = document.getElementById("preview");
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById("prompt").value.trim();

    if (!prompt) {
      preview.innerHTML = "Prompt is invalid";
      return;
    };

    try {
      submitBtn.disable = true;
      submitBtn.textContent = 'Checking Grammar...';

      // Request
      const response = await fetch('/api/check-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      // Parsing json

      const responseFromGemini = await response.json();
      console.log(responseFromGemini.response);
      if (responseFromGemini) {
        const rawHtml = marked.parse(responseFromGemini.response);
        const safeHtml = DOMPurify.sanitize(rawHtml);
        preview.innerHTML = safeHtml;
      } else {
        preview.innerHTML = 'No response from LLM';
      }

    } catch (e) {

    } finally {
      submitBtn.disable = false;
      submitBtn.textContent = 'Check grammar';
    }

  });
});
