// CẤU HÌNH FIREBASE CỦA BẠN
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app-default-rtdb.firebaseio.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};

// Khởi tạo
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Sidebar Toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Load danh sách Acc từ Firebase
function loadAccs() {
    const accList = document.getElementById('acc-list');
    db.ref('accounts').on('value', (snapshot) => {
        const data = snapshot.val();
        accList.innerHTML = "";
        for (let key in data) {
            const acc = data[key];
            accList.innerHTML += `
                <div class="card">
                    <img src="${acc.img}">
                    <div class="card-info">
                        <b>#${acc.id}</b>
                        <p style="color:#39ff14">${Number(acc.price).toLocaleString()}đ</p>
                        <button class="btn-buy" onclick="buyAcc('${key}')">MUA</button>
                    </div>
                </div>
            `;
        }
    });
}

function spin() {
    const wheel = document.getElementById('wheel');
    const randomDeg = Math.floor(Math.random() * 3600) + 3600;
    wheel.style.transform = `rotate(${randomDeg}deg)`;
    setTimeout(() => alert("Chúc mừng bạn nhận được Kim Cương!"), 5000);
}

window.onload = loadAccs;