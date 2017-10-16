import { Injectable } from '@angular/core';
import { Task } from './task';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private tasksUrl = '/api/tasks';

    constructor (private http: Http) {}

    // get("/api/tasks")
    getTasks(): Promise<Task[]> {
      return this.http.get(this.tasksUrl)
                 .toPromise()
                 .then(response => response.json() as Task[])
                 .catch(this.handleError);
    }

    // post("/api/tasks")
    createTask(newTask: Task): Promise<Task> {
      return this.http.post(this.tasksUrl, newTask)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

    // get("/api/tasks/:id") endpoint not used by Angular app

    // delete("/api/tasks/:id")
    deleteTask(delTaskId: String): Promise<String> {
      return this.http.delete(this.tasksUrl + '/' + delTaskId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/tasks/:id")
    updateTask(putTask: Task): Promise<Task> {
      var putUrl = this.tasksUrl + '/' + putTask._id;
      return this.http.put(putUrl, putTask)
                 .toPromise()
                 .then(response => response.json() as Task)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}
