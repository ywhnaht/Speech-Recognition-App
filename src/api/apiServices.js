import axios from 'axios';

const RASPBERRY_PI_URL = 'http://192.168.147.135:5000'; // Địa chỉ Raspberry Pi của bạn

// Gửi tín hiệu bắt đầu ghi âm đến Raspberry Pi
export const sendRecordSignal = async (action) => {
    try {
        // Action có thể là "start-recording" hoặc "stop-recording"
        const url = `${RASPBERRY_PI_URL}/${action}`;
        
        // Sử dụng GET thay vì POST cho các endpoint bắt đầu và dừng ghi âm
        const response = await axios.get(url);
        
        console.log('Raspberry Pi response:', response.data);
        return response.data; // Trả về kết quả từ Raspberry Pi (nếu cần)
    } catch (error) {
        console.error('Error sending record signal:', error);
        throw error; // Ném lỗi để xử lý tại nơi gọi hàm
    }
};

// Gửi file âm thanh lên server và nhận lại kết quả
export const uploadAudioFile = async (filename) => {
    try {
        const url = `${RASPBERRY_PI_URL}/send-audio/${filename}`;
        const response = await axios.get(url); // Không cần `responseType: 'blob'` nếu trả về JSON
        
        // Kiểm tra dữ liệu trả về
        if (response.data && response.data.text && response.data.result) {
            console.log('Transcription and translation received:', response.data);
            return {
                englishText: response.data.text,   // Văn bản tiếng Anh
                vietnameseText: response.data.result // Kết quả dịch tiếng Việt
            };
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
};

// import axios from 'axios';

// const RASPBERRY_PI_URL = 'http://192.168.147.135:5000'; // Địa chỉ Raspberry Pi của bạn

// // Hàm chung để gửi request với retry logic
// const axiosRetry = async (config, retries = 3, delay = 1000) => {
//     try {
//         const response = await axios(config);
//         return response.data; // Trả về dữ liệu nếu thành công
//     } catch (error) {
//         if (retries > 0 && !error.response) {
//             console.warn(`Retrying... Attempts left: ${retries}`);
//             await new Promise((resolve) => setTimeout(resolve, delay));
//             return axiosRetry(config, retries - 1, delay * 2); // Tăng delay sau mỗi lần retry
//         }
//         throw error; // Ném lỗi nếu hết lượt retry
//     }
// };

// // Gửi tín hiệu bắt đầu/dừng ghi âm đến Raspberry Pi
// export const sendRecordSignal = async (action) => {
//     try {
//         const config = {
//             method: 'get', // Thay đổi sang GET vì API server dùng GET
//             url: `${RASPBERRY_PI_URL}/${action}`,
//             timeout: 10000, // Timeout 10 giây
//             validateStatus: (status) => status >= 200 && status < 500, // Chỉ chấp nhận các mã từ 200-499
//         };
//         const data = await axiosRetry(config); // Gửi request với retry logic
//         console.log('Raspberry Pi response:', data);
//         return data; // Trả về kết quả
//     } catch (error) {
//         console.error('Error sending record signal:', error);
//         throw error;
//     }
// };

// // Gửi file âm thanh lên server
// export const uploadAudioFile = async (filename) => {
//     try {
//         const config = {
//             method: 'post',
//             url: `${RASPBERRY_PI_URL}/send-audio/${filename}`,
//             timeout: 10000, // Timeout 10 giây
//             validateStatus: (status) => status >= 200 && status < 500, // Chỉ chấp nhận các mã từ 200-499
//         };
//         const data = await axiosRetry(config); // Gửi request với retry logic
//         console.log('Audio file upload response:', data);
//         return data; // Trả về kết quả
//     } catch (error) {
//         console.error('Error uploading audio file:', error);
//         throw error;
//     }
// };



