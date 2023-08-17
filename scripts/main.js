
        let myChart;

        function calculate() {
            const usersPerDay = parseFloat(document.getElementById("usersPerDay").value);
            const customSeconds = parseFloat(document.getElementById("customSeconds").value || 0);

            const usersPerHour = usersPerDay / 24;
            const vusIncreasePerSecond = usersPerHour / 3600;

            const ctx = document.getElementById('rampUpChart').getContext('2d');

            if (myChart) {
                myChart.destroy();
            }

            const rampUpTime = 3600;
            const peakTime = 15 * 60;
            const stepDownTime = 3600;

            const timeLabels = Array.from({ length: rampUpTime + peakTime + stepDownTime }, (_, i) => i + 1);
            const rampUpData = timeLabels.slice(0, rampUpTime).map(second => vusIncreasePerSecond * second);
            const peakData = Array(peakTime).fill(vusIncreasePerSecond * rampUpTime);
            const stepDownData = timeLabels.slice(0, stepDownTime).map(second => vusIncreasePerSecond * (stepDownTime - second));

            const data = [...rampUpData, ...peakData, ...stepDownData];

            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timeLabels,
                    datasets: [{
                        label: 'VUs over time',
                        data: data,
                        borderColor: '#4c51bf',
                        backgroundColor: 'rgba(76, 81, 191, 0.2)',
                        borderWidth: 0.5
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Time (seconds)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Virtual Users (VUs)'
                            }
                        }
                    }
                }
            });

            document.getElementById("formula1").textContent = `Step-up VUs every 1 second: ${Math.round(vusIncreasePerSecond)} VUs`;
            document.getElementById("formula2").textContent = `Step-up VUs every 10 seconds: ${Math.round(vusIncreasePerSecond * 10)} VUs`;
            document.getElementById("formula3").textContent = `Step-up VUs every 30 seconds: ${Math.round(vusIncreasePerSecond * 30)} VUs`;
            document.getElementById("formula4").textContent = `Step-up VUs every 60 seconds: ${Math.round(vusIncreasePerSecond * 60)} VUs`;
            document.getElementById("formulaCustom").textContent = `Step-up VUs every ${customSeconds} seconds: ${Math.round(vusIncreasePerSecond * customSeconds)} VUs`;

            document.getElementById('graphExplanation').style.display = 'block';
            document.getElementById('formulaSection').style.display = 'block';
        }

        function downloadContent() {
            const canvas = document.getElementById('rampUpChart');
            const imgData = canvas.toDataURL('image/png');

            const docDefinition = {
                content: [{
                    image: imgData,
                    width: 500
                }, {
                    text: 'Formulas:',
                    fontSize: 12,
                    bold: true,
                    margin: [0, 20, 0, 10]
                }, {
                    text: document.getElementById("formula1").textContent,
                    fontSize: 12,
                    margin: [0, 5]
                }, {
                    text: document.getElementById("formula2").textContent,
                    fontSize: 12,
                    margin: [0, 5]
                }, {
                    text: document.getElementById("formula3").textContent,
                    fontSize: 12,
                    margin: [0, 5]
                }, {
                    text: document.getElementById("formula4").textContent,
                    fontSize: 12,
                    margin: [0, 5]
                }, {
                    text: document.getElementById("formulaCustom").textContent,
                    fontSize: 12,
                    margin: [0, 5]
                }, {
                    text: '\nGraph Explanation:',
                    fontSize: 12,
                    bold: true,
                    margin: [0, 20, 0, 10]
                }, {
                    text: 'The graph represents the ramp-up of virtual users (VUs) over time. The VUs increase steadily during the ramp-up time, remain constant during the peak time, and then decrease during the step-down time. This visualization helps in understanding the distribution of users during a load test.',
                    fontSize: 12,
                    margin: [0, 5]
                }]
            };

            pdfMake.createPdf(docDefinition).download('performance-load-model.pdf');
        }
    

        let aggregateChart;

        function generateReport() {
            const csvInput = document.getElementById("csvInput");
            const file = csvInput.files[0];

            if (!file) {
                alert('Please select a JMeter Aggregate report CSV file first.');
                return;
            }

            const reader = new FileReader();

            reader.onload = function(event) {
                const csv = event.target.result;
                const lines = csv.split("\n");
                const labels = [];
                const data = [];

                for (let i = 1; i < lines.length; i++) {
                    const tokens = lines[i].split(",");
                    if (tokens[0] && tokens[1]) {
                        labels.push(tokens[0]);
                        data.push(parseFloat(tokens[1]));
                    }
                }

                const ctx = document.getElementById('aggregateReportChart').getContext('2d');
                
                if (aggregateChart) {
                    aggregateChart.destroy();
                }

                aggregateChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Avg Response Time (ms)',
                            data: data,
                            backgroundColor: 'rgba(76, 81, 191, 0.2)',
                            borderColor: '#4c51bf',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Endpoint/Label'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Average Response Time (ms)'
                                }
                            }
                        }
                    }
                });
            };
            
            reader.readAsText(file);
        }
    

    
    function generateDegradationTable() {
    const avgExisting = parseFloat(document.getElementById('avgExistingApp').value);
    const avgNewFeature = parseFloat(document.getElementById('avgNewFeature').value);

    // Check if the values are valid numbers
    if (isNaN(avgExisting) || isNaN(avgNewFeature)) {
        alert('Please provide valid average response times.');
        return;
    }

    const degradation = ((avgNewFeature - avgExisting) / avgExisting) * 100;

    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear the table body

    // Add the existing app data
    const row1 = tbody.insertRow();
    row1.insertCell().innerText = "Existing Application";
    row1.insertCell().innerText = avgExisting;
    row1.insertCell().innerText = ''; // No degradation for the existing app

    // Add the new feature data
    const row2 = tbody.insertRow();
    row2.insertCell().innerText = "Existing Application with New Feature";
    row2.insertCell().innerText = avgNewFeature;
    let degradationCell = row2.insertCell();
    degradationCell.innerText = degradation.toFixed(2) + '%';

    // Style the cells
    Array.from(tbody.getElementsByTagName('td')).forEach(cell => {
        cell.style.border = '1px solid black';
    });

    // Check the performance and display the message accordingly
    const messageElem = document.getElementById('performanceMessage');
    if (degradation < 0) {
        messageElem.style.color = 'green';
        messageElem.innerText = `Performance improved by ${Math.abs(degradation.toFixed(2))}%.`;
    } else {
        degradationCell.style.color = 'red';
        messageElem.style.color = 'red';
        messageElem.innerText = 'Performance needs to be improved for the new feature.';
    }

    // Display the results table
    document.getElementById('resultsTable').style.display = '';
}




function openModal() {
    document.getElementById('predictionModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('predictionModal').style.display = 'none';
}
