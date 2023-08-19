
function generatePredictions() {
    const fileInput = document.getElementById("historicalDataInput");
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please upload a CSV file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target.result.trim();
        const rows = csvData.split("\n");
        const header = rows[0].split(",").map(col => col.trim().toLowerCase());
        const dateIndex = header.indexOf("date");
        const usersIndex = header.indexOf("users");

        if (dateIndex === -1 || usersIndex === -1) {
            alert("The CSV should have columns named 'date' and 'users'.");
            return;
        }

        const dates = [];
        const userCounts = [];

        for(let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(",").map(col => col.trim());
            dates.push(columns[dateIndex]);
            userCounts.push(parseInt(columns[usersIndex], 10));
        }

        // Mock linear regression model for prediction
        const daysToPredict = 90;
        for (let i = 1; i <= daysToPredict; i++) {
            const lastDate = new Date(dates[dates.length - 1]);
            lastDate.setDate(lastDate.getDate() + 1);
            const newUsers = userCounts[userCounts.length - 1] + 5; // Mock increment
            dates.push(lastDate.toISOString().split('T')[0]);
            userCounts.push(newUsers);
        }

        // Use Plotly to visualize the data
        const trace = {
            x: dates,
            y: userCounts,
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Users Count'
        };

        const layout = {
            title: 'Predicted User Growth',
            xaxis: {
                title: 'Date'
            },
            yaxis: {
                title: 'Number of Users'
            }
        };

        Plotly.newPlot('predictionChart', [trace], layout);
    };

    reader.readAsText(file);
}
