import { writeFile } from 'node:fs/promises';
const endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Frofiporto.vercel.app&strategy=mobile';
const response = await fetch(endpoint, { signal: AbortSignal.timeout(60000) });
const data = await response.json();
await writeFile('docs/seo/evidence/phase5-field-attempt.json', JSON.stringify({ checkedAt: new Date().toISOString(), status: response.status, loadingExperience: data.loadingExperience, originLoadingExperience: data.originLoadingExperience, error: data.error }, null, 2));
console.log('PSI HTTP', response.status, 'field data:', Boolean(data.loadingExperience?.metrics));
