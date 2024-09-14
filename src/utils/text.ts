export class TextHelper {
  static capitalizeFirstLetter(str: string) {
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
  };
  static formatToVND(amount:number):string {
    // Định dạng số thành chuỗi với phân cách hàng nghìn
    const formattedAmount = amount.toLocaleString('vi-VN');
    // Thêm ký hiệu VNĐ vào cuối chuỗi
    return `${formattedAmount} VNĐ`;
  };
  static formatDateTime(dateTime: Date, format: string): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = dateTime.getDate();
    const month = dateTime.getMonth(); // Tháng từ 0 đến 11
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const isPM = hours >= 12;

    const formatters: Record<string, string> = {
        'a': isPM ? 'PM' : 'AM',
        'yyyy': String(year),
        'yy': String(year).slice(-2),
        'MMMM': monthsOfYear[month],
        'MMM': monthsOfYear[month].slice(0, 3),
        'MM': String(month + 1).padStart(2, '0'),
        'ddd': daysOfWeek[dateTime.getDay()],
        'dd': String(day).padStart(2, '0'),
        'HH': String(hours).padStart(2, '0'),
        'hh': String(hours % 12 || 12).padStart(2, '0'),
        'mm': String(minutes).padStart(2, '0'),
        'ss': String(seconds).padStart(2, '0'),
    };

    // Tạo biểu thức chính quy động cho tất cả các mẫu định dạng
    const regex = new RegExp(Object.keys(formatters).join('|'), 'g');

    // Thay thế các mẫu định dạng trong chuỗi format
    return format.replace(regex, match => formatters[match]);
  };
}