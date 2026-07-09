export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Prompt más estricto
    const prompt_sistema = `Eres un generador de casos de detectives. 
    Responde ÚNICAMENTE con un objeto JSON. No escribas nada más, ni explicaciones, ni saludos.
    Formato: {"title": "...", "desc": "...", "clues": {"pista1": "..."}, "suspects": {"A": "..."}, "solution": {"culprit": "...", "proof": "..."}}`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt_sistema }]
            })
        });

        const data = await response.json();
        
        // Limpiamos la respuesta por si la IA añadió texto extra
        let content = data.choices[0].message.content;
        content = content.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const casoGenerado = JSON.parse(content);
        res.status(200).json(casoGenerado);

    } catch (error) {
        // Esto te dirá exactamente el error en el navegador
        res.status(500).json({ error: "Error técnico: " + error.message });
    }
}
