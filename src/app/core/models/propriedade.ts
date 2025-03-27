import { FieldType } from "./form-builder/field-type"


export interface PropriedadeData {
    tipo: string
    descricao: string
    referencia: string
    rowKey: string
    timestamp: string
    eTag: string
    fieldType?: FieldType
}
