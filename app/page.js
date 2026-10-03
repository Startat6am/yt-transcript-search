"use client";
import {useState} from "react";
export default function Page(){
 const [q,setQ]=useState(""),[rows,setRows]=useState([]),[loading,setLoading]=useState(false),[err,setErr]=useState("");
 async function search(e){e?.preventDefault();setLoading(true);setErr("");try{const r=await fetch("/api/search?q="+encodeURIComponent(q));const d=await r.json();if(!r.ok)throw Error(d.error||"Ошибка");setRows(d.results||[])}catch(x){setErr(x.message)}finally{setLoading(false)}}
 return <main style={{maxWidth:1000,margin:"0 auto",padding:"28px 16px"}}>
  <h1 style={{fontSize:28}}>🔎 Поиск по субтитрам YouTube</h1>
  <p style={{color:"#555"}}>Слово, фраза или #хэштег. Результат открывает видео сразу с нужной секунды.</p>
  <form onSubmit={search} style={{display:"flex",gap:8,margin:"22px 0"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder='например: "искусственный интеллект" или #AI' style={{flex:1,padding:14,border:"1px solid #ccc",borderRadius:10,fontSize:16}}/><button disabled={loading||!q.trim()} style={{padding:"0 20px",border:0,borderRadius:10,fontSize:16}}>{loading?"Ищу…":"Найти"}</button></form>
  {err&&<div style={{padding:12,background:"#fee",borderRadius:10}}>{err}</div>}
  <div style={{display:"grid",gap:10}}>{rows.map((r,i)=><article key={i} style={{background:"white",padding:16,borderRadius:12,boxShadow:"0 1px 3px #ddd"}}><a href={r.timestamp_url} target="_blank" rel="noreferrer" style={{fontWeight:700,fontSize:18}}>{r.title}</a><div style={{margin:"7px 0",color:"#666"}}>{r.start_time} · {r.video_id}</div><div>{r.text}</div>{r.hashtags&&<small style={{color:"#666"}}>{r.hashtags}</small>}</article>)}</div>
  {!loading&&!err&&q&&rows.length===0&&<p>Совпадений не найдено.</p>}
 </main>
}