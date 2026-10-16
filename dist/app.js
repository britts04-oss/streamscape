const titles=[
 {title:'Beyond the Last Light',year:2026,score:98,rating:'16+',genre:'Sci-Fi · Mystery',desc:'A cartographer follows an impossible signal beyond the mapped solar system.',art:'linear-gradient(135deg,#081e40,#1c67a8 46%,#ef4e8d)'},
 {title:'Glass Harbor',year:2025,score:96,rating:'13+',genre:'Drama · Thriller',desc:'A storm exposes a coastal town’s oldest secret—and the family sworn to protect it.',art:'linear-gradient(135deg,#081619,#187b83,#f7b36d)'},
 {title:'Neon District',year:2026,score:94,rating:'16+',genre:'Crime · Cyberpunk',desc:'Two detectives hunt a memory thief through a sleepless vertical city.',art:'linear-gradient(135deg,#241044,#c42a92,#19d3e6)'},
 {title:'The Long Winter',year:2024,score:92,rating:'13+',genre:'Adventure · Drama',desc:'Strangers cross a frozen continent to bring a dying observatory back online.',art:'linear-gradient(135deg,#0c283d,#4e87a5,#d6e8e9)'},
 {title:'Afterimage',year:2025,score:91,rating:'16+',genre:'Mystery · Noir',desc:'A photographer begins finding tomorrow’s crimes hidden in yesterday’s pictures.',art:'linear-gradient(135deg,#170c28,#5e345f,#dd734e)'},
 {title:'Wild Current',year:2023,score:89,rating:'All',genre:'Nature · Documentary',desc:'Follow the rivers that redraw landscapes and connect the world’s wildest places.',art:'linear-gradient(135deg,#05372d,#22a374,#efc55d)'},
 {title:'Second Sunrise',year:2026,score:95,rating:'13+',genre:'Sci-Fi · Romance',desc:'Every morning resets the city. Two people are the only ones who remember.',art:'linear-gradient(135deg,#ff725e,#ffb36d,#513b78)'},
 {title:'The Quiet Room',year:2025,score:87,rating:'16+',genre:'Psychological · Drama',desc:'A sound engineer discovers a room where every spoken secret becomes real.',art:'linear-gradient(135deg,#181a22,#52606d,#b63952)'},
 {title:'Orbit House',year:2024,score:93,rating:'All',genre:'Comedy · Family',desc:'A chaotic family inherits a hotel drifting just above Earth.',art:'linear-gradient(135deg,#0c3155,#397fd1,#ffc857)'},
 {title:'Signal Fire',year:2025,score:90,rating:'13+',genre:'Action · Survival',desc:'A mountain rescue team races a wildfire and a storm to answer one final beacon.',art:'linear-gradient(135deg,#2a1720,#df4b34,#ffc260)'},
 {title:'Paper Kingdom',year:2023,score:86,rating:'All',genre:'Animation · Fantasy',desc:'A young mapmaker folds a world from paper—and accidentally gives it a villain.',art:'linear-gradient(135deg,#253a79,#7d5cc4,#efb4d3)'},
 {title:'Depth of Field',year:2024,score:88,rating:'13+',genre:'Documentary · Art',desc:'Six filmmakers reveal how one frame can change the way we remember history.',art:'linear-gradient(135deg,#101010,#565656,#d54f3e)'}
];
const rows=[
 ['Continue Watching', [0,2,5,7,9]],
 ['Trending Now', [1,6,2,8,3,10,4]],
 ['Because You Watched Science Fiction', [0,6,2,8,7,3]],
 ['Critically Acclaimed', [5,11,1,4,3,9]],
 ['Only on Streamscape', [0,2,6,7,8,10]]
];
const catalog=document.querySelector('#catalog');
const cardMarkup=(item,index)=>`<article class="card" tabindex="0" data-details="${index}" aria-label="${item.title}, ${item.genre}"><div class="poster" style="--art:${item.art}"></div><div class="card-copy"><h3>${item.title}</h3><p><span class="match">${item.score}%</span> · ${item.rating} · ${item.genre}</p></div></article>`;
rows.forEach(([name,indices],rowIndex)=>{
 const section=document.createElement('section'); section.className='rail'; section.id=rowIndex===2?'series':rowIndex===3?'films':rowIndex===1?'new':rowIndex===4?'list':'';
 section.innerHTML=`<div class="rail-header"><h2>${name}</h2></div><div class="rail-track">${indices.map(i=>cardMarkup(titles[i],i)).join('')}</div>`; catalog.append(section);
});
const topSection=document.createElement('section');topSection.className='rail';topSection.innerHTML=`<h2>Top 10 Today</h2><div class="rail-track ranked">${[6,0,1,2,5,8].map((i,n)=>`<article class="rank-card" data-details="${i}" tabindex="0"><div class="rank-number">${n+1}</div>${cardMarkup(titles[i],i)}</article>`).join('')}</div>`;catalog.insertBefore(topSection,catalog.children[2]);

