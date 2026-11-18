const $=id=>document.getElementById(id);
const log=$('log'), status=$('status'), hint=$('hint');
function add(who,text){const d=document.createElement('div');d.className='entry '+(who==='YOU'?'user':'jarvis');const b=document.createElement('b');b.textContent=who;const p=document.createElement('p');p.textContent=text;d.append(b,p);log.appendChild(d);log.scrollTop=log.scrollHeight;}
function say(text){if(!('speechSynthesis'in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=.94;u.pitch=.82;speechSynthesis.speak(u);}
function respond(text){const q=text.toLowerCase();let a;
if(/^(hi|hello|hey)\b/.test(q))a='Hello. JARVIS is online and ready.';
else if(q.includes('time'))a='The local time is '+new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+'.';
else if(q.includes('date')||q.includes('day'))a='Today is '+new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'.';
else if(q.includes('who are you'))a='I am JARVIS, your personal assistant interface. At your service.';
else if(q.includes('system status'))a='All local interface systems are operational. AI cloud connection is not configured.';
else a='I have received your message. My free local demo can handle basic commands. Tap OPEN CHATGPT to ask ChatGPT directly. Automatic ChatGPT integration requires an approved API connection.';
add('JARVIS',a);say(a);}
function submit(t){t=t.trim();if(!t)return;add('YOU',t);$('prompt').value='';respond(t);}
$('chatForm').addEventListener('submit',e=>{e.preventDefault();submit($('prompt').value);});
$('chatgpt').addEventListener('click',()=>window.open('https://chatgpt.com/','_blank','noopener'));
$('clear').addEventListener('click',()=>{log.innerHTML='';add('JARVIS','Communication log cleared.');});
$('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
setInterval(()=>$('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),30000);
$('network').textContent=navigator.onLine?'ONLINE':'OFFLINE';window.addEventListener('online',()=>$('network').textContent='ONLINE');window.addEventListener('offline',()=>$('network').textContent='OFFLINE');
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec;
if(SR){rec=new SR();rec.lang='en-IN';rec.interimResults=false;rec.onstart=()=>{status.textContent='VOICE ACTIVE';$('voiceState').textContent='LISTENING';hint.textContent='LISTENING... SPEAK NOW';};rec.onend=()=>{status.textContent='SYSTEM ONLINE';$('voiceState').textContent='READY';hint.textContent='TAP THE ARC REACTOR TO SPEAK';};rec.onerror=e=>{hint.textContent='VOICE INPUT '+e.error.toUpperCase()+' // TYPE BELOW';};rec.onresult=e=>submit(e.results[0][0].transcript);$('core').addEventListener('click',()=>{try{rec.start()}catch(e){}});}
else{$('core').addEventListener('click',()=>hint.textContent='VOICE RECOGNITION NOT SUPPORTED // TYPE BELOW');}
if('serviceWorker'in navigator&&location.protocol!=='file:')addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
