const com = require("commander");
const inquirer = require("inquirer");

com
.version('0.0.1')
.command('init')
.action( options => {
    const questions = [
        { type: 'input', name: 'firstName', message: 'Enter your first name'},
        { type: 'input', name: 'annualSalary', message: 'Enter your Annual Salary'}
    ];

    inquirer
    .prompt(questions)
    .then(answers => {
        const { firstName, annualSalary } = answers;
        const salaryNum = parseInt(annualSalary);

        console.log(`First: ${firstName} - Salary: $${salaryNum}`);
        process.exit();
    }).catch( err => {
        console.log(err);
        process.exit();
    });
});

com.parse(process.argv);