# performancetestadvisor

# Performance Load Modeling Tool

## Overview
The Performance Load Modeling Tool aids testers and developers in planning and executing performance tests. By inputting the expected daily user traffic, this tool calculates the recommended Virtual User (VU) ramp-up strategy, simulating real-world usage patterns. The tool also provides recommendations and suggested open-source tools for conducting performance tests.

![image](https://github.com/ilamvazhuthi/performancetestadvisor/assets/17743299/aa0033b4-07df-468c-b96b-d54689617088)



## Features
- **User Input**: Allows users to input the total number of expected users per day.
- **Calculation**: Computes the number of Virtual Users (VUs) to step up every 1, 10, 30, and 60 seconds.
- **Recommendations**: Provides guidelines on maintaining the peak load and monitoring application performance.
- **Suggested Tools**: Recommends open-source performance testing tools like Apache JMeter and Locust.

## How to Use
1. Input the total number of users expected per day.
2. Click on "Calculate".
3. View the ramp-up strategy in the "Formulas" section.
4. Review recommendations and suggested tools for a comprehensive performance test.

## Hosted Version
https://ilamvazhuthi.github.io/performancetestadvisor/

# Static Website Docker Container

This repository provides a Dockerized setup for a static website using Nginx.

## Prerequisites

- Ensure you have Docker installed on your machine.

## Usage

1. Navigate to the directory containing your `Dockerfile`, `index.html`, `styles.css`, and `scripts.js`.
2. Build the Docker image using the following command:
   ```bash
   docker build -t my-static-website .
   ```
3. Once built, you can run the container with:
   ```bash
   docker run -d -p 80:80 my-static-website
   ```
4. You should then be able to access the website at [http://localhost](http://localhost).

## Pushing to Docker Registry

If you want to push the Docker image to a Docker registry (like Docker Hub), ensure you tag the image appropriately and then use the `docker push` command.

## Future Improvements
- Email subscription feature for news and updates.

## Credits
Developed by [Ilamvazhuthi Mathivanan](https://www.linkedin.com/in/ilamvazhuthi-mathivanan-17588741/). Check the source code on [GitHub](https://github.com/ilamvazhuthi). Follow on [Twitter](https://twitter.com/ilamvazhuthim).

---

