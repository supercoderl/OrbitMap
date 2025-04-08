import { DaiLyItinerary } from "@/types";

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

export const formatTime = (date: Date, format: string = "HH:mm"): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return "Invalid Time";
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return format
        .replace("HH", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);
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

export function formatDailyItineraries(dailyItineraries: DaiLyItinerary[]) {
    if (!Array.isArray(dailyItineraries)) return [];

    return dailyItineraries.map((dayItem, index) => {
        const isLastDay = index === dailyItineraries.length - 1;
        const isFirstDay = index === 0;
        const isMiddleDay = index > 0 && index < dailyItineraries.length - 1;

        // Clone scheduledPlaces to void change the original data
        const scheduledPlaces = [...dayItem.scheduledPlaces];

        if (isLastDay) {
            const lastEndTimeString = scheduledPlaces[scheduledPlaces.length - 1].endTime;
            const [hours, minutes, seconds] = lastEndTimeString.split(':').map(Number);
            const lastEndTime = new Date();
            lastEndTime.setHours(hours, minutes, seconds);
            lastEndTime.setHours(lastEndTime.getHours() + 1);
            const newEndTimeString = lastEndTime.toTimeString().slice(0, 8);

            scheduledPlaces.push({
                place: {
                    name: "Đi về",
                    address: "",
                    imageUrl: "https://res.cloudinary.com/do02vtlo0/image/upload/v1743922670/places/xpbzxa2iwkdxrieqbvkw.webp",
                },
                startTime: newEndTimeString,
                endTime: newEndTimeString,
                formattedTimeSlot: "",
            });
        }
        else if (isMiddleDay) {
            const lastEndTimeString = scheduledPlaces[scheduledPlaces.length - 1].endTime;
            const [hours, minutes, seconds] = lastEndTimeString.split(':').map(Number);
            const lastEndTime = new Date();
            lastEndTime.setHours(hours, minutes, seconds);
            lastEndTime.setHours(lastEndTime.getHours() + 1);
            const newEndTimeString = lastEndTime.toTimeString().slice(0, 8);

            scheduledPlaces.push({
                place: {
                    name: "Nghỉ ngơi",
                    address: "Nghỉ ngơi tại khách sạn",
                    imageUrl: "https://res.cloudinary.com/do02vtlo0/image/upload/v1743922671/places/ojdzjbuzwelyvoojbxsu.jpg",
                },
                startTime: newEndTimeString,
                endTime: newEndTimeString,
                formattedTimeSlot: "",
            });
        }
        else if (isFirstDay && dailyItineraries.length === 1) {
            const lastEndTimeString = scheduledPlaces[scheduledPlaces.length - 1].endTime;
            const [hours, minutes, seconds] = lastEndTimeString.split(':').map(Number);
            const lastEndTime = new Date();
            lastEndTime.setHours(hours, minutes, seconds);
            lastEndTime.setHours(lastEndTime.getHours() + 1);
            const newEndTimeString = lastEndTime.toTimeString().slice(0, 8);

            scheduledPlaces.push({
                place: {
                    name: "Đi về",
                    address: "",
                    imageUrl: "https://res.cloudinary.com/do02vtlo0/image/upload/v1743922670/places/xpbzxa2iwkdxrieqbvkw.webp",
                },
                startTime: newEndTimeString,
                endTime: newEndTimeString,
                formattedTimeSlot: "",
            });
        }

        return {
            ...dayItem,
            scheduledPlaces,
        };
    });
}