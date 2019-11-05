import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BookService} from '../../service/book.service';
import {NgForm} from '@angular/forms';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<AddBookComponent>,
              private service: BookService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.resetForm();
  }

  onClose() {
    this.dialogBox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    this.service.addBook(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.snackBar.open( 'Update Successful !', '', {duration: 4000, verticalPosition: 'top'}); },
      err => this.snackBar.open( 'Update Fail !', '', { duration: 4000, verticalPosition: 'top'}));
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = { id: 0, title: '', author :'', description : ''};
  }


}
