const panelUtils = document.getElementById('panel-utils');
window.utilsGUIState = window.utilsGUIState || {};

// Helper to create buttons
function addBtn(container, name, action){
  const btn = document.createElement('button');
  btn.textContent = name + ' [Stopped]';
  let running = false;
  btn.onclick = function() {
    running = !running;
    btn.textContent = name + (running ? ' [Running...]' : ' [Stopped]');
    action(running);
  };
  container.appendChild(btn);
}

// Developer Console (Eruda)
addBtn(panelUtils, 'Developer Console', on => {
  if(on){
    if(!window.utilsGUIState.erudaLoaded){
      let s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
      s.onload = function(){ eruda.init(); eruda.theme='Dark'; window.utilsGUIState.erudaLoaded=true; };
      document.body.appendChild(s);
    } else { eruda.show(); }
  } else { if(window.utilsGUIState.erudaLoaded) eruda.hide(); }
});

// Page Dark Theme
addBtn(panelUtils, 'Page Dark Theme', on => {
  const all = document.querySelectorAll('body *:not(#panel-utils):not(#panel-utils *)');
  if(on){
    if(!window.utilsGUIState.pageDark){
      all.forEach(el=>{
        if(el.style){
          el.style.fontFamily="Comic Sans MS";
          el.style.filter="invert(1)";
        }
      });
      window.utilsGUIState.pageDark=true;
    }
  } else {
    if(window.utilsGUIState.pageDark){
      all.forEach(el=>{
        if(el.style){
          el.style.fontFamily="";
          el.style.filter="";
        }
      });
      window.utilsGUIState.pageDark=false;
    }
  }
});

// Calculator
addBtn(panelUtils,'Calculator', on => {
  if(on){
    let input='';
    let expr;
    do {
      expr = prompt("Calculator - Input expression", input);
      if(expr !== null && expr !== ''){
        input = eval(expr);
      }
    } while(expr !== null && expr !== '');
  }
});

// Web X-Ray
addBtn(panelUtils,'Web X-Ray', on => {
  if(on){
    if(!window.utilsGUIState.webXRayLoaded){
      let s = document.createElement('script');
      s.src='https://x-ray-goggles.mouse.org/webxray.js';
      s.className='webxray';
      s.setAttribute('data-lang','en-US');
      s.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');
      document.body.appendChild(s);
      window.utilsGUIState.webXRayLoaded=true;
    }
  }
});

// DNS Lookup
addBtn(panelUtils,'DNS Lookup', on => {
  if(on){
    window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname+'&run=toolpage');
  }
});

// FPS Counter
addBtn(panelUtils,'FPS Counter', on => {
  if(on && !window.utilsGUIState.stats){
    let s = document.createElement('script');
    s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
    s.onload = function(){
      window.utilsGUIState.stats = new Stats();
      document.body.appendChild(window.utilsGUIState.stats.dom);
      requestAnimationFrame(function l(){ window.utilsGUIState.stats.update(); requestAnimationFrame(l); });
    };
    document.head.appendChild(s);
  } else if(!on && window.utilsGUIState.stats){
    window.utilsGUIState.stats.dom.remove();
    window.utilsGUIState.stats=null;
  }
});

// History Flooder
addBtn(panelUtils,'History Flooder', on => {
  if(on){
    const num=parseInt(prompt("History flood amount:"));
    if(isNaN(num)||num<1) return;
    const x=window.location.href;
    for(let i=1;i<=num;i++){ history.pushState(0,0,i==num?x:i.toString()); }
    alert("History flood successful! "+window.location.href+" now appears in your history "+num+(num==1?" time.":" times."));
  }
});

// IP Finder
addBtn(panelUtils,'IP Finder', on => {
  if(on){
    const ip=prompt("Enter an IP Address:");
    if(!ip) return;
    const urls = [
      'https://talosintelligence.com/reputation_center/lookup?search=',
      'https://www.virustotal.com/gui/ip-address/',
      'https://otx.alienvault.com/browse/global?section=All&q=',
      'https://censys.io/ipv4/',
      'https://www.shodan.io/search?query=',
      'https://www.abuseipdb.com/check/'
    ];
    urls.forEach(u => window.open(u+ip,'_blank'));
  }
});

// Password Looker
addBtn(panelUtils,'Password Looker', on => {
  Array.from(document.querySelectorAll('input[type=password]')).forEach(el=>el.setAttribute('type', on?'text':'password'));
});

// Porta Proxy
addBtn(panelUtils,'Porta Proxy', on => {
  if(on && !window.utilsGUIState.portaFrame){
    const frame = document.createElement('iframe');
    frame.src = prompt("Enter URL (include https://)");
    const stl = frame.style;
    stl.position="fixed"; stl.left=stl.right=stl.top=stl.bottom=0; stl.margin=stl.border="0"; stl.width=stl.height="100%"; stl.zIndex="9999"; stl.backgroundColor="#FFFFFF";
    document.body.appendChild(frame);

    const btnT=document.createElement("button");
    btnT.innerHTML="Toggle";
    btnT.style="position:fixed;bottom:0;right:0;margin:20px;z-index:99999;border:none;font-size:14px;padding:3px;";
    btnT.addEventListener("click",()=>{frame.style.display=(frame.style.display==="none")?"block":"none";});
    document.body.appendChild(btnT);

    window.utilsGUIState.portaFrame=frame;
  } else if(!on && window.utilsGUIState.portaFrame){
    window.utilsGUIState.portaFrame.remove();
    window.utilsGUIState.portaFrame=null;
  }
});

// Kill Script (loads external script)
addBtn(panelUtils,'Kill Script', on => {
  if(on){
    fetch("https://raw.githubusercontent.com/zek-c/Securly-Kill-V111/main/kill.js")
      .then(r=>r.text()).then(r=>eval(r));
  }
});

// Page Info Viewer
addBtn(panelUtils,'Page Info Viewer', on => {
  if(on){
    alert('Page Info:\nTitle: '+document.title+'\nURL: '+window.location.href+'\nImages: '+document.getElementsByTagName('img').length+'\nLinks: '+document.getElementsByTagName('a').length+'\nScripts: '+document.getElementsByTagName('script').length);
  }
});
