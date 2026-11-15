const games=[
 ["Слоты","🎰","Барабаны и комбинации","#4c2c83","#182b55"],["Рулетка","◉","Числа и сектора","#79374c","#2b214e"],["Кости","⚄","Проверь удачу","#225b78","#182b55"],["Блэкджек","♠","Карты против дилера","#23645c","#172d40"],["Покер","♛","Карточные комбинации","#693e65","#24234f"],["Колесо","✦","Призовые сектора","#87602b","#38264f"],["Мины","◆","Открывай клетки","#276d76","#1b3152"],["Башня","▥","Поднимайся выше","#4c528a","#24234f"],["Краш","↗","Поймай множитель","#246c83","#222b58"],["Монетка","◐","Орёл или решка","#8a6b32","#3b3153"],["Семёрка","7","Собери комбинацию","#853e42","#39244d"],["Сундуки","▣","Найди сокровище","#79602e","#30254e"]
];
const demoLeaders={day:[["LuckyFox",12400],["NeonCat",9800],["Player_77",7200],["Mira",5100],["Shadow",3900]],week:[["NeonCat",86400],["LuckyFox",72200],["Mira",61800],["Player_77",48700],["Shadow",32500]]};
const $=s=>document.querySelector(s);let balance=10000,played=0,wins=0,currentGame=null;
const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand();try{tg.setHeaderColor("#090b13");tg.setBackgroundColor("#090b13")}catch{}}
const user=tg?.initDataUnsafe?.user;const displayName=user?.first_name||"Игрок";$("#profileName").textContent=displayName;$("#profileAvatar").textContent=(displayName[0]||"И").toUpperCase();$("#profileButton").textContent=(displayName[0]||"И").toUpperCase();
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));$("#"+name+"Page")?.classList.remove("hidden");$("#gameView").classList.add("hidden");document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.page===name));}
function renderGames(){$("#gamesGrid").innerHTML=games.map((g,i)=>`<button class="game-card" style="--c1:${g[3]};--c2:${g[4]}" data-game="${i}"><span class="symbol">${g[1]}</span><b>${g[0]}</b><small>${g[2]}</small></button>`).join("");}
function renderLeaders(period="day"){$("#leaderboard").innerHTML=demoLeaders[period].map((p,i)=>`<div class="leader-row"><span class="rank">${["01","02","03","04","05"][i]}</span><span class="leader-name">${p[0]}</span><span class="leader-score">${p[1].toLocaleString("ru-RU")} ₵</span></div>`).join("");}
function openGame(i){currentGame=games[i];$("#gamesPage").classList.add("hidden");document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));$("#gameView").classList.remove("hidden");$("#gameSymbol").textContent=currentGame[1];$("#gameTitle").textContent=currentGame[0];$("#resultDisplay").textContent="ГОТОВ?";window.scrollTo({top:0,behavior:"smooth"});}
renderGames();renderLeaders();
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>showPage(t.dataset.page)));
$("#gamesGrid").addEventListener("click",e=>{const b=e.target.closest("[data-game]");if(b)openGame(Number(b.dataset.game));});
$("#backToGames").addEventListener("click",()=>showPage("games"));
$("#profileButton").addEventListener("click",()=>showPage("profile"));
document.querySelectorAll(".switcher button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".switcher button").forEach(x=>x.classList.toggle("active",x===b));renderLeaders(b.dataset.period)}));
document.querySelectorAll("[data-bet]").forEach(b=>b.addEventListener("click",()=>{$("#betInput").value=Math.max(0,Number($("#betInput").value)||0)+Number(b.dataset.bet)}));
$("#playButton").addEventListener("click",()=>{const amount=Number($("#betInput").value);if(!Number.isFinite(amount)||amount<10){$("#resultDisplay").textContent="МИНИМУМ 10";return;}$("#resultDisplay").textContent="АНИМАЦИЯ…";$("#playButton").disabled=true;setTimeout(()=>{$("#resultDisplay").textContent="ДЕМО-РЕЖИМ";$("#playButton").disabled=false;},1100);});
$("#dailyBonus").addEventListener("click",()=>{const last=localStorage.getItem("partables_bonus_day");const today=new Date().toLocaleDateString("sv-SE",{timeZone:"Europe/Moscow"});if(last===today){$("#dailyBonus").textContent="Уже получен";return;}balance+=250;localStorage.setItem("partables_bonus_day",today);$("#balance").textContent=balance.toLocaleString("ru-RU");$("#dailyBonus").textContent="+250 ₵";});
$("#topupButton").addEventListener("click",()=>alert("Пополнение через Telegram Stars подключим после проверки платёжной модели и правил Telegram. Сейчас платежи отключены."));
fetch("/api/config").catch(()=>{});
