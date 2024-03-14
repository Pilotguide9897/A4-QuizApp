window.onload = function () {
  fetchData();
  let submitButton = document.querySelector("#btnSubmit");
  submitButton.addEventListener("click", showResults);
};

function fetchData() {
  let url = "../Part_A/QuizTemplates/GeographyQuiz.json";
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("Response Data:", xhr.responseText);
      let quizData = JSON.parse(xhr.responseText);
      ShowQuestions(quizData);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function ShowQuestions(quizData) {
  let quizBody = document.querySelector("#quizBody");
  let quizTitle = document.querySelector("#quizTitle");
  let tabs = document.querySelector("#tabs");
  let tabContent = document.querySelector("#tabContent");
  let data = quizData;
  quizTitle.innerHTML = data.title;
  tabs.innerHTML = "";
  let tabHTML = "";
  let sectionHTML = "";
  // Create the tabs for navigating the quiz
  data.questions.forEach((question, i) => {
    tabHTML += `<li class = "nav-item">`;
    tabHTML += `<button
      class="nav-link mt-5"
      id="pills-profile-tab"
      data-bs-toggle="pill"
      data-bs-target="#pills-Question${i}"
      type="button"
      role="tab"
    >
      Question ${i}
    </button>`;
    tabHTML += `</li>`;
  });
  console.log(tabHTML);
  tabs.innerHTML += tabHTML;

  // Doing the Tab Content
  data.questions.forEach((question, i) => {
    sectionHTML += `<div class = "tab-pane fade mt-5" id = "pills-Question${i}" role = "tabpanel">`;
    sectionHTML += `<div class="card">`;
    sectionHTML += `<h3>${question.questionText}</h3>`;
    sectionHTML += `<ul>`;
    data.questions[i].choices.forEach((choice, j) => {
      console.log(choice);
      sectionHTML += `<li class="list-group-item">`;
      sectionHTML += `<input type = "radio" id = "Q${i}Choice${j}" name = "Question${i}" value = "${data.questions[i].answer}">`;
      sectionHTML += `<label for = "Questions">${choice}</label></li>`;
    });
    sectionHTML += `</ul>`;
    sectionHTML += `</div>`;
    sectionHTML += `</div>`;
  });
  tabContent.innerHTML = sectionHTML;
  document.querySelector(".nav-link").classList.add("active");
  tabContent.querySelector("#pills-Question0").classList.add("active");
  tabContent.querySelector("#pills-Question0").classList.add("show");

  console.log(sectionHTML);
}

function showResults() {
  // let questionCards = document.querySelectorAll(".card");
  // for (let i = 0; i < questionCards.length; i++) {
  //   //let Question
  // }
  // console.log(questionCards);
  // let questions = document.querySelectorAll("input[type = radio]");
  // console.log(questions);
  //forEach;
}
