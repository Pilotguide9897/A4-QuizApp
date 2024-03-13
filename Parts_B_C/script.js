window.onload = function () {
  fetchData();
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
  let data = quizData;
  quizTitle.innerHTML = data.title;
  tabs.innerHTML = "";
  let tabHTML = "";
  let sectionHTML = "";
  // Create the tabs for navigating the quiz
  data.questions.forEach((question, i) => {
    tabHTML += `<li class = "nav-item">`;
    tabHTML += `<a class = "nav-link" aria-current = "page" href = "#">Question${i}`;
    tabHTML += `</li>`;
  });
  console.log(tabHTML);
  tabs.innerHTML += tabHTML;

  data.questions.forEach((question, i) => {
    //   sectionHTML += `<div class="card">`;
    //   sectionHTML += `<h3>${question.questionText}</h3>`;
    //   sectionHTML += `<ul>`;
    //   data.questions[i].choices.forEach((choice, j) => {
    //     console.log(choice);
    //     sectionHTML += `<li class="list-group-item">`;
    //     sectionHTML += `<input type = "radio" id = Q${i}Choice${j} name = Question${i} value = ${data.questions[i].answer}>`;
    //     sectionHTML += `<label for = "Questions">${choice}</label></li>`;
    //   });
    //   sectionHTML += `</ul>`;
    //   sectionHTML += `</div>`;
  });
  // console.log(cardHTML);
  // quizBody.innerHTML = cardHTML;
}
