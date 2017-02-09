
//calculator functions
$(document).ready(function(){

    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    var zero = ['0']
    var operators = ['+', '-', '/', '*',]
    var others = ['.']
    var openingBracket = ['(']
    var closingBracket = [')']

    var operatorsPriority = { //object with priority of operators, telling you which equation will go first and which after acording mathematics rules
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
    }

    //js functions here:/
    function shouldISwapZeroAtTheEnd(currentValue) {
        // possible combinations:
        // 0        swap = True, checked = true --> swap 0 with next number
        // 9000     swap = False, checked = true
        // 3+       swap = False, checked = false
        // 3+0      swap = True, checked = true --> swap 0 with next number
        // 3+2.0    swap = False, checked = true
        // 2+10     swap = False, checked = true
        // 2+3+(    swap = False, checked = true
        var swap = true
        var checked = false

        for (var i = currentValue.length-1; i >=0; i-- ) {
            if (_.contains(operators, currentValue[i])) {
                break // check backward until you will find operator
            }
            checked = true //check if the input string contains valueas from our lists
            if (_.contains(numbers, currentValue[i]) || _.contains(others, currentValue[i]) || _.contains(openingBracket, currentValue[i])) {
                swap = false
                break
            }      
        }
        if (swap && checked) {
            return true
        }
        return false
    }

    function canIAddZero(currentValue) {
        // possible combinations of currentValue:
        // 0        onlyZero = True, checked = True --> block adding another 0
        // 0.000    onlyZero = False, checked = True
        // 0.       onlyZero = False, checked = False
        // 3        onlyZero = False, checked = False
        // 10000    onlyZero = False, checked = True
        // 5+5      onlyZero = False, checked = True
        // 4-0.     onlyZero = False, checked = True
        // (empty)  onlyZero = True, checked = False
        // 5+       onlyZero = True, checked = False
        // 5+0      onlyZero = True, checked = True --> block adding another 0
        // 5+0000   onlyZero = True, checked = True --> block adding another 0
        var onlyZero = true
        var checked = false

        if (currentValue.length > 0 && closingBracket.indexOf(currentValue[currentValue.length-1]) != -1) {
            return false
        }
        //check your string backwards and
        for (var i = currentValue.length-1; i >=0; i-- ) {
            if (numbers.indexOf(currentValue[i]) != -1 || others.indexOf(currentValue[i]) != -1) {
                onlyZero = false
                break //if you will find in the string numbers or dot - onlyZero is false because there are other digits. Do nothing, dont display another zero
            }
            if (operators.indexOf(currentValue[i]) != -1) {
                break //finish checking when you find an operator
            } else {
                checked = true 
            }
        }
        if (onlyZero && checked) {
            return false//if you have checked the string searching for zeros and there are only zeros, do nothing, dont display another zero.
        }

        return true
    }

    function canIAddDot(currentValue) {
        //debugger
        // possible combination of current_value:
        // .        containsDot = True--> do nothing, dont add dot
        // 0.000    containsDot = True--> do nothing
        // 0.       containsDot = True--> do nothing
        // 3        containsDot = False--> add dot
        // 100.00   containsDot = True--> do nothing
        // 5+5.     containsDot = True--> do nothing
        // 4-0.     containsDot = True--> do nothing
        // (empty)  containsDot = False--> add dot
        // 5+       containsDot = False--> add dot
        // 5+.      containsDot = True--> do nothing
        // 5+0000   containsDot = False--> add dot
        var containsDot = false
        
        if (currentValue.length > 0 && closingBracket.indexOf(currentValue[currentValue.length-1]) != -1) {
            return false
        }
        //check the string backwards and
        for (var i = currentValue.length-1; i >=0; i-- ) {
           
            if (others.indexOf(currentValue[i]) != -1) {
                containsDot = true
                break //if there is a one dot in our string, do nothing
            }
            if (operators.indexOf(currentValue[i]) != -1) {
                break //finish checking at operator
            }
        }       
        if (containsDot) {
            return false 
        } else {
            return true
        }
    }

    function canIAddOpeningBracket(currentValue) {

        //undefined lastCharacter is only at the beginning because first pressed button will be a inputValue, there is no lastCharacter yet
        var lastCharacter = currentValue[currentValue.length-1] 
        
        // do not make undefined values, it might cause bugs in the future
        if (lastCharacter === undefined) {
            return inputValue
        }
        //openingBracket combinations:
        // 0.   addOpeningBracket = False 
        // 11+  addOpeningBracket = True    --> you can add
        // 100  addOpeningBracket = False
        // 10+( addOpeningBracket = True    --> you can add 
        // 2+4  addOpeningBracket = False
        
        //you can add an openingBracket only after operators or another openingBracket (lastCharater is operator or openingBracket)
        if (operators.indexOf(lastCharacter) != -1) {
            return true
        }
        if (openingBracket.indexOf(lastCharacter) != -1 ) {
            return true
        }
        return false

        /* unit tests
        // 0.   addOpeningBracket = False 
        console.log('0.', canIAddOpeningBracket('.'), 'should be false')
        // 100  addOpeningBracket = False
        console.log('100', canIAddOpeningBracket('0'), 'should be false')
        */
    }

    function canIAddClosingingBracket(currentValue, lastCharacter) {
        // if last character is an operator you cannot add closing bracket, just to make a equation clear, you need to add another number or delete an operator to avoid multiplying or dividing by 0
        if (operators.indexOf(lastCharacter) != -1) {
           return false 
        }
        // compare numbers of opening and closing brackets, you can add closing brackets until the numbers of closing brackets will be equal to the numbers of opening brackets
        if (currentValue.split(openingBracket).length > currentValue.split(closingBracket).length) {
            return true 
        }
        return false

        /* unit tests
        // 0.   addClosingBrackets = False 
        console.log('0.', canIAddClosingingBracket('0.', '.'), 'should be false')
        // 1+(2.addClosingBrackets = True
        console.log('1+(2', canIAddClosingingBracket('1+(2', '2'), 'should be true')
        */
    }

    // TEN BADZIEW MOZE TYLKO ZWRACAC TRUE LUB FALSE!!!!!!!!!!!!!!!!!
    function canIAddInputValue(currentValue, inputValue) {
        //undefined lastCharacter is only at the beginning because first pressed button will be a inputValue, there is no lastCharacter yet
        var lastCharacter = currentValue[currentValue.length-1] 

        if (lastCharacter == undefined) {
            lastCharacter = ''
        }

        // console.log('currentValue:', currentValue)
        // console.log('currentValue-2:', currentValue[currentValue.length-2])
        // console.log('lastCharacter', lastCharacter)
        // console.log('inputValue:', inputValue)
        // console.log(currentValue + inputValue)

        //ALLOWED VALUES - setting up which values you can enter and which are not allowed. 
        //If inputValue is not a number and not zero and not operator and not others and not brackets, do nothing/ignore, you can not add letters and random garbage
        if (numbers.indexOf(inputValue) == -1 && others.indexOf(inputValue) == -1 && zero.indexOf(inputValue) == -1 && operators.indexOf(inputValue) == -1 && openingBracket.indexOf(inputValue) == -1 && closingBracket.indexOf(inputValue) == -1) {
            return false 
        }
        // ZERO
        if (zero.indexOf(inputValue) != -1) {
            return canIAddZero(currentValue)
        } 

        // DOT
        if (others.indexOf(inputValue) != -1) {
            return canIAddDot(currentValue)
        } 
        
        // OPERATORS
        if (operators.indexOf(inputValue) != -1) {

            //if the operator is:'+', '*', '/' and it is a first added value - display nothing
            if (currentValue.length == 0 && inputValue != '-') {
                return false 
            } 
            return true 
        }

        //OPENING BRACKET
        if (openingBracket.indexOf(inputValue) != -1) {
            return canIAddOpeningBracket(currentValue)
        }

        //CLOSING BRACKET
        if (closingBracket.indexOf(inputValue) != -1) {
            return canIAddClosingingBracket(currentValue)
        }

        //NUMBERS
        if (closingBracket.indexOf(lastCharacter) != -1) {
            return false
        }
        return true
    }

    function applyCorrectionIfNeeded(currentValue, inputValue) {
        
        //undefined lastCharacter is only at the beginning because first pressed button will be a inputValue, there is no lastCharacter yet
        var lastCharacter = currentValue[currentValue.length-1] 
        
        // do not make undefined values, it might cause bugs in the future
        if (lastCharacter === undefined) {
            lastCharacter = ''
        }
        // console.log('currentValue:', currentValue)
        // console.log('lastCharacter', lastCharacter)
        // console.log('inputValue:', inputValue)
        // console.log(currentValue + inputValue)

        // NUMBERS corrections - when you press 0 and number, it will display number instead of zero
        if (numbers.indexOf(inputValue) != -1) {
            if (shouldISwapZeroAtTheEnd(currentValue)) {
                currentValue = currentValue.slice(0, currentValue.length - 1) //cut off last character of currentValue and will add inputValue at the end. InputValue can not be added here to not duplicate. 
            } 
        }

        //ZERO - no need correction

        //OPERATORS corrections
        if (operators.indexOf(inputValue) != -1) {
            //debugger
            //if currentValue is ending on dot and you press operator it will add '0' after dot
            if (others.indexOf(lastCharacter) != -1) {
                currentValue += '0' 
            }
            //if you have already two operators displayed and you press another - display nothing
            if ((numbers.indexOf(currentValue[currentValue.length-2]) != -1 || closingBracket.indexOf(currentValue[currentValue.length-2]) != -1) && operators.indexOf(lastCharacter) != -1 && inputValue == '-' ) {
                return currentValue + inputValue
            }
            //debugger
            if (operators.indexOf(currentValue[currentValue.length-2]) != -1 && operators.indexOf(lastCharacter) != -1) {
                return currentValue
            }
            //do not swap the operator if first character on the screen is minus, you can add number after it
            if (currentValue == '-') {
                return currentValue
            }
            //if lastCharacter is an operator and you press another operator - display just latest one (cut off the lastCharacter from currentValue and replace it with latest operator)
            if (operators.indexOf(lastCharacter) != -1) {
                return currentValue.slice(0, currentValue.length - 1) + inputValue
            } 
            


            
        }
          
        //DOT corrections
        if (others.indexOf(inputValue) != -1) {
            // if lastCharacter is an operator, brackets or lastCharacter is empty and you press dot add 0 before a dot             
            if (operators.indexOf(lastCharacter) != -1 || openingBracket.indexOf(lastCharacter) != -1 || lastCharacter == '') {
                currentValue += '0'
            }
            // if lastCgaracter is closing bracket and you press dot
        } 
        
        //OPENING BRACKET - no corrections needed

        //CLOSING BRACKET - you can add closing bractes up to numbers of opening brackets, not more
        if (closingBracket.indexOf(inputValue) != -1) {
            if (operators.indexOf(lastCharacter) != -1) {
               currentValue = currentValue.slice(0, currentValue.length - 1)
               inputValue = closingBracket
            }
        } 
    console.log('inputValue', inputValue)
    console.log('currentValue', currentValue)
    console.log('lastCharacter', lastCharacter)

        return currentValue + inputValue
    }

    

    function addValue(inputValue, currentValue) {
        if (canIAddInputValue(currentValue, inputValue)) {
            return applyCorrectionIfNeeded(currentValue, inputValue)
        } else {
            return currentValue
        }

    }
    //  // adding dot
    // console.log('adding dot')
    // console.log(addValue('', '.'), '==', '0.', addValue('', '.') == '0.')
    // console.log(addValue('1+', '.'), '==', '1+0.', addValue('', '.') == '1+0.')
    // console.log(addValue('2+(', '.'), '==', '1+(0.', addValue('', '.') == '1+(0.')
    // console.log(addValue('2+()', '.'), '==', '2+()', addValue('2+()', '.') == '2+()') // after closing brackets only operator
    // console.log(addValue('1', '.'), '==', '1.', addValue('1', '.') == '1.')
    // console.log(addValue('12.', '.'), '==', '12.', addValue('12.', '.') == '12.') // only one dot per number
    // console.log(addValue('0', '.'), '==', '0.', addValue('0', '.') == '0.')
    // console.log(addValue('5+-', '.'), '==', '5+-0.', addValue('5+-', '*') == '5+-0.')


    // // adding numbers
    // console.log('adding numbers')
    // console.log(addValue('', '1'), '==', '1', addValue('', '1') == '1')
    // console.log(addValue('12', '3'), '==', '123', addValue('12', '3') == '123')
    // console.log(addValue('13+(', '7'), '==', '13+(7', addValue('13+(', '7') == '13+(7')
    // console.log(addValue('13+()', '7'), '==', '13+()', addValue('13+()', '7') == '13+()') //only operators after closing bracket
    // console.log(addValue('7+-', '1'), '==', '7+-1', addValue('7+-', '1') == '7+-1')
    // console.log(addValue('0', '1'), '==', '1', addValue('0', '1') == '1')
    // console.log(addValue('600', '1'), '==', '6001', addValue('600', '1') == '6001')
    // console.log(addValue('.', '1'), '==', '0.1', addValue('0', '1') == '0.1')
    // console.log(addValue('3.2', '1'), '==', '3.21', addValue('3.2', '1') == '3.21')


    // // adding operators
    // console.log('adding operators')
    // console.log(addValue('', '+'), '==', '', addValue('', '+') == '')
    // console.log(addValue('', '/'), '==', '', addValue('', '/') == '')
    // console.log(addValue('', '*'), '==', '', addValue('', '*') == '')
    // console.log(addValue('', '-'), '==', '-', addValue('', '-') == '-')
    // console.log(addValue('2', '-'), '==', '2-', addValue('2', '-') == '2-')
    // console.log(addValue('5+', '-'), '==', '5+-', addValue('5+', '-') == '5+-')
    // console.log(addValue('5-', '+'), '==', '5+', addValue('5-', '+') == '5+')
    // console.log(addValue('3+', '+'), '==', '3+', addValue('3+', '+') == '3+')
    // console.log(addValue('7+', '*'), '==', '7*', addValue('7+', '*') == '7*')
    // console.log(addValue('5+-', '*'), '==', '5+-', addValue('5+-', '*') == '5+-')
    // console.log(addValue('3.', '+'), '==', '3.0+', addValue('3.', '+') == '3.0+')
    // console.log(addValue('0.', '+'), '==', '0.0+', addValue('0.', '+') == '0.0+')
    // console.log(addValue('13+(', '*'), '==', '13+(', addValue('13+(', '*') == '13+(') //after opening bracket can be number, zero, dot, closing bracke or minus, but not other operators
    // console.log(addValue('13+(', '-'), '==', '13+(-', addValue('13+(', '-') == '13+(-') // only minus alowed after opening bracket
    // console.log(addValue('13+()', '+'), '==', '13+()+', addValue('13+()', '+') == '13+()+')

    // //adding zero
    // console.log('adding zero')
    // console.log(addValue('', '0'), '==', '0', addValue('', '0') == '0')
    // console.log(addValue('0', '0'), '==', '0', addValue('0', '0') == '0')
    // console.log(addValue('3', '0'), '==', '30', addValue('3', '0') == '30')
    // console.log(addValue('30', '0'), '==', '300', addValue('30', '0') == '300')
    // console.log(addValue('6+', '0'), '==', '6+0', addValue('6+', '0') == '6+0')
    // console.log(addValue('8+(', '0'), '==', '8+(0', addValue('8+(', '0') == '8+(0')
    // console.log(addValue('8+()', '0'), '==', '8+()', addValue('8+()', '0') == '8+()') // only operator after closing bracket is legal
    // console.log(addValue('', '0'), '==', '1', addValue('', '0') == '1')

    // //adding openingBracket
    // console.log('adding openingBracket')
    // console.log(addValue('', '('), '==', '(', addValue('', '(') == '(')
    // console.log(addValue('2', '('), '==', '2', addValue('2', '(') == '2') //opening brackets only after operator
    // console.log(addValue('2+', '('), '==', '2+(', addValue('2+', '(') == '2+(')
    // console.log(addValue('2.0', '('), '==', '2.0', addValue('2.0', '(') == '2.0')
    // console.log(addValue('2+(', '('), '==', '2+((', addValue('2+(', '(') == '2+((')
    // console.log(addValue('2+()', '('), '==', '2+()', addValue('2+()', '(') == '2+()')

    // //adding closingBracket
    // console.log('adding closingBracket')
    // console.log(addValue('', ')'), '==', '', addValue('', ')') == '')
    // console.log(addValue('4+', ')'), '==', '4+', addValue('4+', ')') == '4+')
    // console.log(addValue('3', ')'), '==', '3', addValue('3', ')') == '3')
    // console.log(addValue('4.0', ')'), '==', '4.0', addValue('4.0', ')') == '4.0')
    // console.log(addValue('2+(', ')'), '==', '2+()', addValue('2+(', ')') == '2+()')
    // console.log(addValue('2+((', ')'), '==', '2+(()', addValue('2+((', ')') == '2+(()')
    // console.log(addValue('2+()', ')'), '==', '2+()', addValue('2+()', ')') == '2+()')
    // console.log(addValue('0', ')'), '==', '0', addValue('0', ')') == '0')
 

    //2. set up the calculator to 'empty' every time when C key is pressed
    function clear() {
        var startingPoint = ""
        $('#result_screen').val(startingPoint)                 
    }

    // console.log("2*-3")
    // console.log(calculate("2*-3"))

    // console.log("633+-33")
    // console.log(calculate("633+-33"))

    // console.log("255-155")
    // console.log(calculate("255-155"))


    // bierze stringa result i nadaje mu corekcje tak zeby do equation trafily poprawne dane do liczenia
    function applyFinalCorrectionsToEquation(result) {
     //debugger
        // look through the string to find number or closingBracket   
        for (var i = result.length-1; i >=0; i-- ) {
            if (_.contains(numbers, result[i]) || _.contains(closingBracket, result[i])) {
                break
            }
        } 
        result = result.slice(0, i + 1)
        
        console.log('result', result)
        console.log('i', i)
        console.log('i+1', i + 1)

        return result
    }

    //3. caculate does the math. It takes the string from result screen and separate operators to the list of operators, and numbers to the list of numbers. 
    //Then is doing an algorithm with equation order
    function calculate(result) {
        //debugger
        var string_with_space = [] //numbers container
        var stack = [] //operator container
        
        var item = '' //every single character of result screen separately
        var equation = [] 

        //  PART A - CHOPPING THE RESULT
        for (var i = 0; i < result.length; i++) { //take the string from result screen
            //_.contains is a method from underscorejs.org, 
            // if it finds brackets or operators;
            // or if you find operator and previous item is an operator as well - skip operator (-) and continue. This makes negative numbers working
            if ((result[i-1] !== undefined && _.contains(operators, result[i]) && !_.contains(operators, result[i - 1])) || _.contains(openingBracket, result[i]) || _.contains(closingBracket, result[i])) { 
            
                if (item) { //take everything what was before opeartor or bracket
                    item = parseFloat(item) //pars a string and change it into a floating point number
                    equation.push(item) //add a number to the equation
                }
                equation.push(result[i]) //and then add operator to the equation
                item = '' //clear item and check what is next repeating the procedure
            } else {
                item += result[i] //check every single character until you hit operator or bracket. When hit 'if' above starts working    
            }
        }
        if (item) {
            item = parseFloat(item) //pars a string and returns a floating point number
            equation.push(item) //add whole item to the equation (522)
        }

        console.log(equation)

        // PART B - EQUATION
        // check the equation for operators and separate numbers to one list (string_with_space) and operators to another (stack). 
        for (var i = 0; i < equation.length; i++) { 

            item = equation[i] //now item is an index of equation list (not every single character)

            if (item == '(') { // if item is an opening bracket
                stack.push(item) // ad it to the list of operators
            } else if (item == ')') { // else if the item is a closing bracket
                
                var theThing = ''
            
                while (true && stack) {
                    theThing = stack[stack.length-1] // theThing is the last element of the stack
                    stack = stack.slice(0, stack.length-1) //pop a thing off the stack
                    
                    if (theThing != '(') {  // while that thing is not an opening bracket
                        string_with_space.push(theThing) // = Add the thing to the string with a space
                    } else {
                        break
                    }
                } 
            } else if (_.contains(operators, item)) { //if item is an operator and it to the stack (list of operators)
                // check here a priority of operators due to mathermatic alghoritm 
                // if operators priority is higher than operators priority in the stack
                if (stack && _.contains(operators, stack[stack.length-1]) && operatorsPriority[stack[stack.length-1]] > operatorsPriority[item]) { 
                    string_with_space.push(stack[stack.length-1])  // add the popped operator to the string_with_space
                    stack = stack.slice(0, stack.length-1) // pop the operator on the top of the stack, if there is many operators - remove last one
                }
                stack.push(item)
                
            } else { //if item is a number add it to the string_with_space (number list)
                string_with_space.push(item) 
            }
        }
        while (!_.isEmpty(stack)) { // While the stack is not empty
            string_with_space.push(stack[stack.length-1])  // add it to the string with a space.
            stack = stack.slice(0, stack.length-1) // pop a thing off the stack.
        }    

        // PART C - CALCULATING
        stack = []
        var numberLeft = 0
        var numberRight = 0
        var calculatedNumber = 0

        for (var i = 0; i < string_with_space.length; i++) { // check the numbers container
            item = string_with_space[i] // now item is every number
            if (_.contains(operators, item)) { // if there is an operators, do the math as below
                numberRight = stack[stack.length-2]
                numberLeft = stack[stack.length-1]
                stack = stack.slice(0, stack.length-2)

                if (item == '*') {
                    calculatedNumber = numberRight * numberLeft
                } else if (item == '/') {
                    calculatedNumber = numberRight / numberLeft
                } else if (item == '+') {
                    calculatedNumber = numberRight + numberLeft
                } else if (item == '-') {
                    calculatedNumber = numberRight - numberLeft
                }
                stack.push(calculatedNumber) //add calculatedNumber to the stack

            } else {
                stack.push(item) // if there is no operators add the numbers
            }
        }

        return stack[0]
    }

    //4. backspace
    function deleteLastCharacter(message) {
        message = message.slice(0, message.length-1)
        return message  
    }

    function leftArrowPressed() {
        console.log('leftArrowPressed')
    }

    function rightArrowPressed() {
       console.log('rightArrowPressed')
    }

    //jQuery events here/
    $("#js_clear").click(function(){ 
        clear()
    })

    $(".js_button").not('#equals').click(function(){
        // show on the screen text of pressed button and whatever was in the screen before
        $('#result_screen').val(addValue($(this).text(), $('#result_screen').val()))
    }) 

    $("#equals").click(function(){ 
        $('#result_screen').val(applyFinalCorrectionsToEquation($('#result_screen').val()))
        $('#result_screen').val(calculate($('#result_screen').val()))

    }) 

    $('#js_back').click(function() {
        // show on the screen whatever was on the screen before without lastCharacter
        $('#result_screen').val(deleteLastCharacter($('#result_screen').val()))
    })

    // prevent backspace from deleting more than one character at the time
    $('#result_screen').keydown(function(event){
        event.preventDefault()
    })

    // allow backspace to do its job from keyboard 
    $(document).keydown(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which)
            if (keycode === 8) {
                $("#js_back").click();
            }
            if (keycode === 37) {
                leftArrowPressed()
            }
            if (keycode === 39) {
                rightArrowPressed()
            }
    })

    // adding possibility to use keyboard to navigate, but preventing from adding letters and rubbish
    // allows to add only validated characters from keyboard as programmed 
    $('#result_screen').keypress(function(event){
        event.preventDefault()
    })

    // keys possible to use from keyboard here
    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        console.log(keycode)
            if (keycode === 49) {
                $("#one").click();
           } else if (keycode === 50) {
                $("#two").click();
            } else if (keycode === 51) {
                $("#three").click();
            } else if (keycode === 52) {
                $("#four").click();
            } else if (keycode === 53) {
                $("#five").click();
            } else if (keycode === 54) {
                $("#six").click();
            } else if (keycode === 55) {
                $("#seven").click();
            } else if (keycode === 56) {
                $("#eight").click();
            } else if (keycode === 57) {
                $("#nine").click();
            } else if (keycode === 48) {
                $("#zero").click();
            } else if (keycode === 99) {
                $("#js_clear").click();
            } else if (keycode === 43) {
                $("#plus").click();
            } else if (keycode === 45) {
                $("#minus").click();
            } else if (keycode === 42 || keycode === 56) {
                $("#multiply").click();
            } else if (keycode === 47) {
                $("#divide").click();
            } else if (keycode === 13 || keycode === 61) {
                $("#equals").click();
            } else if (keycode === 46) {
                $("#dot").click();
            } else if (keycode === 40) { //albo 219 nie wiem, te kody sa powalone jakies
                $("#openingBracket").click();
            } else if (keycode === 41) {
                $("#closingBracket").click();
            }
        });
    });