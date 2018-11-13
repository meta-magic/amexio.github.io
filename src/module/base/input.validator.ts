export interface InputValidator {
    isValid(): boolean;
    checkValidity(): void;
    validateOnInit(): boolean;
}
