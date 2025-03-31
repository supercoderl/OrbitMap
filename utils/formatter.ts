export const formatDate = (date: Date, format: string = "dd/mm/yyyy"): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0"); // Date (01 - 31)
    const monthNumber = date.getMonth() + 1; // Month (1 - 12)
    const monthText = `${monthNumber}`; // Just get month number
    const year = date.getFullYear(); // Year (yyyy)

    return format
        .replace("dd", day)
        .replace("mm", monthText)
        .replace("MM", `tháng ${monthText}`) // Add type "tháng 2"
        .replace("yyyy", String(year));
};

export const getZodiacSign = (date: Date): string => {
    if (isNaN(date.getTime())) return "Invalid Date";

    const day = date.getDate();
    const month = date.getMonth() + 1; // Because `getMonth()` return from 0-11

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Bạch Dương";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Kim Ngưu";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Song Tử";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cự Giải";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Sư Tử";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Xử Nữ";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Thiên Bình";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Bọ Cạp";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Nhân Mã";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Ma Kết";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Bảo Bình";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Song Ngư";

    return "unknown";
};