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
  
  // show menu
  // Get elements
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