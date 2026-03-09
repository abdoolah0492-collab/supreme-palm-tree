const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const fs = require('fs');

const apiId = 34829555;
const apiHash = '3978f4f44c147078c405a24c6de34a19';
const phoneNumber = '+93730598320';
const OWNER_ID = 6576023946;

const SESSION_FILE = './session.txt';

async function runBot() {
    console.log('🎵 ربات موزیکال سونیک پرو راه‌اندازی شد...');
    
    let sessionString = '';
    if (fs.existsSync(SESSION_FILE)) {
        sessionString = fs.readFileSync(SESSION_FILE, 'utf8').trim();
    }
    
    const stringSession = new StringSession(sessionString);
    
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    console.log('📱 شماره:', phoneNumber);
    console.log('🔄 در حال اتصال...');

    await client.start({
        phoneNumber: async () => phoneNumber,
        password: async () => '',
        phoneCode: async () => '',
        onError: (err) => console.log(err),
    });

    fs.writeFileSync(SESSION_FILE, client.session.save());
    console.log('✅ ربات با موفقیت متصل شد!');
    
    client.addEventHandler(async (event) => {
        const msg = event.message;
        if (!msg || !msg.message) return;
        
        console.log(`📨 پیام: ${msg.message}`);
    }, new NewMessage({}));
}

runBot().catch(console.error);
