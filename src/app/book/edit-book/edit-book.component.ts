import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {BookService} from '../../service/book.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  constructor(public dialogBox: MatDialogRef<EditBookComponent>,
              private service: BookService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogBox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    this.service.updateBook(form.value).subscribe(
      res => {this.snackBar.open( 'Update Successful !', '', {duration: 4000, verticalPosition: 'top'}); },
      err => this.snackBar.open( 'Update Fail !', '', { duration: 4000, verticalPosition: 'top'}));
  }

}
