# Conversions

This application provides a versatile utility for converting between temperature and volume units. It allows seamless transformation across various units, ensuring accuracy and precision in conversions. It aims to assist science teachers in grading unit-conversion problems submitted by students on paper worksheets.

It provides a system to input questions and student responses for grading. The application supports conversions between temperatures (Kelvin, Celsius, Fahrenheit, Rankine) and volumes (Cubic Feet, Cubic Inches, Cups, Gallons, Liters, Tablespoons).

## Demo

You can experience a live demonstration of this application at the following URL: https://conversions-alpha.vercel.app/

## How the Application Addresses User Needs

- **Teacher's Input Flexibility**: The application allows teachers to input diverse conversion scenarios, accommodating different numerical values and units of measure.

- **Response Evaluation**: The system accurately evaluates student responses against authoritative answers, providing instant feedback on correctness or validity.

- **User-Friendly Interface**: While the requirements do not specify UI details, the system ensures ease of use for teachers to efficiently enter data and obtain grading results.

## Features

### Temperature Conversions

The temperature conversion feature provides methods to convert between Celsius, Fahrenheit, Kelvin, and Rankine units.

#### Example Usage:

```javascript
import { Temperature } from '@/app/lib/models';

const temperature = new Temperature({ name: 'Celsius' });
const targetTemperature = { name: 'Fahrenheit' };
const convertedValue = temperature.convertTo(targetTemperature, 1);

console.log(convertedValue) // 33.8
```

### Volume Conversions

The volume conversion functionality supports transformations between Cubic Feet, Cubic Inches, Cups, Gallons, Liters, and Tablespoons.

#### Example Usage:

```javascript
import { Volume } from '@/app/lib/models';

const volume = new Volume({ name: 'Cups' });
const targetVolume = { name: 'Liters' };
const convertedValue = volume.convertTo(targetVolume, 1);

console.log(convertedValue) // 0.24
```

## Getting Started

### Installation

To set up the project, clone the repository and install dependencies:

```bash
git clone https://github.com/rabyyuson/conversions.git
cd conversions
npm install
# or
yarn install
```

After installing the dependencies, the application can be served locally using Next.js and will be accessible at http://localhost:3000/. You can start the application by running:

```bash
npm run dev
# or
yarn dev
```

This command will launch the development server and make the application available for access locally in your browser.

### Backend API Endpoint

After installation, the backend server exposes an API endpoint (http://localhost:3000/api/unit-conversion) where clients can make requests. Use tools like cURL or libraries like Axios in your code to interact with the endpoint:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "inputNumericalValue": 3,
  "inputUnitOfMeasure": "Celsius",
  "targetUnitOfMeasure": "Fahrenheit",
  "studentResponse": 37.4
}' http://localhost:3000/api/unit-conversion
```

## Tests

The project includes a comprehensive suite of tests to ensure code quality and accuracy in temperature and volume conversions. The tests include linting checks and Jest testing.

To run the comprehensive test suite, use the following command:

```bash
npm run test
# or
yarn test
```

Additionally, there's an automated CI/CD (Continuous Integration/Continuous Deployment) process set up for this project. The CI configuration file (**./github/workflows/main.yml**) performs linting and Jest tests on each push event to the **main** branch. The workflow ensures the codebase's integrity by automatically running tests in a continuous integration environment.

## Continuous Integration

The CI workflow is triggered on every push to the **main** branch and includes the following steps:

```yaml
name: Continuous Integration

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

This workflow uses GitHub Actions to automate the testing process, ensuring that linting and Jest tests are executed whenever changes are pushed to the **main** branch.

### Future Updates

The project aims to incorporate several enhancements and new features in the future, including:
  
- **Batch Processing**: Enabling batch processing functionalities, allowing the import of JSON/CSV files or handling multiple test inputs at once.

- **User Authentication**: Introduce secure login functionality to manage teacher access and maintain data integrity.

- **Extended Unit Conversions**: Expanding conversion capabilities beyond temperature and volume units, such as length, mass, or time, catering to a wider range of scientific disciplines and educational needs.

- **Localized Unit Conversion**: Implementing support for different regions' unit conversion requirements, such as AUS, CAN & NZ, UK, US, etc.

- **Dark/Light Mode**: Introducing visual themes like dark and light mode to enhance user experience and accessibility.
