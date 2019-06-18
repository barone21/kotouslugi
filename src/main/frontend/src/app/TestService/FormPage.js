import React, {Component} from 'react';
import Step from "./Stepper";
import FirstStepForm from "./FirstStepForm";
import SecondStepForm from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";
import axios from "axios";

export default class TestServicePage extends Component {

    state = {
        activeStep: 0,
        numberOfSteps: 3,
        fields: {}
    };

    changeStepNext = () => {
        let {activeStep, numberOfSteps} = this.state;
        if (activeStep + 1 < numberOfSteps) {
            activeStep++;
            this.setState({activeStep: activeStep})
        }
    };

    changeStepPrev = () => {
        let {activeStep} = this.state;
        if (activeStep - 1 >= 0) {
            activeStep--;
            this.setState({activeStep: activeStep})
        }
    };

    submitForm = () => {
        const {fields} = this.state;
        let params = {};
        let preparedFields = {};
        Object.keys(fields).forEach((item) => {
            preparedFields[item] = fields[item].value
        });
        params.name = 'Название услуги';
        params.fields = preparedFields;
        params.status="FILED";
        console.log(params);
        axios.post('api/requisition/createRequisition', params).then((result) => {
            console.log(result);
        })
    };

    handleChange = (e) => {
        console.log(this.state);
        let {fields} = this.state;
        const result = Object.assign({}, fields, {
            [e.target.name]: {
                value: e.target.value,
                label: e.target.placeholder || e.target.title
            }
        });
        this.setState({fields: result});
    };

    render() {
        const {activeStep} = this.state;
        return (
            <div className="">
                <Step activeStepNumber={this.state.activeStep}/>
                {activeStep === 0 ?
                    <FirstStepForm
                        changeStepNext={this.changeStepNext}
                        handleChange={this.handleChange}
                        changeStepPrev={this.changeStepPrev}
                        fields={this.state.fields}
                    />
                    : null}

                {activeStep === 1 ?
                    <SecondStepForm
                        changeStepNext={this.changeStepNext}
                        handleChange={this.handleChange}
                        changeStepPrev={this.changeStepPrev}
                        fields={this.state.fields}
                    />
                    : null}

                {activeStep === 2 ?
                    <ThirdStepForm
                        submitForm={this.submitForm}
                        handleChange={this.handleChange}
                        changeStepPrev={this.changeStepPrev}
                        fields={this.state.fields}
                    /> : null}

            </div>
        )
    }
}