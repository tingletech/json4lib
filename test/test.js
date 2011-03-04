// run as 'node test.js'

fs = require('fs');
JSV = require('JSV').JSV;
env = JSV.createEnvironment("json-schema-draft-03");

// read in our schemas
schemas = fs.readdirSync('../schema/');
schemasL = schemas.length;

for ( var i=0, len=schemasL; i<len; ++i ){
  // console.log(schemas[i]);
  schema = fs.readFileSync("../schema/"+schemas[i], encoding='utf8');
  try {
    schema = JSON.parse(schema);
    env.createSchema(schema);
  } catch(SyntaxError) {
    console.log(SyntaxError);
    console.log(schema);
    return false;
  }
}

testObject = fs.readFileSync("./digital-object.json", encoding='utf8');

report = env.validate(testObject);

if (report.errors.length === 0) {
  console.log("JSON is valid against the schema");
} else {
  return false;
}
