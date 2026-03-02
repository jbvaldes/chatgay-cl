// MASTER SEO - CHATGAY.CL (VERSIÓN 9.0 - INVASIÓN BASADA EN DATOS REAELS)

// Priorizamos ciudades con más clics según Search Console al inicio del array
const ciudadesRegiones = ["Santiago", "Chile", "Valparaíso", "Concepción", "Arica", "Iquique", "Antofagasta", "Calama", "La Serena", "Coquimbo", "Viña", "Rancagua", "Talca", "Temuco", "Puerto Montt", "Castro", "Ancud", "Quellón", "Chiloé", "Punta Arenas"];

const comunasRM = [
    "Santiago Centro", "Providencia", "Maipú", "Las Condes", "Independencia", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
];

const todosLosLugares = [...ciudadesRegiones, ...comunasRM, "Gran Santiago", "RM"];

// Términos maestros + Keywords de alto rendimiento detectadas
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

// Fecha dinámica para que Google vea actualización diaria ("Frescura")
const fechaActual = new Date().toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });

const seoConfig = {
    // Título optimizado según consulta #1 en Search Console: "Chat Gay Chile"
    title: `Chat Gay Chile ✨ El Búnker Oficial #1 de Encuentros - ${fechaActual}`,
    description: "ChatGay.cl ✨ Conéctate con gente real en Santiago y regiones. El chat gay anónimo más activo de Chile. Juntas discretas bajo normativa legal PDI y Ley 20.000.",
    keywords: matrizSEO.slice(0, 500).join(", "),
    // Guerrilla text con rotación aleatoria y fecha de actualización
    guerrillaText: `ACTUALIZADO ${fechaActual} - SEGURIDAD PDI CHILE: ` + matrizSEO.sort(() => 0.5 - Math.random()).slice(0, 250).join(" • ")
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar Título Dinámico
    document.title = seoConfig.title;

    // 2. Inyectar/Actualizar Meta Description con validación
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", seoConfig.description);

    // 3. Inyectar/Actualizar Meta Keywords con validación
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = "keywords";
        document.head.appendChild(metaKey);
    }
    metaKey.setAttribute("content", seoConfig.keywords);

    // 4. Inyectar Bloque de Guerrilla (Invisible para humanos, visible para Google)
    const seoDiv = document.createElement("div");
    seoDiv.setAttribute("style", "position:absolute; left:-9999px; top:0; width:1px; height:1px; overflow:hidden; opacity:0; pointer-events:none;");
    seoDiv.innerHTML = `<p>${seoConfig.guerrillaText}</p>`;
    document.body.appendChild(seoDiv);
    
    // 5. Simulación de actividad para mejorar retención (Log interno)
    console.log(`🚀 Búnker SEO V9.0 Armado: ${matrizSEO.length} términos inyectados.`);
    console.log(`📍 Foco actual: Chile y Región Metropolitana.`);
});