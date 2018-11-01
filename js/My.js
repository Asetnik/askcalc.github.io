var numbers = document.querySelectorAll(".number"),
    operations = document.querySelectorAll(".operation"),
    decimalBtn = document.getElementById("decimal"),
    ce = document.getElementById("CE"),
//    resultBtn = document.getElementById("result"),
    display = document.getElementById("display"),
    memoryCurrentNumber = 0,
    memoryNewNumber=false,
    memoryPendingOperation = '';

document.onkeydown = function(event){
    if(event.key>=0 && event.key<=9){
        numberPress(event.key);
    }
    if(event.keyCode==8 || event.keyCode==46){
        clear();
    }
    if(event.keyCode==110){
        decimal();
    }
    if(event.key=='+' || event.key=='-' || event.key=='*' || event.key=='/' || event.key=='C'){
        operation(event.key);
    }
    if(event.key=="Enter" || event.key=='='){
        operation();
    }
}



for (var i=0; i<numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function(e){
        numberPress(e.target.textContent);
    });
};

for (var i=0; i<operations.length; i++){
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e){
        operation(e.target.textContent);
    });
};

decimalBtn.addEventListener('click', decimal);

ce.addEventListener('click', clear);

//resultBtn.addEventListener('click', result);





function numberPress(number){
    if(memoryNewNumber){
        display.value=number;
        memoryNewNumber=false;
        console.log('flag=true + print number + flag = false');
    } else{
        if(display.value==='0'){
            display.value=number;
            console.log('flag = false + print =number');
        } else {
            if(display.value.length<12){
                display.value += number;
                console.log('flag = false + print +=number');
            }     
        };
    };
    
    console.log('clic number '+number+'');
};

function operation(op){
    var localOperationMemory = display.value;
    if (op==='C'){
        display.value=0;
    }
    else if(op==='x 2'){
        localOperationMemory*=parseFloat(localOperationMemory);
        if(localOperationMemory.length>=12){
            display.value="Perepolnenie";
        }
        display.value=localOperationMemory;
    }
    else if(op==='√'){
        localOperationMemory=Math.sqrt(parseFloat(localOperationMemory));
        localOperationMemory=localOperationMemory.toFixed(4);
        display.value=localOperationMemory;
        }
    else if(memoryNewNumber && memoryPendingOperation!=='='){
        display.value=memoryCurrentNumber;
    } 
    else{
        console.log('zashli v operacii');
        console.log('op='+ memoryPendingOperation +'');
        memoryNewNumber = true;
        switch(memoryPendingOperation){
            case '+':
                memoryCurrentNumber=(memoryCurrentNumber*10+localOperationMemory*10)/10;
                break;
            case '-':
                memoryCurrentNumber=(memoryCurrentNumber*10-localOperationMemory*10)/10;
                break;
            case '*':
                memoryCurrentNumber=(memoryCurrentNumber*10*localOperationMemory*10)/100;
                break;
            case '/':
                memoryCurrentNumber=(memoryCurrentNumber*10/localOperationMemory*10)/100;
                break;
            default:
                memoryCurrentNumber=parseFloat(localOperationMemory);
        };
        display.value=memoryCurrentNumber;
        memoryPendingOperation = op;
        console.log('visli iz operacii');
    };
    console.log('clic operation '+ op +'');
};

function decimal(){
    var localDecimalMemory = display.value;
    if(memoryNewNumber){
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    }else{
        if(localDecimalMemory.indexOf('.') === -1)
            {
                localDecimalMemory += '.';
            }
    };
    display.value = localDecimalMemory;
    console.log('clic decimal');
};

function clear(){
    console.log('clic clear');
    display.value=display.value.slice(0,-1);
    if(display.value.length===0)
        {
            display.value=0;
        }
};

/*
function result(argument){
    console.log('clic result');
};*/







