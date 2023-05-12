//----------------------header-----------------
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});
 
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
/*-------------------------------------------------------------------*/


/*------------------------Adding date to the page----------------------------------------------*/
let today =new Date();
    
let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

let day = today.toLocaleDateString("en-US", option);
document.getElementById("date").innerHTML = day + " thoughts";

let today1 = new Date();

// format the date as YYYY-MM-DD
let year = today1.getFullYear();
let month = (today1.getMonth() + 1).toString().padStart(2, '0');
let day1 = today1.getDate().toString().padStart(2, '0');
let formattedDate = `${year}-${month}-${day1}`;
document.getElementById("date1").value = formattedDate;// set the input value to today's date


document.querySelector('#date1').addEventListener('change',async() =>{
  var date = document.querySelector('#date1').value
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          if(date!==formattedDate)
          {
          document.querySelector('#Dairy-writting').innerHTML=xhr.responseText;
          }
      }
  }
  xhr.open('POST', '/home', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      Day: date
      }));
      
})



//---------------------------------------------------------------------------------------------

document.querySelector('#Todo').addEventListener('click',function(){
  const API_URL = '/todo';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL, true);
  xhr.setRequestHeader('Constent-Type', 'application/json');
})              
//_______________________________________________________________________________________________________________________________________________________________________________________



document.querySelector('#Save').addEventListener('click', function(){
    const API_URL = '/dairy'; 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const msg = document.querySelector('#Dairy-writting').innerHTMLx``
    xhr.send(JSON.stringify({
      Dairy: document.querySelector('#Dairy-writting').innerHTML
    }));
})

//______________________________________________editor____________________________________________
const boldButton = document.querySelector('#bold');
const editor = document.querySelector('.editor');
const italicButton = document.querySelector('.fa-italic');
const underlineButton = document.querySelector('.fa-underline');
const fontSize = document.querySelector('#Font-size');

boldButton.addEventListener('click', () => {
  formatText('bold');
});

italicButton.addEventListener('click', () => {
  formatText('italic');
});

underlineButton.addEventListener('click', () => {
  formatText('underline');
});

bulletsButton.addEventListener('click', () => {
  insertList();
});
function changeFontSize(select) {
  const size = select.value;
  const selection = window.getSelection();
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }
}

// Listen for any changes in selection
document.addEventListener("selectionchange", function() {
  const selection = window.getSelection();
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;
    if (parentElement.style.fontSize) {
      document.querySelector("select").value = parentElement.style.fontSize;
    } else {
      document.querySelector("select").value = "12px";
    }
  }
});




function formatText(command, value = null) {
  document.execCommand('styleWithCSS', null, true);
  if (value === null) {
    value = command;
  }
  document.execCommand(command, false, value);
  editor.focus();
}

function insertList() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  range.surroundContents(li);
  ul.appendChild(li);
  range.insertNode(ul);
  editor.focus();
}

// boldButton.addEventListener('click', () => {
//   const selection = window.getSelection();
//   if (!selection.isCollapsed) {
//     const range = selection.getRangeAt(0);
//     const parent = getSelectionBoldParent(selection);
//     const isBold = parent.nodeName === 'B' || parent.nodeName === 'STRONG';

//     if (isBold) {
//       const text = document.createTextNode(selection.toString());
//       range.deleteContents();
//       range.insertNode(text);
//       range.selectNode(text);
//       range.collapse(false);
//     } else {
//       const span = document.createElement('span');
//       span.style.fontWeight = 'bold';
//       const text = document.createTextNode(selection.toString());
//       span.appendChild(text);
//       range.deleteContents();
//       range.insertNode(span);
//       range.selectNode(text);
//       range.collapse(false);
//     }
//   }
// });

// editor.addEventListener('keydown', (event) => {
//   if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
//     const selection = window.getSelection();
//     if (!selection.isCollapsed) {
//       const range = selection.getRangeAt(0);
//       const parent = getSelectionBoldParent(selection);
//       const isBold = parent.nodeName === 'B' || parent.nodeName === 'STRONG';

//       if (isBold) {
//         const text = document.createTextNode(selection.toString());
//         range.deleteContents();
//         range.insertNode(text);
//         range.selectNode(text);
//         range.collapse(false);
//       } else {
//         const span = document.createElement('span');
//         span.style.fontWeight = 'bold';
//         const text = document.createTextNode(selection.toString());
//         span.appendChild(text);
//         range.deleteContents();
//         range.insertNode(span);
//         range.selectNode(text);
//         range.collapse(false);
//       }
//     }
//     event.preventDefault();
//   }
// });

// editor.addEventListener('input', () => {
//   const selection = window.getSelection();
//   const parent = getSelectionBoldParent(selection);
//   const isBold = parent.nodeName === 'B' || parent.nodeName === 'STRONG';

//   if (isBold) {
//     const range = selection.getRangeAt(0);
//     const text = document.createTextNode(selection.toString());
//     range.deleteContents();
//     range.insertNode(text);
//     range.selectNode(text);
//     range.collapse(false);
//   }
// });

// function getSelectionBoldParent(selection) {
//   let parent = selection.anchorNode.parentNode;
//   while (parent.nodeName !== 'DIV' && parent.nodeName !== 'P' && parent.nodeName !== 'BODY' && !parent.getAttribute('contenteditable')) {
//     if (parent.nodeName === 'B' || parent.nodeName === 'STRONG') {
//       return parent;
//     }
//     parent = parent.parentNode;
//   }
//   return parent;
// }

//____________________________________________end_editor__________________________________________


//____________________________________________Todo__________________________________________
