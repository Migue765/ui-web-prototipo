# Assets Directory

Esta carpeta contiene todos los recursos estáticos de la aplicación Focus.

## Estructura de carpetas:

### `/images/`
- **`/statistics/`** - Imágenes de referencia para el diseño de estadísticas
- Otras imágenes de la aplicación

### `/icons/`
- Iconos personalizados de la aplicación
- SVGs y otros formatos de iconos

## Cómo usar las imágenes:

### En componentes TypeScript:
```typescript
// Para imágenes
const imagePath = 'assets/images/statistics/example.png';

// Para iconos
const iconPath = 'assets/icons/example.svg';
```

### En templates HTML:
```html
<!-- Para imágenes -->
<img src="assets/images/statistics/example.png" alt="Descripción">

<!-- Para iconos -->
<img src="assets/icons/example.svg" alt="Icono">
```

### En archivos SCSS:
```scss
.background-image {
    background-image: url('assets/images/statistics/example.png');
}
```

## Instrucciones para agregar imágenes:

1. **Para imágenes de referencia de estadísticas:**
   - Coloca las imágenes en `/src/assets/images/statistics/`
   - Usa nombres descriptivos como `metric-cards-design.png`

2. **Para iconos:**
   - Coloca los iconos en `/src/assets/icons/`
   - Prefiere formato SVG para mejor escalabilidad

3. **Formatos recomendados:**
   - Imágenes: PNG, JPG, WebP
   - Iconos: SVG, PNG
   - Tamaño optimizado para web

Las imágenes estarán disponibles en la aplicación después de hacer `ng build` o `ng serve`.
