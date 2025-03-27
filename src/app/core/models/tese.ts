import { RegrasData } from "./regras"

export interface TeseData {
    descricao: string
  versao: number
  correcoes: number
  questionarioAsJson: string
  regras: RegrasData[]
  publicado: boolean
  rowKey: string
  timestamp: string
  eTag: string
}