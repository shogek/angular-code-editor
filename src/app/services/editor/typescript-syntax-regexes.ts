/** Surround certain TypeScript language tokens with span tags to add coloring. */
export function addTypeScriptCodeSyntaxColoring(fileContents: string) {
  let text = fileContents;
  text = replaceSingleLineImportStatements(text);
  text = replaceInjectableKeyword(text);
  text = replaceExternalClassDeclarations(text);
  text = replaceVariableDeclarationsWithNewKeyword(text);
  text = replaceVariableDeclarations(text);
  text = replaceFunctionDeclarationsWithReturnValue(text);
  text = replaceFunctionDeclarationsWithoutReturnValue(text);
  text = replaceReturnStatements(text);
  text = replaceIfStatements(text);
  text = replaceSingleLineComments(text);
  text = replaceMultiLineComments(text);
  // TOOD: This does not belong here. Create a 'editor-line-manager.ts'?
  const lines = text.split('\n').map((line, i) => {
    const l = `<p id="line-${i + 1}" line="${i + 1}">${line}</p>`;
    return l;
  }).join('');
  const spans = lines.split('<span');
  let id = 'span-';
  let result = spans[0];
  for (let i = 1; i <= spans.length; i++) {
    const updatedSpan = `<span id="${id}${i}"`;
    result += updatedSpan + spans[i];
  }
  return result;
}

function replaceSingleLineImportStatements(text: string): string {
  return text.replace(
    /import {(.*?)} from ("|')(.*?)("|');/g,
    '<span class="red">import</span> ' + 
    '<span class="yellow">{</span>' + 
    '$1' +
    '<span class="yellow">}</span>' + 
    '<span class="red"> from</span>'+
    ' <span class="blue">$2$3$4</span>' +
    ';'
  );
}

function replaceInjectableKeyword(text: string): string {
  return text.replace(
    /@Injectable\(\)/g,
    '<span class="yellow">@Injectable()</span>'
  );
}

function replaceExternalClassDeclarations(text: string): string {
  return text.replace(
    /export class (.*) {([\S\s]*)}/g,
    '<span class="red">export class</span> ' + 
    '<span class="purple">$1 </span>' +
    '<span class="yellow">{</span>' +
    '$2' +
    '<span class="yellow">}</span>'
  );
}

function replaceVariableDeclarationsWithNewKeyword(text: string): string {
  return text.replace(
    /private (.*) = new (.*);/g,
    '<span class="red">private</span> ' +
    '$1' +
    '<span class="red"> = new </span>' +
    '<span class="blue">$2</span>' +
    ';'
  );
}

function replaceVariableDeclarations(text: string): string {
  return text.replace(
    /(public|private|const|let|var) (.*) = (.*);/g,
    '<span class="red">$1</span> ' +
    '$2' +
    '<span class="red"> = </span>' +
    '<span class="blue">$3</span>' +
    ';'
  );
}

function replaceFunctionDeclarationsWithReturnValue(text: string): string {
  return text.replace(
    /(private|public) (.*)\((.*)\): (.*) {/g,
      '<span class="red">$1</span> ' +
      '<span class="purple">$2</span>' +
      '<span class="pink">(</span>' +
      '<span class="orange">$3</span>' +
      '<span class="pink">)</span>' +
      '<span class="red">:</span>' +
      '<span class="blue"> $4 </span>' + 
      '{'
  );
}

function replaceFunctionDeclarationsWithoutReturnValue(text: string): string {
  return text.replace(
    /(private|public) (.*)\((.*)\) {/g,
    '<span class="red">$1</span> ' +
    '<span class="purple">$2</span>' +
    '<span class="pink">(</span>' +
    '<span class="orange">$3</span>' +
    '<span class="pink">) </span>' +
    '{'
  );
}

function replaceReturnStatements(text: string): string {
  return text.replace(
    /return (.*);/g,
    '<span class="red">return</span> ' +
    '<span class="blue">$1</span>' +
    ';'
  );
}

function replaceIfStatements(text: string): string {
  return text.replace(
    /if \((.*)\) {/g,
    '<span class="red">if</span> ' +
    '<span class="blue">(</span>' +
    '<span class="orange">$1</span>' +
    '<span class="blue">) </span>' +
    '{'
  );
}

function replaceSingleLineComments(text: string): string {
  return text.replace(
    /\/\/(.*)/g,
    '<span class="gray">//$1</span>'
  );
}

function replaceMultiLineComments(text: string): string {
  return text.replace(
    /\/\*\*([\s\S]*)\*\//g,
    '<span class="gray">/**$1*/</span>'
  );
}
