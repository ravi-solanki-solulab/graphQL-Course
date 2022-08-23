const message = "message from the mymodule file";
const name = "Ravi"
const defaultcountry = 'India'
const greeting = (name) => { 
    return `hello ${name}`; 
}

/*1.variables other than default marked should be imported with the same name they are exported.
  2.default marked variable can be imported with diffrent name also
   */
export { message, name , greeting, defaultcountry as default };
