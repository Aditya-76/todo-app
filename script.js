document.addEventListener("DOMContentLoaded", webscript);

function webscript() {
  const currTime = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  //add time to dom
  document.getElementById("time").innerHTML = currTime;

  //intial render function
  function init() {
    displayList();
  }
  init();

  //fetch quote
  async function fetchQuote(){
    let raw = await fetch('https://api.quotable.io/quotes/random');
    let final = await raw.json();
    // console.log(final[0].content, final[0].author);
    return final;
  }
  fetchQuote().then(quote => displayQuoteInDom(quote));

  function displayQuoteInDom(quote){
    let quoteEle = document.querySelector('#quote');
    quoteEle.innerHTML=`<i>${quote[0].content}</i>`;

    let author = document.querySelector('#author');
    author.innerHTML = `<i>${quote[0].author}</i>`;
  }

  //add evnet listener to + button (using form)
  const form = document.querySelector("#todo-data");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#todo-list").innerHTML = "";
    const todo = document.getElementById("input");
    addToLocal(todo.value, todo.value);
    todo.value = "";
    displayList();
  });

  //add to localStorage
  function addToLocal(key, value) {
    localStorage.setItem(key, value);
  }

  //clear localStorage
  function clearAll() {
    localStorage.clear();
    document.querySelector("#todo-list").innerHTML = "";
  }
  //clear button
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", () => clearAll());

  //function to display list using localStorage
  function displayList() {
    for (let i = 0; i < localStorage.length; i++) {
      addToList(localStorage.getItem(localStorage.key(i)));
    }
  }

  //add to DOM
  function addToList(todo) {
    const ulEle = document.getElementById("todo-list");
    const liEle = document.createElement("li");
    liEle.classList.add("list-group-item", "p-3");
    liEle.innerHTML = `
    <input class="form-check-input me-1" id="todo-2" type="checkbox">
    <label class="form-check-label" for="todo-2">
    ${todo}
    </label>
    `;
    ulEle.append(liEle);
  }
}
