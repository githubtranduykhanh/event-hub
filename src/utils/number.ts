export class NumberHelper {
    static formatTime (seconds: number){
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };  
    static formatLargeNumber(number: number): string {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(1) + 't'; // 't' cho tỷ
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';    // 'm' cho triệu
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';       // 'k' cho ngàn
        } else {
            return number.toString(); // Giữ nguyên số nếu nhỏ hơn 1000
        }
    }
}