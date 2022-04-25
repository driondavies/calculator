class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this. currentOperandTextElement= currentOperandTextElement;
        this.clear();
    }
    clear()
    {
        console.log("clear");
       this.currentOperand = '';
       this.previousOperand = '';
       this.operation = undefined;
    } 

    delete()
    {
       this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    getDisplayNumber(number)
    { 
        const stringnumber = number.toString();
        const intergerDigits   = parseFloat(stringnumber.split('.')[0]);
        const decimalDigits = stringnumber.split('.')[1];
        let integervalue;
        if(isNaN(intergerDigits))
          integervalue='';
        else
          integervalue = intergerDigits.toLocaleString('en',{maximumFractionDigits:0});
        if(decimalDigits!=null)
          return `${integervalue}.${decimalDigits}`;
        else
         return `${integervalue}`;
    }

    appendNumber(number)
    {
        if(number === '.' && this.currentOperand.includes('.') )
        return;
      
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation)
    {
        this.operation = operation;
        if(this.currentOperand == "") return;
        if(this.previousOperand!= "")
          this.compute();

         this.previousOperand = this.currentOperand;
         this.currentOperand ="";

    }

    compute()
    {
        let computevalue;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if( isNaN(this.currentOperand) || isNaN(this.previousOperand)) return;
        switch (this.operation){
            case '+':
                computevalue = prev+current;
                break;
            case '-':
                computevalue = prev-current;
                break;
            case '*':
                computevalue = prev*current;
                break;
            case '÷':
                computevalue = prev/current;
                break;
            default:
                return;
        }
        this.currentOperand = computevalue;
        this.previousOperand ="";
        this.operation = undefined;

    }
    
    updateDisplay(){
        console.log("update-display");
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null)
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        else
            this.previousOperandTextElement.innerText = "";
    }
}





const numberButtons= document.querySelectorAll('[data-number]');
const operationButtons= document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement= document.querySelector('[data-current-operand]');
const calculator = new  Calculator(previousOperandTextElement,currentOperandTextElement);
console.log("calculator");


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
       calculator.appendNumber(button.innerText);
       calculator.updateDisplay();
    })
}) 


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
}) 

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })


clearButton.addEventListener('click',button =>{
    calculator.clear();
    calculator.updateDisplay();
    })

deleteButton.addEventListener('click',button =>{
    calculator.delete();
    calculator.updateDisplay();
    })




