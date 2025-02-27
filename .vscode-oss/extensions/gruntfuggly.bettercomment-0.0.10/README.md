# Better Comment

Simply chooses to toggle a line comment or a block comment depending on where the start of the selection is. If the selection does not begin at the start of a line then a block comment is toggled, otherwise a line comment is toggled. If there is no current selection, it will try to detect a block comment under the cursor and toggle it, otherwise it will toggle a line comment.

By default, it overrides the standard line comment toggle key definition, `Ctrl+/` or `Cmd+/`, which is assigned to **bettercomment.toggle**.

Lastly, if a multi-line selection is commented in a file which doesn't support line comments (see configuration), the selection will be commented with a block comment on each line. Override the configuration to an empty array to disable this behaviour.

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.bettercomment).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install bettercomment

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/bettercomment).

## Configuration

`betterComment.forcedLineComment`

Use this to set which files (using globs) should use block comments on each line of a multi-line selection. See issue [#35464](https://github.com/Microsoft/vscode/issues/35464). Default is HTML, XML, CSS and Markdown files.
