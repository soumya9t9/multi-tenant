import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { GlobalConst } from '../global.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService extends Validators {

  constructor() {
    super();
  }

  public static getNumberRange(minLimit?, maxLimit?): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.numberRange(control, minLimit, maxLimit);
    }
  }

  public static numberRange(formControl: FormControl | AbstractControl, minLimit?, maxLimit?): any {
    let value = formControl.value;
    let errorResponse:any = {};
    if (value == null || isNaN(value)) {
      errorResponse['range'] = true
      return errorResponse;
    }
    minLimit && value < minLimit ? errorResponse['minLimit'] = {requiredLimit:minLimit, actual: value} : '';
    maxLimit && value > maxLimit ? errorResponse['maxLimit'] = {requiredLimit:maxLimit, actual: value} : '';
    return Object.keys(errorResponse).length > 0 ? errorResponse : null;
  }

  public static percentage(formControl: FormControl): any {
    let value = formControl.value;
    let errorResponse:any = {};
    if (value == null) {
      errorResponse['percentage'] = true
      return errorResponse;
    }
    value < 0 ? errorResponse['minPercentage'] = true : '';
    value > 100 ? errorResponse['maxPercentage'] = true : '';
  }

  public static isEmpty(formControl: FormControl) {
    let data = formControl.value ? formControl.value.toString() : "";
    data = data.trim();
    let emptyspaceRex = GlobalConst.REG_EXP.userName;
    return RegExp(emptyspaceRex).test(data) ? { isEmpty: true, "required": true } : null;
  }

  public static validatePanNumber(formControl: FormControl) {
    let data = formControl.value ? formControl.value.toString() : "";
    data = data.trim();
    let emptyspaceRex = GlobalConst.REG_EXP.pan;
    return !RegExp(emptyspaceRex).test(data) ? { pan: true } : null;
  }

}