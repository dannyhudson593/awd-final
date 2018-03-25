import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableResource} from 'ngx-datatable-bootstrap4';
import {Response} from '@angular/http';
import {DbOperationsService} from './db-operations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 5 With PHP Backend [Angular 5 CRUD Example With PHP MySQL]';
  userForm: FormGroup;
  @ViewChild('modalClose') modalClose: ElementRef;
  persons: any[] = [];
  itemResource;
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10}; // Static can be changed as per your need
  formFlag = 'add';

  constructor(private db: DbOperationsService) {
    // DB service function called
    db.getUsers().subscribe((response: Response) => {
        this.persons = response.json();
        this.reloadItems(this.params);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reloadItems(params) {
    this.itemResource = new DataTableResource(this.persons);
    this.itemResource.count().then(count => this.itemCount = count);
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:
  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.id);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.id);
  }

  rowTooltip(item) {
    return item.jobTitle;
  }

  // Init method
  ngOnInit() {
    this.userForm = new FormGroup({
      'id': new FormControl(null),
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'date_of_birth': new FormControl(null, Validators.required)
    });
  }

  initUser() {
    // User form reset
    this.userForm.reset();
    this.formFlag = 'add';
  }

  // Save user's data
  saveUser() {
    if (this.formFlag == 'add') {
      this.userForm.value.id = this.persons.length + 1;
      this.persons.unshift(this.userForm.value);
      // Save method
      this.db.saveUsers(this.userForm.value);
    }
    else {
      // Update database
      this.db.updateUser(this.userForm.value);
      let index = this.persons.findIndex(x => x.id == this.userForm.value.id);

      if (index !== -1) {
        this.persons[index] = this.userForm.value;
      }
    }

    this.reloadItems(this.params);
    // Close modal
    this.modalClose.nativeElement.click();
    // User form reset
    this.userForm.reset();
  }

  // Get data while edit
  getData(item) {
    //Here you can fetch data from database
    this.userForm.patchValue(item);
    this.formFlag = 'edit';
  }

  // Delete user's data
  delData(item) {
    // Call service
    this.db.deleteUser(item);
    // Delete from array
    this.persons.splice(this.persons.indexOf(item), 1);
    this.reloadItems(this.params);
  }

}
