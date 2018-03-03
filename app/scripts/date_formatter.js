class DateFormatter {
    static formatDate(date_string) {
        //date_string = date_string.substring(1, date_string.indexOf('Z'));
        date_string = date_string.substring(0, date_string.indexOf('T'));
        let date_arr = date_string.split('-');
        return date_arr[1] + "/" + date_arr[2] + "/" + date_arr[0];
    }

    static formatDateForSorting(date_string) {
        return date_string.substring(0, date_string.indexOf('T'));
    }
}

export default DateFormatter;