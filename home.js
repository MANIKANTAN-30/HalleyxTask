function allowDrop(event) {
  event.preventDefault();
}

function drag(event, element) {
  event.dataTransfer.setData("text", element);
}

function drop(event) {
  event.preventDefault();
  const element = event.dataTransfer.getData("text");
  const formPreview = document.getElementById("preview-form");

  if (element === "Layout") {
    const layoutDiv = document.createElement("div");
    layoutDiv.className = "layout";
    layoutDiv.setAttribute("draggable", "true");
    layoutDiv.setAttribute("ondragstart", "drag(event, 'Layout')");
    layoutDiv.ondrop = function (event) {
      splitFormPreview();
      event.preventDefault();
    };
    formPreview.appendChild(layoutDiv);
  } else if (element === "Label") {
    const label = document.createElement("label");
    label.innerText = "Label Text:";
    const input = document.createElement("input");
    input.type = "text";
    formPreview.appendChild(label);
    formPreview.appendChild(input);
  } else if (element === "Text Box") {
    const textBox = document.createElement("input");
    textBox.type = "text";
    formPreview.appendChild(textBox);
  } else if (element === "Button") {
    const button = document.createElement("button");
    button.innerText = "Button";
    formPreview.appendChild(button);
  } else if (element === "Check Box") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    formPreview.appendChild(checkbox);
    const label = document.createElement("label");
    label.innerText = "Check Box Label";
    formPreview.appendChild(label);
  } else if (element === "Radio Button") {
    const radio = document.createElement("input");
    radio.type = "radio";
    formPreview.appendChild(radio);
    const label = document.createElement("label");
    label.innerText = "Radio Button Label";
    formPreview.appendChild(label);
  } else if (element === "Table") {
    createTable();
  } else if (element === "Navigation") {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = "Navigation Link";
    formPreview.appendChild(link);
  } else if (element === "Image") {
    const image = document.createElement("img");
    image.src = "path_to_your_image.jpg";
    formPreview.appendChild(image);
  }
}
function reloadPage() {
  window.location.reload();
}
function loadPreview() {
  const formPreview = document.getElementById("form-preview");
  const previewContent = formPreview.innerHTML;
  const newTab = window.open();
  newTab.document.open();
  newTab.document.write("<html><head><title>Form Preview</title></head><body>");
  newTab.document.write('<div id="preview-content">');
  newTab.document.write(previewContent);
  newTab.document.write("</div></body></html>");
  newTab.document.close();
}
function reloadPage() {
  window.location.reload();
}
function clearFormPreview()
 {
  var previewForm = document.getElementById('preview-form');
  previewForm.innerHTML = '';
}
document.getElementById('clear-button').addEventListener('click', clearFormPreview);

function clearFormPreview() {
  var previewForm = document.getElementById('preview-form');
  previewForm.innerHTML = ''; // Clear the form content
}

document.getElementById('clear-button').addEventListener('click', clearFormPreview);


document.getElementById('save-button').addEventListener('click', function() {
  const formPreview = document.getElementById("form-preview");
  const previewContent = formPreview.innerHTML;

  const format = prompt("Save as CSV or JSON? Enter 'csv' or 'json'");

  if (format === 'csv') {
      saveAsCSV(previewContent);
  } else if (format === 'json') {
      saveAsJSON(previewContent);
  } else {
      alert("Invalid format. Please enter 'csv' or 'json'.");
  }
});

function saveAsCSV(content) 
{
  const blob = new Blob([content], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'form.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function saveAsJSON(content)
 {
  const formObject = parseFormContent(content);
  const jsonString = JSON.stringify(formObject, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'form.json';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function parseFormContent(content)
 {
  const formObject = { content: content };
  return formObject;
}
function createTable() {
  const formPreview = document.getElementById("preview-form");
  let numRows;
  let numCols;

  while (true) {
    const numRowsInput = prompt("Enter the number of rows for the table:");
    if (numRowsInput === null) {
      return; // User canceled, so we exit the function
    }

    if (isNaN(numRowsInput) || numRowsInput <= 0) {
      alert("Please enter a valid number of rows.");
    } else {
      numRows = parseInt(numRowsInput);
      break;
    }
  }

  while (true) {
    const numColsInput = prompt("Enter the number of columns for the table:");
    if (numColsInput === null) {
      return; // User canceled, so we exit the function
    }

    if (isNaN(numColsInput) || numColsInput <= 0) {
      alert("Please enter a valid number of columns.");
    } else {
      numCols = parseInt(numColsInput);
      break;
    }
  }

  const table = document.createElement("table");
  table.border = "1";

  // Create the header row with input fields
  const headerRow = table.insertRow(0);
  for (let i = 0; i < numCols; i++) {
    const headerCell = headerRow.insertCell(i);
    const headerInput = document.createElement("input");
    headerInput.type = "text";
    headerInput.placeholder = `Header ${i + 1}`;
    headerCell.appendChild(headerInput);
  }

  // Create data rows with contentEditable cells
  for (let i = 0; i < numRows; i++) {
    const dataRow = table.insertRow(i + 1);
    for (let j = 0; j < numCols; j++) {
      const dataCell = dataRow.insertCell(j);
      dataCell.contentEditable = "true";
      dataCell.innerText = `Data ${i + 1}-${j + 1}`;
    }
  }

  // Append the table to the form preview
  formPreview.appendChild(table);
}
