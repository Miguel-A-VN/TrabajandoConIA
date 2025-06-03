# ResumidoriA

ResumidoriA es una aplicación web que permite resumir textos utilizando inteligencia artificial a través de Gemini (Google) y modelos de OpenRouter (Gemma, Mistral, DeepSeek). El frontend está construido en HTML, CSS y JavaScript, y el backend en Node.js con Express.

## Características

- Resumen automático de textos usando IA.
- Soporte para múltiples modelos: Gemini, Gemma, Mistral y DeepSeek.
- Interfaz sencilla y responsiva.
- Backend seguro: las claves API nunca se exponen al frontend.

## Estructura del Proyecto

```
Proyecto-asincronidad/
│
├── .env
├── app.js
├── package.json
├── /public
│   ├── /scripts
│   │   └── script.js
│   └── /styles
│       └── style.css
├── /views
│   └── index.html
```

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   PORT=3000
   API_GEMINI=tu_clave_gemini
   API_OPENROUTER=tu_clave_openrouter
   ```

   > **Nota:** Las claves API deben ser válidas y estar activas.

4. **Inicia el servidor:**
   ```sh
   npm start
   ```
   O en modo desarrollo:
   ```sh
   npm run dev
   ```

5. **Abre la aplicación:**
   Ve a [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. Escribe el texto que deseas resumir en el área de texto.
2. Haz clic en "Enviar".
3. Espera las respuestas de los modelos IA en la parte inferior.

## Tecnologías utilizadas

- Node.js
- Express
- HTML5, CSS3, JavaScript
- [Gemini API (Google)](https://ai.google.dev/)
- [OpenRouter API](https://openrouter.ai/)

## Notas de seguridad

- **Nunca expongas tus claves API en el frontend.**
- Las claves se almacenan en el archivo `.env` y solo el backend las utiliza.

## Problemas comunes

### Gemini: "The model is overloaded. Please try again later."

Este error significa que el modelo de Gemini está temporalmente sobrecargado y no puede procesar tu solicitud.  
**Solución:** Espera unos minutos y vuelve a intentarlo. No es un problema de tu código ni de tu clave.

### Gemini: "API key not valid. Please pass a valid API key."

Esto indica que tu clave API de Gemini es inválida o está mal escrita.  
**Solución:**  
- Verifica que la clave en tu `.env` sea correcta, sin espacios ni comillas.
- Reinicia el servidor después de cambiar el `.env`.

### OpenRouter: "No auth credentials found"

Esto indica que la clave API de OpenRouter no está siendo enviada o es incorrecta.  
**Solución:**  
- Verifica la variable `API_OPENROUTER` en tu `.env`.
- Asegúrate de reiniciar el servidor tras cualquier cambio.

## Licencia

Este proyecto es solo para fines educativos.

---

# Soporte

Si tienes problemas, revisa la consola del navegador y la terminal del servidor para ver mensajes de error detallados.

---
