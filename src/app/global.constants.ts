export class GlobalConst {
    public static REG_EXP: { [key: string]: RegExp } = {
        userName: /^\s*$/g,
        pan: /[a-zA-Z]{3}[pPcC]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-z]{1}$/g,
    }
}
