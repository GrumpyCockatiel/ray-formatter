// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.efParser', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');

		const editor = vscode.window.activeTextEditor;

        if (editor) {
            let document = editor.document;

            // Get the document text
            const documentText = document.getText();

			// format all the properties based on the field name
			var body = formatProperties(documentText);

			body = classTemplate.replace('$PROPERTIES$', body );

            // DO SOMETHING WITH `documentText`
			insertText(body);
        }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

/* */
function formatProperties(fields)
{
	const lines = fields.split("\n");

	var body = '';

	lines.forEach( elem => {

		var fieldName = elem.trim();

		if ( !isEmpty(fieldName) )
		{
			var propStr = propTemplate.replace('$FIELDNAME$', fieldName );
			var propStr = propStr.replace('$PROPNAME$', fieldName );
	
			body = body.concat(propStr);
		}
	});

	return body;
}

/* */
function insertText(text)
{
    const editor = vscode.window.activeTextEditor;
	const doc = editor.document;
    
	if ( !editor ) return;

	// var firstLine = editor.document.lineAt(0);
	// var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
	// var textRange = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);

	const fullRange = new vscode.Range(doc.lineAt(0).range.start, doc.lineAt(doc.lineCount - 1).range.end);
	
	editor.edit(editBuilder => {
        editBuilder.replace( fullRange, text );
    });
}

/* test a string is empty or whitespace only */
function isEmpty(s)
{
    return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
}

const classTemplate = `[Table("")]
public class MyObject
{
	$PROPERTIES$
}`;

const propTemplate = `
///<summary></summary>
[Column("$FIELDNAME$")]
[JsonProperty("")]
public string $PROPNAME$ { get; set; }

`;

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}