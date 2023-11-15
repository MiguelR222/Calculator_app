import * as React from "react";
import {Button} from "./Button";
import { TrigButton } from "./Button";
import {View, Text} from 'react-native'
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/colors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function MyKeyboard(){
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("")
    const [result, setResult] = React.useState <Number | null >(null);

    const handleNumberPress = (buttonValue : string)=> {
        if (firstNumber.length<10) {
            setFirstNumber(firstNumber + buttonValue)
        }
    };
    const handleOperationPress = (buttonValue : string) => {
        setOperation(buttonValue)
        setSecondNumber(firstNumber);
        setFirstNumber("")
    };
    const handleTrigFunctionPress = (buttonValue : string) => {
        if (firstNumber.length<10 && firstNumber !== "") {
            setOperation(buttonValue)
            setSecondNumber(firstNumber);
            setFirstNumber("")
        }
        if (firstNumber.length<10 && firstNumber === "") {
            setOperation(buttonValue)
            setSecondNumber("1");
        }
    };
    const handlePiPress = (buttonValue : string) => {
        if (firstNumber.length<10 && firstNumber !== "") {
            const result = Number(firstNumber) * Math.PI;
            setResult(Number(result.toString().slice(0, 10)));
            getResult();
        }
        if (firstNumber.length<10 && firstNumber === "") {
            const result = Math.PI;
            setResult(Number(result.toString().slice(0, 10)));
            getResult();
        }
    };
    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
    };
    const firstNumberDisplay = () => {
        if (result !== null && result.toString().length < 6) {
            return <Text style={result.valueOf() < 99999 ? [Styles.screenFirstNumber, {color: myColors.result}] : [Styles.screenFirstNumber, {fontSize: 50, color: myColors.result}]}>{result.toString()}</Text>; 
    }
    if (result !== null && result.toString().length > 5 && result.toString().length < 8) {
        return (
          <Text style={[Styles.screenFirstNumber, { fontSize: 70, color: myColors.result }]}>
            {result.toString()}
          </Text>
        );
      }
      if (result !== null && result.toString().length > 7) {
        return (
          <Text style={[Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>
            {result.toString().slice(0, 10)}
          </Text>
        );
      }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber.toString().slice(0, 10)}
        </Text>
      );
    }
  };

    function getResult() {
        switch (operation) {
            case "+":
                setResult(Number(firstNumber) + Number(secondNumber));
                break;
            case "-":
                setResult(Number(secondNumber) - Number(firstNumber));
                break;
            case "*":
                setResult(Number(firstNumber) * Number(secondNumber));
                break;
            case "/":
                setResult(Number(secondNumber) / Number(firstNumber));
                break;
            case "%":
                setResult(((Number(secondNumber))*100) / Number(firstNumber));
                break;
            case "sin":
                setResult((Number(secondNumber)*(Math.sin(Number(firstNumber)))));
                break;
            case "cos":
                setResult((Number(secondNumber)*(Math.cos(Number(firstNumber)))));
                break;
            case "tan":
                setResult((Number(secondNumber)*(Math.tan(Number(firstNumber)))));                
                break;
            case "√":
                setResult((Number(secondNumber)*(Math.sqrt(Number(firstNumber)))));                
                break;
            default:
                break;
    }
    }

    return(
        <View style= {Styles.viewBottom}>
            <View
                style={{
                height: 120,
                width: "90%",
                justifyContent: "flex-end",
                alignSelf: "center",
                }}
            >
                <Text style={Styles.screenSecondNumber}>
                {secondNumber}
                <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <TrigButton title="sin" isOrange onPress={() => handleTrigFunctionPress("sin")} />
                <TrigButton title="cos" isOrange onPress={() => handleTrigFunctionPress("cos")} />
                <TrigButton title="tan" isOrange onPress={() => handleTrigFunctionPress("tan")} />
                <TrigButton title="π" isOrange onPress={() => handlePiPress("π")} />
            </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="√" isGray onPress={() => handleTrigFunctionPress("√")} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="X" isBlue onPress={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => getResult()} />
            </View>
            </View>
    )
}
