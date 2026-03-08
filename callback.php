<?php
// --- CẤU HÌNH THÔNG TIN CỦA BẠN ---
$partner_key = 'MÃ_PARTNER_KEY_CỦA_BẠN'; // Lấy trong mục API của Gile

// 1. Lấy dữ liệu Gile gửi về (Dùng $_GET hoặc $_REQUEST)
$status = $_GET['status'];       // 1: Thành công, 2: Thẻ sai, 3: Sai mệnh giá
$message = $_GET['message'];     // Thông báo từ hệ thống
$value = $_GET['value'];         // Mệnh giá thẻ thực tế
$request_id = $_GET['request_id']; // Đây là UID người dùng bạn gửi đi lúc nạp
$serial = $_GET['serial'];       // Số seri thẻ
$pin = $_GET['pin'];             // Mã thẻ
$callback_sign = $_GET['callback_sign']; // Chữ ký bảo mật Gile gửi sang

// 2. KIỂM TRA CHỮ KÝ (QUAN TRỌNG NHẤT)
// Công thức Gile V2 thường là: md5(partner_key + pin + serial)
$my_sign = md5($partner_key . $pin . $serial);

if ($callback_sign == $my_sign) {
    // CHỮ KÝ HỢP LỆ - TIẾN HÀNH XỬ LÝ
    if ($status == 1) {
        // --- CỘNG TIỀN VÀO FIREBASE TẠI ĐÂY ---
        // Ghi log để kiểm tra trước khi viết code Firebase phức tạp
        $log_content = "THÀNH CÔNG: User $request_id nạp $value VND. Thẻ: $pin \n";
        file_put_contents("napthengon.txt", $log_content, FILE_APPEND);
        
        // Trả về OK để Gile không gửi lại thông báo này nữa
        echo "OK"; 
    } else {
        // Thẻ lỗi hoặc sai mệnh giá
        file_put_contents("naptheloi.txt", "LỖI: User $request_id - $message \n", FILE_APPEND);
        echo "FAIL";
    }
} else {
    // CẢNH BÁO: Có kẻ đang giả mạo link callback để hack tiền!
    file_put_contents("canhbao_hack.txt", "Cảnh báo: Sai chữ ký từ IP: " . $_SERVER['REMOTE_ADDR'] . "\n", FILE_APPEND);
    echo "WRONG_SIGN";
}
?>