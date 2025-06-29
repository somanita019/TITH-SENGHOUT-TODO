import { Component } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {EditorModule} from 'primeng/editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {DragDropModule} from 'primeng/dragdrop';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NOT_FOUND} from '@angular/core/primitives/di';

@Component({
  selector: 'app-root',
  imports: [DialogModule, InputTextModule, EditorModule, FormsModule, DividerModule, NgStyle, NgIf, NgForOf, DragDropModule, ToastModule, ConfirmDialogModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {
  title = '';

  isClick = false;
  text = '';
  textList: any[] = [];
  searchQuery = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
  }

  clickAdd() {
    this.isClick = !this.isClick;
    this.text = '';
    this.title = '';
  }

  clickClose() {
    this.isClick = false;
    this.title = '';
    this.text = '';
  }

  addNote() {
    const data = {
      title: this.title.trim(),
      content: this.text,
      createdAt: new Date()
    };
    this.textList.push(data);
    this.isClick = false;
  }

  viewNote(obj: any) {
    this.title = obj.title;
    this.text = obj.content;
    this.isClick = true;
  }
  deleteNote(i: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this note?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      // acceptButtonStyleClass:"p-button-danger",
      accept: () => {
        this.textList.splice(i, 1);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
      }
    });
  }
  get filteredNotes() {
    const filtered = this.textList.filter(note =>
      note.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const compare = a.title.localeCompare(b.title);
      return this.sortDirection === 'asc' ? compare : -compare;
    });
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
