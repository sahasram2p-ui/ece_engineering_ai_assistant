const chat=document.getElementById("chat"), form=document.getElementById("form"), input=document.getElementById("message"), typing=document.getElementById("typing");

function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function add(text,type){
 const row=document.createElement("div"); row.className="msg "+type;
 row.innerHTML='<div class="avatar">'+(type==="user"?"You":"AI")+'</div><div class="bubble">'+esc(text).replace(/\n/g,"<br>")+'</div>';
 chat.appendChild(row); chat.scrollTop=chat.scrollHeight;
}
async function send(message){
 if(!message.trim()) return;
 add(message.trim(),"user"); input.value=""; input.style.height="auto"; typing.classList.add("show");
 try{
  const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message})});
  const d=await r.json(); add(d.success?d.reply:(d.error||"Something went wrong."),"bot");
 }catch(e){add("Unable to connect. Make sure the Flask server is running.","bot");}
 finally{typing.classList.remove("show");}
}
form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
input.addEventListener("input",()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,140)+"px";});
document.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>send(b.dataset.question)));
document.getElementById("newChat").addEventListener("click",()=>{chat.innerHTML='<div class="welcome"><div class="hero">📡</div><h2>New ECE session</h2><p>Ask an Electronics & Communication Engineering question.</p></div>';input.focus();});
