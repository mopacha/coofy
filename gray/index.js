const date = {
    isDuringDate: function (beginDateStr, endDateStr) {
        var curDate = new Date(),
            beginDate = new Date(beginDateStr),
            endDate = new Date(endDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    }
}

const run = (start = '2020-08-31 13:00', end = '2020-08-31 24:00') => {
    if (date.isDuringDate(start, end)) {
        document.documentElement.style.filter = "grayscale(100%)";
    }
}

export default run()
