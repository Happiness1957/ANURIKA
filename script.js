document.querySelectorAll(".list").forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
  
      document
        .querySelectorAll(".list")
        .forEach((link) => link.classList.remove("active"));
  
      this.classList.add("active");
    });
  });
  function loadContent(page) {
    const contentDiv = document.getElementById("content");
  
    switch (page) {
      case "front-office":
        contentDiv.innerHTML =
          "<h2>Front Office Content</h2><p>This is the front office page.</p>";
        break;
      case "phlebotomy":
        contentDiv.innerHTML =
          "<h2>Phlebotomy Content</h2><p>This is the phlebotomy page.</p>";
        break;
      case "laboratory":
        contentDiv.innerHTML =
          "<h2>Laboratory Content</h2><p>This is the laboratory page.</p>";
        break;
      case "admin":
        contentDiv.innerHTML =
          "<h2>Admin Content</h2><p>This is the admin page.</p>";
        break;
      case "dispatch":
        contentDiv.innerHTML =
          "<h2>Dispatch Content</h2><p>This is the dispatch page.</p>";
        break;
      case "analyzers":
        contentDiv.innerHTML =
          "<h2>Analyzers Content</h2><p>This is the analyzers page.</p>";
        break;
      case "qc":
        contentDiv.innerHTML = "<h2>QC Content</h2><p>This is the QC page.</p>";
        break;
      case "account":
        contentDiv.innerHTML =
          "<h2>Account Content</h2><p>This is the account page.</p>";
        break;
      case "inventory":
        contentDiv.innerHTML =
          "<h2>Inventory Content</h2><p>This is the inventory page.</p>";
        break;
      default:
        contentDiv.innerHTML = "<h2>Blank Page</h2>";
    }
  }
  
  
  const burgerIcon = document.getElementById("burger-icon");
  const closeIcon = document.getElementById("close-icon");
  const sideMenu = document.getElementById("side-menu");
  
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
  fetch('https://cliniqueplushealthcare.com.ng/prescriptions/drug_class')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();  
  })
  .then(data => {
    console.log('Drug Class Data:', data);
   
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  document.getElementById("prescription-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    
    const medicineName = document.getElementById("medicine-name").value;
    const interval = document.getElementById("interval").value;
    const instruction = document.getElementById("instruction").value;
    const duration = document.getElementById("duration").value;
  
    
    fetch('https://cliniqueplushealthcare.com.ng/prescriptions/drug_class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        medicineName: medicineName,
        interval: interval,
        instruction: instruction,
        duration: duration
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      
      
      document.getElementById("medicine-name").value = '';
      document.getElementById("interval").value = '';
      document.getElementById("instruction").value = '';
      document.getElementById("duration").value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  function fetchDrugClassById(classId) {
    const url = `https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${1}`;
    
    fetch(url)
      .then(response => response.json())
      .then(drugClassDetails => {
        console.log('Drug Class Details:', drugClassDetails);
       
        const classDetailsSection = document.getElementById('class-details'); 
        classDetailsSection.innerHTML = `<h2>${drugClassDetails.name}</h2><p>${drugClassDetails.description}</p>`;
      })
      .catch(error => console.error('Error fetching class details:', error));
  }

  fetch('https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine')
  .then(response => response.json())
  .then(medicines => {
    console.log('All Medicines:', medicines);

    
    const medicineList = document.getElementById('medicine-list');  // Assuming this exists in your HTML
    medicines.forEach(medicine => {
      const listItem = document.createElement('li');
      listItem.textContent = `${medicine.name} - ${medicine.description}`; // Assuming medicine has 'name' and 'description' properties
      medicineList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching medicines:', error));

  

  document.addEventListener('DOMContentLoaded', function () {
    
  
    const dropdown = document.getElementById("medicine-dropdown");
    const input = document.getElementById("medicine-name-input");
  
    
    medicineList.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("dropdown-item");
      div.textContent = item.name;
      div.setAttribute("data-id", item.id); 
  
     
      div.addEventListener("click", function () {
        input.value = item.name;  
        dropdown.style.display = "none"; 
      });
  
      dropdown.appendChild(div);
    });
  
    
    input.addEventListener("click", function () {
      dropdown.style.display = dropdown.style.display === "none" || !dropdown.style.display ? "block" : "none";
    });
  
   
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".form-group")) {
        dropdown.style.display = "none";
      }
    });
  });
  
  
