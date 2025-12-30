# Gym App

Aplicación móvil (Expo + React Native) para gestionar rutinas de entrenamiento, seguimiento de peso y progreso mensual. La interfaz está optimizada para iOS y Android utilizando [expo-router](https://expo.dev/router) y un sistema de colores con modo claro/oscuro.

## Requisitos previos

- Node.js 18+ y npm.
- [Expo Go](https://expo.dev/go) o un emulador/simulador si quieres probar en dispositivo.
- Cuenta de Expo opcional para usar túneles de conexión.

## Instalación y puesta en marcha

1) Instala dependencias:

```bash
npm install
```

2) Inicia el servidor de desarrollo:

```bash
npm start
```

3) Desde el menú de Expo CLI abre la app en un dispositivo físico (Expo Go), un emulador Android (`npm run android`), o un simulador iOS (`npm run ios` en macOS).

## Scripts disponibles

- `npm start`: inicia el servidor Metro.
- `npm run android` | `npm run ios` | `npm run web`: abre la app en cada plataforma.
- `npm run reset-project`: restaura la plantilla original de Expo.
- `npm run lint`: ejecuta ESLint con la configuración de Expo.

## Estructura principal

- `app/` – rutas basadas en archivos con expo-router.
  - `(tabs)/` – pestañas principales: inicio, explorar, rutinas, progreso y perfil.
  - `(auth)/` – flujo de autenticación simulada (login y registro).
  - `history/` – historial de entrenamientos y detalle por sesión.
  - `routine-day/[id].tsx` – pantalla de sesión diaria con peso, descanso y videos.
  - `progression/[exerciseId].tsx` – historial de carga por ejercicio.
- `src/components/` – tarjetas y controles reutilizables (Progreso, Insights, Quick Actions, etc.).
- `src/data/` – datos mock para rutinas (`userWorkouts`), historial (`workoutHistory`) y rutinas públicas (`routines`).
- `src/theme/` – tema claro/oscuro y hook `useTheme`.
- `constants/` – colores base y temas compartidos.

## Características destacadas

- **Inicio**: saludo contextual, racha, métricas rápidas y accesos directos a historial y progreso.
- **Rutinas asignadas**: pestañas para próximos/pasados, estado de cada día, indicador de descanso o completado y navegación a la sesión.
- **Sesión diaria**: videos embebidos, notas del coach, registro de peso con historial, temporizadores de descanso, colapsado automático al completar y resumen de carga movida.
- **Progreso**: anillo de progreso mensual, KPIs de sesiones/racha/minutos, insights rápidos y distribución de grupos musculares.
- **Historial**: lista de sesiones con porcentaje completado y detalle por fecha.
- **Autenticación simulada**: contexto de usuario para login/logout y flujo básico de registro.
- **Soporte de tema**: alterna entre paletas clara y oscura desde `ThemeProvider`.

## Notas de desarrollo

- La app usa TypeScript y Expo SDK 54.
- Los datos están mockeados; sustituye las fuentes en `src/data/` por llamadas a tu backend cuando sea necesario.
- No se requiere backend para explorar la UI; todas las interacciones funcionan de manera local.
