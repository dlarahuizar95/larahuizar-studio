export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { system, content } = req.body;

    // Build OpenAI-compatible content array with text and images
    const userParts = content.map(block => {
      if (block.type === 'text') {
        return { type: 'text', text: block.text };
      }
      if (block.type === 'image') {
        return {
          type: 'image_url',
          image_url: {
            url: `data:${block.source.media_type};base64,${block.source.data}`
          }
        };
      }
      return { type: 'text', text: String(block) };
    });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userParts }
        ],
        max_tokens: 1500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
    }

    // Transform to the format expected by the frontend
    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
