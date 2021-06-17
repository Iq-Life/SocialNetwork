export type FieldValidatorType = (value: string) => string | undefined

export const required : FieldValidatorType = (value: string): string | undefined => {
    if (value) {
        return undefined
    } else {
        return "Field is required"
    }
}

export const maxLengthCreator = (maxLength: number) : FieldValidatorType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
}

export const maxLength: FieldValidatorType= (value) => {
    if (value.length > 30) {
        return undefined
    } else {
        return "Field is required"
    }
}