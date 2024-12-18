<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Sử Dụng Vị Trí Của Bạn</title>
    <style>
        #locationField {
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>
<script>
document.getElementById("getLocationBtn").onclick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Trình duyệt của bạn không hỗ trợ Geolocation.");
    }
};

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Gửi tọa độ này đến API LocationIQ để lấy địa chỉ chi tiết
    var geocodeUrl = `https://us1.locationiq.com/v1/reverse.php?key=pk.3fb060d4ddb82ae8da4feae7223e2dc7&lat=${latitude}&lon=${longitude}&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.address) {
                // Hiển thị thông tin chi tiết địa chỉ
                var address = data.address;
                var fullAddress = `
                    Địa chỉ chi tiết của bạn: 
                    ${address.house_number || ""} ${address.road || ""}, 
                    ${address.suburb || address.village || ""}, 
                    ${address.city || address.town || address.state_district || ""}, 
                    ${address.state || ""},
                `;
                document.getElementById("address").innerText = fullAddress;
            } else {
                document.getElementById("address").innerText = "Không tìm thấy địa chỉ.";
            }
        })
        .catch(error => {
            document.getElementById("address").innerText = "Không thể lấy địa chỉ.";
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("address").innerText = "Bạn đã từ chối việc chia sẻ vị trí.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("address").innerText = "Không thể xác định vị trí của bạn.";
            break;
        case error.TIMEOUT:
            document.getElementById("address").innerText = "Yêu cầu vị trí đã hết thời gian.";
            break;
        default:
            document.getElementById("address").innerText = "Đã xảy ra lỗi.";
            break;
    }
}
</script>
</body>
</html>
