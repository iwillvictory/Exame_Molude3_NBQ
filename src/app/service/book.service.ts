import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment} from '../../environments/environment';
import {Book} from '../models/book-model';
import {Department} from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  formData: Book;
  readonly apiUrl = environment.apiUrl;
  private listener = new Subject<any>();
  constructor(private httpClient: HttpClient) { }

  getBookList(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books/`);
  }

  addBook(book: Book) {
    return this.httpClient.post(`${this.apiUrl}/books/`, book);
  }

  deleteBook(bookId: number)  {
    return this.httpClient.delete(`${this.apiUrl}/books/${bookId}`);
  }

  updateBook(book: Book) {
    return this.httpClient.put(`${this.apiUrl}/books/${book.id}`, book);
  }

  listen(): Observable<any> {
    return this.listener.asObservable();
  }
  filter(filterBy: string) {
    this.listener.next(filterBy);
  }

}
