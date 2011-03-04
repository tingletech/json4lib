// run as 'node test.js'

var fs = require('fs');
var JSV = require('JSV').JSV;
var env = JSV.createEnvironment("json-schema-draft-03");

// read in our schemas
var schemas = fs.readdirSync('../schema/');
var schemasL = schemas.length;

for ( var i=0, len=schemasL; i<len; ++i ){
  console.log(schemas[i]);
  schema = fs.readFileSync("../schema/"+schemas[i], encoding='utf8');
  try {
    schema = JSON.parse(schema);
    var report = env.validate(schema);
    if (report.errors.length === 0) {
      console.log("JSON schema is valid against the schema");
    } else {
      console.log(report);
      return false;
    } 
    env.createSchema(schema,true,"http://json4lib.googlecode.com/hg/"+schemas[i]+"#");
  } catch(SyntaxError) {
    console.log(SyntaxError);
    console.log(schema);
  }
}
console.log("load test object");
var testObject = fs.readFileSync("./digital-object.json", encoding='utf8');

testObject = JSON.parse(testObject);

var report = env.validate(testObject);

if (report.errors.length === 0) {
  console.log("JSON is valid against the schema");
} else {
  console.log(report);
} 

console.log("load the incorrect object");
var testObject = fs.readFileSync("./error.json", encoding='utf8');

testObject = JSON.parse(testObject);

var report = env.validate(testObject);

if (report.errors.length === 0) {
  console.log("JSON is valid against the schema");
} else {
  console.log(report);
} 

