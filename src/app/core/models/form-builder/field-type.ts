import { FormlyFieldConfig } from "@ngx-formly/core";

export interface FieldType {
  propriedadeType?: string;
  title: string;
  icon: string;
  config: FormlyFieldConfig;

  [key: string]: any;
}
