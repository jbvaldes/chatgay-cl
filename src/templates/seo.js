// MASTER SEO - CHATGAY.CL (VERSIÓN INVASIÓN TOTAL)
const ciudadesRegiones = ["Arica", "Iquique", "Antofagasta", "Calama", "La Serena", "Coquimbo", "Valparaíso", "Viña", "Rancagua", "Talca", "Concepción", "Temuco", "Puerto Montt", "Castro", "Ancud", "Quellón", "Chiloé", "Punta Arenas"];

const comunasRM = [
    "Santiago", "Independencia", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
];

const todosLosLugares = [...ciudadesRegiones, ...comunasRM, "Gran Santiago", "RM", "Chile"];

// Términos filtrados para SEO agresivo (incluyendo modismos chilenos)
const terminosMaestros = [
    "sexo", "culiar", "cruising", "huecos", "caballos", "maricas", "maricones", "fletos", "lachos", "minos", 
    "activos", "pasivos", "osos", "daddies", "papis", "jovencitos", "pendejos", "musculines", "discretos", 
    "casados", "encuentros", "agresivo", "chat", "bunker", "diversidad", "gay chile", "gay santiago"
];

let matrizSEO = [];

// Generación de la Matriz de Invasión
todosLosLugares.forEach(lugar => {
    matrizSEO.push(`${lugar} gay`);
    matrizSEO.push(`gay ${lugar}`);

    terminosMaestros.forEach(termino => {
        matrizSEO.push(`${termino} ${lugar}`);
        matrizSEO.push(`${termino} gay ${lugar}`);
        matrizSEO.push(`${termino}s ${lugar}`);
    });
});

const seoConfig = {
    title: "ChatGay.cl ✨ El Búnker Oficial de Encuentros en Chile",
    description: "ChatGay.cl ✨ Conéctate con gente real en Santiago, regiones y todo Chile. Encuentros discretos, comunidad activa y el mejor ambiente del país bajo normativa legal chilena.",
    keywords: matrizSEO.slice(0, 500).join(", "), // Limitamos a los primeros 500 para evitar bloqueos de spam excesivo
    guerrillaText: "CHAT GAY CHILE SEGURIDAD PDI: " + matrizSEO.sort(() => 0.5 - Math.random()).slice(0, 250).join(" • ")
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar Título
    document.title = seoConfig.title;

    // 2. Inyectar/Actualizar Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", seoConfig.description);

    // 3. Inyectar/Actualizar Meta Keywords
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = "keywords";
        document.head.appendChild(metaKey);
    }
    metaKey.setAttribute("content", seoConfig.keywords);

    // 4. Inyectar Bloque Invisible para el Bot de Google
    const seoDiv = document.createElement("div");
    // Usamos opacidad 0 y posición absoluta fuera de pantalla para que Google lo lea pero no afecte el diseño
    seoDiv.setAttribute("style", "position:absolute; left:-9999px; top:0; width:1px; height:1px; overflow:hidden; opacity:0;");
    seoDiv.innerHTML = `<p>${seoConfig.guerrillaText}</p>`;
    document.body.appendChild(seoDiv);
    
    console.log(`🚀 Búnker SEO Armado: ${matrizSEO.length} términos inyectados en vivo.`);
});
