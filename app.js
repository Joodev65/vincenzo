const form = document.getElementById('form');
const log  = document.getElementById('log');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  log.textContent = 'Starting attack…';
  const body = {
    method: document.getElementById('method').value,
    target: document.getElementById('target').value.trim(),
    port: document.getElementById('port').value,
    hostHeader: document.getElementById('hostHeader').value.trim(),
    threads: document.getElementById('threads').value,
    time: document.getElementById('time').value
  };
  try{
    const res = await fetch('/api/attack',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    const json = await res.json();
    log.textContent = JSON.stringify(json,null,2);
  }catch(err){
    log.textContent = 'Error: '+err.message;
  }
});