const dateFormatter = (date) => {
    try {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        };

        const formattedDate = formatDate(date);
        console.log(formattedDate);
        return formattedDate;

    } catch (error) {
        console.log(error);
    }
}
export default dateFormatter