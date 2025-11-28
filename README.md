### ✨ Tecnologías empleadas

- **Transformaciones 3D en CSS:** Permiten rotar la carta en un espacio tridimensional realista, generando la impresión de volumen y respuesta física a la luz.
- **Gradientes y modos de fusión (*blend modes*):** Se utilizan para crear el brillo iridiscente y los reflejos metálicos propios de un efecto holográfico.
- **JavaScript:** Calcula la posición del cursor en tiempo real y actualiza variables CSS personalizadas, haciendo que toda la composición reaccione suavemente al movimiento.

---

### 🪄 Explicación de los efectos visuales

Para entender qué aporta ese toque casi “mágico”, conviene fijarse en varios detalles esenciales:

#### 📐 Perspectiva tridimensional  
- **`perspective: 1000px;` en el `body`:** Imprescindible para que la rotación en los ejes X e Y tenga profundidad real. Sin esta propiedad, la carta se vería plana y sin volumen.

#### 🌈 Mezcla de colores y brillo holográfico  
- **`mix-blend-mode: color-dodge;`:** La clave del efecto holográfico. Este modo hace que los colores aparezcan solo en las zonas claras, como si la luz real estuviera rebotando en una superficie iridiscente.

#### 🔮 Doble capa de iluminación  
- **`.card-shine` (Brillo holográfico):**  
  Usa un gradiente lineal con tonos translúcidos y neón. Su posición se actualiza con JavaScript, dando la sensación de que la textura cambia según el ángulo de visión.

- **`.card-glare` (Destello puntual):**  
  Un gradiente radial blanco que sigue exactamente al ratón, simulando el punto donde la luz incide con mayor intensidad sobre la superficie de la carta.

#### 🪂 Profundidad en el texto  
- **`translateZ(30px)`:**  
  Desplaza el texto hacia afuera, separándolo del fondo. Al rotar la carta, el texto parece flotar sobre la imagen, creando un elegante efecto *parallax*.

---
```
