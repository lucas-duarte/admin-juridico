export interface ResultResponse<T> {
    result: T
    isSuccess: boolean
    error: {
      errorCode: string
      errorMessage: string
      additionalInformation: any[]
    }
  }