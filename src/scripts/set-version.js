/**
 * Script para generar un archivo `version.json` con metadatos de compilación.
 *
 * Datos incluidos:
 * - `version`: Última etiqueta Git (via `git describe --tags`).
 * - `commit`: Hash corto del último commit.
 * - `buildDate`: Fecha y hora actual del build (zona horaria: América/México_City).
 *
 * El archivo se escribe en: `/public/assets/version.json`
 *
 * Uso típico: se ejecuta como parte del proceso de build para mostrar versión en la UI.
 */
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { format } from 'date-fns-tz';

const gitVersion = execSync('git describe --tags').toString().trim();
const commit = execSync('git rev-parse HEAD').toString().substr(0, 8).trim();
const filePath = './public/assets/version.json';
const timeZone = 'America/Mexico_City';
const buildDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss zzz', { timeZone });

const versionFileContent = `{
  "version": "${gitVersion}",
  "commit": "${commit}",
  "buildDate": "${buildDate}"
}`;

writeFileSync(filePath, versionFileContent, { flag: 'w' });
