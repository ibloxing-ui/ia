export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: "Genera un caso de detective. Responde solo con JSON." }]
            })
        });

        const data = await response.json();

        // AQUÍ ESTÁ EL TRUCO: Si no es un éxito (200), mostramos qué respondió OpenAI
        if (!response.ok) {
            return res.status(500).json({ error: "OpenAI dice: " + JSON.stringify(data) });
        }

        const casoGenerado = JSON.parse(data.choices[0].message.content);
        res.status(200).json(casoGenerado);

    } catch (error) {
        res.status(500).json({ error: "Error técnico: " + error.message });
    }
}
