
import { getUsername ,
    move,
    validateUsername,
    handleResponse,
    parseValue,
    calculateArea3
  
  } from "./index";
  type Expect<T extends true> = T
  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
  const result = getUsername('Alice')
  
  type test = Expect<Equal<typeof result, string>>
  
  const result2 = getUsername(null)
  // Argument of type 'null' is not assignable to parameter of type 'string'.
  
  type test2 = Expect<Equal<typeof result2, string>>
  
  move('left', 5)
  // move('up-right',10)
  
  // move('down-left',20)
  
  it('should return true for valid usernames', () => {
      expect(validateUsername('Matt1234')).toBe(true)
  
      expect(validateUsername('Alice')).toBe(false)
  
      expect(validateUsername('Bob')).toBe(false)
  })
  it('Should return false for null', () => {
      expect(validateUsername(null)).toBe(false)
  })
  
  // test('passes the test even with the error', () => {
  //     // there is no error in runtime
    
  //     expect(() =>
  //       handleResponse({
  //         error: 'Invalid argument',
  //       })
  //     ).not.toThrow();
      
    
      // but the data is returned, instead of an error.
    
    //   expect(
    //     handleResponse({
    //       error: 'Invalid argument',
    //     }),
    //   ).toEqual("Should this be 'Error'?")
    // })
  
    it('Should handle a { data: { id: string } }', () => {
      const result = parseValue({
        data: {
          id: '123',
        },
      })
    
      type test = Expect<Equal<typeof result, string>>
    
      expect(result).toBe('123')
    })
    
    it('Should error when anything else is passed in', () => {
      expect(() => parseValue('123')).toThrow('Parsing error!')
    
      expect(() => parseValue(123)).toThrow('Parsing error!')
    })
  
    it('Should calculate the area of a circle when no kind is passed', () => {
      const result = calculateArea3({
  
        radius: 5,
      })
    
      expect(result).toBe(78.53981633974483)
    
      type test = Expect<Equal<typeof result, number>>
    })