export interface FormControlModel {
    controlType: "RADIO" | "INPUT" | "TEXT_AREA" | "SELECT" | "MULTI_SELECT" | "FORMGROUP" | "FORMARRAY" | "BUTTON" ,
    controlName: string,
    label?: string,
    placeholder?: string
    type?: "text" | "password" | any,
    value?: any,
    validations?: ValidationModel[],
    maxLength?: number,
    min?: any,
    readonly?: "readonly" | null,
    options?: any [],
    uppercase? :boolean,
    disabled? :boolean;
    formInputs?: FormControlModel[],
    formInputsClone?:FormControlModel[],
}

export interface ValidationModel {
    name: string,
    validator: string,
    validatorClass: string,
    errorMsg: string,
    params?: any,
    isCallbackValidator?: boolean
}