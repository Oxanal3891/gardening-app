$(document).ready(function () {
  $("#plant-confirm-btn").on("click", function (e) {
    e.preventDefault();
    let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
    console.log("inside search button", userPlantInput);
    if (userPlantInput.length !== 0)
      window.location.href = `./pages/plant-result.html?q=${userPlantInput}`;
  });
});

$(document).ready(function () {
  let searchHistory = [];
  // Function to render buttons
  function renderBtns() {
    let historyDiv = $("#history");
    for (let i = 0; i < searchHistory.length; i++) {
      let historyBtn = $("<button>");
      historyBtn.addClass("btn btn-secondary plantsBtn");
      historyBtn.attr("data-name", searchHistory[i]);
      historyBtn.text(searchHistory[i]);
      historyDiv.prepend(historyBtn);
    }
  }
  function storeHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  function init() {
    let storeHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storeHistory !== null) {
      searchHistory = storeHistory;
      renderBtns();
    }
  }
  init();
  $("#plant-confirm-btn").on("click", function (e) {
    e.preventDefault();
    let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
    console.log("inside search button", userPlantInput);
    if (userPlantInput.length !== 0) {
      if (!searchHistory.includes(userPlantInput)) {
        searchHistory.push(userPlantInput);
        storeHistory();
      }
      window.location.href = `./pages/plant-result.html?q=${userPlantInput}`;
    }
  });
  $(document).on("click", ".plantsBtn", function (event) {
    event.preventDefault();
    let element = event.target;
    $("#userPlantName").val(element.getAttribute("data-name"));
  });
});
