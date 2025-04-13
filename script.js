let inputValue = document.getElementById("input");
let toDoList = document.querySelector(".to-do-list");
let arrowIcon = document.querySelector(".arrow-icon");
let completedList = document.querySelector(".completed-list");
let emptymessage = document.querySelector(".empty-message");
let rightContain=document.querySelector(".right-contain")
const completedListItems = completedList.querySelectorAll("li");
let showList=document.querySelector(".show-list");
let toggle1=document.querySelector(".toggle");
let listul=document.querySelector(".list-ul")

window.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const completed = JSON.parse(localStorage.getItem("completed")) || [];

  todos.forEach(text => {
    const item = createItem(text); // تابعی که آیتم می‌سازه
    toDoList.appendChild(item);
  });

  completed.forEach(text => {
    const item = createItem(text); // همون تابع ولی بفرستش به completed
    addToCompletedList(item, text);
  });
});





function saveLists() {
  const todos = Array.from(todoList.children).map(item => item.querySelector("span").textContent);
  const completed = Array.from(completedList.children).map(item => item.querySelector("span").textContent);

  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("completed", JSON.stringify(completed));
}

arrowIcon.addEventListener("click", () => {
  const input = inputValue.value.trim();
  if (input === "") {
    inputValue.style.outlineColor="red"
    return;
  }else{
    inputValue.style.outlineColor="gray"
  }
  

  let newItem = document.createElement("li");
  newItem.classList =
    "flex gap-5 border-2 border-gray-400 rounded-sm p-2 items-center justify-center mb-5 to-do-item";
  newItem.innerHTML = `
    <p class="text-gray-700">${input}</p>
         <div class="flex justify-center items-center border-gray-500 border-l-2 gap-2 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-trashColor trash-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-checkColor check-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
                    
         </div>
    `;
  toDoList.appendChild(newItem);
  inputValue.value = "";
  let trash = newItem.querySelector(".trash-icon");
  let check = newItem.querySelector(".check-icon");
  trash.addEventListener("click", () => {
    deleteItem(newItem);
    saveLists()
  });


  check.addEventListener("click", () => {
    addToCompletedList(newItem, input);
    emptymessage.classList="hidden"
    saveLists()
  });

  return newItem;
});
function deleteItem(item) {
  item.remove();
  if(completedList.children.length===0){
     emptymessage.classList.replace("hidden","block")
  }
  }
  

  
function addToCompletedList(newItem, input) {
  let newCompleteItem = document.createElement("li");
  newCompleteItem.classList =
    "flex gap-5 border-2 border-gray-400 rounded-sm p-2 items-center justify-center mb-5";
  newCompleteItem.innerHTML = `
    <p class="text-gray-700">${input}</p>
          <div class="flex justify-center items-center border-gray-500 border-l-2 gap-2 pl-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-trashColor trash-complete">
             <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
           </svg>         
          </div>
  `;
  let trashCompeleted = newCompleteItem.querySelector(".trash-complete");
  trashCompeleted.addEventListener("click", () => {
    deleteItem(newCompleteItem);
  });

  completedList.appendChild(newCompleteItem);
  deleteItem(newItem);
}


showList.addEventListener("click",()=>{
  toggle1.classList.toggle("rotate-180");
  if(toggle1.classList.contains("rotate-0")){
    rightContain.classList.toggle("hidden")
  }
  
})

function saveLists() {
  const todos = Array.from(todoList.children).map(item => item.querySelector("span").textContent);
  const completed = Array.from(completedList.children).map(item => item.querySelector("span").textContent);

  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("completed", JSON.stringify(completed));
}


