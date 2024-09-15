import { NOT_AUTHENTICATION } from "@/utils/commonConstants";

export class RequireAuthenticateError extends Error{
    constructor(message=NOT_AUTHENTICATION){
            super(message)
            this.name="RequireAuthenticateError"
    }
}