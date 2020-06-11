import { UserDetailsModel } from './UserDetailsModel';

export interface ResponseObject {
    responseObject: UserDetailsModel,
    status: {
        code:Number,desc:string
    }
}