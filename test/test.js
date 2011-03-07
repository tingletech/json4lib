// run as 'node test.js'

var fs = require('fs');
var JSV = require('JSV').JSV;
var env = JSV.createEnvironment("json-schema-draft-03");




// read in our schemas
// var schemas = fs.readdirSync('../schema/');
var schemas = ['files.json','dcel.json','qdc.json','image-file.json','files.json','do.json'];
var schemasL = schemas.length;

for ( var i=0, len=schemasL; i<len; ++i ){
  console.log(schemas[i]);
  schema = fs.readFileSync("../schema/"+schemas[i], encoding='utf8');
  try {
    schema = JSON.parse(schema);
    // var report = env.validate(schema);
    var report = env.validate(schema, {"$ref":"http://json-schema.org/hyper-schema#"});
    if (report.errors.length === 0) {
      console.log("JSON schema is valid against the schema");
    } else {
      console.log(report);
      return false;
    } 
    env.createSchema(schema,true,"http://json4lib.googlecode.com/hg/schema/"+schemas[i]+"#");
    console.log("http://json4lib.googlecode.com/hg/schema/"+schemas[i]+"#");
  } catch(SyntaxError) {
    console.log(SyntaxError);
    console.log(schema);
  }
}
console.log("load test object");
var testObject1 = fs.readFileSync("./digital-object.json", encoding='utf8');

testObject1 = JSON.parse(testObject1);

var report1 = env.validate(testObject1, {"$ref":"http://json4lib.googlecode.com/hg/schema/do.json#"});

if (report1.errors.length === 0) {
  console.log("./digital-object.json is valid against the schema");
} else {
  console.log(report1);
} 

console.log("load the incorrect object");
var testObject2 = fs.readFileSync("./error.json", encoding='utf8');

testObject2 = JSON.parse(testObject2);

var report2 = env.validate(testObject2, {"$ref":"http://json4lib.googlecode.com/hg/schema/do.json#"});

if (report2.errors.length === 0) {
  console.log("./error.json is valid against the schema");
} else {
  console.log(report2);
} 
console.log(testObject2);
