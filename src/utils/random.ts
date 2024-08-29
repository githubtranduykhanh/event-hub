export class RandomUtils {
    // Phương thức để tạo một số ngẫu nhiên trong một khoảng cụ thể
    static getRandomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Phương thức để tạo một chuỗi ký tự ngẫu nhiên với độ dài cho trước
    static getRandomString(length: number): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
    // Phương thức để tạo một màu ngẫu nhiên dưới dạng mã hex
    static getRandomColor(): string {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
}
  

  