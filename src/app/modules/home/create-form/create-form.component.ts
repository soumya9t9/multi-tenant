import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';

@Component({
  selector: 'esspl-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  formGroup: FormGroup;
  formConfig;

  constructor(private fb:FormBuilder, private http:HttpClient, public dialog: MatDialog) {
    this.formGroup = this.fb.group({
      config: [, [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.http.get('assets/data/dynform copy.json').subscribe(res => {
      this.formGroup.get('config').setValue(JSON.stringify(res));
    });
  }

  generateDynForm() {
    this.formConfig = null;
    const fValue = this.formGroup.value;
    if(this.formGroup.valid && fValue) {
      this.formConfig = JSON.parse(fValue.config);
    }
  }

  onFormSubmit(event) {
    console.log(event);
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSuccessComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
