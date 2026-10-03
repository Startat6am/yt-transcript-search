import {NextResponse} from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
export const runtime="nodejs";
export async function GET(req){
 const q=new URL(req.url).searchParams.get("q")?.trim()||"";
 if(!q)return NextResponse.json({results:[]});
 const file=path.join(process.cwd(),"data","segments.csv");
 try{
  const raw=await fs.readFile(file,"utf8");
  const lines=raw.replace(/^\\uFEFF/,"").split(/\\r?\\n/).filter(Boolean);
  if(lines.length<2)return NextResponse.json({results:[]});
  const headers=parse(lines[0]); const out=[];
  for(const line of lines.slice(1)){const v=parse(line);const r=Object.fromEntries(headers.map((h,i)=>[h,v[i]??""]));const needle=q.replace(/^"|"$/g,"").toLocaleLowerCase();const hay=(r.text+" "+r.hashtags).toLocaleLowerCase();const match=q.startsWith("#")?(r.hashtags||"").toLocaleLowerCase().split(/\\s+/).includes(q.toLocaleLowerCase()):hay.includes(needle);if(match)out.push(r);if(out.length>=500)break}
  return NextResponse.json({results:out,total:out.length});
 }catch(e){return NextResponse.json({error:"База субтитров пока не загружена. Добавь data/segments.csv в репозиторий."},{status:404})}
}
function parse(s){const a=[];let cur="",quote=false;for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(quote&&s[i+1]==='"'){cur+='"';i++}else quote=!quote}else if(c===","&&!quote){a.push(cur);cur=""}else cur+=c}a.push(cur);return a}
