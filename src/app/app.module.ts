import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import * as userGlobals from './userglobals';

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
