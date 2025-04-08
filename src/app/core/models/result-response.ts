export interface ResultResponse<T> {
    result: T
    isSuccess: boolean
<<<<<<< HEAD
    error: any
=======
    error: {
      errorCode: string
      errorMessage: string
      additionalInformation: any[]
    }
>>>>>>> initalProject
  }