const dialog=document.querySelector('#detailsDialog');let selected=0;let myList=new Set();
function showDetails(index){selected=Number(index);const item=titles[selected];document.querySelector('#detailArt').style.setProperty('--art',item.art);document.querySelector('#detailTitle').textContent=item.title;document.querySelector('#detailMeta').innerHTML=`<span class="match">${item.score}% Match</span><span>${item.year}</span><span class="rating">${item.rating}</span>`;document.querySelector('#detailDescription').textContent=item.desc;document.querySelector('#detailGenres').textContent=item.genre;document.querySelector('#listToggle').textContent=myList.has(selected)?'✓':'＋';dialog.showModal()}
document.addEventListener('click',e=>{const target=e.target.closest('[data-details]');if(target)showDetails(target.dataset.details);const play=e.target.closest('[data-play]');if(play)openPlayer(play.dataset.play)});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-details]')){e.preventDefault();showDetails(e.target.dataset.details)}});
document.querySelector('#closeDetails').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#listToggle').onclick=()=>{myList.has(selected)?myList.delete(selected):myList.add(selected);document.querySelector('#listToggle').textContent=myList.has(selected)?'✓':'＋'};

const player=document.querySelector('#player');function openPlayer(title){dialog.close();document.querySelector('#playerTitle').textContent=title;player.hidden=false;document.body.style.overflow='hidden'}document.querySelector('#dialogPlay').onclick=()=>openPlayer(titles[selected].title);document.querySelector('#closePlayer').onclick=()=>{player.hidden=true;document.body.style.overflow=''};

const search=document.querySelector('#searchPanel'),input=document.querySelector('#searchInput'),results=document.querySelector('#searchResults'),status=document.querySelector('#searchStatus');
function renderSearch(query=''){const q=query.trim().toLowerCase().replace(/science[ -]?fiction/g,'sci-fi');const matches=q?titles.filter(t=>`${t.title} ${t.genre} ${t.desc}`.toLowerCase().includes(q)):titles;status.textContent=q?`${matches.length} result${matches.length===1?'':'s'} for “${query}”`:'Browse all titles';results.innerHTML=matches.map(t=>cardMarkup(t,titles.indexOf(t))).join('')}
document.querySelector('#searchButton').onclick=()=>{search.hidden=false;document.body.style.overflow='hidden';renderSearch();setTimeout(()=>input.focus(),0)};document.querySelector('#closeSearch').onclick=()=>{search.hidden=true;document.body.style.overflow=''};input.addEventListener('input',e=>renderSearch(e.target.value));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!search.hidden){search.hidden=true;document.body.style.overflow=''}else if(!player.hidden){player.hidden=true;document.body.style.overflow=''}}});
window.addEventListener('scroll',()=>document.querySelector('#topbar').classList.toggle('scrolled',scrollY>30),{passive:true});
