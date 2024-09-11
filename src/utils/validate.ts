import { EventModel } from "~/models";


export interface ValidateEventKeyAndErrMess {
  key:string;
  errMess:string;
}


export class Validate {
    static email(mail: string) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    }
  
    static Password = (val: string) => {
      return val.length >= 6;
    };

    static ConfirmPassword = (password:string,confirmPassword:string) => {
        return password === confirmPassword ? true : false
    };
    static isEmpty = (value: any): boolean => {
      if (Array.isArray(value) && value.length === 0) {
        return false; // Mảng trống
      }
      if (typeof value === 'string' && value.trim() === '') {
        return false; // Chuỗi rỗng
      }
      return true; // Nếu không phải mảng trống hoặc chuỗi rỗng
    }
    static EventValidation = (eventModel:any,keyAndErrMess:ValidateEventKeyAndErrMess[]): ValidateEventKeyAndErrMess[] => {
      const result:ValidateEventKeyAndErrMess[] = []
      keyAndErrMess.forEach(item => {
        const keys = item.key.split('.')
        if(keys.length > 1){
            const [parentKey, childKey] = keys;
            !this.isEmpty(eventModel[parentKey][childKey]) && result.push(item)
        }else !this.isEmpty(eventModel[item.key]) && result.push(item)    
      })
      return result
    }  

    static ValidateDates = (startAt:Date, endAt:Date) : boolean => startAt < endAt;
}