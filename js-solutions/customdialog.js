function showAlert() {
    // Create the dialog element
    const dialog = document.createElement('dialog');
    dialog.style.textAlign = 'center';
    // Create the title element
    const titleElement = document.createElement('h2');
    titleElement.innerText = 'Alert pressed!';
    dialog.appendChild(titleElement);

    // Create the OK button element
    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.addEventListener('click', () => {
        closeDialog();
    });
    dialog.appendChild(okButton);

    // Add the dialog element to the page
    document.body.appendChild(dialog);

    // Show the dialog
    dialog.showModal();

    function closeDialog() {
        // Close the dialog
        dialog.close();

        // Remove the dialog element from the page
        document.body.removeChild(dialog);
    }
}
function confirmDialog() {
    const dialog = document.createElement('dialog');
    dialog.style.textAlign = 'center';
    const titleElement = document.createElement('h2');
    titleElement.innerText = 'Do you confirm this?';
    dialog.appendChild(titleElement);
  
    const cancelButton = document.createElement('button');
    const okButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    okButton.innerText = 'Ok';
    
    cancelButton.addEventListener('click', () => {
        document.getElementById("result").innerHTML = 'The value returned by the confirm method is: False';
      closeDialog();
    });
    dialog.appendChild(cancelButton);
    okButton.addEventListener('click', () => {
    document.getElementById("result").innerHTML = 'The value returned by the confirm method is: True';
      closeDialog();
    });
    dialog.appendChild(okButton);
  
    document.body.appendChild(dialog);
    dialog.showModal();
  
    function closeDialog() {
      // Close the dialog
      dialog.close();
  
      // Remove the dialog element from the page
      document.body.removeChild(dialog);
  
      // Call the callback function with the result
      
    }
}

function promptDialog() {
    const dialog = document.createElement('dialog');
    dialog.style.textAlign = 'center';
    const titleElement = document.createElement('h2');
    titleElement.innerText = 'What is your name?';
    dialog.appendChild(titleElement);
    const inputmessage = document.createElement('input');
    inputmessage.type = 'text';
    dialog.appendChild(inputmessage);
    const cancelButton = document.createElement('button');
    const okButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    okButton.innerText = 'Ok';
    cancelButton.addEventListener('click', () => {
        message = inputmessage.value;
        closeDialog();
        document.getElementById("result").textContent = `User didn't input anything`;
    });
    dialog.appendChild(cancelButton);
    okButton.addEventListener('click', () => {
        message = DOMPurify.sanitize(inputmessage.value);
        closeDialog();
        if(message != null && message != ""){
            document.getElementById("result").textContent = `Prompt result: ${message}!`;
            
        }else{
            document.getElementById("result").textContent = `User didn't input anything`;
            
        }
    });
    dialog.appendChild(okButton);
  
    document.body.appendChild(dialog);
    dialog.showModal();
  
    function closeDialog() {
      // Close the dialog
      dialog.close();
  
      // Remove the dialog element from the page
      document.body.removeChild(dialog);
  
    }
}

  

