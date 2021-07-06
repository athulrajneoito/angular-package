import { FormGroup, Validators } from '@angular/forms';
import { FieldItemPatchInterface } from '../../../../../pop-common.model';
import { SetControl } from '../../../../../pop-common-dom.models';
export declare type DateRangeFilterPredicate = (d: Date) => boolean;
export interface DateRangeConfigInterface {
    type?: 'Basic' | 'Expanded';
    bubble?: boolean;
    disabled?: boolean;
    displayErrors?: boolean;
    name?: string;
    facade?: boolean;
    filterPredicate?: string | DateRangeFilterPredicate;
    helpText?: string;
    id?: string | number;
    label?: string;
    min?: string | number | Date;
    max?: string | number | Date;
    metadata?: object;
    noInitialValue?: boolean;
    required?: boolean;
    session?: boolean;
    sessionPath?: string;
    patch?: FieldItemPatchInterface;
    tooltip?: string;
    transformation?: string;
    validators?: Array<Validators>;
    valueStart?: string | number;
    valueEnd?: string | number;
    options?: object;
}
export declare class DateRangeConfig implements SetControl {
    type: string;
    bubble: boolean;
    formGroup: FormGroup;
    displayErrors: boolean;
    disabled: boolean;
    facade?: boolean;
    filterPredicate: any;
    helpText: string;
    id: string;
    label: string;
    min: any;
    max: any;
    message: string;
    metadata: any;
    name: string;
    noInitialValue: boolean;
    patch: FieldItemPatchInterface;
    required?: boolean;
    session?: boolean;
    sessionPath?: string;
    showTooltip: boolean;
    transformation: any;
    tooltip: string;
    valueStart: any;
    valueEnd: any;
    clearMessage: any;
    triggerOnChange: any;
    validators: any;
    constructor(params?: DateRangeConfigInterface);
    setControl(): void;
}