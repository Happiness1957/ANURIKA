// toggle menu
document.querySelectorAll(".list").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    document
      .querySelectorAll(".list")
      .forEach((link) => link.classList.remove("active"));

    this.classList.add("active");
  });
});
const burgerIcon = document.getElementById("burger-icon");
const closeIcon = document.getElementById("close-icon");
const sideMenu = document.getElementById("side-menu");

// mobile screen
burgerIcon.addEventListener("click", function () {
  sideMenu.style.display = "block";
  burgerIcon.style.display = "none";
  closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
  closeIcon.style.display = "none";
  burgerIcon.style.display = "block";
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    sideMenu.style.display = "block";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "none";
  } else {
    sideMenu.style.display = "none";
    burgerIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const medicineInput = document.getElementById('medicine-class-input');
  const medicineList = document.getElementById('medicine-class-list');
  const medicineNameInput = document.getElementById('medicine-name-input');
  const medicineNameList = document.getElementById('medicine-name-list');

  // Fetch medicine classes for the first dropdown
  function fetchMedicineClasses() {
    fetch('https://cliniqueplushealthcare.com.ng/prescriptions/drug_class')
      .then((response) => response.json())
      .then((data) => {
        populateDropdown(medicineList, data, medicineInput, 'name');
      })
      .catch((error) => console.error('Error fetching medicine classes:', error));
  }

  // Fetch medicineName by medicine class ID for the second dropdown
  function fetchMedicineNameClasses(classId) {
    fetch(`https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${classId}`)
      .then((response) => response.json())
      .then((data) => {
        populateDropdown(medicineNameList, data, medicineNameInput, 'medicine_name');
        //immediately open dropdoown after fetching
        medicineNameList.classList.add('show-dropdown');
      })
      .catch((error) => console.error('Error fetching medicineName classes:', error));
  }

  // Function to populate dropdowns
  function populateDropdown(dropdown, items, inputField, textField) {
    dropdown.innerHTML = ''; 
    items.forEach((item) => {
      const li = document.createElement('li');
      const formattedText = item[textField].charAt(0).toUpperCase() + item[textField].slice(1).toLowerCase();
      li.textContent = formattedText; 
      li.dataset.id = item.id; 
      dropdown.appendChild(li);
    });

    // Show dropdown when input is clicked
    inputField.addEventListener('click', () => {
      dropdown.classList.toggle('show-dropdown');
    });

    // Handle item selection
    dropdown.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        inputField.value = e.target.textContent;
        dropdown.classList.remove('show-dropdown');

        // Fetch the second dropdown if it's the first input
        if (inputField === medicineInput) {
          const selectedClassId = e.target.dataset.id; // Get the selected class ID
          fetchMedicineNameClasses(selectedClassId); // Fetch drugs by class ID
        }
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!medicineInput.contains(e.target) && !medicineList.contains(e.target)) {
      medicineList.classList.remove('show-dropdown');
    }
    if (!medicineNameInput.contains(e.target) && !medicineNameList.contains(e.target)) {
      medicineNameList.classList.remove('show-dropdown');
    }
  });

  // Fetch the medicine classes on page load
  fetchMedicineClasses();
});


document.addEventListener("DOMContentLoaded", function () {
  const prescriptionForm = document.getElementById("prescription-form");
  const tableBody = document.querySelector("tbody");

  // Add event listener to the form
  prescriptionForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting/refreshing the page

    // Get form values
    const selectedMedicine = document.getElementById("medicine-name-input").value;
    const dose = document.getElementById("Dose").value;
    const interval = document.getElementById("interval").value;
    const duration = document.getElementById("duration").value;
    const instruction = document.getElementById("instruction").value;

    // Ensure all fields are filled out before adding to the table
    if (!selectedMedicine || !dose || !interval || !duration || !instruction) {
      console.error("Please fill out all fields.");
      return; // Stop if any field is missing
    }

    // Fetch the third API to get medicine details
    fetch("https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine")
      .then((response) => response.json())
      .then((medicines) => {
        // Assuming the fetched data is an array of medicine details
        const matchingMedicine = medicines.find(medicine => medicine.medicine_name.toLowerCase() === selectedMedicine.toLowerCase());


        if (!matchingMedicine) {
          console.error("Medicine not found in the API.");
          return;
        }

        // Create a new row for the table using data from the API
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${tableBody.rows.length + 1}</td> <!-- Serial number -->
          <td class="first-td"><p>${matchingMedicine.name}</p></td>
          <td><p>${dose}mg</p></td>
          <td><p>${interval}/days</p></td>
          <td><p>${instruction}</p></td>
          <td><button class="remove-btn">Remove</button></td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(newRow);

        // Clear the form after submission
        prescriptionForm.reset();
      })
      .catch((error) => {
        console.error("Error fetching the medicine details:", error);
      });
  });

  // Remove row when clicking the "Remove" button
  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest("tr").remove();
    }
  });
});
fetch("https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine")
  .then((response) => response.json())
  .then((medicines) => {
    console.log("Fetched medicines:", medicines); // Log the API response
  })
  .catch((error) => {
    console.error("Error fetching the medicine details:", error);
  });

