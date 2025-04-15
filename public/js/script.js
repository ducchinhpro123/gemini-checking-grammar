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

      const responseFromGemini = await response.json();

      if (responseFromGemini) {
        preview.innerHTML = responseFromGemini.response;
      } else {
        preview.innerHTML = 'No response from LLM';
      }

    } catch (e) {
      preview.innerHTML = 'Something went wrong';
    } finally {
      submitBtn.disable = false;
      submitBtn.textContent = 'Check grammar';
    }

  });
});
