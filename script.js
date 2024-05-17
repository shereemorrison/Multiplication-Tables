// Function to initialize the page
function initializePage() {
  // Check if the page has already been initialized to prevent double initialization
  if (!document.body.classList.contains('initialized')) {
    // Add a class to mark the page as initialized
    document.body.classList.add('initialized');

    // Initiate typewriter effect with initial text
    typewriterEffect("What would you like to do?");

    // Enable buttons after typewriter effect finishes
    setTimeout(function() {
        document.getElementById("showStandardButton").disabled = false;
        document.getElementById("selectTimesTable").disabled = false;
        document.getElementById("resetButton").disabled = false;
        document.getElementById("createCustomButton").disabled = false;
    }, 3000); // Adjust timing according to typewriter effect duration

    // Add event listeners to input boxes to check for changes
    document.getElementById("rows").addEventListener("input", checkCustomInputs);
    document.getElementById("columns").addEventListener("input", checkCustomInputs);
  }
}

// Function to reset the page to its initial state
function reset() {
  // Disabling buttons until text finishes running
  document.getElementById("showStandardButton").disabled = true;
  document.getElementById("selectTimesTable").disabled = true;
  document.getElementById("createCustomButton").disabled = true;

  // Get references to various elements
  let standardOptions = document.getElementById("standardOptions");
  let customOptions = document.getElementById("customOptions");
  let tableContainer = document.getElementById("tableContainer");
  let selectTimesTable = document.getElementById("selectTimesTable");

  // Clear existing content in the table container
  tableContainer.innerHTML = "";

  // Hide the reset button and both options, and show the initial options
  document.getElementById("resetButton").style.display = "none";
  standardOptions.style.display = "none";
  customOptions.style.display = "none";
  document.getElementById("options").style.display = "block";

  // Reset the selection of the select element
  selectTimesTable.selectedIndex = 0;

  // Reset background image
  document.body.style.backgroundImage = "url('border.jpg')";

  // Initiate typewriter effect with new text
  typewriterEffect("What would you like to do next?");

  // Enable buttons after typewriter effect finishes
  setTimeout(function() {
    document.getElementById("showStandardButton").disabled = false;
    document.getElementById("selectTimesTable").disabled = false;
    document.getElementById("createCustomButton").disabled = false;
  }, 3000); // Adjust timing according to typewriter effect duration
}

// Function to show typewriter effect for the given text
function typewriterEffect(text) {
  const delay = 100; // Delay between each character in milliseconds
  let index = 0;
  const textElement = document.getElementById('headerText');
  textElement.textContent = ''; // Clear existing text

  function type() {
      if (index < text.length) {
          if (text[index] === ' ') {
              // If the character is a space, add it immediately
              textElement.textContent += text[index];
              index++;
              setTimeout(type, delay);
          } else {
              // Otherwise, add a character with a delay
              textElement.textContent += text[index];
              index++;
              setTimeout(type, delay);
          }
      }
  }

  type();
}

// Function to show standard multiplication tables options
function showStandardTables() {
  // Get references to the standard and custom options
  let standardOptions = document.getElementById("standardOptions");
  let customOptions = document.getElementById("customOptions");
  let tableContainer = document.getElementById("tableContainer");

  // Clear existing content in the table container
  tableContainer.innerHTML = "";

  // Show standard options and hide custom options
  standardOptions.style.display = "block";
  customOptions.style.display = "none";

  // Hide the reset button
  document.getElementById("resetButton").style.display = "none";

  // Show the select element for choosing times tables
  let selectTimesTable = document.getElementById("selectTimesTable");
  selectTimesTable.style.display = "inline-block";

  // Populate the select element with options for times tables from 2 to 20
  let select = document.getElementById("selectTimesTable");
  select.innerHTML = "";
  for (let i = 2; i <= 20; i++) {
      let option = document.createElement("option");
      option.text = i + " times table";
      option.value = i;
      select.appendChild(option);
  }

  // Reset the selection of the select element
  select.value = "";

  // Show the border
  document.body.classList.remove('hide-border');

  // Update header text
  document.getElementById('headerText').textContent = "What would you like to do next?";
}

