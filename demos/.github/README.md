# GitHub Actions Workflows

Este proyecto incluye workflows automatizados de GitHub Actions para mantener la calidad del código.

## 🚀 Workflows Disponibles

### Code Formatting Check (`prettier-check.yml`)

**Propósito:** Verificar que todo el código cumpla con los estándares de formato definidos en Prettier antes de permitir merges.

#### Cuando se ejecuta:

- En pull requests hacia las ramas `main` y `develop`
- Solo cuando se modifican archivos en `src/`, `.prettierrc` o `.prettierignore`

#### Qué hace:

1. **Instala Node.js 18** con cache de npm
2. **Instala dependencias** del proyecto
3. **Ejecuta `npm run format:check`** para verificar formato
4. **Falla el workflow** si el código no está formateado correctamente
5. **Comenta en el PR** con instrucciones para corregir

#### Comportamiento:

- ✅ **Si pasa:** El PR puede ser mergeado
- ❌ **Si falla:** El PR queda bloqueado hasta que se corrija el formato

#### Cómo corregir errores de formato:

```bash
# Formatear automáticamente todo el código
npm run format

# Verificar que todo esté correcto
npm run format:check

# Hacer commit de los cambios
git add .
git commit -m "fix: format code with Prettier"
git push
```

#### Configuración de Prettier:

- **Ancho de línea:** 100 caracteres
- **Indentación:** 2 espacios
- **Comillas:** Simples
- **Puntos y coma:** Siempre
- **Comas finales:** En todas partes (`all`)
- **Saltos de línea:** LF (Unix)
- **Saltos de línea:** LF (Unix)

### Code Quality Check (`lint-check.yml`)

**Propósito:** Verificar que el código cumpla con las reglas de calidad y estilo definidas en ESLint (estándar Airbnb).

#### Cuando se ejecuta:

- En pull requests hacia las ramas `main` y `develop`
- Solo cuando se modifican archivos en `src/` o `eslint.config.mjs`

#### Qué hace:

1. **Instala Node.js 18** con cache de npm
2. **Instala dependencias** del proyecto
3. **Ejecuta `npm run lint`** para verificar calidad del código
4. **Falla el workflow** si hay errores de linting
5. **Comenta en el PR** con instrucciones para corregir

#### Comportamiento:

- ✅ **Si pasa:** El PR puede ser mergeado
- ❌ **Si falla:** El PR queda bloqueado hasta que se corrijan los errores

#### Cómo corregir errores de linting:

```bash
# Corregir automáticamente errores de linting
npm run lint:fix

# Verificar que no queden errores
npm run lint

# Hacer commit de los cambios
git add .
git commit -m "fix: resolve linting issues"
git push
```

## 📋 Requisitos para Contribuir

1. **Formato del código:** Todo el código debe pasar la verificación de Prettier
2. **Pull Requests:** Solo se aceptan PRs que pasen todos los checks automatizados
3. **Corrección:** Si un PR falla, corrige el formato y haz push nuevamente

## 🔧 Comandos Útiles

```bash
# Verificar formato
npm run format:check

# Formatear automáticamente
npm run format

# Ejecutar tests
npm test
```
