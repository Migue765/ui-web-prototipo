# Focus - Aplicación Pomodoro

Una aplicación web moderna para aplicar la **Técnica Pomodoro** y mejorar la productividad personal. Desarrollada como proyecto final para la Maestría en UI Design de la Universidad de los Andes.

## 🍅 ¿Qué es la Técnica Pomodoro?

La Técnica Pomodoro es un método de gestión del tiempo que utiliza intervalos de trabajo de 25 minutos, separados por descansos cortos. Esta aplicación te ayuda a:

- **Mantener el enfoque** durante sesiones de trabajo concentrado
- **Gestionar tareas** de manera eficiente
- **Visualizar estadísticas** de productividad
- **Aplicar descansos regulares** para mantener la energía

## ✨ Características Principales

### 🏠 Sesión de Enfoque
- Timer Pomodoro de 25 minutos con controles de play/pausa
- Visualización de la tarea actual en progreso
- Acciones rápidas: Nueva sesión, Ruido blanco, Estadísticas
- Panel lateral con estadísticas rápidas y progreso diario

### 📊 Estadísticas
- Métricas principales: Sesiones completadas, Tiempo total, Tareas finalizadas
- Gráfico de barras: Tiempo por día (últimos 7 días)
- Gráfico circular: Ratio Enfoque/Descanso
- Gráfico de líneas: Tendencias semanales
- Análisis de productividad por día y hora

### 📋 Gestión de Tareas
- Creación y organización de tareas
- Estados: Pendientes, En curso, Completadas
- Sistema de filtros y búsqueda
- Seguimiento de pomodoros por tarea
- Categorización por tipo (Trabajo, Personal, Estudio)

## 🎨 Diseño

El diseño de la aplicación está basado en el prototipo de Figma:
**[Ver Diseño en Figma](https://www.figma.com/design/Z57gppZ5RljnOYWMPCPwC7/Web-UX?node-id=81-1742&p=f&t=t1ZXVTShjgyg8jn8-0)**

### Características del Diseño:
- **Interfaz moderna** con componentes Material Design
- **Paleta de colores** profesional (azul, naranja, verde)
- **Tipografía Roboto** para excelente legibilidad
- **Layout responsivo** optimizado para desktop
- **Navegación intuitiva** con sidebar fijo

## 🚀 Instrucciones para Ejecutar Localmente

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Angular CLI** (se instalará automáticamente)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ui-web-prototipo
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd focus
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Ejecutar la aplicación en modo desarrollo**
   ```bash
   npm start
   ```
   
   O alternativamente:
   ```bash
   ng serve
   ```

5. **Abrir en el navegador**
   - La aplicación estará disponible en: `http://localhost:4200`
   - Si el puerto 4200 está ocupado, Angular sugerirá automáticamente un puerto alternativo

### Comandos Adicionales

- **Compilar para producción**
  ```bash
  npm run build
  ```

- **Ejecutar tests**
  ```bash
  npm test
  ```

- **Ejecutar en puerto específico**
  ```bash
  ng serve --port 4201
  ```

## 🛠️ Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Angular Standalone Components** - Arquitectura moderna
- **CSS Grid & Flexbox** - Layout responsivo
- **SVG** - Gráficos y visualizaciones

## 📱 Navegación de la Aplicación

- **🏠 Inicio**: Sesión de enfoque con timer Pomodoro
- **📊 Estadísticas**: Visualización de métricas y tendencias
- **📋 Tareas**: Gestión completa de tareas y proyectos
- **⚙️ Configuración**: Personalización de la aplicación (próximamente)

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado como parte del programa de Maestría en UI Design de la Universidad de los Andes, enfocándose en:

- **Experiencia de Usuario (UX)** optimizada para productividad
- **Interfaz de Usuario (UI)** moderna y accesible
- **Arquitectura de componentes** escalable y mantenible
- **Responsive Design** para diferentes dispositivos

---

**Proyecto Final - UI Design**  
**Universidad de los Andes**  
**2025**
