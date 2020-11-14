



window.onload = function(){

   let m = new moment(); 
   m = m.format('MMMM Do YYYY');
   
   let d = document;
   let currentDay = d.querySelector("#currentDay");

   currentDay.textContent = m;
   


}
