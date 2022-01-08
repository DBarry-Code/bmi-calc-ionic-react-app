import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BimControls: React.FC<{
    onCalculate: () => void;
    onReset: () => void;
}> = (props) => {
    return (
        <IonRow className='ion-text-center ion-margin'>
            <IonCol>
                <IonButton onClick={props.onCalculate}>
                    <IonIcon slot='start' icon={calculatorOutline} />
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol>
                <IonButton fill='outline' onClick={props.onReset}>
                    <IonIcon slot='start' icon={refreshOutline} />
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default BimControls;
