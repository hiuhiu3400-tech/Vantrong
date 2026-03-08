<?php
$partner_id = '123456'; // Thay bằng Partner ID của bạn
$partner_key = 'a1b2c3d4e5...'; // Thay bằng Partner Key của bạn

$telco = $_POST['telco']; // Loại thẻ: VIETTEL, VINA...
$code = $_POST['code'];   // Mã thẻ (Pin)
$serial = $_POST['serial']; // Số Seri
$amount = $_POST['amount']; // Mệnh giá
$request_id = $_POST['uid']; // UID người dùng trong Firebase để biết ai nạp

// BƯỚC QUAN TRỌNG: Tạo chữ ký bảo mật (Sign)
// Công thức thường là: md5(partner_key + code + serial)
$sign = md5($partner_key . $code . $serial);

$data = array(
    'telco' => $telco,
    'code' => $code,
    'serial' => $serial,
    'amount' => $amount,
    'request_id' => $request_id,
    'partner_id' => $partner_id,
    'sign' => $sign,
    'command' => 'charging'
);

// Gửi dữ liệu đi bằng CURL
$ch = curl_init('https://thesieutoc.net/chargingws/v2'); // Link API của bên nạp thẻ
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
$response = curl_exec($ch);
curl_close($ch);

echo $response; // Trả về kết quả cho máy khách
?>