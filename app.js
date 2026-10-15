const menu=document.querySelector('.menu');
const navigation=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');navigation.classList.remove('open');}));
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.open).showModal()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.querySelectorAll('[data-close]').forEach(a=>a.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});});
document.getElementById('year').textContent=new Date().getFullYear();
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.focus();}});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const target=document.getElementById(link.getAttribute('href').slice(1));if(target){if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
const answers=[...document.querySelectorAll('.faq-list details')];
document.getElementById('expand-faq')?.addEventListener('click',()=>answers.forEach(answer=>answer.open=true));
document.getElementById('collapse-faq')?.addEventListener('click',()=>answers.forEach(answer=>answer.open=false));
const readingPreferences={large:false,contrast:false};
try{const saved=JSON.parse(localStorage.getItem('gorman-reading-options')||'{}');readingPreferences.large=saved.large===true;readingPreferences.contrast=saved.contrast===true;}catch{}
function applyReadingOptions(announce=false){document.documentElement.classList.toggle('large-text',readingPreferences.large);document.documentElement.classList.toggle('high-contrast',readingPreferences.contrast);document.getElementById('larger-text').setAttribute('aria-pressed',String(readingPreferences.large));document.getElementById('high-contrast').setAttribute('aria-pressed',String(readingPreferences.contrast));try{localStorage.setItem('gorman-reading-options',JSON.stringify(readingPreferences));}catch{}if(announce)document.getElementById('reading-status').textContent=`Larger text ${readingPreferences.large?'on':'off'}. Higher contrast ${readingPreferences.contrast?'on':'off'}.`;}
document.getElementById('larger-text').addEventListener('click',()=>{readingPreferences.large=!readingPreferences.large;applyReadingOptions(true);});
document.getElementById('high-contrast').addEventListener('click',()=>{readingPreferences.contrast=!readingPreferences.contrast;applyReadingOptions(true);});
document.getElementById('reset-reading').addEventListener('click',()=>{readingPreferences.large=false;readingPreferences.contrast=false;applyReadingOptions(true);});
applyReadingOptions();
const shareUrl=document.querySelector('link[rel="canonical"]')?.href||location.href.split('#')[0];
const shareStatus=document.querySelector('.share-status');
document.querySelector('[data-linkedin]')?.setAttribute('href','https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(shareUrl));
document.querySelector('[data-facebook]')?.setAttribute('href','https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(shareUrl));
async function copyPageLink(){try{await navigator.clipboard.writeText(shareUrl);shareStatus.textContent='Page link copied.';}catch{shareStatus.textContent='Copy the page address from your browser to share it.';}}
document.querySelector('[data-copy]')?.addEventListener('click',copyPageLink);
document.querySelector('[data-share]')?.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:shareUrl});shareStatus.textContent='Sharing options closed.';}catch(error){if(error.name!=='AbortError')shareStatus.textContent='Use the copy link button to share this page.';}}else{await copyPageLink();}});
document.getElementById('load-map')?.addEventListener('click',()=>{const map=document.createElement('iframe');map.title='Google map showing the area around Gorman Recruiting, 318 Main Street, Evansville';map.src='https://maps.google.com/maps?q=318%20Main%20Street%20Evansville%20IN%2047708&output=embed';map.loading='lazy';map.referrerPolicy='no-referrer-when-downgrade';map.className='location-map';document.getElementById('map-container').replaceChildren(map);});
