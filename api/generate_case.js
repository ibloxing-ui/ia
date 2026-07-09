export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Esta es tu "Biblioteca de Casos". Puedes añadir todos los que quieras aquí.
    const bibliotecaDeCasos = [
        {
            "title": "El misterio de la tinta borrada",
            "desc": "Un manuscrito antiguo aparece con páginas en blanco en una biblioteca privada.",
            "clues": {"pista1": "Hay restos de un borrador químico en el escritorio."},
            "suspects": {"A": "El bibliotecario envidioso", "B": "El heredero arruinado"},
            "solution": {"culprit": "A", "proof": "pista1"}
        },
        {
            "title": "El reloj de arena detenido",
            "desc": "Un reloj de arena se rompió en una habitación cerrada sin ventanas.",
            "clues": {"pista1": "El cristal tiene huellas de guantes de seda."},
            "suspects": {"A": "La institutriz", "B": "El mayordomo"},
            "solution": {"culprit": "B", "proof": "pista1"}
        }
    ];

    // Elegir uno al azar
    const casoElegido = bibliotecaDeCasos[Math.floor(Math.random() * bibliotecaDeCasos.length)];

    res.status(200).json(casoElegido);
}
