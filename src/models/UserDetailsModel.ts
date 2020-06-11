import { AuthDetailModel } from './AuthDetailsModel';
import { SocialMediaDetailsModel } from './SocialMediaDetailsModel';

export interface UserDetailsModel {
    authDetailModel:AuthDetailModel,
    socialMediaDetailsModel:SocialMediaDetailsModel,
    roles: ["USER"]
}