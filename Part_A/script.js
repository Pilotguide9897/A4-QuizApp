window.onload = function () {
  let url = null;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = FetchQuizData();
  xhr.open("GET", url, true);
  xhr.send();
  ShowQuestions();
};

let quizData = function FetchQuizData() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    return xhr.responseText;
  }
};

function ShowQuestions() {
  let quizBody = document.querySelector("#quizBody");
  let quizTitle = document.querySelector("#quizTitle");
  quizTitle.innerHTML = quizData.title;
  for (let i = 0; i < quizData.length; i++) {
    let question = quizData[i];
    quizBody.innerHTML = `<div class="card">`;
    quizBody.innerHTML += `<ul>`;

    for (let j = 0; j < question.length; j++) {
      let option = question[i];
      // quizBody += `<li class="list-group-item"><input type = "radio" id = Question${i} name = Question${i} value = ${i}><label for = "Question${i}>${option}</label></li>`;
    }

    quizBody.innerHTML += `</ul>`;
    quizBody.innerHTML = `</div>`;
  }
}
