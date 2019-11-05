import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import {Book} from '../../models/book-model';
import {BookService} from '../../service/book.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { AddBookComponent} from '../add-book/add-book.component';
import { MatSnackBar} from '@angular/material';
import {EditBookComponent} from '../edit-book/edit-book.component';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.scss']
})
export class ShowBookComponent implements OnInit {
  listData: MatTableDataSource<any>;
  columnNames: string[] = ['Options', 'id', 'title', 'author'];

  constructor(private bookService: BookService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.bookService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshBookList();
    });
  }

  @ViewChild(MatSort, null) sort: MatSort;  // Sorting

  ngOnInit() {
    this.refreshBookList();
  }

  onEdit(book: Book) {
    this.bookService.formData = book;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditBookComponent,  dialogConfig);
  }
  refreshBookList() {
    this.bookService.getBookList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onDelete(bookId: number) {
    if (confirm('Bạn có muốn xóa không?')) {
      this.bookService.deleteBook(bookId).subscribe(res => {
        this.refreshBookList();
      });
      this.snackBar.open( 'Delete Successful !', '', {
        duration: 4000,
        verticalPosition: 'top'
      });
    }
  }

  appFilter(filter: string) {
    this.listData.filter = filter.trim().toLocaleLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(AddBookComponent,  dialogConfig);
  }
}
