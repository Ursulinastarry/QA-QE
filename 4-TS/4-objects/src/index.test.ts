import { hasKey,fetchUser,updateProduct } from "./index";

it("Should work on string keys", () => {
  const obj = {
    foo: "bar",
  };

  expect(hasKey(obj, "foo")).toBe(true);
  expect(hasKey(obj, "bar")).toBe(false);
});

it("Should work on number keys", () => {
  const obj = {
    1: "bar",
  };

  expect(hasKey(obj, 1)).toBe(true);
  expect(hasKey(obj, 2)).toBe(false);
});

it("Should work on symbol keys", () => {
  const fooSymbol = Symbol("foo");
  const barSymbol = Symbol("bar");

  const obj = {
    [fooSymbol]: "bar",
  };

  expect(hasKey(obj, fooSymbol)).toBe(true);
  expect(hasKey(obj, barSymbol)).toBe(false);
});

type Expect<T extends true> = T
 type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
const example = async () => {
  const user = await fetchUser();

  type test = Expect<Equal<typeof user, { name: string; email: string }>>;
};

updateProduct(1, {
 name: "Book",
  });
  
  updateProduct(1, {
    price: 12.99,
  });