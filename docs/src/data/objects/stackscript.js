module.exports = {"name":"StackScript","prefix":"stck","description":"StackScript objects describe a StackScript which can be used to help automate deployment of new Linodes.\n","schema":{"id":{"_description":"A unique ID for the StackScript.","_type":"integer","_value":37},"customer_id":{"_description":"The customer that created this StackScript.","_type":"integer","_value":123},"user_id":{"_description":"The user account that created this StackScript.","_type":"integer","_value":456},"label":{"_description":"This StackScript's display label.","_type":"string","_editable":true,"_value":"Example StackScript","_filterable":true,"_limit":"3-128 characters"},"description":{"_description":"In-depth information on what this StackScript does.","_type":"string","_editable":true,"_value":"Installs the Linode API bindings","_filterable":true},"distributions":{"_description":"A list of distributions this StackScript is compatible with.","_type":"array","_editable":true,"_subtype":"distribution","_filterable":true,"_value":[{"id":{"_type":"string","_value":"linode/debian8"},"label":{"_type":"string","_value":"Debian 8.1"},"vendor":{"_type":"string","_value":"Debian"},"x64":{"_type":"boolean","_value":true},"recommended":{"_type":"boolean","_value":true},"created":{"_type":"datetime","_value":"2015-04-27T16:26:41.000Z"},"minimum_storage_size":{"_type":"integer","_value":900}},{"id":{"_type":"string","_value":"linode/debian7"},"label":{"_type":"string","_value":"Debian 7"},"vendor":{"_type":"string","_value":"Debian"},"x64":{"_type":"boolean","_value":true},"recommended":{"_type":"boolean","_value":true},"created":{"_type":"datetime","_value":"2014-09-24T13:59:32.000Z"},"minimum_storage_size":{"_type":"integer","_value":600}}]},"deployments_total":{"_description":"The total number of times this StackScript has been deployed.","_type":"integer","_value":150},"deployments_active":{"_description":"The total number of active deployments.","_type":"integer","_value":42},"is_public":{"_description":"Publicize StackScript in the Linode StackScript library. Note that StackScripts cannot be changed to private after they have been public.\n","_type":"boolean","_editable":true,"_value":true,"_filterable":true},"created":{"_description":"When the StackScript was initially created.","_type":"datetime","_value":"2015-09-29T11:21:01"},"updated":{"_description":"When the StackScript was last updated.","_type":"datetime","_value":"2015-10-15T10:02:01"},"rev_note":{"_description":"The most recent note about what was changed for this revision.","_type":"string","_editable":true,"_value":"Initial import"},"script":{"_description":"The actual script body to be executed.","_type":"string","_value":"#!/bin/bash","_editable":true},"user_defined_fields":{"_description":"Variables that can be set to customize the script per deployment.","_type":"array","_value":[{"name":{"_type":"string","_value":"var1"},"label":{"_type":"string","_value":"A question"},"example":{"_type":"string","_value":"An example value"},"default":{"_type":"string","_value":"Default value"}},{"name":{"_type":"string","_value":"var2"},"label":{"_type":"string","_value":"Another question"},"example":{"_type":"string","_value":"possible"},"oneof":{"_type":"string","_value":"possible,enum,values"}}]}},"endpoints":null,"methods":null};