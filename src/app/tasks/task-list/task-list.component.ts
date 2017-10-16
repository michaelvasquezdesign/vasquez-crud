import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})

export class TaskListComponent implements OnInit {

  tasks: Task[]
  selectedTask: Task

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    var username = '';
    var email = '';

    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function checkCookie() {
      username = getCookie("username");
      if(username != "") {
        alert("Welcome again " + username);
      } else {
        username = prompt("Please enter your name:","");
        if(username != "" && username != null) {
          setCookie("username", username, 30);
        }
        email = prompt("Please enter your email:","");
        if(email != "" && email != null) {
          setCookie("email", email, 30);
        }
      }
    }

    // Check browser support
    if(typeof(Storage) !== "undefined") {
      if(localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        email = localStorage.getItem("email");
        alert("Welcome again " + username);
      } else {
        username = prompt("Please enter your name:","");
        if(username != "" && username != null) {
          localStorage.setItem("username", username);
        }
        email = prompt("Please enter your email:","");
        if(email != "" && email != null) {
          localStorage.setItem("email", email);
        }
      }
    } else {
      checkCookie();
    }

    this.taskService
    .getTasks()
    .then((tasks: Task[]) => {
      this.tasks = tasks.map((task) => {
        if (!task.createdby) {
          task.createdby = {
            name: '',
            email: ''
          }
        }
        return task;
      });
    });
  }

  private getIndexOfTask = (taskId: String) => {
    return this.tasks.findIndex((task) => {
      return task._id === taskId;
    });
  }

  selectTask(task: Task) {
    this.selectedTask = task
  }

  createNewTask() {
    var task: Task = {
      name: '',
      description: '',
      duedate: '',
      completed: false,
      createdby: {
        name: username,
        email: email
      }
    };

    // By default, a newly-created task will have the selected state.
    this.selectTask(task);
  }

  deleteTask = (taskId: String) => {
    var idx = this.getIndexOfTask(taskId);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      this.selectTask(null);
    }
    return this.tasks;
  }

  addTask = (task: Task) => {
    this.tasks.push(task);
    this.selectTask(task);
    return this.tasks;
  }

  updateTask = (task: Task) => {
    var idx = this.getIndexOfTask(task._id);
    if (idx !== -1) {
      this.tasks[idx] = task;
      this.selectTask(task);
    }
    return this.tasks;
  }
}
