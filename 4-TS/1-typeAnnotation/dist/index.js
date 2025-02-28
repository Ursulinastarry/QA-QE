console.log("hiiiii");
const getRectangleArea = (rectangle) => {
    return rectangle.width * rectangle.height;
};
const getRectanglePerimeter = (rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};
let area1 = {
    width: 20,
    height: 50
};
console.log(getRectangleArea(area1));
console.log(getRectanglePerimeter(area1));
export {};
