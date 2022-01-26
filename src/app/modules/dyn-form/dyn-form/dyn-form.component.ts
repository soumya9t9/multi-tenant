import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { FormControlModel } from '../FormControlModel.model';


// https://dev.to/myndpm/a-new-approach-to-have-dynamic-forms-in-angular-5d11
// https://medium.com/@mail.bahurudeen/create-a-dynamic-form-with-configurable-fields-and-validations-using-angular-6-994db56834da
@Component({
  selector: 'esspl-dyn-form',
  templateUrl: './dyn-form.component.html',
  styleUrls: ['./dyn-form.component.scss']
})
export class DynFormComponent implements OnInit, OnChanges {

  public FG = FormGroup;
  @Input('form') baseFG: FormGroup | any;
  //  new FormGroup({name: new FormControl(), gender: new FormControl()})
  @Input('formConfig') formConfig: FormControlModel[];

  @Output() submitEvent = new EventEmitter<any>();
  @Output() inputChangeEvent = new EventEmitter<any>();

  constructor(private formService: FormService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.baseFG && !this.baseFG) {
      this.baseFG = null;
      this.createForm();
    }
  }

  ngOnInit(): void {
    // this.createForm();
    // console.log(this.baseFG)
  }

  radioChange(opt, field) {

  }

  createForm() {
    const fgConfig: FormControlModel = {
      controlType: "FORMGROUP",
      controlName: "dynForm",
      formInputs: this.formConfig
    }
    if (this.formConfig && !this.baseFG) this.baseFG = this.formService.createReactiveForm([fgConfig]).get("dynForm") as FormGroup;

  }

  getErrorMessage(field: FormControlModel): string {
    if (!this.baseFG) return "";
    const fc: AbstractControl = this.baseFG.get(field.controlName);
    var errors = [];
    field.validations.some(eachV => {
      if (fc && fc.hasError(eachV.name)) errors.push(eachV.errorMsg);
    });
    return errors[0] || '';
  }

  onInputChange(event, field) {
    // console.log(this);
    this.inputChangeEvent.emit({ target: field })
  }

  addToFArray(field: FormControlModel, fArray: FormArray) {
    const dummyConfig = field.formInputsClone[0] || field.formInputs[0] 
    const controlConfig: FormControlModel = JSON.parse(JSON.stringify(dummyConfig));
    controlConfig.controlName = field.formInputs.length + '';
    // controlConfig.label = controlConfig.label + " " + (field.formInputs.length + 1);
    const control = this.formService.createReactiveForm([controlConfig]);
    control.reset();
    fArray.push(control.controls[`${controlConfig.controlName}`]);
    field.formInputs.push(controlConfig);
  }

  removeToFArray(fieldArray: FormControlModel, fArray: FormArray, faIndex: number) {
    if (fieldArray.formInputs.length > 1) {
      fieldArray.formInputs.splice(faIndex, 1);
      fArray.removeAt(faIndex);
    }
  }

  getFormValues(farray: FormControlModel[], defaultValue = {}) {
    const isDefaultValueArray = Array.isArray(defaultValue); 
    return farray.reduce((k:any, e) => {
      if (e.controlType !== 'BUTTON') {
        if(e?.formInputs?.length) {
          var newD = e.controlType == 'FORMARRAY' ? [] : {}; 
          k[e.controlName] = this.getFormValues(e.formInputs, newD);
        } else {
          isDefaultValueArray ? k.push(e.value) : k[e.controlName] = e.value;
        }
        // //  e?.formInputs.reduce((a, i) => {
        // //   a[i.controlName] = i.value;
        // //   return a;
        // }, {});
      }
      return k;
    }, defaultValue);
  }
  submit(button) {
    this.formService.markAllAsTouched(this.baseFG);
    this.formService.markAllAsDirty(this.baseFG);
    this.formService.validateForm(this.baseFG);
    
    // console.log(this.getFormValues(this.formConfig));
    console.log(this.baseFG);

    if (this.baseFG.valid) {
      this.submitEvent.emit({ value: this.baseFG.value });
    }
  }
}
