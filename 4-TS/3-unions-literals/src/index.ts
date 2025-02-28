// Exercise 1: string or null
// Here we have a function called getUsername that takes in a username string. If the username is not equal to null, we return a new interpolated string. Otherwise, we return "Guest":

  
export function getUsername(username: string | null) {
    if (username !== null) {
      return `User: ${username}`
    }
    
    else {
      return 'Guest'
    }
  }
  
  
  //// Exercise 2
  type Direction="up"| "down"| "left"| "right"
  export function move(direction: Direction, distance: number) {
      // Move the specified distance in the given direction
   
    }
    
  
  //NARROWING 
  //Exercise 1
  
  export function validateUsername(username: string | null): boolean {
      if( username !== null  && username.length > 5){
          return true
      //   'username' is possibly 'null'.
      }
          return false
        }
     
      
       
      
      
      //Exercise 2
      // type Expect<T extends true> = T
      // type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
      // const appElement = document.getElementById('app')
      // if (!appElement) {
      //     throw new Error('Could not find app element')
      //   }
      //   console.log(appElement)
                  
          
      // type Test = Expect<Equal<typeof appElement, HTMLElement>>
              
      
      //Exercise 3
      type APIResponse =
        | {
            data: {
              id: string
            }
          }
        | {
          
            error: string
          }
      
      export const handleResponse = (response: APIResponse) => {
        // How do we check if 'data' is in the response?
      
        if ("data" in response) {
          return response.data.id
        } else {
          throw new Error(response.error)
        }
      }
  
  
  //UNKNOWN AND NEVER
  //Exercise 1
  const somethingDangerous = () => {
      if (Math.random() > 0.5) {
        throw new Error('Something went wrong')
      }
    
      return 'all good'
    }
    
    try {
      somethingDangerous()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      //  'error' is of type 'unknown'.
      }
    }
    const error = new Error('Some error message')
  
    console.log(error.message)
  
    
   
    //Exercise 2
    export const parseValue = (value: unknown):string => {
      if (typeof value === 'object' &&
          value !== null &&
          'data' in value &&
          typeof value.data === 'object' &&
          value.data !== null &&
          'id' in value.data &&
          typeof value.data.id === 'string'
        ) {
          
        return value.data.id
  //   'value' is of type 'unknown'.
      }
    
      throw new Error('Parsing error!')
    }
  
    //Exercise 3
   export const parseValueAgain = (value: unknown) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'data' in value &&
        typeof value.data === 'object' &&
        value.data !== null &&
        'id' in value.data &&
        typeof value.data.id === 'string'
      ) {
        return value.data.id
      }
    
      throw new Error('Parsing error!')
    }
    const data = (value:any) => {
      return (
        typeof value === 'object' &&
        value !== null &&
        'data' in value &&
        typeof value.data === 'object' &&
        value.data !== null &&
        'id' in value.data &&
        typeof value.data.id === 'string'
      )
    }
   const parseValue1 = (value: any) => {
    if (data(value)) {
      return value.data.id
    }
  
    throw new Error('Parsing error!')
  }
  
  const parseValueAgain1 = (value: any) => {
    if (data(value)) {
      return value.data.id
    }
  
    throw new Error('Parsing error!')
  }
  
  //DISCRIMINATING UNIONS
  //Exercise 1
  type Circle = {
      kind: 'circle'
      radius: number
    }
    
    type Square = {
      kind: 'square'
      sideLength: number
    }
    
    
  
    type Shape = Circle | Square
  
    export function calculateArea(shape: Shape) {
  //   Property 'sideLength' does not exist on type 'Shape'.
  //   Property 'radius' does not exist on type 'Shape'.
      if (shape.kind === 'circle') {
          const {radius}=shape
        return Math.PI * radius * radius
      } else {
          const {sideLength}=shape
        return sideLength * sideLength
      }
    }
  
    //Exercise 2
     function calculateArea2(shape: Shape) {
      switch (shape.kind) {
        case 'circle': {
          return Math.PI * shape.radius * shape.radius
        }
        case 'square': {
          return shape.sideLength * shape.sideLength
        }
      }
    }
  
    //Exercise 3
  
  // async function fetchData(): Promise<APIResponse> {
  //   try {
  //     const response = await fetch('https://api.example.com/data')
  
  //     if (!response.ok) {
  //       return [
  //         'error',
  //         // Imagine some improved error handling here
  //         'An error occurred',
  //       ]
  //     }
  
  //     const data = await response.json()
  
  //     return ['success', data]
  //   } catch (error) {
  //     return ['error', 'An error occurred']
  //   }
  // }
  
  // type APIResponse2 = ['error', string] | ['success', User[]]
  
  // async function exampleFunc() {
  //     type Expect<T extends true> = T
  // type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
  //   const [status, value] = await fetchData()
  
  //   if (status === 'success') {
  //     console.log(value)
  
  //     type test = Expect<Equal<typeof value, User[]>>
  // // Type 'false' does not satisfy the constraint 'true'.
  //   } else {
  //     console.error(value)
  
  //     type test = Expect<Equal<typeof value, string>>
  // // Type 'false' does not satisfy the constraint 'true'.
  //   }
  // }
  
  
  //Exercise 4
  type OptionalCircle = {
      radius: number
    }
    type Circle1 = {
      kind?: 'circle'
      radius: number
    }
    
    type Square1 = {
      kind: 'square'
      sideLength: number
    }
    
    type Shape1 = Circle1 | Square1
    
    export function calculateArea3(shape1: Shape1) {
    if (shape1.kind === 'square') {
      return shape1.sideLength * shape1.sideLength
    } else {
      return Math.PI * shape1.radius * shape1.radius
    }
  }