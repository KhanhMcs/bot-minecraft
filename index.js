const mineflayer = require('mineflayer');
const http = require('http');

// TẠO WEB ĐỂ KHÔNG BỊ TẮT
http.createServer((req, res) => {
    res.write("Bot dang hoat dong 24/7!");
    res.end();
}).listen(process.env.PORT || 8080);

// ĐIỀN THÔNG TIN SERVER CỦA BẠN VÀO ĐÂY
const botArgs = {
    host: 'dongsec.joinmc.world', 
    port: 19601,              
    username: 'BotAFK247',    
    version: false,           // Đã sửa thành false để tự động bắt tay nhận bản 26.2
    hideErrors: true          // Giữ lại dòng này để ẩn log rác màu đỏ tránh bị Render crash
};

let bot;

function initBot() {
    console.log("🤖 Dang ket noi...");
    bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log(`✅ Bot vao game thanh cong!`);
        // Nhảy mỗi 30 giây chống AFK
        setInterval(() => {
            if (bot && bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('end', () => {
        console.log("❌ Bot mat ket noi! Dang vao lai...");
        setTimeout(initBot, 15000);
    });

    bot.on('error', (err) => {
        console.log("⚠️ Loi: ", err.message);
    });
}

initBot();
