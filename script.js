window.onload = function(){


   //globals: flag and other status indicators - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
   var editInProgress = false;


   // globals: dom element variables and any shorhand functions - - - - - - - - - - - - - - - - - - - - - 
   let docu = document;
   let scheduleContainer =  docu.getElementById("schedule-container");
   //let hourBlocks = Array.from(document.querySelectorAll(".hour-block"));
   let btnCols = Array.from(document.querySelectorAll(".btn-col"));
   let hourTextEditDivs = Array.from(document.querySelectorAll(".text-edit-div"));
   let textAreaElements = Array.from(document.querySelectorAll(".textarea-el"));
   // console.log shorthand - - - - - - - 
   let cl = function(str1, str2 ="", str3 ="", str4 ="", str5=""){
      str = str1 + str2 + str3 + str4 + str5; 
      console.log(str);
   }  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






   // MomentJs is used to update page heading and apply formatting to hour-divs on schedule - - - - - - - - 
   // Add current date to page header (Moment format 'MMMM Do YYYY' example: "November 15th 2020")
   let todaysDate = new moment(); 
   todaysDate = todaysDate.format('MMMM Do YYYY');
   let currentDayDiv = docu.querySelector("#currentDay");
   currentDayDiv.textContent = todaysDate;
          // TODO: MomentJS formatting:                           
                 // .past, .present, .future




   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
         //TODO: localStorage:
         //TODO:  a.) get @ pageload
         //TODO:  b.) [textArea element]

         // a.) get localStorage values and write to divs at page load time
           hourTextEditDivs.forEach(function(displayDiv){
            let hour = displayDiv.getAttribute('data-hour');     /* console log: */  cl("hour checked for local storage: ", hour);
            let savedInLocalStorage = localStorage.getItem(`text-${hour}`);    /* console log: */  cl(`Saved in local storage for ${hour}th hour block: ${savedInLocalStorage}`);
            if(String(savedInLocalStorage) != "")
            displayDiv.innerHTML = savedInLocalStorage +  ' <textarea class="d-none textarea-el"> </textarea>';
            console.log(" --------------- \n --------------- ")
           });

           // updating this array value with a new dom query after updates to innerHTML properties (not sure if needed)
           textAreaElements = Array.from(document.querySelectorAll(".textarea-el"));
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

         //TODO: Check CSS (and other files) to see if/when "edit" class is used.
         eventTargetDiv.classList.add("edit");    /* console log: button col classlist */  cl(eventTargetDiv.classList);
 
                  /* log: button col classlist */  cl(buttonColumn.classList);

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
         let index = hour - hourTextEditDivs.length;                               cl("index is: ", index);

         let textAreaTextValue = textAreaElements[index].value;
               cl("textAreaTextValue: ", textAreaTextValue);

         //diregard null textArea values
         if(String(textAreaTextValue) == 'null') { 
            textAreaTextValue = "";
         }

         //write text area text to parent div for viewing purposes only.
         hourTextEditDivs[index].textContent = textAreaTextValue;
   
         //save textarea value to local storage
         localStorage.setItem(`text-${hour}`, textAreaTextValue);
         let justSaved = localStorage.getItem(`text-${hour}`);  cl(`"text-\${hour}": text-${hour}`);
 
         window.alert("Notes for this hour saved as: " + justSaved);

         // Reset edit-mode indicator AND classes to d-none the save button AND textarea container
         // appointment edit is no longer in progress; other appointment divs are reponsive to clicks once again.
         editInProgress = false; //this should update the global 
         textAreaElements[index].classList.add("d-none");
         etBtn.parentElement.classList.add("d-none");
      }  // end-else-if 
   });  //end of click handler event handler on container div.

} //end window onload block