// Function to create custom multiplication tables
function createCustomTable() {
  // Get references to the standard and custom options
  let standardOptions = document.getElementById("standardOptions");
  let customOptions = document.getElementById("customOptions");
  let tableContainer = document.getElementById("tableContainer");

  // Clear existing content in the table container
  tableContainer.innerHTML = "";

  // Hide standard options and show custom options
  standardOptions.style.display = "none";
  customOptions.style.display = "block";

  // Hide the reset button
  document.getElementById("resetButton").style.display = "none";

  // Reset input values for rows and columns
  document.getElementById("rows").value = "";
  document.getElementById("columns").value = "";

  // Show the border
  document.body.classList.remove('hide-border');

  // Update header text to initial state
  document.getElementById('headerText').textContent = "What would you like to do next?";
}

// Function to generate standard multiplication tables
function generateStandardTable() {
  // Get the selected times table value and the table container
  let selectedTable = document.getElementById("selectTimesTable").value;
  let tableContainer = document.getElementById("tableContainer");

  // Create a new table element and tbody element
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  // Create the first row with the selected times table heading
  let firstRow = document.createElement("tr");
  let firstCell = document.createElement("th");
  firstCell.textContent = selectedTable + " Times Table";
  firstRow.appendChild(firstCell);
  tbody.appendChild(firstRow);

  // Loop to generate table rows for the multiplication table
  for (let i = 1; i <= 10; i++) {
      let row = document.createElement("tr");
      let cell = document.createElement("td");
      cell.textContent = i + " x " + selectedTable + " = " + (i * selectedTable);
      row.appendChild(cell);
      tbody.appendChild(row);
  }

  // Append the tbody to the table
  table.appendChild(tbody);

  // Clear existing content in the table container and append the new table
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);

  // Show the reset button and hide the options
  document.getElementById("resetButton").style.display = "block";
  document.getElementById("options").style.display = "none";

  // Show the border
  document.body.classList.remove('hide-border');

  // Update header text
  document.getElementById('headerText').textContent = "You selected the " + selectedTable + " times table";
}

// Function to generate custom multiplication tables based on user input
function generateCustomTable() {
  // Get input values for rows, columns, and the table container
  let rows = parseInt(document.getElementById("rows").value);
  let columns = parseInt(document.getElementById("columns").value);

  // Validate input values
  if (isNaN(rows) || isNaN(columns) || rows < 2 || rows > 100 || columns < 2 || columns > 100) {
      alert("Please enter numbers between 2 and 100.");
      return;
  }

  // Get the table container and create a wrapper for scrolling
  let tableContainer = document.getElementById("tableContainer");
  let wrapper = document.createElement("div");

  // Create a new table element and tbody element
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  // Loop to generate table rows and cells for the custom multiplication table
  for (let i = 0; i <= rows; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j <= columns; j++) {
          let cell = document.createElement("td");
          if (i === 0 && j === 0) {
              cell.textContent = "";
          } else if (i === 0 && j !== 0) {
              cell.textContent = j;
          } else if (i !== 0 && j === 0) {
              cell.textContent = i;
          } else {
              cell.textContent = i * j;
          }
          row.appendChild(cell);
      }
      tbody.appendChild(row);
  }

  // Append the tbody to the table
  table.appendChild(tbody);

  // Append the table to the wrapper and then to the table container
  wrapper.appendChild(table);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(wrapper);

  // Show the reset button and hide the options
  document.getElementById("resetButton").style.display = "block";
  document.getElementById("options").style.display = "none";

  // Show the border
  document.body.classList.remove('hide-border');

  // Update header text
  document.getElementById('headerText').textContent = "You made a " + rows + " row by " + columns + " column table";
}

// Function to check input values in custom table creation
function checkCustomInputs() {
  let rows = document.getElementById("rows").value;
  let columns = document.getElementById("columns").value;

  if (rows.trim() !== "" && columns.trim() !== "") {
      document.querySelector("#customOptions button").disabled = false;
  } else {
      document.querySelector("#customOptions button").disabled = true;
  }
}

// Function to add tooltips for rows and columns input boxes
function addToolTips() {
  let rowsInput = document.getElementById("rows");
  let columnsInput = document.getElementById("columns");

  rowsInput.setAttribute("data-tooltip", "Enter a value from 2 to 100");
  columnsInput.setAttribute("data-tooltip", "Enter a value from 2 to 100");
}


initializePage();
addToolTips();
