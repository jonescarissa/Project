var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const term = document.createElement('h2');
  const definition = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  term.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  term.textContent = text.my_term;

  definition.setAttribute("style", "text-align:center; display:none; color:red");
  definition.textContent = text.my_definition;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  flashcard.appendChild(term);
  flashcard.appendChild(definition);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(definition.style.display == "none")
      definition.style.display = "block";
    else
      definition.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const term = document.querySelector("#term");
  const definition = document.querySelector("#definition");

  let flashcard_info = {
    'my_term' : term.value,
    'my_definition'  : definition.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  term.value = "";
  definition.value = "";
}