
export interface Location {
    address: string;
    title: string;
}


export interface Position {
    lat:number;
    lng:number;
}




export interface EventModel {
    _id?:string;
    title: string;
    description: string;
    location: Location;
    position:Position;
    price:string;
    imageUrl: string;
    users: string[];
    categories:string[];
    authorId: string;
    startAt: Date;  // Unix timestamp (milliseconds since epoch)
    endAt: Date;    // Unix timestamp (milliseconds since epoch)
    date: Date;     // Unix timestamp (milliseconds since epoch)
    followers?:string[];
}

export interface EventQueryParams {
    title?: string;                  // Tìm kiếm theo tiêu đề sự kiện
    categories?: string;               // Lọc theo danh mục sự kiện
    users?: string;                  // Lọc theo người dùng (chuỗi, ví dụ: 'user1,user2')
    filterType?: 'in' | 'all';       // Loại lọc (chỉ có 'in' hoặc 'all')
    startAt?: string;                // Ngày bắt đầu (dạng ISO string)
    endAt?: string;                  // Ngày kết thúc (dạng ISO string)
    sort?: string;                   // Sắp xếp (ví dụ: 'date,-title' để sắp xếp theo ngày tăng dần và tiêu đề giảm dần)
    fields?: string;                 // Các trường cần lấy (ví dụ: 'title,date,location')
    page?: number;                   // Số trang (mặc định là 1 nếu không có)
    limit?: number;                  // Số lượng kết quả trên mỗi trang (mặc định là 10 nếu không có)
    lat?:number;   
    lng?:number;
    distance?:number;


    
    // Các tham số với toán tử so sánh

    'date[gte]'?: string;
    'date[gt]'?: string;
    'date[lte]'?: string;
    'date[lt]'?: string;
    'startAt[gte]'?: string;         // Ngày bắt đầu lớn hơn hoặc bằng
    'startAt[gt]'?: string;          // Ngày bắt đầu lớn hơn
    'endAt[lte]'?: string;           // Ngày kết thúc nhỏ hơn hoặc bằng
    'endAt[lt]'?: string;            // Ngày kết thúc nhỏ hơn
    'price[gte]'?: number;           // Giá lớn hơn hoặc bằng
    'price[gt]'?: number;            // Giá lớn hơn
    'price[lte]'?: number;           // Giá nhỏ hơn hoặc bằng
    'price[lt]'?: number;            // Giá nhỏ hơn
}

 


