const SYSTEM_PROMPT = `You are a helpful assistant on a developer portfolio website. Answer questions about their work, skills, and projects. Be friendly and concise.`;

    const history = [];

    function toggleChat() {
      document.getElementById('chat-panel').classList.toggle('open');
    }

    async function sendMsg() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      addMessage(text, 'user');
      history.push({ role: 'user', content: text });

      const thinking = addMessage('…', 'bot');

      try {
        const res = await fetch('https://chat.jonhuggins.nz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history]
          })
        });
        const data = await res.json();
        console.log(data);
        const reply = data.choices[0].message.content;
        history.push({ role: 'assistant', content: reply });
        thinking.textContent = reply;
      } catch (e) {
        thinking.textContent = e.message;
      }
    }

    function addMessage(text, who) {
      const el = document.createElement('div');
      el.className = `msg ${who}`;
      el.textContent = text;
      const msgs = document.getElementById('chat-messages');
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
      return el;
    }