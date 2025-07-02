# 📄 vanilla-documents

## 🚀 Objectiu del projecte

Aquest projecte és una prova de frontend on es demana implementar una aplicació per gestionar documents, amb notificacions en temps real i diverses funcionalitats modernes. La premissa era utilitzar vanilla JavaScript tant com fos possible, afegint només paquets per millorar el desenvolupament, la qualitat i el testing.

## 🧑‍💻 Decisions tècniques

- _Vanilla JS + TS_: S'ha prioritzat la simplicitat i la claredat, sense frameworks pesats. S'ha utilitzat TypeScript per seguretat i mantenibilitat.
- _Estructura modular_: Components i contenidors separats per facilitar l'escalabilitat i la reutilització.
- _Testing exhaustiu_: S'han afegit eines modernes per garantir la qualitat del codi i la robustesa de l'app.
- _Integració contínua local_: Amb Husky i scripts per assegurar que tot passa per format, lint, tipus i tests abans de fer commit.

## 📦 Paquets instal·lats

### 🔧 Desenvolupament

- `vite`: Bundler ultraràpid per dev i build.
- `typescript`: Tipatge estàtic.
- `eslint`, `eslint-config-prettier`, `typescript-eslint`: Linting i format.
- `prettier`: Formatador de codi.
- `husky`: Hooks de git per garantir qualitat abans de fer commit.

### 🧪 Testing

- `vitest`: Testing unitari i de components, compatible amb Jest API.
- `jsdom`: Simulació del DOM per tests.
- `@playwright/test`, `playwright`: E2E testing multiplataforma.

### 🛠️ Altres

- `storybook`: Documentació visual i desenvolupament aïllat de components.

## 🏗️ Scripts útils

```bash
pnpm install           # Instal·la dependències
pnpm run dev           # Arrenca el frontend (Vite)
pnpm run server        # Arrenca el backend (Go)
pnpm run storybook     # Storybook per components
pnpm run test          # Tests unitaris (Vitest)
pnpm run e2e           # Tests E2E (Playwright)
```

## ✨ Funcionalitats implementades

- Lazy loading (DocumentForm)
- Error boundaries
- Offline mode
- Dark theme
- Notificacions en temps real via WebSocket
- Estructura escalable i modular
- Testing unitari i E2E

## 🤔 Justificació de les decisions

- _Simplicitat_: Vanilla JS/TS permet entendre fàcilment el flux i la lògica sense cap framework que amagui la complexitat.
- _Escalabilitat_: L'estructura modular i l'ús de components facilita afegir noves funcionalitats.
- _Qualitat_: Linting, format i testing automàtic garanteixen un codi net i robust.
- _Experiència de desenvolupament_: Vite i Storybook fan que el desenvolupament sigui àgil i visual.

## 🧪 Testing i qualitat

- _Unit tests_: `vitest`
- _E2E tests_: `playwright`
- _Lint/Format_: `eslint`, `prettier`
- _Pre-commit_: `husky` executa format, lint, tipus i tests abans de cada commit.

## 📝 Execució

1. Clona el repo
2. `pnpm install`
3. `pnpm run dev` (frontend) i `pnpm run server` (backend)
4. `pnpm run test` i `pnpm run e2e` per executar els tests

## 🌑 Mode fosc i offline

- El mode fosc es pot activar/desactivar des de la UI.
- L'app funciona en mode offline per defecte si es perd la connexió.

## 📚 Storybook

- Executa `pnpm run storybook` per veure i provar components de forma aïllada.

## 💡 Conclusions

Aquest projecte demostra que es pot construir una aplicació moderna, robusta i escalable amb vanilla JS/TS i una selecció mínima però potent d'eines per al desenvolupament i testing.
