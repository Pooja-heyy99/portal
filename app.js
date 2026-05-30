/* Production PortalTrace frontend (module) */
const R = window.PORTALTRACE_RUNTIME || {};
const CONFIG = {
  RPC_ENDPOINT: R.rpcEndpoint || 'wss://rpc.portaldot.io',
  CONTRACT_ADDRESS: R.contractAddress || '',
  CONTRACT_METADATA_URL: R.contractMetadataUrl || '/assets/portaltrace.contract.json',
  TOKEN_SYMBOL: R.tokenSymbol || 'POT'
};

let api=null, contract=null, signer=null, account=null;
const $ = id=>document.getElementById(id);
function showAlert(m){ const c=$('alertContainer'); if(!c) return; const e=document.createElement('div'); e.className='card'; e.style.margin='0.5rem 0'; e.textContent=m; c.prepend(e); setTimeout(()=>e.remove(),6000); }
function short(a){ if(!a) return '—'; a=String(a); return a.length<=12? a : a.slice(0,6)+'…'+a.slice(-4); }

async function initChain(){ if(contract) return; if(!CONFIG.CONTRACT_ADDRESS) throw new Error('Set contractAddress before deploying'); const [{ApiPromise,WsProvider},{ContractPromise}] = await Promise.all([import('https://cdn.jsdelivr.net/npm/@polkadot/api/+esm'), import('https://cdn.jsdelivr.net/npm/@polkadot/api-contract/+esm')]); const meta=await (await fetch(CONFIG.CONTRACT_METADATA_URL)).json(); api = await ApiPromise.create({provider:new WsProvider(CONFIG.RPC_ENDPOINT)}); contract = new ContractPromise(api, meta, CONFIG.CONTRACT_ADDRESS); }

async function connectWallet(){ try{ await initChain(); const ext=await import('https://cdn.jsdelivr.net/npm/@polkadot/extension-dapp/+esm'); await ext.web3Enable('PortalTrace'); const accounts=await ext.web3Accounts(); if(!accounts.length) throw new Error('No accounts'); account=accounts[0].address; const injector=await ext.web3FromAddress(account); signer=injector.signer; localStorage.setItem('portaltrace_account', account); $('connectWalletBtn').textContent = short(account); showAlert('Wallet connected: '+short(account)); renderProducts(); }catch(e){ showAlert('Wallet error: '+(e.message||e)); console.error(e);} }
function disconnect(){ account=null; signer=null; localStorage.removeItem('portaltrace_account'); $('connectWalletBtn').textContent='Connect Wallet'; showAlert('Wallet disconnected'); }

async function sendTx(method,args=[]){ if(!contract) await initChain(); if(!signer||!account) throw new Error('Connect wallet'); const tx = contract.tx[method]({ gasLimit:-1, storageDepositLimit:null }, ...args); return new Promise((res,rej)=>{ tx.signAndSend(account,{signer},result=>{ if(result.dispatchError) rej(result.dispatchError.toString()); if(result.status.isInBlock||result.status.isFinalized) res(result); }).catch(rej); }); }

async function getNextId(){ const r = await contract.query.get_next_product_id(account||CONFIG.CONTRACT_ADDRESS,{gasLimit:-1,storageDepositLimit:null}); return Number(r.output?.toString()||0); }
async function getProduct(id){ const r = await contract.query.get_product(account||CONFIG.CONTRACT_ADDRESS,{gasLimit:-1,storageDepositLimit:null},Number(id)); const out = typeof r.output?.toJSON==='function'? r.output.toJSON() : r.output; const raw = out?.Ok || out; if(!raw) return null; return { id:Number(raw.id||id), name:raw.name||'', manufacturer:raw.manufacturer||'', origin:raw.origin||'', ipfs_hash:raw.ipfs_hash||raw.ipfsHash||'', owner:raw.owner||'', verified:!!raw.verified }; }

async function renderProducts(){ const c=$('productsContainer'); if(!c) return; c.innerHTML='Loading…'; try{ await initChain(); const next=await getNextId(); if(!next){ c.innerHTML='<p style="color:#9aa4b2">No on-chain products</p>'; return;} const items=[]; for(let i=Math.max(1,next-6); i<next; i++){ const p = await getProduct(i); if(p) items.push(p); } if(!items.length){ c.innerHTML='<p style="color:#9aa4b2">No on-chain products</p>'; return;} c.innerHTML=items.reverse().map(p=>`<div class="product-card"><strong>${escapeHtml(p.name)}</strong><div style="color:#9aa4b2;font-size:.9rem">ID: ${p.id}</div><div style="margin-top:.5rem;color:#9aa4b2">${escapeHtml(p.manufacturer)} · ${escapeHtml(p.origin)}</div><div style="margin-top:.65rem;display:flex;gap:.5rem"><button class="btn btn-secondary" onclick="quickVerify(${p.id})">Verify</button><a class="btn btn-outline" href='verify.html?product=${p.id}'>View</a></div></div>`).join(''); }catch(e){ c.innerHTML='<p style="color:#9aa4b2">Failed to load</p>'; console.error(e);} }

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[c]); }

function setup(){ const btn=$('connectWalletBtn'); if(btn) btn.onclick = async ()=> account? disconnect() : await connectWallet(); const reg=$('registerForm'); if(reg) reg.onsubmit = async e=>{ e.preventDefault(); const name=$('productName').value.trim(); const m=$('manufacturer').value.trim(); const o=$('origin').value.trim(); const ip=$('ipfsHash').value.trim()||generateIPFSHash(); if(!name||!m||!o) { showAlert('Fill required fields'); return; } try{ await sendTx('create_product',[name,m,o,ip]); showAlert('Register tx sent'); setTimeout(()=>renderProducts(),2500); reg.reset(); }catch(err){ console.error(err); showAlert('Register failed: '+(err.message||err)); } } }

window.quickVerify = async function(id){ try{ await sendTx('verify_product',[Number(id)]); showAlert('Verify tx sent'); setTimeout(()=>renderProducts(),2000);}catch(e){ console.error(e); showAlert('Verify failed: '+(e.message||e)); } };

function generateIPFSHash(){ const chars='0123456789abcdefghijklmnopqrstuvwxyz'; let h='Qm'; for(let i=0;i<44;i++) h+=chars.charAt(Math.floor(Math.random()*chars.length)); return h; }

document.addEventListener('DOMContentLoaded', async ()=>{ const saved=localStorage.getItem('portaltrace_account'); if(saved){ $('connectWalletBtn').textContent = short(saved); } setup(); try{ await initChain(); }catch(e){ console.warn('initChain',e)} renderProducts(); });
