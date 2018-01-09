const hidePot = function(){
  let pot = document.getElementById("animatedPot").style;
  pot.visibility="hidden";
  setTimeout(function(){
    pot.visibility="visible";
  },1000);
}

const addClickListener = function(){
  let pot = document.getElementById("animatedPot");
  pot.onclick=hidePot;
}

window.onload=addClickListener;
