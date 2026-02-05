// telegramSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendTelegramMessage = createAsyncThunk(
  'telegram/sendMessage',
  async ({ message }) => {
    const BOT_TOKEN = '8263513859:AAFxVL9Pwd48-RaLtdKoyOuO9oaOU4Nyu-Q';
    const CHAT_ID = '1243515685';
    
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Ошибка отправки');
    }
    
    return await response.json();
  }
);

const telegramSlice = createSlice({
  name: 'telegram',
  initialState: {
    loading: false,
    error: null,
    success: false,
    lastSent: null
  },
  reducers: {
    clearTelegramState: (state) => {
      state.error = null;
      state.success = false;
      state.lastSent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTelegramMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendTelegramMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastSent = {
          message: action.meta.arg.message,
          timestamp: new Date().toISOString(),
          messageId: action.payload.result.message_id
        };
      })
      .addCase(sendTelegramMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  }
});

export const { clearTelegramState } = telegramSlice.actions;
export default telegramSlice.reducer;