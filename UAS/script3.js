class TaskManager {
    constructor(inputBoxId, listContainerId) {
      this._inputBox = document.getElementById(inputBoxId);
      this._listContainer = document.getElementById(listContainerId);
      this.initialize();
    }
  
    initialize() {
      this.showTask();
      this.addButtonEvent();
      this._listContainer.addEventListener("click", this.handleItemClick.bind(this));
    }
  
    addTask() {
      if (this._inputBox.value === '') {
        alert("You must write something");
      } else {
        const task = new Task(this._inputBox.value);
        this._listContainer.appendChild(task.render());
      }
      this._inputBox.value = "";
      this.saveData();
    }
  
    addButtonEvent() {
      const addButton = document.getElementById('addButton');
      addButton.addEventListener('click', this.addTask.bind(this));
    }
  
    handleItemClick(e) {
      const target = e.target;
      if (target.tagName === "LI") {
        target.classList.toggle("checked");
      } else if (target.tagName === "SPAN") {
        target.parentElement.remove();
        this.saveData();
      }
    }
  
    saveData() {
      localStorage.setItem("data", this._listContainer.innerHTML);
    }
  
    showTask() {
      if (localStorage.getItem("data")) {
        this._listContainer.innerHTML = localStorage.getItem("data");
      }
    }
  }
  
  class Task {
    constructor(description) {
      let _description = description;
  
      this.getDescription = function() {
        return _description;
      };
  
      this.render = function() {
        const li = document.createElement("li");
        li.textContent = _description;
  
        const span = document.createElement("span");
        span.textContent = "\u00d7";
  
        li.appendChild(span);
        return li;
      };
    }
  }
  
  const taskManager = new TaskManager("input-box", "list-container");
  