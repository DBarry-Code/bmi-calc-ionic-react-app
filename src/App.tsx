import React, { useRef, useState } from "react";
import BimControls from "./components/BimControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/inputControl";

import {
    IonApp,
    setupIonicReact,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonItem,
    IonAlert,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
    const [bmi, setBmi] = useState<number>();
    const [error, setError] = useState<string>();
    const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMI = (): void => {
        const enteredWeight: number = +weightInputRef.current?.value!;
        const enteredHeight: number = +heightInputRef.current?.value!;

        if (
            !enteredWeight ||
            !enteredHeight ||
            +enteredWeight <= 0 ||
            +enteredHeight <= 0
        ) {
            setError("Pleas enter a valid input (no negative) number!");
            return;
        }

        const weightFactor = calcUnits === "ftlbs" ? 2.2 : 1;
        const heightFactor = calcUnits === "ftlbs" ? 3.28 : 1;

        const weight = +enteredWeight / weightFactor;
        const height = +enteredHeight / heightFactor;

        const calcBim: number = weight / (height * height);

        setBmi(calcBim);
    };

    const resetImputs = () => {
        weightInputRef.current!.value = "";
        heightInputRef.current!.value = "";
        setBmi(undefined);
    };

    const clearError = () => {
        setError("");
    };

    const selectClacUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
        setCalcUnits(selectedValue);
    };

    return (
        <IonApp>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[{ text: "Okey", handler: clearError }]}
            />
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>BMI Calculator</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <InputControl
                                selectedValue={calcUnits}
                                onSelectValue={selectClacUnitHandler}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='floating'>
                                    Your Height (
                                    {calcUnits === "mkg" ? "meters" : "feet"})
                                </IonLabel>
                                <IonInput
                                    type='number'
                                    ref={heightInputRef}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='floating'>
                                    Your Weight (
                                    {calcUnits === "mkg" ? "kg" : "lbs"})
                                </IonLabel>
                                <IonInput
                                    type='number'
                                    ref={weightInputRef}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <BimControls
                        onCalculate={calculateBMI}
                        onReset={resetImputs}
                    />
                    {bmi && <BmiResult result={bmi} />}
                </IonGrid>
            </IonContent>
        </IonApp>
    );
};
export default App;
