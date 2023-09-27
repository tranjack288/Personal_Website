let items = JSON.parse(localStorage.getItem("todo-list")) || [];

function requestDialog() {
    // create a dialog
    const dialog = document.createElement('dialog');
    dialog.classList.add('request-dialog');
  
    // create the HTML for the dialog box
    dialog.innerHTML = `
      <div>
        <label>Title</label>
        <input id='titleinput' type='text'>
        <label>Date</label>
        <input id='dateinput' type='date'>
        <label>Summary</label>
        <input id='summaryinput' type='text'>
        <button id ='cancelbutton' class='fill button'><span>Cancel</span></button>
        <button id ='savebutton' class='fill button'><span>Save</span></button>
      </div>
    `;
  
    const post_title = dialog.querySelector('#titleinput');
    const post_date = dialog.querySelector('#dateinput');
    const post_summary = dialog.querySelector('#summaryinput');
  
    document.body.appendChild(dialog);
    dialog.showModal();
  
    const cancelButton = document.getElementById('cancelbutton');
    const saveButton = document.getElementById('savebutton');
  
    cancelButton.addEventListener('click', () => {
      closeDialog();
    });
  
    saveButton.addEventListener('click', () => {
      let summary = DOMPurify.sanitize(post_summary.value);
      let title = DOMPurify.sanitize(post_title.value);
      addPost(title, post_date.value, summary);
      closeDialog();
    });
  
    function closeDialog() {
      dialog.close();
      document.body.removeChild(dialog);
    }
  }
  
  
function addPost(t, d, s) {
    //checks to see if they are valid inputs
    if (!t || !d || !s) {
        alert("Please enter a value for all fields.");
        return;
    }
    //if input is valid, add item to items array
    items.push({
        title: t,
        date: d,
        summary: s
    });
    // then convert to a string with JSON.stringify and save to localStorage
    localStorage.setItem("todo-list", JSON.stringify(items));

    // call function to list all items
    listItems();
}
function editItem(index) {
    const item = items[index];

    // create a dialog
    const dialog = document.createElement('dialog');
    dialog.classList.add('edit-dialog');
    dialog.innerHTML = `
    <div>
    <label>Title</label>
    <input id='titleinput' type='text' value='${item.title}'>
    <label>Date</label>
    <input id='dateinput' type='date' value='${item.date}'>
    <label>Summary</label>
    <input id='summaryinput' type='text' value='${item.summary}'>
    <button id ='cancelbutton' class='fill button'><span>Cancel</span></button>
    <button id ='savebutton' class='fill button'><span>Save</span></button>
    </div>
    `;
    const post_title = dialog.querySelector('#titleinput');
    const post_date = dialog.querySelector('#dateinput');
    const post_summary = dialog.querySelector('#summaryinput');

    document.body.appendChild(dialog);
    dialog.showModal();
    const cancelButton = document.getElementById('cancelbutton');
    const saveButton = document.getElementById('savebutton');

    cancelButton.addEventListener('click', () => {
        closeDialog();
    });
    saveButton.addEventListener('click', () => {
        let summary = DOMPurify.sanitize(post_summary.value);
        let title = DOMPurify.sanitize(post_title.value);
        let date = post_date.value;

        if (!title || !date || !summary) {
            alert("Please enter a value for all fields.");
            return;
        }
        // update the item in the array
        items[index] = {
            title: title,
            date: date,
            summary: summary
        };
        // update the localStorage
        localStorage.setItem("todo-list", JSON.stringify(items));

        // re-render the list
        listItems();

        // close the dialog
        closeDialog();
    });

    function closeDialog() {
        dialog.close();
        document.body.removeChild(dialog);
    }
}
function deleteItem(index) {
    const dialog = document.createElement('dialog');
    //add a class to the dialog element
    dialog.classList.add('delete-dialog');
    dialog.innerHTML = `
    <h2>Delete Entry?</h2>
    <div class="button-div">
    <button id ='delete_button' class='fill button'><span>Delete</span></button>
    <button id ='cancel_delete_button' class='fill button'><span>Cancel</span></button>
    </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
    const deleteButton = document.getElementById('delete_button');
    deleteButton.addEventListener('click', () => {
        items.splice(index, 1);
        localStorage.setItem("todo-list", JSON.stringify(items));
        listItems();
        closeDialog();
    });
    const cancelButton = document.getElementById('cancel_delete_button');
    cancelButton.addEventListener('click', () => {
        closeDialog();
    });
    function closeDialog() {
        dialog.close();
        document.body.removeChild(dialog);
    }
}

function listItems() {
    let list = "";
    for (let i = 0; i < items.length; i++) {
        list += "<li>";
        list += "<h2>" + items[i].title + "</h2>";
        list += "<p>" + items[i].date + "</p>";
        list += "<p>" + items[i].summary + "</p>";
        list += "<button class='button1' onclick='editItem(" + i + ")'><span><i class='fa fa-pencil'></i></span></button>";
        list += "<button class='button1' onclick='deleteItem(" + i + ")'><span><i class='fa fa-trash-o'></i></span></button>";
        list += "</li>";
    }
    document.getElementById("list-items").innerHTML = list;
}
  
function onLoad() {
    listItems();
}
window.addEventListener("load", onLoad);