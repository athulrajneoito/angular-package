import { Dictionary, FieldCustomSettingInterface } from '../../../../pop-common.model';

export const SelectFieldSetting = <Dictionary<FieldCustomSettingInterface>>{
  unique_label: {
    name: 'unique_label',
    type: 'boolean',
    defaultValue: true,
  },
};
