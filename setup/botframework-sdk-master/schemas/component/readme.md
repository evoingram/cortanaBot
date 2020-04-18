# Component Schema
The component schema defines extensions to JsonSchema for supporting
Bot Framework declarative component definitions (via .schema files which describe the shape of .dialog files).

The extensions are in baseComponent.schema and bf dialog:merge -u will 
merge baseComponent.schema + json.schema => component.schema

