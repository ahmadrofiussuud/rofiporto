import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base=process.argv[2] || 'http://127.0.0.1:3101';
const checks=[];
function check(condition,label){assert.ok(condition,label);checks.push(label);}
const amora=await(await fetch(base+'/projects/amora')).text();
check(amora.includes('filkom.ub.ac.id/2026/01/25/inovasi-digital-amora'), 'Amora cites official campus source');
check(amora.includes('capaian tim')&&amora.includes('Belum ada data penggunaan'), 'Amora separates team achievement and unmeasured effects');
check(!amora.includes('membantu mengurangi tingkat perceraian'), 'Unmeasured divorce reduction claim removed');
const wcc=await(await fetch(base+'/projects/tehmbois-wcc')).text();
check(wcc.includes('/images/competitions/sertifikat-wcc-web-development.jpeg'), 'WCC directly links certificate evidence');
for (const slug of ['gestory','pahamin','rebite','umkm-go','misra']){
 const html=await(await fetch(base+'/projects/'+slug)).text();
 check(html.includes('Tujuan dan Batas Hasil')&&html.includes('belum disertai data evaluasi'),`${slug}: goals are distinct from measured outcomes`);
}
const em=await(await fetch(base+'/projects/website-em-ub')).text();
check(!em.includes('60.000'),'EM UB unsupported reach removed');
check(em.includes('Pekerjaan pengembangan melibatkan tim'), 'EM UB team attribution visible');
await writeFile(process.argv[3] || 'docs/seo/evidence/phase6-content-smoke.json',JSON.stringify({base,passed:true,checks:checks.length,results:checks},null,2));
console.log(checks.length,'content integrity checks passed');
