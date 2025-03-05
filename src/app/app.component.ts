import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  task = ''; // Input field
  taskList: { id: number; task: string }[] = []; // Task array
  editTaskId: number | null = null; // Track task being edited

  addTask() {
    if (this.task.trim() === '') return; // Prevent empty tasks

    if (this.editTaskId !== null) {
      // Editing an existing task
      const taskIndex = this.taskList.findIndex(
        (t) => t.id === this.editTaskId
      );
      if (taskIndex !== -1) {
        this.taskList[taskIndex].task = this.task; // Update task
      }
      this.editTaskId = null; // Reset edit mode
    } else {
      // Adding a new task
      const newTask = {
        id:
          this.taskList.length > 0
            ? this.taskList[this.taskList.length - 1].id + 1
            : 1,
        task: this.task,
      };
      this.taskList.push(newTask);
    }

    this.task = ''; // Clear input field
  }

  editTask(taskId: number) {
    const taskToEdit = this.taskList.find((task) => task.id === taskId);
    if (taskToEdit) {
      this.task = taskToEdit.task; // Load task into input field
      this.editTaskId = taskId; // Store ID to edit
    }
  }

  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter((item) => item.id !== taskId); // Remove task
    if (this.editTaskId === taskId) {
      this.editTaskId = null; // Cancel edit mode if task is deleted
      this.task = ''; // Clear input field
    }
  }
}
