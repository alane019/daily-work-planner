window.onload = function(){

   //globals: flag and other status indicators - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
   var editInProgress = false;
   // globals: dom element variables and any shorhand functions - - - - - - - - - - - - - - - - - - - - - 
   var docu = document;
   var scheduleContainer =  docu.getElementById("schedule-container");

   var todaysDate;
   var currentDayDiv;
   var currentHour;
   var btnCols;
   var hourTextEditDivs;

   // console.log shorthand - - - - - - - 
   let cl = function(str1, str2 ="", str3 ="", str4 ="", str5=""){
      str = str1 + str2 + str3 + str4 + str5; 
      console.log(str);
   }  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

         // a.) initialize/reinitialize momentjs values, update dom query arrays.
          let renderScheduleDisplay = function(){
            btnCols = Array.from(document.querySelectorAll(".btn-col"));
            hourTextEditDivs = Array.from(document.querySelectorAll(".text-edit-div"));
           
            // MomentJs is used to update page heading and apply formatting to hour-divs on schedule - - - -
            // Add current date to page header (Moment format 'MMMM Do YYYY' example: "November 15th 2020")
            todaysDate = new moment(); 
            todaysDate = todaysDate.format('MMMM Do YYYY');
            currentDayDiv = docu.querySelector("#currentDay");
            currentDayDiv.textContent = todaysDate;

            hourTextEditDivs.forEach(function(displayDiv){
               let hour = displayDiv.getAttribute('data-hour');  
               //update html with local storage values as needed
               let savedInLocalStorage = localStorage.getItem(`text-${hour}`);    /* console log: */  cl(`Saved in local storage for ${hour}th hour block: ${savedInLocalStorage}`);
               if(String(savedInLocalStorage) == 'null') { 
                  savedInLocalStorage = "";
               }
               if(String(savedInLocalStorage) != "");
               displayDiv.innerHTML = savedInLocalStorage +  ' <textarea class="d-none textarea-el"> </textarea>';
               console.log(" --------------- ");

               //moment js hour format is used to conditionally apply styles to each hour-block on schedule. 
               currentHour = moment().format("[Current hour: ] H");
               if(hour < currentHour){
                  displayDiv.classList.add("past");
               }
               else if(hour > currentHour){
                  displayDiv.classList.add("future");
               }
               else if(hour == currentHour){
                  displayDiv.classList.add("present");
               }
               else{ 
                  cl(`currentHour: ${currentHour}`); 
                  cl(`Hour data attribute value for current div in forEach: ${hour}`);
               }
            }); // end of forEach
          // declaring text area area after the render loop to avoid 
           textAreaElements = Array.from(document.querySelectorAll(".textarea-el"));
         }
         //this runs renderScheduleDisplay() when the page loads.
         renderScheduleDisplay();
         //renderScheduleDisplay function will be called at the end of the save button click handler to reinitialize page.

   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   
    /* -------------------------------------------------------------------------------------- */
   //Click handler for main schedule container div   
   scheduleContainer.addEventListener("click", function(event) {
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      /* [EDITABLE DIV IS CLICKED] if one of the editable textarea-divs available for each work hour is clicked...
         And the another textarea-div is not being edited already */
      if(event.target.matches(".text-edit-div") && editInProgress !== true) {

         //declare shorthand variable for event target which indicates the element type
         let eventTargetDiv = event.target;

         //get current index call the correct dom element for that hour.
         let hour = eventTargetDiv.getAttribute('data-hour');  /* console log: */  cl(eventTargetDiv.getAttribute('data-hour'));
         let index = hour - hourTextEditDivs.length; 
         let buttonColumn =  btnCols[index];  
         
         /* Update global status indicator & make textarea + save-button visible by removing their d-none classes
            editInProgress flag is set to true, so other textarea-divs cannot be 
            responsive to clicks until the save button is clicked (separate if-block in this click handler) */
         editInProgress = true;
         buttonColumn.classList.remove("d-none");
         textAreaElements[index].classList.remove("d-none");

      } //endif (if the editable textarea-div for each work hour is clicked) - - - - - - - - - 
       // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


         // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /* [SAVE BUTTON CLICKED] Clicking save toggle the editInProgress flag back to false */
      else if(event.target.matches('button')){
         // this runs when any button is clicked on the schedule container div
         // editInProgress global flag should ensure that only one is displayed under normal circumstances;

         let etBtn = event.target;
         event.preventDefault();
         event.stopPropagation();

         //get event targets array index value using... id of hour-block row (should use an element data attribute)
         let hour = etBtn.parentElement.parentElement.id;    cl("hour is: ", hour);
         let index = hour - hourTextEditDivs.length;                    cl("index is: ", index);

         let textAreaTextValue = textAreaElements[index].value;
               cl("textAreaTextValue: ", textAreaTextValue);

         //diregard null textArea values
         if(String(textAreaTextValue) == 'null') { 
            textAreaTextValue = "";
         }

         //write text area text to parent div for viewing purposes only.
         hourTextEditDivs[index].innerHTML = `${textAreaTextValue} <textarea class="d-none textarea-el"> </textarea>`;
   
         //save textarea value to local storage
         localStorage.setItem(`text-${hour}`, textAreaTextValue);
         let justSaved = localStorage.getItem(`text-${hour}`);  cl(` justSaved  -- "text-\${hour}": --  text-${hour}`);
               //log saved text value to the console   
               cl("Notes for this hour saved as: " + justSaved);

         // Reset edit-mode indicator AND classes to d-none the save button AND textarea container
         // div text edit is no longer in progress; other appointment divs are reponsive to clicks once again.
         editInProgress = false; //this should update the global (needed to be declared as false with var instead of let)

         textAreaElements[index].classList.add("d-none");

         // adds display-none to div that contains the save button
         etBtn.parentElement.classList.add("d-none");
         renderScheduleDisplay();
      }  // end-else-if (target matches button)

   });  //end of click handler for container div.

} //end window onload 
