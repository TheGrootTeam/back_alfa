export interface ParamsProfileController extends Request{
    params: {
        userId: string;
        applicantOrCompany: string;
    }
}