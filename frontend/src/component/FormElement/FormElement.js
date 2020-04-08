import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = props => {
    let inputChildren = undefined;

    if (props.type === 'select') {
        const options = [
            {id: '', title: 'Please select a ' + props.title + '...'},
            ...props.options
        ];

        inputChildren = options.map(o => (
            <option key={o.id} value={o.id}>
                {o.title}
            </option>
        ));
    }

    let inputElement = (
        <Input
            invalid={!!props.error}
            type={props.type}
            name={props.propertyName} id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            children={inputChildren}
        />
    );

    if (props.type === 'textarea') {
        inputElement = (
            <textarea
                name={props.propertyName} id={props.propertyName}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
                cols="100"
                rows="10"
            />
        )
    }
    return (
        <FormGroup row>
            <Label sm={2} for={props.propertyName}>{props.title}</Label>
            <Col sm={10}>
                {inputElement}
                <FormFeedback>{props.error}</FormFeedback>
            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string
};

export default FormElement;