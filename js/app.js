const intro = document.getElementById("signalIntro");
const enter = document.getElementById("enterWorld");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function dismissIntro(){
  intro.classList.add("done");
  document.body.classList.add("intro-finished");
  setTimeout(()=>intro.remove(), 800);
}
setTimeout(dismissIntro, 4800);
enter.addEventListener("click", dismissIntro);

menuToggle.addEventListener("click", ()=>{
  mainNav.classList.toggle("open");
});
document.querySelectorAll(".main-nav a").forEach(a=>{
  a.addEventListener("click", ()=>mainNav.classList.remove("open"));
});

const choices = {};
const pollButtons = document.querySelectorAll(".poll-option");
const pollMessage = document.getElementById("pollMessage");
pollButtons.forEach(button=>{
  button.addEventListener("click", ()=>{
    pollButtons.forEach(b=>b.classList.remove("voted"));
    button.classList.add("voted");
    const choice = button.dataset.choice;
    choices.choice = choice;
    localStorage.setItem("lwdb-poll", choice);
    pollMessage.textContent = `SIGNAL RECEIVED: "${choice}" — prototype vote saved on this browser.`;
  });
});
const savedVote = localStorage.getItem("lwdb-poll");
if(savedVote){
  pollButtons.forEach(b=>{
    if(b.dataset.choice === savedVote) b.classList.add("voted");
  });
  pollMessage.textContent = `YOUR PREVIOUS SIGNAL: "${savedVote}".`;
}

document.querySelectorAll(".archive-item").forEach(item=>{
  item.addEventListener("click", ()=>{
    if(item.classList.contains("locked")){
      pollMessage.textContent = "ACCESS DENIED: this fragment has not been unlocked yet.";
      alert("This archive fragment is locked. Keep reading the story to unlock it.");
      return;
    }
    document.querySelectorAll(".archive-item").forEach(x=>x.classList.remove("active"));
    item.classList.add("active");
  });
});

document.getElementById("supportButton").addEventListener("click", ()=>{
  alert("SUPPORT SYSTEM: ready for connection. In the next version, this button can connect to your real creator-support page.");
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("in-view");
  });
},{threshold:.12});
document.querySelectorAll(".section").forEach(s=>observer.observe(s));
