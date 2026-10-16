# Parcial02-ProgramacionWeb

Aplicación web de inventario construida con React y Vite. Presenta un catálogo de productos de ejemplo y el diseño de una base de datos para SQL Server.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm
- SQL Server (para ejecutar posteriormente el esquema; la interfaz usa datos locales de demostración)

## Ejecutar

```powershell
npm install
npm run dev
```

Para validar el código y generar la versión de producción:

```powershell
npm run lint
npm run build
```

## Estructura

```text
- frontend/: componentes React, estilos, recursos estáticos y configuración Vite/ESLint.
- backend/database/schema.sql: esquema y datos de ejemplo para SQL Server.
- package.json: scripts para desarrollo, lint, build y preview.
```

El frontend es funcional con datos de demostración en memoria. `backend/database/schema.sql` define la base de datos para SQL Server; todavía no hay una API conectada a la aplicación.
