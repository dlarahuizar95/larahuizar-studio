# LaraHuizar.Studio

Creative Brief Generator — AI-powered ad mockup prompt tool.

## Deploy to Vercel (paso a paso)

### 1. Sube el proyecto a GitHub

```bash
cd larahuizar-studio
git init
git add .
git commit -m "first commit"
```

Ve a github.com → New repository → nombre: `larahuizar-studio` → Create
Luego copia los comandos que te da GitHub para subir el código.

### 2. Deploy en Vercel

1. Ve a vercel.com → Log in with GitHub
2. Click "Add New Project"
3. Selecciona el repo `larahuizar-studio`
4. Click "Deploy" (sin cambiar nada)

### 3. Agrega tu API Key (IMPORTANTE)

En Vercel, después del deploy:
1. Settings → Environment Variables
2. Add new:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (tu key nueva de console.anthropic.com)
3. Click Save
4. Ve a Deployments → click los 3 puntos → Redeploy

### 4. Tu URL pública

Vercel te da una URL tipo: `larahuizar-studio.vercel.app`
Puedes cambiarla en Settings → Domains.

## Password de acceso

`FamiliaLara0514`

Para cambiarlo: edita `index.html` línea con `ACCESS_HASH` y reemplaza con `btoa('TuNuevoPassword')`.

## Archivos del proyecto

```
larahuizar-studio/
├── index.html          ← toda la app
├── api/
│   └── generate.js     ← proxy seguro a Anthropic API
├── vercel.json         ← configuración de Vercel
└── README.md           ← este archivo
```

## Contacto

Maintained by dlarahuizar@gmail.com
