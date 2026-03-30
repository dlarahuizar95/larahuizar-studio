export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { system, content } = req.body;

    // Convert Anthropic-style content blocks to Gemini parts
    const parts = content.map(block => {
      if (block.type === 'text') {
        return { text: block.text };
      }
      if (block.type === 'image') {
        return {
          inline_data: {
            mime_type: block.source.media_type,
            data: block.source.data
          }
        };
      }
      return { text: String(block) };
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    // Transform Gemini response to match the format expected by the frontend
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
