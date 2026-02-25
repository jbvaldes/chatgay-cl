// MASTER SEO - CHATGAY.CL (REUNIÓN DE TODOS LOS TÉRMINOS)
const ciudadesRegiones = ["Arica", "Iquique", "Antofagasta", "Calama", "La Serena", "Coquimbo", "Valparaíso", "Viña", "Rancagua", "Talca", "Concepción", "Temuco", "Puerto Montt", "Castro", "Ancud", "Quellón", "Chiloé", "Punta Arenas"];

const comunasRM = [
    "Santiago", "Independencia", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
];

const todosLosLugares = [...ciudadesRegiones, ...comunasRM, "Gran Santiago", "RM", "Chile"];

// JUNTANDO TODOS LOS TÉRMINOS ENTREGADOS
const terminosMaestros = [
    "sexo", "culiar", "cruising", "huecos", "caballos", "maricas", "maricones", "fletos", "lachos", "minos", 
    "activos", "pasivos", "osos", "daddies", "papis", "jovencitos", "pendejos", "musculines", "discretos", 
    "casados", "encuentros", "agresivo", "chat", "bunker", "diversidad"
];

let matrizSEO = [];

// Generación de la Matriz de Invasión
todosLosLugares.forEach(lugar => {
    // Combinación básica (ej: Santiago gay)
    matrizSEO.push(`${lugar} gay`);
    matrizSEO.push(`gay ${lugar}`);

    terminosMaestros.forEach(termino => {
        // Combinación término + lugar (ej: huecos castro)
        matrizSEO.push(`${termino} ${lugar}`);
        // Combinación término + gay + lugar (ej: osos gay maipu)
        matrizSEO.push(`${termino} gay ${lugar}`);
        // Plurales automáticos
        matrizSEO.push(`${termino}s ${lugar}`);
    });
});

const seoConfig = {
    title: "ChatGay.cl ✨ El Búnker Oficial de Encuentros en Chile",
    description: "ChatGay.cl ✨ Conéctate con gente real en Santiago, regiones y todo Chile. Encuentros discretos, comunidad activa y el mejor ambiente del país.",
    keywords: matrizSEO.join(", "),
    guerrillaText: "CHAT GAY CHILE: " + matrizSEO.sort(() => 0.5 - Math.random()).slice(0, 250).join(" • ")
};

document.addEventListener("DOMContentLoaded", () => {
    // Inyectar en el HEAD
    document.title = seoConfig.title;
    document.querySelector('meta[name="description"]').setAttribute("content", seoConfig.description);
    document.querySelector('meta[name="keywords"]').setAttribute("content", seoConfig.keywords);

    // Inyectar Bloque Oculto para Google
    const seoDiv = document.createElement("div");
    seoDiv.setAttribute("style", "display:none; visibility:hidden; height:0; width:0; overflow:hidden;");
    seoDiv.innerHTML = `<p>${seoConfig.guerrillaText}</p>`;
    document.body.appendChild(seoDiv);
    
    console.log(`🚀 SEO Consolidado: ${matrizSEO.length} términos inyectados.`);
});
