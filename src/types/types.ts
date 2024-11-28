
export type FormFields = {
	userName : string, 
	email: string,
	phoneNumber:string |number,
	password: number | string | Blob,
	confirmPassword : number | string,
	country : string , 
	profileImage : string | File | HTMLImageElement
}
export type VerifyFormFields = {
	email: string,
	code : string | number
}