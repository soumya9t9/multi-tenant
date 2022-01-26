import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormControlModel } from '../modules/dyn-form/FormControlModel.model';
import { CustomValidatorService } from '../validators/custom-validator.service';

export const FORM_CONST = {
  FORMARRAY: "FORMARRAY",
  FORMGROUP: "FORMGROUP",
  FORMCONTROL: "FORMCONTROL",

  INPUT: "INPUT",
  RADIO: "RADIO",
  CHECK: "CHECK",
  DROPDOWN: "DROPDOWN",
  MULTI_SELECT: "MULTI_SELECT"
}



@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  createReactiveForm(formConfig: Array<FormControlModel>): FormGroup {
    let group = {}

    const _Validators = {
      "Validators" : Validators,
      "CustomValidatorService" : CustomValidatorService,
      "CustomValidators" : CustomValidatorService
    };

    formConfig.filter(e => e.controlName).map(eachInput => {
      const controlValidators = eachInput.validations ? eachInput.validations.map(eachVldtr => {
        if(eachVldtr.isCallbackValidator) return _Validators[eachVldtr.validatorClass][eachVldtr.validator](eachVldtr.params);
        eachInput["errorMsgs"] = eachInput.validations.reduce((acc, next, index) => { acc[next.name] = next.errorMsg; return acc}, {});
        return _Validators[eachVldtr.validatorClass][eachVldtr.validator];
      }) : [];

      if (eachInput.controlType == FORM_CONST.FORMGROUP) {
        group[eachInput.controlName] = this.createReactiveForm(eachInput.formInputs)
      } else if (eachInput.controlType == FORM_CONST.FORMARRAY) {
        eachInput.formInputsClone = JSON.parse(JSON.stringify(eachInput.formInputs));
        group[eachInput.controlName] = this.formBuilder.array([]);
        if (Array.isArray(eachInput.formInputs)) {
          eachInput["formInputs"].map(eachFG => {
            let fGroup = this.createReactiveForm([eachFG]).get(eachFG.controlName.toString());
            if (eachFG.controlType != FORM_CONST.FORMGROUP) {
              const operand = fGroup.get(eachFG.controlName) || fGroup;
              group[eachInput.controlName].push(operand);
            } else {
              group[eachInput.controlName].push(fGroup);
            }
          })
        }
      } else {
        // return this.formBuilder.control(eachInput.value || '', eachInput.validators);
        const value = eachInput.value == null ? '' : eachInput.value;
        group[eachInput.controlName] = [{ 'value': value, 'disabled': eachInput.disabled }, controlValidators]
      }
    });
    return this.formBuilder.group(group);
  }

  validateForm(formGroup: FormGroup | FormArray) {
    formGroup.updateValueAndValidity();
    Object.keys(formGroup.controls).forEach(eachControl => {
      let fc = formGroup.get(eachControl);
      fc.updateValueAndValidity();
      if (fc instanceof FormGroup || fc instanceof FormArray) {
        this.validateForm(fc);
      }
    });
  }

  markAllAsTouched(formGroup: FormGroup | FormArray) {
    formGroup.markAsTouched();
    formGroup.markAllAsTouched();
    Object.keys(formGroup.controls).forEach(eachControl => {
      let fc = formGroup.get(eachControl);
      fc.markAsTouched();
      if (fc instanceof FormGroup || fc instanceof FormArray) {
        this.markAllAsTouched(fc);
      }
    });
  }

  markAllAsUnTouched(formGroup: FormGroup | FormArray) {
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach(eachControl => {
      let fc = formGroup.get(eachControl);
      fc.markAsUntouched();
      if (fc instanceof FormGroup || fc instanceof FormArray) {
        this.markAllAsUnTouched(fc);
      }
    });
  }

  markAllAsPristine(formGroup: FormGroup | FormArray) {
    formGroup.markAsPristine();
    Object.keys(formGroup.controls).forEach(eachControl => {
      let fc = formGroup.get(eachControl);
      fc.markAsPristine();
      if (fc instanceof FormGroup || fc instanceof FormArray) {
        this.markAllAsPristine(fc);
      }
    });
  }

  markAllAsDirty(formGroup: FormGroup | FormArray) {
    formGroup.markAsDirty();
    Object.keys(formGroup.controls).forEach(eachControl => {
      let fc = formGroup.get(eachControl);
      fc.markAsDirty();
      if (fc instanceof FormGroup || fc instanceof FormArray) {
        this.markAllAsDirty(fc);
      }
    });
  }
}
