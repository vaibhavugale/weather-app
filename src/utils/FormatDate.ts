export const dateFormatter = (timestamp:number) =>{
let date: Date = new Date(timestamp * 1000);

let hours: number = date.getHours();
let minutes: number = date.getMinutes();
let seconds: number = date.getSeconds();

let ampm: string = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
hours = hours % 12; // Convert hours to 12-hour format
hours = hours ? hours : 12; // Handle midnight (0 hours)

let formattedHours: string = (hours < 10) ? "0" + hours : hours.toString();
let formattedMinutes: string = (minutes < 10) ? "0" + minutes : minutes.toString();
let formattedSeconds: string = (seconds < 10) ? "0" + seconds : seconds.toString();

let timeIn12HourFormat: string = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds + " " + ampm;


return timeIn12HourFormat;
    

}