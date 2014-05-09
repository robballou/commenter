/**
 * Commenter
 *
 * Adds a command/keymap for adding newlines within comments. If you're
 * in a docblock or line comment, it will add a new comment line below.
 */
module.exports = {
  /**
   * Initialize the commenter package
   */
  activate: function() {
    atom.workspaceView.command('commenter:newline', this.newline);
  },

  /**
   * Add a newline in this comment
   */
  newline: function() {
    var editor = atom.workspace.getActiveEditor(),
      scope = editor.getCursorScopes(),
      commentType = null;

    scope.forEach(function(scopeItem) {
      if (/^comment\.block\.documentation/.test(scopeItem)) {
        commentType = 'doc';
      }
      else if (/^comment\.line\./.test(scopeItem)) {
        commentType = 'line';
      }
    });

    // if this is a doc block, add '* '
    if (commentType === 'doc') {
      editor.insertNewlineBelow();
      editor.insertText('* ');
    }
    // line comment, add another line
    else if (commentType === 'line') {
      var comment = atom.syntax.getProperty(scope, 'editor.commentStart');
      editor.insertNewlineBelow();
      editor.insertText(comment);
    }
    else {
      editor.insertNewline();
    }
  }
};
