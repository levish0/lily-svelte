import * as FormPrimitive from 'formsnap';
import Field from './form-field.svelte';
import ElementField from './form-element-field.svelte';
import Fieldset from './form-fieldset.svelte';
import Legend from './form-legend.svelte';
import Label from './form-label.svelte';
import Description from './form-description.svelte';
import FieldErrors from './form-field-errors.svelte';
import Button from './form-button.svelte';

const Control = FormPrimitive.Control;

export {
	Field,
	ElementField,
	Fieldset,
	Legend,
	Control,
	Label,
	Description,
	FieldErrors,
	Button,
	//
	Field as FormField,
	ElementField as FormElementField,
	Fieldset as FormFieldset,
	Legend as FormLegend,
	Control as FormControl,
	Label as FormLabel,
	Description as FormDescription,
	FieldErrors as FormFieldErrors,
	Button as FormButton
};
