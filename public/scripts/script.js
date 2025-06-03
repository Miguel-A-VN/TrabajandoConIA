// import 'dotenv/config';

// const GEMINI_API_KEY = process.env.API_GEMINI; // Reemplaza con tu clave API de Gemini
// const OPENROUTER_API_KEY = process.env.API_OPOENROUTER; // Reemplaza con tu clave API de OpenRouter

// const MODELS = {
//   gemma: 'google/gemma-2b-it',
//   mistral: 'mistralai/mistral-7b-instruct',
//   deepseek: 'deepseek/deepseek-r1-0528:free'
// };

// document.getElementById('chat-form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const inputText = 'Hazme un resumen del siguiente texto: "' +document.getElementById('inputText').value.trim();
//   if (!inputText) {
//     alert("Por favor, ingresa algún texto.");
//     return;
//   }

//   // document.getElementById('loader').style.display = 'block';

//   // Limpiar respuestas anteriores
//   document.getElementById('response-gemini').textContent = '';
//   document.getElementById('response-gemma').textContent = '';
//   document.getElementById('response-mistral').textContent = '';
//   document.getElementById('response-deepseek').textContent = '';

//   // Enviar solicitud a Gemini
//   await sendToGemini(inputText);

//   // Enviar solicitudes a modelos de OpenRouter
//   await sendToOpenRouterModels(inputText);

//   document.getElementById('loader').style.display = 'none';
// });

// async function sendToGemini(inputText) {
//   const responseContainer = document.getElementById('response-gemini');
//   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//   const requestBody = {
//     contents: [
//       {
//         parts: [
//           {
//             text: inputText
//           }
//         ]
//       }
//     ]
//   };

//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Error en la API de Gemini:", errorData);
//       responseContainer.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido.'}`;
//       return;
//     }

//     const data = await response.json();

//     if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
//       const respuesta = data.candidates[0].content.parts[0].text;
//       responseContainer.textContent = respuesta;
//     } else {
//       responseContainer.textContent = "No se recibió contenido en la respuesta o la estructura es inesperada.";
//       console.log("Respuesta completa de la API de Gemini:", data);
//     }

//   } catch (error) {
//     console.error("Error en la solicitud a la API de Gemini:", error);
//     responseContainer.textContent = "Error al conectar con la API de Gemini.";
//   }
// }

// async function sendToOpenRouterModels(inputText) {
//   for (const [key, model] of Object.entries(MODELS)) {
//     const responseElement = document.getElementById(`response-${key}`);
//     if (responseElement) {
//       responseElement.textContent = 'Cargando...';
//     }

//     try {
//       const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           model: model,
//           messages: [
//             { role: 'user', content: inputText }
//           ]
//         })
//       });

//       const data = await response.json();
//       const responseText = data.choices?.[0]?.message?.content || 'Sin respuesta';

//       if (responseElement) {
//         responseElement.textContent = responseText;
//       }
//     } catch (error) {
//       if (responseElement) {
//         responseElement.textContent = 'Error al obtener respuesta';
//       }
//       console.error(`Error con el modelo ${model}:`, error);
//     }
//   }
// }





const MODELS = {
  gemma: 'google/gemma-2b-it',
  mistral: 'mistralai/mistral-7b-instruct',
  deepseek: 'deepseek/deepseek-r1-0528:free'
};

document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputText = 'Hazme un resumen del siguiente texto: "' + document.getElementById('inputText').value.trim();
  if (!inputText) {
    alert("Por favor, ingresa algún texto.");
    return;
  }

  // document.getElementById('loader').style.display = 'block';

  // Limpiar respuestas anteriores
  document.getElementById('response-gemini').textContent = '';
  document.getElementById('response-gemma').textContent = '';
  document.getElementById('response-mistral').textContent = '';
  document.getElementById('response-deepseek').textContent = '';

  // Enviar solicitud a Gemini (a tu backend)
  await sendToGemini(inputText);

  // Enviar solicitudes a modelos de OpenRouter (a tu backend)
  await sendToOpenRouterModels(inputText);

  document.getElementById('loader').style.display = 'none';
});

async function sendToGemini(inputText) {
  const responseContainer = document.getElementById('response-gemini');
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputText })
    });
    const data = await response.json();
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      responseContainer.textContent = data.candidates[0].content.parts[0].text;
    } else {
      responseContainer.textContent = "No se recibió contenido. Respuesta completa: " + JSON.stringify(data);
    }
  } catch (error) {
    responseContainer.textContent = "Error al conectar con la API de Gemini.";
  }
}

// ...existing code...
async function sendToOpenRouterModels(inputText) {
  for (const [key, model] of Object.entries(MODELS)) {
    const responseElement = document.getElementById(`response-${key}`);
    if (responseElement) responseElement.textContent = 'Cargando...';
    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, model })
      });
      const data = await response.json();
      // Mostrar error si existe
      if (data.error) {
        // Si error es un objeto, muestra el mensaje o el objeto completo
        if (typeof data.error === 'object') {
          responseElement.textContent = `Error: ${data.error.message || JSON.stringify(data.error)}`;
        } else {
          responseElement.textContent = `Error: ${data.error}`;
        }
        continue;
      }
      // Mostrar respuesta si existe
      const responseText = data.choices?.[0]?.message?.content;
      if (responseText) {
        responseElement.textContent = responseText;
      } else {
        responseElement.textContent = "Sin respuesta. Respuesta completa: " + JSON.stringify(data);
      }
    } catch (error) {
      if (responseElement) responseElement.textContent = 'Error al obtener respuesta';
    }
  }
}