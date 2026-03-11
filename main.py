from pyrogram import Client, filters
from pytgcalls import PyTgCalls
from pytgcalls.types import AudioPiped
import os

# --- [ تنظیمات یوزربات موزیکال ] ---
# آیدی و هش خودت رو از my.telegram.org بگیر
API_ID = 26576023  
API_HASH = "your_hash_here" 

app = Client("music_session", api_id=API_ID, api_hash=API_HASH)
call_py = PyTgCalls(app)

@app.on_message(filters.command("play", prefixes=".") & filters.me)
async def play_music(_, message):
    if not message.reply_to_message or not message.reply_to_message.audio:
        return await message.edit("❌ رئیس! روی یک آهنگ ریپلای کن و بنویس .play")
    
    await message.edit("⏳ در حال دانلود و پخش...")
    path = await message.reply_to_message.download()
    
    await call_py.join_group_call(message.chat.id, AudioPiped(path))
    await message.edit(f"🎶 آهنگ پخش شد! 🔥", parse_mode="html")

@call_py.on_closed_voice_chat()
async def stop_call(_, chat_id):
    await call_py.leave_group_call(chat_id)

print("✅ یوزربات آنلاین شد!")
app.run()
