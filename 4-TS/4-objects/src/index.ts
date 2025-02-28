//EXTENDING OBJECTS
//Exercise 1
type User = {

  name: string;
  email: string;
}& BaseEntity

type Product = {
 
  name: string;
  price: number;
}& BaseEntity

type BaseEntity={
  id: string;
  createdAt: Date;
}

// Your task is to create a new BaseEntity type that includes the id and createdAt properties. Then, use the & operator to create User and Product types that intersect with BaseEntity.

//Exercise 2
interface User1 extends BaseEntity1 {

  name: string;
  email: string;
}

interface Product1 extends BaseEntity1 {
 
  name: string;
  price: number;
}

interface BaseEntity1{
  id: string;
  createdAt: Date;
}

//DYNAMIC OBJECT KEYS
//Exercise 1
const scores :Record<string, number>= {};

scores.math = 95;
scores.english = 90;
scores.science = 85;

//Exercise 2
interface Scores {
  [subject: string]: number;
  math: number;
  english: number;
  // science: number;
}
interface RequiredScores {
  math: number;
  english: number;
  // science: number;
}

// interface Scores extends RequiredScores {
  
// }
const scores1: Scores= {
  math: 95,
  english: 90,
  // science:100,
};
scores1.athletics =70;
scores1. french=70;
scores1.spanish = 70;

//Exercise 3
type Environment = "development" | "production" | "staging";

type Configurations = Record<Environment,{}>;

const configurations: Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
  // @ts-expect-error
// Unused '@ts-expect-error' directive.
  notAllowed: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};

//Exercise 4
export const hasKey = (obj: object, key: string |number |symbol) => {
  return obj.hasOwnProperty(key);
};

//REDUCING DUPLICATION WITH UTILITY TYPES
// Exercice 1
interface User1 {
  id: string;
  name: string;
  email: string;
  role: string;
}
type User2=Pick<User1,"name"|"email">
  

export const fetchUser = async (): Promise<User2> => {
  const response = await fetch("/api/user1");
  const user1 = await response.json();
  return user1;
};

//Exercise 2
interface Product2 {
  id: number;
  name: string;
  price: number;
  description: string;
}


export const updateProduct = (id: number, productInfo: Partial<Omit<Product2,"id">>) => {
  // Do something with the productInfo
};