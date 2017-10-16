export class Task {
  _id?: string;
  name: string;
  description: string;
  duedate: string;
  completed: boolean;
  createdby: {
    name: string;
    email: string;
  }
}
