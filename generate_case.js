export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const prompt_sistema = `Genera un caso de detective único. 
    Devuelve estrictamente un JSON con este formato exacto: 
    {
      "title": "Nombre del caso",
      "desc": "Descripción inicial",
      "clues": {"pista1": "Descripción"},
      "suspects": {"A": "Dialogo A", "B": "Dialogo B"},
      "solution": {"culprit": "A", "proof": "pista1"}
    }`;

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
        const casoGenerado = JSON.parse(data.choices[0].message.content);
        res.status(200).json(casoGenerado);
    } catch (error) {
        res.status(500).json({ error: "No se pudo generar el caso" });
    }
}
