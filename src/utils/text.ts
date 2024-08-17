export class TextHelper {
    static capitalizeFirstLetter (str: string){
      if (str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };   
    static maskEmail(email: string): string {
      const [localPart, domain] = email.split("@");
  
      // Lấy một phần của địa chỉ email trước khi chuyển đổi
      const start = localPart.slice(0, 2); // Lấy 2 ký tự đầu tiên
      const end = localPart.slice(-2);     // Lấy 2 ký tự cuối cùng
  
      // Tạo phần giữa bằng dấu *
      const maskedPart = "*".repeat(localPart.length - start.length - end.length);
  
      return `${start}${maskedPart}${end}@${domain}`;
    }
}