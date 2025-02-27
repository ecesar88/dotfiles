
var vscode = require( 'vscode' );
var minimatch = require( 'minimatch' );

function activate( context )
{
    function forceLineComment( filename )
    {
        var result = false;
        vscode.workspace.getConfiguration( 'betterComment' ).forcedLineComment.map( function( glob )
        {
            var filePath = vscode.workspace.asRelativePath( filename );
            if( minimatch( filePath, glob, { matchBase: true } ) )
            {
                result = true;
            }
        } );

        return result;
    }

    var disposable = vscode.commands.registerCommand( 'bettercomment.toggle', function()
    {
        var editor = vscode.window.activeTextEditor;
        var selection = editor.selection;

        var s = selection.start;
        var e = selection.end;
        var r = selection.isReversed;

        var hasSelection = s.line !== e.line || s.character !== e.character;
        var withinComment = false;
        var line = editor.document.lineAt( s.line ).text;
        var blockCommentPattern = /\/\*.+?\*\//g;

        while( match = blockCommentPattern.exec( line ) )
        {
            if( s.character >= match.index && s.character <= blockCommentPattern.lastIndex )
            {
                withinComment = true;
            }
        }

        function commentLine()
        {
            var position = new vscode.Position( lineToComment, 0 );
            editor.selection = new vscode.Selection( position, position );

            vscode.commands.executeCommand( 'editor.action.commentLine' ).then( function( result )
            {
                lineToComment++;
                if( lineToComment <= lastLine )
                {
                    commentLine();
                }
                else
                {
                    editor.selection = new vscode.Selection( r ? e : s, r ? s : e );
                }
            } );
        }

        if( forceLineComment( editor.document.fileName ) && s.line !== e.line )
        {
            var lastLine = e.character > 0 ? e.line : e.line - 1;
            var lineToComment = s.line;
            commentLine();

        }
        else if( !hasSelection && withinComment || hasSelection && s.character !== 0 )
        {
            vscode.commands.executeCommand( 'editor.action.blockComment' );
        }
        else
        {
            vscode.commands.executeCommand( 'editor.action.commentLine' ).then( function()
            {
                if( s.character === 0 && editor.selection.start.character !== 0 )
                {
                    editor.selection = new vscode.Selection( new vscode.Position( editor.selection.start.line, 0 ), editor.selection.end );
                }
            } );
        }
    } );
    context.subscriptions.push( disposable );
}
exports.activate = activate;

function deactivate()
{
}
exports.deactivate = deactivate;
