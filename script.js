
window.onload = function(){

   //this adds the current date to the heading at the top of the page;
   let d = document;
   let m = new moment(); 
   m = m.format('MMMM Do YYYY');
   let currentDay = d.querySelector("#currentDay");
   currentDay.textContent = m;
   // ---------------------------------------------------------------------------------; 
   let hourBlocks = Array.from(document.querySelectorAll(".hour-block"));
   let btnCols = Array.from(document.querySelectorAll(".btn-col"));
   // let  ; 
    let cl = function(str1, str2= "", str3="", str4="", str5=""){
      str = str1 + str2 + str3 + str4 + str5; 
         console.log(str);
      } 
                                             
  let scheduleContainer =  d.getElementById("schedule-container");
   // Game start function
   scheduleContainer.addEventListener("click", function(event) {
      //event.preventDefault();
      if(event.target.classList.contains("appt")) {
         let et = event.target;
         cl(et.classList);
         //cl("hi");
         //cl(et.classList[0]);
         cl(et.getAttribute('data-hour'));
         et.contenteditible = "true";
         let hour = et.getAttribute('data-hour');
         let index = hour - 9;
         btnCols[index].classList.remove("disabled");
         cl()

      } //endif
   });  //end of event handler.



    // -------------------------------------------------------------------------
    // Event handler with data element example
    //------------------------------------------------------------------------
    /*
   // <span data-typeId="123" data-type="topic" data-points="-1" data-important="true" id="the-span"></span>

   //  document.getElementById("the-span").addEventListener("click", function(){

      console.log(this);
       }); 
   // ------------------------------------------------------------------------------ */





}
