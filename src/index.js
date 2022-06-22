const com = require("commander");
const inquirer = require("inquirer");
const Account = require("./Account");
const Snowball = require("./Snowball");

let accounts = [];

const mathFun = additionalAmount => {
    const snowball = new Snowball(accounts, additionalAmount);
    const repayPlan = snowball.createPaymentPlan();
    console.log(repayPlan)
}

const begin = () => {
  const questions = [
    { type: "input", name: "acctName", message: "What is the Account Name?" },
    {
      type: "input",
      name: "acctBal",
      message: "What is the current balance?",
    },
    {
      type: "input",
      name: "acctRate",
      message: "What is the current interest rate?",
    },
    {
      type: "input",
      name: "acctMinPay",
      message: "What is the minimum payment?",
    },
    {
      type: "confirm",
      name: "addAnotherAccount",
      message: "Do you want to enter another account?",
      default: true,
    },
  ];

  inquirer
    .prompt(questions)
    .then((answers) => {
      const { acctName, acctBal, acctRate, acctMinPay } = answers;
      const acct = new Account({
        name: acctName,
        balance: acctBal,
        interest: acctRate,
        minPayment: acctMinPay,
      });

      accounts.push(acct);

      if (answers.addAnotherAccount) {
        begin();
      } else {
        const lastQuestion = {
          type: "input",
          name: "additionalAmount",
          message: "Any additional amount you will pay per month?",
        };
        inquirer
          .prompt(lastQuestion)
          .then((answer) => {
            const { additionalAmount } = answer;
            mathFun(additionalAmount);
          })
          .catch((err) => {
            console.log(err);
            process.exit();
          });
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

com
  .version("0.0.1")
  .command("init")
  .action(() => {
    begin();
  });

com.parse(process.argv);
