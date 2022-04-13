export const handler = async (event) => {
console.log('node',event)
return event.source.node
};